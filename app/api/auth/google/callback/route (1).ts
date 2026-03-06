// app/api/auth/google/callback/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { signJwt } from '@/lib/jwt'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    if (error || !code) {
      return NextResponse.redirect(new URL('/login?error=google_cancelled', request.url))
    }

    const baseUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3000'

    // 1. Tukar code dengan access token
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

    // 2. Ambil info user dari Google
    const profileRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    })

    if (!profileRes.ok) {
      return NextResponse.redirect(new URL('/login?error=profile_failed', request.url))
    }

    const profile = await profileRes.json()
    const { email, name, picture, id: googleId } = profile

    if (!email) {
      return NextResponse.redirect(new URL('/login?error=no_email', request.url))
    }

    // 3. Cari atau buat user di database
    let user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      // Buat username dari email
      const baseUsername = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '')
      let username = baseUsername
      let counter = 1
      while (await prisma.user.findUnique({ where: { username } })) {
        username = `${baseUsername}${counter++}`
      }

      user = await prisma.user.create({
        data: {
          email,
          name,
          username,
          avatar: picture,
          googleId,
          plan: 'FREE',
          password: '', // tidak pakai password untuk OAuth
        },
      })
    } else {
      // Update avatar & googleId kalau belum ada
      if (!user.googleId) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { googleId, avatar: picture ?? user.avatar },
        })
      }
    }

    // 4. Buat JWT token
    const token = signJwt({ id: user.id, email: user.email, role: user.role ?? 'USER' })

    // 5. Set cookie dan redirect ke dashboard
    const response = NextResponse.redirect(new URL('/dashboard', request.url))
    response.cookies.set('weiiz_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 hari
      path: '/',
    })

    return response
  } catch (err) {
    console.error('Google OAuth error:', err)
    return NextResponse.redirect(new URL('/login?error=server_error', request.url))
  }
}
