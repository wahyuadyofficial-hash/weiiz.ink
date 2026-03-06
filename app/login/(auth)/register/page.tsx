'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

// ─────────────────────────────────────────────────────────────────
// Weiiz.ink — Register Page
// File: app/(auth)/register/page.tsx
// ─────────────────────────────────────────────────────────────────

type StrengthLevel = 0 | 1 | 2 | 3 | 4
type UsernameStatus = 'idle' | 'checking' | 'available' | 'taken' | 'invalid'

function calcStrength(pwd: string): StrengthLevel {
  if (!pwd) return 0
  let s = 0
  if (pwd.length >= 8)                          s++
  if (pwd.length >= 12)                         s++
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd))  s++
  if (/[0-9]/.test(pwd))                        s++
  if (/[^A-Za-z0-9]/.test(pwd))                s++
  if (s <= 1) return 1
  if (s === 2) return 2
  if (s === 3) return 3
  return 4
}

const STRENGTH: Record<StrengthLevel, { label: string; color: string }> = {
  0: { label: '',             color: 'transparent' },
  1: { label: 'Lemah',       color: '#f87171' },
  2: { label: 'Lumayan',     color: '#fb923c' },
  3: { label: 'Kuat',        color: '#facc15' },
  4: { label: 'Sangat Kuat', color: '#34d399' },
}

const validate = {
  name:     (v: string) => !v.trim() ? 'Nama wajib diisi' : v.trim().length < 2 ? 'Minimal 2 karakter' : '',
  username: (v: string) => !v ? 'Username wajib diisi' : v.length < 3 ? 'Minimal 3 karakter' : v.length > 30 ? 'Maksimal 30 karakter' : !/^[a-z0-9_]+$/.test(v) ? 'Hanya huruf kecil, angka, dan _' : '',
  email:    (v: string) => !v ? 'Email wajib diisi' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Format email tidak valid' : '',
  password: (v: string) => !v ? 'Password wajib diisi' : v.length < 8 ? 'Minimal 8 karakter' : '',
}

