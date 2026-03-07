import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center">
                <span className="text-white font-black text-sm">W</span>
              </div>
              <span className="text-white font-bold text-xl">Weiiz</span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">Platform monetisasi terlengkap untuk creator Indonesia.</p>
          </div>
          {[
            { title: "Produk", links: ["Link in Bio", "Digital Store", "Donasi", "Membership", "Affiliate"] },
            { title: "Perusahaan", links: ["Tentang Kami", "Blog", "Karir", "Press Kit"] },
            { title: "Dukungan", links: ["Pusat Bantuan", "Hubungi Kami", "Status", "Kebijakan Privasi", "Syarat & Ketentuan"] },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-white/60 font-semibold text-sm mb-3">{col.title}</div>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-white/30 hover:text-white/70 text-sm transition-colors duration-200">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">Â© 2024 Weiiz. Dibuat dengan â¤ï¸ untuk creator Indonesia.</p>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-white/20 text-xs">Pembayaran via</span>
            {["Midtrans", "QRIS", "VA Bank", "GoPay", "OVO"].map((p) => (
              <span key={p} className="bg-white/5 border border-white/10 text-white/40 text-xs px-2 py-1 rounded-md">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
