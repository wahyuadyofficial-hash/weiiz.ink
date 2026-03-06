'use client'

// app/dashboard/links/page.tsx
import { useEffect, useState, useRef, useCallback } from 'react'

// ─── Types ───────────────────────────────────────────────
type LinkType = 'link' | 'product' | 'payment' | 'whatsapp' | 'download' | 'affiliate'

interface Link {
  id: string
  title: string
  url: string
  type: LinkType
  price?: number
  active: boolean
  clicks: number
  revenue: number
  order: number
}

interface UserProfile {
  name: string
  username: string
  bio: string
  avatar?: string
}

// ─── Constants ───────────────────────────────────────────
const TYPE_META: Record<LinkType, { label: string; icon: string; color: string; bg: string }> = {
  product:   { label: 'PRODUK',    icon: '📦', color: '#38bdf8', bg: 'rgba(56,189,248,0.12)'  },
  payment:   { label: 'PAYMENT',   icon: '💳', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)'  },
  whatsapp:  { label: 'WHATSAPP',  icon: '💬', color: '#34d399', bg: 'rgba(52,211,153,0.12)'  },
  link:      { label: 'LINK',      icon: '🔗', color: '#7ba3c0', bg: 'rgba(123,163,192,0.12)' },
  download:  { label: 'DOWNLOAD',  icon: '⬇️', color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
  affiliate: { label: 'AFFILIATE', icon: '🤝', color: '#fb923c', bg: 'rgba(251,146,60,0.12)'  },
}

// ─── Toast ───────────────────────────────────────────────
interface ToastItem { id: number; message: string; type: 'success' | 'error' }

function ToastContainer({ toasts }: { toasts: ToastItem[] }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id}
          className={`px-4 py-3 rounded-xl text-sm font-medium shadow-xl border backdrop-blur-sm transition-all
            ${t.type === 'success'
              ? 'bg-green-500/20 border-green-500/30 text-green-300'
              : 'bg-red-500/20 border-red-500/30 text-red-300'}`}>
          {t.type === 'success' ? '✓ ' : '✕ '}{t.message}
        </div>
      ))}
    </div>
  )
}

function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const counter = useRef(0)
  const show = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    const id = ++counter.current
    setToasts(p => [...p, { id, message, type }])
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3000)
  }, [])
  return { toasts, show }
}

// ─── Skeleton ────────────────────────────────────────────
function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`bg-blue-500/10 rounded-lg animate-pulse ${className}`} />
}

// ─── Toggle Switch ────────────────────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-10 h-5 rounded-full transition-colors duration-200 flex-shrink-0
        ${checked ? 'bg-blue-500' : 'bg-white/15'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200
        ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  )
}

