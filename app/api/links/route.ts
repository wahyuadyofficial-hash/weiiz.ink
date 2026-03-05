// app/api/links/route.ts
// ─────────────────────────────────────────
// CRUD Bio Links
// GET    /api/links       → ambil semua link user
// POST   /api/links       → tambah link baru
// PATCH  /api/links/[id]  → edit link
// DELETE /api/links/[id]  → hapus link
// ─────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { verifyToken } from '@/lib/jwt'

// Helper: ambil user dari cookie
function getUser(req: NextRequest) {
  const token = req.cookies.get('weiiz_token')?.value
  if (!token) return null
  return verifyToken(token)
}

// ── GET: Ambil semua link milik user ─────
export async function GET(req: NextRequest) {
  const user = getUser(req)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const links = await prisma.link.findMany({
    where: { userId: user.userId },
    orderBy: { order: 'asc' },
  })

  return NextResponse.json({ links })
}

// ── POST: Tambah link baru ────────────────
const CreateLinkSchema = z.object({
  title: z.string().min(1, 'Judul wajib diisi').max(100),
  url: z.string().min(1, 'URL wajib diisi'),
  type: z.enum(['link', 'product', 'payment', 'whatsapp', 'download', 'affiliate']).default('link'),
  price: z.number().optional(),
})

export async function POST(req: NextRequest) {
  const user = getUser(req)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const result = CreateLinkSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    // Cek limit link berdasarkan plan
    const subscription = await prisma.subscription.findUnique({
      where: { userId: user.userId },
    })

    const linkCount = await prisma.link.count({
      where: { userId: user.userId },
    })

    // Free plan: unlimited (kita tidak batasi link)
    // Bisa ditambah logic berdasarkan plan di sini

    // Tentukan urutan link (taruh di paling bawah)
    const lastLink = await prisma.link.findFirst({
      where: { userId: user.userId },
      orderBy: { order: 'desc' },
    })

    const newLink = await prisma.link.create({
      data: {
        userId: user.userId,
        title: result.data.title,
        url: result.data.url,
        type: result.data.type,
        price: result.data.price,
        order: (lastLink?.order ?? -1) + 1,
      },
    })

    return NextResponse.json({ success: true, link: newLink }, { status: 201 })

  } catch (error) {
    console.error('Create link error:', error)
    return NextResponse.json({ error: 'Gagal membuat link' }, { status: 500 })
  }
}
