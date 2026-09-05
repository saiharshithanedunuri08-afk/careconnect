import "./RoleSelect.css";

function RoleSelect({ onSelectRole }) {
  return (
    <div className="role-page">
      <div className="role-card">
        <div className="brand">
          <span className="brand-icon">🌿</span>
          <h1>CareConnect</h1>
          <p>Your caring companion for everyday health support</p>
        </div>

        <div className="role-heading">
          <h2>How would you like to continue?</h2>
          <p>Please choose the option that best describes you.</p>
        </div>

        <div className="role-options">
          <button
            className="role-option"
            onClick={() => onSelectRole("elderly")}
          >
            <div className="role-icon elderly-icon">👵</div>

            <div>
              <h3>I am taking my medicine</h3>
              <p>
                View reminders, health checks, family support and assistance.
              </p>
            </div>

            <span className="arrow">→</span>
          </button>

          <button
            className="role-option"
            onClick={() => onSelectRole("caregiver")}
          >
            <div className="role-icon caregiver-icon">🤝</div>

            <div>
              <h3>I am a Caregiver</h3>
              <p>
                Monitor medication adherence, prescriptions and important
                alerts.
              </p>
            </div>

            <span className="arrow">→</span>
          </button>
        </div>

        <button className="voice-help">
          🎙 Need help? Use Voice Assistance
        </button>

        <div className="language-section">
          <span>Language</span>

          <select defaultValue="English">
            <option>English</option>
            <option>తెలుగు</option>
            <option>ಕನ್ನಡ</option>
            <option>हिन्दी</option>
            <option>தமிழ்</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default RoleSelect;