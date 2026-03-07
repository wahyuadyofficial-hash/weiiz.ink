// app/api/links/route.ts
// GET  /api/links  → ambil semua link milik user
// POST /api/links  → tambah link baru

import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/jwt'

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // TODO: ganti dengan query DB asli
    // const links = await prisma.link.findMany({
    //   where: { userId: user.id },
    //   orderBy: { order: 'asc' }
    // })

    return NextResponse.json({
      links: [
        { id: '1', title: 'Order via WhatsApp',    url: 'https://wa.me/6285373530295', type: 'whatsapp',  active: true,  clicks: 142, revenue: 0,      order: 0 },
        { id: '2', title: 'E-book Marketing',      url: 'https://weiiz.ink/p/ebook',   type: 'product',   active: true,  clicks: 89,  revenue: 890000, order: 1, price: 99000 },
        { id: '3', title: 'Instagram',             url: 'https://instagram.com/budi',  type: 'link',      active: true,  clicks: 310, revenue: 0,      order: 2 },
        { id: '4', title: 'Preset Lightroom Pack', url: 'https://weiiz.ink/p/preset',  type: 'download',  active: false, clicks: 44,  revenue: 352000, order: 3, price: 79000 },
      ]
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { title, url, type, price } = body

    if (!title || !url || !type) {
      return NextResponse.json({ error: 'title, url, dan type wajib diisi' }, { status: 400 })
    }

    // TODO: ganti dengan insert DB asli
    // const maxOrder = await prisma.link.count({ where: { userId: user.id } })
    // const newLink = await prisma.link.create({
    //   data: { title, url, type, price, active: true, clicks: 0, order: maxOrder, userId: user.id }
    // })

    const newLink = {
      id: Date.now().toString(),
      title, url, type,
      price: price ?? null,
      active: true,
      clicks: 0,
      revenue: 0,
      order: 99,
    }

    return NextResponse.json(newLink, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
