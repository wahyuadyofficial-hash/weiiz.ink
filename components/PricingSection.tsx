"use client";
import { useState } from "react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "0",
    fee: "5%",
    feeLabel: "biaya transaksi",
    period: null,
    badge: null,
    badgeColor: null,
    features: [
      "5 link aktif",
      "2 produk digital",
      "Analitik dasar",
      "Subdomain weiiz.ink",
    ],
    cta: "Mulai Gratis",
    ctaStyle: "border border-white/15 text-white hover:bg-white/5",
    popular: false,
  },
  {
    name: "Creator",
    price: "39.000",
    fee: "3%",
    feeLabel: "biaya transaksi",
    period: "/ bulan",
    badge: "Hemat 40%",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    features: [
      "25 link aktif",
      "10 produk digital",
      "Analitik lengkap",
      "Custom subdomain",
      "Withdrawal 2x/bulan",
    ],
    cta: "Mulai Creator",
    ctaStyle: "border border-white/15 text-white hover:bg-white/5",
    popular: false,
  },
  {
    name: "Pro",
    price: "99.000",
    fee: "1.5%",
    feeLabel: "biaya transaksi",
    period: "/ bulan",
    badge: "PALING POPULER",
    badgeColor: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
    features: [
      "Unlimited link",
      "Unlimited produk digital",
      "Real-time analytics",
      "Custom domain sendiri",
      "AI bio generator ✨",
      "Withdrawal kapan saja",
    ],
    cta: "Mulai Pro",
    ctaStyle:
      "bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white shadow-lg shadow-purple-500/30 hover:opacity-90",
    popular: true,
  },
  {
    name: "Business",
    price: "249.000",
    fee: "0.5%",
    feeLabel: "biaya transaksi",
    period: "/ bulan",
    badge: null,
    badgeColor: null,
    features: [
      "Semua fitur Pro",
      "Multi user / tim",
      "White label branding",
      "API access",
      "Priority support 24/7",
    ],
    cta: "Hubungi Kami",
    ctaStyle: "border border-white/15 text-white hover:bg-white/5",
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section id="harga" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-4">
          <span className="inline-block bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Harga Transparan
          </span>
          <h2
            className="text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Murah, powerful,{" "}
            <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              tanpa biaya tersembunyi
            </span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto mb-2">
            Marketplace lain bisa ambil komisi hingga{" "}
            <span className="text-white/70 font-semibold line-through decoration-red-500">
              10–15%
            </span>{" "}
            dari penjualanmu.
          </p>
          <p className="text-emerald-400 font-semibold text-lg">
            Di Weiiz, mulai dari hanya 0.5% 🎉
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative flex flex-col rounded-3xl transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-b from-purple-600/20 to-pink-600/10 border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20 scale-105"
                  : "bg-white/[0.03] border border-white/[0.07] hover:border-white/20"
              } p-6`}
            >
              {/* Popular glow */}
              {plan.popular && (
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-purple-500/30 to-pink-500/10 pointer-events-none" />
              )}

              <div className="relative z-10">
                {/* Badge */}
                <div className="h-7 mb-4">
                  {plan.badge && (
                    <span
                      className={`text-xs font-bold tracking-wide px-3 py-1 rounded-full ${plan.badgeColor}`}
                    >
                      {plan.badge}
                    </span>
                  )}
                </div>

                {/* Plan name */}
                <div className="text-white/50 text-sm font-semibold uppercase tracking-wider mb-2">
                  {plan.name}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-white/40 text-lg">Rp</span>
                  <span
                    className={`font-black text-4xl ${
                      plan.popular ? "text-white" : "text-white"
                    }`}
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {plan.price}
                  </span>
                </div>
                {plan.period && (
                  <div className="text-white/30 text-sm mb-1">{plan.period}</div>
                )}

                {/* Fee highlight */}
                <div
                  className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full mb-5 ${
                    plan.popular
                      ? "bg-purple-500/20 text-purple-300"
                      : "bg-white/5 text-white/50"
                  }`}
                >
                  <span>{plan.fee}</span>
                  <span className="text-white/40 font-normal">
                    {plan.feeLabel}
                  </span>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/5 mb-5" />

                {/* Features */}
                <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span
                        className={`mt-0.5 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${
                          plan.popular
                            ? "bg-purple-500/30 text-purple-300"
                            : "bg-white/10 text-white/50"
                        }`}
                      >
                        ✓
                      </span>
                      <span className="text-white/60 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={plan.name === "Business" ? "/contact" : "/register"}
                  className={`block w-full text-center font-bold py-3 rounded-xl text-sm transition-all duration-200 ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Trust note */}
        <p className="text-center text-white/25 text-sm mt-8">
          Semua harga dalam IDR. Bisa batalkan kapan saja. Tanpa kontrak jangka panjang.
        </p>
      </div>
    </section>
  );
}
