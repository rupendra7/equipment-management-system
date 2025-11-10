import React, { useEffect, useState } from "react";
import { fetchEquipmentTypes } from "../services/equipmentService.js";

const EquipmentTypes = () => {
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEquipmentTypes();
      console.log("Fetched types:", data);
      setEquipmentTypes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Failed to load equipment types");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className="custom-heading">Equipment Types</h2>
      <ul>
        {equipmentTypes.map((type, index) => (
          <li key={index}>{type}</li>
        ))}
      </ul>
    </div>
  );
};

export default EquipmentTypes;
