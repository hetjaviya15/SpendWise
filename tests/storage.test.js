import test from 'node:test'
import assert from 'node:assert/strict'
import { storage } from '../src/services/storage.js'

function memoryStorage() {
  const data = new Map()
  return {
    getItem: key => data.has(key) ? data.get(key) : null,
    setItem: (key, value) => data.set(key, String(value)),
    removeItem: key => data.delete(key),
  }
}

test('storage persists transactions and settings through its async interface', async () => {
  globalThis.localStorage = memoryStorage()
  const transactions = [{ id: 'a', title: 'Pay', amount: 100, type: 'income', category: 'Salary', date: '2026-10-01' }]
  await storage.saveTransactions(transactions)
  await storage.saveSettings({ currency: 'EUR' })
  assert.deepEqual((await storage.getTransactions()).value, transactions)
  assert.deepEqual((await storage.getSettings()).value, { currency: 'EUR' })
})

test('corrupt stored transactions are preserved and reported', async () => {
  globalThis.localStorage = memoryStorage()
  localStorage.setItem('spendwise.transactions.v1', '{invalid json')
  const result = await storage.getTransactions()
  assert.deepEqual(result.value, [])
  assert.match(result.warning, /copy of the original data has been preserved/i)
  assert.equal(localStorage.getItem('spendwise.transactions.v1'), '{invalid json')
  assert.equal(localStorage.getItem('spendwise.transactions.corrupt-backup.v1'), '{invalid json')
})

test('reset clears active transactions and a preserved corrupt backup', async () => {
  globalThis.localStorage = memoryStorage()
  localStorage.setItem('spendwise.transactions.v1', 'bad')
  await storage.getTransactions()
  await storage.clearTransactions()
  assert.equal(localStorage.getItem('spendwise.transactions.v1'), null)
  assert.equal(localStorage.getItem('spendwise.transactions.corrupt-backup.v1'), null)
})
