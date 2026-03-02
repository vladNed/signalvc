from typing import Annotated
from uuid import UUID

from pydantic import BeforeValidator

from api.schemas import validators
from api.schemas.base import SchemasBaseModel


class Response(SchemasBaseModel):
    id: UUID
    operational_name: str
    description: str
    country_name: str | None
    region_name: str | None
    founded_year: int | None
    business_category: str
    arr: int | None
    founder: str | None
    funding_size: int | None


class SentimentPoint(SchemasBaseModel):
    month: str
    value: int


class StartupDetail(SchemasBaseModel):
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
    arr: int | None
    founder: str | None
    funding_size: int | None
    sentiment: int
    sentiment_trend: int
    sentiment_over_time: list[SentimentPoint]
