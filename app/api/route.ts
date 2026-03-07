// app/api/transactions/route.ts
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/jwt'

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') ?? '10')

    // TODO: Replace with real DB query
    // const transactions = await prisma.transaction.findMany({
    //   where: { sellerId: user.id },
    //   orderBy: { createdAt: 'desc' },
    //   take: limit,
    //   include: { product: true, buyer: true },
    // })

    return NextResponse.json({
      transactions: [
        { id: '1', buyerName: 'Andi Pratama',   productName: 'Template IG Story Pack',  method: 'GoPay', amount: 49000,  status: 'success' },
        { id: '2', buyerName: 'Siti Rahayu',    productName: 'E-book Marketing Digital', method: 'BCA',   amount: 99000,  status: 'success' },
        { id: '3', buyerName: 'Beni Kurniawan',  productName: 'Preset Lightroom Pro',    method: 'QRIS',  amount: 79000,  status: 'pending' },
        { id: '4', buyerName: 'Dewi Anggraini', productName: 'Template IG Story Pack',  method: 'GoPay', amount: 49000,  status: 'success' },
        { id: '5', buyerName: 'Rudi Hartono',   productName: 'Kelas Online Copywriting', method: 'BCA',   amount: 299000, status: 'failed'  },
      ].slice(0, limit)
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
