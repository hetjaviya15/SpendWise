import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDownLeft, ArrowUpRight, ArrowUpRight as UpRight, Plus, Wallet } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import PageHeader from '../components/PageHeader'
import SummaryCard from '../components/SummaryCard'
import EmptyState from '../components/EmptyState'
import TransactionModal from '../components/TransactionModal'
import TransactionTable from '../components/TransactionTable'
import MonthPicker from '../components/MonthPicker'
import { useApp } from '../context/AppContext'
import { getExpenseBreakdown, getTotals, sortTransactions } from '../utils/calculations'
import { CATEGORY_COLORS } from '../utils/categories'
import { formatMoney, monthLabel } from '../utils/formatting'

const currentMonth = () => { const now = new Date(); return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}` }

export default function Dashboard() {
  const { transactions, settings, addTransaction, ready } = useApp()
  const [month, setMonth] = useState(currentMonth)
  const [modal, setModal] = useState(false)
  const totals = getTotals(transactions, month)
  const breakdown = getExpenseBreakdown(transactions, month)
  const recent = useMemo(() => sortTransactions(transactions).slice(0, 5), [transactions])
  return <>
    <PageHeader eyebrow="OVERVIEW" title="Your Financial Overview" subtitle="Stay on top of your income and expenses." action={<button className="button primary" onClick={() => setModal(true)}><Plus size={17} /> Add Transaction</button>} />
    <div className="dashboard-controls"><span className="section-caption">YOUR SNAPSHOT</span><MonthPicker value={month} onChange={setMonth} /></div>
    <div className="summary-grid"><SummaryCard label="Total Balance" value={formatMoney(totals.balance, settings.currency)} icon={Wallet} tone="green" footnote="Across all your transactions" /><SummaryCard label="Monthly Income" value={formatMoney(totals.income, settings.currency)} icon={ArrowDownLeft} tone="mint" footnote={monthLabel(month)} /><SummaryCard label="Monthly Expenses" value={formatMoney(totals.expenses, settings.currency)} icon={ArrowUpRight} tone="rose" footnote={monthLabel(month)} /></div>
    <div className="dashboard-grid"><section className="panel chart-panel"><div className="panel-heading"><div><h2>Spending breakdown</h2><p>Where your money went in {monthLabel(month)}</p></div><span className="panel-menu"><UpRight size={17} /></span></div>
      {breakdown.length ? <div className="donut-layout"><div className="donut-chart"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={breakdown} dataKey="amount" nameKey="category" innerRadius="67%" outerRadius="91%" paddingAngle={4} stroke="none">{breakdown.map(item => <Cell key={item.category} fill={CATEGORY_COLORS[item.category] || '#94A3B8'} />)}</Pie><Tooltip formatter={(value) => formatMoney(Math.round(value * 100), settings.currency)} /></PieChart></ResponsiveContainer><div className="donut-center"><strong>{formatMoney(totals.expenses, settings.currency)}</strong><small>Total spent</small></div></div><div className="legend-list">{breakdown.slice(0, 6).map(item => <div className="legend-row" key={item.category}><span className="legend-color" style={{ background: CATEGORY_COLORS[item.category] || '#94A3B8' }} /><span>{item.category}</span><strong>{item.percentage.toFixed(0)}%</strong></div>)}</div></div> : <EmptyState title="A fresh start" >No expenses recorded for {monthLabel(month)}. Add a transaction to see your spending breakdown.</EmptyState>}
    </section><section className="panel recent-panel"><div className="panel-heading"><div><h2>Recent transactions</h2><p>Your latest financial activity</p></div><Link to="/transactions" className="text-link">View all <UpRight size={14} /></Link></div>
      {!ready || recent.length === 0 ? <EmptyState title="Nothing here yet">Your transactions will show up here once you add them.</EmptyState> : <TransactionTable transactions={recent} currency={settings.currency} compact />}</section></div>
    {modal && <TransactionModal onClose={() => setModal(false)} onSave={async tx => { await addTransaction(tx); setModal(false) }} />}
  </>
}
