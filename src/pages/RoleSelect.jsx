import "./RoleSelect.css";

function RoleSelect({ onSelectRole }) {
  return (
    <div className="role-page">
      <div className="role-card">
        <h1>CareConnect</h1>
        <p className="role-sub">Who's using the app right now?</p>

        <div className="role-options">
          <button
            className="role-option"
            onClick={() => onSelectRole("caregiver")}
          >
            <span className="role-icon">🗂️</span>
            <span className="role-title">I'm a Caregiver</span>
            <span className="role-desc">
              Track medications and manage alerts
            </span>
          </button>

          <button
            className="role-option"
            onClick={() => onSelectRole("elderly")}
          >
            <span className="role-icon">💊</span>
            <span className="role-title">I'm taking my medicine</span>
            <span className="role-desc">
              See your reminders and confirm your doses
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleSelect;