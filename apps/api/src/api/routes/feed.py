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


@router.post(
    "/swipe/dev",
    response_model=list[schemas.feed.ResponseItem],
    responses={
        400: {"description": "Bad Request", "model": schemas.exceptions.BadRequest},
        500: {
            "description": "Internal Server Error",
            "model": schemas.exceptions.BadRequest,
        },
    },
    tags=["dev"],
)
async def get_swipe_feed(
    request: schemas.feed.Request,
    db_conn: Annotated[asyncpg.Connection, fastapi.Depends(deps.get_db)],
    limit: int = 10,
) -> list[schemas.feed.ResponseItem]:
    """
    Get a personalized feed of startups based on user preferences and filters.

    This endpoint scores startups based on weighted criteria (countries, business
    categories, and target markets) and returns the most relevant matches above
    a minimum relevance threshold.

    Args:
        request: Request containing filters, weights, and minimum relevance score
        db_conn: Database connection (injected by FastAPI)
        limit: Maximum number of startups to return (default: 5, max: 100)

    Returns:
        List of startups with relevance scores, ordered by relevance (descending)

    Raises:
        HTTPException: 400 if validation fails, 500 if database error occurs

    Example:
        ```json
        {
          "filters": {
            "countries": ["United States", "Canada"],
            "business_categories": ["Tech Companies"],
            "target_markets": ["education", "finance"]
          },
          "weights": {
            "countries": 0.3,
            "business_categories": 0.4,
            "target_markets": 0.3
          }
        }
        ```
    """
    start_time = time.time()

    try:
        # Validate weights sum to reasonable value
        total_weight = sum(
            filter(
                None,
                [
                    request.weights.countries,
                    request.weights.business_categories,
                    request.weights.target_markets,
                ],
            )
        )

        if total_weight == 0:
            raise fastapi.HTTPException(status_code=400, detail="At least one weight must be greater than 0")

        logger.info(
            "Fetching swipe feed",
            extra={
                "filters": request.filters.model_dump(),
                "weights": request.weights.model_dump(),
                "limit": limit,
            },
        )

        repo = StartupRepository(db_conn)
        results = await repo.get_scored_startups(
            country_weight=request.weights.countries or 0.0,
            category_weight=request.weights.business_categories or 0.0,
            target_markets_weight=request.weights.target_markets or 0.0,
            countries=request.filters.countries,
            categories=request.filters.business_categories,
            target_markets=request.filters.target_markets,
            limit=limit,
        )
        elapsed_time_db = time.time() - start_time
        logger.info("Database query completed. time: %s", round(elapsed_time_db, 4))

        response_items = [schemas.feed.ResponseItem(**row) for row in results]

        elapsed_time = time.time() - start_time
        logger.info(
            "Swipe feed fetched successfully. Time: %s",
            round(elapsed_time, 4),
            extra={
                "result_count": len(response_items),
                "elapsed_time_ms": round(elapsed_time * 1000, 2),
            },
        )

        return response_items

    except ValidationError as e:
        logger.error(f"Validation error: {e}")
        raise fastapi.HTTPException(status_code=400, detail=f"Invalid request data: {str(e)}")

    except asyncpg.PostgresError as e:
        logger.error(f"Database error: {e}", exc_info=True)
        raise fastapi.HTTPException(
            status_code=500,
            detail="An error occurred while fetching startups",
        )

    except fastapi.HTTPException:
        raise  # Re-raise HTTP exceptions as is

    except Exception as e:
        logger.error(f"Unexpected error: {e}", exc_info=True)
        raise fastapi.HTTPException(
            status_code=500,
            detail="An unexpected error occurred",
        )


@router.get("/", tags=["feed"], response_model=list[schemas.feed.Startup])
async def get_feed(
    user_id: Annotated[str, fastapi.Depends(deps.get_user)],
    db_conn: Annotated[asyncpg.Connection, fastapi.Depends(deps.get_db)],
):
    repo = FeedRepository(db_conn)
    return await repo.fetch_feed(user_id=user_id)


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
