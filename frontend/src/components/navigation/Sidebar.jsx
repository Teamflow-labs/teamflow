
const navigationItems = [
  { icon: '◫', label: 'Dashboard' },
  { icon: '▦', label: 'Projects' },
  { icon: '✓', label: 'My Tasks' },
  { icon: '♙', label: 'Team' },
  { icon: '⚙', label: 'Settings' },
]

function Sidebar() {
  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white p-5">
      <h1 className="mb-10 text-2xl font-bold text-indigo-600">
        Teamflow
      </h1>

      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Workspace
      </p>

      <nav className="space-y-2">
        {navigationItems.map((item, index) => (
          <button
            key={item.label}
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
              index === 0
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
