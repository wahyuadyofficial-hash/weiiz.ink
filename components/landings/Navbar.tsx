'use client'

// components/landing/Navbar.tsx
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Logo } from './Logo'

const NAV_LINKS = [
  { label: 'Fitur',   href: '#fitur'    },
  { label: 'Harga',   href: '#harga'    },
  { label: 'Kreator', href: '#kreator'  },
  { label: 'FAQ',     href: '#faq'      },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-[#050c18]/90 backdrop-blur-xl border-b border-white/8 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Logo />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-150 font-medium">
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login"
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border border-white/15 hover:border-white/30 rounded-xl transition-all duration-150">
              Masuk
            </Link>
            <Link href="/register"
              className="px-4 py-2 text-sm font-semibold text-white rounded-xl transition-all duration-150 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #1d4ed8, #0ea5e9)', boxShadow: '0 0 20px rgba(59,130,246,0.35)' }}>
              Mulai Gratis
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(p => !p)}
            className="md:hidden text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition">
            {mobileOpen
              ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            }
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-80 border-t border-white/8' : 'max-h-0'}`}>
          <div className="px-5 py-4 space-y-1 bg-[#050c18]/95 backdrop-blur-xl">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition">
                {link.label}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <Link href="/login" className="text-center py-2.5 text-sm font-medium text-gray-300 border border-white/15 rounded-xl transition hover:bg-white/5">
                Masuk
              </Link>
              <Link href="/register" className="text-center py-2.5 text-sm font-semibold text-white rounded-xl"
                style={{ background: 'linear-gradient(135deg, #1d4ed8, #0ea5e9)' }}>
                Mulai Gratis
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
