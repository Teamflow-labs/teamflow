function Header({ title = 'Dashboard', onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex min-h-20 flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 md:hidden"
        >
          ☰
        </button>

        <div>
          <h1 className="text-xl font-bold text-slate-900">{title}</h1>
          <p className="mt-1 hidden text-sm text-slate-500 sm:block">
            Welcome back! Here's what's happening with your workspace.
          </p>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-3 sm:gap-4">
        <label className="relative hidden sm:block">
          <span className="sr-only">Search tasks</span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          >
            ⌕
          </span>
          <input
            type="search"
            placeholder="Search tasks..."
            className="w-40 rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 md:w-52"
          />
        </label>

        <button
          type="button"
          aria-label="Notifications"
          className="rounded-lg p-2 text-lg text-slate-600 transition hover:bg-slate-100"
        >
          ♧
        </button>

        <button
          type="button"
          aria-label="User profile"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-indigo-100 font-bold text-indigo-700 ring-2 ring-white"
        >
          HP
        </button>
      </div>
    </header>
  )
}

export default Header
