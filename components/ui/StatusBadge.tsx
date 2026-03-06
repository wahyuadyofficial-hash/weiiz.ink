// components/ui/StatusBadge.tsx

type TransactionStatus = 'success' | 'pending' | 'failed' | 'expired'

interface StatusBadgeProps {
  status: TransactionStatus
  className?: string
}

const STATUS_CONFIG: Record<TransactionStatus, { label: string; dot: string; style: string }> = {
  success: {
    label: 'Sukses',
    dot:   'bg-green-400',
    style: 'bg-green-500/15 text-green-400 border-green-500/20',
  },
  pending: {
    label: 'Pending',
    dot:   'bg-yellow-400 animate-pulse',
    style: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
  },
  failed: {
    label: 'Gagal',
    dot:   'bg-red-400',
    style: 'bg-red-500/15 text-red-400 border-red-500/20',
  },
  expired: {
    label: 'Kadaluarsa',
    dot:   'bg-gray-500',
    style: 'bg-gray-700/50 text-gray-400 border-gray-600/30',
  },
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const cfg = STATUS_CONFIG[status]

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        text-[11px] font-semibold
        px-2 py-0.5 rounded-md border
        ${cfg.style}
        ${className}
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
      {cfg.label}
    </span>
  )
}
