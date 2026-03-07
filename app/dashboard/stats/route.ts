// app/api/dashboard/stats/route.ts
export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

    // Revenue bulan ini
    const revenueThisMonth = await prisma.transaction.aggregate({
      where: { userId, status: 'SUCCESS', createdAt: { gte: startOfMonth } },
      _sum: { netAmount: true },
    })

    // Revenue bulan lalu
    const revenueLastMonth = await prisma.transaction.aggregate({
      where: { userId, status: 'SUCCESS', createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } },
      _sum: { netAmount: true },
    })

    // Klik bulan ini
    const clicksThisMonth = await prisma.analytics.count({
      where: { userId, event: 'click', createdAt: { gte: startOfMonth } },
    })

    // Klik bulan lalu
    const clicksLastMonth = await prisma.analytics.count({
      where: { userId, event: 'click', createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } },
    })

    // Produk terjual bulan ini
    const soldThisMonth = await prisma.transaction.count({
      where: { userId, status: 'SUCCESS', createdAt: { gte: startOfMonth } },
    })

    // Produk terjual bulan lalu
    const soldLastMonth = await prisma.transaction.count({
      where: { userId, status: 'SUCCESS', createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } },
    })

    // Saldo tersedia (total revenue - withdrawal)
    const totalRevenue = await prisma.transaction.aggregate({
      where: { userId, status: 'SUCCESS' },
      _sum: { netAmount: true },
    })

    const totalWithdrawn = await prisma.withdrawal.aggregate({
      where: { userId, status: { in: ['APPROVED', 'PROCESSED'] } },
      _sum: { amount: true },
    })

    const balance = (totalRevenue._sum.netAmount ?? 0) - (totalWithdrawn._sum.amount ?? 0)

    // Konversi (transaksi sukses / total klik * 100)
    const totalClicks = await prisma.analytics.count({ where: { userId, event: 'click' } })
    const totalSold = await prisma.transaction.count({ where: { userId, status: 'SUCCESS' } })
    const conversion = totalClicks > 0 ? Math.round((totalSold / totalClicks) * 100 * 10) / 10 : 0
    const convLastMonth = clicksLastMonth > 0 ? Math.round((soldLastMonth / clicksLastMonth) * 100 * 10) / 10 : 0

    return NextResponse.json({
      revenue: revenueThisMonth._sum.netAmount ?? 0,
      revenueLastMonth: revenueLastMonth._sum.netAmount ?? 0,
      clicks: clicksThisMonth,
      clicksLastMonth,
      sold: soldThisMonth,
      soldLastMonth,
      conversion,
      conversionLastMonth: convLastMonth,
      balance: Math.max(balance, 0),
    })

  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
