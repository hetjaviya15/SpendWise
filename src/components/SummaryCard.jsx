export default function SummaryCard({ label, value, icon: Icon, tone = 'green', footnote }) {
  return <article className="summary-card"><div className="summary-top"><span>{label}</span><span className={`summary-icon ${tone}`}><Icon size={19} /></span></div><strong className="summary-value">{value}</strong>{footnote && <small>{footnote}</small>}</article>
}
