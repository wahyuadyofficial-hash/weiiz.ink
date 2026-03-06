// components/ui/SkeletonLoader.tsx

// Base pulse style
const base = 'bg-blue-500/10 animate-pulse rounded-lg'

// ── SkeletonLine ──────────────────────────────────────────
interface SkeletonLineProps {
  width?: string   // e.g. 'w-48', 'w-full'
  height?: string  // e.g. 'h-4', 'h-6'
  className?: string
}

export function SkeletonLine({ width = 'w-full', height = 'h-4', className = '' }: SkeletonLineProps) {
  return <div className={`${base} ${width} ${height} ${className}`} />
}

// ── SkeletonCard ──────────────────────────────────────────
interface SkeletonCardProps {
  className?: string
  lines?: number  // how many content lines to show
}

export function SkeletonCard({ className = '', lines = 2 }: SkeletonCardProps) {
  return (
    <div className={`bg-[#111318] border border-white/10 rounded-2xl p-5 space-y-3 ${className}`}>
      {/* Header row */}
      <div className="flex items-center gap-3">
        <div className={`${base} w-10 h-10 rounded-xl flex-shrink-0`} />
        <div className="flex-1 space-y-2">
          <SkeletonLine width="w-2/3" height="h-4" />
          <SkeletonLine width="w-1/3" height="h-3" />
        </div>
      </div>
      {/* Content lines */}
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLine key={i} width={i % 2 === 0 ? 'w-full' : 'w-3/4'} height="h-3" />
      ))}
    </div>
  )
}

// ── SkeletonTable ─────────────────────────────────────────
interface SkeletonTableProps {
  rows?: number
  cols?: number
  className?: string
}

export function SkeletonTable({ rows = 5, cols = 4, className = '' }: SkeletonTableProps) {
  return (
    <div className={`bg-[#111318] border border-white/10 rounded-2xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex gap-4 px-5 py-3.5 border-b border-white/10">
        {Array.from({ length: cols }).map((_, i) => (
          <SkeletonLine key={i} width="w-20" height="h-3" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-0">
          {/* First col: avatar + text */}
          <div className="flex items-center gap-3 flex-1">
            <div className={`${base} w-8 h-8 rounded-full flex-shrink-0`} />
            <div className="space-y-1.5">
              <SkeletonLine width="w-28" height="h-3" />
              <SkeletonLine width="w-20" height="h-2.5" />
            </div>
          </div>
          {/* Other cols */}
          {Array.from({ length: cols - 1 }).map((_, c) => (
            <SkeletonLine key={c} width="w-16" height="h-3" />
          ))}
        </div>
      ))}
    </div>
  )
}
