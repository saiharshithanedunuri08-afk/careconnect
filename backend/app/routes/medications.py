from fastapi import APIRouter
from pydantic import BaseModel
from datetime import date

router = APIRouter(prefix="/medications", tags=["Medications"])


class MedicationCreate(BaseModel):
    patient_id: int
    medicine_name: str
    dosage: str
    frequency: str
    food_instruction: str | None = None
    start_date: date | None = None
    end_date: date | None = None


@router.post("/")
def add_medication(medication: MedicationCreate):
    return {
        "message": "Medication added successfully",
        "medication": medication
    }


@router.get("/{patient_id}")
def get_medications(patient_id: int):
    return {
        "patient_id": patient_id,
        "medications": []
    }