import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { BarChart3, CircleHelp, LayoutDashboard, ReceiptText, Settings as SettingsIcon, Wallet } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import { useApp } from './context/AppContext'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: ReceiptText },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: SettingsIcon },
]

export default function App() {
  const location = useLocation()
  const { storageWarning } = useApp()
  const active = navItems.find(item => item.to === location.pathname)?.label || 'Dashboard'
  return <div className="app-shell"><aside className="sidebar"><div className="brand"><div className="brand-mark"><Wallet size={19} strokeWidth={2.2} /></div><div><strong>SpendWise</strong><span>Track smarter. Spend better.</span></div></div><div className="nav-caption">MENU</div><nav className="side-nav" aria-label="Main navigation">{navItems.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><Icon size={18} strokeWidth={1.9} /><span>{label}</span>{label === 'Transactions' && <span className="nav-indicator" />}</NavLink>)}</nav><div className="sidebar-bottom"><div className="sidebar-tip"><span className="tip-spark">✦</span><strong>A little awareness goes a long way.</strong><p>Small steps today make a calmer tomorrow.</p></div><div className="sidebar-profile"><div className="profile-avatar">S</div><div><strong>Your finances</strong><small>Personal workspace</small></div><CircleHelp size={17} /></div></div></aside><main className="main-area"><header className="topbar"><div className="breadcrumb"><span>SpendWise</span><span className="crumb-separator">/</span><strong>{active}</strong></div><div className="topbar-status"><span className="status-dot" /> Private &amp; stored locally</div></header><div className="page-content">{storageWarning && <div className="storage-alert" role="status">{storageWarning}</div>}<Routes><Route path="/" element={<Dashboard />} /><Route path="/transactions" element={<Transactions />} /><Route path="/reports" element={<Reports />} /><Route path="/settings" element={<Settings />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes><footer className="page-footer"><span>SpendWise <i>·</i> Track smarter. Spend better.</span><span>Your data stays yours.</span></footer></div></main></div>
}
