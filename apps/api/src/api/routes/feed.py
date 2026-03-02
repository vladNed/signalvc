import logging
import time
from typing import Annotated

import asyncpg
import fastapi
from pydantic import ValidationError

from api import deps, schemas
from api.repositories import StartupRepository
from api.repositories.feed import FeedRepository

logger = logging.getLogger(__name__)
router = fastapi.APIRouter()


@router.get("/", tags=["feed"], response_model=list[schemas.feed.Startup])
async def get_feed(
    user_id: Annotated[str, fastapi.Depends(deps.get_auth_user)],
    db_conn: Annotated[asyncpg.Connection, fastapi.Depends(deps.get_db)],
):
    repo = FeedRepository(db_conn)
    return await repo.fetch_feed(user_id=user_id)


@router.get("/a", tags=["feed"], response_model=list[schemas.feed.StartupShort])
async def get_feed_short(
    user_id: Annotated[str, fastapi.Depends(deps.get_user)],
    db_conn: Annotated[asyncpg.Connection, fastapi.Depends(deps.get_db)],
):
    repo = FeedRepository(db_conn)
    return await repo.fetch_feed_short(user_id=user_id)


@router.get("/actions", tags=["feed"], response_model=list[schemas.feed.SwipeAction])
async def get_latest_actions(
    user_id: Annotated[str, fastapi.Depends(deps.get_auth_user)],
    db_conn: Annotated[asyncpg.Connection, fastapi.Depends(deps.get_db)],
):
    repo = FeedRepository(db_conn)
    return await repo.fetch_latest_actions(user_id=user_id)


@router.post("/swipe", tags=["feed"], status_code=204)
async def swipe_action(
    request: schemas.feed.SwipeRequest,
    user_id: Annotated[str, fastapi.Depends(deps.get_user)],
    db_conn: Annotated[asyncpg.Connection, fastapi.Depends(deps.get_db)],
) -> None:
    repo = FeedRepository(db_conn)
    await repo.create_swipe(
        user_id=user_id,
        swipe=request,
    )
