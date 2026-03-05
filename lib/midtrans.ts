// lib/midtrans.ts
// ─────────────────────────────────────────
// Midtrans Payment Gateway (Indonesia)
// Docs: https://docs.midtrans.com
// ─────────────────────────────────────────

const midtransClient = require('midtrans-client')

// Snap client — untuk buat halaman pembayaran
export const snap = new midtransClient.Snap({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
})

// Core API — untuk cek status transaksi
export const coreApi = new midtransClient.CoreApi({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
})

// Buat transaksi baru
export async function createSnapTransaction(params: {
  orderId: string
  amount: number
  buyerName: string
  buyerEmail: string
  productName: string
}) {
  const { orderId, amount, buyerName, buyerEmail, productName } = params

  const transaction = await snap.createTransaction({
    transaction_details: {
      order_id: orderId,
      gross_amount: amount,
    },
    customer_details: {
      first_name: buyerName,
      email: buyerEmail,
    },
    item_details: [
      {
        id: orderId,
        price: amount,
        quantity: 1,
        name: productName,
      },
    ],
    callbacks: {
      finish: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
      error: `${process.env.NEXT_PUBLIC_APP_URL}/payment/failed`,
      pending: `${process.env.NEXT_PUBLIC_APP_URL}/payment/pending`,
    },
  })

  return transaction.token as string
}

// Verifikasi signature dari webhook Midtrans
export function verifyMidtransSignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  signatureKey: string
): boolean {
  const crypto = require('crypto')
  const hash = crypto
    .createHash('sha512')
    .update(orderId + statusCode + grossAmount + process.env.MIDTRANS_SERVER_KEY)
    .digest('hex')
  return hash === signatureKey
}
