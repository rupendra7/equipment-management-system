// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/';

// Reusable axios instance 
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, //  session cookies
});

/**
 * Login user
 * @param {string} username
 * @param {string} password
 * @returns {Promise<string>} "Success" or error message
 */
export const login = async (username, password) => {
  try {
    const response = await api.post('/login', null, {
      params: { username, password },
    });

    // Backend returns plain text "Success"
    if (response.data === 'Success') {
      return 'Success';
    } else {
      throw new Error(response.data || 'Login failed');
    }
  } catch (error) {
    // Extract backend message or fallback
    const message = error.response?.data || error.message || 'Network error';
    throw new Error(message);
  }
};

// Logout user
export const logout = async () => {
  try {
    await api.get("/logout");
    return "Success";
  } catch (error) {
    const message = error.response?.data || error.message || "Logout failed";
    throw new Error(message);
  }
};