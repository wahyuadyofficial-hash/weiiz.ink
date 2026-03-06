// components/landing/Logo.tsx
import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  href?: string
}

export function Logo({ size = 'md', href = '/' }: LogoProps) {
  const sizes = { sm: 'text-lg', md: 'text-xl', lg: 'text-2xl' }
  const iconSizes = { sm: 20, md: 24, lg: 30 }
  const s = iconSizes[size]

  return (
    <Link href={href} className={`inline-flex items-center gap-2 font-bold ${sizes[size]} tracking-tight group`}>
      {/* Cloud + pen icon */}
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="url(#logoGrad)" />
        {/* Cloud */}
        <path d="M8 20a4 4 0 01-.5-7.97A6 6 0 0119 14a3.5 3.5 0 01-.5 6.97L8 20z"
          fill="white" fillOpacity="0.9" />
        {/* Pen */}
        <path d="M17 17l4-4 2 2-4 4-2.5.5.5-2.5z"
          fill="white" stroke="white" strokeWidth="0.5" strokeLinejoin="round" />
        <path d="M21 13l1.5-1.5a.7.7 0 011 1L22 14l-1-1z"
          fill="#60a5fa" />
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1d4ed8" />
            <stop offset="1" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-white">
        Weiiz<span className="text-blue-400">.ink</span>
      </span>
    </Link>
  )
}
