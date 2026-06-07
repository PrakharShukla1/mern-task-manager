function TaskCard({ task, onDelete, onToggle, onEdit }) {
  // console.log("current task:", task)

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-slate-200 hover:-translate-y-1">
      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            {/* status indicator dot */}
            <div className={`w-3 h-3 rounded-full ${task.status === "completed" ? "bg-green-500" : "bg-yellow-500"}`} />

            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${task.status === "completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
              {task.status === "completed" ? "Completed" : "Pending"}
            </span>
          </div>

          <h3 className={`text-2xl font-bold ${task.status === "completed" ? "line-through text-slate-400" : "text-slate-800"}`}>
            {task.title}
          </h3>

          <p className={`mt-3 leading-relaxed ${task.status === "completed" ? "text-slate-400" : "text-slate-600"}`}>
            {task.description}
          </p>

          {/* format date safely */}
          <div className="mt-5 text-sm text-slate-400">
            📅 Created: {task.createdAt ? new Date(task.createdAt).toLocaleString() : "N/A"}
          </div>
        </div>

        <div className="flex flex-wrap lg:flex-col gap-3 justify-start">
          {/* action btns */}
          <button
            onClick={() => onToggle?.(task._id)}
            className={`px-4 py-2 rounded-xl text-white font-medium transition ${task.status === "completed" ? "bg-amber-500 hover:bg-amber-600" : "bg-emerald-500 hover:bg-emerald-600"}`}
          >
            {task.status === "completed" ? "↩ Pending" : "✓ Complete"}
          </button>

          <button onClick={() => onEdit?.(task)} className="px-4 py-2 rounded-xl bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition">
            ✏ Edit
          </button>

          <button onClick={() => onDelete?.(task._id)} className="px-4 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition">
            🗑 Delete
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default TaskCard;