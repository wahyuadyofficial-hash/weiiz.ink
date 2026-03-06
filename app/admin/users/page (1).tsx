'use client'

// app/admin/users/page.tsx
import { useEffect, useState, useCallback } from 'react'

type Plan = 'FREE' | 'STARTER' | 'PRO' | 'ELITE'
type UserStatus = 'active' | 'suspended'

interface AdminUser {
  id: string
  name: string
  email: string
  username: string
  plan: Plan
  gmvTotal: number
  status: UserStatus
  avatar?: string
}

interface PaginatedUsers {
  users: AdminUser[]
  total: number
  page: number
  totalPages: number
}

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`bg-white/5 rounded-lg animate-pulse ${className}`} />
}

function formatRp(n: number) {
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(1)}jt`
  if (n >= 1_000) return `Rp ${(n / 1_000).toFixed(0)}rb`
  return `Rp ${n.toLocaleString('id-ID')}`
}

const PLAN_STYLE: Record<Plan, string> = {
  FREE:    'bg-gray-700/50 text-gray-300',
  STARTER: 'bg-blue-900/50 text-blue-300',
  PRO:     'bg-blue-500/20 text-blue-300',
  ELITE:   'bg-purple-700/30 text-purple-300',
}

// Toast
function Toast({ message, type }: { message: string; type: 'success' | 'error' }) {
  return (
    <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-xl border
      ${type === 'success' ? 'bg-green-500/20 border-green-500/30 text-green-300' : 'bg-red-500/20 border-red-500/30 text-red-300'}`}>
      {type === 'success' ? '✓ ' : '✕ '}{message}
    </div>
  )
}

export default function AdminUsersPage() {
  const [data, setData] = useState<PaginatedUsers | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [planFilter, setPlanFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(search && { search }),
        ...(planFilter !== 'all' && { plan: planFilter }),
        ...(statusFilter !== 'all' && { status: statusFilter }),
      })
      const res = await fetch(`/api/admin/users?${params}`)
      if (!res.ok) throw new Error()
      setData(await res.json())
    } catch {
      showToast('Gagal memuat data user', 'error')
    } finally { setLoading(false) }
  }, [page, search, planFilter, statusFilter])

  useEffect(() => { fetchUsers() }, [fetchUsers])

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => { setPage(1); fetchUsers() }, 400)
    return () => clearTimeout(t)
  }, [search])

  const handleToggleStatus = async (user: AdminUser) => {
    const newStatus: UserStatus = user.status === 'active' ? 'suspended' : 'active'
    setActionLoading(user.id)
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error()
      setData(prev => prev ? {
        ...prev,
        users: prev.users.map(u => u.id === user.id ? { ...u, status: newStatus } : u)
      } : prev)
      showToast(`User berhasil di${newStatus === 'suspended' ? 'suspend' : 'aktifkan'}`)
    } catch {
      showToast('Gagal mengubah status user', 'error')
    } finally { setActionLoading(null) }
  }

  return (
    <div className="p-5 md:p-8 min-h-screen space-y-5">
      <div>
        <h1 className="text-white text-2xl font-bold">Kelola User</h1>
        <p className="text-gray-500 text-sm mt-1">{data?.total ?? 0} total user terdaftar</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Cari nama, email, username..."
          className="flex-1 bg-[#111318] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition"
        />
        <select value={planFilter} onChange={e => { setPlanFilter(e.target.value); setPage(1) }}
          className="bg-[#111318] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-blue-500 transition">
          <option value="all">Semua Plan</option>
          <option value="FREE">FREE</option>
          <option value="STARTER">STARTER</option>
          <option value="PRO">PRO</option>
          <option value="ELITE">ELITE</option>
        </select>
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1) }}
          className="bg-[#111318] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-blue-500 transition">
          <option value="all">Semua Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#111318] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {['User', 'Username', 'Plan', 'GMV Total', 'Status', 'Aksi'].map(h => (
                  <th key={h} className="text-left text-xs text-gray-500 font-medium px-5 py-3.5 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-b border-white/5">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="px-5 py-4"><Skeleton className="h-4 w-24" /></td>
                    ))}
                  </tr>
                ))
              ) : data?.users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-gray-600 text-sm">
                    Tidak ada user ditemukan
                  </td>
                </tr>
              ) : data?.users.map(user => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.02] transition">
                  {/* User */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-300 text-xs font-bold flex-shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-sm font-medium truncate max-w-[140px]">{user.name}</p>
                        <p className="text-gray-500 text-xs truncate max-w-[140px]">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  {/* Username */}
                  <td className="px-5 py-3.5 text-gray-400 text-sm">@{user.username}</td>
                  {/* Plan */}
                  <td className="px-5 py-3.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${PLAN_STYLE[user.plan]}`}>
                      {user.plan}
                    </span>
                  </td>
                  {/* GMV */}
                  <td className="px-5 py-3.5 text-gray-300 text-sm font-medium">{formatRp(user.gmvTotal)}</td>
                  {/* Status */}
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full
                      ${user.status === 'active'
                        ? 'bg-green-500/15 text-green-400'
                        : 'bg-red-500/15 text-red-400'}`}>
                      {user.status === 'active' ? '● Active' : '● Suspended'}
                    </span>
                  </td>
                  {/* Action */}
                  <td className="px-5 py-3.5">
                    <button
                      disabled={actionLoading === user.id}
                      onClick={() => handleToggleStatus(user)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg transition disabled:opacity-50
                        ${user.status === 'active'
                          ? 'bg-red-500/15 text-red-400 hover:bg-red-500/25'
                          : 'bg-green-500/15 text-green-400 hover:bg-green-500/25'}`}>
                      {actionLoading === user.id ? '...' : user.status === 'active' ? 'Suspend' : 'Aktifkan'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-white/10">
            <p className="text-xs text-gray-500">
              Halaman {data.page} dari {data.totalPages} · {data.total} user
            </p>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="px-3 py-1.5 text-xs rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 disabled:opacity-30 transition">
                ← Prev
              </button>
              <button onClick={() => setPage(p => Math.min(data.totalPages, p + 1))} disabled={page === data.totalPages}
                className="px-3 py-1.5 text-xs rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 disabled:opacity-30 transition">
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  )
}
