import { useEffect, useState } from "react";

function TaskForm({ onSubmit, editingTask, cancelEdit }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  // check if we are editing or creating
  useEffect(() => {
    // console.log("editing task prop:", editingTask)
    if (editingTask) {
      setTask({
        title: editingTask.title || "",
        description: editingTask.description || "",
      });
    } else {
      // reset state
      setTask({
        title: "",
        description: "",
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // basic validation
    if (!task.title.trim()) return; 

    onSubmit(task);

    // clear the form if it's a new task
    if (!editingTask) {
      setTask({
        title: "",
        description: "",
      });
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      
      {/* Header section */}
      <div className={`p-5 text-white ${editingTask ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-gradient-to-r from-indigo-600 to-blue-600"}`}>
        <h2 className="text-xl font-bold">
          {editingTask ? "✏️ Edit Task" : "➕ Create New Task"}
        </h2>
        <p className="text-sm opacity-90 mt-1">
          {editingTask ? "Update your existing task" : "Add a new task to your workflow"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Task Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter task title..."
            value={task.title}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Describe your task..."
            value={task.description}
            onChange={handleChange}
            rows="5"
            className="w-full border border-slate-300 rounded-xl p-3 outline-none resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        <div className="flex gap-3 pt-2">
          {/* submit btn */}
          <button
            type="submit"
            className={`flex-1 text-white py-3 rounded-xl font-semibold transition ${editingTask ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90" : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-90"}`}
          >
            {editingTask ? "Update Task" : "Add Task"}
          </button>

          {editingTask && (
            <button
              type="button"
              onClick={cancelEdit}
              className="px-5 py-3 rounded-xl bg-slate-200 text-slate-700 font-semibold hover:bg-slate-300 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      
    </div>
  );
}

export default TaskForm;