// components/ui/Card.tsx
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  glow?: boolean
  onClick?: () => void
}

export function Card({ children, className = '', glow = false, onClick }: CardProps) {
  const isClickable = !!onClick

  return (
    <div
      onClick={onClick}
      className={`
        bg-[#111318] rounded-2xl border
        transition-all duration-200
        ${glow
          ? 'border-blue-500/30 shadow-[0_0_24px_rgba(59,130,246,0.12)]'
          : 'border-white/10'
        }
        ${isClickable
          ? 'cursor-pointer hover:-translate-y-0.5 hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]'
          : ''
        }
        ${className}
      `}
    >
      {children}
    </div>
  )
}