export default function RegisterPage() {
  const [name,     setName]     = useState('')
  const [username, setUsername] = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [agreed,   setAgreed]   = useState(false)
  const [loading,      setLoading]      = useState(false)
  const [showPass,     setShowPass]     = useState(false)
  const [apiError,     setApiError]     = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const [mounted,      setMounted]      = useState(false)
  const [errors,  setErrors]  = useState({ name: '', username: '', email: '', password: '' })
  const [touched, setTouched] = useState({ name: false, username: false, email: false, password: false })
  const [unStatus, setUnStatus] = useState<UsernameStatus>('idle')
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null)

  const strength     = calcStrength(password)
  const strengthMeta = STRENGTH[strength]

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => () => { if (debounce.current) clearTimeout(debounce.current) }, [])

  const allValid =
    !validate.name(name) && !validate.username(username) &&
    !validate.email(email) && !validate.password(password) &&
    unStatus === 'available' && agreed

  const handleUsernameChange = useCallback((raw: string) => {
    const v = raw.toLowerCase().replace(/[^a-z0-9_]/g, '').slice(0, 30)
    setUsername(v)
    setApiError('')
    const err = validate.username(v)
    setErrors(p => ({ ...p, username: err }))
    if (debounce.current) clearTimeout(debounce.current)
    if (err || !v) { setUnStatus(err ? 'invalid' : 'idle'); return }
    setUnStatus('checking')
    debounce.current = setTimeout(async () => {
      try {
        const res  = await fetch(`/api/users/check-username?username=${encodeURIComponent(v)}`)
        const data = await res.json()
        setUnStatus(data.available ? 'available' : 'taken')
      } catch { setUnStatus('idle') }
    }, 500)
  }, [])

  const change = (field: 'name' | 'email' | 'password', setter: (v: string) => void, v: string) => {
    setter(v)
    if (touched[field]) setErrors(p => ({ ...p, [field]: validate[field](v) }))
  }

  const blur = (field: 'name' | 'username' | 'email' | 'password') => {
    setTouched(p => ({ ...p, [field]: true }))
    const val = { name, username, email, password }[field]
    setErrors(p => ({ ...p, [field]: validate[field](val) }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setApiError('')
    setTouched({ name: true, username: true, email: true, password: true })
    setErrors({ name: validate.name(name), username: validate.username(username), email: validate.email(email), password: validate.password(password) })
    if (!allValid) return
    setLoading(true)
    try {
      const res  = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, username, password }),
      })
      const data = await res.json()
      if (!res.ok) { setApiError(data.error || 'Gagal membuat akun, coba lagi'); return }
      setToastVisible(true)
      setTimeout(() => { window.location.href = '/dashboard' }, 1500)
    } catch {
      setApiError('Koneksi bermasalah, coba lagi')
    } finally {
      setLoading(false)
    }
  }

  const unBorderClass =
    (touched.username && errors.username) || unStatus === 'taken' ? 'err' :
    unStatus === 'available' ? 'ok' : ''

  const unHint =
    unStatus === 'available' ? { text: '✓ Username tersedia',      color: '#34d399' } :
    unStatus === 'taken'     ? { text: '✕ Username sudah dipakai', color: '#f87171' } :
    unStatus === 'checking'  ? { text: 'Mengecek...',              color: '#3a5f80' } :
    touched.username && errors.username
      ? { text: errors.username, color: '#f87171' }
      : { text: 'Huruf kecil, angka, dan underscore (_)', color: '#3a5f80' }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Fira+Code:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        @keyframes wzspin  {to{transform:rotate(360deg)}}
        @keyframes wzup    {from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes wzpulse {0%,100%{opacity:.55;transform:scale(1)}50%{opacity:1;transform:scale(1.07)}}
        @keyframes wzfloat {0%,100%{transform:translate(-50%,-55%) scale(1)}50%{transform:translate(-50%,-55%) scale(1.05)}}
        @keyframes wzshake {0%,100%{transform:translateX(0)}20%{transform:translateX(-5px)}40%{transform:translateX(5px)}60%{transform:translateX(-3px)}80%{transform:translateX(3px)}}
        @keyframes wztoast {0%{opacity:0;transform:translateX(-50%) translateY(14px)}12%,82%{opacity:1;transform:translateX(-50%) translateY(0)}100%{opacity:0;transform:translateX(-50%) translateY(14px)}}
        .wzpage{font-family:'Plus Jakarta Sans',sans-serif;min-height:100vh;background:#040d1a;display:flex}
        .wzgrid{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(56,189,248,.042) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,.042) 1px,transparent 1px);background-size:52px 52px;mask-image:radial-gradient(ellipse 90% 90% at 50% 50%,black 20%,transparent 75%);-webkit-mask-image:radial-gradient(ellipse 90% 90% at 50% 50%,black 20%,transparent 75%)}
        .wzorb1{position:absolute;width:520px;height:520px;top:50%;left:50%;border-radius:50%;background:radial-gradient(circle,rgba(56,189,248,.11) 0%,transparent 65%);animation:wzfloat 7s ease-in-out infinite;pointer-events:none}
        .wzorb2{position:absolute;width:260px;height:260px;bottom:10%;right:8%;border-radius:50%;background:radial-gradient(circle,rgba(96,165,250,.08) 0%,transparent 70%);animation:wzfloat 10s 2s ease-in-out infinite;pointer-events:none}
        .wzleft{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 52px;position:relative;overflow:hidden;border-right:1px solid rgba(56,189,248,.09)}
        .wzleft-c>*{opacity:0;animation:wzup .6s ease forwards}
        .wzleft-c>*:nth-child(1){animation-delay:.08s}.wzleft-c>*:nth-child(2){animation-delay:.16s}.wzleft-c>*:nth-child(3){animation-delay:.24s}.wzleft-c>*:nth-child(4){animation-delay:.32s}.wzleft-c>*:nth-child(5){animation-delay:.40s}.wzleft-c>*:nth-child(6){animation-delay:.48s}
        .wzright{width:500px;flex-shrink:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:36px 52px 40px;background:#071428;overflow-y:auto;position:relative}
        .wzright::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(56,189,248,.35),transparent)}
        .wzform-c>*{opacity:0;animation:wzup .5s ease forwards}
        .wzform-c>*:nth-child(1){animation-delay:.04s}.wzform-c>*:nth-child(2){animation-delay:.10s}.wzform-c>*:nth-child(3){animation-delay:.16s}.wzform-c>*:nth-child(4){animation-delay:.22s}.wzform-c>*:nth-child(5){animation-delay:.28s}.wzform-c>*:nth-child(6){animation-delay:.34s}.wzform-c>*:nth-child(7){animation-delay:.40s}.wzform-c>*:nth-child(8){animation-delay:.46s}.wzform-c>*:nth-child(9){animation-delay:.52s}.wzform-c>*:nth-child(10){animation-delay:.58s}
        .wzlabel{display:block;font-size:12.5px;font-weight:600;color:#7ba3c0;letter-spacing:.1px;margin-bottom:7px}
        .wzrow{position:relative;display:flex;align-items:center}
        .wzicon-l{position:absolute;left:14px;color:#3a5f80;pointer-events:none;display:flex;align-items:center;transition:color .2s;z-index:1}
        .wzrow:focus-within .wzicon-l{color:#38bdf8}
        .wzicon-r{position:absolute;right:12px;display:flex;align-items:center;pointer-events:none}
        .wzinput{width:100%;background:#050f20;border:1.5px solid rgba(56,189,248,.12);border-radius:11px;padding:12px 14px 12px 43px;color:#f0f9ff;font-size:14px;font-family:'Plus Jakarta Sans',sans-serif;font-weight:500;outline:none;transition:border-color .2s,box-shadow .2s}
        .wzinput::placeholder{color:#3a5f80;font-weight:400}
        .wzinput:focus{border-color:#38bdf8;box-shadow:0 0 0 3px rgba(56,189,248,.13)}
        .wzinput.pr{padding-right:44px}
        .wzinput.ok{border-color:rgba(52,211,153,.4)!important}
        .wzinput.ok:focus{box-shadow:0 0 0 3px rgba(52,211,153,.1)!important}
        .wzinput.er{border-color:rgba(248,113,113,.42)!important}
        .wzinput.er:focus{box-shadow:0 0 0 3px rgba(248,113,113,.1)!important}
        .wzun-row{display:flex;align-items:stretch;background:#050f20;border:1.5px solid rgba(56,189,248,.12);border-radius:11px;overflow:hidden;transition:border-color .2s,box-shadow .2s;position:relative}
        .wzun-row:focus-within{border-color:#38bdf8;box-shadow:0 0 0 3px rgba(56,189,248,.13)}
        .wzun-row.err{border-color:rgba(248,113,113,.42)!important}
        .wzun-row.err:focus-within{box-shadow:0 0 0 3px rgba(248,113,113,.1)!important}
        .wzun-row.ok{border-color:rgba(52,211,153,.4)!important}
        .wzun-row.ok:focus-within{box-shadow:0 0 0 3px rgba(52,211,153,.1)!important}
        .wzun-pre{padding:12px 0 12px 14px;font-family:'Fira Code',monospace;font-size:13px;font-weight:500;color:#3a5f80;white-space:nowrap;flex-shrink:0;user-select:none;display:flex;align-items:center}
        .wzun-inp{flex:1;min-width:0;background:transparent;border:none;outline:none;padding:12px 40px 12px 5px;color:#f0f9ff;font-size:14px;font-family:'Plus Jakarta Sans',sans-serif;font-weight:600;letter-spacing:-.1px}
        .wzun-inp::placeholder{color:#3a5f80;font-weight:400;letter-spacing:0}
        .wzun-status{position:absolute;right:12px;top:50%;transform:translateY(-50%);display:flex;align-items:center}
        .wzpass-btn{position:absolute;right:12px;background:none;border:none;cursor:pointer;color:#3a5f80;padding:4px;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:color .15s,background .15s}
        .wzpass-btn:hover{color:#7ba3c0;background:rgba(56,189,248,.08)}
        .wzmsg{font-size:12px;font-weight:500;min-height:17px;display:flex;align-items:center;gap:5px;margin-top:5px}
        .wzstrength-bars{display:flex;gap:4px}
        .wzstrength-bar{flex:1;height:3px;border-radius:2px;background:rgba(56,189,248,.1);transition:background .35s ease}
        .wzcheck{display:flex;align-items:flex-start;gap:11px;cursor:pointer;user-select:none}
        .wzcheck-box{width:18px;height:18px;border-radius:5px;flex-shrink:0;border:1.5px solid rgba(56,189,248,.22);background:#050f20;display:flex;align-items:center;justify-content:center;margin-top:1px;cursor:pointer;transition:all .18s ease}
        .wzcheck-box.on{background:#38bdf8;border-color:#38bdf8}
        .wzbtn{width:100%;padding:13.5px;background:linear-gradient(135deg,#38bdf8,#0ea5e9);color:#040d1a;font-family:'Plus Jakarta Sans',sans-serif;font-size:14.5px;font-weight:800;border:none;border-radius:11px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:9px;letter-spacing:-.1px;transition:opacity .2s,transform .15s,box-shadow .2s;box-shadow:0 4px 24px rgba(56,189,248,.22)}
        .wzbtn:hover:not(:disabled){opacity:.9;transform:translateY(-1px);box-shadow:0 8px 32px rgba(56,189,248,.38)}
        .wzbtn:active:not(:disabled){transform:translateY(0)}
        .wzbtn:disabled{opacity:.4;cursor:not-allowed;box-shadow:none}
        .wzgbtn{width:100%;padding:12.5px;background:transparent;border:1.5px solid rgba(56,189,248,.16);border-radius:11px;color:#7ba3c0;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;transition:border-color .2s,background .2s,color .2s,transform .15s}
        .wzgbtn:hover{border-color:rgba(56,189,248,.34);background:rgba(56,189,248,.04);color:#f0f9ff;transform:translateY(-1px)}
        .wzdiv{display:flex;align-items:center;gap:14px}
        .wzdiv-line{flex:1;height:1px;background:rgba(56,189,248,.09)}
        .wzerr-box{background:rgba(248,113,113,.07);border:1.5px solid rgba(248,113,113,.28);border-radius:11px;padding:12px 16px;color:#f87171;font-size:13.5px;font-weight:500;display:flex;align-items:flex-start;gap:10px;line-height:1.55;animation:wzshake .45s ease}
        .wzbenefit{display:flex;align-items:center;gap:12px;padding:11px 15px;background:rgba(56,189,248,.042);border:1px solid rgba(56,189,248,.1);border-radius:12px;transition:border-color .2s,background .2s}
        .wzbenefit:hover{border-color:rgba(56,189,248,.24);background:rgba(56,189,248,.07)}
        .wzlogo-glow{position:absolute;inset:-16px;border-radius:50%;background:radial-gradient(circle,rgba(56,189,248,.16) 0%,transparent 70%);animation:wzpulse 3.5s ease-in-out infinite}
        .wztoast{position:fixed;bottom:28px;left:50%;z-index:9999;animation:wztoast 3.2s ease forwards;background:rgba(52,211,153,.1);border:1.5px solid rgba(52,211,153,.35);border-radius:12px;padding:12px 22px;display:flex;align-items:center;gap:10px;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:0 8px 32px rgba(0,0,0,.4);white-space:nowrap;font-family:'Plus Jakarta Sans',sans-serif;font-size:13.5px;font-weight:600;color:#34d399}
        @media(max-width:900px){.wzleft{display:none}.wzright{width:100%;padding:36px 28px 40px}}
        @media(max-width:440px){.wzright{padding:28px 18px 36px}}
      `}</style>

      {toastVisible && (
        <div className="wztoast">
          <span style={{ fontSize: 17 }}>🎉</span>
          Akun berhasil dibuat! Mengarahkan ke dashboard...
        </div>
      )}

      <div className="wzpage">

        {/* ══ KIRI — Branding ══ */}
        <div className="wzleft">
          <div className="wzgrid" />
          <div className="wzorb1" />
          <div className="wzorb2" />

          <div className="wzleft-c" style={{ position:'relative', zIndex:1, maxWidth:400, width:'100%', textAlign:'center' }}>

            {/* Logo */}
            <div style={{ display:'inline-flex', position:'relative', marginBottom:24 }}>
              <div className="wzlogo-glow" />
              <div style={{ width:68, height:68, borderRadius:20, position:'relative', zIndex:1, background:'linear-gradient(135deg,#38bdf8,#0ea5e9)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:30, color:'#040d1a', boxShadow:'0 0 40px rgba(56,189,248,.45),0 0 80px rgba(56,189,248,.18)' }}>W</div>
            </div>

            {/* Wordmark */}
            <div style={{ marginBottom:8, fontSize:30, fontWeight:900, color:'#f0f9ff', letterSpacing:'-1px', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
              Weiiz<span style={{ color:'#38bdf8' }}>.ink</span>
            </div>

            {/* Chip */}
            <div style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(56,189,248,.07)', border:'1px solid rgba(56,189,248,.15)', borderRadius:100, padding:'5px 16px', marginBottom:32 }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:'#38bdf8', animation:'wzpulse 2s ease-in-out infinite' }} />
              <span style={{ fontSize:12.5, color:'#38bdf8', fontWeight:600 }}>Where Bio Becomes Benefit</span>
            </div>

            {/* Heading */}
            <h2 style={{ fontSize:24, fontWeight:900, color:'#f0f9ff', lineHeight:1.2, marginBottom:10, letterSpacing:'-.6px' }}>
              Bergabung &amp; mulai{' '}
              <span style={{ background:'linear-gradient(135deg,#38bdf8,#7dd3fc)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>monetisasi</span>
              <br />bio link kamu.
            </h2>
            <p style={{ fontSize:13.5, color:'#3a5f80', fontWeight:500, marginBottom:28, lineHeight:1.65 }}>Setup selesai 5 menit. Tidak perlu kartu kredit.</p>

            {/* Benefits */}
            <div style={{ display:'flex', flexDirection:'column', gap:9, marginBottom:32 }}>
              {[
                { icon:'✦', text:'Gratis selamanya untuk mulai' },
                { icon:'⚡', text:'Terima pembayaran dalam 5 menit' },
                { icon:'📊', text:'Analytics lengkap & real-time' },
                { icon:'🤖', text:'AI tools untuk boost konversi' },
              ].map((b, i) => (
                <div key={i} className="wzbenefit">
                  <span style={{ width:28, height:28, borderRadius:8, flexShrink:0, background:'rgba(56,189,248,.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, color:'#38bdf8' }}>{b.icon}</span>
                  <span style={{ fontSize:13.5, color:'#7ba3c0', fontWeight:500, textAlign:'left' }}>{b.text}</span>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div style={{ display:'flex', alignItems:'center', gap:12, justifyContent:'center' }}>
              <div style={{ display:'flex' }}>
                {['R','S','B','D','F'].map((l, i) => (
                  <div key={i} style={{ width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg,#38bdf8,#60a5fa)', border:'2px solid #040d1a', marginLeft:i?-8:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, color:'#040d1a' }}>{l}</div>
                ))}
              </div>
              <span style={{ fontSize:13, color:'#3a5f80', fontWeight:500 }}><strong style={{ color:'#7ba3c0' }}>14.200+</strong> creator bergabung</span>
            </div>
          </div>
        </div>

        {/* ══ KANAN — Form ══ */}
        <div className="wzright">
          <div style={{ position:'absolute', top:-80, right:-80, width:280, height:280, borderRadius:'50%', pointerEvents:'none', background:'radial-gradient(circle,rgba(56,189,248,.06) 0%,transparent 70%)' }} />

          <div className={mounted ? 'wzform-c' : ''} style={{ width:'100%', maxWidth:384, display:'flex', flexDirection:'column', gap:0 }}>

            {/* Header */}
            <div style={{ marginBottom:22 }}>
              <h1 style={{ fontSize:22, fontWeight:900, color:'#f0f9ff', letterSpacing:'-.6px', marginBottom:6, lineHeight:1.2 }}>Buat Akun Gratis ✨</h1>
              <p style={{ fontSize:13.5, color:'#7ba3c0', fontWeight:500 }}>
                Sudah punya akun?{' '}
                <Link href="/login" style={{ color:'#38bdf8', fontWeight:700, textDecoration:'none' }}>Masuk →</Link>
              </p>
            </div>

            {/* API Error */}
            {apiError && (
              <div className="wzerr-box" style={{ marginBottom:16 }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flexShrink:0, marginTop:1 }}><circle cx="10" cy="10" r="9" stroke="#f87171" strokeWidth="1.5"/><path d="M10 6v4M10 13.5v.5" stroke="#f87171" strokeWidth="1.75" strokeLinecap="round"/></svg>
                <span>{apiError}</span>
              </div>
            )}

            {/* ═══ FORM ═══ */}
            <form onSubmit={handleSubmit} noValidate style={{ display:'flex', flexDirection:'column', gap:13 }}>

              {/* 1 — Nama */}
              <div>
                <label className="wzlabel" htmlFor="r-name">Nama Lengkap</label>
                <div className="wzrow">
                  <span className="wzicon-l">
                    <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5"/><path d="M3 17c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </span>
                  <input id="r-name" type="text" placeholder="Nama lengkap kamu" value={name} autoComplete="name"
                    onChange={e => change('name', setName, e.target.value)} onBlur={() => blur('name')}
                    className={`wzinput ${touched.name && errors.name ? 'er' : touched.name && name && !errors.name ? 'ok pr' : ''}`}
                  />
                  {touched.name && name && !errors.name && (
                    <span className="wzicon-r">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#34d399" strokeWidth="1.4"/><path d="M5 8l2.2 2.2L11 5.5" stroke="#34d399" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  )}
                </div>
                {touched.name && errors.name && (
                  <div className="wzmsg" style={{ color:'#f87171' }}>
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink:0 }}><circle cx="8" cy="8" r="7" stroke="#f87171" strokeWidth="1.4"/><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    {errors.name}
                  </div>
                )}
              </div>

              {/* 2 — Username */}
              <div>
                <label className="wzlabel" htmlFor="r-username">Username</label>
                <div className={`wzun-row ${unBorderClass}`}>
                  <span className="wzun-pre">weiiz.ink/</span>
                  <input id="r-username" type="text" placeholder="username" value={username}
                    autoComplete="username" spellCheck={false} autoCapitalize="none" maxLength={30}
                    onChange={e => handleUsernameChange(e.target.value)}
                    onBlur={() => { setTouched(p => ({ ...p, username:true })); setErrors(p => ({ ...p, username:validate.username(username) })) }}
                    className="wzun-inp"
                  />
                  <div className="wzun-status">
                    {unStatus === 'checking'  && <div style={{ width:14, height:14, border:'2px solid rgba(56,189,248,.2)', borderTopColor:'#38bdf8', borderRadius:'50%', animation:'wzspin .65s linear infinite' }} />}
                    {unStatus === 'available' && <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#34d399" strokeWidth="1.4"/><path d="M5 8l2.2 2.2L11 5.5" stroke="#34d399" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    {unStatus === 'taken'     && <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#f87171" strokeWidth="1.4"/><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                  </div>
                </div>
                <div className="wzmsg" style={{ color: unHint.color }}>{unHint.text}</div>
              </div>

              {/* 3 — Email */}
              <div>
                <label className="wzlabel" htmlFor="r-email">Email</label>
                <div className="wzrow">
                  <span className="wzicon-l">
                    <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                  </span>
                  <input id="r-email" type="email" placeholder="nama@email.com" value={email} autoComplete="email"
                    onChange={e => change('email', setEmail, e.target.value)} onBlur={() => blur('email')}
                    className={`wzinput ${touched.email && errors.email ? 'er' : touched.email && email && !errors.email ? 'ok pr' : ''}`}
                  />
                  {touched.email && email && !errors.email && (
                    <span className="wzicon-r">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#34d399" strokeWidth="1.4"/><path d="M5 8l2.2 2.2L11 5.5" stroke="#34d399" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  )}
                </div>
                {touched.email && errors.email && (
                  <div className="wzmsg" style={{ color:'#f87171' }}>
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink:0 }}><circle cx="8" cy="8" r="7" stroke="#f87171" strokeWidth="1.4"/><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    {errors.email}
                  </div>
                )}
              </div>

              {/* 4 — Password */}
              <div>
                <label className="wzlabel" htmlFor="r-password">Password</label>
                <div className="wzrow">
                  <span className="wzicon-l">
                    <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><rect x="4" y="8" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7 8V6a3 3 0 116 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="13" r="1.25" fill="currentColor"/></svg>
                  </span>
                  <input id="r-password" type={showPass ? 'text' : 'password'} placeholder="Min 8 karakter" value={password} autoComplete="new-password"
                    onChange={e => change('password', setPassword, e.target.value)} onBlur={() => blur('password')}
                    className={`wzinput pr ${touched.password && errors.password ? 'er' : touched.password && password && !errors.password ? 'ok' : ''}`}
                  />
                  <button type="button" className="wzpass-btn" onClick={() => setShowPass(v => !v)} aria-label={showPass ? 'Sembunyikan' : 'Tampilkan'}>
                    {showPass
                      ? <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M3 3l14 14M8.5 8.6A3 3 0 0011.4 11.5M6.3 5.4C4.5 6.5 3 8.1 2 10c1.9 3.7 5.5 6 8 6 1.4 0 2.8-.5 4-1.3M9 4.1C9.3 4 9.7 4 10 4c2.5 0 6.1 2.3 8 6-.5 1-1.3 2-2.2 2.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                      : <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M2 10c1.9-3.7 5.5-6 8-6s6.1 2.3 8 6c-1.9 3.7-5.5 6-8 6s-6.1-2.3-8-6z" stroke="currentColor" strokeWidth="1.4"/><circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4"/></svg>
                    }
                  </button>
                </div>

                {/* Strength meter */}
                {password && (
                  <div style={{ marginTop:8 }}>
                    <div className="wzstrength-bars">
                      {([1,2,3,4] as StrengthLevel[]).map(bar => (
                        <div key={bar} className="wzstrength-bar" style={{ background: bar <= strength ? strengthMeta.color : 'rgba(56,189,248,.1)' }} />
                      ))}
                    </div>
                    <div style={{ display:'flex', justifyContent:'space-between', marginTop:5 }}>
                      <span style={{ fontSize:11.5, fontWeight:600, color: strengthMeta.color }}>{strengthMeta.label}</span>
                      <span style={{ fontSize:11, color:'#3a5f80' }}>{password.length} karakter</span>
                    </div>
                  </div>
                )}
                {touched.password && errors.password && (
                  <div className="wzmsg" style={{ color:'#f87171', marginTop: password ? 4 : 5 }}>
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink:0 }}><circle cx="8" cy="8" r="7" stroke="#f87171" strokeWidth="1.4"/><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    {errors.password}
                  </div>
                )}
              </div>

              {/* 5 — Checkbox */}
              <label className="wzcheck">
                <div role="checkbox" aria-checked={agreed} tabIndex={0}
                  className={`wzcheck-box ${agreed ? 'on' : ''}`}
                  onClick={() => setAgreed(v => !v)}
                  onKeyDown={e => e.key === ' ' && setAgreed(v => !v)}
                >
                  {agreed && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 5-5" stroke="#040d1a" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span style={{ fontSize:13, color:'#7ba3c0', fontWeight:500, lineHeight:1.55 }}>
                  Saya setuju dengan{' '}
                  <Link href="/terms" onClick={e => e.stopPropagation()} style={{ color:'#38bdf8', fontWeight:600, textDecoration:'none' }}>Terms of Service</Link>
                  {' '}dan{' '}
                  <Link href="/privacy" onClick={e => e.stopPropagation()} style={{ color:'#38bdf8', fontWeight:600, textDecoration:'none' }}>Privacy Policy</Link>
                </span>
              </label>

              {/* 6 — Submit */}
              <button type="submit" className="wzbtn" disabled={loading || !allValid} style={{ marginTop:4 }}>
                {loading
                  ? <><div style={{ width:17, height:17, flexShrink:0, border:'2.5px solid rgba(4,13,26,.3)', borderTopColor:'#040d1a', borderRadius:'50%', animation:'wzspin .65s linear infinite' }} /><span>Membuat akun...</span></>
                  : <><span>Buat Akun Gratis</span><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></>
                }
              </button>

              {/* Divider */}
              <div className="wzdiv">
                <div className="wzdiv-line" />
                <span style={{ fontSize:12, color:'#3a5f80', fontWeight:500, whiteSpace:'nowrap' }}>atau daftar dengan</span>
                <div className="wzdiv-line" />
              </div>

              {/* Google */}
              <button type="button" className="wzgbtn" onClick={() => { window.location.href = '/api/auth/google' }}>
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Daftar dengan Google
              </button>
            </form>

            {/* Footer */}
            <div style={{ marginTop:20, textAlign:'center' }}>
              <p style={{ fontSize:13, color:'#3a5f80', marginBottom:14 }}>
                Sudah punya akun?{' '}
                <Link href="/login" style={{ color:'#38bdf8', fontWeight:700, textDecoration:'none' }}>Masuk sekarang →</Link>
              </p>
              <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 14px', background:'rgba(56,189,248,.04)', border:'1px solid rgba(56,189,248,.09)', borderRadius:100 }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ color:'#3a5f80' }}><path d="M8 1.5L2.5 4v4c0 3.2 2.4 5.3 5.5 6 3.1-.7 5.5-2.8 5.5-6V4L8 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><path d="M5.5 8l1.8 1.8L10.5 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span style={{ fontSize:11.5, color:'#3a5f80', fontWeight:500 }}>Data kamu aman &amp; terenkripsi</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}