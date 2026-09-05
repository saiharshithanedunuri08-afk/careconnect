import { useEffect, useState } from "react";
import { getMedications, getSchedules } from "../services/api";
import "./MedicationSchedule.css";

function MedicationSchedule({ onBack }) {
  const [medications, setMedications] = useState([]);
  const [schedules, setSchedules] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const patientId = 1;

  useEffect(() => {
    loadMedicationData();
  }, []);

  const loadMedicationData = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMedications(patientId);

      console.log("Medication API response:", response);

      const medicationList = Array.isArray(response)
        ? response
        : response.medications || [];

      setMedications(medicationList);

      const scheduleResults = {};

      for (const medication of medicationList) {
        const medicationId =
          medication.id || medication.medication_id;

        if (!medicationId) continue;

        try {
          const scheduleResponse = await getSchedules(medicationId);

          scheduleResults[medicationId] = Array.isArray(scheduleResponse)
            ? scheduleResponse
            : scheduleResponse.schedules || [];
        } catch (scheduleError) {
          console.error(
            `Unable to load schedule for medication ${medicationId}`,
            scheduleError
          );

          scheduleResults[medicationId] = [];
        }
      }

      setSchedules(scheduleResults);
    } catch (err) {
      console.error("Medication loading error:", err);
      setError(
        "Unable to load medications. Please check the backend connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="medication-page">
      <div className="medication-container">
        <div className="medication-header">
          <div>
            <p className="small-heading">CARECONNECT</p>
            <h1>Medication Schedule</h1>
            <p>
              View the medicines and schedules assigned to the patient.
            </p>
          </div>

          {onBack && (
            <button className="back-btn" onClick={onBack}>
              ← Back
            </button>
          )}
        </div>

        {loading && (
          <div className="status-card">
            <h2>Loading medications...</h2>
            <p>Please wait while CareConnect retrieves the schedule.</p>
          </div>
        )}

        {!loading && error && (
          <div className="error-card">
            <h2>Unable to load data</h2>
            <p>{error}</p>

            <button onClick={loadMedicationData}>
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && medications.length === 0 && (
          <div className="status-card">
            <h2>No medications available</h2>
            <p>
              Once a caregiver adds medication, it will appear here.
            </p>
          </div>
        )}

        {!loading && !error && medications.length > 0 && (
          <div className="medication-list">
            {medications.map((medication) => {
              const medicationId =
                medication.id || medication.medication_id;

              const medicationSchedules =
                schedules[medicationId] || [];

              return (
                <div
                  className="medicine-card"
                  key={medicationId}
                >
                  <div className="medicine-top">
                    <div className="medicine-icon">
                      💊
                    </div>

                    <div>
                      <h2>{medication.medicine_name}</h2>
                      <p className="dosage">
                        {medication.dosage}
                      </p>
                    </div>
                  </div>

                  <div className="medicine-details">
                    <div>
                      <span>Frequency</span>
                      <strong>
                        {medication.frequency || "Not provided"}
                      </strong>
                    </div>

                    <div>
                      <span>Food Instruction</span>
                      <strong>
                        {medication.food_instruction ||
                          "Not provided"}
                      </strong>
                    </div>

                    <div>
                      <span>Start Date</span>
                      <strong>
                        {medication.start_date || "-"}
                      </strong>
                    </div>

                    <div>
                      <span>End Date</span>
                      <strong>
                        {medication.end_date || "-"}
                      </strong>
                    </div>
                  </div>

                  <div className="schedule-section">
                    <h3>Daily Schedule</h3>

                    {medicationSchedules.length === 0 ? (
                      <p className="no-schedule">
                        No schedule added yet.
                      </p>
                    ) : (
                      medicationSchedules.map(
                        (schedule, index) => (
                          <div
                            className="schedule-row"
                            key={
                              schedule.id ||
                              schedule.schedule_id ||
                              index
                            }
                          >
                            <div>
                              <span>Time</span>
                              <strong>
                                {schedule.scheduled_time}
                              </strong>
                            </div>

                            <div>
                              <span>Dose</span>
                              <strong>{schedule.dose}</strong>
                            </div>
                          </div>
                        )
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MedicationSchedule;