import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-700 to-pink-700" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/10 blur-[80px] rounded-full" />
          <div className="relative z-10 px-8 md:px-16 py-16 md:py-20 text-center">
            <div className="text-4xl mb-6">&#128640;&#10024;&#128176;</div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
              Mulai Monetisasi<br />Audiens Kamu Hari Ini
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
              Bergabung dengan 5.000+ creator Indonesia yang sudah menghasilkan dari konten mereka. Daftar gratis, tidak perlu kartu kredit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="bg-white text-purple-700 font-black px-8 py-4 rounded-2xl text-base hover:bg-white/95 transition-all shadow-2xl hover:-translate-y-0.5">
                Daftar Gratis &mdash; Mulai Sekarang &#8594;
              </Link>
              <Link href="#harga" className="text-white/70 hover:text-white font-semibold px-6 py-4 rounded-2xl border border-white/20 hover:border-white/40 transition-all text-sm">
                Lihat Paket Harga
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
              {["Tanpa kartu kredit", "Bisa cancel kapan saja", "Setup 2 menit", "Support Bahasa Indonesia"].map((item) => (
                <span key={item} className="text-white/50 text-sm">&#10003; {item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}