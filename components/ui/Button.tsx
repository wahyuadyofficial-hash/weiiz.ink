// components/ui/Button.tsx
import { ReactNode } from 'react'

interface ButtonProps {
  variant?: 'primary' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
}

const Spinner = () => (
  <svg className="animate-spin w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
)

const VARIANTS = {
  primary: `
    bg-gradient-to-r from-blue-600 to-blue-500 text-white border border-blue-500/50
    shadow-[0_0_16px_rgba(59,130,246,0.35)]
    hover:shadow-[0_0_24px_rgba(59,130,246,0.5)] hover:from-blue-500 hover:to-blue-400
  `,
  ghost: `
    bg-transparent text-blue-400 border border-blue-500/40
    hover:bg-blue-500/10 hover:border-blue-400/60
  `,
  danger: `
    bg-red-500/10 text-red-400 border border-red-500/30
    hover:bg-red-500/20 hover:border-red-500/50
  `,
  success: `
    bg-green-500/10 text-green-400 border border-green-500/30
    hover:bg-green-500/20 hover:border-green-500/50
  `,
}

const SIZES = {
  sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
  md: 'text-sm px-4 py-2.5 rounded-xl gap-2',
  lg: 'text-base px-6 py-3 rounded-xl gap-2.5',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center font-medium
        transition-all duration-150
        hover:-translate-y-0.5 active:translate-y-0
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
        ${VARIANTS[variant]}
        ${SIZES[size]}
        ${className}
      `}
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
}
