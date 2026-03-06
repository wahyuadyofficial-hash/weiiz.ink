// app/api/public/[username]/route.ts
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params

    // TODO: ganti dengan query DB asli
    // const user = await prisma.user.findUnique({
    //   where: { username },
    //   include: {
    //     links: { where: { active: true }, orderBy: { order: 'asc' } },
    //     _count: { select: { products: true } }
    //   }
    // })
    // if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    // Mock — hapus ini saat pakai DB
    if (username !== 'budi') {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json({
      user: {
        name: 'Budi Santoso',
        username: 'budi',
        bio: 'Digital creator & seller 🚀 Jual template, preset, dan e-book.',
        avatar: null,
        totalClicks: 1284,
        totalSold: 37,
        totalProducts: 4,
        donationEnabled: true,
      },
      links: [
        { id: '1', title: 'Order via WhatsApp',    url: 'https://wa.me/628123456789', type: 'whatsapp', active: true, price: null,  order: 0 },
        { id: '2', title: 'E-book Marketing',      url: 'https://weiiz.ink/p/ebook',  type: 'product',  active: true, price: 99000, order: 1 },
        { id: '3', title: 'Instagram',             url: 'https://instagram.com/budi', type: 'link',     active: true, price: null,  order: 2 },
        { id: '4', title: 'Preset Lightroom Pack', url: 'https://weiiz.ink/p/preset', type: 'download', active: true, price: 79000, order: 3 },
      ]
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
