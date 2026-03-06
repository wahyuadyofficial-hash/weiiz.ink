'use client'

// components/ui/Toast.tsx
import {
  useState, useCallback, useEffect, useRef,
  createContext, useContext, ReactNode
} from 'react'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastItem {
  id: number
  message: string
  type: ToastType
}

interface ToastContextValue {
  toast: {
    success: (msg: string) => void
    error:   (msg: string) => void
    info:    (msg: string) => void
    warning: (msg: string) => void
  }
}

const ICONS: Record<ToastType, string> = {
  success: '✓', error: '✕', info: 'ℹ', warning: '⚠',
}

const STYLES: Record<ToastType, string> = {
  success: 'bg-green-500/20 border-green-500/30 text-green-300',
  error:   'bg-red-500/20 border-red-500/30 text-red-300',
  info:    'bg-blue-500/20 border-blue-500/30 text-blue-300',
  warning: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300',
}

// ── Context ───────────────────────────────────────────────
const ToastContext = createContext<ToastContextValue | null>(null)

// ── Single toast item ─────────────────────────────────────
function ToastItemUI({ toast, onRemove }: { toast: ToastItem; onRemove: (id: number) => void }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const enter = requestAnimationFrame(() => setVisible(true))
    const dismiss = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onRemove(toast.id), 300)
    }, 3000)
    return () => { cancelAnimationFrame(enter); clearTimeout(dismiss) }
  }, [toast.id, onRemove])

  return (
    <div
      className={`
        flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium
        border backdrop-blur-sm shadow-xl min-w-[220px] max-w-[340px]
        transition-all duration-300
        ${STYLES[toast.type]}
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
      `}
    >
      <span className="text-base leading-none flex-shrink-0">{ICONS[toast.type]}</span>
      <span className="flex-1">{toast.message}</span>
      <button
        onClick={() => { setVisible(false); setTimeout(() => onRemove(toast.id), 300) }}
        className="ml-1 opacity-50 hover:opacity-100 transition-opacity leading-none flex-shrink-0"
      >
        ×
      </button>
    </div>
  )
}

// ── ToastContainer ────────────────────────────────────────
export function ToastContainer({ toasts, onRemove }: {
  toasts: ToastItem[]
  onRemove: (id: number) => void
}) {
  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2 items-end pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className="pointer-events-auto">
          <ToastItemUI toast={t} onRemove={onRemove} />
        </div>
      ))}
    </div>
  )
}

// ── Provider (taruh di layout) ────────────────────────────
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const counter = useRef(0)

  const show = useCallback((message: string, type: ToastType) => {
    const id = ++counter.current
    setToasts(prev => [...prev, { id, message, type }])
  }, [])

  const remove = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const toast = {
    success: (msg: string) => show(msg, 'success'),
    error:   (msg: string) => show(msg, 'error'),
    info:    (msg: string) => show(msg, 'info'),
    warning: (msg: string) => show(msg, 'warning'),
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={remove} />
    </ToastContext.Provider>
  )
}

// ── Hook (pakai dari halaman mana saja) ───────────────────
export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast harus dipakai di dalam <ToastProvider>')
  return ctx.toast
}
