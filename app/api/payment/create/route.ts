// app/api/payment/create/route.ts
// ─────────────────────────────────────────
// Buat Transaksi Pembayaran Baru
// POST /api/payment/create
// ─────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { createSnapTransaction } from '@/lib/midtrans'

const PaymentSchema = z.object({
  productId: z.string(),
  buyerName: z.string().min(2),
  buyerEmail: z.string().email(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const result = PaymentSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    const { productId, buyerName, buyerEmail } = result.data

    // 1. Ambil produk dari database
    const product = await prisma.product.findUnique({
      where: { id: productId, active: true },
      include: { user: { include: { subscription: true } } },
    })

    if (!product) {
      return NextResponse.json({ error: 'Produk tidak ditemukan' }, { status: 404 })
    }

    // 2. Hitung fee berdasarkan plan seller
    const txFee = product.user.subscription?.txFee ?? 5.0
    const feeAmount = Math.round((product.price * txFee) / 100)
    const netAmount = product.price - feeAmount

    // 3. Buat order ID unik
    const orderId = `WZ-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`

    // 4. Simpan transaksi dengan status PENDING
    const transaction = await prisma.transaction.create({
      data: {
        userId: product.userId,
        productId: product.id,
        buyerName,
        buyerEmail,
        amount: product.price,
        fee: feeAmount,
        netAmount,
        status: 'PENDING',
        gatewayId: orderId,
      },
    })

    // 5. Buat Midtrans Snap token
    const snapToken = await createSnapTransaction({
      orderId,
      amount: product.price,
      buyerName,
      buyerEmail,
      productName: product.name,
    })

    // 6. Simpan snap token
    await prisma.transaction.update({
      where: { id: transaction.id },
      data: { snapToken },
    })

    return NextResponse.json({
      success: true,
      snapToken,
      orderId,
      amount: product.price,
    })

  } catch (error) {
    console.error('Payment create error:', error)
    return NextResponse.json({ error: 'Gagal membuat pembayaran' }, { status: 500 })
  }
}
