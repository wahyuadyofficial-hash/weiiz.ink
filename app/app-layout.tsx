// app/layout.tsx  — ROOT LAYOUT
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Weiiz.ink',
    template: '%s — Weiiz.ink',
  },
  description: 'Platform bio link #1 Indonesia. Jual produk digital, terima pembayaran, dan analitik lengkap.',
  metadataBase: new URL('https://weiiz.ink'),
  openGraph: {
    siteName: 'Weiiz.ink',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Preconnect fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
