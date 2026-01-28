from typing import Annotated
from uuid import UUID
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
    min_relevance_score: float


class ResponseItem(BaseModel):
    id: UUID
    operational_name: str
    description: str
    country_name: str
    target_markets: Annotated[list[str], BeforeValidator(validators.parse_target_markets)]
    relevance_score: Annotated[float, AfterValidator(validators.round_score)]
