# setup-weiiz-complete.ps1
# Jalankan: powershell -ExecutionPolicy Bypass -File setup-weiiz-complete.ps1

$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "Setting up Weiiz landing page..." -ForegroundColor Cyan

# Buat folder
New-Item -ItemType Directory -Force -Path "components\landing" | Out-Null
New-Item -ItemType Directory -Force -Path "app" | Out-Null

# ─── app/layout.tsx ──────────────────────────────────────────────────────────
[System.IO.File]::WriteAllText("app\layout.tsx", @'
import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-syne',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'Weiiz — Where Bio Becomes Benefit',
  description: 'Platform monetisasi bio link untuk creator Indonesia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${syne.variable} ${dmSans.variable}`}>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>{children}</body>
    </html>
  )
}
'@, [System.Text.Encoding]::UTF8)

# ─── app/page.tsx ─────────────────────────────────────────────────────────────
[System.IO.File]::WriteAllText("app\page.tsx", @'
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import SocialProofSection from "@/components/landing/SocialProofSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="bg-[#09090F] min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <SocialProofSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
'@, [System.Text.Encoding]::UTF8)

# ─── tailwind.config.ts ───────────────────────────────────────────────────────
[System.IO.File]::WriteAllText("tailwind.config.ts", @'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
'@, [System.Text.Encoding]::UTF8)

# ─── Navbar.tsx ───────────────────────────────────────────────────────────────
[System.IO.File]::WriteAllText("components\landing\Navbar.tsx", @'
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#09090F]/90 backdrop-blur-xl border-b border-white/5" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center shadow-lg shadow-purple-500/30">
            <span className="text-white font-black text-sm">W</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">Weiiz</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {[["Fitur", "#fitur"], ["Harga", "#harga"], ["Blog", "#"], ["Bantuan", "#"]].map(([label, href]) => (
            <Link key={label} href={href} className="text-white/50 hover:text-white text-sm font-medium transition-colors duration-200">{label}</Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden md:block text-white/60 hover:text-white text-sm font-medium transition-colors">Masuk</Link>
          <Link href="/register" className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/25">Mulai Gratis</Link>
        </div>
      </div>
    </nav>
  );
}
'@, [System.Text.Encoding]::UTF8)

# ─── HeroSection.tsx ──────────────────────────────────────────────────────────
[System.IO.File]::WriteAllText("components\landing\HeroSection.tsx", @'
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
'@, [System.Text.Encoding]::UTF8)

# ─── SocialProofSection.tsx ───────────────────────────────────────────────────
[System.IO.File]::WriteAllText("components\landing\SocialProofSection.tsx", @'
export default function SocialProofSection() {
  const stats = [
    { emoji: "&#128101;", value: "5.000+", label: "Creator Aktif", sub: "TikTok, IG, YouTube" },
    { emoji: "&#128176;", value: "Rp2 Miliar", label: "Produk Terjual", sub: "Sejak 2023" },
    { emoji: "&#9889;", value: "50.000+", label: "Transaksi", sub: "Rata-rata tiap bulan" },
    { emoji: "&#11088;", value: "4.9/5", label: "Rating Kepuasan", sub: "Dari 1.200+ ulasan" },
  ];
  return (
    <section className="relative py-16">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-white/30 text-xs font-semibold tracking-widest uppercase mb-12">Dipercaya oleh ribuan creator Indonesia</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-purple-500/30 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl mb-3" dangerouslySetInnerHTML={{ __html: s.emoji }} />
              <div className="text-3xl font-black text-white mb-1">{s.value}</div>
              <div className="text-white/70 font-semibold text-sm mb-1">{s.label}</div>
              <div className="text-white/30 text-xs">{s.sub}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex items-center justify-center gap-8 flex-wrap opacity-25">
          {["TikTok", "Instagram", "YouTube", "Shopee", "Tokopedia", "Midtrans"].map((b) => (
            <span key={b} className="text-white text-sm font-bold tracking-wide">{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
'@, [System.Text.Encoding]::UTF8)

# ─── FeaturesSection.tsx ──────────────────────────────────────────────────────
[System.IO.File]::WriteAllText("components\landing\FeaturesSection.tsx", @'
const features = [
  { emoji: "&#128279;", title: "Link in Bio", desc: "Satu link untuk semua kontenmu. Tampil profesional di bio Instagram, TikTok, dan YouTube." },
  { emoji: "&#128717;", title: "Digital Product Store", desc: "Jual e-book, template, preset, kursus, dan produk digital lainnya langsung dari halamanmu." },
  { emoji: "&#9749;", title: "Creator Donations", desc: "Terima dukungan dari fans dengan sistem donasi yang simpel dan terintegrasi langsung." },
  { emoji: "&#128081;", title: "Membership", desc: "Buat komunitas eksklusif berbayar. Kelola subscriber dan konten premium dalam satu tempat." },
  { emoji: "&#129309;", title: "Affiliate System", desc: "Buat program afiliasi sendiri. Ajak orang lain promosikan produkmu dan bagi komisi otomatis." },
  { emoji: "&#128231;", title: "Email List Builder", desc: "Kumpulkan email pengunjung dan bangun audiens jangka panjang yang kamu miliki sepenuhnya." },
];

export default function FeaturesSection() {
  return (
    <section id="fitur" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">Semua yang Kamu Butuhkan</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Satu platform, <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">semua fitur monetisasi</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">Tidak perlu 5 aplikasi berbeda. Weiiz menggabungkan semua alat terbaik dalam satu platform.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div key={i} className="group bg-white/[0.03] border border-white/[0.07] hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06]">
              <div className="text-4xl mb-4" dangerouslySetInnerHTML={{ __html: f.emoji }} />
              <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
'@, [System.Text.Encoding]::UTF8)

# ─── HowItWorksSection.tsx ────────────────────────────────────────────────────
[System.IO.File]::WriteAllText("components\landing\HowItWorksSection.tsx", @'
const steps = [
  { emoji: "&#9999;", title: "Buat Halaman Bio", desc: "Daftar gratis dalam 30 detik. Pilih username, upload foto, dan halaman bio profesionalmu langsung jadi.", color: "from-violet-500 to-purple-600", shadow: "rgba(124,58,237,0.4)" },
  { emoji: "&#128230;", title: "Tambahkan Produk atau Donasi", desc: "Upload produk digitalmu, aktifkan tombol donasi, atau buat halaman membership eksklusif.", color: "from-purple-500 to-pink-600", shadow: "rgba(168,85,247,0.4)" },
  { emoji: "&#128184;", title: "Mulai Menghasilkan Uang", desc: "Share link bio ke semua platform. Fans klik, bayar, dan uang langsung masuk ke rekeningmu.", color: "from-pink-500 to-rose-500", shadow: "rgba(236,72,153,0.4)" },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">Semudah 1-2-3</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Mulai dalam <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">3 langkah</span>
          </h2>
          <p className="text-white/40 text-lg max-w-lg mx-auto">Tidak perlu skill teknis. Tidak perlu coding. Langsung aktif hari ini.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="relative mb-6">
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110`}
                  style={{ boxShadow: `0 20px 60px -10px ${step.shadow}` }}
                  dangerouslySetInnerHTML={{ __html: step.emoji }}
                />
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#09090F] border border-white/20 flex items-center justify-center text-white/50 text-xs font-bold">{i + 1}</div>
              </div>
              <h3 className="text-white font-bold text-xl mb-3">{step.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <a href="/register" className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold px-8 py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-xl shadow-purple-500/25">
            Coba Sekarang &mdash; Gratis &#8594;
          </a>
        </div>
      </div>
    </section>
  );
}
'@, [System.Text.Encoding]::UTF8)

# ─── PricingSection.tsx ───────────────────────────────────────────────────────
[System.IO.File]::WriteAllText("components\landing\PricingSection.tsx", @'
import Link from "next/link";

const plans = [
  { name: "Free", price: "0", fee: "5%", period: null, badge: null, popular: false, features: ["5 link aktif", "2 produk digital", "Analitik dasar", "Subdomain weiiz.ink"], cta: "Mulai Gratis", href: "/register" },
  { name: "Creator", price: "39.000", fee: "3%", period: "/ bulan", badge: "Hemat 40%", badgeStyle: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30", popular: false, features: ["25 link aktif", "10 produk digital", "Analitik lengkap", "Custom subdomain", "Withdrawal 2x/bulan"], cta: "Mulai Creator", href: "/register" },
  { name: "Pro", price: "99.000", fee: "1.5%", period: "/ bulan", badge: "PALING POPULER", badgeStyle: "bg-purple-500/20 text-purple-300 border border-purple-500/30", popular: true, features: ["Unlimited link", "Unlimited produk digital", "Real-time analytics", "Custom domain sendiri", "AI bio generator", "Withdrawal kapan saja"], cta: "Mulai Pro", href: "/register" },
  { name: "Business", price: "249.000", fee: "0.5%", period: "/ bulan", badge: null, popular: false, features: ["Semua fitur Pro", "Multi user / tim", "White label branding", "API access", "Priority support 24/7"], cta: "Hubungi Kami", href: "/contact" },
];

export default function PricingSection() {
  return (
    <section id="harga" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-4">
          <span className="inline-block bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">Harga Transparan</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Murah, powerful, <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">tanpa biaya tersembunyi</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto mb-1">
            Marketplace lain bisa ambil komisi hingga <span className="text-white/60 font-semibold line-through decoration-red-500">10&ndash;15%</span> dari penjualanmu.
          </p>
          <p className="text-emerald-400 font-semibold text-lg">Di Weiiz, mulai dari hanya 0.5%!</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 items-start">
          {plans.map((plan, i) => (
            <div key={i} className={`relative flex flex-col rounded-3xl p-6 transition-all duration-300 ${
              plan.popular
                ? "bg-gradient-to-b from-purple-600/20 to-pink-600/10 border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20 scale-105"
                : "bg-white/[0.03] border border-white/[0.07] hover:border-white/20"
            }`}>
              <div className="h-7 mb-4">
                {plan.badge && <span className={`text-xs font-bold tracking-wide px-3 py-1 rounded-full ${plan.badgeStyle}`}>{plan.badge}</span>}
              </div>
              <div className="text-white/50 text-xs font-bold uppercase tracking-wider mb-2">{plan.name}</div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-white/40 text-lg">Rp</span>
                <span className="font-black text-4xl text-white">{plan.price}</span>
              </div>
              {plan.period && <div className="text-white/30 text-sm mb-1">{plan.period}</div>}
              <div className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full mb-5 w-fit ${plan.popular ? "bg-purple-500/20 text-purple-300" : "bg-white/5 text-white/50"}`}>
                {plan.fee} <span className="text-white/40 font-normal">biaya transaksi</span>
              </div>
              <div className="w-full h-px bg-white/5 mb-5" />
              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className={`mt-0.5 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${plan.popular ? "bg-purple-500/30 text-purple-300" : "bg-white/10 text-white/50"}`}>&#10003;</span>
                    <span className="text-white/60 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
              <Link href={plan.href} className={`block w-full text-center font-bold py-3 rounded-xl text-sm transition-all duration-200 ${
                plan.popular
                  ? "bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white shadow-lg shadow-purple-500/30 hover:opacity-90"
                  : "border border-white/15 text-white hover:bg-white/5"
              }`}>{plan.cta}</Link>
            </div>
          ))}
        </div>
        <p className="text-center text-white/25 text-sm mt-8">Semua harga dalam IDR. Bisa batalkan kapan saja. Tanpa kontrak jangka panjang.</p>
      </div>
    </section>
  );
}
'@, [System.Text.Encoding]::UTF8)

# ─── TestimonialsSection.tsx ──────────────────────────────────────────────────
[System.IO.File]::WriteAllText("components\landing\TestimonialsSection.tsx", @'
const testimonials = [
  { name: "Kirana Putri", platform: "Instagram &middot; 120K Followers", avatar: "KP", grad: "from-violet-500 to-pink-500", quote: "Sejak pakai Weiiz, saya bisa jual template Canva langsung dari bio Instagram. Bulan pertama saja sudah balik modal langganan berkali-kali lipat!", earnings: "Rp3.2jt", earningLabel: "bulan pertama" },
  { name: "Rizky Aditya", platform: "TikTok &middot; 380K Followers", avatar: "RA", grad: "from-cyan-500 to-blue-600", quote: "Weiiz yang paling smooth buat kreator Indonesia. Payment via QRIS dan transfer lokal, withdrawal cepat, dan dashboard-nya bersih banget.", earnings: "Rp7.8jt", earningLabel: "pendapatan bulanan" },
  { name: "Siti Nuraini", platform: "YouTube &middot; 55K Subscriber", avatar: "SN", grad: "from-emerald-500 to-teal-600", quote: "Fitur membership-nya game-changer buat saya. Subscriber bisa akses konten eksklusif, dan saya punya pendapatan yang lebih stabil setiap bulannya.", earnings: "Rp5.5jt", earningLabel: "recurring bulanan" },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">Cerita Nyata</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Creator yang <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">sudah berhasil</span>
          </h2>
          <p className="text-white/40 text-lg">Bukan janji. Ini hasil nyata dari creator Indonesia.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.07] hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col">
              <div className="text-5xl text-white/10 font-serif leading-none mb-4">&ldquo;</div>
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
                  <div className="text-white/30 text-xs" dangerouslySetInnerHTML={{ __html: t.platform }} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex items-center justify-center gap-4 flex-wrap">
          <div className="flex text-amber-400 text-xl">&#11088;&#11088;&#11088;&#11088;&#11088;</div>
          <span className="text-white font-bold text-lg">4.9 / 5</span>
          <span className="text-white/40 text-sm">dari 1.200+ ulasan creator</span>
        </div>
      </div>
    </section>
  );
}
'@, [System.Text.Encoding]::UTF8)

# ─── CTASection.tsx ───────────────────────────────────────────────────────────
[System.IO.File]::WriteAllText("components\landing\CTASection.tsx", @'
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
'@, [System.Text.Encoding]::UTF8)

# ─── Footer.tsx ───────────────────────────────────────────────────────────────
[System.IO.File]::WriteAllText("components\landing\Footer.tsx", @'
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
                  <li key={link}><Link href="#" className="text-white/30 hover:text-white/70 text-sm transition-colors">{link}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">&copy; 2024 Weiiz. Dibuat dengan &#10084;&#65039; untuk creator Indonesia.</p>
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
'@, [System.Text.Encoding]::UTF8)

Write-Host ""
Write-Host "Semua file berhasil dibuat!" -ForegroundColor Green
Write-Host ""
Write-Host "Jalankan sekarang:" -ForegroundColor Yellow
Write-Host "  git add ." -ForegroundColor White
Write-Host "  git commit -m `"fix: complete landing page with proper encoding`"" -ForegroundColor White
Write-Host "  git push origin main --force" -ForegroundColor White
