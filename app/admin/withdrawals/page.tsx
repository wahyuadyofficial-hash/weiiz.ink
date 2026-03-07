'use client'

// app/admin/withdrawals/page.tsx
import { useEffect, useState } from 'react'

interface Withdrawal {
  id: string
  userName: string
  userEmail: string
  amount: number
  bankName: string
  accountNumber: string
  accountName: string
  requestedAt: string
}

function formatRp(n: number) {
  return `Rp ${n.toLocaleString('id-ID')}`
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`bg-white/5 rounded-lg animate-pulse ${className}`} />
}

function Toast({ message, type }: { message: string; type: 'success' | 'error' }) {
  return (
    <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-xl border
      ${type === 'success' ? 'bg-green-500/20 border-green-500/30 text-green-300' : 'bg-red-500/20 border-red-500/30 text-red-300'}`}>
      {type === 'success' ? '✓ ' : '✕ '}{message}
    </div>
  )
}

export default function AdminWithdrawalsPage() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  // Reject state: id → note input
  const [rejectOpen, setRejectOpen] = useState<Record<string, boolean>>({})
  const [rejectNotes, setRejectNotes] = useState<Record<string, string>>({})

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchWithdrawals = async () => {
    setLoading(true); setError(null)
    try {
      const res = await fetch('/api/admin/withdrawals?status=PENDING')
      if (!res.ok) throw new Error('Gagal memuat data')
      const data = await res.json()
      setWithdrawals(data.withdrawals)
    } catch (e: any) {
      setError(e.message)
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchWithdrawals() }, [])

  const handleApprove = async (id: string) => {
    setActionLoading(id)
    try {
      const res = await fetch(`/api/admin/withdrawals/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'APPROVED' }),
      })
      if (!res.ok) throw new Error()
      setWithdrawals(p => p.filter(w => w.id !== id))
      showToast('Withdrawal disetujui')
    } catch {
      showToast('Gagal menyetujui withdrawal', 'error')
    } finally { setActionLoading(null) }
  }

  const handleReject = async (id: string) => {
    const note = rejectNotes[id] ?? ''
    setActionLoading(id)
    try {
      const res = await fetch(`/api/admin/withdrawals/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'REJECTED', note }),
      })
      if (!res.ok) throw new Error()
      setWithdrawals(p => p.filter(w => w.id !== id))
      showToast('Withdrawal ditolak')
    } catch {
      showToast('Gagal menolak withdrawal', 'error')
    } finally {
      setActionLoading(null)
      setRejectOpen(p => ({ ...p, [id]: false }))
    }
  }

  if (loading) return (
    <div className="p-5 md:p-8 space-y-4 min-h-screen">
      <Skeleton className="h-9 w-48" />
      {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-36" />)}
    </div>
  )

  if (error) return (
    <div className="p-6 min-h-screen">
      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 max-w-md">
        <p className="text-red-400 font-semibold mb-3">{error}</p>
        <button onClick={fetchWithdrawals} className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition">Coba Lagi</button>
      </div>
    </div>
  )

  return (
    <div className="p-5 md:p-8 min-h-screen space-y-5">
      <div>
        <h1 className="text-white text-2xl font-bold">Withdrawal Request</h1>
        <p className="text-gray-500 text-sm mt-1">
          {withdrawals.length === 0
            ? 'Tidak ada withdrawal pending'
            : <span><span className="text-red-400 font-semibold">{withdrawals.length}</span> request menunggu persetujuan</span>
          }
        </p>
      </div>

      {withdrawals.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
          <p className="text-4xl mb-3">✅</p>
          <p className="text-gray-400 font-medium">Semua withdrawal sudah diproses</p>
          <p className="text-gray-600 text-sm mt-1">Tidak ada request pending saat ini</p>
        </div>
      ) : (
        <div className="space-y-3">
          {withdrawals.map(w => (
            <div key={w.id} className="bg-[#111318] border border-white/10 rounded-2xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">

                {/* User + bank info */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-300 font-bold flex-shrink-0">
                    {w.userName.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm">{w.userName}</p>
                    <p className="text-gray-500 text-xs">{w.userEmail}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
                      <span className="font-medium text-gray-300">{w.bankName}</span>
                      <span className="font-mono text-gray-400">{w.accountNumber}</span>
                      <span className="text-gray-600">a.n. {w.accountName}</span>
                    </div>
                    <p className="text-gray-600 text-xs mt-1">{formatDate(w.requestedAt)}</p>
                  </div>
                </div>

                {/* Amount + actions */}
                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                  <p className="text-blue-400 text-xl font-bold">{formatRp(w.amount)}</p>

                  {/* Reject reason input */}
                  {rejectOpen[w.id] && (
                    <textarea
                      value={rejectNotes[w.id] ?? ''}
                      onChange={e => setRejectNotes(p => ({ ...p, [w.id]: e.target.value }))}
                      placeholder="Alasan penolakan (opsional)..."
                      rows={2}
                      className="w-56 bg-[#0a0c10] border border-red-500/30 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition resize-none"
                    />
                  )}

                  <div className="flex gap-2">
                    {/* Reject button */}
                    {rejectOpen[w.id] ? (
                      <>
                        <button
                          onClick={() => setRejectOpen(p => ({ ...p, [w.id]: false }))}
                          className="text-xs px-3 py-2 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition">
                          Batal
                        </button>
                        <button
                          disabled={actionLoading === w.id}
                          onClick={() => handleReject(w.id)}
                          className="text-xs px-3 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 font-medium transition disabled:opacity-50">
                          {actionLoading === w.id ? '...' : '✕ Konfirmasi Tolak'}
                        </button>
                      </>
                    ) : (
                      <button
                        disabled={actionLoading === w.id}
                        onClick={() => setRejectOpen(p => ({ ...p, [w.id]: true }))}
                        className="text-xs px-3 py-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/20 font-medium transition disabled:opacity-50">
                        ✕ Reject
                      </button>
                    )}

                    {/* Approve button */}
                    <button
                      disabled={actionLoading === w.id}
                      onClick={() => handleApprove(w.id)}
                      className="text-xs px-3 py-2 rounded-xl bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 font-semibold transition disabled:opacity-50">
                      {actionLoading === w.id ? '...' : '✓ Approve'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  )
}
