import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const adminToken = localStorage.getItem("adminToken");

  // If no authentication token, redirect to login page
  if (!adminToken) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render protected admin layout and child routes
  return <Outlet />;
};

export default AdminProtectedRoute;
