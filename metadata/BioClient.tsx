'use client'

// app/[username]/BioClient.tsx
import { useState } from 'react'
import type { PublicUser, PublicLink, LinkType } from './page'

// ─── Constants ───────────────────────────────────────────
const TYPE_META: Record<LinkType, { icon: string; color: string; bg: string }> = {
  product:   { icon: '📦', color: '#38bdf8', bg: 'rgba(56,189,248,0.15)'  },
  payment:   { icon: '💳', color: '#fbbf24', bg: 'rgba(251,191,36,0.15)'  },
  whatsapp:  { icon: '💬', color: '#34d399', bg: 'rgba(52,211,153,0.15)'  },
  link:      { icon: '🔗', color: '#7ba3c0', bg: 'rgba(123,163,192,0.15)' },
  download:  { icon: '⬇️', color: '#a78bfa', bg: 'rgba(167,139,250,0.15)' },
  affiliate: { icon: '🤝', color: '#fb923c', bg: 'rgba(251,146,60,0.15)'  },
}

function formatRp(n: number) {
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}jt`
  return `Rp ${n.toLocaleString('id-ID')}`
}

// ─── Avatar ───────────────────────────────────────────────
function Avatar({ user }: { user: PublicUser }) {
  return (
    <div className="relative w-24 h-24 mx-auto mb-4">
      {/* Glow ring */}
      <div className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6)',
          padding: '2px',
          animation: 'spin 4s linear infinite',
        }}>
        <div className="w-full h-full rounded-full bg-[#040d1a]" />
      </div>
      {/* Avatar */}
      <div className="absolute inset-[3px] rounded-full overflow-hidden bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
        {user.avatar
          ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          : <span className="text-white text-3xl font-bold">{user.name.charAt(0).toUpperCase()}</span>
        }
      </div>
    </div>
  )
}

// ─── Link Card ────────────────────────────────────────────
function LinkCard({ link, onClick }: { link: PublicLink; onClick: () => void }) {
  const m = TYPE_META[link.type]
  const isProduct = link.type === 'product'

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="group flex items-center gap-3 w-full text-left transition-all duration-200"
      style={{ textDecoration: 'none' }}
    >
      <div
        className="flex items-center gap-3 w-full px-4 py-3.5 rounded-[14px] border transition-all duration-200"
        style={{
          background: isProduct
            ? 'rgba(56,189,248,0.06)'
            : 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(12px)',
          borderColor: isProduct ? 'rgba(56,189,248,0.3)' : 'rgba(255,255,255,0.1)',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.transform = 'translateY(-2px)'
          el.style.borderColor = isProduct ? 'rgba(56,189,248,0.6)' : 'rgba(255,255,255,0.25)'
          el.style.background = isProduct ? 'rgba(56,189,248,0.1)' : 'rgba(255,255,255,0.07)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.transform = 'translateY(0)'
          el.style.borderColor = isProduct ? 'rgba(56,189,248,0.3)' : 'rgba(255,255,255,0.1)'
          el.style.background = isProduct ? 'rgba(56,189,248,0.06)' : 'rgba(255,255,255,0.04)'
        }}
      >
        {/* Icon */}
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-base"
          style={{ background: m.bg }}>
          {m.icon}
        </div>

        {/* Label */}
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-semibold leading-tight">{link.title}</p>
          {link.type === 'product' && link.price && (
            <p className="text-xs mt-0.5" style={{ color: m.color }}>{formatRp(link.price)}</p>
          )}
          {link.type === 'whatsapp' && (
            <p className="text-xs text-gray-500 mt-0.5">{link.url.replace('https://wa.me/', '+')}</p>
          )}
        </div>

        {/* Product price badge */}
        {isProduct && link.price && (
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg flex-shrink-0"
            style={{ background: 'rgba(56,189,248,0.15)', color: '#38bdf8' }}>
            {formatRp(link.price)}
          </span>
        )}

        {/* Arrow */}
        <span className="text-gray-600 group-hover:text-gray-400 transition-colors flex-shrink-0 text-sm">→</span>
      </div>
    </a>
  )
}

// ─── Donation Widget ──────────────────────────────────────
function DonationWidget({ user }: { user: PublicUser }) {
  const [amount, setAmount] = useState<number | null>(null)
  const [custom, setCustom] = useState('')
  const [sent, setSent] = useState(false)

  const presets = [10000, 25000, 50000]
  const finalAmount = amount ?? (custom ? parseInt(custom.replace(/\D/g, '')) : 0)

  const handleSend = () => {
    if (!finalAmount) return
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setAmount(null)
    setCustom('')
  }

  return (
    <div className="w-full rounded-[14px] border border-white/10 p-5"
      style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)' }}>
      <p className="text-white text-sm font-semibold mb-4 text-center">
        ☕ Support {user.name.split(' ')[0]}
      </p>
      <div className="flex gap-2 mb-3">
        {presets.map(p => (
          <button key={p} onClick={() => { setAmount(p); setCustom('') }}
            className="flex-1 py-2 rounded-xl text-xs font-medium transition-all duration-150"
            style={{
              background: amount === p ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${amount === p ? 'rgba(59,130,246,0.6)' : 'rgba(255,255,255,0.1)'}`,
              color: amount === p ? '#93c5fd' : '#9ca3af',
            }}>
            Rp {(p / 1000).toFixed(0)}K
          </button>
        ))}
      </div>
      <input
        value={custom}
        onChange={e => { setCustom(e.target.value.replace(/\D/g, '')); setAmount(null) }}
        placeholder="Nominal lain..."
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition mb-3"
      />
      <button
        onClick={handleSend}
        disabled={!finalAmount || sent}
        className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 disabled:opacity-40"
        style={{
          background: sent ? 'rgba(34,197,94,0.2)' : 'rgba(59,130,246,0.8)',
          color: sent ? '#86efac' : '#fff',
          border: sent ? '1px solid rgba(34,197,94,0.4)' : '1px solid transparent',
        }}>
        {sent ? '✓ Terima kasih! 💙' : `Kirim Dukungan 💙${finalAmount ? ` · ${formatRp(finalAmount)}` : ''}`}
      </button>
    </div>
  )
}

