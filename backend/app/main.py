from fastapi import FastAPI
from sqlalchemy import text

from app.database.database import engine
from app.routes.medications import router as medication_router
from app.routes.schedules import router as schedule_router


app = FastAPI(title="CareConnect API")


app.include_router(medication_router)
app.include_router(schedule_router)


@app.get("/")
def root():
    return {"message": "CareConnect Backend is running!"}


@app.get("/health")
def health_check():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "status": "healthy",
            "database": "connected"
        }

    except Exception as e:
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e)
        }