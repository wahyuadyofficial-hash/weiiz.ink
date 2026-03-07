'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// ─────────────────────────────────────────────────────────────────
// Weiiz.ink — Login Page
// File: app/(auth)/login/page.tsx
// ─────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [mounted, setMounted]   = useState(false)

  useEffect(() => { setMounted(true) }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Login gagal')
      setLoading(false)
      return
    }

    window.location.href = '/dashboard'
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Fira+Code:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .wz-page {
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          background: #040d1a;
          display: flex;
          overflow: hidden;
        }

        .wz-grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(56, 189, 248, 0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.045) 1px, transparent 1px);
          background-size: 52px 52px;
          mask-image: radial-gradient(ellipse 80% 90% at 50% 50%, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 80% 90% at 50% 50%, black 30%, transparent 80%);
          pointer-events: none;
        }

        .wz-orb-1 {
          position: absolute; width: 520px; height: 520px;
          top: 50%; left: 50%;
          transform: translate(-50%, -56%);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(56, 189, 248, 0.13) 0%, transparent 65%);
          animation: wz-pulse 5s ease-in-out infinite;
          pointer-events: none;
        }
        .wz-orb-2 {
          position: absolute; width: 300px; height: 300px;
          bottom: 10%; right: 8%; border-radius: 50%;
          background: radial-gradient(circle, rgba(96, 165, 250, 0.09) 0%, transparent 70%);
          animation: wz-pulse 7s 1.5s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes wz-pulse {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -56%) scale(1); }
          50%       { opacity: 1;   transform: translate(-50%, -56%) scale(1.06); }
        }

        .wz-left {
          flex: 1;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 60px 56px; position: relative;
          overflow: hidden;
          border-right: 1px solid rgba(56, 189, 248, 0.1);
        }

        .wz-right {
          width: 500px; flex-shrink: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: flex-start;
          padding: 0;
          background: #071428; position: relative;
          overflow-y: auto;
        }
        .wz-right::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(56,189,248,0.4), transparent);
          z-index: 1;
        }

        /* ── Top register banner ── */
        .wz-register-banner {
          width: 100%;
          background: linear-gradient(135deg, rgba(56,189,248,0.08) 0%, rgba(14,165,233,0.05) 100%);
          border-bottom: 1px solid rgba(56,189,248,0.15);
          padding: 14px 52px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 12; flex-shrink: 0;
        }

        /* ── Form scroll area ── */
        .wz-form-scroll {
          width: 100%; padding: 40px 52px 48px;
          display: flex; flex-direction: column; align-items: center;
        }

        .wz-form-wrap {
          width: 100%; max-width: 364px;
          opacity: 0; transform: translateY(22px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .wz-form-wrap.wz-visible { opacity: 1; transform: translateY(0); }

        .wz-form-wrap > * {
          opacity: 0; transform: translateY(16px);
          animation: wz-fadeup 0.5s ease forwards;
        }
        .wz-form-wrap > *:nth-child(1) { animation-delay: 0.05s; }
        .wz-form-wrap > *:nth-child(2) { animation-delay: 0.12s; }
        .wz-form-wrap > *:nth-child(3) { animation-delay: 0.18s; }
        .wz-form-wrap > *:nth-child(4) { animation-delay: 0.24s; }
        .wz-form-wrap > *:nth-child(5) { animation-delay: 0.30s; }
        .wz-form-wrap > *:nth-child(6) { animation-delay: 0.36s; }
        .wz-form-wrap > *:nth-child(7) { animation-delay: 0.42s; }
        .wz-form-wrap > *:nth-child(8) { animation-delay: 0.48s; }

        @keyframes wz-fadeup {
          to { opacity: 1; transform: translateY(0); }
        }

        .wz-left-content > * {
          opacity: 0; transform: translateY(20px);
          animation: wz-fadeup 0.6s ease forwards;
        }
        .wz-left-content > *:nth-child(1) { animation-delay: 0.1s; }
        .wz-left-content > *:nth-child(2) { animation-delay: 0.2s; }
        .wz-left-content > *:nth-child(3) { animation-delay: 0.3s; }
        .wz-left-content > *:nth-child(4) { animation-delay: 0.4s; }
        .wz-left-content > *:nth-child(5) { animation-delay: 0.5s; }

        .wz-input-wrap {
          position: relative; display: flex; align-items: center;
        }
        .wz-input-icon {
          position: absolute; left: 14px; color: #3a5f80;
          pointer-events: none; display: flex; align-items: center;
          flex-shrink: 0; transition: color 0.2s; z-index: 1;
        }
        .wz-input-wrap:focus-within .wz-input-icon { color: #38bdf8; }

        .wz-input {
          width: 100%; background: #050f20;
          border: 1.5px solid rgba(56, 189, 248, 0.13);
          border-radius: 11px; padding: 13px 14px 13px 44px;
          color: #f0f9ff; font-size: 14px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 500; outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .wz-input::placeholder { color: #3a5f80; font-weight: 400; }
        .wz-input:focus {
          border-color: #38bdf8;
          box-shadow: 0 0 0 3.5px rgba(56, 189, 248, 0.14);
        }
        .wz-input-pass { padding-right: 48px; }

        .wz-pass-toggle {
          position: absolute; right: 14px;
          background: none; border: none; cursor: pointer;
          color: #3a5f80; padding: 4px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 6px;
          transition: color 0.15s, background 0.15s;
        }
        .wz-pass-toggle:hover { color: #7ba3c0; background: rgba(56, 189, 248, 0.08); }

        .wz-btn-submit {
          width: 100%; padding: 14px;
          background: linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%);
          color: #040d1a; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14.5px; font-weight: 800; border: none;
          border-radius: 11px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          gap: 9px; letter-spacing: -0.1px;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 24px rgba(56, 189, 248, 0.25);
        }
        .wz-btn-submit:hover:not(:disabled) {
          opacity: 0.92; transform: translateY(-1px);
          box-shadow: 0 8px 32px rgba(56, 189, 248, 0.38);
        }
        .wz-btn-submit:active:not(:disabled) { transform: translateY(0px); }
        .wz-btn-submit:disabled { opacity: 0.55; cursor: not-allowed; }

        .wz-btn-google {
          width: 100%; padding: 13px 14px;
          background: transparent;
          border: 1.5px solid rgba(56, 189, 248, 0.18);
          border-radius: 11px; color: #7ba3c0;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px; font-weight: 600; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          gap: 10px;
          transition: border-color 0.2s, background 0.2s, color 0.2s, transform 0.15s;
        }
        .wz-btn-google:hover {
          border-color: rgba(56, 189, 248, 0.38);
          background: rgba(56, 189, 248, 0.04);
          color: #f0f9ff; transform: translateY(-1px);
        }

        /* ── Prominent register CTA button ── */
        .wz-btn-register {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 22px; border-radius: 12px;
          background: linear-gradient(135deg, #38bdf8, #0ea5e9);
          color: #040d1a; font-size: 13.5px; font-weight: 800;
          text-decoration: none; white-space: nowrap;
          transition: all 0.2s; border: none; cursor: pointer;
          box-shadow: 0 4px 20px rgba(56,189,248,0.3);
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .wz-btn-register:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(56,189,248,0.45);
        }

        /* ── Register card at bottom ── */
        .wz-register-card {
          width: 100%; background: rgba(56,189,248,0.04);
          border: 1.5px solid rgba(56,189,248,0.14);
          border-radius: 16px; padding: 20px 22px;
          display: flex; align-items: center;
          justify-content: space-between; gap: 16;
          transition: border-color 0.2s, background 0.2s;
        }
        .wz-register-card:hover {
          border-color: rgba(56,189,248,0.28);
          background: rgba(56,189,248,0.07);
        }

        .wz-spinner {
          width: 17px; height: 17px;
          border: 2.5px solid rgba(4, 13, 26, 0.35);
          border-top-color: #040d1a; border-radius: 50%;
          animation: wz-spin 0.65s linear infinite; flex-shrink: 0;
        }
        @keyframes wz-spin { to { transform: rotate(360deg); } }

        .wz-error {
          background: rgba(248, 113, 113, 0.08);
          border: 1.5px solid rgba(248, 113, 113, 0.3);
          border-radius: 11px; padding: 12px 16px; color: #f87171;
          font-size: 13.5px; font-weight: 500;
          display: flex; align-items: flex-start; gap: 10px;
          line-height: 1.5; animation: wz-fadeup 0.3s ease forwards;
        }

        .wz-benefit {
          display: flex; align-items: center; gap: 12px;
          padding: 13px 18px;
          background: rgba(56, 189, 248, 0.05);
          border: 1px solid rgba(56, 189, 248, 0.12);
          border-radius: 12px;
          transition: border-color 0.2s, background 0.2s;
        }
        .wz-benefit:hover {
          border-color: rgba(56, 189, 248, 0.25);
          background: rgba(56, 189, 248, 0.08);
        }

        .wz-divider { display: flex; align-items: center; gap: 14px; }
        .wz-divider-line { flex: 1; height: 1px; background: rgba(56, 189, 248, 0.1); }

        .wz-logo-ring {
          position: relative; display: inline-flex;
          align-items: center; justify-content: center;
        }
        .wz-logo-ring::before {
          content: ''; position: absolute; inset: -12px; border-radius: 50%;
          background: radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%);
          animation: wz-ring-pulse 3s ease-in-out infinite;
        }
        @keyframes wz-ring-pulse {
          0%, 100% { transform: scale(1);   opacity: 0.7; }
          50%       { transform: scale(1.1); opacity: 1; }
        }

        .wz-label {
          display: block; font-size: 12.5px; font-weight: 600;
          color: #7ba3c0; margin-bottom: 7px; letter-spacing: 0.1px;
        }

        @media (max-width: 860px) {
          .wz-left { display: none; }
          .wz-right { width: 100%; }
          .wz-register-banner { padding: 12px 24px; }
          .wz-form-scroll { padding: 32px 24px 48px; }
        }
        @media (max-width: 420px) {
          .wz-form-scroll { padding: 28px 18px 44px; }
          .wz-register-banner { flex-direction: column; text-align: center; gap: 10px; }
        }
      `}</style>

      <div className="wz-page">

        {/* ══ KIRI — Visual Branding ══ */}
        <div className="wz-left">
          <div className="wz-grid-bg" />
          <div className="wz-orb-1" />
          <div className="wz-orb-2" />

          <div className="wz-left-content" style={{ position: 'relative', zIndex: 1, maxWidth: 400, width: '100%', textAlign: 'center' }}>
            <div className="wz-logo-ring" style={{ marginBottom: 28 }}>
              <div style={{ width: 72, height: 72, borderRadius: 20, background: 'linear-gradient(135deg, #38bdf8, #0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 34, color: '#040d1a', boxShadow: '0 0 40px rgba(56, 189, 248, 0.5), 0 0 80px rgba(56, 189, 248, 0.2)', position: 'relative', zIndex: 1 }}>W</div>
            </div>

            <div style={{ marginBottom: 8 }}>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 32, fontWeight: 900, color: '#f0f9ff', letterSpacing: '-1px' }}>
                Weiiz<span style={{ color: '#38bdf8' }}>.ink</span>
              </span>
            </div>

            <p style={{ fontSize: 14, color: '#7ba3c0', fontWeight: 500, letterSpacing: '0.4px', marginBottom: 44 }}>Where Bio Becomes Benefit</p>

            <h2 style={{ fontSize: 26, fontWeight: 900, color: '#f0f9ff', lineHeight: 1.2, marginBottom: 10, letterSpacing: '-0.7px' }}>
              Satu link.<br />
              <span style={{ background: 'linear-gradient(135deg, #38bdf8, #7dd3fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Ratusan peluang.
              </span>
            </h2>
            <p style={{ fontSize: 13.5, color: '#3a5f80', fontWeight: 500, marginBottom: 32, lineHeight: 1.65 }}>
              Monetisasi bio link kamu, jual produk digital, dan kelola pembayaran dari satu dashboard.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
              {[
                { icon: '✦', text: 'Gratis selamanya untuk mulai' },
                { icon: '✦', text: 'Monetisasi dalam hitungan menit' },
                { icon: '✦', text: '14.000+ creator sudah bergabung' },
              ].map((b, i) => (
                <div key={i} className="wz-benefit">
                  <span style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: 'rgba(56, 189, 248, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#38bdf8', fontWeight: 800 }}>{b.icon}</span>
                  <span style={{ fontSize: 13.5, color: '#7ba3c0', fontWeight: 500, textAlign: 'left' }}>{b.text}</span>
                </div>
              ))}
            </div>

            {/* Register CTA di panel kiri */}
            <Link href="/register" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '14px 24px', borderRadius: 14, background: 'linear-gradient(135deg,#38bdf8,#0ea5e9)', color: '#040d1a', fontWeight: 800, fontSize: 14.5, textDecoration: 'none', boxShadow: '0 6px 28px rgba(56,189,248,0.35)', transition: 'all .2s', marginBottom: 16 }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 36px rgba(56,189,248,0.5)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 28px rgba(56,189,248,0.35)'; }}
            >
              ✦ Daftar Gratis Sekarang
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>

            <div style={{ display: 'flex', gap: 0, background: 'rgba(56,189,248,0.04)', border: '1px solid rgba(56,189,248,0.1)', borderRadius: 14, overflow: 'hidden' }}>
              {[{ v: 'Rp 8,4M+', l: 'GMV' }, { v: '14K+', l: 'Creator' }, { v: '99,98%', l: 'Uptime' }].map((s, i) => (
                <div key={i} style={{ flex: 1, padding: '14px 8px', textAlign: 'center', borderRight: i < 2 ? '1px solid rgba(56,189,248,0.1)' : 'none' }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#f0f9ff', letterSpacing: '-0.5px' }}>{s.v}</div>
                  <div style={{ fontSize: 11, color: '#3a5f80', marginTop: 3, fontWeight: 500 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ KANAN — Login Form ══ */}
        <div className="wz-right">

          {/* ── Banner "Belum punya akun?" di atas form ── */}
          <div className="wz-register-banner">
            <div>
              <p style={{ fontSize: 13, color: '#7ba3c0', fontWeight: 500, marginBottom: 2 }}>Belum punya akun?</p>
              <p style={{ fontSize: 12, color: '#3a5f80', fontWeight: 400 }}>Gratis selamanya · Setup 2 menit</p>
            </div>
            <Link href="/register" className="wz-btn-register">
              Daftar Gratis
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>

          {/* ── Form Area ── */}
          <div className="wz-form-scroll">
            <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div className={`wz-form-wrap ${mounted ? 'wz-visible' : ''}`}>

              {/* Header */}
              <div style={{ marginBottom: 28 }}>
                <h1 style={{ fontSize: 24, fontWeight: 900, color: '#f0f9ff', letterSpacing: '-0.6px', marginBottom: 6, lineHeight: 1.2 }}>
                  Selamat Datang Kembali 👋
                </h1>
                <p style={{ fontSize: 14, color: '#7ba3c0', fontWeight: 500 }}>Masuk ke dashboard kamu</p>
              </div>

              {/* Error */}
              {error && (
                <div className="wz-error" style={{ marginBottom: 18 }}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                    <circle cx="10" cy="10" r="9" stroke="#f87171" strokeWidth="1.5"/>
                    <path d="M10 6v4M10 13.5v.5" stroke="#f87171" strokeWidth="1.75" strokeLinecap="round"/>
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 0 }} noValidate>

                {/* Email */}
                <div style={{ marginBottom: 16 }}>
                  <label className="wz-label" htmlFor="wz-email">Email</label>
                  <div className="wz-input-wrap">
                    <span className="wz-input-icon">
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <rect x="2" y="4" width="16" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <input id="wz-email" type="email" placeholder="nama@email.com" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" className="wz-input" />
                  </div>
                </div>

                {/* Password */}
                <div style={{ marginBottom: 6 }}>
                  <label className="wz-label" htmlFor="wz-password">Password</label>
                  <div className="wz-input-wrap">
                    <span className="wz-input-icon">
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <rect x="4" y="8" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M7 8V6a3 3 0 116 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <circle cx="10" cy="13" r="1.25" fill="currentColor"/>
                      </svg>
                    </span>
                    <input id="wz-password" type={showPass ? 'text' : 'password'} placeholder="Min 8 karakter" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" className="wz-input wz-input-pass" />
                    <button type="button" className="wz-pass-toggle" onClick={() => setShowPass(v => !v)} aria-label={showPass ? 'Sembunyikan password' : 'Tampilkan password'}>
                      {showPass ? (
                        <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><path d="M3 3l14 14M8.5 8.6A3 3 0 0011.4 11.5M6.3 5.4C4.5 6.5 3 8.1 2 10c1.9 3.7 5.5 6 8 6 1.4 0 2.8-.5 4-1.3M9 4.1C9.3 4 9.7 4 10 4c2.5 0 6.1 2.3 8 6-0.5 1-1.3 2-2.2 2.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                      ) : (
                        <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><path d="M2 10c1.9-3.7 5.5-6 8-6s6.1 2.3 8 6c-1.9 3.7-5.5 6-8 6s-6.1-2.3-8-6z" stroke="currentColor" strokeWidth="1.4"/><circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4"/></svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot */}
                <div style={{ textAlign: 'right', marginBottom: 24 }}>
                  <Link href="/forgot-password" style={{ fontSize: 12.5, color: '#38bdf8', fontWeight: 600, textDecoration: 'none', transition: 'opacity 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >Lupa password?</Link>
                </div>

                {/* Submit */}
                <button type="submit" className="wz-btn-submit" disabled={loading} style={{ marginBottom: 20 }}>
                  {loading ? (
                    <><div className="wz-spinner" /><span>Memproses...</span></>
                  ) : (
                    <><span>Masuk ke Dashboard</span><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg></>
                  )}
                </button>

                {/* Divider */}
                <div className="wz-divider" style={{ marginBottom: 20 }}>
                  <div className="wz-divider-line" />
                  <span style={{ fontSize: 12, color: '#3a5f80', fontWeight: 500, whiteSpace: 'nowrap' }}>atau lanjutkan dengan</span>
                  <div className="wz-divider-line" />
                </div>

                {/* Google */}
                <button type="button" className="wz-btn-google" onClick={() => { window.location.href = '/api/auth/google' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Lanjutkan dengan Google
                </button>
              </form>

              {/* ── Register Card — menonjol di bawah form ── */}
              <div style={{ marginTop: 28 }}>
                <div className="wz-register-card">
                  <div>
                    <p style={{ fontSize: 14, color: '#f0f9ff', fontWeight: 700, marginBottom: 3 }}>Belum punya akun? 🚀</p>
                    <p style={{ fontSize: 12.5, color: '#3a5f80', fontWeight: 500, lineHeight: 1.5 }}>Daftar gratis, tidak perlu kartu kredit. Mulai monetisasi hari ini.</p>
                  </div>
                  <Link href="/register" style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 10, background: 'linear-gradient(135deg,#38bdf8,#0ea5e9)', color: '#040d1a', fontSize: 13, fontWeight: 800, textDecoration: 'none', whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(56,189,248,0.3)', transition: 'all .2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; }}
                  >
                    Daftar →
                  </Link>
                </div>
              </div>

              {/* Disclaimer */}
              <p style={{ textAlign: 'center', marginTop: 20, fontSize: 11.5, color: '#1e3a5f', lineHeight: 1.6 }}>
                Dengan masuk, kamu menyetujui{' '}
                <Link href="/terms" style={{ color: '#3a5f80', textDecoration: 'underline', textUnderlineOffset: 2 }}>Terms</Link>
                {' '}dan{' '}
                <Link href="/privacy" style={{ color: '#3a5f80', textDecoration: 'underline', textUnderlineOffset: 2 }}>Privacy Policy</Link>
                {' '}kami.
              </p>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
