import logging
from typing import Annotated

import fastapi

from api import deps
from api.repositories.feed import FeedRepository

logger = logging.getLogger(__name__)

router = fastapi.APIRouter(tags=['portfolio'])


@router.get("")
async def get_portfolio(
    user_id: Annotated[str, fastapi.Depends(deps.get_auth_user)],
    feed_repo: Annotated[FeedRepository, fastapi.Depends(deps.feed_repository)]
):
    return await feed_repo.fetch_portfolio(user_id)


@router.get("/startup/{id}/")
async def get_startup(
    id: str,
    user_id: Annotated[str, fastapi.Depends(deps.get_auth_user)],
    feed_repo: Annotated[FeedRepository, fastapi.Depends(deps.feed_repository)]
):
    startup = await feed_repo.fetch_startup(id)
    if not startup:
        raise fastapi.HTTPException(status_code=404, detail="Startup not found")
    return startup
    