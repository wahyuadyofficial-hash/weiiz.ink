// lib/jwt.ts
// ─────────────────────────────────────────
// JWT Authentication Helpers
// ─────────────────────────────────────────

import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const SECRET = process.env.JWT_SECRET!
const EXPIRES = process.env.JWT_EXPIRES_IN || '7d'

export interface JWTPayload {
  userId: string
  email: string
  username: string
  role: string
}

// Buat token baru
export function createToken(payload: JWTPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES })
}

// Verifikasi token
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, SECRET) as JWTPayload
  } catch {
    return null
  }
}

// Ambil user dari cookie (untuk Server Components)
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
    maxAge: 60 * 60 * 24 * 7, // 7 hari
    path: '/',
  })
}

// Hapus cookie saat logout
export function clearAuthCookie() {
  cookies().delete('weiiz_token')
}
