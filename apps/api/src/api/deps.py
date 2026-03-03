import logging
from typing import Annotated, Any, AsyncGenerator

import asyncpg
import fastapi
import supabase
from asyncpg.pool import Pool, PoolConnectionProxy
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from api.conf import settings
from api.repositories.feed import FeedRepository

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
    try:
        resp = client.auth.get_user(creds.credentials)

        if resp is None or resp.user is None:
            raise fastapi.HTTPException(status_code=401, detail="Invalid authentication credentials")

        return resp.user.id
    except Exception as e:
        raise fastapi.HTTPException(status_code=401, detail="Invalid authentication credentials") from e


async def get_auth_user(creds: HTTPAuthorizationCredentials = fastapi.Depends(security)):
    client: supabase.Client = supabase.create_client(settings.supabase.url, settings.supabase.key)
    try:
        resp = client.auth.get_user(creds.credentials)

        if resp is None or resp.user is None:
            raise fastapi.HTTPException(status_code=401, detail="Invalid authentication credentials")
        
        if resp.user.is_anonymous:
            raise fastapi.HTTPException(status_code=403, detail="Forbidden")

        return resp.user.id
    except Exception as e:
        raise fastapi.HTTPException(status_code=401, detail="Invalid authentication credentials") from e


async def feed_repository(db_conn: Annotated[asyncpg.Connection, fastapi.Depends(get_db)]):
    repo = FeedRepository(db_conn)

    yield repo
