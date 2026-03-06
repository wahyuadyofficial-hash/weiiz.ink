// components/ui/Input.tsx
import { ReactNode } from 'react'

interface InputProps {
  label?: string
  placeholder?: string
  type?: string
  value: string
  onChange: (v: string) => void
  error?: string
  prefix?: string
  suffix?: ReactNode
  disabled?: boolean
  className?: string
}

export function Input({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  prefix,
  suffix,
  disabled = false,
  className = '',
}: InputProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-xs text-gray-400 font-medium">
          {label}
        </label>
      )}
      <div
        className={`
          flex items-center bg-[#0a0c10] border rounded-xl overflow-hidden
          transition-all duration-150
          focus-within:border-blue-500 focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.15)]
          ${error
            ? 'border-red-500/60 shadow-[0_0_0_3px_rgba(239,68,68,0.1)]'
            : 'border-white/10'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {prefix && (
          <span className="pl-4 pr-1 text-sm text-gray-500 whitespace-nowrap select-none flex-shrink-0">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            flex-1 bg-transparent px-4 py-2.5 text-sm text-white
            placeholder-gray-600 focus:outline-none
            disabled:cursor-not-allowed
            ${prefix ? 'pl-1' : ''}
            ${suffix ? 'pr-1' : ''}
          `}
        />
        {suffix && (
          <span className="pr-3 flex-shrink-0 text-gray-500">
            {suffix}
          </span>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  )
}
