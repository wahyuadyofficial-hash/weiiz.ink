// lib/jwt.ts
// ─────────────────────────────────────────
// JWT Authentication Helpers (Node.js only)
// ─────────────────────────────────────────

import jwt from 'jsonwebtoken'
import type { Secret, SignOptions } from 'jsonwebtoken'
import { cookies } from 'next/headers'

// Pastikan Node.js runtime (bukan Edge)
export const runtime = 'nodejs'

// ⛔ Kunci type secara eksplisit
const SECRET: Secret = process.env.JWT_SECRET as Secret

const signOptions: SignOptions = {
  expiresIn: (process.env.JWT_EXPIRES_IN ?? '7d') as SignOptions['expiresIn'],
}

if (!SECRET) {
  throw new Error('JWT_SECRET is not defined')
}

export interface JWTPayload {
  userId: string
  email: string
  username: string
  role: string
}

// Buat token baru
export function createToken(payload: JWTPayload): string {
  return jwt.sign(payload, SECRET, signOptions)
}

// Verifikasi token
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, SECRET) as JWTPayload
  } catch {
    return null
  }
}

// Ambil user dari cookie
export function getCurrentUser(): JWTPayload | null {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('weiiz_token')?.value
    if (!token) return null
    return verifyToken(token)
  } catch {
    return null
  }
}

// Set cookie setelah login
export function setAuthCookie(token: string) {
  cookies().set('weiiz_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
}

// Hapus cookie saat logout
export function clearAuthCookie() {
  cookies().delete('weiiz_token')
}