// ─── Confirm Dialog ───────────────────────────────────────
function ConfirmDialog({ message, onConfirm, onCancel }: {
  message: string; onConfirm: () => void; onCancel: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#161a22] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
        <p className="text-white text-sm mb-5">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel}
            className="flex-1 py-2 rounded-xl border border-white/10 text-gray-400 text-sm hover:bg-white/5 transition">
            Batal
          </button>
          <button onClick={onConfirm}
            className="flex-1 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition">
            Hapus
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Add Link Modal ───────────────────────────────────────
function AddLinkModal({ onClose, onAdd }: {
  onClose: () => void
  onAdd: (data: { title: string; url: string; type: LinkType; price?: number }) => Promise<void>
}) {
  const [type, setType] = useState<LinkType>('link')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [price, setPrice] = useState('')
  const [loading, setLoading] = useState(false)

  const urlLabel = type === 'whatsapp' ? 'Nomor WhatsApp' : 'URL'
  const showPrice = type === 'product' || type === 'payment'

  const handleSubmit = async () => {
    if (!title.trim() || !url.trim()) return
    setLoading(true)
    try {
      await onAdd({ title, url, type, price: showPrice && price ? Number(price) : undefined })
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#161a22] border border-white/10 rounded-t-3xl sm:rounded-2xl w-full sm:max-w-[480px] p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white font-semibold">Tambah Link</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 transition">✕</button>
        </div>

        {/* Type selector */}
        <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Tipe Link</p>
        <div className="grid grid-cols-3 gap-2 mb-5">
          {(Object.keys(TYPE_META) as LinkType[]).map(t => {
            const m = TYPE_META[t]
            const active = type === t
            return (
              <button key={t} onClick={() => setType(t)}
                className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border text-xs font-medium transition
                  ${active ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-white'}`}>
                <span className="text-lg">{m.icon}</span>
                <span>{m.label}</span>
              </button>
            )
          })}
        </div>

        {/* Inputs */}
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">Judul Link</label>
            <input value={title} onChange={e => setTitle(e.target.value)}
              placeholder="contoh: Order via WhatsApp"
              className="w-full bg-[#0a0c10] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">{urlLabel}</label>
            <input value={url} onChange={e => setUrl(e.target.value)}
              placeholder={type === 'whatsapp' ? '628123456789' : 'https://'}
              className="w-full bg-[#0a0c10] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition" />
          </div>
          {showPrice && (
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Harga (Rp)</label>
              <input value={price} onChange={e => setPrice(e.target.value.replace(/\D/g, ''))}
                placeholder="0"
                className="w-full bg-[#0a0c10] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition" />
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm hover:bg-white/5 transition">
            Batal
          </button>
          <button onClick={handleSubmit} disabled={loading || !title.trim() || !url.trim()}
            className="flex-1 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium transition">
            {loading ? 'Menambahkan...' : 'Tambah'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Edit Link Modal ──────────────────────────────────────
function EditLinkModal({ link, onClose, onSave }: {
  link: Link; onClose: () => void
  onSave: (id: string, data: Partial<Link>) => Promise<void>
}) {
  const [title, setTitle] = useState(link.title)
  const [url, setUrl] = useState(link.url)
  const [price, setPrice] = useState(link.price?.toString() ?? '')
  const [loading, setLoading] = useState(false)
  const showPrice = link.type === 'product' || link.type === 'payment'

  const handleSave = async () => {
    setLoading(true)
    try {
      await onSave(link.id, { title, url, price: showPrice && price ? Number(price) : undefined })
      onClose()
    } finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#161a22] border border-white/10 rounded-t-3xl sm:rounded-2xl w-full sm:max-w-[480px] p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white font-semibold">Edit Link</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 transition">✕</button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">Judul Link</label>
            <input value={title} onChange={e => setTitle(e.target.value)}
              className="w-full bg-[#0a0c10] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">URL</label>
            <input value={url} onChange={e => setUrl(e.target.value)}
              className="w-full bg-[#0a0c10] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition" />
          </div>
          {showPrice && (
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Harga (Rp)</label>
              <input value={price} onChange={e => setPrice(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-[#0a0c10] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition" />
            </div>
          )}
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm hover:bg-white/5 transition">Batal</button>
          <button onClick={handleSave} disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white text-sm font-medium transition">
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Link Item ────────────────────────────────────────────
function LinkItem({ link, onToggle, onDelete, onEdit, dragHandlers }: {
  link: Link
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (link: Link) => void
  dragHandlers: {
    onDragStart: (e: React.DragEvent, id: string) => void
    onDragOver: (e: React.DragEvent, id: string) => void
    onDrop: (e: React.DragEvent, id: string) => void
    onDragEnd: () => void
    draggingId: string | null
    overId: string | null
  }
}) {
  const m = TYPE_META[link.type]
  const { draggingId, overId } = dragHandlers
  const isDragging = draggingId === link.id
  const isOver = overId === link.id

  return (
    <div
      draggable
      onDragStart={e => dragHandlers.onDragStart(e, link.id)}
      onDragOver={e => dragHandlers.onDragOver(e, link.id)}
      onDrop={e => dragHandlers.onDrop(e, link.id)}
      onDragEnd={dragHandlers.onDragEnd}
      className={`flex items-center gap-3 bg-[#111318] border rounded-2xl px-4 py-3.5 transition-all duration-150
        ${isDragging ? 'opacity-40 scale-[0.98]' : ''}
        ${isOver && !isDragging ? 'border-blue-500/60 bg-blue-500/5' : 'border-white/10 hover:border-white/20'}
      `}
    >
      {/* Drag handle */}
      <div className="text-gray-600 hover:text-gray-400 cursor-grab active:cursor-grabbing flex-shrink-0 select-none text-lg leading-none">
        ⣿
      </div>

      {/* Type icon */}
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-base"
        style={{ background: m.bg, color: m.color }}>
        {m.icon}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-white text-sm font-semibold truncate">{link.title}</span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: m.bg, color: m.color }}>
            {m.label}
          </span>
        </div>
        <p className="text-gray-500 text-xs truncate mt-0.5">{link.url}</p>
        <div className="flex items-center gap-3 mt-1">
          {link.clicks > 0 && (
            <span className="text-gray-600 text-xs">👆 {link.clicks.toLocaleString('id-ID')} klik</span>
          )}
          {link.revenue > 0 && (
            <span className="text-gray-600 text-xs">💰 Rp {link.revenue.toLocaleString('id-ID')}</span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Toggle checked={link.active} onChange={() => onToggle(link.id)} />
        <button onClick={() => onEdit(link)}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 transition text-sm">
          ✏️
        </button>
        <button onClick={() => onDelete(link.id)}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition text-sm">
          🗑️
        </button>
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────
export default function LinksPage() {
  const [links, setLinks] = useState<Link[]>([])
  const [profile] = useState<UserProfile>({ name: 'Budi Santoso', username: 'budi', bio: 'Digital creator & seller 🚀' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [editLink, setEditLink] = useState<Link | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  // Drag state
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [overId, setOverId] = useState<string | null>(null)

  const { toasts, show: showToast } = useToast()

  const fetchLinks = async () => {
    setLoading(true); setError(null)
    try {
      const res = await fetch('/api/links')
      if (!res.ok) throw new Error('Gagal memuat links')
      const data = await res.json()
      setLinks(data.links.sort((a: Link, b: Link) => a.order - b.order))
    } catch (e: any) {
      setError(e.message)
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchLinks() }, [])

  const copyBioUrl = () => {
    navigator.clipboard.writeText(`https://weiiz.ink/${profile.username}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleToggle = async (id: string) => {
    const link = links.find(l => l.id === id)
    if (!link) return
    setLinks(p => p.map(l => l.id === id ? { ...l, active: !l.active } : l))
    try {
      const res = await fetch(`/api/links/${id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !link.active })
      })
      if (!res.ok) throw new Error()
      showToast(link.active ? 'Link dinonaktifkan' : 'Link diaktifkan')
    } catch {
      setLinks(p => p.map(l => l.id === id ? { ...l, active: link.active } : l))
      showToast('Gagal mengubah status', 'error')
    }
  }

  const handleAdd = async (data: { title: string; url: string; type: LinkType; price?: number }) => {
    try {
      const res = await fetch('/api/links', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) throw new Error()
      const newLink = await res.json()
      setLinks(p => [...p, newLink])
      showToast('Link berhasil ditambahkan')
    } catch {
      showToast('Gagal menambahkan link', 'error')
      throw new Error()
    }
  }

  const handleEdit = async (id: string, data: Partial<Link>) => {
    try {
      const res = await fetch(`/api/links/${id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) throw new Error()
      setLinks(p => p.map(l => l.id === id ? { ...l, ...data } : l))
      showToast('Link berhasil diperbarui')
    } catch {
      showToast('Gagal memperbarui link', 'error')
      throw new Error()
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/links/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      setLinks(p => p.filter(l => l.id !== id))
      showToast('Link dihapus')
    } catch {
      showToast('Gagal menghapus link', 'error')
    } finally { setDeleteId(null) }
  }

  // ── Drag & Drop ──
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggingId(id)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault()
    if (id !== draggingId) setOverId(id)
  }

  const handleDrop = async (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    if (!draggingId || draggingId === targetId) { setDraggingId(null); setOverId(null); return }

    const reordered = [...links]
    const fromIdx = reordered.findIndex(l => l.id === draggingId)
    const toIdx = reordered.findIndex(l => l.id === targetId)
    const [moved] = reordered.splice(fromIdx, 1)
    reordered.splice(toIdx, 0, moved)
    const updated = reordered.map((l, i) => ({ ...l, order: i }))
    setLinks(updated)
    setDraggingId(null); setOverId(null)

    try {
      await fetch('/api/links/reorder', {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: updated.map(l => l.id) })
      })
      showToast('Urutan disimpan')
    } catch {
      showToast('Gagal menyimpan urutan', 'error')
    }
  }

  const handleDragEnd = () => { setDraggingId(null); setOverId(null) }

  const dragHandlers = { onDragStart: handleDragStart, onDragOver: handleDragOver, onDrop: handleDrop, onDragEnd: handleDragEnd, draggingId, overId }

  const activeCount = links.filter(l => l.active).length

  // ── Loading ──
  if (loading) return (
    <div className="p-5 md:p-8 space-y-5 bg-[#0a0c10] min-h-screen">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-28" />
      <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20" />)}</div>
    </div>
  )

  // ── Error ──
  if (error) return (
    <div className="p-6 min-h-screen bg-[#0a0c10]">
      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 max-w-md">
        <p className="text-red-400 font-semibold mb-1">Gagal memuat halaman</p>
        <p className="text-red-400/70 text-sm mb-4">{error}</p>
        <button onClick={fetchLinks} className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
          Coba Lagi
        </button>
      </div>
    </div>
  )

  return (
    <div className="p-5 md:p-8 space-y-6 bg-[#0a0c10] min-h-screen">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-white text-2xl font-bold">Bio & Links</h1>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <button onClick={copyBioUrl}
              className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm transition">
              <span>{copied ? '✅' : '🔗'}</span>
              <span>weiiz.ink/{profile.username}</span>
            </button>
            <span className="text-xs bg-blue-500/15 text-blue-400 px-2 py-0.5 rounded-full">
              {activeCount} link aktif
            </span>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <a href={`/${profile.username}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition">
            👁️ Preview Bio
          </a>
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition">
            ＋ Tambah Link
          </button>
        </div>
      </div>

      {/* ── Profile Card ── */}
      <div className="bg-[#111318] border border-white/10 rounded-2xl p-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-blue-600/30 border-2 border-blue-500/50 flex items-center justify-center text-blue-300 text-xl font-bold flex-shrink-0">
          {profile.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold">{profile.name}</p>
          <p className="text-gray-500 text-sm">@{profile.username}</p>
          <p className="text-gray-400 text-sm mt-1 truncate">{profile.bio}</p>
        </div>
        <div className="flex flex-col gap-2 flex-shrink-0">
          <button className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition whitespace-nowrap">
            ✏️ Edit Profil
          </button>
          <button className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition whitespace-nowrap">
            📝 Edit Bio
          </button>
        </div>
      </div>

      {/* ── Link List ── */}
      <div>
        <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider">
          {links.length} link · drag untuk reorder
        </p>
        {links.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
            <p className="text-gray-600 text-sm">Belum ada link.</p>
            <button onClick={() => setShowModal(true)}
              className="mt-3 text-blue-400 text-sm hover:text-blue-300 transition">
              + Tambah link pertama
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {links.map(link => (
              <LinkItem
                key={link.id}
                link={link}
                onToggle={handleToggle}
                onDelete={(id) => setDeleteId(id)}
                onEdit={(l) => setEditLink(l)}
                dragHandlers={dragHandlers}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Modals ── */}
      {showModal && <AddLinkModal onClose={() => setShowModal(false)} onAdd={handleAdd} />}
      {editLink && <EditLinkModal link={editLink} onClose={() => setEditLink(null)} onSave={handleEdit} />}
      {deleteId && (
        <ConfirmDialog
          message="Yakin hapus link ini? Aksi ini tidak bisa dibatalkan."
          onConfirm={() => handleDelete(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}

      {/* ── Toasts ── */}
      <ToastContainer toasts={toasts} />
    </div>
  )
}
