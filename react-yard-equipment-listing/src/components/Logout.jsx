import React, { useEffect } from "react";
import { logout } from "../services/authService.js";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout();
        localStorage.removeItem("isLoggedIn");
        navigate("/");
      } catch (error) {
        console.error("Logout failed:", error);
        alert("Error logging out. Please try again.");
      }
    };

    handleLogout();
  }, [navigate]);

  return <p>Logging out...</p>;
};

export default Logout;
