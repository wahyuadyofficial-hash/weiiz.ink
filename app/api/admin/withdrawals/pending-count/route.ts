// app/api/admin/withdrawals/[id]/route.ts
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
    const { status, note } = body

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json({ error: 'Status tidak valid' }, { status: 400 })
    }

    // TODO: ganti dengan update DB asli
    // const withdrawal = await prisma.withdrawal.findUnique({ where: { id } })
    // if (!withdrawal) return NextResponse.json({ error: 'Tidak ditemukan' }, { status: 404 })
    //
    // await prisma.withdrawal.update({
    //   where: { id },
    //   data: { status, note: note ?? null, processedAt: new Date(), processedBy: user.id }
    // })
    //
    // Kalau REJECTED → kembalikan saldo ke user
    // if (status === 'REJECTED') {
    //   await prisma.user.update({
    //     where: { id: withdrawal.userId },
    //     data: { balance: { increment: withdrawal.amount } }
    //   })
    // }

    return NextResponse.json({ id, status, note: note ?? null })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
