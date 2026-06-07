const express = require("express");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} = require("../controllers/taskController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get All Tasks
router.get("/", protect, getTasks);

// Create Task
router.post("/", protect, createTask);

// Update Task
router.put("/:id", protect, updateTask);

// Delete Task
router.delete("/:id", protect, deleteTask);

// Toggle Task Status
router.patch("/:id/status", protect, toggleTaskStatus);

module.exports = router;