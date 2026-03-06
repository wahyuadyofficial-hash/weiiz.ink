// app/api/dashboard/stats/route.ts
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/jwt'

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // TODO: Replace with real DB queries
    // Example using Prisma:
    // const now = new Date()
    // const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    // const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    // const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    //
    // const [revenue, revenueLastMonth, ...] = await Promise.all([
    //   prisma.transaction.aggregate({ where: { userId: user.id, status: 'success', createdAt: { gte: startOfMonth } }, _sum: { amount: true } }),
    //   ...
    // ])

    return NextResponse.json({
      revenue: 4750000,
      revenueLastMonth: 3200000,
      clicks: 1284,
      clicksLastMonth: 980,
      sold: 37,
      soldLastMonth: 29,
      conversion: 2.9,
      conversionLastMonth: 2.3,
      balance: 1250000,
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}