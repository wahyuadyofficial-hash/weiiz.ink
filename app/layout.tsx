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
