
function TaskCard({ task }) {
  const priorityStyles = {
    High: 'bg-red-50 text-red-700',
    Medium: 'bg-amber-50 text-amber-700',
    Low: 'bg-green-50 text-green-700',
  }

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${
            priorityStyles[task.priority] ||
            'bg-slate-100 text-slate-600'
          }`}
        >
          {task.priority}
        </span>

        <button
          type="button"
          aria-label={`More actions for ${task.title}`}
          className="text-slate-400 hover:text-slate-700"
        >
          ⋯
        </button>
      </div>

      <h4 className="font-semibold text-slate-800">
        {task.title}
      </h4>

      <p className="mt-2 text-sm text-slate-500">
        {task.project}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="text-xs text-slate-500">
          Due {task.dueDate}
        </span>

        <span className="grid h-8 w-8 place-items-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
          {task.assignee}
        </span>
      </div>
    </article>
  )
}

export default TaskCard
