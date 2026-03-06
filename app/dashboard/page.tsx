'use client'

// app/dashboard/page.tsx
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

// ─── Types ───────────────────────────────────────────────
interface Stats {
  revenue: number
  revenueLastMonth: number
  clicks: number
  clicksLastMonth: number
  sold: number
  soldLastMonth: number
  conversion: number
  conversionLastMonth: number
  balance: number
}

interface ChartDay {
  day: string
  amount: number
}

interface Transaction {
  id: string
  buyerName: string
  productName: string
  method: 'GoPay' | 'BCA' | 'QRIS' | string
  amount: number
  status: 'success' | 'pending' | 'failed'
}

// ─── Helpers ─────────────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours()
  if (h < 11) return 'Selamat pagi'
  if (h < 15) return 'Selamat siang'
  if (h < 19) return 'Selamat sore'
  return 'Selamat malam'
}

function formatRp(n: number) {
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(1)}jt`
  if (n >= 1_000) return `Rp ${(n / 1_000).toFixed(0)}rb`
  return `Rp ${n.toLocaleString('id-ID')}`
}

function formatRpFull(n: number) {
  return `Rp ${n.toLocaleString('id-ID')}`
}

function pctChange(curr: number, prev: number) {
  if (prev === 0) return curr > 0 ? 100 : 0
  return Math.round(((curr - prev) / prev) * 100)
}

// ─── Animated Counter ────────────────────────────────────
function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0)
  const raf = useRef<number>()
  useEffect(() => {
    const start = performance.now()
    const duration = 900
    const animate = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(ease * value))
      if (p < 1) raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)
    return () => { if (raf.current) cancelAnimationFrame(raf.current) }
  }, [value])
  return <>{prefix}{display.toLocaleString('id-ID')}{suffix}</>
}

// ─── Skeleton ────────────────────────────────────────────
function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`bg-blue-500/10 rounded-lg animate-pulse ${className}`} />
}

// ─── Stat Card ───────────────────────────────────────────
function StatCard({ icon, label, value, prev, prefix = '', suffix = '', color = 'blue' }: {
  icon: string; label: string; value: number; prev: number
  prefix?: string; suffix?: string; color?: string
}) {
  const pct = pctChange(value, prev)
  const up = pct >= 0
  return (
    <div className="bg-[#111318] border border-white/10 rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center text-xl">
          {icon}
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-0.5
          ${up ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'}`}>
          {up ? '↑' : '↓'} {Math.abs(pct)}%
        </span>
      </div>
      <div>
        <p className="text-2xl font-bold text-white">
          <AnimatedNumber value={value} prefix={prefix} suffix={suffix} />
        </p>
        <p className="text-xs text-gray-500 mt-1">{label}</p>
      </div>
    </div>
  )
}

