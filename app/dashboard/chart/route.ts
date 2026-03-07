// app/api/dashboard/chart/route.ts
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
    const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']

    // 7 hari terakhir
    const data = await Promise.all(
      Array.from({ length: 7 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (6 - i))
        const start = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        const end   = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
        const dayIdx = date.getDay() === 0 ? 6 : date.getDay() - 1

        return prisma.transaction.aggregate({
          where: { userId, status: 'SUCCESS', createdAt: { gte: start, lt: end } },
          _sum: { netAmount: true },
        }).then(res => ({
          day: days[dayIdx],
          amount: res._sum.netAmount ?? 0,
        }))
      })
    )

    return NextResponse.json({ data })

  } catch (error) {
    console.error('Dashboard chart error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
