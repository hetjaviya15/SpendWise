import { useState } from 'react'
import { ArrowDownLeft, ArrowUpRight, PiggyBank } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import PageHeader from '../components/PageHeader'
import SummaryCard from '../components/SummaryCard'
import EmptyState from '../components/EmptyState'
import MonthPicker from '../components/MonthPicker'
import { useApp } from '../context/AppContext'
import { getExpenseBreakdown, getTotals } from '../utils/calculations'
import { CATEGORY_COLORS } from '../utils/categories'
import { formatMoney, monthLabel } from '../utils/formatting'

const currentMonth = () => { const now = new Date(); return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}` }

export default function Reports() {
  const { transactions, settings } = useApp()
  const [month, setMonth] = useState(currentMonth)
  const totals = getTotals(transactions, month)
  const breakdown = getExpenseBreakdown(transactions, month)
  const hasActivity = transactions.some(tx => tx.date.startsWith(month))
  const barData = [{ label: 'Income', amount: totals.income / 100, fill: '#159A70' }, { label: 'Expenses', amount: totals.expenses / 100, fill: '#EF4444' }]
  return <>
    <PageHeader eyebrow="INSIGHTS" title="Financial Reports" subtitle="Understand where your money goes." />
    <div className="report-month-row"><span className="section-caption">MONTHLY REPORT</span><MonthPicker value={month} onChange={setMonth} /></div>
    <div className="summary-grid report-summary"><SummaryCard label="Total Income" value={formatMoney(totals.income, settings.currency)} icon={ArrowDownLeft} tone="mint" footnote={monthLabel(month)} /><SummaryCard label="Total Expenses" value={formatMoney(totals.expenses, settings.currency)} icon={ArrowUpRight} tone="rose" footnote={monthLabel(month)} /><SummaryCard label="Net Savings" value={formatMoney(totals.savings, settings.currency)} icon={PiggyBank} tone={totals.savings < 0 ? 'rose' : 'green'} footnote="Income minus expenses" /></div>
    <div className="reports-grid"><section className="panel report-chart-panel"><div className="panel-heading"><div><h2>Income vs. expenses</h2><p>A side-by-side look at {monthLabel(month)}</p></div></div>{hasActivity ? <div className="bar-chart-wrap"><ResponsiveContainer width="100%" height="100%"><BarChart data={barData} margin={{ top: 12, right: 12, left: 5, bottom: 0 }}><CartesianGrid vertical={false} stroke="#edf0f3" /><XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={v => new Intl.NumberFormat('en', { notation: 'compact' }).format(v)} /><Tooltip formatter={value => formatMoney(Math.round(value * 100), settings.currency)} cursor={{ fill: '#f8fafc' }} /><Bar dataKey="amount" radius={[7, 7, 0, 0]} barSize={58}>{barData.map(row => <Cell fill={row.fill} key={row.label} />)}</Bar></BarChart></ResponsiveContainer></div> : <EmptyState title="No monthly activity">There is no income or spending to compare for {monthLabel(month)}.</EmptyState>}</section>
      <section className="panel report-chart-panel"><div className="panel-heading"><div><h2>Expense distribution</h2><p>Category share of monthly spending</p></div></div>{breakdown.length ? <div className="report-donut-layout"><div className="report-donut"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={breakdown} dataKey="amount" nameKey="category" innerRadius="64%" outerRadius="91%" paddingAngle={3} stroke="none">{breakdown.map(item => <Cell key={item.category} fill={CATEGORY_COLORS[item.category] || '#94A3B8'} />)}</Pie><Tooltip formatter={value => formatMoney(Math.round(value * 100), settings.currency)} /></PieChart></ResponsiveContainer><div className="donut-center"><strong>{formatMoney(totals.expenses, settings.currency)}</strong><small>Total spent</small></div></div><div className="report-legend">{breakdown.map(item => <div className="legend-row" key={item.category}><span className="legend-color" style={{ background: CATEGORY_COLORS[item.category] || '#94A3B8' }} /><span>{item.category}</span><strong>{item.percentage.toFixed(1)}%</strong></div>)}</div></div> : <EmptyState title="No expenses this month">Add an expense to see how your spending is distributed.</EmptyState>}</section></div>
    <section className="panel breakdown-panel"><div className="panel-heading"><div><h2>Category breakdown</h2><p>Expense detail for {monthLabel(month)}</p></div></div>{breakdown.length ? <div className="breakdown-table"><div className="breakdown-head"><span>Category</span><span>Share of expenses</span><span className="amount-cell">Total spent</span></div>{breakdown.map(item => <div className="breakdown-row" key={item.category}><span className="breakdown-category"><i className="legend-color" style={{ background: CATEGORY_COLORS[item.category] || '#94A3B8' }} />{item.category}</span><span className="progress-cell"><span className="progress-track"><i style={{ width: `${item.percentage}%`, background: CATEGORY_COLORS[item.category] || '#94A3B8' }} /></span><small>{item.percentage.toFixed(1)}%</small></span><strong className="amount-cell">{formatMoney(item.minor, settings.currency)}</strong></div>)}</div> : <EmptyState title={hasActivity ? 'No expenses to break down' : 'Nothing to report yet'}>{hasActivity ? 'This month has income, but no expenses.' : `There is no expense data for ${monthLabel(month)}.`}</EmptyState>}</section>
  </>
}
