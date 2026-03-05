// middleware.ts
// ─────────────────────────────────────────
// Next.js Middleware — Proteksi Route
// Berjalan sebelum setiap request
// ─────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './lib/jwt'

// Route yang butuh login
const PROTECTED_ROUTES = ['/dashboard', '/admin']

// Route yang hanya untuk admin
const ADMIN_ROUTES = ['/admin']

// Route yang tidak boleh diakses setelah login
const AUTH_ROUTES = ['/login', '/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('weiiz_token')?.value

  // Decode token
  const user = token ? verifyToken(token) : null

  // Kalau akses halaman dashboard/admin tanpa login → redirect ke login
  const isProtected = PROTECTED_ROUTES.some(r => pathname.startsWith(r))
  if (isProtected && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Kalau akses admin tapi bukan admin → redirect ke dashboard
  const isAdmin = ADMIN_ROUTES.some(r => pathname.startsWith(r))
  if (isAdmin && user?.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Kalau sudah login tapi akses halaman auth → redirect ke dashboard
  const isAuth = AUTH_ROUTES.some(r => pathname.startsWith(r))
  if (isAuth && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  // Jalankan middleware di semua route kecuali static files dan API
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
