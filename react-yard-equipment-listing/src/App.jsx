import React from "react";
import EquipmentTable from "./components/EquipmentTable.jsx";
import LoginPage from "./components/LoginPage.jsx";
import Dashboard from "./components/Dashboard.jsx";
import EquipmentType from "./components/EquipmentTypes.jsx";
import Logout from "./components/Logout.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/equipment" element={<EquipmentTable />} />
        <Route path="/equipment/types" element={<EquipmentType />} />
      </Routes>
    </div>
  );
}

export default App;
