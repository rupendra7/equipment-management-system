import React, { useState, useEffect } from "react";
import {
  fetchEquipmentData,
  deleteEquipment,
  getEquipmentById,
} from "../services/equipmentService.js";
import "../styles/EquipmentTable.css";
import EquipmentForm from "./EquipmentForm";

const EquipmentTable = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchType, setSearchType] = useState("name"); // "name" or "id" or "type"
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [formData, setFormData] = useState({
    equipmentId: "",
    name: "",
    description: "",
    weight: "",
    speedUnit: "",
    isOperating: false,
    maxSpeed: "",
    craneActivityStartTime: "",
    equipmentType: "",
    equipmentActiveStatus: "",
  });
  const [editId, setEditId] = useState(null);

  const columnLabels = {
    equipmentId: "Equipment ID",
    name: "Name",
    description: "Description",
    weight: "Weight",
    speedUnit: "Speed Unit",
    isOperating: "Operating?",
    maxSpeed: "Max Speed",
    // craneActivityStartTime: "Activity Start Time",
    equipmentType: "Type",
    equipmentActiveStatus: "Status",
  };

  const columns = Object.keys(columnLabels);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchEquipmentData();
      console.log("Fetched data:", data);
      setEquipment(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (id) => {
    setLoading(true);
    try {
      if (searchTerm.trim() === "") {
        setFilteredEquipment(equipment);
        setEquipment([]);
      } else {
        const response = await getEquipmentById(id);
        console.log(">>Fetched data:", response);
        setEquipment(Array.isArray(response) ? response : [response]);
        console.log(">>equipment:", equipment);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this equipment?")) return;
    try {
      await deleteEquipment(id);
      loadData(); // Refresh
    } catch (error) {
      alert(error.message || "Delete failed");
    }
  };

  const openCreate = () => {
    setModalMode("create");
    setSelectedItem(null);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setModalMode("edit");
    setSelectedItem(item);
    setModalOpen(true);
  };

  const openView = (item) => {
    setModalMode("view");
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    //setFilteredEquipment(equipment);
    setEquipment([]);
  };

  return (
    <div className="table-container">
      <h2 className="custom-heading">Yard Equipment List 📋</h2>
      <div className="table-header">
        <button className="btn-new" onClick={openCreate}>
          + New Equipment
        </button>
      </div>
      {/* Search Section */}
      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder={"Search for equipment by ID..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button
            onClick={() => handleSearch(searchTerm)}
            className="search-button"
          >
            Search
          </button>
          <button onClick={handleClearSearch} className="clear-button">
            Clear Result
          </button>
          <button onClick={loadData} className="clear-button">
            Fetch All Data
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="equipment-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{columnLabels[col]}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {equipment.map((item) => (
              <tr key={item.equipmentId}>
                {columns.map((col) => (
                  <td key={col}>
                    {" "}
                    {col === "isOperating"
                      ? item[col]
                        ? "Yes"
                        : "No"
                      : String(item[col] ?? "")}
                  </td>
                ))}
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(item.equipmentId)}
                  >
                    Delete
                  </button>
                  <button className="btn-edit" onClick={() => openEdit(item)}>
                    Edit
                  </button>
                  <button className="btn-view" onClick={() => openView(item)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && (
        <EquipmentForm
          mode={modalMode}
          initialData={selectedItem}
          onClose={() => setModalOpen(false)}
          onSuccess={loadData}
        />
      )}
    </div>
  );
};

export default EquipmentTable;
