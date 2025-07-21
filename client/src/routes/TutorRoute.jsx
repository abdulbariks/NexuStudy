import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useRole from "../hooks/useRole";
import { Navigate, useLocation } from "react-router";

const TutorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, roleLoading] = useRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  if (!user || role !== "tutor") {
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default TutorRoute;
