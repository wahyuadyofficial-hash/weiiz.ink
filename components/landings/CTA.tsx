// components/landing/CTA.tsx  (Server Component)
import Link from 'next/link'

export function CTA() {
  return (
    <section className="py-24 px-5" style={{ background: '#050c18' }}>
      <div className="max-w-3xl mx-auto">
        <div className="relative rounded-3xl border border-blue-500/25 overflow-hidden p-10 md:p-16 text-center"
          style={{
            background: 'linear-gradient(160deg, rgba(29,78,216,0.15) 0%, rgba(14,165,233,0.08) 100%)',
            boxShadow: '0 0 80px rgba(59,130,246,0.15), inset 0 0 80px rgba(59,130,246,0.04)',
          }}>

          {/* Glow orb */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.3), transparent 70%)' }} />

          {/* Grid lines */}
          <div className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59,130,246,0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59,130,246,0.15) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }} />

          <div className="relative">
            <p className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-4">Mulai Sekarang</p>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-5 leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              Siap ubah bio<br />jadi cuan?
            </h2>
            <p className="text-gray-400 mb-10 max-w-lg mx-auto">
              Bergabung dengan 14.200+ creator Indonesia yang sudah monetisasi konten mereka. Gratis selamanya, upgrade kapan saja.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-base transition-all duration-200 hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(135deg, #1d4ed8, #0ea5e9)',
                  boxShadow: '0 0 40px rgba(59,130,246,0.5), 0 4px 20px rgba(0,0,0,0.3)',
                }}>
                ✦ Mulai Gratis Sekarang
              </Link>
              <p className="text-gray-600 text-xs">Tidak perlu kartu kredit</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


// components/landing/Footer.tsx  (Server Component)
import { Logo } from './Logo'

const FOOTER_LINKS = {
  Produk:   ['Fitur', 'Harga', 'Changelog', 'Roadmap'],
  Kreator:  ['Stories', 'Affiliate', 'Blog', 'Komunitas'],
  Bantuan:  ['Dokumentasi', 'FAQ', 'Status', 'Kontak'],
  Legal:    ['Privasi', 'Syarat', 'Keamanan', 'Cookie'],
}

export function Footer() {
  return (
    <footer className="border-t border-white/8 py-16 px-5" style={{ background: '#040a15' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Logo size="md" />
            <p className="text-gray-600 text-xs mt-3 leading-relaxed max-w-[180px]">
              Platform bio link #1 untuk creator Indonesia.
            </p>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <p className="text-white text-xs font-semibold mb-4 uppercase tracking-wider">{category}</p>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-gray-600 hover:text-gray-300 text-xs transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/8 gap-3">
          <p className="text-gray-700 text-xs">© 2024 Weiiz.ink. Dibuat dengan ❤️ di Indonesia.</p>
          <div className="flex items-center gap-4">
            {['Twitter', 'Instagram', 'TikTok'].map(s => (
              <a key={s} href="#" className="text-gray-700 hover:text-gray-400 text-xs transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
