import { useState } from "react";
import "./CaregiverLogin.css";

function CaregiverLogin({ onLoginSuccess, onSwitchRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter both your email and password.");
      return;
    }
    setError("");
    onLoginSuccess({ email });
  };

  return (
    <div className="cg-login-page">
      <div className="cg-login-brand">
        <div className="cg-brand-shape cg-shape-a" />
        <div className="cg-brand-shape cg-shape-b" />
        <div className="cg-brand-content">
          <h1>CareConnect</h1>
          <p>Caring for Ravi, together.</p>
        </div>
      </div>

      <div className="cg-login-form-panel">
        <form className="cg-login-form" onSubmit={handleSubmit}>
          <h2>Caregiver Sign In</h2>
          <p className="cg-login-sub">
            Track medication and stay ahead of missed doses.
          </p>

          <label className="cg-field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>

          <label className="cg-field">
            <span>Password</span>
            <div className="cg-password-wrap">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="cg-password-toggle"
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          {error && <p className="cg-error">{error}</p>}

          <button type="submit" className="cg-submit-btn">
            Sign In
          </button>

          <div className="cg-login-links">
            <button type="button" className="cg-link-btn">
              Forgot password?
            </button>
            <button type="button" className="cg-link-btn" onClick={onSwitchRole}>
              Not a caregiver?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CaregiverLogin;