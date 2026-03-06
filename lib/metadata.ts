// lib/metadata.ts
// Helper untuk konsistensi page title di semua halaman

import type { Metadata } from 'next'

const BASE = 'Weiiz.ink'

export function meta(title: string, description?: string): Metadata {
  const fullTitle = title === BASE ? BASE : `${title} — ${BASE}`
  return {
    title: fullTitle,
    description: description ?? 'Platform bio link #1 Indonesia. Jual produk digital, terima pembayaran, dan analitik lengkap.',
    openGraph: {
      title: fullTitle,
      description: description,
      siteName: BASE,
    },
  }
}

// ── Page titles (pakai di setiap page.tsx) ────────────────
//
// app/page.tsx
// export const metadata = meta('Ubah Bio Jadi Mesin Penghasil Uang', 'Platform bio link #1 Indonesia...')
//
// app/dashboard/page.tsx
// export const metadata = meta('Dashboard')
//
// app/dashboard/links/page.tsx
// export const metadata = meta('Bio & Links')
//
// app/dashboard/products/page.tsx
// export const metadata = meta('Produk Digital')
//
// app/dashboard/analytics/page.tsx
// export const metadata = meta('Analytics')
//
// app/dashboard/transactions/page.tsx
// export const metadata = meta('Transaksi')
//
// app/dashboard/withdrawal/page.tsx
// export const metadata = meta('Withdrawal')
//
// app/dashboard/ai-tools/page.tsx
// export const metadata = meta('AI Tools')
//
// app/dashboard/settings/page.tsx
// export const metadata = meta('Pengaturan')
//
// app/admin/page.tsx
// export const metadata = meta('Admin — Overview')
//
// app/admin/users/page.tsx
// export const metadata = meta('Admin — Kelola User')
//
// app/admin/withdrawals/page.tsx
// export const metadata = meta('Admin — Withdrawal Request')
//
// app/login/page.tsx
// export const metadata = meta('Masuk')
//
// app/register/page.tsx
// export const metadata = meta('Daftar Gratis')
