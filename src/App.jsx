import { HashRouter, NavLink, Route, Routes } from 'react-router-dom'
import { LayoutDashboard, ReceiptText, BarChart3, Settings, Wallet } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Reports from './pages/Reports'

export default function App() {
  return <div className="app-shell">
    <aside className="sidebar"><div className="brand"><div className="brand-mark"><Wallet /></div><div><strong>SpendWise</strong><span>Track smarter. Spend better.</span></div></div>
      <nav className="side-nav">
        <NavLink className="nav-link" to="/">Dashboard</NavLink>
        <NavLink className="nav-link" to="/transactions">Transactions</NavLink><NavLink className="nav-link" to="/reports">Reports</NavLink>
      </nav>
    </aside>
    <main className="main-area"><div className="page-content"><Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/transactions" element={<Transactions />} /><Route path="/reports" element={<Reports />} />
    </Routes></div></main>
  </div>
}
