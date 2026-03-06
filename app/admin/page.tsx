'use client'

// app/admin/page.tsx
import { useEffect, useState } from 'react'

interface AdminStats {
  gmvAllTime: number
  totalUsers: number
  usersByPlan: { FREE: number; STARTER: number; PRO: number; ELITE: number }
  transactionsToday: number
  withdrawalPending: number
}

interface TopCreator {
  id: string
  name: string
  username: string
  gmvMonth: number
  plan: 'FREE' | 'STARTER' | 'PRO' | 'ELITE'
}

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`bg-white/5 rounded-lg animate-pulse ${className}`} />
}

function formatRp(n: number) {
  if (n >= 1_000_000_000) return `Rp ${(n / 1_000_000_000).toFixed(1)}M`
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(1)}jt`
  if (n >= 1_000) return `Rp ${(n / 1_000).toFixed(0)}rb`
  return `Rp ${n.toLocaleString('id-ID')}`
}

const PLAN_STYLE: Record<string, string> = {
  FREE:    'bg-gray-700/50 text-gray-300',
  STARTER: 'bg-blue-900/50 text-blue-300',
  PRO:     'bg-blue-500/20 text-blue-300',
  ELITE:   'bg-purple-700/30 text-purple-300',
}

const PLAN_COLORS: Record<string, string> = {
  FREE: '#6b7280', STARTER: '#3b82f6', PRO: '#38bdf8', ELITE: '#a78bfa'
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [topCreators, setTopCreators] = useState<TopCreator[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true); setError(null)
    try {
      const [sRes, tRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/top-creators'),
      ])
      if (!sRes.ok || !tRes.ok) throw new Error('Gagal memuat data')
      const [s, t] = await Promise.all([sRes.json(), tRes.json()])
      setStats(s)
      setTopCreators(t.creators)
    } catch (e: any) {
      setError(e.message)
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [])

  if (loading) return (
    <div className="p-6 space-y-5 min-h-screen">
      <Skeleton className="h-9 w-40" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28" />)}</div>
      <Skeleton className="h-64" />
    </div>
  )

  if (error) return (
    <div className="p-6 min-h-screen">
      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 max-w-md">
        <p className="text-red-400 font-semibold mb-3">{error}</p>
        <button onClick={fetchData} className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition">Coba Lagi</button>
      </div>
    </div>
  )

  const planEntries = stats ? Object.entries(stats.usersByPlan) : []
  const maxPlan = Math.max(...planEntries.map(([, v]) => v), 1)

  return (
    <div className="p-5 md:p-8 space-y-6 min-h-screen">
      <div>
        <h1 className="text-white text-2xl font-bold">Admin Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Statistik global Weiiz.ink</p>
      </div>

      {/* Stat Cards */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: '💰', label: 'GMV All Time',         value: formatRp(stats.gmvAllTime),          color: 'text-white' },
            { icon: '👥', label: 'Total User',           value: stats.totalUsers.toLocaleString(),    color: 'text-white' },
            { icon: '📊', label: 'Transaksi Hari Ini',   value: stats.transactionsToday.toString(),   color: 'text-white' },
            { icon: '💸', label: 'Withdrawal Pending',   value: stats.withdrawalPending.toString(),   color: stats.withdrawalPending > 0 ? 'text-red-400' : 'text-white' },
          ].map((c, i) => (
            <div key={i} className="bg-[#111318] border border-white/10 rounded-2xl p-5">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl mb-3">{c.icon}</div>
              <p className={`text-2xl font-bold ${c.color}`}>{c.value}</p>
              <p className="text-xs text-gray-500 mt-1">{c.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User by Plan Bar */}
        {stats && (
          <div className="bg-[#111318] border border-white/10 rounded-2xl p-5">
            <h3 className="text-white font-semibold text-sm mb-5">User per Plan</h3>
            <div className="space-y-3">
              {planEntries.map(([plan, count]) => (
                <div key={plan}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span style={{ color: PLAN_COLORS[plan] }} className="font-medium">{plan}</span>
                    <span className="text-gray-500">{count} user</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${(count / maxPlan) * 100}%`, background: PLAN_COLORS[plan] }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Creators */}
        <div className="bg-[#111318] border border-white/10 rounded-2xl p-5">
          <h3 className="text-white font-semibold text-sm mb-4">Top 5 Creator — GMV Bulan Ini</h3>
          <div className="space-y-0">
            {topCreators.map((c, i) => (
              <div key={c.id} className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0">
                <span className="text-gray-600 text-xs w-4 text-center font-mono">{i + 1}</span>
                <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-300 text-xs font-bold flex-shrink-0">
                  {c.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{c.name}</p>
                  <p className="text-gray-500 text-xs">@{c.username}</p>
                </div>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${PLAN_STYLE[c.plan]}`}>{c.plan}</span>
                <span className="text-green-400 text-sm font-semibold flex-shrink-0">{formatRp(c.gmvMonth)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
