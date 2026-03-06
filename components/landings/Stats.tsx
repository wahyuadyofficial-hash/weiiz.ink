'use client'

// components/landing/Stats.tsx
import { useEffect, useRef, useState } from 'react'

interface StatItem {
  prefix?: string
  value: number
  suffix: string
  label: string
  decimals?: number
}

const STATS: StatItem[] = [
  { prefix: 'Rp ', value: 8.4, suffix: 'M+',  label: 'Total GMV Creator',      decimals: 1 },
  { value: 14200,  suffix: '+',                label: 'Creator Aktif',           decimals: 0 },
  { value: 124,    suffix: 'K+',               label: 'Total Transaksi',         decimals: 0 },
  { value: 99.98,  suffix: '%',                label: 'Uptime Platform',         decimals: 2 },
]

function useCountUp(target: number, decimals: number, active: boolean) {
  const [count, setCount] = useState(0)
  const raf = useRef<number>()

  useEffect(() => {
    if (!active) return
    const start = performance.now()
    const duration = 1800
    const animate = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 4)
      setCount(parseFloat((ease * target).toFixed(decimals)))
      if (p < 1) raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)
    return () => { if (raf.current) cancelAnimationFrame(raf.current) }
  }, [active, target, decimals])

  return count
}

function StatCard({ stat, active }: { stat: StatItem; active: boolean }) {
  const count = useCountUp(stat.value, stat.decimals ?? 0, active)

  return (
    <div className="text-center px-4 py-6">
      <p className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2"
        style={{ fontFamily: "'Syne', sans-serif" }}>
        {stat.prefix ?? ''}{stat.decimals ? count.toFixed(stat.decimals) : Math.round(count).toLocaleString('id-ID')}{stat.suffix}
      </p>
      <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
    </div>
  )
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-16 border-y border-white/8"
      style={{ background: 'linear-gradient(180deg, #050c18 0%, #080f20 100%)' }}>
      <div className="max-w-5xl mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/8 border border-white/8 rounded-2xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.02)' }}>
          {STATS.map((stat, i) => (
            <StatCard key={i} stat={stat} active={active} />
          ))}
        </div>
      </div>
    </section>
  )
}
