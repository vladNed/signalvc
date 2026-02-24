import logging
import time
from typing import Any

import asyncpg

from api import schemas

logger = logging.getLogger(__name__)


class FeedRepository:
    """Repository for feed database operations."""

    def __init__(self, db_conn: asyncpg.Connection):
        self.db_conn = db_conn

    async def fetch_feed(self, user_id: str) -> list[schemas.feed.Startup]:
        """Fetch the feed for a given user."""
        query = """
        WITH filtered AS (
            SELECT
                s.id,
                s.operational_name,
                s.description,
                s.target_markets,
                s.business_category,
                s.employee_count,
                s.founded_year,
                s.country_name,
                s.region_name,
                COALESCE(AVG(isc.score), 0) AS peer_score,
                MAX(si.current_valuation_usd) as current_valuation
            FROM startup s
            LEFT JOIN swipe sw
                ON sw.startup_id = s.id
                AND sw.user_id = $1
            LEFT JOIN startup_investor si
                ON si.startup_id = s.id
            LEFT JOIN investor_score isc
                ON isc.investor_id = si.investor_id
            GROUP BY s.id
            LIMIT 1000
        )
        SELECT *
        FROM filtered
        WHERE founded_year IS NOT NULL
        ORDER BY 
            (0.4 * peer_score + 0.6 * random() * 100) DESC
        LIMIT 20;
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

            # Upsert swipe statistics: create row when missing, otherwise increment the
            # appropriate counter column and update `updated_on`.
            insert_stats_query = """
                INSERT INTO swipe_stats (
                    startup_id,
                    bull_count,
                    bear_count,
                    add_count,
                    created_on,
                    updated_on
                )
                VALUES (
                    $1,
                    CASE WHEN $2 = 'bull' THEN 1 ELSE 0 END,
                    CASE WHEN $2 = 'bear' THEN 1 ELSE 0 END,
                    CASE WHEN $2 = 'portofolio' THEN 1 ELSE 0 END,
                    CURRENT_TIMESTAMP,
                    CURRENT_TIMESTAMP
                )
                ON CONFLICT (startup_id) DO UPDATE SET
                    bull_count = swipe_stats.bull_count + EXCLUDED.bull_count,
                    bear_count = swipe_stats.bear_count + EXCLUDED.bear_count,
                    add_count = swipe_stats.add_count + EXCLUDED.add_count,
                    updated_on = CURRENT_TIMESTAMP;
            """

            await self.db_conn.execute(
                insert_stats_query,
                str(swipe.startup_id),
                swipe.swipe_type.value,
            )

        processing_time_ms = (time.time() - start_time) * 1000

        logger.debug(
            "Processed swipe for user %s in %.2f ms.",
            user_id,
            processing_time_ms,
        )

        return {"success": True}
