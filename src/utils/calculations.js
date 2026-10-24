export const monthKey = date => String(date || '').slice(0, 7)

export function sumMinor(transactions) {
  return transactions.reduce((sum, tx) => sum + Math.round(Number(tx.amount) * 100), 0)
}

export function getTotals(transactions, month) {
  const incomeAll = transactions.filter(tx => tx.type === 'income')
  const expensesAll = transactions.filter(tx => tx.type === 'expense')
  const current = transactions.filter(tx => monthKey(tx.date) === month)
  const income = sumMinor(current.filter(tx => tx.type === 'income'))
  const expenses = sumMinor(current.filter(tx => tx.type === 'expense'))
  return {
    balance: sumMinor(incomeAll) - sumMinor(expensesAll),
    income, expenses, savings: income - expenses,
  }
}

export function getExpenseBreakdown(transactions, month) {
  const expenses = transactions.filter(tx => tx.type === 'expense' && monthKey(tx.date) === month)
  const totals = new Map()
  expenses.forEach(tx => totals.set(tx.category, (totals.get(tx.category) || 0) + Math.round(Number(tx.amount) * 100)))
  const total = [...totals.values()].reduce((sum, amount) => sum + amount, 0)
  return [...totals.entries()].map(([category, minor]) => ({ category, minor, amount: minor / 100, percentage: total ? minor / total * 100 : 0 }))
    .sort((a, b) => b.minor - a.minor || a.category.localeCompare(b.category))
}

export function sortTransactions(transactions) {
  return [...transactions].sort((a, b) => b.date.localeCompare(a.date) || String(b.createdAt || b.id).localeCompare(String(a.createdAt || a.id)) || String(b.id).localeCompare(String(a.id)))
}
