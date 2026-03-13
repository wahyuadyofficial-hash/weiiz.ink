'use client'

// components/admin/AdminSidebar.tsx
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const navItems = [
  { label: 'Overview',            href: '/admin',                  icon: '🏠' },
  { label: 'Kelola User',         href: '/admin/users',            icon: '👥' },
  { label: 'Withdrawal Request',  href: '/admin/withdrawals',      icon: '💸', badgeKey: 'pending' },
  { label: 'Konfigurasi Harga',   href: '/admin/pricing',          icon: '💰' },
  { label: 'Global Analytics',    href: '/admin/analytics',        icon: '📈' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [pendingCount, setPendingCount] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    fetch('/api/admin/withdrawals/pending-count')
      .then(r => r.json())
      .then(d => setPendingCount(d.count ?? 0))
      .catch(() => {})
  }, [])

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10 flex items-center gap-2">
        <span className="text-white font-bold text-lg tracking-tight">
          Weiiz<span className="text-red-400">.ink</span>
        </span>
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
          ADMIN
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto">
        <ul className="space-y-0.5">
          {navItems.map(item => {
            const active = isActive(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 border-l-[2.5px]
                    ${active
                      ? 'text-red-400 bg-red-500/10 border-red-500'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border-transparent'
                    }`}
                >
                  <span className="text-base w-5 text-center">{item.icon}</span>
                  <span className="font-medium flex-1">{item.label}</span>
                  {item.badgeKey === 'pending' && pendingCount > 0 && (
                    <span className="text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                      {pendingCount}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Back to Dashboard */}
      <div className="px-3 py-4 border-t border-white/10">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-white hover:bg-white/5 transition"
        >
          <span className="text-base w-5 text-center">←</span>
          <span className="font-medium">Kembali ke Dashboard</span>
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:flex flex-col w-56 fixed top-0 left-0 h-screen bg-[#0d1117] border-r border-white/10 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile topbar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-[#0d1117]/90 backdrop-blur-md border-b border-white/10">
        <span className="text-white font-bold text-base">
          Weiiz<span className="text-red-400">.ink</span>
          <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">ADMIN</span>
        </span>
        <button onClick={() => setMobileOpen(true)} className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </header>

      {/* Mobile overlay */}
      <div onClick={() => setMobileOpen(false)}
        className={`md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} />

      {/* Mobile drawer */}
      <aside className={`md:hidden fixed top-0 left-0 h-screen w-56 z-50 bg-[#0d1117] border-r border-white/10 flex flex-col transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-end px-4 pt-4">
          <button onClick={() => setMobileOpen(false)} className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition">✕</button>
        </div>
        <SidebarContent />
      </aside>

      <div className="md:hidden h-14" />
    </>
  )
}
