import { useNavigate, useLocation } from "react-router-dom";

import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || "Guest";

  return (
    <div>
      <div className="header">
        <h1>Equipment Management System</h1>
        <div>
          <span>Welcome, {username}</span>
          <button className="logout-btn" onClick={() => navigate("/logout")}>
            Logout
          </button>
        </div>
      </div>

      <div className="container">
        <div className="welcome">
          <h2>Dashboard</h2>
          <p>
            Welcome to the Equipment Management System. Use the navigation below
            to access different features.
          </p>
        </div>

        <div className="nav-links">
          <div className="nav-card" onClick={() => navigate("/equipment")}>
            <h3>Equipment Management</h3>
            <p>View, add, edit, and manage yard equipment</p>
          </div>
          <div
            className="nav-card"
            onClick={() => navigate("/equipment/types")}
          >
            <h3>Equipment Types</h3>
            <p>View available equipment types</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
