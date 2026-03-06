// app/[username]/page.tsx
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import BioClient from './BioClient'

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

async function getPublicProfile(username: string): Promise<{ user: PublicUser; links: PublicLink[] } | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/public/${username}`, {
      next: { revalidate: 60 },
    })
    if (res.status === 404) return null
    if (!res.ok) throw new Error('Fetch failed')
    return res.json()
  } catch {
    return null
  }
}

export async function generateMetadata(
  { params }: { params: { username: string } }
): Promise<Metadata> {
  const data = await getPublicProfile(params.username)
  if (!data) return { title: 'Tidak ditemukan' }
  const { user } = data
  return {
    title: `${user.name} — Weiiz.ink`,
    description: user.bio || `Lihat bio dan link ${user.name} di Weiiz.ink`,
    openGraph: {
      title: `${user.name} — Weiiz.ink`,
      description: user.bio || `Lihat bio dan link ${user.name} di Weiiz.ink`,
      url: `https://weiiz.ink/${user.username}`,
      siteName: 'Weiiz.ink',
      type: 'profile',
    },
  }
}

export default async function PublicBioPage({ params }: { params: { username: string } }) {
  const data = await getPublicProfile(params.username)
  if (!data) notFound()

  // Fire & forget analytics
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  fetch(`${baseUrl}/api/analytics/view`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: params.username }),
  }).catch(() => {})

  return <BioClient user={data.user} links={data.links} />
}
