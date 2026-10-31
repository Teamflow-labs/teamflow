
import { Link, Routes, Route } from 'react-router'

import AppLayout from './components/layout/AppLayout.jsx'
import StatCard from './components/ui/StatCard.jsx'
import Board from './components/tasks/Board.jsx'

function Home() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-3xl font-bold text-slate-900">
        Welcome to Teamflow
      </h1>

      <p className="mt-3 text-slate-600">
        Track your projects here.
      </p>

      <Link
        to="/dashboard"
        className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700"
      >
        Open Dashboard
      </Link>
    </main>
  )
}

function Dashboard() {
  return (
    <>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Projects"
          value="12"
          description="Across your workspace"
        />

        <StatCard
          title="Active Tasks"
          value="6"
          description="Tasks currently underway"
        />

        <StatCard
          title="Completed"
          value="24"
          description="Tasks finished so far"
        />

        <StatCard
          title="Overdue"
          value="3"
          description="Tasks needing attention"
        />
      </section>

      <div className="mt-8">
        <Board />
      </div>
    </>
  )
}

function PlaceholderPage({ title }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-8">
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <p className="mt-2 text-slate-500">
        This section is being prepared.
      </p>
    </section>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<PlaceholderPage title="Projects" />} />
        <Route path="/tasks" element={<PlaceholderPage title="My Tasks" />} />
        <Route path="/team" element={<PlaceholderPage title="Team" />} />
        <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
      </Route>
    </Routes>
  )
}

export default App

