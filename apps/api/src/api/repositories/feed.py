import asyncpg
import time
from typing import Any
import logging

from api import schemas

logger = logging.getLogger(__name__)


class FeedRepository:
    """Repository for feed database operations."""

    def __init__(self, db_conn: asyncpg.Connection):
        self.db_conn = db_conn

    async def fetch_feed(self, user_id: str) -> list[schemas.feed.Startup]:
        """Fetch the feed for a given user."""
        query = """
            WITH filtered as (
                SELECT
                    s.id,
                    s.operational_name,
                    s.description,
                    s.target_markets,
                    s.business_category,
                    s.employee_count,
                    s.founded_year,
                    s.country_name,
                    s.region_name
                FROM startup s
                LEFT JOIN swipe sw
                    ON sw.startup_id = s.id
                    AND sw.user_id = $1
                WHERE
                    s.founded_year IS NOT NULL
                    AND sw.startup_id IS NULL
                LIMIT 20
            )
            SELECT *
            FROM filtered
            ORDER BY founded_year DESC;
        """

        records = await self.db_conn.fetch(query, user_id)
        return [schemas.feed.Startup(**dict(record)) for record in records]

    async def create_swipe(self, user_id: str, swipe: schemas.feed.SwipeRequest) -> dict[str, Any]:
        """
        Create a swipe for a user.

        Args:
            swipe: Swipe dictionary containing:
            update_stats: Whether to update swipe_stats table atomically

        Raises:
            ValueError: If input validation fails
        """
        start_time = time.time()

        swipe_records = (
            str(user_id),
            str(swipe.startup_id),
            swipe.swipe_type.value,
        )

        async with self.db_conn.transaction():
            insert_query = """
                INSERT INTO swipe (user_id, startup_id, swipe_type)
                VALUES ($1, $2, $3)
            """
            await self.db_conn.execute(insert_query, *swipe_records)

        processing_time_ms = (time.time() - start_time) * 1000

        logger.debug(
            "Processed swipe for user %s in %.2f ms.",
            user_id,
            processing_time_ms,
        )

        return {"success": True}
