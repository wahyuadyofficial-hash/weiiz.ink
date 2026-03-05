// app/api/withdrawal/route.ts
// ─────────────────────────────────────────
// Withdrawal Request
// GET  /api/withdrawal  → riwayat withdrawal user
// POST /api/withdrawal  → request withdrawal baru
// ─────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { verifyToken } from '@/lib/jwt'

function getUser(req: NextRequest) {
  const token = req.cookies.get('weiiz_token')?.value
  if (!token) return null
  return verifyToken(token)
}

// Ambil saldo tersedia user
async function getAvailableBalance(userId: string): Promise<number> {
  // Hitung total net amount dari semua transaksi SUCCESS
  const result = await prisma.transaction.aggregate({
    where: { userId, status: 'SUCCESS' },
    _sum: { netAmount: true },
  })
  
  const totalEarned = result._sum.netAmount ?? 0

  // Kurangi dengan total withdrawal yang sudah diproses
  const withdrawn = await prisma.withdrawal.aggregate({
    where: {
      userId,
      status: { in: ['APPROVED', 'PROCESSED'] },
    },
    _sum: { amount: true },
  })

  const totalWithdrawn = withdrawn._sum.amount ?? 0

  return totalEarned - totalWithdrawn
}

// GET: Riwayat withdrawal
export async function GET(req: NextRequest) {
  const user = getUser(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const [withdrawals, balance] = await Promise.all([
    prisma.withdrawal.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: 'desc' },
    }),
    getAvailableBalance(user.userId),
  ])

  return NextResponse.json({ withdrawals, balance })
}

// POST: Request withdrawal baru
const WithdrawSchema = z.object({
  amount: z.number().min(50000, 'Minimum withdrawal Rp 50.000'),
  bank: z.string().min(1, 'Bank wajib dipilih'),
  accountNum: z.string().min(6, 'Nomor rekening tidak valid'),
  accountName: z.string().min(2, 'Nama pemilik rekening wajib diisi'),
})

export async function POST(req: NextRequest) {
  const user = getUser(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const result = WithdrawSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    const { amount, bank, accountNum, accountName } = result.data

    // Cek saldo cukup
    const balance = await getAvailableBalance(user.userId)
    if (amount > balance) {
      return NextResponse.json(
        { error: `Saldo tidak cukup. Tersedia: Rp ${balance.toLocaleString('id-ID')}` },
        { status: 400 }
      )
    }

    // Cek tidak ada withdrawal pending
    const pending = await prisma.withdrawal.findFirst({
      where: { userId: user.userId, status: 'PENDING' },
    })

    if (pending) {
      return NextResponse.json(
        { error: 'Masih ada withdrawal yang sedang diproses. Tunggu sampai selesai.' },
        { status: 400 }
      )
    }

    // Buat request withdrawal
    const withdrawal = await prisma.withdrawal.create({
      data: {
        userId: user.userId,
        amount,
        bank,
        accountNum,
        accountName,
        status: 'PENDING',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Request withdrawal berhasil! Diproses dalam 1-3 hari kerja.',
      withdrawal,
    })

  } catch (error) {
    console.error('Withdrawal error:', error)
    return NextResponse.json({ error: 'Gagal membuat request' }, { status: 500 })
  }
}
