import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (taskData) => {
    try {
      await createTask(taskData);
      toast.success("Task Created");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to create task");
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await updateTask(editingTask._id, taskData);
      toast.success("Task Updated");

      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      toast.success("Task Deleted");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const handleToggleTask = async (id) => {
    try {
      await toggleTaskStatus(id);
      toast.success("Task Updated");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ? true : task.status === filter;

    return matchesSearch && matchesFilter;
  });

  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Task Dashboard
          </h2>

          <p className="text-slate-600 mt-2 text-lg">
            Organize, track and complete your work efficiently
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">
            <p className="text-blue-100">Total Tasks</p>
            <h3 className="text-4xl font-bold mt-2">
              {tasks.length}
            </h3>
          </div>

          <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white p-6 rounded-2xl shadow-lg">
            <p className="text-amber-100">Pending Tasks</p>
            <h3 className="text-4xl font-bold mt-2">
              {pendingTasks}
            </h3>
          </div>

          <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
            <p className="text-green-100">Completed Tasks</p>
            <h3 className="text-4xl font-bold mt-2">
              {completedTasks}
            </h3>
          </div>
        </div>

        {/* Edit Banner */}
        {editingTask && (
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-l-4 border-yellow-500 text-yellow-900 p-4 rounded-xl mb-6 shadow">
            ✏️ Editing:
            <span className="font-semibold ml-2">
              {editingTask.title}
            </span>
          </div>
        )}

        {/* Task Form */}
        <div className="mb-6">
          <TaskForm
            onSubmit={
              editingTask
                ? handleUpdateTask
                : handleCreateTask
            }
            editingTask={editingTask}
            cancelEdit={() => setEditingTask(null)}
          />
        </div>

        {/* Search & Filter */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-slate-200 mb-8">
          <h3 className="text-xl font-bold text-indigo-600 mb-4">
            Search & Filter Tasks
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search by title or description..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
              className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Task List */}
        <div>
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-2xl font-bold text-slate-800">
              Your Tasks
            </h3>

            <span className="bg-white px-4 py-2 rounded-full shadow text-slate-600">
              {filteredTasks.length} Tasks Found
            </span>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-14 text-center">
              <div className="text-6xl mb-4">🚀</div>

              <h3 className="text-2xl font-bold text-slate-700">
                No Tasks Found
              </h3>

              <p className="text-slate-500 mt-3">
                Create a task and start boosting your productivity.
              </p>
            </div>
          ) : (
            <div className="grid gap-5">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={handleDeleteTask}
                  onToggle={handleToggleTask}
                  onEdit={handleEditTask}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;