// ─── Main Client Component ────────────────────────────────
export default function BioClient({ user, links }: { user: PublicUser; links: PublicLink[] }) {
  const recordClick = async (linkId: string) => {
    fetch('/api/analytics/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ linkId, username: user.username }),
    }).catch(() => {})
  }

  const sortedLinks = [...links].filter(l => l.active).sort((a, b) => a.order - b.order)

  return (
    <>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
        .fade-up { animation: fadeUp 0.5s ease forwards; opacity: 0; }
      `}</style>

      <div className="min-h-screen flex flex-col items-center"
        style={{
          background: '#040d1a',
          backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.25) 0%, transparent 70%)',
        }}>

        <div className="w-full max-w-[420px] px-4 pt-12 pb-10 flex flex-col items-center gap-5">

          {/* ── Profile Header ── */}
          <div className="fade-up w-full flex flex-col items-center text-center" style={{ animationDelay: '0s' }}>
            <Avatar user={user} />

            <h1 className="text-white text-2xl font-bold leading-tight">{user.name}</h1>

            {user.bio && (
              <p className="text-gray-400 text-sm mt-1.5 leading-relaxed max-w-[300px] line-clamp-2">
                {user.bio}
              </p>
            )}

            <p className="text-blue-500 text-xs mt-2 font-medium">
              weiiz.ink/{user.username}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-4 mt-4 text-xs text-gray-600">
              <span><span className="text-gray-400 font-medium">{user.totalClicks.toLocaleString('id-ID')}</span> klik</span>
              <span className="text-gray-700">·</span>
              <span><span className="text-gray-400 font-medium">{user.totalSold}</span> terjual</span>
              <span className="text-gray-700">·</span>
              <span><span className="text-gray-400 font-medium">{user.totalProducts}</span> produk</span>
            </div>
          </div>

          {/* ── Links ── */}
          <div className="w-full flex flex-col gap-2.5">
            {sortedLinks.map((link, i) => (
              <div
                key={link.id}
                className="fade-up w-full"
                style={{ animationDelay: `${0.1 + i * 0.06}s` }}
              >
                <LinkCard link={link} onClick={() => recordClick(link.id)} />
              </div>
            ))}
          </div>

          {/* ── Donation Widget ── */}
          {user.donationEnabled && (
            <div className="fade-up w-full" style={{ animationDelay: `${0.1 + sortedLinks.length * 0.06}s` }}>
              <DonationWidget user={user} />
            </div>
          )}

          {/* ── Footer ── */}
          <a
            href="https://weiiz.ink"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-xs text-gray-700 hover:text-gray-500 transition-colors"
          >
            Dibuat dengan <span className="text-blue-600">Weiiz.ink</span>
          </a>

        </div>
      </div>
    </>
  )
}
