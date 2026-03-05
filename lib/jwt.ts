// lib/jwt.ts
import jwt from 'jsonwebtoken'
import type { Secret, SignOptions } from 'jsonwebtoken'
import { cookies } from 'next/headers'

export const runtime = 'nodejs'

// Jangan throw di top-level (INI KUNCINYA)
function getSecret(): Secret {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET is not defined')
  }
  return secret as Secret
}

const signOptions: SignOptions = {
  expiresIn: (process.env.JWT_EXPIRES_IN ?? '7d') as SignOptions['expiresIn'],
}

export interface JWTPayload {
  userId: string
  email: string
  username: string
  role: string
}

// Buat token baru
export function createToken(payload: JWTPayload): string {
  return jwt.sign(payload, getSecret(), signOptions)
}

// Verifikasi token
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, getSecret()) as JWTPayload
  } catch {
    return null
  }
}

// Ambil user dari cookie
export function getCurrentUser(): JWTPayload | null {
  try {
    const token = cookies().get('weiiz_token')?.value
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