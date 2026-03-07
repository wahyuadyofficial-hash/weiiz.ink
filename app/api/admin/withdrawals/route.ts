// app/api/admin/withdrawals/route.ts
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/jwt'

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') ?? 'PENDING'

    // TODO: ganti dengan query DB asli
    // const withdrawals = await prisma.withdrawal.findMany({
    //   where: { status },
    //   orderBy: { createdAt: 'asc' },
    //   include: { user: { select: { name: true, email: true } } }
    // })

    return NextResponse.json({
      withdrawals: [
        {
          id: 'w1',
          userName: 'Rina Melati',
          userEmail: 'rina@email.com',
          amount: 5000000,
          bankName: 'BCA',
          accountNumber: '1234567890',
          accountName: 'RINA MELATI',
          requestedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'w2',
          userName: 'Dimas Putra',
          userEmail: 'dimas@email.com',
          amount: 2500000,
          bankName: 'Mandiri',
          accountNumber: '0987654321',
          accountName: 'DIMAS PUTRA',
          requestedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'w3',
          userName: 'Ayu Lestari',
          userEmail: 'ayu@email.com',
          amount: 1750000,
          bankName: 'BNI',
          accountNumber: '1122334455',
          accountName: 'AYU LESTARI',
          requestedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        },
      ]
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
