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
                COALESCE(
                    ROUND(ss.bull_count::numeric / NULLIF(ss.bull_count + ss.bear_count, 0) * 100),
                    0
                )::int AS sentiment_score,
                COALESCE(ss.bull_count + ss.bear_count, 0) AS engagement,
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
            LEFT JOIN (
                SELECT
                    startup_id,
                    SUM(CASE WHEN swipe_type = 'bull' THEN 1 ELSE 0 END) AS bull_count,
                    SUM(CASE WHEN swipe_type = 'bear' THEN 1 ELSE 0 END) AS bear_count
                FROM swipe
                WHERE created_on >= CURRENT_DATE - INTERVAL '30 days'
                  AND swipe_type IN ('bull', 'bear')
                GROUP BY startup_id
            ) ss ON ss.startup_id = s.id
            GROUP BY s.id, ss.bull_count, ss.bear_count
            LIMIT 1000
        )
        SELECT *
        FROM filtered
        WHERE founded_year IS NOT NULL
        ORDER BY
            (0.3 * peer_score
            + 0.3 * LEAST(COALESCE(engagement, 0), 100)
            + 0.4 * random() * 100) DESC
        LIMIT 5;
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
                COALESCE(
                    ROUND(ss.bull_count::numeric / NULLIF(ss.bull_count + ss.bear_count, 0) * 100),
                    0
                )::int AS sentiment_score,
                COALESCE(ss.bull_count + ss.bear_count, 0) AS engagement,
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
            LEFT JOIN (
                SELECT
                    startup_id,
                    SUM(CASE WHEN swipe_type = 'bull' THEN 1 ELSE 0 END) AS bull_count,
                    SUM(CASE WHEN swipe_type = 'bear' THEN 1 ELSE 0 END) AS bear_count
                FROM swipe
                WHERE created_on >= CURRENT_DATE - INTERVAL '30 days'
                  AND swipe_type IN ('bull', 'bear')
                GROUP BY startup_id
            ) ss ON ss.startup_id = s.id
            GROUP BY s.id, ss.bull_count, ss.bear_count
            LIMIT 1000
        )
        SELECT *
        FROM filtered
        ORDER BY
            (0.3 * peer_score
            + 0.3 * LEAST(COALESCE(engagement, 0), 100)
            + 0.4 * random() * 100) DESC
        LIMIT 5;
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
          s.funding_size,
          COALESCE(
              ROUND(
                  SUM(CASE WHEN sw2.swipe_type = 'bull' THEN 1 ELSE 0 END)::numeric
                  / NULLIF(
                      SUM(CASE WHEN sw2.swipe_type IN ('bull', 'bear') THEN 1 ELSE 0 END),
                      0
                  ) * 100
              ),
              0
          )::int AS sentiment_score
        FROM swipe sw
        JOIN startup s
          ON s.id = sw.startup_id
        LEFT JOIN swipe sw2
          ON sw2.startup_id = s.id
          AND sw2.swipe_type IN ('bull', 'bear')
          AND sw2.created_on >= CURRENT_DATE - INTERVAL '30 days'
        WHERE sw.user_id = $1
          AND sw.swipe_type = 'portfolio'
        GROUP BY s.id
        ORDER BY sentiment_score DESC;
        """
        records = await self.db_conn.fetch(query, user_id)
        return [schemas.portfolio.Response(**dict(record)) for record in records]

    async def fetch_startup(self, startup_id: str) -> schemas.portfolio.StartupDetail | None:
        """Fetch full startup detail including peer score and sentiment over time."""
        startup_query = """
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
        LEFT JOIN startup_investor si ON si.startup_id = s.id
        LEFT JOIN investor_score isc ON isc.investor_id = si.investor_id
        WHERE s.id = $1
        GROUP BY s.id;
        """

        sentiment_query = """
        SELECT
            to_char(d.day, 'Mon DD') AS month,
            COALESCE(SUM(CASE WHEN sw.swipe_type = 'bull' THEN 1 ELSE 0 END), 0) AS bull_count,
            COALESCE(SUM(CASE WHEN sw.swipe_type = 'bear' THEN 1 ELSE 0 END), 0) AS bear_count
        FROM generate_series(
            CURRENT_DATE - INTERVAL '29 days',
            CURRENT_DATE,
            INTERVAL '1 day'
        ) AS d(day)
        LEFT JOIN swipe sw
            ON sw.startup_id = $1
            AND sw.swipe_type IN ('bull', 'bear')
            AND sw.created_on::date = d.day
        GROUP BY d.day
        ORDER BY d.day;
        """

        record = await self.db_conn.fetchrow(startup_query, startup_id)
        if not record:
            return None

        sentiment_records = await self.db_conn.fetch(sentiment_query, startup_id)

        # Build sentiment over time: value = bull / (bull + bear) * 100 per day
        sentiment_over_time = []
        for r in sentiment_records:
            total = r["bull_count"] + r["bear_count"]
            value = round(r["bull_count"] / total * 100) if total > 0 else 0
            sentiment_over_time.append({"month": r["month"], "value": value})

        # Sentiment score = 30-day aggregate bull / (bull + bear) * 100
        total_bull = sum(r["bull_count"] for r in sentiment_records)
        total_bear = sum(r["bear_count"] for r in sentiment_records)
        total = total_bull + total_bear
        sentiment_score = round(total_bull / total * 100) if total > 0 else 0

        # Current sentiment = latest day's value
        sentiment = sentiment_over_time[-1]["value"]

        # Trend = difference between last two days
        sentiment_trend = sentiment_over_time[-1]["value"] - sentiment_over_time[-2]["value"]

        return schemas.portfolio.StartupDetail(
            **dict(record),
            sentiment=sentiment,
            sentiment_score=sentiment_score,
            sentiment_trend=sentiment_trend,
            sentiment_over_time=sentiment_over_time,
        )

    async def fetch_latest_actions(self, user_id: str) -> list[schemas.feed.SwipeAction]:
        """Fetch the latest 20 swipe actions for a user."""
        query = """
        SELECT
            s.operational_name,
            s.country_name,
            sw.swipe_type
        FROM swipe sw
        JOIN startup s ON s.id = sw.startup_id
        WHERE sw.user_id = $1
        ORDER BY sw.created_on DESC
        LIMIT 10;
        """
        records = await self.db_conn.fetch(query, user_id)
        return [schemas.feed.SwipeAction(**dict(r)) for r in records]

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
