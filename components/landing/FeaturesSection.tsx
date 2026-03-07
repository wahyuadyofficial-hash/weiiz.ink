const features = [
  { icon: "ðŸ”—", title: "Link in Bio", desc: "Satu link untuk semua kontenmu. Tampil profesional di bio Instagram, TikTok, dan YouTube." },
  { icon: "ðŸ›ï¸", title: "Digital Product Store", desc: "Jual e-book, template, preset, kursus, dan produk digital lainnya langsung dari halamanmu." },
  { icon: "â˜•", title: "Creator Donations", desc: "Terima dukungan dari fans dengan sistem donasi yang simpel dan terintegrasi langsung." },
  { icon: "ðŸ‘‘", title: "Membership", desc: "Buat komunitas eksklusif berbayar. Kelola subscriber dan konten premium dalam satu tempat." },
  { icon: "ðŸ¤", title: "Affiliate System", desc: "Buat program afiliasi sendiri. Ajak orang lain promosikan produkmu dan bagi komisi otomatis." },
  { icon: "ðŸ“§", title: "Email List Builder", desc: "Kumpulkan email pengunjung dan bangun audiens jangka panjang yang kamu miliki sepenuhnya." },
];

export default function FeaturesSection() {
  return (
    <section id="fitur" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Semua yang Kamu Butuhkan
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Satu platform,{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              semua fitur monetisasi
            </span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Tidak perlu 5 aplikasi berbeda. Weiiz menggabungkan semua alat monetisasi terbaik dalam satu platform.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div key={i} className="group relative bg-white/[0.03] border border-white/[0.07] hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-default">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
