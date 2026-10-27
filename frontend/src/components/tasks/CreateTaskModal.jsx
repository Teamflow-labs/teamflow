
import { useState } from 'react'

function CreateTaskModal({ isOpen, onClose, onCreate, columns }) {
  const [title, setTitle] = useState('')
  const [project, setProject] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [dueDate, setDueDate] = useState('')
  const [assignee, setAssignee] = useState('')
  const [status, setStatus] = useState('To Do')

  if (!isOpen) {
    return null
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      project: project.trim(),
      priority,
      dueDate,
      assignee: assignee.trim().toUpperCase(),
    }

    if (!newTask.title || !newTask.project || !newTask.assignee || !dueDate) {
      return
    }

    onCreate(newTask, status)

    setTitle('')
    setProject('')
    setPriority('Medium')
    setDueDate('')
    setAssignee('')
    setStatus('To Do')
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 p-4"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-task-title"
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2
              id="create-task-title"
              className="text-xl font-bold text-slate-800"
            >
              Create a Task
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Add task
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg px-3 py-1 text-xl text-slate-500 hover:bg-slate-100"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="task-title"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Task title
            </label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Build the login page"
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label
              htmlFor="task-project"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Project name
            </label>
            <input
              id="task-project"
              type="text"
              value={project}
              onChange={(event) => setProject(event.target.value)}
              placeholder="e.g. Website Redesign"
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="task-priority"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Priority
              </label>
              <select
                id="task-priority"
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="task-due-date"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Due date
              </label>
              <input
                id="task-due-date"
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="task-assignee"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Assignee initials
            </label>
            <input
              id="task-assignee"
              type="text"
              value={assignee}
              onChange={(event) => setAssignee(event.target.value)}
              placeholder="e.g. HP"
              maxLength={4}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="task-status"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Add to column
            </label>
            <select
              id="task-status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500"
            >
              {columns.map((column) => (
                <option key={column.title} value={column.title}>
                  {column.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Create Task
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default CreateTaskModal
