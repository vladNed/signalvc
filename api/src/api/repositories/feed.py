from api.schemas.feed import FeedResponse
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

    async def fetch_feed(self, user_id: str) -> FeedResponse:
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
                where s.founded_year is not null
                LIMIT 20
            )
            SELECT *
            FROM filtered
            order by founded_year desc;
        """

        records = await self.db_conn.fetch(query)
        return schemas.feed.FeedResponse(data=[schemas.feed.Startup(**dict(record)) for record in records])

    async def create_swipe_bulk(
        self,
        user_id: str,
        swipes: list[schemas.feed.SwipeRequest],
    ) -> dict[str, Any]:
        """
        Create multiple swipes in bulk and optionally update swipe statistics.

        Args:
            swipes: List of swipe dictionaries, each containing:
                - user_id: UUID of the user
                - startup_id: UUID of the startup
                - swipe_type: Type of swipe ('bull', 'bear', or 'add_to_portofolio')
            update_stats: Whether to update swipe_stats table atomically

        Returns:
            Dictionary containing:
                - success: Boolean indicating success
                - inserted_count: Number of swipes inserted
                - updated_stats: List of updated startup stats (if update_stats=True)
                - processing_time_ms: Processing time in milliseconds

        Raises:
            ValueError: If input validation fails
        """
        start_time = time.time()

        # Input validation
        if not swipes:
            raise ValueError("Swipes list cannot be empty")

        swipe_records = [
            (
                str(user_id),
                str(swipe.startup_id),
                swipe.swipe_type.value,
            )
            for swipe in swipes
        ]

        # Start transaction
        async with self.db_conn.transaction():
            # Bulk insert swipes
            insert_query = """
                INSERT INTO swipes (user_id, startup_id, swipe_type)
                VALUES ($1, $2, $3)
            """
            await self.db_conn.executemany(insert_query, swipe_records)
            inserted_count = len(swipe_records)

        processing_time_ms = (time.time() - start_time) * 1000

        logger.debug(
            "Processed %d swipes for user %s in %.2f ms.",
            inserted_count,
            user_id,
            processing_time_ms,
        )

        return {
            "success": True,
        }
