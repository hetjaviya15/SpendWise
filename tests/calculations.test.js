import test from 'node:test'
import assert from 'node:assert/strict'
import { getExpenseBreakdown, getTotals, sortTransactions } from '../src/utils/calculations.js'

const transactions = [
  { id: 'i1', title: 'Salary', amount: 50000, type: 'income', category: 'Salary', date: '2026-10-01', createdAt: '2026-10-01T09:00:00Z' },
  { id: 'e1', title: 'Groceries', amount: 1250.25, type: 'expense', category: 'Food', date: '2026-10-03', createdAt: '2026-10-03T09:00:00Z' },
  { id: 'e2', title: 'Dinner', amount: 749.75, type: 'expense', category: 'Food', date: '2026-10-03', createdAt: '2026-10-03T10:00:00Z' },
  { id: 'e3', title: 'Train', amount: 500, type: 'expense', category: 'Travel', date: '2026-09-30', createdAt: '2026-09-30T09:00:00Z' },
]

test('totals use all-time balance and selected-month integer minor units', () => {
  assert.deepEqual(getTotals(transactions, '2026-10'), { balance: 4750000, income: 5000000, expenses: 200000, savings: 4800000 })
})

test('expense breakdown aggregates by category and avoids divide-by-zero', () => {
  assert.deepEqual(getExpenseBreakdown(transactions, '2026-10').map(({ category, minor, percentage }) => ({ category, minor, percentage })), [
    { category: 'Food', minor: 200000, percentage: 100 },
  ])
  assert.deepEqual(getExpenseBreakdown([], '2026-10'), [])
})

test('same-date transactions sort newest first with a stable tie-breaker', () => {
  assert.deepEqual(sortTransactions(transactions).map(tx => tx.id), ['e2', 'e1', 'i1', 'e3'])
})
