import { useState } from "react";

import RoleSelect from "./pages/RoleSelect";
import CaregiverLogin from "./pages/CaregiverLogin";
import ElderlyLogin from "./pages/ElderlyLogin";
import CaregiverDashboard from "./pages/CaregiverDashboard";
import ElderlyDashboard from "./pages/ElderlyDashboard";

function App() {
  // Read previous login from browser storage
  const savedRole = localStorage.getItem("careconnectRole");
  const savedLogin = localStorage.getItem("careconnectLoggedIn");

  const [role, setRole] = useState(savedRole || null);
  const [loggedIn, setLoggedIn] = useState(savedLogin === "true");

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);

    // Remember which type of user selected the app
    localStorage.setItem("careconnectRole", selectedRole);
  };

  const handleLoginSuccess = () => {
    setLoggedIn(true);

    // Remember that this device has logged in successfully
    localStorage.setItem("careconnectLoggedIn", "true");
  };

  const handleSwitchRole = () => {
    setRole(null);
    setLoggedIn(false);

    localStorage.removeItem("careconnectRole");
    localStorage.removeItem("careconnectLoggedIn");
  };

  // FIRST TIME: select role
  if (!role) {
    return <RoleSelect onSelectRole={handleRoleSelect} />;
  }

  // Caregiver login only when not already logged in
  if (role === "caregiver" && !loggedIn) {
    return (
      <CaregiverLogin
        onLoginSuccess={handleLoginSuccess}
        onSwitchRole={handleSwitchRole}
      />
    );
  }

  // Elderly login only when not already logged in
  if (role === "elderly" && !loggedIn) {
    return (
      <ElderlyLogin
        onLoginSuccess={handleLoginSuccess}
        onSwitchRole={handleSwitchRole}
      />
    );
  }

  // Already logged in → go directly to dashboard
  if (role === "caregiver") {
    return <CaregiverDashboard />;
  }

  if (role === "elderly") {
    return <ElderlyDashboard />;
  }

  return null;
}

export default App;