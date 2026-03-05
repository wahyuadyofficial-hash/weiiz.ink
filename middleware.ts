// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

const PROTECTED_ROUTES = ['/dashboard', '/admin']
const AUTH_ROUTES = ['/login', '/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('weiiz_token')

  const isProtected = PROTECTED_ROUTES.some(r =>
    pathname.startsWith(r)
  )

  // Belum login → tidak boleh masuk dashboard / admin
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Sudah login → tidak boleh ke login / register
  const isAuth = AUTH_ROUTES.some(r =>
    pathname.startsWith(r)
  )

  if (isAuth && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}