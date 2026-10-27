
import { useState } from 'react'
import TaskCard from './TaskCard.jsx'
import CreateTaskModal from './CreateTaskModal.jsx'

const initialColumns = [
  {
    title: 'To Do',
    color: 'bg-slate-400',
    tasks: [
      {
        id: 1,
        title: 'Design login page',
        project: 'Website Redesign',
        priority: 'High',
        dueDate: 'Oct 25',
        assignee: 'CS',
      },
      {
        id: 2,
        title: 'Create project wireframes',
        project: 'Mobile App',
        priority: 'Medium',
        dueDate: 'Oct 27',
        assignee: 'LM',
      },
    ],
  },
  {
    title: 'In Progress',
    color: 'bg-blue-500',
    tasks: [
      {
        id: 3,
        title: 'Build authentication API',
        project: 'Backend Development',
        priority: 'High',
        dueDate: 'Oct 23',
        assignee: 'CS',
      },
    ],
  },
  {
    title: 'In Review',
    color: 'bg-amber-500',
    tasks: [
      {
        id: 4,
        title: 'Review dashboard design',
        project: 'Website Redesign',
        priority: 'Medium',
        dueDate: 'Oct 24',
        assignee: 'SK',
      },
    ],
  },
  {
    title: 'Done',
    color: 'bg-green-500',
    tasks: [
      {
        id: 5,
        title: 'Set up repository',
        project: 'Teamflow',
        priority: 'High',
        dueDate: 'Oct 20',
        assignee: 'UD',
      },
    ],
  },
]

function Board() {
  const [boardColumns, setBoardColumns] = useState(initialColumns)
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleCreateTask(newTask, selectedStatus) {
    setBoardColumns((currentColumns) =>
      currentColumns.map((column) =>
        column.title === selectedStatus
          ? {
              ...column,
              tasks: [...column.tasks, newTask],
            }
          : column
      )
    )
  }

  return (
    <>
      <section className="p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Task Board
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Track your team's progress.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            + Add Task
          </button>
        </div>

        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-4">
          {boardColumns.map((column) => (
            <section
              key={column.title}
              className="min-w-0 rounded-xl bg-slate-100 p-3"
            >
              <div className="mb-4 flex items-center gap-2 px-1">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${column.color}`}
                />

                <h4 className="font-semibold text-slate-700">
                  {column.title}
                </h4>

                <span className="ml-auto text-sm text-slate-500">
                  {column.tasks.length}
                </span>
              </div>

              <div className="space-y-3">
                {column.tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateTask}
        columns={boardColumns}
      />
    </>
  )
}

export default Board
