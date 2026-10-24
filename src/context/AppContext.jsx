import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { storage } from '../services/storage'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState([])
  const [settings, setSettings] = useState({ currency: 'INR' })
  const [ready, setReady] = useState(false)
  const [storageWarning, setStorageWarning] = useState('')

  useEffect(() => {
    let active = true
    Promise.all([storage.getTransactions(), storage.getSettings()]).then(([txResult, settingsResult]) => {
      if (!active) return
      setTransactions(txResult.value)
      setSettings(settingsResult.value)
      setStorageWarning([txResult.warning, settingsResult.warning].filter(Boolean).join(' '))
      setReady(true)
    }).catch(() => { if (active) { setStorageWarning('Local storage is unavailable in this browser.'); setReady(true) } })
    return () => { active = false }
  }, [])

  const value = useMemo(() => ({
    transactions, settings, ready, storageWarning,
    addTransaction: async tx => { const next = [...transactions, tx]; await storage.saveTransactions(next); setTransactions(next) },
    updateTransaction: async tx => { const next = transactions.map(item => item.id === tx.id ? tx : item); await storage.saveTransactions(next); setTransactions(next) },
    deleteTransaction: async id => { const next = transactions.filter(tx => tx.id !== id); await storage.saveTransactions(next); setTransactions(next) },
    changeCurrency: async currency => { const next = { ...settings, currency }; await storage.saveSettings(next); setSettings(next) },
    resetData: async () => { await storage.clearTransactions(); setTransactions([]) },
  }), [transactions, settings, ready, storageWarning])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}
