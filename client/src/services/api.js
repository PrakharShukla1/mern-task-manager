import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-task-manager-waos.onrender.com",
});

// Add JWT token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Auth APIs
export const registerUser = (userData) =>
  API.post("/auth/register", userData);

export const loginUser = (userData) =>
  API.post("/auth/login", userData);

// Task APIs
export const getTasks = () =>
  API.get("/tasks");

export const createTask = (taskData) =>
  API.post("/tasks", taskData);

export const updateTask = (id, taskData) =>
  API.put(`/tasks/${id}`, taskData);

export const deleteTask = (id) =>
  API.delete(`/tasks/${id}`);

export const toggleTaskStatus = (id) =>
  API.patch(`/tasks/${id}/status`);

export default API;