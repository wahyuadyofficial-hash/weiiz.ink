import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Weiiz.ink',
    template: '%s - Weiiz.ink',
  },
  description: 'Where Bio Becomes Benefit',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
} 
import { Syne, DM_Sans } from 'next/font/google'

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-syne',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
})

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${syne.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}