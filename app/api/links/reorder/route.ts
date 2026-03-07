// app/api/links/reorder/route.ts
// PATCH /api/links/reorder → simpan urutan baru

import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/jwt'

export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { ids } = await request.json()
    if (!Array.isArray(ids)) {
      return NextResponse.json({ error: 'ids harus array' }, { status: 400 })
    }

    // TODO: ganti dengan update DB asli
    // await Promise.all(ids.map((id, index) =>
    //   prisma.link.update({ where: { id, userId: user.id }, data: { order: index } })
    // ))

    return NextResponse.json({ reordered: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
