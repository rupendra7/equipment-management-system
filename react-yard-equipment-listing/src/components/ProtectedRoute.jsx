import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
    const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

    return isAuthenticated ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;