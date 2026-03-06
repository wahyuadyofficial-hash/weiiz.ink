'use client'

// components/landing/FAQ.tsx
import { useState } from 'react'

const FAQS = [
  {
    q: 'Apakah Weiiz.ink benar-benar gratis?',
    a: 'Ya! Plan FREE tidak ada biaya bulanan. Kamu hanya bayar 5% fee per transaksi yang berhasil. Artinya kalau belum ada penjualan, tidak ada biaya apapun.',
  },
  {
    q: 'Apa bedanya Weiiz.ink dengan Linktree atau Lynk.id?',
    a: 'Weiiz.ink bukan hanya bio link — ini platform monetisasi. Selain link, kamu bisa jual produk digital, terima pembayaran langsung, kelola affiliate, dan lihat analitik mendalam. Pesaing lain hanya fokus di link.',
  },
  {
    q: 'Bagaimana cara withdrawal saldo ke rekening?',
    a: 'Di dashboard, buka menu Withdrawal, masukkan nomor rekening, dan ajukan penarikan. Saldo akan ditransfer dalam 1x24 jam kerja. Plan PRO dan ELITE bisa withdraw kapan saja, FREE dan Starter 2x per bulan.',
  },
  {
    q: 'Apakah bisa pakai domain sendiri?',
    a: 'Bisa! Plan PRO dan ELITE mendukung custom domain. Jadi bio kamu bisa diakses di "link.namakamu.com" atau domain apapun yang kamu miliki, bukan hanya weiiz.ink/username.',
  },
  {
    q: 'Produk digital apa saja yang bisa dijual?',
    a: 'E-book (PDF), template (Canva, Figma, PSD), preset (Lightroom, VSCO), video course, kelas online, software, plugin, music sample, dan file digital lainnya. Ukuran file hingga 500MB per produk.',
  },
  {
    q: 'Apakah data dan transaksi saya aman?',
    a: 'Sangat aman. Semua data dienkripsi dengan AES-256, HTTPS enforced, 2FA tersedia, dan server kami dimonitor 24/7. Untuk pembayaran, kami bekerja sama dengan payment gateway berlisensi Bank Indonesia.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24" style={{ background: '#050c18' }}>
      <div className="max-w-2xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-4"
            style={{ background: 'rgba(59,130,246,0.07)' }}>
            Pertanyaan Umum
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            Ada pertanyaan?
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div key={i}
              className={`rounded-2xl border transition-all duration-200
                ${open === i ? 'border-blue-500/30' : 'border-white/8 hover:border-white/15'}`}
              style={{ background: open === i ? 'rgba(59,130,246,0.05)' : 'rgba(255,255,255,0.02)' }}>

              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left gap-4">
                <span className={`text-sm font-semibold transition-colors ${open === i ? 'text-white' : 'text-gray-300'}`}>
                  {faq.q}
                </span>
                <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-200
                  ${open === i ? 'bg-blue-500 text-white rotate-45' : 'bg-white/8 text-gray-400'}`}>
                  +
                </span>
              </button>

              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: open === i ? '300px' : '0px' }}>
                <p className="px-5 pb-5 text-sm text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
