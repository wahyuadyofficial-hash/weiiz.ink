export default function SocialProofSection() {
  const stats = [
    { icon: "ðŸ‘¥", value: "5.000+", label: "Creator Aktif", sub: "TikTok, IG, YouTube" },
    { icon: "ðŸ’°", value: "Rp2 Miliar", label: "Produk Terjual", sub: "Sejak 2023" },
    { icon: "âš¡", value: "50.000+", label: "Transaksi", sub: "Rata-rata tiap bulan" },
    { icon: "â­", value: "4.9/5", label: "Rating Kepuasan", sub: "Dari 1.200+ ulasan" },
  ];
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-white/30 text-sm font-medium tracking-widest uppercase mb-12">
          Dipercaya oleh ribuan creator Indonesia
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-purple-500/30 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-white/70 font-semibold text-sm mb-1">{stat.label}</div>
              <div className="text-white/30 text-xs">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
