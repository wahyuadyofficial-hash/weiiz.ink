// lib/email.ts
// ─────────────────────────────────────────
// Email Service menggunakan Resend
// Docs: https://resend.com/docs
// ─────────────────────────────────────────

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.EMAIL_FROM || 'Weiiz.ink <noreply@weiiz.ink>'

// Email verifikasi akun baru
export async function sendVerificationEmail(email: string, name: string, token: string) {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`

  return resend.emails.send({
    from: FROM,
    to: email,
    subject: 'Verifikasi Email Kamu — Weiiz.ink',
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:32px">
        <h2 style="color:#0ea5e9">Halo ${name}! 👋</h2>
        <p>Terima kasih sudah bergabung di Weiiz.ink.</p>
        <p>Klik tombol di bawah untuk verifikasi email kamu:</p>
        <a href="${url}" style="display:inline-block;background:#0ea5e9;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold;margin:16px 0">
          Verifikasi Email
        </a>
        <p style="color:#888;font-size:13px">Link berlaku selama 24 jam.</p>
        <hr/>
        <p style="color:#888;font-size:12px">Weiiz.ink — Where Bio Becomes Benefit</p>
      </div>
    `,
  })
}

// Email konfirmasi pembelian ke pembeli
export async function sendPurchaseConfirmation(params: {
  buyerEmail: string
  buyerName: string
  productName: string
  amount: number
  fileUrl?: string
  orderId: string
}) {
  const { buyerEmail, buyerName, productName, amount, fileUrl, orderId } = params

  return resend.emails.send({
    from: FROM,
    to: buyerEmail,
    subject: `Pembelian Berhasil: ${productName} — Weiiz.ink`,
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:32px">
        <h2 style="color:#0ea5e9">Pembelian Berhasil! 🎉</h2>
        <p>Halo ${buyerName},</p>
        <p>Pembayaranmu untuk <strong>${productName}</strong> telah berhasil.</p>
        <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:16px;margin:16px 0">
          <p style="margin:0"><strong>Order ID:</strong> ${orderId}</p>
          <p style="margin:4px 0"><strong>Produk:</strong> ${productName}</p>
          <p style="margin:4px 0"><strong>Total:</strong> Rp ${amount.toLocaleString('id-ID')}</p>
        </div>
        ${fileUrl ? `
          <p>Klik tombol di bawah untuk mengunduh produkmu:</p>
          <a href="${fileUrl}" style="display:inline-block;background:#0ea5e9;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold">
            ⬇ Download Produk
          </a>
        ` : `<p>Seller akan menghubungi kamu segera.</p>`}
        <hr/>
        <p style="color:#888;font-size:12px">Weiiz.ink — Where Bio Becomes Benefit</p>
      </div>
    `,
  })
}

// Notifikasi ke seller saat ada penjualan
export async function sendSaleNotification(params: {
  sellerEmail: string
  sellerName: string
  buyerName: string
  productName: string
  amount: number
  netAmount: number
}) {
  const { sellerEmail, sellerName, buyerName, productName, amount, netAmount } = params

  return resend.emails.send({
    from: FROM,
    to: sellerEmail,
    subject: `🎉 Produk Terjual: ${productName}`,
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:32px">
        <h2 style="color:#10b981">Ada yang beli produkmu! 🎉</h2>
        <p>Halo ${sellerName},</p>
        <p><strong>${buyerName}</strong> baru saja membeli <strong>${productName}</strong>.</p>
        <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:16px;margin:16px 0">
          <p style="margin:0"><strong>Harga:</strong> Rp ${amount.toLocaleString('id-ID')}</p>
          <p style="margin:4px 0;color:#10b981"><strong>Kamu dapat:</strong> Rp ${netAmount.toLocaleString('id-ID')}</p>
        </div>
        <p>Cek dashboard kamu untuk detail lebih lanjut.</p>
        <hr/>
        <p style="color:#888;font-size:12px">Weiiz.ink — Where Bio Becomes Benefit</p>
      </div>
    `,
  })
}
