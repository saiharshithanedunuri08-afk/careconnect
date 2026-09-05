import { useState } from "react";
import RoleSelect from "./pages/RoleSelect";
import CaregiverLogin from "./pages/CaregiverLogin";
import ElderlyLogin from "./pages/ElderlyLogin";
import CaregiverDashboard from "./pages/CaregiverDashboard";
import ElderlyDashboard from "./pages/ElderlyDashboard";

function App() {
  const [screen, setScreen] = useState("role");

  if (screen === "role") {
    return (
      <RoleSelect
        onSelectRole={(role) =>
          setScreen(role === "caregiver" ? "login-caregiver" : "login-elderly")
        }
      />
    );
  }

  if (screen === "login-caregiver") {
    return (
      <CaregiverLogin
        onLoginSuccess={() => setScreen("dashboard-caregiver")}
        onSwitchRole={() => setScreen("login-elderly")}
      />
    );
  }

  if (screen === "login-elderly") {
    return (
      <ElderlyLogin
        patientName="Ravi"
        caregiverPhone="+919876543210"
        onLoginSuccess={() => setScreen("dashboard-elderly")}
        onSwitchRole={() => setScreen("login-caregiver")}
      />
    );
  }

  if (screen === "dashboard-caregiver") return <CaregiverDashboard />;
  if (screen === "dashboard-elderly")
    return <ElderlyDashboard patientName="Ravi" caregiverPhone="+919876543210" />;

  return null;
}

export default App;