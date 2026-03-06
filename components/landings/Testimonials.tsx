// components/landing/Testimonials.tsx  (Server Component)

const TESTIMONIALS = [
  {
    name: 'Rina Melati',
    role: 'Digital Creator & Template Designer',
    plan: 'ELITE',
    planColor: '#a855f7',
    avatarColor: '#e11d48',
    revenue: 'Rp 12,4jt/bln',
    quote: 'Dulu saya pakai 4 platform berbeda — sekarang semua dari Weiiz. Penghasilan naik 3x dalam 2 bulan karena conversion rate produk digital saya jauh lebih tinggi.',
  },
  {
    name: 'Dimas Putra',
    role: 'Fitness Coach & Content Creator',
    plan: 'PRO',
    planColor: '#38bdf8',
    avatarColor: '#7c3aed',
    revenue: 'Rp 9,8jt/bln',
    quote: 'Fitur analitik-nya gila sih. Saya bisa tau link mana yang paling banyak klik, jam berapa follower paling aktif. Sales program saya naik 40% dalam sebulan.',
  },
  {
    name: 'Sari Dewi',
    role: 'Food Blogger & Recipe Creator',
    plan: 'PRO',
    planColor: '#38bdf8',
    avatarColor: '#059669',
    revenue: 'Rp 7,2jt/bln',
    quote: 'Setup-nya 15 menit, langsung jalan. Tidak perlu coding sama sekali. Bio page saya terlihat profesional dan sudah menghasilkan 200+ transaksi bulan ini.',
  },
  {
    name: 'Budi Santoso',
    role: 'Fotografi & Preset Creator',
    plan: 'STARTER',
    planColor: '#3b82f6',
    avatarColor: '#d97706',
    revenue: 'Rp 4,7jt/bln',
    quote: 'Mulai dari FREE dulu, upgrade ke Starter setelah 2 minggu karena fee transaksinya jauh lebih hemat. ROI dalam seminggu pertama sudah balik modal.',
  },
]

const PLAN_STYLE: Record<string, string> = {
  ELITE:   'bg-purple-500/15 text-purple-400 border-purple-500/20',
  PRO:     'bg-blue-500/15 text-blue-300 border-blue-500/20',
  STARTER: 'bg-blue-900/40 text-blue-400 border-blue-800/40',
}

export function Testimonials() {
  return (
    <section id="kreator" className="py-24" style={{ background: '#050c18' }}>
      <div className="max-w-6xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-4"
            style={{ background: 'rgba(59,130,246,0.07)' }}>
            Kreator Berbicara
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            Mereka sudah buktikan,<br />
            <span style={{
              background: 'linear-gradient(135deg, #60a5fa, #38bdf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>sekarang giliran kamu</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <div key={i}
              className="p-6 rounded-2xl border border-white/8 hover:border-white/15 transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.02)' }}>

              {/* Quote mark */}
              <div className="text-4xl text-blue-500/20 font-black leading-none mb-3" style={{ fontFamily: 'Georgia, serif' }}>"</div>

              <p className="text-gray-300 text-sm leading-relaxed mb-5">"{t.quote}"</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: t.avatarColor }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${PLAN_STYLE[t.plan]}`}>
                    {t.plan}
                  </span>
                  <span className="text-green-400 text-xs font-semibold">{t.revenue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
