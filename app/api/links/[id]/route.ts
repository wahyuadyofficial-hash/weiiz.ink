// app/api/links/[id]/route.ts
// PATCH  /api/links/[id]  → update link (active, title, url, price)
// DELETE /api/links/[id]  → hapus link

import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/jwt'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { id } = params

    // TODO: ganti dengan update DB asli
    // const existing = await prisma.link.findFirst({ where: { id, userId: user.id } })
    // if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    // const updated = await prisma.link.update({ where: { id }, data: body })

    return NextResponse.json({ id, ...body })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = params

    // TODO: ganti dengan delete DB asli
    // await prisma.link.delete({ where: { id, userId: user.id } })

    return NextResponse.json({ deleted: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
