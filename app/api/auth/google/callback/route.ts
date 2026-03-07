import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { createToken } from '@/lib/jwt'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    if (error || !code) {
      return NextResponse.redirect(new URL('/login?error=google_cancelled', request.url))
    }

    const baseUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3000'

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id:     process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri:  `${baseUrl}/api/auth/google/callback`,
        grant_type:    'authorization_code',
      }),
    })

    if (!tokenRes.ok) {
      return NextResponse.redirect(new URL('/login?error=token_failed', request.url))
    }

    const { access_token } = await tokenRes.json()

    const profileRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    })

    if (!profileRes.ok) {
      return NextResponse.redirect(new URL('/login?error=profile_failed', request.url))
    }

    const { email, name, picture, id: googleId } = await profileRes.json()

    if (!email) {
      return NextResponse.redirect(new URL('/login?error=no_email', request.url))
    }

    let user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      const baseUsername = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '')
      let username = baseUsername
      let counter = 1
      while (await prisma.user.findUnique({ where: { username } })) {
        username = `${baseUsername}${counter++}`
      }
      user = await prisma.user.create({
        data: { email, name, username, avatar: picture, googleId, password: '', plan: 'FREE' },
      })
    } else if (!user.googleId) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { googleId, avatar: picture ?? user.avatar },
      })
    }

    const token = createToken({
      userId: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    })

    const response = NextResponse.redirect(new URL('/dashboard', request.url))
    response.cookies.set('weiiz_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return response
  } catch (err) {
    console.error('Google OAuth error:', err)
    return NextResponse.redirect(new URL('/login?error=server_error', request.url))
  }
}