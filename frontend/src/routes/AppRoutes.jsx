import { Routes, Route, Navigate } from "react-router-dom";

// Home
import Home from "../pages/Home";

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

const AppRoutes = () => {
  return (
    <Routes>

      {/* =========================================
          PUBLIC
      ========================================= */}

      <Route
        path="/"
        element={<Home />}
      />


      {/* =========================================
          CITIZEN
      ========================================= */}

      <Route
        path="/citizen/dashboard"
        element={<CitizenDashboard />}
      />

      <Route
        path="/citizen/submit"
        element={<SubmitGrievance />}
      />

      <Route
        path="/citizen/grievances"
        element={<MyGrievances />}
      />

      <Route
        path="/citizen/grievances/:id"
        element={<GrievanceDetails />}
      />


      {/* =========================================
          OFFICER
      ========================================= */}

      <Route
        path="/officer/dashboard"
        element={<OfficerDashboard />}
      />

      <Route
        path="/officer/grievances"
        element={<AssignedGrievances />}
      />

      <Route
        path="/officer/priority"
        element={<AssignedGrievances priorityOnly />}
      />

      <Route
        path="/officer/grievances/:id"
        element={<OfficerGrievanceDetails />}
      />


      {/* =========================================
          ADMIN
      ========================================= */}

      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />

      <Route
        path="/admin/analytics"
        element={<AdminAnalytics />}
      />


      {/* =========================================
          FALLBACK
      ========================================= */}

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