import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { CATEGORIES } from '../utils/categories'
import { localToday } from '../utils/formatting'

export default function TransactionModal({ transaction, onSave, onClose }) {
  const [form, setForm] = useState({ title: '', amount: '', type: 'expense', category: 'Food', date: localToday(), note: '' })
  const [error, setError] = useState('')
  useEffect(() => {
    if (transaction) setForm({ title: transaction.title, amount: String(transaction.amount), type: transaction.type, category: transaction.category, date: transaction.date, note: transaction.note || '' })
  }, [transaction])
  const categories = CATEGORIES[form.type]
  function update(key, value) {
    setForm(current => ({ ...current, [key]: value, ...(key === 'type' ? { category: CATEGORIES[value][0] } : {}) }))
  }
  async function submit(event) {
    event.preventDefault()
    const title = form.title.trim()
    const amount = Number(form.amount)
    if (!title) return setError('Enter a transaction title.')
    if (!Number.isFinite(amount) || amount <= 0 || !Number.isFinite(Math.round(amount * 100))) return setError('Enter an amount greater than zero, with up to two decimal places.')
    if (Math.abs(amount * 100 - Math.round(amount * 100)) > 0.00001) return setError('Use no more than two decimal places.')
    const dateParts = form.date.split('-').map(Number)
    const parsedDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
    if (!/^\d{4}-\d{2}-\d{2}$/.test(form.date) || parsedDate.getFullYear() !== dateParts[0] || parsedDate.getMonth() !== dateParts[1] - 1 || parsedDate.getDate() !== dateParts[2]) return setError('Choose a valid date.')
    if (!categories.includes(form.category)) return setError('Choose a category for this transaction type.')
    const id = transaction?.id || (globalThis.crypto?.randomUUID?.() || `tx-${Date.now()}-${Math.random().toString(36).slice(2)}`)
    await onSave({ ...form, title, amount: Math.round(amount * 100) / 100, note: form.note.trim(), id, createdAt: transaction?.createdAt || new Date().toISOString() })
  }
  return <div className="modal-backdrop" role="presentation" onMouseDown={e => e.target === e.currentTarget && onClose()}><section className="transaction-modal" role="dialog" aria-modal="true" aria-labelledby="transaction-modal-title"><div className="modal-heading"><div><div className="eyebrow">YOUR MONEY, ORGANIZED</div><h2 id="transaction-modal-title">{transaction ? 'Edit transaction' : 'Add transaction'}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close"><X size={19} /></button></div>
    <form onSubmit={submit} noValidate><div className="type-switch"><button type="button" className={form.type === 'expense' ? 'selected expense' : ''} onClick={() => update('type', 'expense')}>Expense</button><button type="button" className={form.type === 'income' ? 'selected income' : ''} onClick={() => update('type', 'income')}>Income</button></div>
      <label>Transaction title<input autoFocus value={form.title} onChange={e => update('title', e.target.value)} placeholder="e.g. Weekly groceries" maxLength="80" /></label>
      <div className="form-row"><label>Amount<input inputMode="decimal" type="number" min="0.01" step="0.01" value={form.amount} onChange={e => update('amount', e.target.value)} placeholder="0.00" /></label><label>Date<input type="date" value={form.date} onChange={e => update('date', e.target.value)} /></label></div>
      <label>Category<select value={form.category} onChange={e => update('category', e.target.value)}>{categories.map(category => <option key={category}>{category}</option>)}</select></label>
      <label>Note <span className="optional-label">Optional</span><textarea rows="3" value={form.note} onChange={e => update('note', e.target.value)} placeholder="Add a little more detail…" maxLength="300" /></label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="modal-actions"><button type="button" className="button secondary" onClick={onClose}>Cancel</button><button className="button primary" type="submit">{transaction ? 'Save changes' : 'Add transaction'}</button></div>
    </form></section></div>
}
