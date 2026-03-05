# 🌊 Weiiz.ink — Where Bio Becomes Benefit

Platform monetisasi bio link untuk creator Indonesia.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy file env
cp .env.example .env.local

# 3. Isi semua variable di .env.local
# (lihat PANDUAN-DEPLOY.html untuk petunjuk lengkap)

# 4. Setup database
npm run db:generate
npm run db:push

# 5. Jalankan lokal
npm run dev
```

Buka `http://localhost:3000` di browser.

## 📖 Panduan Deploy Lengkap

Buka file `PANDUAN-DEPLOY.html` di browser untuk panduan langkah-demi-langkah.

## 🔧 Perintah Penting

| Perintah | Fungsi |
|----------|--------|
| `npm run dev` | Server lokal |
| `npm run build` | Build production |
| `npm run db:push` | Update database schema |
| `npm run db:studio` | UI visual database |
| `vercel --prod` | Deploy ke Vercel |

## 📁 Struktur File

```
weiiz-ink/
├── app/api/          ← Backend API
├── lib/              ← Database, Auth, Payment, Email
├── prisma/           ← Database schema
├── .env.local        ← Secret keys (jangan di-commit!)
└── PANDUAN-DEPLOY.html ← Panduan lengkap
```

## 💰 Subscription Plans

| Plan | Harga | Fee Transaksi |
|------|-------|---------------|
| Free | Gratis | 5% |
| Starter | Rp 49.000/bln | 1% |
| Pro | Rp 99.000/bln | 1% |
| Elite | Rp 199.000/bln | 1% |

## 🛠 Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Neon) + Prisma ORM
- **Auth**: JWT + Bcrypt
- **Payment**: Midtrans (Indonesia) + Stripe (International)
- **Email**: Resend
- **Deploy**: Vercel
"# weiiz.ink" 
"# weiiz.ink" 
