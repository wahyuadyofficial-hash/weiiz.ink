const steps = [
  { icon: "âœï¸", title: "Buat Halaman Bio", desc: "Daftar gratis dalam 30 detik. Pilih username, upload foto, dan halaman bio profesionalmu langsung jadi.", color: "from-violet-500 to-purple-600" },
  { icon: "ðŸ“¦", title: "Tambahkan Produk atau Donasi", desc: "Upload produk digitalmu, aktifkan tombol donasi, atau buat halaman membership eksklusif.", color: "from-purple-500 to-pink-600" },
  { icon: "ðŸ’¸", title: "Mulai Menghasilkan Uang", desc: "Share link bio ke semua platform. Fans klik, bayar, dan uang langsung masuk ke rekeningmu.", color: "from-pink-500 to-rose-500" },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Semudah 1-2-3
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Mulai dalam{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              3 langkah
            </span>
          </h2>
          <p className="text-white/40 text-lg max-w-lg mx-auto">
            Tidak perlu skill teknis. Tidak perlu coding. Langsung aktif hari ini.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="relative mb-6">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl shadow-2xl transition-transform duration-300 group-hover:scale-110`}>
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0A0A0F] border border-white/20 flex items-center justify-center text-white/50 text-xs font-bold">
                  {i + 1}
                </div>
              </div>
              <h3 className="text-white font-bold text-xl mb-3">{step.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <a href="/register" className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold px-8 py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-xl shadow-purple-500/25">
            Coba Sekarang â€” Gratis â†’
          </a>
        </div>
      </div>
    </section>
  );
}
