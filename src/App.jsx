import { useEffect, useState } from "react";

import RoleSelect from "./pages/RoleSelect";
import CaregiverLogin from "./pages/CaregiverLogin";
import ElderlyLogin from "./pages/ElderlyLogin";
import CaregiverDashboard from "./pages/CaregiverDashboard";
import ElderlyDashboard from "./pages/ElderlyDashboard";

import MedicationSchedule from "./pages/MedicationSchedule";
import AddMedication from "./pages/AddMedication";

import { checkBackendHealth } from "./services/api";

function App() {
  const savedRole =
    localStorage.getItem("careconnectRole");

  const savedLogin =
    localStorage.getItem(
      "careconnectLoggedIn"
    );

  const [role, setRole] = useState(
    savedRole || null
  );

  const [loggedIn, setLoggedIn] =
    useState(savedLogin === "true");

  const [currentPage, setCurrentPage] =
    useState("dashboard");

  useEffect(() => {
    checkBackendHealth()
      .then((data) => {
        console.log(
          "BACKEND CONNECTED:",
          data
        );
      })
      .catch((error) => {
        console.error(
          "BACKEND CONNECTION FAILED:",
          error
        );
      });
  }, []);

  const handleRoleSelect = (
    selectedRole
  ) => {
    setRole(selectedRole);
    setLoggedIn(false);
    setCurrentPage("dashboard");

    localStorage.setItem(
      "careconnectRole",
      selectedRole
    );

    localStorage.removeItem(
      "careconnectLoggedIn"
    );
  };

  const handleLoginSuccess = () => {
    setLoggedIn(true);

    localStorage.setItem(
      "careconnectLoggedIn",
      "true"
    );
  };

  const handleSwitchRole = () => {
    setRole(null);
    setLoggedIn(false);
    setCurrentPage("dashboard");

    localStorage.removeItem(
      "careconnectRole"
    );

    localStorage.removeItem(
      "careconnectLoggedIn"
    );
  };

  if (!role) {
    return (
      <RoleSelect
        onSelectRole={
          handleRoleSelect
        }
      />
    );
  }

  if (
    role === "caregiver" &&
    !loggedIn
  ) {
    return (
      <CaregiverLogin
        onLoginSuccess={
          handleLoginSuccess
        }
        onSwitchRole={
          handleSwitchRole
        }
      />
    );
  }

  if (
    role === "elderly" &&
    !loggedIn
  ) {
    return (
      <ElderlyLogin
        onLoginSuccess={
          handleLoginSuccess
        }
        onSwitchRole={
          handleSwitchRole
        }
      />
    );
  }

  if (
    role === "caregiver" &&
    currentPage === "addMedication"
  ) {
    return (
      <AddMedication
        onBack={() =>
          setCurrentPage("dashboard")
        }
      />
    );
  }

  if (
    role === "caregiver" &&
    currentPage ===
      "medicationSchedule"
  ) {
    return (
      <MedicationSchedule
        onBack={() =>
          setCurrentPage("dashboard")
        }
      />
    );
  }

  if (
    role === "elderly" &&
    currentPage ===
      "medicationSchedule"
  ) {
    return (
      <MedicationSchedule
        onBack={() =>
          setCurrentPage("dashboard")
        }
      />
    );
  }

  if (role === "caregiver") {
    return (
      <CaregiverDashboard
        onAddMedication={() =>
          setCurrentPage(
            "addMedication"
          )
        }
        onViewSchedule={() =>
          setCurrentPage(
            "medicationSchedule"
          )
        }
      />
    );
  }

  if (role === "elderly") {
    return (
      <ElderlyDashboard
        onViewSchedule={() =>
          setCurrentPage(
            "medicationSchedule"
          )
        }
      />
    );
  }

  return null;
}

export default App;