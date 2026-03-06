'use client'

// components/dashboard/DashboardSidebar.tsx
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

type Plan = 'FREE' | 'STARTER' | 'PRO' | 'ELITE'

interface User {
  name: string
  username: string
  avatar?: string
  plan: Plan
}

interface Props {
  user: User
}

const navItems = [
  { label: 'Overview',        href: '/dashboard',              icon: '⊞' },
  { label: 'Bio & Links',     href: '/dashboard/links',        icon: '🔗' },
  { label: 'Produk Digital',  href: '/dashboard/products',     icon: '📦' },
  { label: 'Analytics',       href: '/dashboard/analytics',    icon: '📊' },
  { label: 'Transaksi',       href: '/dashboard/transactions', icon: '💳' },
  { label: 'Withdrawal',      href: '/dashboard/withdrawal',   icon: '🏦' },
  { label: 'AI Tools',        href: '/dashboard/ai-tools',     icon: '🤖' },
  { label: 'Settings',        href: '/dashboard/settings',     icon: '⚙️' },
]

const planBadge: Record<Plan, { label: string; className: string }> = {
  FREE:    { label: 'FREE',      className: 'bg-gray-700 text-gray-300' },
  STARTER: { label: 'STARTER',   className: 'bg-blue-900 text-blue-300' },
  PRO:     { label: '✦ PRO',     className: 'bg-blue-500 text-white' },
  ELITE:   { label: '✦ ELITE',   className: 'bg-purple-700 text-purple-200' },
}

export default function DashboardSidebar({ user }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const badge = planBadge[user.plan] ?? planBadge.FREE

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <Link href="/dashboard" className="text-white font-bold text-xl tracking-tight">
          Weiiz<span className="text-blue-400">.ink</span>
        </Link>
      </div>

      {/* User info */}
      <div className="px-4 py-4 border-b border-white/10 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold overflow-hidden flex-shrink-0">
          {user.avatar
            ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            : user.name.charAt(0).toUpperCase()
          }
        </div>
        <div className="min-w-0">
          <p className="text-white text-sm font-medium truncate">{user.name}</p>
          <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
            <span className="text-gray-400 text-xs truncate">@{user.username}</span>
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${badge.className}`}>
              {badge.label}
            </span>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 relative
                    ${active
                      ? 'text-blue-400 bg-blue-500/10 border-l-[2.5px] border-blue-500 pl-[10px]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border-l-[2.5px] border-transparent pl-[10px]'
                    }
                  `}
                >
                  <span className="text-base w-5 text-center flex-shrink-0">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
        >
          <span className="text-base w-5 text-center">🚪</span>
          <span className="font-medium">Keluar</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="hidden md:flex flex-col w-60 fixed top-0 left-0 h-screen bg-[#111318] border-r border-white/10 z-40">
        <SidebarContent />
      </aside>

      {/* ── MOBILE TOPBAR ── */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-[#0d1117]/80 backdrop-blur-md border-b border-white/10">
        <Link href="/dashboard" className="text-white font-bold text-lg tracking-tight">
          Weiiz<span className="text-blue-400">.ink</span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="text-gray-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
          aria-label="Open menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </header>

      {/* ── MOBILE SIDEBAR DRAWER ── */}
      {/* Overlay */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-screen w-64 z-50 bg-[#111318] border-r border-white/10 flex flex-col transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close button */}
        <div className="flex justify-end px-4 pt-4">
          <button
            onClick={() => setMobileOpen(false)}
            className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <SidebarContent />
      </aside>

      {/* Mobile top padding spacer */}
      <div className="md:hidden h-14" />
    </>
  )
}