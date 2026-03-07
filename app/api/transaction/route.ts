// app/api/transactions/route.ts
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get('limit') ?? '10')
    const page  = parseInt(searchParams.get('page')  ?? '1')

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: (page - 1) * limit,
        include: { product: { select: { name: true } } },
      }),
      prisma.transaction.count({ where: { userId } }),
    ])

    return NextResponse.json({
      transactions: transactions.map(tx => ({
        id:          tx.id,
        buyerName:   tx.buyerName,
        buyerEmail:  tx.buyerEmail,
        productName: tx.product?.name ?? 'Produk',
        method:      tx.method ?? 'Transfer',
        amount:      tx.netAmount,
        status:      tx.status.toLowerCase(),
        createdAt:   tx.createdAt,
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })

  } catch (error) {
    console.error('Transactions error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
