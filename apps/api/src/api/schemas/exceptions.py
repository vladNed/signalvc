from pydantic import BaseModel


class BadRequest(BaseModel):
    detail: str
