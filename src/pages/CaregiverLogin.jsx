import { useState } from "react";
import "./CaregiverLogin.css";

const DEMO_EMAIL = "caregiver@careconnect.com";
const DEMO_PASSWORD = "1234";

function CaregiverLogin({ onLoginSuccess, onSwitchRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError("Incorrect email or password.");
      return;
    }

    setError("");

    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  return (
    <div className="caregiver-login-page">
      <div className="caregiver-login-card">
        <div className="login-brand">
          <h1>CareConnect</h1>
          <p>Caregiver Login</p>
        </div>

        <div className="login-copy">
          <h2>Welcome Back</h2>
          <p>
            Sign in to monitor medication adherence, alerts and patient activity.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            Email Address
            <input
              type="email"
              placeholder="caregiver@careconnect.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="demo-credentials">
          <p>
            <strong>Demo Email:</strong> caregiver@careconnect.com
          </p>
          <p>
            <strong>Demo Password:</strong> 1234
          </p>
        </div>

        {onSwitchRole && (
          <button
            type="button"
            className="switch-role-button"
            onClick={onSwitchRole}
          >
            ← Switch Role
          </button>
        )}
      </div>
    </div>
  );
}

export default CaregiverLogin;