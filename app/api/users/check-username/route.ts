// app/api/users/check-username/route.ts
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const username = searchParams.get('username')?.toLowerCase().trim()

    if (!username) return NextResponse.json({ available: false, error: 'Username wajib diisi' }, { status: 400 })
    if (username.length < 3) return NextResponse.json({ available: false, error: 'Username minimal 3 karakter' }, { status: 400 })
    if (username.length > 30) return NextResponse.json({ available: false, error: 'Username maksimal 30 karakter' }, { status: 400 })
    if (!/^[a-z0-9_]+$/.test(username)) return NextResponse.json({ available: false, error: 'Hanya huruf kecil, angka, dan underscore' }, { status: 400 })

    const RESERVED = ['admin','administrator','weiiz','weiizink','support','help','api','login','register','dashboard','settings','profile','terms','privacy','about','contact','blog','careers']
    if (RESERVED.includes(username)) return NextResponse.json({ available: false })

    const existing = await prisma.user.findUnique({ where: { username }, select: { id: true } })
    return NextResponse.json({ available: !existing })

  } catch (error) {
    console.error('Check username error:', error)
    return NextResponse.json({ available: false, error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}
