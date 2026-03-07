'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [showPass, setShowPass] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
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

      // Sukses — cookie weiiz_token sudah di-set oleh API
      // Gunakan router.push, BUKAN window.location.href
      router.push('/dashboard')
      router.refresh()

    } catch {
      setError('Koneksi bermasalah, coba lagi')
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Fira+Code:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        @keyframes wzspin{to{transform:rotate(360deg)}}
        @keyframes wzup{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes wzfloat{0%,100%{transform:translate(-50%,-55%) scale(1)}50%{transform:translate(-50%,-55%) scale(1.05)}}
        @keyframes wzpulse{0%,100%{opacity:.55;transform:scale(1)}50%{opacity:1;transform:scale(1.07)}}
        .wzpage{font-family:'Plus Jakarta Sans',sans-serif;min-height:100vh;background:#040d1a;display:flex}
        .wzgrid{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(56,189,248,.042) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,.042) 1px,transparent 1px);background-size:52px 52px;mask-image:radial-gradient(ellipse 90% 90% at 50% 50%,black 20%,transparent 75%);-webkit-mask-image:radial-gradient(ellipse 90% 90% at 50% 50%,black 20%,transparent 75%)}
        .wzorb{position:absolute;width:520px;height:520px;top:50%;left:50%;border-radius:50%;background:radial-gradient(circle,rgba(56,189,248,.11) 0%,transparent 65%);animation:wzfloat 7s ease-in-out infinite;pointer-events:none}
        .wzleft{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 52px;position:relative;overflow:hidden;border-right:1px solid rgba(56,189,248,.09)}
        .wzleft-c>*{opacity:0;animation:wzup .6s ease forwards}
        .wzleft-c>*:nth-child(1){animation-delay:.08s}.wzleft-c>*:nth-child(2){animation-delay:.16s}.wzleft-c>*:nth-child(3){animation-delay:.24s}.wzleft-c>*:nth-child(4){animation-delay:.32s}.wzleft-c>*:nth-child(5){animation-delay:.40s}
        .wzright{width:480px;flex-shrink:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:48px 52px;background:#071428;position:relative;overflow:hidden}
        .wzright::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(56,189,248,.35),transparent)}
        .wzform-c>*{opacity:0;animation:wzup .5s ease forwards}
        .wzform-c>*:nth-child(1){animation-delay:.04s}.wzform-c>*:nth-child(2){animation-delay:.10s}.wzform-c>*:nth-child(3){animation-delay:.16s}.wzform-c>*:nth-child(4){animation-delay:.22s}.wzform-c>*:nth-child(5){animation-delay:.28s}.wzform-c>*:nth-child(6){animation-delay:.34s}.wzform-c>*:nth-child(7){animation-delay:.40s}.wzform-c>*:nth-child(8){animation-delay:.46s}
        .wzlabel{display:block;font-size:12.5px;font-weight:600;color:#7ba3c0;letter-spacing:.1px;margin-bottom:7px}
        .wzrow{position:relative;display:flex;align-items:center}
        .wzicon-l{position:absolute;left:14px;color:#3a5f80;pointer-events:none;display:flex;align-items:center;transition:color .2s;z-index:1}
        .wzrow:focus-within .wzicon-l{color:#38bdf8}
        .wzinput{width:100%;background:#050f20;border:1.5px solid rgba(56,189,248,.12);border-radius:11px;padding:12px 14px 12px 43px;color:#f0f9ff;font-size:14px;font-family:'Plus Jakarta Sans',sans-serif;font-weight:500;outline:none;transition:border-color .2s,box-shadow .2s}
        .wzinput::placeholder{color:#3a5f80;font-weight:400}
        .wzinput:focus{border-color:#38bdf8;box-shadow:0 0 0 3px rgba(56,189,248,.13)}
        .wzinput.pr{padding-right:44px}
        .wzpass-btn{position:absolute;right:12px;background:none;border:none;cursor:pointer;color:#3a5f80;padding:4px;display:flex;align-items:center;border-radius:6px;transition:color .15s,background .15s}
        .wzpass-btn:hover{color:#7ba3c0;background:rgba(56,189,248,.08)}
        .wzbtn{width:100%;padding:13.5px;background:linear-gradient(135deg,#38bdf8,#0ea5e9);color:#040d1a;font-family:'Plus Jakarta Sans',sans-serif;font-size:14.5px;font-weight:800;border:none;border-radius:11px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:9px;transition:opacity .2s,transform .15s,box-shadow .2s;box-shadow:0 4px 24px rgba(56,189,248,.22)}
        .wzbtn:hover:not(:disabled){opacity:.9;transform:translateY(-1px);box-shadow:0 8px 32px rgba(56,189,248,.38)}
        .wzbtn:disabled{opacity:.45;cursor:not-allowed;box-shadow:none}
        .wzgbtn{width:100%;padding:12.5px;background:transparent;border:1.5px solid rgba(56,189,248,.16);border-radius:11px;color:#7ba3c0;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;transition:border-color .2s,background .2s,color .2s,transform .15s}
        .wzgbtn:hover{border-color:rgba(56,189,248,.34);background:rgba(56,189,248,.04);color:#f0f9ff;transform:translateY(-1px)}
        .wzdiv{display:flex;align-items:center;gap:14px}
        .wzdiv-line{flex:1;height:1px;background:rgba(56,189,248,.09)}
        .wzerr{background:rgba(248,113,113,.07);border:1.5px solid rgba(248,113,113,.28);border-radius:11px;padding:12px 16px;color:#f87171;font-size:13.5px;font-weight:500;display:flex;align-items:flex-start;gap:10px;line-height:1.55;animation:wzup .3s ease forwards}
        .wzbenefit{display:flex;align-items:center;gap:12px;padding:11px 15px;background:rgba(56,189,248,.042);border:1px solid rgba(56,189,248,.1);border-radius:12px;transition:border-color .2s,background .2s}
        .wzbenefit:hover{border-color:rgba(56,189,248,.24);background:rgba(56,189,248,.07)}
        .wzlogo-glow{position:absolute;inset:-16px;border-radius:50%;background:radial-gradient(circle,rgba(56,189,248,.16) 0%,transparent 70%);animation:wzpulse 3.5s ease-in-out infinite}
        @media(max-width:860px){.wzleft{display:none}.wzright{width:100%;padding:40px 28px}}
      `}</style>

      <div className="wzpage">

        {/* ── KIRI — Branding ── */}
        <div className="wzleft">
          <div className="wzgrid" />
          <div className="wzorb" />
          <div className="wzleft-c" style={{ position:'relative', zIndex:1, maxWidth:400, width:'100%', textAlign:'center' }}>

            <div style={{ display:'inline-flex', position:'relative', marginBottom:24 }}>
              <div className="wzlogo-glow" />
              <div style={{ width:68, height:68, borderRadius:20, position:'relative', zIndex:1, background:'linear-gradient(135deg,#38bdf8,#0ea5e9)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:30, color:'#040d1a', boxShadow:'0 0 40px rgba(56,189,248,.45)' }}>W</div>
            </div>

            <div style={{ fontSize:30, fontWeight:900, color:'#f0f9ff', letterSpacing:'-1px', marginBottom:8 }}>
              Weiiz<span style={{ color:'#38bdf8' }}>.ink</span>
            </div>

            <div style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(56,189,248,.07)', border:'1px solid rgba(56,189,248,.15)', borderRadius:100, padding:'5px 16px', marginBottom:36 }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:'#38bdf8', animation:'wzpulse 2s ease-in-out infinite' }} />
              <span style={{ fontSize:12.5, color:'#38bdf8', fontWeight:600 }}>Where Bio Becomes Benefit</span>
            </div>

            <h2 style={{ fontSize:24, fontWeight:900, color:'#f0f9ff', lineHeight:1.2, marginBottom:10, letterSpacing:'-.6px' }}>
              Satu link.{' '}
              <span style={{ background:'linear-gradient(135deg,#38bdf8,#7dd3fc)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Ratusan peluang.</span>
            </h2>
            <p style={{ fontSize:13.5, color:'#3a5f80', fontWeight:500, marginBottom:32, lineHeight:1.65 }}>
              Monetisasi bio link kamu, jual produk digital, dan kelola pembayaran dari satu dashboard.
            </p>

            <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
              {[
                { icon:'✦', text:'Gratis selamanya untuk mulai' },
                { icon:'✦', text:'Monetisasi dalam hitungan menit' },
                { icon:'✦', text:'14.000+ creator sudah bergabung' },
              ].map((b, i) => (
                <div key={i} className="wzbenefit">
                  <span style={{ width:28, height:28, borderRadius:8, flexShrink:0, background:'rgba(56,189,248,.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, color:'#38bdf8' }}>{b.icon}</span>
                  <span style={{ fontSize:13.5, color:'#7ba3c0', fontWeight:500, textAlign:'left' }}>{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── KANAN — Form ── */}
        <div className="wzright">
          <div style={{ position:'absolute', top:-80, right:-80, width:280, height:280, borderRadius:'50%', pointerEvents:'none', background:'radial-gradient(circle,rgba(56,189,248,.06) 0%,transparent 70%)' }} />

          <div className="wzform-c" style={{ width:'100%', maxWidth:364 }}>

            {/* Header */}
            <div style={{ marginBottom:24 }}>
              <h1 style={{ fontSize:23, fontWeight:900, color:'#f0f9ff', letterSpacing:'-.6px', marginBottom:6 }}>
                Selamat Datang Kembali 👋
              </h1>
              <p style={{ fontSize:13.5, color:'#7ba3c0', fontWeight:500 }}>Masuk ke dashboard kamu</p>
            </div>

            {/* Error */}
            {error && (
              <div className="wzerr" style={{ marginBottom:16 }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flexShrink:0, marginTop:1 }}>
                  <circle cx="10" cy="10" r="9" stroke="#f87171" strokeWidth="1.5"/>
                  <path d="M10 6v4M10 13.5v.5" stroke="#f87171" strokeWidth="1.75" strokeLinecap="round"/>
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:14 }}>

              {/* Email */}
              <div>
                <label className="wzlabel" htmlFor="wz-email">Email</label>
                <div className="wzrow">
                  <span className="wzicon-l">
                    <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                  </span>
                  <input id="wz-email" type="email" placeholder="nama@email.com"
                    value={email} onChange={e => setEmail(e.target.value)}
                    required autoComplete="email" className="wzinput" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="wzlabel" htmlFor="wz-password">Password</label>
                <div className="wzrow">
                  <span className="wzicon-l">
                    <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><rect x="4" y="8" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7 8V6a3 3 0 116 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="13" r="1.25" fill="currentColor"/></svg>
                  </span>
                  <input id="wz-password" type={showPass ? 'text' : 'password'} placeholder="Password kamu"
                    value={password} onChange={e => setPassword(e.target.value)}
                    required autoComplete="current-password" className="wzinput pr" />
                  <button type="button" className="wzpass-btn" onClick={() => setShowPass(v => !v)}>
                    {showPass
                      ? <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M3 3l14 14M8.5 8.6A3 3 0 0011.4 11.5M6.3 5.4C4.5 6.5 3 8.1 2 10c1.9 3.7 5.5 6 8 6 1.4 0 2.8-.5 4-1.3M9 4.1C9.3 4 9.7 4 10 4c2.5 0 6.1 2.3 8 6-.5 1-1.3 2-2.2 2.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                      : <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M2 10c1.9-3.7 5.5-6 8-6s6.1 2.3 8 6c-1.9 3.7-5.5 6-8 6s-6.1-2.3-8-6z" stroke="currentColor" strokeWidth="1.4"/><circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4"/></svg>
                    }
                  </button>
                </div>
                <div style={{ textAlign:'right', marginTop:7 }}>
                  <Link href="/forgot-password" style={{ fontSize:12.5, color:'#38bdf8', fontWeight:600, textDecoration:'none' }}>
                    Lupa password?
                  </Link>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="wzbtn" disabled={loading}>
                {loading
                  ? <><div style={{ width:17, height:17, border:'2.5px solid rgba(4,13,26,.3)', borderTopColor:'#040d1a', borderRadius:'50%', animation:'wzspin .65s linear infinite' }} /><span>Memproses...</span></>
                  : <><span>Masuk ke Dashboard</span><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></>
                }
              </button>

              {/* Divider */}
              <div className="wzdiv">
                <div className="wzdiv-line" /><span style={{ fontSize:12, color:'#3a5f80', fontWeight:500, whiteSpace:'nowrap' }}>atau</span><div className="wzdiv-line" />
              </div>

              {/* Google */}
              <button type="button" className="wzgbtn" onClick={() => { window.location.href = '/api/auth/google' }}>
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Lanjutkan dengan Google
              </button>
            </form>

            {/* Footer */}
            <p style={{ textAlign:'center', marginTop:24, fontSize:13.5, color:'#3a5f80', fontWeight:500 }}>
              Belum punya akun?{' '}
              <Link href="/register" style={{ color:'#38bdf8', fontWeight:700, textDecoration:'none' }}>
                Daftar Gratis →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}