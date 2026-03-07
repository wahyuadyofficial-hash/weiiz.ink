import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  // ── Adapter (optional, untuk persist session ke DB) ──────────
  // Kalau pakai JWT strategy, adapter tidak wajib.
  // Uncomment baris di bawah kalau ingin session disimpan ke DB:
  // adapter: PrismaAdapter(prisma) as any,

  // ── Providers ─────────────────────────────────────────────────
  providers: [

    // ── 1. Credentials (email + password) ──
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email'    },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email dan password wajib diisi')
        }

        // Cari user di database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase().trim() },
          select: {
            id:       true,
            email:    true,
            name:     true,
            username: true,
            password: true,
            plan:     true,
            role:     true,
          },
        })

        if (!user) {
          throw new Error('Email tidak terdaftar')
        }

        if (!user.password) {
          throw new Error('Akun ini menggunakan login Google. Gunakan tombol Google.')
        }

        // Verifikasi password
        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) {
          throw new Error('Password salah')
        }

        // Return object yang akan disimpan ke JWT
        return {
          id:       user.id,
          email:    user.email,
          name:     user.name,
          username: user.username,
          plan:     user.plan,
          role:     user.role,
        }
      },
    }),

    // ── 2. Google OAuth ──
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

  // ── Session & JWT Strategy ─────────────────────────────────────
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 hari
  },

  // ── JWT Config ────────────────────────────────────────────────
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },

  // ── Callbacks ────────────────────────────────────────────────
  callbacks: {
    // Tambahkan custom fields ke JWT token
    async jwt({ token, user, account, trigger, session }) {
      if (user) {
        token.id       = user.id
        token.username = (user as any).username
        token.plan     = (user as any).plan
        token.role     = (user as any).role
      }

      // Handle Google sign-in: cari atau buat user di DB
      if (account?.provider === 'google' && token.email) {
        let dbUser = await prisma.user.findUnique({
          where: { email: token.email },
        })

        if (!dbUser) {
          // Auto-create user baru untuk Google login
          const baseUsername = token.email.split('@')[0]
            .toLowerCase()
            .replace(/[^a-z0-9_]/g, '')
            .slice(0, 20)

          // Pastikan username unik
          let username = baseUsername
          let counter  = 1
          while (await prisma.user.findUnique({ where: { username } })) {
            username = `${baseUsername}${counter++}`
          }

          dbUser = await prisma.user.create({
            data: {
              email:    token.email,
              name:     token.name ?? 'User',
              username,
              password: null, // Google login tidak punya password
              plan:     'FREE',
              role:     'USER',
            },
          })
        }

        token.id       = dbUser.id
        token.username = dbUser.username
        token.plan     = dbUser.plan
        token.role     = dbUser.role
      }

      // Handle session update (jika dipanggil update())
      if (trigger === 'update' && session) {
        token = { ...token, ...session }
      }

      return token
    },

    // Expose token ke client via useSession()
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id       = token.id as string
        session.user.username = token.username as string
        session.user.plan     = token.plan as string
        session.user.role     = token.role as string
      }
      return session
    },

    // Redirect setelah login
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/'))  return `${baseUrl}${url}`
      if (url.startsWith(baseUrl)) return url
      return `${baseUrl}/dashboard`
    },
  },

  // ── Pages (custom login page) ─────────────────────────────────
  pages: {
    signIn:  '/login',
    signOut: '/login',
    error:   '/login',   // error query: ?error=...
  },

  // ── Secret ───────────────────────────────────────────────────
  secret: process.env.NEXTAUTH_SECRET,

  // ── Debug (matikan di production) ────────────────────────────
  debug: process.env.NODE_ENV === 'development',

  // ── Events (optional logging) ────────────────────────────────
  events: {
    async signIn({ user }) {
      console.log(`[Auth] User signed in: ${user.email}`)
    },
    async signOut({ token }) {
      console.log(`[Auth] User signed out: ${token?.email}`)
    },
  },
}