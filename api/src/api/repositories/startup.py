"""
Startup repository for data access operations.
"""

from typing import Any
import asyncpg


class StartupRepository:
    """Repository for startup-related database operations."""

    def __init__(self, db_conn: asyncpg.Connection):
        self.db_conn = db_conn

    async def get_scored_startups(
        self,
        country_weight: float,
        category_weight: float,
        target_markets_weight: float,
        countries: list[str] | None,
        categories: list[str] | None,
        target_markets: list[str] | None,
        limit: int,
    ) -> list[dict[str, Any]]:
        """
        Fetch startups with relevance scoring based on filters and weights.

        Args:
            country_weight: Weight for country matching (0.0-1.0)
            category_weight: Weight for business category matching (0.0-1.0)
            target_markets_weight: Weight for target markets matching (0.0-1.0)
            countries: List of countries to filter by
            categories: List of business categories to filter by
            target_markets: List of target markets to filter by
            min_relevance_score: Minimum relevance score threshold (0.0-1.0)
            limit: Maximum number of results to return

        Returns:
            List of startup records with relevance scores
        """
        query = """
        SELECT
            s.id,
            s.operational_name,
            s.description,
            s.country_name,
            s.target_markets,
            s.business_category,
            (
              $1::float * (s.country_name = ANY($4::text[]))::int +
              $2::float * (s.business_category = ANY($5::text[]))::int +
              $3::float * (s.target_markets ?| $6::text[])::int
            ) AS relevance_score
        FROM startup s
        WHERE (
            (s.country_name is not null and s.country_name = ANY($4::text[])) AND
            (s.target_markets ?| $6::text[]) AND
            (s.business_category = ANY($5::text[]))
        )
        ORDER BY relevance_score DESC
        LIMIT $7::int;
        """

        # Convert None to empty lists for PostgreSQL array parameters
        countries_list = countries or []
        categories_list = categories or []
        target_markets_list = target_markets or []
        result = await self.db_conn.fetch(
            query,
            country_weight,
            category_weight,
            target_markets_weight,
            countries_list,
            categories_list,
            target_markets_list,
            limit,
        )

        return [dict(row) for row in result]
