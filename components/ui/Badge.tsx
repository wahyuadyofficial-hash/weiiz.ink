// components/ui/Badge.tsx
import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray'
  className?: string
}

const COLORS = {
  blue:   'bg-blue-500/15 text-blue-400 border-blue-500/20',
  green:  'bg-green-500/15 text-green-400 border-green-500/20',
  red:    'bg-red-500/15 text-red-400 border-red-500/20',
  yellow: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
  purple: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
  gray:   'bg-gray-700/50 text-gray-400 border-gray-600/30',
}

export function Badge({ children, color = 'blue', className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center
        text-[11px] font-semibold tracking-wide
        px-2 py-0.5 rounded-md border
        ${COLORS[color]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}
