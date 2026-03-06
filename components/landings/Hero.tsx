'use client'

// components/landing/Hero.tsx
import Link from 'next/link'

// Mock bio preview card
function BiocardPreview() {
  return (
    <div className="relative mx-auto mt-16 max-w-[280px]"
      style={{ animation: 'floatUp 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.7s both' }}>
      {/* Glow behind card */}
      <div className="absolute inset-0 rounded-3xl blur-2xl opacity-40"
        style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)', transform: 'scale(1.3)' }} />

      <div className="relative rounded-2xl border border-blue-500/20 overflow-hidden"
        style={{ background: 'rgba(15,22,36,0.95)', backdropFilter: 'blur(20px)', boxShadow: '0 32px 64px rgba(0,0,0,0.5)' }}>
        {/* Profile */}
        <div className="flex flex-col items-center pt-6 pb-4 px-5">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3 ring-2 ring-blue-500/50"
            style={{ background: 'linear-gradient(135deg, #1d4ed8, #0ea5e9)' }}>
            R
          </div>
          <p className="text-white font-semibold text-sm">Rina Melati</p>
          <p className="text-gray-500 text-xs mt-0.5">@rinamelati</p>
          <p className="text-gray-400 text-xs mt-1.5 text-center">Digital creator 🚀 Jual template & preset</p>
        </div>

        {/* Links */}
        <div className="px-4 pb-4 space-y-2">
          {[
            { icon: '📦', label: 'Template Canva Pack',   sub: 'Rp 49.000', color: '#38bdf8' },
            { icon: '💬', label: 'Order via WhatsApp',    sub: null,        color: '#34d399' },
            { icon: '📊', label: 'E-book Marketing 2024', sub: 'Rp 99.000', color: '#a78bfa' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-white/8 hover:border-white/15 transition"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                style={{ background: `${item.color}18` }}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium truncate">{item.label}</p>
                {item.sub && <p className="text-xs" style={{ color: item.color }}>{item.sub}</p>}
              </div>
              <span className="text-gray-600 text-xs">→</span>
            </div>
          ))}
        </div>

        {/* Footer watermark */}
        <div className="text-center pb-3">
          <span className="text-[10px] text-gray-700">weiiz.ink/rinamelati</span>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 overflow-hidden"
      style={{ background: '#050c18' }}>

      {/* Grid pattern */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }} />

      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.22) 0%, transparent 65%)' }} />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #050c18)' }} />

      <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">

        {/* Chip */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/25 mb-8 text-sm font-medium text-blue-300"
          style={{
            background: 'rgba(59,130,246,0.08)',
            animation: 'fadeUp 0.5s ease 0.05s both',
          }}>
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          Platform Bio #1 Indonesia
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] tracking-tight mb-6"
          style={{
            fontFamily: "'Syne', sans-serif",
            animation: 'fadeUp 0.5s ease 0.15s both',
          }}>
          <span className="text-white">Ubah Bio Jadi</span>
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #60a5fa 0%, #38bdf8 50%, #818cf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Mesin Penghasil Uang
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10"
          style={{ animation: 'fadeUp 0.5s ease 0.25s both' }}>
          Satu link. Banyak benefit. Jual produk digital, terima pembayaran, kelola affiliate, dan analitik lengkap — semua dari satu halaman bio.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
          style={{ animation: 'fadeUp 0.5s ease 0.35s both' }}>
          <Link href="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl text-white font-bold text-base transition-all duration-200 hover:-translate-y-1"
            style={{
              background: 'linear-gradient(135deg, #1d4ed8, #0ea5e9)',
              boxShadow: '0 0 32px rgba(59,130,246,0.45), 0 4px 16px rgba(0,0,0,0.3)',
            }}>
            ✦ Mulai Gratis
          </Link>
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl text-gray-300 hover:text-white font-semibold text-base border border-white/15 hover:border-white/30 transition-all duration-150 hover:bg-white/5">
            ▶ Lihat Demo
          </button>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-3"
          style={{ animation: 'fadeUp 0.5s ease 0.45s both' }}>
          {/* Avatar stack */}
          <div className="flex -space-x-2">
            {['#e11d48','#7c3aed','#0284c7','#059669','#d97706'].map((color, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050c18] flex items-center justify-center text-white text-xs font-bold"
                style={{ background: color, zIndex: 5 - i }}>
                {['R','D','S','A','B'][i]}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-400">
            <span className="text-white font-semibold">14.200+</span> creator sudah bergabung
          </p>
        </div>

        {/* Bio preview card */}
        <BiocardPreview />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px) }
          to   { opacity: 1; transform: translateY(0) }
        }
        @keyframes floatUp {
          from { opacity: 0; transform: translateY(30px) }
          to   { opacity: 1; transform: translateY(0) }
        }
      `}</style>
    </section>
  )
}
