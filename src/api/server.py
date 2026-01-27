import fastapi

app = fastapi.FastAPI()


@app.get("/health")
async def health_check():
    return {"status": "ok"}
