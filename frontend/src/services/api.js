import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getErrorMessage = (error) =>
  error?.response?.data?.detail ||
  error?.message ||
  "Something went wrong. Please try again.";

const normalizeStatus = (status) => {
  const value = String(status || "").toUpperCase();

  if (value === "SUBMITTED" || value === "ASSIGNED") {
    return value === "ASSIGNED" ? "IN_PROGRESS" : "PENDING";
  }

  return value || "PENDING";
};

export const normalizeGrievance = (raw) => {
  if (!raw) return null;

  const id = raw.grievance_id || `GRV-${String(raw.id).padStart(4, "0")}`;
  const title =
    raw.topic ||
    raw.category ||
    raw.description?.split(/[.!?]/)[0]?.slice(0, 70) ||
    "Grievance";

  const department =
    raw.department_name ||
    raw.department?.name ||
    "Not assigned";

  const citizen =
    raw.citizen_name ||
    raw.citizen?.name ||
    "Citizen";

  const status = normalizeStatus(raw.status);

  const priority =
    raw.priority ||
    (raw.confidence != null && raw.confidence >= 0.7
      ? "HIGH"
      : "MEDIUM");

  return {
    ...raw,
    id,
    databaseId: raw.id,
    title,
    citizen,
    department,
    status,
    priority,
    location: raw.location || "Not provided",
    submittedAt: raw.created_at
      ? new Date(raw.created_at).toLocaleString()
      : "Not available",
    aiSummary: raw.description,
  };
};

export async function login(email, password) {
  const body = new URLSearchParams();
  body.set("username", email);
  body.set("password", password);

  const response = await api.post("/api/auth/login", body, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const data = response.data;
  const role = String(data.role || "").toLowerCase();

  localStorage.setItem("accessToken", data.access_token);
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("userRole", role);
  if (data.name) localStorage.setItem("userName", data.name);
  if (data.email) localStorage.setItem("userEmail", data.email);

  return {
    ...data,
    role,
  };
}

export async function registerCitizen({ name, email, password }) {
  const response = await api.post("/api/auth/register", {
    name,
    email,
    password,
    role: "CITIZEN",
  });

  return response.data;
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
}

export async function createGrievance({ description, location }) {
  const response = await api.post("/api/grievances", {
    description,
    location,
  });

  return normalizeGrievance(response.data);
}

export async function getMyGrievances(params = {}) {
  const response = await api.get("/api/grievances", {
    params,
  });

  return {
    ...response.data,
    items: (response.data.items || []).map(normalizeGrievance),
  };
}

export async function getGrievance(id) {
  const response = await api.get(`/api/grievances/${id}`);
  const payload = response.data;

  return {
    grievance: normalizeGrievance(payload.grievance || payload),
    timeline: payload.timeline || [],
  };
}

export async function updateGrievanceStatus(id, newStatus, comment = "") {
  const response = await api.put(`/api/grievances/${id}/status`, {
    new_status: newStatus,
    comment: comment || null,
  });

  return normalizeGrievance(response.data);
}

export async function replyToGrievance(id, comment) {
  const response = await api.post(`/api/grievances/${id}/reply`, {
    comment,
  });

  return response.data;
}

export async function getAdminGrievances(params = {}) {
  const response = await api.get("/api/admin/grievances", {
    params,
  });

  return {
    ...response.data,
    items: (response.data.items || []).map(normalizeGrievance),
  };
}

export async function getAdminAnalytics(location) {
  const response = await api.get("/api/admin/analytics", {
    params: location ? { location } : {},
  });

  const data = response.data;

  return {
    ...data,
    resolutionRate: Number(data.resolution_rate || 0),
    categoryData: Object.entries(data.by_category || {}).map(
      ([name, value]) => ({
        name,
        value,
      })
    ),
    departmentData: data.by_department || {},
    byStatus: data.by_status || {},
  };
}

export async function getDepartments() {
  const response = await api.get("/api/admin/departments");
  return response.data;
}

export async function getOfficerGrievances() {
  const response = await api.get("/api/officer/grievances");

  return response.data.map(normalizeGrievance);
}
