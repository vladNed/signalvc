import logging

import asyncpg
import fastapi
from fastapi.concurrency import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

from api.conf import settings
from api.routes import feed

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


app = fastapi.FastAPI(
    title="Signal VC API",
    version="0.1.0",
    description="API for Signal VC platform",
    lifespan=lifespan,
)

app.include_router(feed.router, prefix="/api/v1/feed")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://signalvc-web.vercel.app", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)


@app.get("/health")
async def health_check():
    return {"status": "ok"}
