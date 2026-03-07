const features = [
  {
    icon: "🔗",
    title: "Link in Bio",
    desc: "Satu link untuk semua kontenmu. Tampil profesional di bio Instagram, TikTok, dan YouTube.",
    gradient: "from-violet-600/20 to-purple-600/20",
    border: "hover:border-violet-500/40",
    glow: "group-hover:shadow-violet-500/20",
  },
  {
    icon: "🛍️",
    title: "Digital Product Store",
    desc: "Jual e-book, template, preset, kursus, dan produk digital lainnya langsung dari halamanmu.",
    gradient: "from-pink-600/20 to-rose-600/20",
    border: "hover:border-pink-500/40",
    glow: "group-hover:shadow-pink-500/20",
  },
  {
    icon: "☕",
    title: "Creator Donations",
    desc: "Terima dukungan dari fans dengan sistem donasi yang simpel dan terintegrasi langsung.",
    gradient: "from-amber-600/20 to-orange-600/20",
    border: "hover:border-amber-500/40",
    glow: "group-hover:shadow-amber-500/20",
  },
  {
    icon: "👑",
    title: "Membership",
    desc: "Buat komunitas eksklusif berbayar. Kelola subscriber dan konten premium dalam satu tempat.",
    gradient: "from-emerald-600/20 to-teal-600/20",
    border: "hover:border-emerald-500/40",
    glow: "group-hover:shadow-emerald-500/20",
  },
  {
    icon: "🤝",
    title: "Affiliate System",
    desc: "Buat program afiliasi sendiri. Ajak orang lain promosikan produkmu dan bagi komisi otomatis.",
    gradient: "from-blue-600/20 to-cyan-600/20",
    border: "hover:border-blue-500/40",
    glow: "group-hover:shadow-blue-500/20",
  },
  {
    icon: "📧",
    title: "Email List Builder",
    desc: "Kumpulkan email pengunjung dan bangun audiens jangka panjang yang kamu miliki sepenuhnya.",
    gradient: "from-indigo-600/20 to-violet-600/20",
    border: "hover:border-indigo-500/40",
    glow: "group-hover:shadow-indigo-500/20",
  },
];

export default function FeaturesSection() {
  return (
    <section id="fitur" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Semua yang Kamu Butuhkan
          </span>
          <h2
            className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Satu platform,{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              semua fitur monetisasi
            </span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Tidak perlu 5 aplikasi berbeda. Weiiz menggabungkan semua alat
            monetisasi terbaik dalam satu platform.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className={`group relative bg-white/[0.03] border border-white/[0.07] ${f.border} rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${f.glow} cursor-default`}
            >
              {/* gradient overlay on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${f.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="relative z-10">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
