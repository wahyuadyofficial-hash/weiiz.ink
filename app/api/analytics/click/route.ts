// app/api/analytics/click/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { linkId, username } = await request.json()
    if (!linkId) return NextResponse.json({ ok: false })

    // TODO: ganti dengan update DB asli
    // await Promise.all([
    //   prisma.analytics.create({
    //     data: { type: 'click', linkId, username }
    //   }),
    //   prisma.link.update({
    //     where: { id: linkId },
    //     data: { clicks: { increment: 1 } }
    //   })
    // ])

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
