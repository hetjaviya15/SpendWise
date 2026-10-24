import { AlertTriangle, X } from 'lucide-react'

export default function ConfirmDialog({ title, children, confirmLabel = 'Confirm', onConfirm, onClose, danger = false }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={e => e.target === e.currentTarget && onClose()}><section className="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-title"><button className="icon-button modal-close" onClick={onClose} aria-label="Close"><X size={18} /></button><div className={`confirm-icon ${danger ? 'danger' : ''}`}><AlertTriangle size={20} /></div><h2 id="confirm-title">{title}</h2><div className="confirm-copy">{children}</div><div className="modal-actions"><button className="button secondary" onClick={onClose}>Cancel</button><button className={`button ${danger ? 'danger-button' : 'primary'}`} onClick={onConfirm}>{confirmLabel}</button></div></section></div>
}