// ─── Bar Chart ───────────────────────────────────────────
function BarChart({ data }: { data: ChartDay[] }) {
  const [tooltip, setTooltip] = useState<{ i: number; x: number; y: number } | null>(null)
  if (!data.length) return null
  const max = Math.max(...data.map(d => d.amount), 1)
  const todayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
  const maxIdx = data.reduce((mi, d, i) => d.amount > data[mi].amount ? i : mi, 0)

  return (
    <div className="bg-[#111318] border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-semibold text-sm">Revenue 7 Hari Terakhir</h3>
          <p className="text-gray-500 text-xs mt-0.5">Update harian</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block"/>&nbsp;Tertinggi</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-blue-500/25 inline-block"/>&nbsp;Lainnya</span>
        </div>
      </div>
      <div className="relative flex items-end justify-between gap-2 h-36 px-1">
        {data.map((d, i) => {
          const h = Math.max((d.amount / max) * 100, 4)
          const isHighlight = i === todayIdx || i === maxIdx
          return (
            <div
              key={i}
              className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer"
              onMouseEnter={(e) => {
                const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
                setTooltip({ i, x: rect.left + rect.width / 2, y: rect.top })
              }}
              onMouseLeave={() => setTooltip(null)}
            >
              <div className="w-full flex items-end justify-center" style={{ height: '120px' }}>
                <div
                  className="w-full rounded-t-lg transition-all duration-300"
                  style={{
                    height: `${h}%`,
                    background: isHighlight
                      ? 'linear-gradient(to top, #2563eb, #60a5fa)'
                      : 'rgba(59,130,246,0.22)',
                  }}
                />
              </div>
              <span className="text-[10px] text-gray-500 group-hover:text-blue-400 transition-colors">{d.day}</span>
            </div>
          )
        })}
        {tooltip && (
          <div
            className="fixed z-50 bg-[#1e2330] border border-white/10 rounded-lg px-3 py-2 text-xs text-white pointer-events-none shadow-xl"
            style={{ left: tooltip.x - 50, top: tooltip.y - 48, width: 100, textAlign: 'center' }}
          >
            {formatRpFull(data[tooltip.i].amount)}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Transaction Row ──────────────────────────────────────
function TxRow({ tx }: { tx: Transaction }) {
  const statusStyle = {
    success: 'bg-green-500/15 text-green-400',
    pending: 'bg-yellow-500/15 text-yellow-400',
    failed: 'bg-red-500/15 text-red-400',
  }[tx.status]

  const statusLabel = { success: 'Sukses', pending: 'Pending', failed: 'Gagal' }[tx.status]

  const methodColor: Record<string, string> = {
    GoPay: 'text-green-400', BCA: 'text-blue-400', QRIS: 'text-purple-400',
  }

  return (
    <div className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0">
      <div className="w-9 h-9 rounded-full bg-blue-600/30 border border-blue-500/30 flex items-center justify-center text-blue-300 text-sm font-bold flex-shrink-0">
        {tx.buyerName.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white font-medium truncate">{tx.buyerName}</p>
        <p className="text-xs text-gray-500 truncate">{tx.productName}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-sm font-semibold text-green-400">+{formatRp(tx.amount)}</p>
        <div className="flex items-center gap-1.5 justify-end mt-0.5">
          <span className={`text-[10px] ${methodColor[tx.method] ?? 'text-gray-400'}`}>{tx.method}</span>
          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${statusStyle}`}>{statusLabel}</span>
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────
export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [chart, setChart] = useState<ChartDay[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Mock user — replace with actual session/context
  const user = { name: 'Budi', username: 'budi' }

  const fetchAll = async () => {
    setLoading(true)
    setError(null)
    try {
      const [sRes, cRes, tRes] = await Promise.all([
        fetch('/api/dashboard/stats'),
        fetch('/api/dashboard/chart'),
        fetch('/api/transactions?limit=5'),
      ])
      if (!sRes.ok || !cRes.ok || !tRes.ok) throw new Error('Gagal memuat data')
      const [s, c, t] = await Promise.all([sRes.json(), cRes.json(), tRes.json()])
      setStats(s)
      setChart(c.data)
      setTransactions(t.transactions)
    } catch (e: any) {
      setError(e.message ?? 'Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [])

  // ── Loading ──
  if (loading) return (
    <div className="p-6 space-y-6 min-h-screen bg-[#0a0c10]">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28" />)}
      </div>
      <Skeleton className="h-56" />
      <Skeleton className="h-64" />
    </div>
  )

  // ── Error ──
  if (error) return (
    <div className="p-6 min-h-screen bg-[#0a0c10] flex items-start">
      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 max-w-md">
        <p className="text-red-400 font-semibold mb-1">Gagal memuat dashboard</p>
        <p className="text-red-400/70 text-sm mb-4">{error}</p>
        <button
          onClick={fetchAll}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  )

  const revPct = stats ? pctChange(stats.revenue, stats.revenueLastMonth) : 0

  return (
    <div className="p-5 md:p-8 space-y-6 min-h-screen bg-[#0a0c10]">

      {/* ── Greeting ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-white text-2xl font-bold">
            {getGreeting()}, {user.name}! 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Revenue bulan ini{' '}
            <span className={revPct >= 0 ? 'text-green-400' : 'text-red-400'}>
              {revPct >= 0 ? '↑' : '↓'} {Math.abs(revPct)}%
            </span>{' '}
            dibanding bulan lalu
            {stats && (
              <span className="text-gray-600">
                {' '}({formatRp(stats.revenueLastMonth)})
              </span>
            )}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <Link href="/dashboard/links"
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition">
            ➕ Tambah Link
          </Link>
          <Link href="/dashboard/products"
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition">
            📦 Buat Produk
          </Link>
          <a href={`/${user.username}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 text-blue-400 border border-blue-500/30 transition">
            🔗 Lihat Bio
          </a>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon="💰" label="Revenue Bulan Ini" value={stats.revenue} prev={stats.revenueLastMonth} prefix="Rp " />
          <StatCard icon="👆" label="Total Klik Bio" value={stats.clicks} prev={stats.clicksLastMonth} />
          <StatCard icon="📦" label="Produk Terjual" value={stats.sold} prev={stats.soldLastMonth} />
          <StatCard icon="📈" label="Konversi Rate" value={stats.conversion} prev={stats.conversionLastMonth} suffix="%" />
          {stats.balance > 0 && (
            <div className="col-span-2 lg:col-span-4">
              <StatCard icon="🏦" label="Saldo Tersedia" value={stats.balance} prev={0} prefix="Rp " />
            </div>
          )}
        </div>
      )}

      {/* ── Chart + Transactions grid ── */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Bar Chart — 3 cols */}
        <div className="xl:col-span-3">
          <BarChart data={chart} />
        </div>

        {/* Transactions — 2 cols */}
        <div className="xl:col-span-2 bg-[#111318] border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold text-sm">Transaksi Terbaru</h3>
            <Link href="/dashboard/transactions" className="text-xs text-blue-400 hover:text-blue-300 transition">
              Lihat semua →
            </Link>
          </div>
          {transactions.length === 0 ? (
            <p className="text-gray-600 text-sm text-center py-8">Belum ada transaksi</p>
          ) : (
            <div>
              {transactions.map(tx => <TxRow key={tx.id} tx={tx} />)}
            </div>
          )}
        </div>
      </div>

    </div>
  )
}