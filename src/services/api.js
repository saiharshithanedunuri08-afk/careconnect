const BASE_URL = "http://172.17.211.216:8000";

// Change the IP above to your friend's backend laptop IP

export async function getMedications(patientId) {
  const response = await fetch(`${BASE_URL}/medications/${patientId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch medications");
  }

  return await response.json();
}

export async function addMedication(medicationData) {
  const response = await fetch(`${BASE_URL}/medications/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(medicationData),
  });

  if (!response.ok) {
    throw new Error("Failed to add medication");
  }

  return await response.json();
}

export async function getSchedules(medicationId) {
  const response = await fetch(`${BASE_URL}/schedules/${medicationId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch schedules");
  }

  return await response.json();
}

export async function addSchedule(scheduleData) {
  const response = await fetch(`${BASE_URL}/schedules/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(scheduleData),
  });

  if (!response.ok) {
    throw new Error("Failed to add schedule");
  }

  return await response.json();
}

export async function checkBackendHealth() {
  const response = await fetch(`${BASE_URL}/health`);

  if (!response.ok) {
    throw new Error("Backend is not reachable");
  }

  return await response.json();
}