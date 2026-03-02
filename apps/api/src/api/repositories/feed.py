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
                s.arr,
                s.founder,
                s.funding_size
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

    async def fetch_feed_short(self, user_id: str) -> list[schemas.feed.StartupShort]:
        query = """
        WITH filtered AS (
            SELECT
                s.id,
                s.operational_name,
                s.description,
                s.target_markets,
                s.business_category,
                COALESCE(AVG(isc.score), 0) AS peer_score,
                s.arr,
                s.funding_size
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
        ORDER BY 
            (0.4 * peer_score + 0.6 * random() * 100) DESC
        LIMIT 20;
        """

        records = await self.db_conn.fetch(query, user_id)
        return [schemas.feed.StartupShort(**dict(record)) for record in records]

    async def fetch_portfolio(self, user_id: str) -> list[schemas.portfolio.Response]:
        """Fetch the portfolio (saved startups) for a given user."""
        query = """
        SELECT
          s.id,
          s.operational_name,
          s.description,
          s.country_name,
          s.region_name,
          s.founded_year,
          s.business_category,
          s.arr,
          s.founder,
          s.funding_size
        FROM swipe sw
        JOIN startup s
          ON s.id = sw.startup_id
        WHERE sw.user_id = $1
          AND sw.swipe_type = 'portfolio'
        GROUP BY s.id;
        """
        records = await self.db_conn.fetch(query, user_id)
        return [schemas.portfolio.Response(**dict(record)) for record in records]

    async def create_swipe(self, user_id: str, swipe: schemas.feed.SwipeRequest) -> dict[str, Any]:
        """
        Create a swipe for a user.

        Args:
            swipe: Swipe dictionary containing:
            update_stats: Whether to update swipe_stats table atomically

        Raises:
            ValueError: If input validation fails
        """
        swipe_records = (
            str(user_id),
            str(swipe.startup_id),
            swipe.swipe_type.value,
        )

        insert_query = """
            INSERT INTO swipe (user_id, startup_id, swipe_type)
            VALUES ($1, $2, $3)
        """
        await self.db_conn.execute(insert_query, *swipe_records)

        return {"success": True}
