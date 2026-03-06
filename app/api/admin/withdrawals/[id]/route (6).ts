// app/api/admin/withdrawals/pending-count/route.ts
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/jwt'

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ count: 0 })
    }

    // TODO: ganti dengan query DB asli
    // const count = await prisma.withdrawal.count({ where: { status: 'PENDING' } })

    return NextResponse.json({ count: 3 })
  } catch {
    return NextResponse.json({ count: 0 })
  }
}
