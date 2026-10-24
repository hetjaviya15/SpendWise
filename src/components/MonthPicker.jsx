import { ChevronLeft, ChevronRight } from 'lucide-react'
import { monthLabel } from '../utils/formatting'

export default function MonthPicker({ value, onChange }) {
  function step(amount) {
    const [year, month] = value.split('-').map(Number)
    const date = new Date(Date.UTC(year, month - 1 + amount, 1))
    onChange(`${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`)
  }
  return <div className="month-picker"><button className="icon-button small" onClick={() => step(-1)} aria-label="Previous month"><ChevronLeft size={17} /></button><button className="month-label" onClick={() => document.getElementById('month-native-picker')?.showPicker?.()}>{monthLabel(value)}</button><input id="month-native-picker" className="visually-hidden" type="month" value={value} onChange={e => e.target.value && onChange(e.target.value)} aria-label="Choose month" /><button className="icon-button small" onClick={() => step(1)} aria-label="Next month"><ChevronRight size={17} /></button></div>
}
