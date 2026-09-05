import { useState } from "react";
import "./ElderlyLogin.css";

const CORRECT_PIN = "1234"; // demo only — replace with real auth check

function ElderlyLogin({
  patientName = "Ravi",
  caregiverPhone = "+10000000000",
  onLoginSuccess,
  onSwitchRole,
}) {
  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);

  const handleDigit = (digit) => {
    if (pin.length >= 4) return;
    const next = pin + digit;
    setPin(next);

    if (next.length === 4) {
      if (next === CORRECT_PIN) {
        setTimeout(() => onLoginSuccess(), 200);
      } else {
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setPin("");
        }, 500);
      }
    }
  };

  const handleBackspace = () => setPin((p) => p.slice(0, -1));

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];

  return (
    <div className="el-login-page">
      <div className="el-avatar">👤</div>
      <h1>Welcome back, {patientName}</h1>
      <p className="el-login-sub">Enter your 4-digit code</p>

      <div className={`el-pin-dots ${shake ? "el-shake" : ""}`}>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`el-dot ${pin.length > i ? "el-dot-filled" : ""}`}
          />
        ))}
      </div>

      <div className="el-keypad">
        {keys.map((k, i) => {
          if (k === "") return <div key={i} />;
          if (k === "⌫") {
            return (
              <button
                key={i}
                className="el-key el-key-action"
                onClick={handleBackspace}
                aria-label="Backspace"
              >
                ⌫
              </button>
            );
          }
          return (
            <button key={i} className="el-key" onClick={() => handleDigit(k)}>
              {k}
            </button>
          );
        })}
      </div>

      <a href={`tel:${caregiverPhone}`} className="el-help-link">
        📞 Need help? Call your caregiver
      </a>

      <button className="el-switch-link" onClick={onSwitchRole}>
        I'm a caregiver
      </button>
    </div>
  );
}

export default ElderlyLogin;