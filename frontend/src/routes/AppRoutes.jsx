import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Home
import Home from "../pages/Home";

// Auth
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";

// Protection
import ProtectedRoute from "./ProtectedRoute";

// Citizen
import CitizenDashboard from "../pages/citizen/CitizenDashboard";
import SubmitGrievance from "../pages/citizen/SubmitGrievance";
import MyGrievances from "../pages/citizen/MyGrievances";
import GrievanceDetails from "../pages/citizen/GrievanceDetails";

// Officer
import OfficerDashboard from "../pages/officer/OfficerDashboard";
import AssignedGrievances from "../pages/officer/AssignedGrievances";
import OfficerGrievanceDetails from "../pages/officer/OfficerGrievanceDetails";

// Admin
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminAnalytics from "../pages/admin/AdminAnalytics";
import AdminGrievances from "../pages/admin/AdminGrievances";
import AdminGrievanceDetails from "../pages/admin/AdminGrievanceDetails";
import Departments from "../pages/admin/Departments";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ================= PUBLIC ================= */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />


      {/* ================= CITIZEN ================= */}

      <Route
        path="/citizen/dashboard"
        element={
          <ProtectedRoute allowedRoles={["citizen"]}>
            <CitizenDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/citizen/submit"
        element={
          <ProtectedRoute allowedRoles={["citizen"]}>
            <SubmitGrievance />
          </ProtectedRoute>
        }
      />

      <Route
        path="/citizen/grievances"
        element={
          <ProtectedRoute allowedRoles={["citizen"]}>
            <MyGrievances />
          </ProtectedRoute>
        }
      />

      <Route
        path="/citizen/grievances/:id"
        element={
          <ProtectedRoute allowedRoles={["citizen"]}>
            <GrievanceDetails />
          </ProtectedRoute>
        }
      />


      {/* ================= OFFICER ================= */}

      <Route
        path="/officer/dashboard"
        element={
          <ProtectedRoute allowedRoles={["officer"]}>
            <OfficerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/officer/grievances"
        element={
          <ProtectedRoute allowedRoles={["officer"]}>
            <AssignedGrievances />
          </ProtectedRoute>
        }
      />

      <Route
        path="/officer/priority"
        element={
          <ProtectedRoute allowedRoles={["officer"]}>
            <AssignedGrievances priorityOnly />
          </ProtectedRoute>
        }
      />

      <Route
        path="/officer/grievances/:id"
        element={
          <ProtectedRoute allowedRoles={["officer"]}>
            <OfficerGrievanceDetails />
          </ProtectedRoute>
        }
      />


      {/* ================= ADMIN ================= */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/analytics"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminAnalytics />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/grievances"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminGrievances />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/grievances/:id"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminGrievanceDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/departments"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Departments />
          </ProtectedRoute>
        }
      />


      {/* ================= FALLBACK ================= */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
};

export default AppRoutes;
