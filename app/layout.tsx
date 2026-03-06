import { Syne } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], weight: ['700', '800', '900'] })

// di <html>:
<html className={syne.variable}>
export const metadata = {
  title: 'Weiiz.ink',
  description: 'Where Bio Becomes Benefit',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
