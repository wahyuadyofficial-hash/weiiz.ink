'use client'

// components/landing/Pricing.tsx
import { useState } from 'react'
import Link from 'next/link'

interface Plan {
  name: string
  monthlyPrice: number
  yearlyPrice: number
  fee: string
  features: string[]
  highlight: boolean
  badge?: string
  cta: string
  color: string
}

const PLANS: Plan[] = [
  {
    name: 'FREE', monthlyPrice: 0, yearlyPrice: 0,
    fee: '5% per transaksi',
    features: ['5 link aktif', 'Produk digital (maks 2)', 'Analitik dasar', 'Subdomain weiiz.ink', 'Tema default'],
    highlight: false, cta: 'Daftar Gratis', color: '#6b7280',
  },
  {
    name: 'STARTER', monthlyPrice: 49000, yearlyPrice: 39000,
    fee: '3% per transaksi',
    features: ['25 link aktif', 'Produk digital (maks 10)', 'Analitik lengkap', 'Custom subdomain', '5 tema pilihan', 'Withdrawal 2x/bulan'],
    highlight: false, cta: 'Pilih Starter', color: '#3b82f6',
  },
  {
    name: 'PRO', monthlyPrice: 129000, yearlyPrice: 99000,
    fee: '1.5% per transaksi',
    features: ['Link unlimited', 'Produk unlimited', 'Analitik real-time', 'Custom domain', 'Semua tema + custom', 'Withdrawal kapan saja', 'AI Bio Writer', 'Affiliate system', 'Prioritas support'],
    highlight: true, badge: 'POPULER', cta: 'Mulai PRO', color: '#38bdf8',
  },
  {
    name: 'ELITE', monthlyPrice: 299000, yearlyPrice: 229000,
    fee: '0.5% per transaksi',
    features: ['Semua fitur PRO', 'Multi-user (tim)', 'White-label', 'API access', 'Dedicated support', 'SLA 99.99% uptime', 'Onboarding 1-on-1', 'Custom analytics'],
    highlight: false, cta: 'Pilih Elite', color: '#a855f7',
  },
]

function formatRp(n: number) {
  return n === 0 ? 'Gratis' : `Rp ${n.toLocaleString('id-ID')}`
}

export function Pricing() {
  const [yearly, setYearly] = useState(false)

  return (
    <section id="harga" className="py-24" style={{ background: 'linear-gradient(180deg, #050c18 0%, #070e1c 100%)' }}>
      <div className="max-w-6xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-4"
            style={{ background: 'rgba(59,130,246,0.07)' }}>
            Harga Transparan
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            Mulai gratis,<br />
            <span style={{
              background: 'linear-gradient(135deg, #60a5fa, #38bdf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>scale sesuai kebutuhan</span>
          </h2>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-xl border border-white/10 mt-2"
            style={{ background: 'rgba(255,255,255,0.03)' }}>
            <button onClick={() => setYearly(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${!yearly ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}>
              Bulanan
            </button>
            <button onClick={() => setYearly(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${yearly ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}>
              Tahunan
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-500/20 text-green-400">-25%</span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {PLANS.map((plan) => (
            <div key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-200
                ${plan.highlight
                  ? 'border-blue-500/50 scale-[1.02]'
                  : 'border-white/10 hover:border-white/20'
                }`}
              style={{
                background: plan.highlight
                  ? 'linear-gradient(160deg, rgba(59,130,246,0.12), rgba(14,165,233,0.06))'
                  : 'rgba(255,255,255,0.02)',
                boxShadow: plan.highlight ? '0 0 40px rgba(59,130,246,0.2)' : undefined,
              }}>

              {/* Popular badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #1d4ed8, #0ea5e9)' }}>
                  {plan.badge}
                </div>
              )}

              {/* Plan name */}
              <div className="mb-5">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md mb-3 inline-block"
                  style={{ background: `${plan.color}18`, color: plan.color, border: `1px solid ${plan.color}30` }}>
                  {plan.name}
                </span>
                <div className="flex items-end gap-1 mt-2">
                  <span className="text-3xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {formatRp(yearly ? plan.yearlyPrice : plan.monthlyPrice)}
                  </span>
                  {(yearly ? plan.yearlyPrice : plan.monthlyPrice) > 0 && (
                    <span className="text-gray-500 text-sm mb-1">/bln</span>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-1">{plan.fee}</p>
              </div>

              {/* Features */}
              <ul className="space-y-2 flex-1 mb-6">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                    <span className="mt-0.5 flex-shrink-0" style={{ color: plan.color }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href="/register"
                className={`w-full text-center py-3 rounded-xl text-sm font-bold transition-all duration-150 hover:-translate-y-0.5
                  ${plan.highlight
                    ? 'text-white'
                    : 'text-gray-300 border border-white/15 hover:border-white/30 hover:text-white'
                  }`}
                style={plan.highlight ? {
                  background: 'linear-gradient(135deg, #1d4ed8, #0ea5e9)',
                  boxShadow: '0 0 24px rgba(59,130,246,0.4)',
                } : undefined}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
