// app/api/admin/users/route.ts
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/jwt'

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const page    = parseInt(searchParams.get('page')   ?? '1')
    const limit   = parseInt(searchParams.get('limit')  ?? '20')
    const search  = searchParams.get('search')  ?? ''
    const plan    = searchParams.get('plan')    ?? ''
    const status  = searchParams.get('status')  ?? ''

    // TODO: ganti dengan query DB asli
    // const where = {
    //   ...(search && {
    //     OR: [
    //       { name:     { contains: search, mode: 'insensitive' } },
    //       { email:    { contains: search, mode: 'insensitive' } },
    //       { username: { contains: search, mode: 'insensitive' } },
    //     ]
    //   }),
    //   ...(plan   && { plan }),
    //   ...(status && { status }),
    // }
    // const [users, total] = await Promise.all([
    //   prisma.user.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: { createdAt: 'desc' } }),
    //   prisma.user.count({ where }),
    // ])

    const mockUsers = [
      { id: '1', name: 'Rina Melati',   email: 'rina@email.com',   username: 'rinamelati',  plan: 'ELITE',   gmvTotal: 84200000, status: 'active'    },
      { id: '2', name: 'Dimas Putra',   email: 'dimas@email.com',  username: 'dimasputra',  plan: 'PRO',     gmvTotal: 52100000, status: 'active'    },
      { id: '3', name: 'Sari Dewi',     email: 'sari@email.com',   username: 'saridewi',    plan: 'PRO',     gmvTotal: 41000000, status: 'active'    },
      { id: '4', name: 'Budi Santoso',  email: 'budi@email.com',   username: 'budi',        plan: 'STARTER', gmvTotal: 18750000, status: 'active'    },
      { id: '5', name: 'Ayu Lestari',   email: 'ayu@email.com',    username: 'ayulestari',  plan: 'PRO',     gmvTotal: 29300000, status: 'active'    },
      { id: '6', name: 'Rudi Hartono',  email: 'rudi@email.com',   username: 'rudihartono', plan: 'FREE',    gmvTotal: 0,        status: 'suspended' },
      { id: '7', name: 'Citra Wulan',   email: 'citra@email.com',  username: 'citrawulan',  plan: 'STARTER', gmvTotal: 5200000,  status: 'active'    },
      { id: '8', name: 'Hendra Wijaya', email: 'hendra@email.com', username: 'hendra',      plan: 'FREE',    gmvTotal: 0,        status: 'active'    },
    ]

    // Filter mock data
    let filtered = mockUsers
    if (search) {
      const q = search.toLowerCase()
      filtered = filtered.filter(u =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q)
      )
    }
    if (plan)   filtered = filtered.filter(u => u.plan === plan)
    if (status) filtered = filtered.filter(u => u.status === status)

    const total      = filtered.length
    const totalPages = Math.ceil(total / limit)
    const users      = filtered.slice((page - 1) * limit, page * limit)

    return NextResponse.json({ users, total, page, totalPages })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
