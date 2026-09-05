from fastapi import APIRouter, Depends
from pydantic import BaseModel
from datetime import time
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.schedule import MedicationSchedule


router = APIRouter(prefix="/schedules", tags=["Schedules"])


class ScheduleCreate(BaseModel):
    medication_id: int
    scheduled_time: time
    dose: str | None = None


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.post("/")
def add_schedule(
    schedule: ScheduleCreate,
    db: Session = Depends(get_db)
):
    new_schedule = MedicationSchedule(
        medication_id=schedule.medication_id,
        scheduled_time=schedule.scheduled_time,
        dose=schedule.dose
    )

    db.add(new_schedule)
    db.commit()
    db.refresh(new_schedule)

    return {
        "message": "Medication schedule added successfully",
        "schedule_id": new_schedule.id
    }


@router.get("/{medication_id}")
def get_schedules(
    medication_id: int,
    db: Session = Depends(get_db)
):
    schedules = db.query(MedicationSchedule).filter(
        MedicationSchedule.medication_id == medication_id
    ).all()

    return {
        "medication_id": medication_id,
        "schedules": schedules
    }