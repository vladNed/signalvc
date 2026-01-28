from typing import AsyncGenerator, Any
from asyncpg import Pool
from asyncpg.pool import PoolConnectionProxy
import fastapi


async def get_db(
    request: fastapi.Request,
) -> AsyncGenerator[PoolConnectionProxy | Any, None]:
    pg_pool: Pool = request.app.state.pool
    async with pg_pool.acquire() as connection:
        yield connection
