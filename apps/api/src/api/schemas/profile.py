from api.schemas.base import SchemasBaseModel


class ProfileStats(SchemasBaseModel):
    reviewed: int
    bullish: int
    bearish: int
    saved: int


class Profile(SchemasBaseModel):
    name: str
    initials: str
    email: str
    stats: ProfileStats
    sector_interests: list[str]
