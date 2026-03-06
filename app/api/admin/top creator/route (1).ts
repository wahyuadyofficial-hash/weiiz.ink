// app/api/admin/top-creators/route.ts
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/jwt'

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // TODO: ganti dengan query DB asli
    // const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    // const creators = await prisma.transaction.groupBy({
    //   by: ['sellerId'],
    //   where: { status: 'success', createdAt: { gte: startOfMonth } },
    //   _sum: { amount: true },
    //   orderBy: { _sum: { amount: 'desc' } },
    //   take: 5,
    // })

    return NextResponse.json({
      creators: [
        { id: '1', name: 'Rina Melati',   username: 'rinamelati',   plan: 'ELITE',   gmvMonth: 12400000 },
        { id: '2', name: 'Dimas Putra',   username: 'dimasputra',   plan: 'PRO',     gmvMonth: 9870000  },
        { id: '3', name: 'Sari Dewi',     username: 'saridewi',     plan: 'PRO',     gmvMonth: 7250000  },
        { id: '4', name: 'Budi Santoso',  username: 'budi',         plan: 'STARTER', gmvMonth: 4750000  },
        { id: '5', name: 'Ayu Lestari',   username: 'ayulestari',   plan: 'PRO',     gmvMonth: 3980000  },
      ]
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
