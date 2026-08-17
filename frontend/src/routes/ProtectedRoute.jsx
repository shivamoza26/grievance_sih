import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  allowedRoles = [],
}) => {
  const isAuthenticated =
    localStorage.getItem("isAuthenticated") === "true";

  const userRole =
    localStorage.getItem("userRole");

  // User is not logged in
  if (!isAuthenticated || !userRole) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // User does not have permission for this section
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(userRole)
  ) {
    return (
      <Navigate
        to={`/${userRole}/dashboard`}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;