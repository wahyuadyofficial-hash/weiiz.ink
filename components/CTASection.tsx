import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/90 via-purple-700/90 to-pink-700/90" />
          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
              backgroundRepeat: "repeat",
              backgroundSize: "128px",
              mixBlendMode: "overlay",
            }}
          />
          {/* Radial light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/10 blur-[80px] rounded-full" />

          {/* Content */}
          <div className="relative z-10 px-8 md:px-16 py-16 md:py-20 text-center">
            {/* Emoji burst */}
            <div className="text-4xl mb-6 flex items-center justify-center gap-2">
              🚀✨💰
            </div>

            <h2
              className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Mulai Monetisasi
              <br />
              Audiens Kamu Hari Ini
            </h2>

            <p className="text-white/70 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
              Bergabung dengan 5.000+ creator Indonesia yang sudah menghasilkan
              dari konten mereka. Daftar gratis, tidak perlu kartu kredit.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="group bg-white text-purple-700 font-black px-8 py-4 rounded-2xl text-base hover:bg-white/95 transition-all duration-200 shadow-2xl hover:shadow-white/20 hover:-translate-y-0.5"
              >
                Daftar Gratis — Mulai Sekarang
                <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </Link>
              <Link
                href="#harga"
                className="text-white/70 hover:text-white font-semibold px-6 py-4 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-200 text-sm"
              >
                Lihat Paket Harga
              </Link>
            </div>

            {/* Micro trust signals */}
            <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
              {[
                "✅ Tanpa kartu kredit",
                "✅ Bisa cancel kapan saja",
                "✅ Setup 2 menit",
                "✅ Support Bahasa Indonesia",
              ].map((item) => (
                <span key={item} className="text-white/50 text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
