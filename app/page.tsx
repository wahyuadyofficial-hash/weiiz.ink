'use client'

import { useState, useEffect, useCallback, createContext, useContext, useRef } from 'react'
import Link from 'next/link'

// ── Toast System ──────────────────────────────────────────────
interface Toast { id: number; msg: string; type: string }
type AddToast = (msg: string, type?: string) => void

const ToastCtx = createContext<AddToast>(() => {})
const useToast = () => useContext(ToastCtx)

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const add = useCallback((msg: string, type: string = 'success') => {
    const id = Date.now()
    setToasts(p => [...p, { id, msg, type }])
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3200)
  }, [])

  const icons: Record<string, string> = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' }
  const colors: Record<string, string> = {
    success: 'rgba(34,197,94,0.15)',
    error:   'rgba(239,68,68,0.15)',
    info:    'rgba(56,189,248,0.15)',
    warning: 'rgba(245,158,11,0.15)',
  }
  const textColors: Record<string, string> = {
    success: '#4ade80', error: '#f87171', info: '#38bdf8', warning: '#fbbf24',
  }

  return (
    <ToastCtx.Provider value={add}>
      {children}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            background: colors[t.type] ?? colors.info,
            color: textColors[t.type] ?? textColors.info,
            border: `1px solid ${textColors[t.type] ?? textColors.info}40`,
            borderRadius: 12, padding: '12px 18px',
            display: 'flex', alignItems: 'center', gap: 8,
            fontSize: 13, fontWeight: 600,
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
          }}>
            <span>{icons[t.type] ?? icons.info}</span>
            <span>{t.msg}</span>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}

// ── Navbar ────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navLinks = ['Fitur', 'Harga', 'Kreator', 'FAQ']

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(4,13,26,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(56,189,248,0.1)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg,#1d4ed8,#38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>☁</div>
          <span style={{ color: 'white', fontWeight: 800, fontSize: 18 }}>Weiiz<span style={{ color: '#38bdf8' }}>.ink</span></span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 4 }} className="hide-mobile">
          {navLinks.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color: '#7a95b4', padding: '8px 14px', borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = '#7a95b4')}>
              {l}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }} className="hide-mobile">
          <Link href="/login" style={{ color: '#7a95b4', padding: '8px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Masuk</Link>
          <Link href="/register" style={{ background: 'linear-gradient(135deg,#1d4ed8,#38bdf8)', color: 'white', padding: '9px 18px', borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: 'none', boxShadow: '0 0 20px rgba(56,189,248,0.3)' }}>Mulai Gratis</Link>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(p => !p)} style={{ background: 'none', border: 'none', color: '#7a95b4', cursor: 'pointer', fontSize: 20 }} className="show-mobile">☰</button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: 'rgba(4,13,26,0.97)', borderTop: '1px solid rgba(56,189,248,0.1)', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {navLinks.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{ color: '#7a95b4', padding: '10px 0', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>{l}</a>
          ))}
          <Link href="/login" style={{ color: 'white', padding: '12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', fontSize: 14, fontWeight: 600, textDecoration: 'none', textAlign: 'center', marginTop: 8 }}>Masuk</Link>
          <Link href="/register" style={{ background: 'linear-gradient(135deg,#1d4ed8,#38bdf8)', color: 'white', padding: '12px', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}>Mulai Gratis</Link>
        </div>
      )}
    </nav>
  )
}

