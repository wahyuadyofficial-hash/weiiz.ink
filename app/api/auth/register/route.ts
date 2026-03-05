// app/api/auth/register/route.ts
// ─────────────────────────────────────────
// API Register User Baru
// POST /api/auth/register
// ─────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import prisma from '@/lib/prisma'
import { createToken, setAuthCookie } from '@/lib/jwt'
import { sendVerificationEmail } from '@/lib/email'

// Validasi input dengan Zod
const RegisterSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  username: z
    .string()
    .min(3, 'Username minimal 3 karakter')
    .max(30, 'Username maksimal 30 karakter')
    .regex(/^[a-z0-9_]+$/, 'Username hanya huruf kecil, angka, dan underscore'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // 1. Validasi input
    const result = RegisterSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    const { name, email, username, password } = result.data

    // 2. Cek email sudah dipakai
    const emailExists = await prisma.user.findUnique({ where: { email } })
    if (emailExists) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 409 }
      )
    }

    // 3. Cek username sudah dipakai
    const usernameExists = await prisma.user.findUnique({ where: { username } })
    if (usernameExists) {
      return NextResponse.json(
        { error: 'Username sudah dipakai, coba yang lain' },
        { status: 409 }
      )
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // 5. Buat token verifikasi email
    const verifyToken = crypto.randomBytes(32).toString('hex')

    // 6. Simpan user ke database (dalam 1 transaksi)
    const user = await prisma.$transaction(async (tx) => {
      // Buat user
      const newUser = await tx.user.create({
        data: {
          name,
          email,
          username: username.toLowerCase(),
          password: hashedPassword,
          verifyToken,
        },
      })

      // Buat subscription FREE otomatis
      await tx.subscription.create({
        data: {
          userId: newUser.id,
          plan: 'FREE',
          txFee: 5.0,
        },
      })

      return newUser
    })

    // 7. Kirim email verifikasi (tidak block response)
    sendVerificationEmail(email, name, verifyToken).catch(console.error)

    // 8. Buat JWT token dan set cookie
    const token = createToken({
      userId: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    })

    const response = NextResponse.json({
      success: true,
      message: 'Akun berhasil dibuat! Cek email untuk verifikasi.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    })

    // Set cookie di response
    response.cookies.set('weiiz_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return response

  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server, coba lagi' },
      { status: 500 }
    )
  }
}
