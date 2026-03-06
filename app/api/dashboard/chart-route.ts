// app/api/dashboard/chart/route.ts
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/jwt'

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // TODO: Replace with real DB query for last 7 days
    // const days = Array.from({ length: 7 }, (_, i) => {
    //   const d = new Date()
    //   d.setDate(d.getDate() - (6 - i))
    //   return d
    // })
    // const results = await Promise.all(days.map(day => ...))

    return NextResponse.json({
      data: [
        { day: 'Sen', amount: 320000 },
        { day: 'Sel', amount: 540000 },
        { day: 'Rab', amount: 280000 },
        { day: 'Kam', amount: 790000 },
        { day: 'Jum', amount: 650000 },
        { day: 'Sab', amount: 910000 },
        { day: 'Min', amount: 430000 },
      ]
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
