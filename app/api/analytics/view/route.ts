// app/api/analytics/view/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { username } = await request.json()
    if (!username) return NextResponse.json({ ok: false })

    // TODO: ganti dengan insert DB asli
    // await prisma.analytics.create({
    //   data: {
    //     type: 'view',
    //     username,
    //     ip: request.headers.get('x-forwarded-for'),
    //     userAgent: request.headers.get('user-agent'),
    //   }
    // })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