// ── Hero ──────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ minHeight: '100vh', background: '#040d1a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 60px', position: 'relative', overflow: 'hidden' }}>
      {/* Glow */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 700, height: 400, background: 'radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.18), transparent 65%)', pointerEvents: 'none' }} />
      {/* Grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', textAlign: 'center', maxWidth: 680 }}>
        {/* Chip */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px', borderRadius: 999, border: '1px solid rgba(56,189,248,0.25)', background: 'rgba(56,189,248,0.08)', color: '#38bdf8', fontSize: 13, fontWeight: 600, marginBottom: 28 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#38bdf8', animation: 'pulse 2s infinite' }} />
          Platform Bio #1 Indonesia
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 900, lineHeight: 1.05, color: 'white', marginBottom: 20 }}>
          Ubah Bio Jadi<br />
          <span style={{ background: 'linear-gradient(135deg,#60a5fa,#38bdf8,#818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Mesin Penghasil Uang
          </span>
        </h1>

        <p style={{ color: '#7a95b4', fontSize: 16, lineHeight: 1.7, marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>
          Satu link. Banyak benefit. Jual produk digital, terima pembayaran, kelola affiliate, dan analitik lengkap — semua dari satu halaman bio.
        </p>

        {/* CTA */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          <Link href="/register" style={{ background: 'linear-gradient(135deg,#1d4ed8,#38bdf8)', color: 'white', padding: '14px 28px', borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 0 32px rgba(56,189,248,0.4)' }}>
            ✦ Mulai Gratis
          </Link>
          <button style={{ background: 'transparent', color: '#7a95b4', padding: '14px 28px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>
            ▶ Lihat Demo
          </button>
        </div>

        {/* Social proof */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <div style={{ display: 'flex' }}>
            {['#e11d48','#7c3aed','#0284c7','#059669','#d97706'].map((c, i) => (
              <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', background: c, border: '2px solid #040d1a', marginLeft: i === 0 ? 0 : -8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 11, fontWeight: 700 }}>
                {['R','D','S','A','B'][i]}
              </div>
            ))}
          </div>
          <p style={{ color: '#7a95b4', fontSize: 13 }}>
            <strong style={{ color: 'white' }}>14.200+</strong> creator sudah bergabung
          </p>
        </div>
      </div>
    </section>
  )
}

// ── Stats ─────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { value: 'Rp 8,4M+', label: 'Total GMV Creator' },
    { value: '14.200+',  label: 'Creator Aktif' },
    { value: '124K+',    label: 'Total Transaksi' },
    { value: '99.98%',   label: 'Uptime Platform' },
  ]
  return (
    <section style={{ background: '#050f20', borderTop: '1px solid rgba(56,189,248,0.1)', borderBottom: '1px solid rgba(56,189,248,0.1)' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ padding: '40px 24px', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(56,189,248,0.1)' : 'none' }}>
            <p style={{ fontSize: 36, fontWeight: 900, color: 'white', marginBottom: 6 }}>{s.value}</p>
            <p style={{ color: '#7a95b4', fontSize: 13 }}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Features ──────────────────────────────────────────────────
function Features() {
  const features = [
    { icon: '🔗', title: 'Bio Link Unlimited',       desc: 'Tambahkan link sebanyak apapun, susun dengan drag & drop.',         badge: 'GRATIS' },
    { icon: '📦', title: 'Jual Produk Digital',       desc: 'Upload e-book, preset, template. Pembayaran otomatis masuk.',       badge: 'POPULER' },
    { icon: '💳', title: 'Multi Payment Gateway',     desc: 'GoPay, OVO, QRIS, transfer bank — semua dalam satu dashboard.',    badge: 'LENGKAP' },
    { icon: '📊', title: 'Analytics Real-time',       desc: 'Pantau klik, konversi, revenue per link. Update setiap menit.',    badge: 'PRO' },
    { icon: '🤖', title: 'AI Bio Writer',             desc: 'Tulis bio menarik dan caption produk yang convert — by AI.',       badge: 'AI' },
    { icon: '🏦', title: 'Withdrawal Instan',         desc: 'Tarik saldo ke rekening kapan saja. Proses 1x24 jam.',             badge: 'CEPAT' },
    { icon: '🤝', title: 'Affiliate System',          desc: 'Buat link affiliate, tracking komisi otomatis.',                   badge: 'ELITE' },
    { icon: '🎨', title: 'Custom Tema',               desc: 'Pilih dari 20+ tema atau buat sendiri sesuai branding.',           badge: 'STARTER' },
    { icon: '🔒', title: 'Keamanan Enterprise',       desc: 'SSL, 2FA, enkripsi data. Platform aman 24/7.',                     badge: 'SEMUA' },
  ]
  return (
    <section id="fitur" style={{ background: '#040d1a', padding: '96px 24px' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontSize: 36, fontWeight: 900, color: 'white', marginBottom: 12 }}>
            Semua yang kamu butuhkan <span style={{ color: '#38bdf8' }}>ada di sini</span>
          </h2>
          <p style={{ color: '#7a95b4', fontSize: 15 }}>Dari bio link sederhana sampai toko digital lengkap.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: '#071428', border: '1px solid rgba(56,189,248,0.15)', borderRadius: 16, padding: 20, transition: 'border-color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(56,189,248,0.35)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(56,189,248,0.15)')}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ fontSize: 24 }}>{f.icon}</div>
                <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6, background: 'rgba(56,189,248,0.1)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.2)' }}>{f.badge}</span>
              </div>
              <h3 style={{ color: 'white', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{f.title}</h3>
              <p style={{ color: '#7a95b4', fontSize: 12, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Pricing ───────────────────────────────────────────────────
function Pricing() {
  const [yearly, setYearly] = useState(false)
  const plans = [
    { name: 'FREE',    monthly: 0,      yearly: 0,      fee: '5%/transaksi',   features: ['5 link aktif','2 produk digital','Analitik dasar','Subdomain weiiz.ink'],                                         highlight: false },
    { name: 'STARTER', monthly: 49000,  yearly: 39000,  fee: '3%/transaksi',   features: ['25 link aktif','10 produk digital','Analitik lengkap','Custom subdomain','Withdrawal 2x/bln'],                    highlight: false },
    { name: 'PRO',     monthly: 129000, yearly: 99000,  fee: '1.5%/transaksi', features: ['Link unlimited','Produk unlimited','Analytics real-time','Custom domain','AI Bio Writer','Withdrawal kapan saja'], highlight: true  },
    { name: 'ELITE',   monthly: 299000, yearly: 229000, fee: '0.5%/transaksi', features: ['Semua fitur PRO','Multi-user','White-label','API access','Dedicated support'],                                     highlight: false },
  ]
  return (
    <section id="harga" style={{ background: '#050f20', padding: '96px 24px' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 36, fontWeight: 900, color: 'white', marginBottom: 12 }}>
            Harga <span style={{ color: '#38bdf8' }}>transparan</span>
          </h2>
          <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(56,189,248,0.15)', borderRadius: 12, padding: 4, gap: 4, marginTop: 16 }}>
            {['Bulanan','Tahunan'].map((t, i) => (
              <button key={t} onClick={() => setYearly(i === 1)} style={{ padding: '8px 20px', borderRadius: 9, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13, background: yearly === (i === 1) ? '#38bdf8' : 'transparent', color: yearly === (i === 1) ? 'white' : '#7a95b4', transition: 'all 0.15s' }}>
                {t}{i === 1 && <span style={{ marginLeft: 6, fontSize: 10, background: 'rgba(34,197,94,0.2)', color: '#4ade80', padding: '1px 6px', borderRadius: 4 }}>-25%</span>}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
          {plans.map(p => (
            <div key={p.name} style={{ background: p.highlight ? 'linear-gradient(160deg,rgba(56,189,248,0.1),rgba(29,78,216,0.08))' : '#071428', border: `1px solid ${p.highlight ? 'rgba(56,189,248,0.4)' : 'rgba(56,189,248,0.15)'}`, borderRadius: 16, padding: 24, position: 'relative', transform: p.highlight ? 'scale(1.02)' : 'none', boxShadow: p.highlight ? '0 0 40px rgba(56,189,248,0.15)' : 'none' }}>
              {p.highlight && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg,#1d4ed8,#38bdf8)', color: 'white', fontSize: 11, fontWeight: 700, padding: '3px 12px', borderRadius: 999 }}>POPULER</div>}
              <p style={{ color: '#38bdf8', fontSize: 11, fontWeight: 700, marginBottom: 8 }}>{p.name}</p>
              <p style={{ color: 'white', fontSize: 32, fontWeight: 900, marginBottom: 4 }}>{(yearly ? p.yearly : p.monthly) === 0 ? 'Gratis' : `Rp ${(yearly ? p.yearly : p.monthly).toLocaleString('id-ID')}`}</p>
              <p style={{ color: '#3d5a7a', fontSize: 12, marginBottom: 20 }}>{p.fee}</p>
              <ul style={{ listStyle: 'none', marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {p.features.map((f, i) => <li key={i} style={{ color: '#7a95b4', fontSize: 12, display: 'flex', gap: 8 }}><span style={{ color: '#38bdf8' }}>✓</span>{f}</li>)}
              </ul>
              <Link href="/register" style={{ display: 'block', textAlign: 'center', padding: '11px', borderRadius: 10, background: p.highlight ? 'linear-gradient(135deg,#1d4ed8,#38bdf8)' : 'transparent', color: p.highlight ? 'white' : '#38bdf8', border: p.highlight ? 'none' : '1px solid rgba(56,189,248,0.3)', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                {p.name === 'FREE' ? 'Daftar Gratis' : `Pilih ${p.name}`}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── FAQ ───────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const faqs = [
    { q: 'Apakah Weiiz.ink benar-benar gratis?', a: 'Ya! Plan FREE tidak ada biaya bulanan. Kamu hanya bayar 5% fee per transaksi yang berhasil.' },
    { q: 'Apa bedanya dengan Linktree atau Lynk.id?', a: 'Weiiz.ink bukan hanya bio link — ini platform monetisasi. Jual produk, terima pembayaran, kelola affiliate, semua dalam satu tempat.' },
    { q: 'Bagaimana cara withdrawal saldo?', a: 'Di dashboard, buka menu Withdrawal, masukkan nomor rekening, dan ajukan penarikan. Saldo ditransfer dalam 1x24 jam kerja.' },
    { q: 'Apakah bisa pakai domain sendiri?', a: 'Bisa! Plan PRO dan ELITE mendukung custom domain.' },
    { q: 'Produk digital apa saja yang bisa dijual?', a: 'E-book, template, preset, video course, kelas online, software, plugin, dan file digital lainnya.' },
    { q: 'Apakah data dan transaksi aman?', a: 'Sangat aman. Semua data dienkripsi, HTTPS enforced, 2FA tersedia, server dimonitor 24/7.' },
  ]
  return (
    <section id="faq" style={{ background: '#040d1a', padding: '96px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <h2 style={{ fontSize: 36, fontWeight: 900, color: 'white', textAlign: 'center', marginBottom: 48 }}>Pertanyaan Umum</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ background: open === i ? 'rgba(56,189,248,0.06)' : '#071428', border: `1px solid ${open === i ? 'rgba(56,189,248,0.3)' : 'rgba(56,189,248,0.15)'}`, borderRadius: 14, overflow: 'hidden', transition: 'all 0.2s' }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16 }}>
                <span style={{ color: open === i ? 'white' : '#c8d8e8', fontWeight: 600, fontSize: 14 }}>{f.q}</span>
                <span style={{ color: '#38bdf8', fontSize: 18, transform: open === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>+</span>
              </button>
              {open === i && <p style={{ color: '#7a95b4', fontSize: 13, lineHeight: 1.7, padding: '0 20px 16px' }}>{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA ───────────────────────────────────────────────────────
function CTA() {
  return (
    <section style={{ background: '#050f20', padding: '96px 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', background: 'linear-gradient(160deg,rgba(29,78,216,0.15),rgba(56,189,248,0.08))', border: '1px solid rgba(56,189,248,0.25)', borderRadius: 24, padding: '64px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 0 80px rgba(56,189,248,0.1)' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 400, height: 120, background: 'radial-gradient(ellipse,rgba(56,189,248,0.25),transparent 70%)', pointerEvents: 'none' }} />
        <h2 style={{ fontSize: 40, fontWeight: 900, color: 'white', marginBottom: 16, position: 'relative' }}>Siap ubah bio jadi cuan?</h2>
        <p style={{ color: '#7a95b4', fontSize: 15, marginBottom: 36, position: 'relative' }}>Bergabung dengan 14.200+ creator Indonesia. Gratis selamanya.</p>
        <Link href="/register" style={{ display: 'inline-block', background: 'linear-gradient(135deg,#1d4ed8,#38bdf8)', color: 'white', padding: '16px 36px', borderRadius: 14, fontWeight: 800, fontSize: 16, textDecoration: 'none', boxShadow: '0 0 40px rgba(56,189,248,0.45)', position: 'relative' }}>
          ✦ Mulai Gratis Sekarang
        </Link>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: '#030810', borderTop: '1px solid rgba(56,189,248,0.1)', padding: '48px 24px' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg,#1d4ed8,#38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>☁</div>
          <span style={{ color: 'white', fontWeight: 800 }}>Weiiz<span style={{ color: '#38bdf8' }}>.ink</span></span>
        </Link>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Fitur','Harga','Kreator','FAQ','Privasi','Syarat'].map(l => (
            <a key={l} href="#" style={{ color: '#3d5a7a', fontSize: 13, textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#7a95b4')}
              onMouseLeave={e => (e.currentTarget.style.color = '#3d5a7a')}>
              {l}
            </a>
          ))}
        </div>
        <p style={{ color: '#3d5a7a', fontSize: 12 }}>© 2024 Weiiz.ink — Dibuat dengan ❤️ di Indonesia</p>
      </div>
    </footer>
  )
}

// ── Main Page ─────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <ToastProvider>
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#040d1a' }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          * { box-sizing: border-box; }
          @media (max-width: 768px) { .hide-mobile { display: none !important; } }
          @media (min-width: 769px) { .show-mobile { display: none !important; } }
          @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
        `}</style>
        <Navbar />
        <Hero />
        <Stats />
        <Features />
        <Pricing />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </ToastProvider>
  )
}
