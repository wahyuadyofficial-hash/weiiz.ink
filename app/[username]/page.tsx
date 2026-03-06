// app/[username]/page.tsx
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import BioClient from './BioClient'

// ─── Types ───────────────────────────────────────────────
export interface PublicUser {
  name: string
  username: string
  bio: string
  avatar?: string
  totalClicks: number
  totalSold: number
  totalProducts: number
  donationEnabled: boolean
}

export type LinkType = 'link' | 'product' | 'payment' | 'whatsapp' | 'download' | 'affiliate'

export interface PublicLink {
  id: string
  title: string
  url: string
  type: LinkType
  price?: number
  active: boolean
  order: number
}

// ─── Data Fetching ────────────────────────────────────────
async function getPublicProfile(username: string): Promise<{ user: PublicUser; links: PublicLink[] } | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/public/${username}`, {
      next: { revalidate: 60 }, // cache 60 detik
    })
    if (res.status === 404) return null
    if (!res.ok) throw new Error('Fetch failed')
    return res.json()
  } catch {
    return null
  }
}

// ─── SEO Metadata ─────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: { username: string } }
): Promise<Metadata> {
  const data = await getPublicProfile(params.username)
  if (!data) return { title: 'Tidak ditemukan — Weiiz.ink' }

  const { user } = data
  const url = `https://weiiz.ink/${user.username}`

  return {
    title: `${user.name} — Weiiz.ink`,
    description: user.bio || `Lihat bio dan link ${user.name} di Weiiz.ink`,
    metadataBase: new URL('https://weiiz.ink'),
    openGraph: {
      title: `${user.name} — Weiiz.ink`,
      description: user.bio || `Lihat bio dan link ${user.name} di Weiiz.ink`,
      url,
      siteName: 'Weiiz.ink',
      images: [
        {
          url: user.avatar ?? `/api/og?username=${user.username}`,
          width: 1200,
          height: 630,
          alt: user.name,
        }
      ],
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${user.name} — Weiiz.ink`,
      description: user.bio || `Lihat bio dan link ${user.name} di Weiiz.ink`,
    },
    alternates: { canonical: url },
  }
}

// ─── Page (Server Component) ──────────────────────────────
export default async function PublicBioPage({ params }: { params: { username: string } }) {
  const data = await getPublicProfile(params.username)
  if (!data) notFound()

  // Fire & forget — catat view analytics
  fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/analytics/view`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: params.username }),
  }).catch(() => {})

  return <BioClient user={data.user} links={data.links} />
}
