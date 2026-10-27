
function Header() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <h2 className="text-xl font-bold text-slate-800">
          Dashboard
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Welcome back! 
        </p>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="search"
          placeholder="Search tasks..."
          aria-label="Search tasks"
          className="w-48 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
        />

        <button
          type="button"
          aria-label="Notifications"
          className="rounded-lg p-2 text-xl hover:bg-slate-100"
        >
          ♧
        </button>

        <div className="grid h-10 w-10 place-items-center rounded-full bg-indigo-100 font-bold text-indigo-700">
          HP
        </div>
      </div>
    </header>
  )
}

export default Header
