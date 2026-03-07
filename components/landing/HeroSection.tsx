import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-gradient-to-r from-violet-600/20 via-purple-500/15 to-pink-500/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white/70 text-xs font-medium tracking-wide uppercase">Digunakan 5.000+ Creator Indonesia</span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.95] tracking-tight">
          Where Bio<br />
          <span className="bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899] bg-clip-text text-transparent">
            Becomes Benefit
          </span>
        </h1>
        <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Buat link bio, terima donasi, jual produk digital, dan kelola membership
          {" "}&mdash; semuanya dalam <span className="text-white/80 font-medium">satu platform</span>.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/register" className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white font-bold px-8 py-4 rounded-2xl text-base hover:opacity-95 transition-all shadow-2xl shadow-purple-500/30 hover:-translate-y-0.5">
            Mulai Gratis &mdash; Tanpa Kartu Kredit
          </Link>
          <Link href="#demo" className="flex items-center gap-2 text-white/60 hover:text-white font-medium px-6 py-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all text-sm">
            <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs">&#9654;</span>
            Lihat Demo
          </Link>
        </div>
        {/* Mockup */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-purple-600/20 rounded-3xl blur-xl" />
          <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-1 shadow-2xl">
            <div className="bg-white/5 rounded-2xl px-4 py-3 flex items-center gap-3 mb-1">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 bg-white/5 rounded-lg px-3 py-1.5 text-white/30 text-xs">weiiz.ink/namakami</div>
            </div>
            <div className="bg-gradient-to-b from-[#13131A] to-[#0d0d12] rounded-2xl p-8 flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-purple-500/30">K</div>
              <div className="text-center">
                <div className="text-white font-bold text-lg">Kirana &#10024;</div>
                <div className="text-white/40 text-sm">Content Creator &amp; Digital Seller</div>
              </div>
              <div className="w-full max-w-xs flex flex-col gap-2">
                {[
                  { label: "Template Canva Viral", emoji: "&#128717;", style: "from-violet-600/30 to-purple-600/30 border-violet-500/30" },
                  { label: "Newsletter Mingguan", emoji: "&#128140;", style: "from-pink-600/20 to-rose-600/20 border-pink-500/20" },
                  { label: "Dukung Konten Saya", emoji: "&#9749;", style: "from-amber-600/20 to-orange-600/20 border-amber-500/20" },
                  { label: "E-Book Instagram Growth", emoji: "&#128230;", style: "from-blue-600/20 to-cyan-600/20 border-blue-500/20" },
                ].map((item) => (
                  <div key={item.label} className={`bg-gradient-to-r ${item.style} border rounded-xl px-4 py-3 text-white/80 text-sm font-medium text-center`}>
                    <span dangerouslySetInnerHTML={{ __html: item.emoji }} /> {item.label}
                  </div>
                ))}
              </div>
              <div className="flex gap-6 mt-2">
                {[{ val: "2.4K", label: "Pengunjung" }, { val: "Rp1.2jt", label: "Pendapatan" }, { val: "87%", label: "Konversi" }].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-white font-bold">{s.val}</div>
                    <div className="text-white/30 text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}