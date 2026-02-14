from typing import AsyncGenerator, Any
from asyncpg import Pool
from asyncpg.pool import PoolConnectionProxy
import fastapi
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import supabase
import logging

from api.conf import settings


security = HTTPBearer()
logger = logging.getLogger("uvicorn")


async def get_db(
    request: fastapi.Request,
) -> AsyncGenerator[PoolConnectionProxy | Any, None]:
    pg_pool: Pool = request.app.state.pool
    async with pg_pool.acquire() as connection:
        yield connection


async def get_user(creds: HTTPAuthorizationCredentials = fastapi.Depends(security)):
    client: supabase.Client = supabase.create_client(settings.supabase.url, settings.supabase.key)
    logger.info(f"Authenticating user with token: {creds.credentials}...")

    try:
        resp = client.auth.get_user(creds.credentials)

        if resp is None or resp.user is None:
            raise fastapi.HTTPException(status_code=401, detail="Invalid authentication credentials")

        return resp.user.id
    except Exception as e:
        raise fastapi.HTTPException(status_code=401, detail="Invalid authentication credentials") from e
