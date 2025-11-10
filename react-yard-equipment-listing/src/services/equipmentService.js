import axios from "axios";

const BASE_URL = "http://localhost:8080/equipment";
axios.defaults.withCredentials = true; // include cookies for authentication

// Helper function for consistent error handling
const handleRequest = async (request) => {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Fetch all equipment
export const fetchEquipmentData = () =>
  handleRequest(() => axios.get(BASE_URL));

// Get single equipment details by ID
export const getEquipmentById = (id) =>
  handleRequest(() => axios.get(`${BASE_URL}/${id}`));

// Create new equipment
export const createEquipment = (equipmentData) =>
  handleRequest(() =>
    axios.post(BASE_URL, equipmentData, {
      headers: { "Content-Type": "application/json" },
    })
  );

// Update existing equipment
export const updateEquipment = (id, equipmentData) =>
  handleRequest(() =>
    axios.patch(`${BASE_URL}/${id}`, equipmentData, {
      headers: { "Content-Type": "application/json" },
    })
  );

// Delete equipment
export const deleteEquipment = (id) =>
  handleRequest(() => axios.delete(`${BASE_URL}/${id}`));

// Fetch equipment types
export const fetchEquipmentTypes = () =>
  handleRequest(() => axios.get(`${BASE_URL}/types`));
