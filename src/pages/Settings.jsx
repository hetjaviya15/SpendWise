import { useState } from 'react'
import { Check, ChevronRight, Coins, Database, RotateCcw, Wallet } from 'lucide-react'
import ConfirmDialog from '../components/ConfirmDialog'
import { useApp } from '../context/AppContext'

const currencies = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' }, { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' }, { code: 'GBP', symbol: '£', name: 'British Pound' },
]

export default function Settings() {
  const { settings, changeCurrency, resetData, transactions } = useApp()
  const [confirmReset, setConfirmReset] = useState(false)
  return <>
    <div className="page-header"><div><div className="eyebrow">PREFERENCES</div><h1>Settings</h1><p>Make SpendWise work the way you do.</p></div></div>
    <div className="settings-layout"><div className="settings-main"><section className="panel settings-panel"><div className="settings-section-heading"><span className="settings-icon"><Coins size={18} /></span><div><h2>Currency display</h2><p>Choose how amounts appear throughout SpendWise.</p></div></div><div className="currency-options">{currencies.map(item => <button className={`currency-option ${settings.currency === item.code ? 'active' : ''}`} key={item.code} onClick={() => changeCurrency(item.code)}><span className="currency-symbol">{item.symbol}</span><span className="currency-copy"><strong>{item.code}</strong><small>{item.name}</small></span>{settings.currency === item.code ? <Check size={18} className="currency-check" /> : <ChevronRight size={17} className="currency-chevron" />}</button>)}</div><p className="settings-note">Your choice changes the display format only. It does not convert transaction values between currencies.</p></section>
      <section className="panel settings-panel danger-zone"><div className="settings-section-heading"><span className="settings-icon muted"><Database size={18} /></span><div><h2>Data management</h2><p>Your transactions are stored in this browser.</p></div></div><div className="reset-row"><div><strong>Reset all data</strong><small>Remove all {transactions.length} saved {transactions.length === 1 ? 'transaction' : 'transactions'} from this browser.</small></div><button className="button outline-danger" onClick={() => setConfirmReset(true)}><RotateCcw size={15} /> Reset data</button></div></section></div>
      <aside className="settings-aside"><section className="panel about-card"><div className="brand-mark large"><Wallet size={23} /></div><div className="eyebrow">YOUR MONEY, IN FOCUS</div><h2>SpendWise</h2><p className="tagline">Track smarter. Spend better.</p><div className="version-line"><span>Version</span><strong>1.0.0</strong></div><div className="about-divider" /><p className="about-description">SpendWise is a simple personal expense tracking application designed to help you manage income, expenses, and financial activity in one place.</p></section><div className="privacy-note"><span className="privacy-dot" /><span>Your financial data stays on this device. Nothing is sent to a server.</span></div></aside></div>
    {confirmReset && <ConfirmDialog title="Reset all data?" confirmLabel="Delete all transactions" danger onClose={() => setConfirmReset(false)} onConfirm={async () => { await resetData(); setConfirmReset(false) }}>This will permanently delete all {transactions.length} transactions saved in this browser. This action cannot be undone.</ConfirmDialog>}
  </>
}
