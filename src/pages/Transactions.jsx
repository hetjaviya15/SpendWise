import { useMemo, useState } from 'react'
import { Plus, Search, SlidersHorizontal, X } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import TransactionModal from '../components/TransactionModal'
import TransactionTable from '../components/TransactionTable'
import EmptyState from '../components/EmptyState'
import ConfirmDialog from '../components/ConfirmDialog'
import { useApp } from '../context/AppContext'
import { CATEGORIES } from '../utils/categories'
import { sortTransactions } from '../utils/calculations'
import { formatMoney } from '../utils/formatting'

export default function Transactions() {
  const { transactions, settings, addTransaction, updateTransaction, deleteTransaction } = useApp()
  const [search, setSearch] = useState('')
  const [type, setType] = useState('all')
  const [category, setCategory] = useState('all')
  const [month, setMonth] = useState('all')
  const [modal, setModal] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const categories = type === 'income' ? CATEGORIES.income : type === 'expense' ? CATEGORIES.expense : [...CATEGORIES.expense, ...CATEGORIES.income].filter((item, index, all) => all.indexOf(item) === index)
  const months = [...new Set(transactions.map(tx => tx.date.slice(0, 7)))].sort((a, b) => b.localeCompare(a))
  const visible = useMemo(() => sortTransactions(transactions).filter(tx => {
    const query = search.trim().toLowerCase()
    return (!query || tx.title.toLowerCase().includes(query) || tx.category.toLowerCase().includes(query)) &&
      (type === 'all' || tx.type === type) && (category === 'all' || tx.category === category) && (month === 'all' || tx.date.startsWith(month))
  }), [transactions, search, type, category, month])
  function changeType(value) { setType(value); setCategory('all') }
  const resetFilters = () => { setSearch(''); setType('all'); setCategory('all'); setMonth('all') }
  const filtered = search || type !== 'all' || category !== 'all' || month !== 'all'
  return <>
    <PageHeader eyebrow="ACTIVITY" title="Transactions" subtitle="Manage and organize your financial activity." action={<button className="button primary" onClick={() => setModal({})}><Plus size={17} /> Add Transaction</button>} />
    <section className="panel transaction-panel"><div className="transaction-toolbar"><div className="search-box"><Search size={17} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search transactions…" aria-label="Search transactions" />{search && <button className="clear-search" onClick={() => setSearch('')} aria-label="Clear search"><X size={15} /></button>}</div><div className="filter-controls"><SlidersHorizontal size={16} className="filter-icon" /><select value={type} onChange={e => changeType(e.target.value)} aria-label="Filter by type"><option value="all">All types</option><option value="income">Income</option><option value="expense">Expense</option></select><select value={category} onChange={e => setCategory(e.target.value)} aria-label="Filter by category"><option value="all">All categories</option>{categories.map(item => <option key={item}>{item}</option>)}</select><select value={month} onChange={e => setMonth(e.target.value)} aria-label="Filter by month"><option value="all">All dates</option>{months.map(item => <option key={item} value={item}>{new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${item}-01T00:00:00Z`))}</option>)}</select></div></div>
      <div className="table-meta"><span>{visible.length} {visible.length === 1 ? 'transaction' : 'transactions'}</span><span>{transactions.length ? `Total records · ${transactions.length}` : 'Your activity, at a glance'}</span></div>
      {visible.length ? <TransactionTable transactions={visible} currency={settings.currency} onEdit={tx => setModal(tx)} onDelete={tx => setDeleting(tx)} /> : <EmptyState title={transactions.length ? 'No matching transactions' : 'Start with your first transaction'}>{transactions.length ? 'Try adjusting your search or filters.' : 'Add income or an expense to begin building your financial picture.'}{transactions.length > 0 && filtered && <button className="text-link empty-action" onClick={resetFilters}>Clear filters</button>}</EmptyState>}
    </section>
    {modal && <TransactionModal transaction={modal.id ? modal : null} onClose={() => setModal(null)} onSave={async tx => { if (modal.id) await updateTransaction(tx); else await addTransaction(tx); setModal(null) }} />}
    {deleting && <ConfirmDialog title="Delete this transaction?" confirmLabel="Delete transaction" danger onClose={() => setDeleting(null)} onConfirm={async () => { await deleteTransaction(deleting.id); setDeleting(null) }}>“{deleting.title}” for {formatMoney(Math.round(deleting.amount * 100), settings.currency)} will be permanently removed.</ConfirmDialog>}
  </>
}
