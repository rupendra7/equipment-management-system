import React, { useState, useEffect } from "react";
import {
  createEquipment,
  updateEquipment,
  fetchEquipmentTypes,
} from "../services/equipmentService.js";
import "../styles/EquipmentForm.css";

const EquipmentForm = ({
  mode = "create", // 'create' | 'edit' | 'view'
  initialData = {}, // Data for edit/view
  onClose,
  onSuccess,
}) => {
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
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typesLoading, setTypesLoading] = useState(true);
  const [error, setError] = useState("");

  // Load equipment types
  useEffect(() => {
    const loadTypes = async () => {
      setTypesLoading(true);
      try {
        const data = await fetchEquipmentTypes();
        setEquipmentTypes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load types:", err);
      } finally {
        setTypesLoading(false);
      }
    };
    loadTypes();
  }, []);

  // Set initial data for edit/view
  useEffect(() => {
    if (mode !== "create" && initialData) {
      setFormData({
        ...formData,
        ...initialData,
      });
    }
  }, [initialData, mode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.equipmentType) {
      setError("Name and Type are required.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      if (mode === "create") {
        await createEquipment(formData);
      } else if (mode === "edit") {
        await updateEquipment(initialData.equipmentId, formData);
      }
      onSuccess?.();
      onClose?.();
    } catch (err) {
      setError(err.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const isView = mode === "view";

  return (
    <div className="form-modal">
      <div className="form-content">
        <h2>
          {mode === "create"
            ? "Add New Equipment"
            : mode === "edit"
              ? "Edit Equipment"
              : "View Equipment"}
        </h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={isView || loading}
              required
            />
          </div>

          <div className="form-group">
            <label>Type *</label>
            {typesLoading ? (
              <p>Loading types...</p>
            ) : (
              <select
                name="equipmentType"
                value={formData.equipmentType}
                onChange={handleChange}
                disabled={isView || loading}
                required
              >
                <option value="">-- Select Type --</option>
                {equipmentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={isView || loading}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Weight</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              disabled={isView || loading}
            />
          </div>

          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="isOperating"
                checked={formData.isOperating}
                onChange={handleChange}
                disabled={isView || loading}
              />
              Operating?
            </label>
          </div>

          {!isView && (
            <div className="form-actions">
              <button type="submit" disabled={loading}>
                {loading
                  ? "Saving..."
                  : mode === "create"
                    ? "Create"
                    : "Update"}
              </button>
              <button type="button" onClick={onClose} disabled={loading}>
                Cancel
              </button>
            </div>
          )}

          {isView && (
            <div className="form-actions">
              <button type="button" onClick={onClose}>
                Close
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EquipmentForm;
