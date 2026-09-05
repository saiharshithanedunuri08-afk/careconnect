from fastapi import APIRouter, Depends
from pydantic import BaseModel
from datetime import date
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.medication import Medication


router = APIRouter(prefix="/medications", tags=["Medications"])


class MedicationCreate(BaseModel):
    patient_id: int
    medicine_name: str
    dosage: str
    frequency: str
    food_instruction: str | None = None
    start_date: date | None = None
    end_date: date | None = None


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.post("/")
def add_medication(
    medication: MedicationCreate,
    db: Session = Depends(get_db)
):
    new_medication = Medication(
        patient_id=medication.patient_id,
        medicine_name=medication.medicine_name,
        dosage=medication.dosage,
        frequency=medication.frequency,
        food_instruction=medication.food_instruction,
        start_date=medication.start_date,
        end_date=medication.end_date
    )

    db.add(new_medication)
    db.commit()
    db.refresh(new_medication)

    return {
        "message": "Medication added successfully",
        "medication_id": new_medication.id
    }


@router.get("/{patient_id}")
def get_medications(
    patient_id: int,
    db: Session = Depends(get_db)
):
    medications = db.query(Medication).filter(
        Medication.patient_id == patient_id
    ).all()

    return {
        "patient_id": patient_id,
        "medications": medications
    }
