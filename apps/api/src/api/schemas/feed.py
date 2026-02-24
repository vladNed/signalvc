from typing import Annotated
from uuid import UUID

from pydantic import AfterValidator, BaseModel, BeforeValidator

from api.schemas.base import SchemasBaseModel
from api.schemas.constants import SwipeType

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


class SwipeRequest(SchemasBaseModel):
    startup_id: UUID
    swipe_type: SwipeType


class Startup(SchemasBaseModel):
    id: UUID
    operational_name: str
    description: str
    target_markets: Annotated[list[str], BeforeValidator(validators.parse_target_markets)]
    business_category: str
    employee_count: int | None
    founded_year: int | None
    country_name: str | None
    region_name: str | None
    peer_score: float | None
    valuation: int


class PortfolioStartup(SchemasBaseModel):
    id: UUID
    operational_name: str
    description: str
    business_category: str
    target_markets: Annotated[list[str], BeforeValidator(validators.parse_target_markets)]
    country_name: str | None
    region_name: str | None
    founded_year: int | None
    employee_count: int | None
    peer_score: float
    current_valuation: float | None
