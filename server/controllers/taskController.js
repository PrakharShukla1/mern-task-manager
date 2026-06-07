const Task = require("../models/Task");

// Create Task
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      userId: req.user.userId,
    });

    res.status(201).json(task);
  } catch (error) {
    // console.log("createTask error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get All Tasks
const getTasks = async (req, res) => {
  try {
    // fetch tasks matching logged in user id and sort by newest
    const tasks = await Task.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    // console.log("getTasks error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // update fields if they exist in request body
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle Status
const toggleTaskStatus = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // simple toggle switch logic
    task.status = task.status === "pending" ? "completed" : "pending";

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    // console.log("toggle error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  toggleTaskStatus,
};