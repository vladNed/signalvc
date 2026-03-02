

from uuid import UUID

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
