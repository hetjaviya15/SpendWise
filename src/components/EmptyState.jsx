import { Inbox } from 'lucide-react'

export default function EmptyState({ title, children, action }) {
  return <div className="empty-state"><div className="empty-icon"><Inbox size={22} /></div><strong>{title}</strong><p>{children}</p>{action}</div>
}
