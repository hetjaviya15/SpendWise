export const CURRENCIES = {
  INR: { locale: 'en-IN', currency: 'INR' }, USD: { locale: 'en-US', currency: 'USD' },
  EUR: { locale: 'de-DE', currency: 'EUR' }, GBP: { locale: 'en-GB', currency: 'GBP' },
}

export function formatMoney(minor, currency = 'INR') {
  const config = CURRENCIES[currency] || CURRENCIES.INR
  return new Intl.NumberFormat(config.locale, { style: 'currency', currency: config.currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((minor || 0) / 100)
}

export function formatDate(date) {
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return '—'
  return new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`))
}

export function localToday() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

export function monthLabel(month) {
  const [year, number] = month.split('-').map(Number)
  return new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(year, number - 1, 1)))
}
