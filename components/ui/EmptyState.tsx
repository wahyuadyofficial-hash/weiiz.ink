// components/ui/EmptyState.tsx
'use client'

import Link from 'next/link'

interface EmptyStateProps {
  icon?: string
  title: string
  description: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
  secondaryAction?: {
    label: string
    href?: string
    onClick?: () => void
  }
}

export function EmptyState({ icon, title, description, action, secondaryAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      {icon && (
        <div className="text-5xl mb-5 select-none" style={{ filter: 'drop-shadow(0 0 16px rgba(56,189,248,0.3))' }}>
          {icon}
        </div>
      )}
      <h3 className="text-white font-bold text-base mb-2">{title}</h3>
      <p className="text-sm max-w-xs leading-relaxed mb-7" style={{ color: '#7a95b4' }}>{description}</p>
      <div className="flex flex-col sm:flex-row gap-3">
        {action && (
          action.href
            ? <Link href={action.href}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] text-white font-semibold text-sm transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #1565c0, #38bdf8)', boxShadow: '0 0 20px rgba(56,189,248,0.3)' }}>
                {action.label}
              </Link>
            : <button onClick={action.onClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] text-white font-semibold text-sm transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #1565c0, #38bdf8)', boxShadow: '0 0 20px rgba(56,189,248,0.3)' }}>
                {action.label}
              </button>
        )}
        {secondaryAction && (
          secondaryAction.href
            ? <Link href={secondaryAction.href}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] text-sm font-medium border transition-all hover:-translate-y-0.5"
                style={{ color: '#38bdf8', borderColor: 'rgba(56,189,248,0.2)', background: 'rgba(56,189,248,0.05)' }}>
                {secondaryAction.label}
              </Link>
            : <button onClick={secondaryAction.onClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] text-sm font-medium border transition-all hover:-translate-y-0.5"
                style={{ color: '#38bdf8', borderColor: 'rgba(56,189,248,0.2)', background: 'rgba(56,189,248,0.05)' }}>
                {secondaryAction.label}
              </button>
        )}
      </div>
    </div>
  )
}

// ── Pre-built empty states ────────────────────────────────

export function EmptyLinks({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed py-4" style={{ borderColor: 'rgba(56,189,248,0.2)' }}>
      <EmptyState
        icon="🔗"
        title="Belum ada link"
        description="Tambahkan link pertama kamu — produk, WhatsApp, media sosial, atau apapun yang ingin kamu bagikan."
        action={{ label: '＋ Tambah Link Pertama', onClick: onAdd }}
      />
    </div>
  )
}

export function EmptyProducts() {
  return (
    <div className="rounded-2xl border border-dashed py-4" style={{ borderColor: 'rgba(56,189,248,0.2)' }}>
      <EmptyState
        icon="📦"
        title="Belum ada produk digital"
        description="Mulai jual e-book, template, preset, atau file digital apapun. Setup hanya 2 menit."
        action={{ label: '＋ Buat Produk Pertama', href: '/dashboard/products/new' }}
        secondaryAction={{ label: 'Pelajari caranya', href: '#' }}
      />
    </div>
  )
}

export function EmptyTransactions() {
  return (
    <div className="rounded-2xl border border-dashed py-4" style={{ borderColor: 'rgba(56,189,248,0.2)' }}>
      <EmptyState
        icon="💳"
        title="Belum ada transaksi"
        description="Transaksi akan muncul di sini setelah pembeli pertama checkout dari bio page kamu."
        action={{ label: '🔗 Lihat Bio Page', href: '#' }}
        secondaryAction={{ label: 'Tips meningkatkan penjualan', href: '#' }}
      />
    </div>
  )
}

export function EmptyWithdrawals() {
  return (
    <EmptyState
      icon="🏦"
      title="Belum ada riwayat withdrawal"
      description="Setelah kamu mengajukan penarikan saldo, riwayatnya akan muncul di sini."
    />
  )
}

export function EmptySearch({ query }: { query: string }) {
  return (
    <EmptyState
      icon="🔍"
      title={`Tidak ada hasil untuk "${query}"`}
      description="Coba kata kunci lain atau periksa ejaan."
    />
  )
}
