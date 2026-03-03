from typing import Annotated

import asyncpg
import fastapi

from api import deps, schemas
from api.repositories.profile import ProfileRepository

router = fastapi.APIRouter()


@router.get("/", tags=["profile"], response_model=schemas.profile.Profile)
async def get_profile(
    user_id: Annotated[str, fastapi.Depends(deps.get_auth_user)],
    db_conn: Annotated[asyncpg.Connection, fastapi.Depends(deps.get_db)],
):
    repo = ProfileRepository(db_conn)
    profile = await repo.fetch_profile(user_id=user_id)
    if not profile:
        raise fastapi.HTTPException(status_code=404, detail="Profile not found")
    return profile
