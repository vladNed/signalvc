import fastapi
import asyncpg
import logging

from api.routes import feed
from api.conf import settings
from fastapi.concurrency import asynccontextmanager

logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)


@asynccontextmanager
async def lifespan(app: fastapi.FastAPI):
    app.state.pool = await asyncpg.create_pool(
        dsn=settings.postgres.url,
        min_size=1,
        max_size=10,
    )

    yield

    await app.state.pool.close()


app = fastapi.FastAPI(lifespan=lifespan)

app.include_router(feed.router, prefix="/api/v1/feed")


@app.get("/health")
async def health_check():
    return {"status": "ok"}
