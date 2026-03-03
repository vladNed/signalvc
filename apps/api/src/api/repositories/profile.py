import logging

import asyncpg

from api import schemas

logger = logging.getLogger(__name__)


class ProfileRepository:
    def __init__(self, db_conn: asyncpg.Connection):
        self.db_conn = db_conn

    async def fetch_profile(self, user_id: str) -> schemas.profile.Profile | None:
        profile_query = """
        SELECT p.name, p.email
        FROM profile p
        WHERE p.user_id = $1;
        """

        stats_query = """
        SELECT
            COUNT(*) AS reviewed,
            COUNT(*) FILTER (WHERE swipe_type = 'bull') AS bullish,
            COUNT(*) FILTER (WHERE swipe_type = 'bear') AS bearish,
            COUNT(*) FILTER (WHERE swipe_type = 'portfolio') AS saved
        FROM swipe
        WHERE user_id = (SELECT id FROM profile WHERE user_id = $1);
        """

        profile = await self.db_conn.fetchrow(profile_query, user_id)
        if not profile:
            return None

        interests_query = """
        SELECT market, COUNT(*) AS cnt
        FROM swipe sw
        JOIN startup s ON s.id = sw.startup_id,
        jsonb_array_elements_text(s.target_markets) AS market
        WHERE sw.user_id = (SELECT id FROM profile WHERE user_id = $1)
          AND sw.swipe_type = 'portfolio'
        GROUP BY market
        ORDER BY cnt DESC
        LIMIT 10;
        """

        stats = await self.db_conn.fetchrow(stats_query, user_id)
        if not stats:
            return None

        interests_rows = await self.db_conn.fetch(interests_query, user_id)
        sector_interests = [row["market"] for row in interests_rows]

        name = profile["name"]
        parts = name.strip().split()
        initials = "".join(p[0].upper() for p in parts[:2]) if parts else ""

        return schemas.profile.Profile(
            name=name,
            initials=initials,
            email=profile["email"],
            stats=schemas.profile.ProfileStats(
                reviewed=stats["reviewed"],
                bullish=stats["bullish"],
                bearish=stats["bearish"],
                saved=stats["saved"],
            ),
            sector_interests=sector_interests,
        )
