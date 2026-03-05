// app/api/payment/webhook/route.ts
// ─────────────────────────────────────────
// Webhook Handler — Notifikasi dari Midtrans
// POST /api/payment/webhook
//
// Midtrans akan kirim POST ke URL ini setiap kali
// status pembayaran berubah.
// ─────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyMidtransSignature } from '@/lib/midtrans'
import { sendPurchaseConfirmation, sendSaleNotification } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      order_id,
      transaction_status,
      gross_amount,
      signature_key,
      status_code,
      payment_type,
    } = body

    // 1. Verifikasi signature dari Midtrans
    //    Ini penting untuk keamanan — pastikan request benar dari Midtrans
    const isValid = verifyMidtransSignature(
      order_id,
      status_code,
      gross_amount,
      signature_key
    )

    if (!isValid) {
      console.error('Invalid Midtrans signature for order:', order_id)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    // 2. Map status Midtrans ke status kita
    let status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'EXPIRED'
    
    if (transaction_status === 'settlement' || transaction_status === 'capture') {
      status = 'SUCCESS'
    } else if (transaction_status === 'pending') {
      status = 'PENDING'
    } else if (transaction_status === 'expire') {
      status = 'EXPIRED'
    } else {
      // deny, cancel, failure
      status = 'FAILED'
    }

    // 3. Update transaksi di database
    const transaction = await prisma.transaction.update({
      where: { gatewayId: order_id },
      data: {
        status,
        method: payment_type,
      },
      include: {
        product: true,
        user: true,
      },
    })

    // 4. Kalau pembayaran berhasil → proses
    if (status === 'SUCCESS') {
      // Update sold count dan revenue produk
      if (transaction.productId) {
        await prisma.product.update({
          where: { id: transaction.productId },
          data: {
            sold: { increment: 1 },
            revenue: { increment: transaction.netAmount },
          },
        })
      }

      // Catat analytics
      await prisma.analytics.create({
        data: {
          userId: transaction.userId,
          event: 'purchase',
        },
      })

      // Kirim email ke pembeli (dengan link download jika ada)
      sendPurchaseConfirmation({
        buyerEmail: transaction.buyerEmail,
        buyerName: transaction.buyerName,
        productName: transaction.product?.name || 'Produk',
        amount: transaction.amount,
        fileUrl: transaction.product?.fileUrl || undefined,
        orderId: order_id,
      }).catch(console.error)

      // Kirim notifikasi ke seller
      sendSaleNotification({
        sellerEmail: transaction.user.email,
        sellerName: transaction.user.name,
        buyerName: transaction.buyerName,
        productName: transaction.product?.name || 'Produk',
        amount: transaction.amount,
        netAmount: transaction.netAmount,
      }).catch(console.error)
    }

    return NextResponse.json({ success: true, status })

  } catch (error) {
    console.error('Webhook error:', error)
    // Tetap return 200 ke Midtrans agar tidak retry terus
    return NextResponse.json({ received: true })
  }
}
