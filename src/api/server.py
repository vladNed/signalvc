import fastapi

from api.conf import settings
app = fastapi.FastAPI()


@app.get("/health")
async def health_check():
    return {"status": "ok"}
