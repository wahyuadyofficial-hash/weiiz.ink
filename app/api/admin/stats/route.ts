// app/api/admin/stats/route.ts
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/jwt'

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // TODO: ganti dengan query DB asli
    // const [gmvAllTime, totalUsers, usersByPlan, transactionsToday, withdrawalPending] = await Promise.all([
    //   prisma.transaction.aggregate({ where: { status: 'success' }, _sum: { amount: true } }),
    //   prisma.user.count(),
    //   prisma.user.groupBy({ by: ['plan'], _count: true }),
    //   prisma.transaction.count({ where: { status: 'success', createdAt: { gte: startOfToday } } }),
    //   prisma.withdrawal.count({ where: { status: 'PENDING' } }),
    // ])

    return NextResponse.json({
      gmvAllTime: 184750000,
      totalUsers: 1284,
      usersByPlan: { FREE: 890, STARTER: 241, PRO: 118, ELITE: 35 },
      transactionsToday: 47,
      withdrawalPending: 3,
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
