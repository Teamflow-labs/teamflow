import { NavLink } from 'react-router'

const navigationItems = [
  { icon: '◫', label: 'Dashboard', to: '/dashboard' },
  { icon: '▦', label: 'Projects', to: '/projects' },
  { icon: '✓', label: 'My Tasks', to: '/tasks' },
  { icon: '♙', label: 'Team', to: '/team' },
  { icon: '⚙', label: 'Settings', to: '/settings' },
]

function Sidebar({ isOpen = false, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white p-5 transition-transform duration-200 md:sticky md:top-0 md:h-screen md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          <NavLink
            to="/dashboard"
            onClick={onClose}
            className="text-2xl font-bold text-indigo-600"
          >
            Teamflow
          </NavLink>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden"
          >
            ✕
          </button>
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Workspace
        </p>

        <nav aria-label="Main navigation" className="space-y-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              <span aria-hidden="true" className="text-lg">
                {item.icon}
              </span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto rounded-xl bg-indigo-50 p-4">
          <p className="font-semibold text-indigo-900">Teamwork made simple</p>
          <p className="mt-1 text-sm text-indigo-700">
            Keep your projects moving forward.
          </p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
