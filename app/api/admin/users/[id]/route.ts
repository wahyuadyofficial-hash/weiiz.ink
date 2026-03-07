// app/api/admin/users/[id]/route.ts
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/jwt'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = params
    const body = await request.json()
    const { status } = body

    if (!['active', 'suspended'].includes(status)) {
      return NextResponse.json({ error: 'Status tidak valid' }, { status: 400 })
    }

    // TODO: ganti dengan update DB asli
    // const target = await prisma.user.findUnique({ where: { id } })
    // if (!target) return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 })
    // const updated = await prisma.user.update({ where: { id }, data: { status } })

    return NextResponse.json({ id, status })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
