// components/landing/Features.tsx  (Server Component)

interface Feature {
  icon: string
  title: string
  desc: string
  badge: string
  badgeColor: string
}

const FEATURES: Feature[] = [
  { icon: '🔗', title: 'Bio Link Unlimited',         desc: 'Tambahkan link sebanyak apapun, susun dengan drag & drop, aktifkan/nonaktifkan kapan saja.',              badge: 'GRATIS',     badgeColor: '#22c55e' },
  { icon: '📦', title: 'Jual Produk Digital',         desc: 'Upload e-book, preset, template, kelas online. Pembayaran otomatis masuk ke saldo kamu.',                 badge: 'POPULER',    badgeColor: '#3b82f6' },
  { icon: '💳', title: 'Multi Payment Gateway',       desc: 'Terima bayar via GoPay, OVO, QRIS, transfer bank BCA/Mandiri/BNI — semua dalam satu dashboard.',         badge: 'LENGKAP',    badgeColor: '#8b5cf6' },
  { icon: '📊', title: 'Analytics Real-time',         desc: 'Pantau klik, konversi, revenue per link dan produk. Data akurat, update setiap menit.',                   badge: 'PRO',        badgeColor: '#06b6d4' },
  { icon: '🤖', title: 'AI Bio Writer',               desc: 'Tulis bio yang menarik, caption produk yang convert, dan judul link yang klik-worthy — powered by AI.',   badge: 'AI',         badgeColor: '#f59e0b' },
  { icon: '🏦', title: 'Withdrawal Instan',           desc: 'Tarik saldo ke rekening bank kapan saja. Proses 1x24 jam, tanpa biaya admin.',                            badge: 'CEPAT',      badgeColor: '#10b981' },
  { icon: '🤝', title: 'Affiliate System',            desc: 'Buat link affiliate untuk produk kamu. Tracking komisi otomatis, payout ke rekening mitra.',              badge: 'ELITE',      badgeColor: '#a855f7' },
  { icon: '🎨', title: 'Custom Tema',                 desc: 'Pilih dari 20+ tema atau buat sendiri. Ganti warna, font, background, dan layout sesuai branding kamu.',  badge: 'STARTER',    badgeColor: '#f97316' },
  { icon: '🔒', title: 'Keamanan Enterprise',         desc: 'SSL gratis, 2FA, rate limiting, enkripsi data. Platform kamu aman 24/7 dengan monitoring aktif.',         badge: 'SEMUA',      badgeColor: '#64748b' },
]

export function Features() {
  return (
    <section id="fitur" className="py-24" style={{ background: '#050c18' }}>
      <div className="max-w-6xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-4"
            style={{ background: 'rgba(59,130,246,0.07)' }}>
            Fitur Lengkap
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            Semua yang kamu butuhkan<br />
            <span style={{
              background: 'linear-gradient(135deg, #60a5fa, #38bdf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>ada di sini</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Dari bio link sederhana sampai toko digital lengkap. Satu platform, semua kebutuhan creator Indonesia.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <div key={i}
              className="group relative p-5 rounded-2xl border border-white/8 hover:border-white/15 transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: 'rgba(255,255,255,0.02)' }}>
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(59,130,246,0.06), transparent 60%)' }} />

              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: 'rgba(255,255,255,0.05)' }}>
                    {f.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                    style={{
                      background: `${f.badgeColor}18`,
                      color: f.badgeColor,
                      border: `1px solid ${f.badgeColor}30`,
                    }}>
                    {f.badge}
                  </span>
                </div>
                <h3 className="text-white font-bold text-sm mb-1.5">{f.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
