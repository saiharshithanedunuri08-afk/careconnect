import { useState } from "react";
import {
  addMedication,
  addSchedule,
} from "../services/api";
import "./AddMedication.css";

function AddMedication({ onBack }) {
  const [formData, setFormData] = useState({
    patient_id: 1,
    medicine_name: "",
    dosage: "",
    frequency: "",
    food_instruction: "",
    start_date: "",
    end_date: "",
  });

  const [scheduledTime, setScheduledTime] =
    useState("");

  const [dose, setDose] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState("");

  const [saving, setSaving] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setMessageType("");

      const medicationResponse =
        await addMedication(formData);

      console.log(
        "Medication added:",
        medicationResponse
      );

      const medicationId =
        medicationResponse.medication_id;

      if (
        medicationId &&
        scheduledTime &&
        dose
      ) {
        const scheduleResponse =
          await addSchedule({
            medication_id: medicationId,
            scheduled_time: `${scheduledTime}:00`,
            dose: dose,
          });

        console.log(
          "Schedule added:",
          scheduleResponse
        );
      }

      setMessage(
        "Medication added successfully."
      );

      setMessageType("success");

      setFormData({
        patient_id: 1,
        medicine_name: "",
        dosage: "",
        frequency: "",
        food_instruction: "",
        start_date: "",
        end_date: "",
      });

      setScheduledTime("");
      setDose("");
    } catch (error) {
      console.error(
        "Add medication error:",
        error
      );

      setMessage(
        "Unable to add medication. Please check the backend connection."
      );

      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="add-medication-page">
      <div className="add-medication-container">
        <div className="add-header">
          <div>
            <p className="small-heading">
              CARECONNECT
            </p>

            <h1>Add Medication</h1>

            <p>
              Enter the medication details from the
              doctor's prescription.
            </p>
          </div>

          {onBack && (
            <button
              className="back-btn"
              onClick={onBack}
            >
              ← Back
            </button>
          )}
        </div>

        <form
          className="medication-form"
          onSubmit={handleSubmit}
        >
          <div className="form-section">
            <h2>Medication Details</h2>

            <div className="form-grid">
              <label>
                Medicine Name
                <input
                  type="text"
                  name="medicine_name"
                  placeholder="Example: Paracetamol"
                  value={formData.medicine_name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Dosage
                <input
                  type="text"
                  name="dosage"
                  placeholder="Example: 500 mg"
                  value={formData.dosage}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Frequency
                <input
                  type="text"
                  name="frequency"
                  placeholder="Example: Twice daily"
                  value={formData.frequency}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Food Instruction
                <select
                  name="food_instruction"
                  value={
                    formData.food_instruction
                  }
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select instruction
                  </option>
                  <option value="Before food">
                    Before food
                  </option>
                  <option value="After food">
                    After food
                  </option>
                  <option value="With food">
                    With food
                  </option>
                  <option value="Any time">
                    Any time
                  </option>
                </select>
              </label>

              <label>
                Start Date
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                End Date
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
          </div>

          <div className="form-section schedule-form-section">
            <h2>Medication Schedule</h2>

            <p>
              You can also create the first reminder
              schedule now.
            </p>

            <div className="form-grid">
              <label>
                Scheduled Time
                <input
                  type="time"
                  value={scheduledTime}
                  onChange={(event) =>
                    setScheduledTime(
                      event.target.value
                    )
                  }
                />
              </label>

              <label>
                Dose
                <input
                  type="text"
                  placeholder="Example: 1 tablet"
                  value={dose}
                  onChange={(event) =>
                    setDose(event.target.value)
                  }
                />
              </label>
            </div>
          </div>

          {message && (
            <div
              className={`form-message ${messageType}`}
            >
              {message}
            </div>
          )}

          <button
            className="save-medication-btn"
            type="submit"
            disabled={saving}
          >
            {saving
              ? "Saving Medication..."
              : "Save Medication"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMedication;