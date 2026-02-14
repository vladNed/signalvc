from typing import Annotated
from uuid import UUID
from api.schemas.constants import SwipeType
from pydantic import BaseModel, BeforeValidator, AfterValidator

from . import validators


class RequestFilters(BaseModel):
    countries: list[str] | None
    target_markets: list[str] | None
    business_categories: list[str] | None


class RequestWeights(BaseModel):
    countries: float | None
    target_markets: float | None
    business_categories: float | None


class Request(BaseModel):
    filters: RequestFilters
    weights: RequestWeights


class ResponseItem(BaseModel):
    id: UUID
    operational_name: str
    description: str
    country_name: str
    target_markets: Annotated[
        list[str],
        BeforeValidator(validators.parse_target_markets),
    ]
    relevance_score: Annotated[
        float,
        AfterValidator(validators.round_score),
    ]


class SwipeRequest(BaseModel):
    startup_id: UUID
    swipe_type: SwipeType


class SwipeBulkRequest(BaseModel):
    swipes: list[SwipeRequest]


class SwipeBulkResponse(BaseModel):
    success: bool


class Startup(BaseModel):
    id: UUID
    operational_name: str
    description: str
    target_markets: list[str]
    business_category: str
    employee_count: int
    founded_year: int
    country_name: str
    region_name: str


class FeedResponse(BaseModel):
    data: list[Startup]
