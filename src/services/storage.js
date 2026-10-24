const TRANSACTIONS_KEY = 'spendwise.transactions.v1'
const SETTINGS_KEY = 'spendwise.settings.v1'
const TRANSACTIONS_BACKUP_KEY = 'spendwise.transactions.corrupt-backup.v1'
const SETTINGS_BACKUP_KEY = 'spendwise.settings.corrupt-backup.v1'

function validTransactions(value) {
  return Array.isArray(value) && value.every(tx => tx && typeof tx === 'object' &&
    typeof tx.id === 'string' && typeof tx.title === 'string' && tx.title.trim() &&
    Number.isFinite(tx.amount) && tx.amount > 0 && ['income', 'expense'].includes(tx.type) &&
    typeof tx.category === 'string' && typeof tx.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(tx.date))
}

function read(key, fallback, validate, backupKey) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return { value: fallback, warning: null }
    const value = JSON.parse(raw)
    if (!validate(value)) throw new Error('Stored data has an unexpected format.')
    return { value, warning: null }
  } catch (error) {
    let warning = `Saved ${key.includes('transactions') ? 'transactions' : 'settings'} could not be read. `
    try {
      const raw = localStorage.getItem(key)
      if (raw !== null && localStorage.getItem(backupKey) === null) localStorage.setItem(backupKey, raw)
      if (raw !== null) warning += 'A copy of the original data has been preserved. '
    } catch { warning += 'The original data remains in browser storage. ' }
    return { value: fallback, warning: warning + `(${error.message})` }
  }
}

export const storage = {
  async getTransactions() {
    const result = read(TRANSACTIONS_KEY, [], validTransactions, TRANSACTIONS_BACKUP_KEY)
    return result
  },
  async saveTransactions(transactions) {
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions))
  },
  async getSettings() {
    const result = read(SETTINGS_KEY, { currency: 'INR' }, value => value && ['INR', 'USD', 'EUR', 'GBP'].includes(value.currency), SETTINGS_BACKUP_KEY)
    return result
  },
  async saveSettings(settings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  },
  async clearTransactions() {
    localStorage.removeItem(TRANSACTIONS_KEY)
    localStorage.removeItem(TRANSACTIONS_BACKUP_KEY)
  },
}
