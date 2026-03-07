// app/api/auth/[...nextauth]/route.ts
// ─────────────────────────────────────────
// NextAuth v4 — Credentials + Google OAuth
// ─────────────────────────────────────────

import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import prisma from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7, // 7 hari
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  providers: [
    // ── Email + Password ──────────────────────────────────────
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email dan password wajib diisi')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase().trim() },
        })

        if (!user) {
          throw new Error('Email atau password salah')
        }

        if (!user.password) {
          // User ini daftar via Google, tidak punya password
          throw new Error('Akun ini terdaftar via Google. Gunakan tombol "Lanjutkan dengan Google"')
        }

        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) {
          throw new Error('Email atau password salah')
        }

        return {
          id:       user.id,
          name:     user.name,
          email:    user.email,
          username: user.username,
          role:     user.role,
          avatar:   user.avatar ?? null,
        }
      },
    }),

    // ── Google OAuth ─────────────────────────────────────────
    GoogleProvider({
      clientId:     process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],

  callbacks: {
    // Dipanggil saat user sign in via Google
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          const email = user.email!
          const existing = await prisma.user.findUnique({ where: { email } })

          if (!existing) {
            // Buat username dari email (sebelum @)
            let baseUsername = email.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '')
            if (baseUsername.length < 3) baseUsername = baseUsername + '_user'

            // Pastikan username unik
            let username = baseUsername
            let counter = 1
            while (await prisma.user.findUnique({ where: { username } })) {
              username = `${baseUsername}${counter++}`
            }

            // Buat akun baru via Google
            const newUser = await prisma.user.create({
              data: {
                name:          user.name ?? email.split('@')[0],
                email,
                username,
                googleId:      account.providerAccountId,
                emailVerified: true,
                avatar:        user.image ?? null,
              },
            })

            // Buat subscription FREE
            await prisma.subscription.create({
              data: { userId: newUser.id, plan: 'FREE', txFee: 5.0 },
            })

            // Set id agar masuk ke token
            user.id = newUser.id
          } else {
            // Update googleId jika belum ada
            if (!existing.googleId) {
              await prisma.user.update({
                where: { id: existing.id },
                data: { googleId: account.providerAccountId },
              })
            }
            user.id = existing.id
          }

          return true
        } catch (error) {
          console.error('Google signIn error:', error)
          return false
        }
      }

      return true
    },

    // Isi data ke dalam JWT token
    async jwt({ token, user, account }) {
      if (user) {
        token.userId   = user.id
        token.username = (user as any).username
        token.role     = (user as any).role
        token.avatar   = (user as any).avatar
      }

      // Kalau Google OAuth, ambil data dari database
      if (account?.provider === 'google' && token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: { id: true, username: true, role: true, avatar: true },
        })
        if (dbUser) {
          token.userId   = dbUser.id
          token.username = dbUser.username
          token.role     = dbUser.role
          token.avatar   = dbUser.avatar
        }
      }

      return token
    },

    // Isi data ke dalam session
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id       = token.userId
        ;(session.user as any).username = token.username
        ;(session.user as any).role    = token.role
        ;(session.user as any).avatar  = token.avatar
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
