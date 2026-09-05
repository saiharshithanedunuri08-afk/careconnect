import { useState } from "react";
import "./ElderlyDashboard.css";
import CameraCapture from "./CameraCapture";

const initialDoses = [
  { id: 1, name: "Metformin 500 mg", time: "8:00 AM", instructions: "After breakfast", status: "taken" },
  { id: 2, name: "Vitamin D", time: "1:00 PM", instructions: "After lunch", status: "upcoming" },
  { id: 3, name: "Amlodipine 5 mg", time: "8:00 PM", instructions: "After dinner", status: "upcoming" },
];

function ElderlyDashboard({ patientName = "Ravi", caregiverPhone = "+10000000000" }) {
  const [doses, setDoses] = useState(initialDoses);
  const [showCamera, setShowCamera] = useState(false);
  const [confirmedMessage, setConfirmedMessage] = useState(null);

  const nextDose = doses.find((d) => d.status === "upcoming");
  const streak = 5; // TODO: wire to real adherence history

  const markStatus = (id, status) => {
    setDoses((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
  };

  const flashMessage = (text) => {
    setConfirmedMessage(text);
    setTimeout(() => setConfirmedMessage(null), 3000);
  };

  const handleTookIt = () => setShowCamera(true);

  const handlePhotoCaptured = () => {
    if (nextDose) markStatus(nextDose.id, "taken");
    setShowCamera(false);
    flashMessage("Nice work! Marked as taken. 🎉");
  };

  const handleSkipPhoto = () => {
    if (nextDose) markStatus(nextDose.id, "taken");
    setShowCamera(false);
    flashMessage("Marked as taken. 🎉");
  };

  const handleRemindLater = () => {
    if (nextDose) markStatus(nextDose.id, "snoozed");
  };

  const statusIcon = (status) => {
    if (status === "taken") return "✅";
    if (status === "snoozed") return "⏰";
    return "🕒";
  };

  return (
    <div className="eld-page">
      <header className="eld-header">
        <h1>Good morning, {patientName} 👋</h1>
      </header>

      {confirmedMessage && <div className="eld-toast">{confirmedMessage}</div>}

      <div className="eld-streak">
        🔥 <strong>{streak}-day streak</strong> — keep it up!
      </div>

      {nextDose ? (
        <section className="eld-hero-card">
          <p className="eld-hero-label">Time for your next medicine</p>
          <h2>{nextDose.name}</h2>
          <p className="eld-hero-sub">
            {nextDose.time} • {nextDose.instructions}
          </p>

          <div className="eld-hero-actions">
            <button className="eld-btn eld-btn-primary" onClick={handleTookIt}>
              ✅ I took it
            </button>
            <button className="eld-btn eld-btn-secondary" onClick={handleRemindLater}>
              Remind me later
            </button>
          </div>
        </section>
      ) : (
        <section className="eld-hero-card eld-hero-done">
          <h2>All done for today! 🎉</h2>
          <p className="eld-hero-sub">You've taken all your medicine.</p>
        </section>
      )}

      <section className="eld-schedule">
        <h3>Today's Schedule</h3>
        {doses.map((dose) => (
          <div className="eld-schedule-row" key={dose.id}>
            <span className="eld-schedule-icon">{statusIcon(dose.status)}</span>
            <div>
              <strong>{dose.name}</strong>
              <p>
                {dose.time} • {dose.instructions}
              </p>
            </div>
          </div>
        ))}
      </section>

      <a href={`tel:${caregiverPhone}`} className="eld-emergency-btn">
        📞 Call for Help
      </a>

      {showCamera && (
        <CameraCapture
          onCapture={handlePhotoCaptured}
          onSkip={handleSkipPhoto}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  );
}

export default ElderlyDashboard;