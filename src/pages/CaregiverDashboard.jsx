import "./CaregiverDashboard.css";

function CaregiverDashboard() {
  return (
    <div className="dashboard-page">
      <header className="topbar">
        <div>
          <h1>CareConnect</h1>
          <p>Caregiver Dashboard</p>
        </div>

        <div className="patient-chip">Ravi</div>
      </header>

      <section className="welcome-section">
        <div>
          <h2>Good morning 👋</h2>
          <p>1 dose missed, 2 more coming up today.</p>
        </div>

        <div className="adherence-circle">
          <span>85%</span>
          <small>Adherence</small>
        </div>
      </section>

      {/* promoted out of the card grid so it can't get lost or scrolled past */}
      <section className="alert-banner">
        <div className="alert-banner-left">
          <span className="alert-dot" />
          <div className="alert-banner-text">
            <p>High risk alert</p>
            <h3>Amlodipine 5 mg</h3>
            <span>Scheduled dose at 08:00 PM was not confirmed.</span>
          </div>
        </div>

        <div className="alert-meta">
          <div>
            <span>Snoozed</span>
            <strong>2 times</strong>
          </div>
          <div>
            <span>Risk level</span>
            <strong className="risk-high">High</strong>
          </div>
        </div>

        <button className="primary-btn">View Alert</button>
      </section>

      <section className="stats-grid">
        <div className="stat-card taken">
          <h3>4</h3>
          <p>Taken</p>
        </div>
        <div className="stat-card snoozed">
          <h3>1</h3>
          <p>Snoozed</p>
        </div>
        <div className="stat-card missed">
          <h3>1</h3>
          <p>Missed</p>
        </div>
        <div className="stat-card upcoming">
          <h3>2</h3>
          <p>Upcoming</p>
        </div>
      </section>

      <section className="content-grid">
        <div className="card">
          <div className="section-heading">
            <h3>Today's Medication</h3>
            <button className="link-btn">View Schedule</button>
          </div>

          <div className="medicine-row">
            <div>
              <strong>Metformin 500 mg</strong>
              <p>08:00 AM • After breakfast</p>
            </div>
            <span className="badge green">Taken</span>
          </div>

          <div className="medicine-row">
            <div>
              <strong>Vitamin D</strong>
              <p>01:00 PM • After lunch</p>
            </div>
            <span className="badge orange">Snoozed</span>
          </div>

          <div className="medicine-row">
            <div>
              <strong>Amlodipine 5 mg</strong>
              <p>08:00 PM • After dinner</p>
            </div>
            <span className="badge red">Missed</span>
          </div>
        </div>
      </section>

      <section className="quick-actions">
        <button>Upload Prescription</button>
        <button>Medication Schedule</button>
        <button>View Adherence</button>
        <button>Emergency Contacts</button>
      </section>
    </div>
  );
}

export default CaregiverDashboard;