
import { Link, Routes, Route } from 'react-router'

import Sidebar from './components/navigation/Sidebar.jsx'
import Header from './components/navigation/Header.jsx'
import StatCard from './components/ui/StatCard.jsx'
import Board from './components/tasks/Board.jsx'

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Header />

        <section className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 xl:grid-cols-4">
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

        <Board />
      </main>
    </div>
  )
}

function Home() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-3xl font-bold text-slate-900">
        Welcome to TeamFlow
      </h1>

      <p className="mt-3 text-slate-600">
        Track your projects here.
      </p>

      <Link
        to="/dashboard"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
      >
        Open Dashboard
      </Link>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App
