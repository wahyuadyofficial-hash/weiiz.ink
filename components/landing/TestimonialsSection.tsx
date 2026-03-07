const testimonials = [
  { name: "Kirana Putri", platform: "Instagram Â· 120K Followers", avatar: "KP", grad: "from-violet-500 to-pink-500", quote: "Sejak pakai Weiiz, saya bisa jual template Canva langsung dari bio Instagram. Bulan pertama saja sudah balik modal langganan berkali-kali lipat!", earnings: "Rp3.2jt", earningLabel: "bulan pertama" },
  { name: "Rizky Aditya", platform: "TikTok Â· 380K Followers", avatar: "RA", grad: "from-cyan-500 to-blue-600", quote: "Weiiz yang paling smooth buat konten kreator Indonesia. Payment via QRIS dan transfer lokal, withdrawal cepat, dan dashboard-nya bersih banget.", earnings: "Rp7.8jt", earningLabel: "pendapatan bulanan" },
  { name: "Siti Nuraini", platform: "YouTube Â· 55K Subscriber", avatar: "SN", grad: "from-emerald-500 to-teal-600", quote: "Fitur membership-nya game-changer buat saya. Subscriber bisa akses konten eksklusif, dan saya punya pendapatan yang lebih stabil setiap bulannya.", earnings: "Rp5.5jt", earningLabel: "recurring bulanan" },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Cerita Nyata
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Creator yang{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">sudah berhasil</span>
          </h2>
          <p className="text-white/40 text-lg">Bukan janji. Ini hasil nyata dari creator Indonesia.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.07] hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col">
              <div className="text-5xl text-white/10 font-serif leading-none mb-4">"</div>
              <p className="text-white/60 text-sm leading-relaxed flex-1 mb-6">{t.quote}</p>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2.5 mb-5 flex items-center justify-between">
                <span className="text-white/40 text-xs">Pendapatan</span>
                <div className="text-right">
                  <div className="text-emerald-400 font-black text-lg leading-none">{t.earnings}</div>
                  <div className="text-white/30 text-xs">{t.earningLabel}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.grad} flex items-center justify-center text-white font-bold text-sm`}>{t.avatar}</div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-white/30 text-xs">{t.platform}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex items-center justify-center gap-6 flex-wrap">
          <div className="flex items-center gap-1 text-amber-400">â­â­â­â­â­</div>
          <span className="text-white font-bold text-lg">4.9 / 5</span>
          <span className="text-white/40 text-sm">dari 1.200+ ulasan creator</span>
        </div>
      </div>
    </section>
  );
}
