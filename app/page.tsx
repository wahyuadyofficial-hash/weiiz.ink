'use client'
import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";

// ================================================================
// 🌊  WEIIZ.INK  —  Where Bio Becomes Benefit
// ================================================================
// Full UI System — siap diintegrasikan ke Next.js 14 App Router
// Tech: TypeScript · TailwindCSS · Next.js · Prisma · Midtrans
// Design: Deep Navy + Sky Blue · glassmorphism · micro-animations
// ================================================================

// ── FONT INJECT ─────────────────────────────────────────────────
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Fira+Code:wght@400;500&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body, html { font-family: 'Plus Jakarta Sans', sans-serif; }
    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: #040d1a; }
    ::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #38bdf8; }

    @keyframes float    { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-18px)} }
    @keyframes glow-pulse { 0%,100%{opacity:.5} 50%{opacity:1} }
    @keyframes slide-up { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fade-in  { from{opacity:0} to{opacity:1} }
    @keyframes spin     { to{transform:rotate(360deg)} }
    @keyframes shimmer  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
    @keyframes count-in { from{opacity:0;transform:scale(.8)} to{opacity:1;transform:scale(1)} }
    @keyframes bar-grow { from{height:0} to{height:var(--h)} }
    @keyframes dot-pulse{ 0%,80%,100%{transform:scale(0)} 40%{transform:scale(1)} }

    .slide-up   { animation: slide-up .5s ease both; }
    .fade-in    { animation: fade-in .4s ease both; }
    .sk-shimmer { 
      background: linear-gradient(90deg,#071428 25%,#0d1f36 50%,#071428 75%);
      background-size: 400px 100%;
      animation: shimmer 1.4s infinite;
    }
    .nav-blur { backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); }
    .card-glass {
      background: rgba(7,20,40,0.85);
      backdrop-filter: blur(12px);
    }
    .glow-primary { box-shadow: 0 0 24px rgba(56,189,248,0.3); }
    .glow-sm      { box-shadow: 0 0 12px rgba(56,189,248,0.2); }
    .input-focus:focus { outline: none; border-color: #38bdf8 !important; box-shadow: 0 0 0 3px rgba(56,189,248,0.15); }
    .btn-primary-glow:hover { box-shadow: 0 0 32px rgba(56,189,248,0.45); }
    .link-hover:hover { transform: translateY(-2px); border-color: rgba(56,189,248,0.4) !important; }
    .row-hover:hover { background: rgba(56,189,248,0.04); }
    .tab-active { border-bottom: 2px solid #38bdf8; color: #38bdf8 !important; }
    .sidebar-active { 
      background: rgba(56,189,248,0.1); 
      border-left: 2.5px solid #38bdf8;
      color: #38bdf8 !important;
    }
    .sidebar-item { transition: all .15s ease; }
    .sidebar-item:hover { background: rgba(56,189,248,0.06); color: #f0f9ff !important; }
    .chart-bar { transition: height .6s cubic-bezier(.34,1.56,.64,1); }
    .chart-bar:hover { filter: brightness(1.3); }
    .toggle-on  { background: #38bdf8 !important; }
    .toggle-off { background: #1e3a5f !important; }
    .plan-popular { 
      border-color: rgba(56,189,248,0.5) !important;
      box-shadow: 0 0 40px rgba(56,189,248,0.12);
    }
    .stat-card:hover { border-color: rgba(56,189,248,0.3); transform: translateY(-2px); }
    .product-card:hover { border-color: rgba(56,189,248,0.35); transform: translateY(-3px); }
    .feature-card:hover { border-color: rgba(56,189,248,0.3); background: rgba(56,189,248,0.05) !important; }
    .testimonial-card:hover { border-color: rgba(56,189,248,0.25); }
    * { transition-property: border-color, background-color, color, transform, box-shadow, opacity; transition-duration: 150ms; }
    img, svg { transition: none !important; }
  `}</style>
);

// ── TOAST CONTEXT ────────────────────────────────────────────────
const ToastCtx = createContext(null);
const useToast = () => useContext(ToastCtx);

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((msg, type = 'success') => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3200);
  }, []);
  const icons = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' };
  const colors = {
    success: { bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.3)', text: '#34d399' },
    error:   { bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.3)', text: '#f87171' },
    info:    { bg: 'rgba(56,189,248,0.12)', border: 'rgba(56,189,248,0.3)', text: '#38bdf8' },
    warning: { bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.3)', text: '#fbbf24' },
  };
  return (
    <ToastCtx.Provider value={add}>
      {children}
      <div style={{ position:'fixed', bottom:24, right:24, zIndex:9999, display:'flex', flexDirection:'column', gap:10 }}>
        {toasts.map(t => {
          const c = colors[t.type] || colors.info;
          return (
            <div key={t.id} className="slide-up" style={{
              background: c.bg, border: `1px solid ${c.border}`,
              borderRadius: 12, padding: '12px 18px',
              display: 'flex', alignItems: 'center', gap: 10,
              backdropFilter: 'blur(12px)', minWidth: 260, maxWidth: 360,
            }}>
              <span style={{ color: c.text, fontSize: 16, fontWeight: 800 }}>{icons[t.type]}</span>
              <span style={{ color: '#f0f9ff', fontSize: 13.5, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 500 }}>{t.msg}</span>
            </div>
          );
        })}
      </div>
    </ToastCtx.Provider>
  );
}

// ── DESIGN TOKENS ────────────────────────────────────────────────
const C = {
  bg: "#040d1a", card: "#071428", panel: "#050f20",
  border: "rgba(56,189,248,0.13)", borderHov: "rgba(56,189,248,0.35)",
  p: "#38bdf8", pd: "#0ea5e9", pl: "#7dd3fc",
  acc: "#60a5fa", text: "#f0f9ff", mut: "#7ba3c0", dim: "#3a5f80",
  ok: "#34d399", warn: "#fbbf24", err: "#f87171", pur: "#a78bfa",
};

// ── SHARED PRIMITIVES ────────────────────────────────────────────
const rp = (n) => `Rp ${Number(n).toLocaleString('id-ID')}`;

function Spinner({ size = 16 }) {
  return <div style={{ width: size, height: size, border: `2px solid rgba(56,189,248,0.2)`, borderTopColor: C.p, borderRadius: '50%', animation: 'spin .7s linear infinite', flexShrink: 0 }} />;
}

function Logo({ onClick }) {
  return (
    <button onClick={onClick} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg, ${C.p}, ${C.pd})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, color: C.bg, boxShadow: `0 0 18px rgba(56,189,248,0.4)` }}>W</div>
      <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 18, color: C.text, letterSpacing: '-.3px' }}>
        Weiiz<span style={{ color: C.p }}>.ink</span>
      </span>
    </button>
  );
}

function Badge({ children, color = 'blue', size = 'sm' }) {
  const colors = {
    blue:   { bg: 'rgba(56,189,248,0.12)',  color: C.p },
    green:  { bg: 'rgba(52,211,153,0.12)',  color: C.ok },
    red:    { bg: 'rgba(248,113,113,0.12)', color: C.err },
    yellow: { bg: 'rgba(251,191,36,0.12)',  color: C.warn },
    purple: { bg: 'rgba(167,139,250,0.12)', color: C.pur },
    gray:   { bg: 'rgba(120,160,200,0.1)',  color: C.mut },
    orange: { bg: 'rgba(251,146,60,0.12)',  color: '#fb923c' },
  };
  const c = colors[color] || colors.blue;
  return (
    <span style={{ background: c.bg, color: c.color, padding: size === 'xs' ? '1px 8px' : '3px 10px', borderRadius: 100, fontSize: size === 'xs' ? 10 : 11, fontWeight: 700, letterSpacing: '.3px', whiteSpace: 'nowrap' }}>
      {children}
    </span>
  );
}

function StatusBadge({ status }) {
  const map = { success: ['green','Sukses'], pending: ['yellow','Pending'], failed: ['red','Gagal'], expired: ['gray','Expired'], active: ['green','Aktif'], suspended: ['red','Suspend'], approved: ['green','Disetujui'], rejected: ['red','Ditolak'], processed: ['blue','Diproses'] };
  const [color, label] = map[status] || ['gray', status];
  return <Badge color={color} size="xs">{label}</Badge>;
}

function Skeleton({ h = 16, w = '100%', r = 8 }) {
  return <div className="sk-shimmer" style={{ height: h, width: w, borderRadius: r }} />;
}

function Card({ children, className = '', glow = false, onClick, style = {} }) {
  return (
    <div
      className={`stat-card ${className}`}
      onClick={onClick}
      style={{
        background: C.card, border: `1px solid ${C.border}`, borderRadius: 16,
        transition: 'all .2s ease', cursor: onClick ? 'pointer' : 'default',
        boxShadow: glow ? '0 0 32px rgba(56,189,248,0.1)' : 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Btn({ children, variant = 'primary', size = 'md', loading = false, disabled = false, onClick, type = 'button', fullWidth = false, className = '' }) {
  const sizes = { sm: { padding: '7px 16px', fontSize: 12 }, md: { padding: '10px 22px', fontSize: 13.5 }, lg: { padding: '13px 30px', fontSize: 15 } };
  const variants = {
    primary: { background: `linear-gradient(135deg, ${C.p}, ${C.pd})`, color: C.bg, border: 'none' },
    ghost:   { background: 'transparent', color: C.p, border: `1px solid rgba(56,189,248,0.3)` },
    danger:  { background: 'rgba(248,113,113,0.08)', color: C.err, border: `1px solid rgba(248,113,113,0.25)` },
    success: { background: 'rgba(52,211,153,0.1)', color: C.ok, border: `1px solid rgba(52,211,153,0.3)` },
    muted:   { background: 'rgba(56,189,248,0.06)', color: C.mut, border: `1px solid ${C.border}` },
  };
  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn-primary-glow ${className}`}
      style={{
        ...v, ...s,
        borderRadius: 10, fontWeight: 700, cursor: (disabled || loading) ? 'not-allowed' : 'pointer',
        opacity: (disabled || loading) ? .6 : 1,
        display: 'inline-flex', alignItems: 'center', gap: 8,
        width: fullWidth ? '100%' : 'auto', justifyContent: 'center',
        fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: '-.1px',
        transition: 'all .2s ease',
      }}
    >
      {loading && <Spinner size={14} />}
      {children}
    </button>
  );
}

function Input({ label, placeholder, type = 'text', value, onChange, error, prefix, suffix, hint, disabled = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <label style={{ fontSize: 13, fontWeight: 600, color: C.mut, letterSpacing: '.2px' }}>{label}</label>}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {prefix && (
          <span style={{ position: 'absolute', left: 14, fontSize: 13, color: C.dim, fontFamily: "'Fira Code',monospace", pointerEvents: 'none', zIndex: 1 }}>{prefix}</span>
        )}
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="input-focus"
          style={{
            width: '100%', background: C.panel, border: `1px solid ${error ? C.err : C.border}`,
            borderRadius: 10, padding: `11px ${suffix ? '44px' : '14px'} 11px ${prefix ? `${String(prefix).length * 8 + 18}px` : '14px'}`,
            color: C.text, fontSize: 14, fontFamily: "'Plus Jakarta Sans',sans-serif",
            transition: 'border-color .2s, box-shadow .2s',
          }}
        />
        {suffix && <span style={{ position: 'absolute', right: 14, color: C.dim }}>{suffix}</span>}
      </div>
      {error && <span style={{ fontSize: 12, color: C.err }}>{error}</span>}
      {hint && !error && <span style={{ fontSize: 12, color: C.dim }}>{hint}</span>}
    </div>
  );
}

function Modal({ open, onClose, title, children, maxWidth = 480 }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      className="fade-in"
      style={{ position: 'fixed', inset: 0, background: 'rgba(4,13,26,0.85)', backdropFilter: 'blur(6px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
    >
      <div
        className="slide-up"
        onClick={e => e.stopPropagation()}
        style={{ background: C.card, border: `1px solid rgba(56,189,248,0.25)`, borderRadius: 20, width: '100%', maxWidth, boxShadow: '0 24px 64px rgba(0,0,0,0.5)', overflow: 'hidden' }}
      >
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg,rgba(56,189,248,0.07),transparent)' }}>
          <span style={{ fontWeight: 800, fontSize: 16, color: C.text }}>{title}</span>
          <button onClick={onClose} style={{ background: 'rgba(56,189,248,0.08)', border: `1px solid ${C.border}`, borderRadius: 8, width: 30, height: 30, cursor: 'pointer', color: C.mut, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>
        <div style={{ padding: '24px' }}>{children}</div>
      </div>
    </div>
  );
}

function ToggleSwitch({ on, onChange }) {
  return (
    <button
      onClick={() => onChange(!on)}
      style={{ width: 42, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer', position: 'relative', flexShadow: 0, transition: 'background .2s' }}
      className={on ? 'toggle-on' : 'toggle-off'}
    >
      <div style={{ position: 'absolute', top: 3, left: on ? 21 : 3, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left .2s ease', boxShadow: '0 1px 4px rgba(0,0,0,.3)' }} />
    </button>
  );
}

function StatCard({ icon, value, label, sub, trend, color = C.p, loading = false }) {
  return (
    <Card style={{ padding: '20px 22px', cursor: 'default' }}>
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Skeleton h={12} w={60} />
          <Skeleton h={28} w={100} />
          <Skeleton h={10} w={80} />
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: `rgba(56,189,248,0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{icon}</div>
            {trend && <Badge color={trend.startsWith('+') ? 'green' : 'red'} size="xs">{trend}</Badge>}
          </div>
          <div style={{ fontSize: 26, fontWeight: 900, color: C.text, letterSpacing: '-1px', lineHeight: 1, marginBottom: 6 }}>{value}</div>
          <div style={{ fontSize: 12.5, color: C.mut, fontWeight: 500 }}>{label}</div>
          {sub && <div style={{ fontSize: 11.5, color: C.dim, marginTop: 4 }}>{sub}</div>}
        </>
      )}
    </Card>
  );
}

// ── MOCK DATA ─────────────────────────────────────────────────────
const MOCK_LINKS = [
  {id:1,title:"Ebook UI/UX Design Pro",type:"product",url:"weiiz.ink/raka/ebook",clicks:1342,revenue:8250000,active:true,price:150000},
  {id:2,title:"Konsultasi 1-on-1",type:"payment",url:"weiiz.ink/raka/konsultasi",clicks:289,revenue:4900000,active:true,price:350000},
  {id:3,title:"WhatsApp Business",type:"whatsapp",url:"wa.me/628123456789",clicks:2204,revenue:0,active:true,price:0},
  {id:4,title:"YouTube Channel",type:"link",url:"youtube.com/@raka",clicks:967,revenue:0,active:true,price:0},
  {id:5,title:"Figma Template Pack",type:"download",url:"weiiz.ink/raka/figma",clicks:503,revenue:2375000,active:false,price:75000},
];
const MOCK_TXN = [
  {id:"WZ-001",buyer:"Andi Kurniawan",product:"Ebook UI/UX",amount:150000,status:"success",date:"2025-01-15",method:"GoPay"},
  {id:"WZ-002",buyer:"Bella Sari",product:"Konsultasi",amount:350000,status:"success",date:"2025-01-14",method:"BCA"},
  {id:"WZ-003",buyer:"Cahyo Prabowo",product:"Figma Template",amount:75000,status:"pending",date:"2025-01-14",method:"QRIS"},
  {id:"WZ-004",buyer:"Dewi Rahayu",product:"Ebook UI/UX",amount:150000,status:"success",date:"2025-01-13",method:"Mandiri"},
  {id:"WZ-005",buyer:"Eko Susanto",product:"Konsultasi",amount:350000,status:"failed",date:"2025-01-12",method:"OVO"},
  {id:"WZ-006",buyer:"Fira Nanda",product:"Membership",amount:99000,status:"success",date:"2025-01-12",method:"QRIS"},
];
const MOCK_PRODUCTS = [
  {id:1,name:"Ebook UI/UX Design Pro",type:"ebook",price:150000,sold:55,revenue:8250000,status:"active",cover:"📘"},
  {id:2,name:"Konsultasi 1-on-1",type:"consultation",price:350000,sold:14,revenue:4900000,status:"active",cover:"🎯"},
  {id:3,name:"Figma Template Pack",type:"template",price:75000,sold:31,revenue:2325000,status:"inactive",cover:"🎨"},
  {id:4,name:"Membership Premium",type:"membership",price:99000,sold:32,revenue:3168000,status:"active",cover:"⭐"},
];
const CHART_DATA = [
  {day:"Sen",v:320000},{day:"Sel",v:580000},{day:"Rab",v:420000},
  {day:"Kam",v:890000},{day:"Jum",v:660000},{day:"Sab",v:1100000},{day:"Min",v:720000},
];
const ADMIN_USERS = [
  {id:1,name:"Raka Pratama",username:"raka",email:"raka@gmail.com",plan:"pro",gmv:18725000,status:"active",joined:"2024-10"},
  {id:2,name:"Sinta Dewi",username:"sinta",email:"sinta@gmail.com",plan:"elite",gmv:32100000,status:"active",joined:"2024-09"},
  {id:3,name:"Budi Hartono",username:"budi",email:"budi@gmail.com",plan:"starter",gmv:4500000,status:"active",joined:"2024-11"},
  {id:4,name:"Rina Safitri",username:"rina",email:"rina@gmail.com",plan:"free",gmv:890000,status:"suspended",joined:"2024-12"},
  {id:5,name:"Dani Kusuma",username:"dani",email:"dani@gmail.com",plan:"pro",gmv:9200000,status:"active",joined:"2025-01"},
];
const ADMIN_WITHDRAWALS = [
  {id:"WD-001",user:"Raka Pratama",email:"raka@gmail.com",amount:2000000,bank:"BCA",account:"1234567890",date:"2025-01-15",status:"pending"},
  {id:"WD-002",user:"Sinta Dewi",email:"sinta@gmail.com",amount:5000000,bank:"Mandiri",account:"0987654321",date:"2025-01-15",status:"pending"},
  {id:"WD-003",user:"Dani Kusuma",email:"dani@gmail.com",amount:800000,bank:"GoPay",account:"08123456789",date:"2025-01-14",status:"approved"},
];
const PLANS = [
  {id:"free",name:"Free",monthly:0,yearly:0,fee:"5%",badge:null,popular:false,
   features:["Unlimited link","Custom bio & profil","Analytics dasar","Monetisasi aktif","5% fee transaksi","Weiiz.ink branding"]},
  {id:"starter",name:"Starter",monthly:49000,yearly:490000,fee:"1%",badge:null,popular:false,
   features:["Semua fitur Free","Custom theme & warna","Analytics lanjutan","Hapus Weiiz branding","Priority support","1% fee transaksi"]},
  {id:"pro",name:"Pro",monthly:99000,yearly:990000,fee:"1%",badge:"POPULER",popular:true,
   features:["Semua fitur Starter","Custom domain","AI tools (bio+caption)","Email marketing","Funnel builder","Abandoned checkout"]},
  {id:"elite",name:"Elite",monthly:199000,yearly:1990000,fee:"1%",badge:"BEST",popular:false,
   features:["Semua fitur Pro","Unlimited produk","Team 3 admin","API access","White label","Dedicated support"]},
];
const FAQS = [
  {q:"Apakah plan Free benar-benar bisa menghasilkan uang?",a:"Ya! Plan Free sudah bisa menerima pembayaran untuk produk digital, donasi, dan link berbayar. Hanya saja ada fee transaksi 5% per penjualan."},
  {q:"Bagaimana cara setup custom domain?",a:"Setelah upgrade ke plan Pro, masuk ke Dashboard → Settings → Domain. Tambahkan domain kamu dan ikuti instruksi DNS (CNAME record). Prosesnya sekitar 15 menit."},
  {q:"Metode pembayaran apa saja yang diterima?",a:"Kami mendukung semua metode populer Indonesia: GoPay, OVO, Dana, QRIS, Transfer Bank (BCA, Mandiri, BNI, BRI), Kartu Kredit/Debit via Midtrans."},
  {q:"Kapan saldo bisa dicairkan?",a:"Saldo bisa dicairkan setiap saat minimal Rp 50.000. Proses transfer memakan waktu 1-3 hari kerja. Tidak ada biaya pencairan."},
  {q:"Apakah ada biaya tersembunyi?",a:"Tidak ada. Kamu hanya membayar biaya subscription bulanan/tahunan + fee per transaksi yang sudah jelas di setiap plan."},
  {q:"Apakah data dan uang saya aman?",a:"Ya. Kami menggunakan Midtrans sebagai payment gateway berlisensi Bank Indonesia, enkripsi SSL, dan database terpisah per user."},
];

// ── LANDING PAGE ──────────────────────────────────────────────────
function LandingPage({ navigate }) {
  const [yearlyBilling, setYearlyBilling] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const FEATURES = [
    {icon:"🔗",title:"Bio Link Unlimited",desc:"Tambah link tanpa batas — produk, sosmed, WhatsApp, apapun.",tag:"Core"},
    {icon:"💰",title:"Jual Produk Digital",desc:"Ebook, template, course, konsultasi — semua dalam satu link.",tag:"Monetisasi"},
    {icon:"📊",title:"Analytics Mendalam",desc:"Lihat klik, konversi, pendapatan, device, dan lokasi pengunjung.",tag:"Analytics"},
    {icon:"🤖",title:"AI Tools",desc:"Generate bio, caption, dan deskripsi produk dengan satu klik.",tag:"Pro"},
    {icon:"🎨",title:"Custom Theme & Domain",desc:"Buat halaman bio dengan warna dan font brand kamu sendiri.",tag:"Branding"},
    {icon:"💳",title:"Multi Payment Gateway",desc:"GoPay, OVO, QRIS, Transfer Bank, Kartu Kredit — semua aktif.",tag:"Payment"},
    {icon:"📧",title:"Email Marketing",desc:"Kirim broadcast ke semua pembeli atau subscriber kamu.",tag:"Pro"},
    {icon:"🔄",title:"Funnel & Abandoned Cart",desc:"Recover pembeli yang hampir jadi dengan email otomatis.",tag:"Pro"},
    {icon:"👥",title:"Team Access",desc:"Tambah hingga 3 admin untuk kelola akun bersamaan.",tag:"Elite"},
  ];
  const TESTIMONIALS = [
    {name:"Raka Pratama",role:"UI/UX Designer",plan:"pro",rev:"Rp 18,7jt/bln",text:"Sebelum Weiiz, aku pakai 4 tools berbeda. Sekarang cukup satu link. Revenue naik 3x dalam 2 bulan!"},
    {name:"Sinta Dewi",role:"Content Creator",plan:"elite",rev:"Rp 32,1jt/bln",text:"Fitur email marketing-nya luar biasa. Abandoned cart recovery sendiri nyumbang 20% revenue bulananku."},
    {name:"Budi Hartono",role:"Freelance Developer",plan:"starter",rev:"Rp 4,5jt/bln",text:"Mulai dari Free, upgrade ke Starter setelah bulan pertama. Worth it banget! Analytics-nya detail."},
    {name:"Rina Safitri",role:"Digital Coach",plan:"pro",rev:"Rp 11,2jt/bln",text:"Custom domain bikin klien lebih percaya. Bio page aku kelihatan profesional dan konversinya tinggi."},
  ];
  const planColors = {free:'#7ba3c0',starter:'#38bdf8',pro:'#60a5fa',elite:'#a78bfa'};

  return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
      {/* ── NAVBAR ── */}
      <nav className="nav-blur" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? 'rgba(4,13,26,0.92)' : 'transparent', borderBottom: scrolled ? `1px solid ${C.border}` : '1px solid transparent', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all .3s' }}>
        <Logo onClick={() => {}} />
        <div style={{ display: 'flex', gap: 4 }}>
          {["Fitur","Harga","Kreator","FAQ"].map(m => (
            <button key={m} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 14px', color: C.mut, fontSize: 13.5, fontWeight: 600, borderRadius: 8, fontFamily: "'Plus Jakarta Sans',sans-serif' " }}
              onMouseEnter={e => e.target.style.color = C.text}
              onMouseLeave={e => e.target.style.color = C.mut}
            >{m}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Btn variant="ghost" size="sm" onClick={() => navigate('login')}>Masuk</Btn>
          <Btn size="sm" onClick={() => navigate('register')}>Mulai Gratis ✦</Btn>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ paddingTop: 120, paddingBottom: 80, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Grid bg */}
        <div style={{ position:'absolute',inset:0, backgroundImage:'linear-gradient(rgba(56,189,248,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,.04) 1px,transparent 1px)', backgroundSize:'56px 56px', maskImage:'radial-gradient(ellipse at center,black 30%,transparent 75%)', pointerEvents:'none' }} />
        {/* Orbs */}
        <div style={{ position:'absolute',top:80,left:'15%',width:320,height:320,borderRadius:'50%',background:'radial-gradient(circle,rgba(56,189,248,.1),transparent 70%)',animation:'float 8s infinite ease-in-out',pointerEvents:'none' }} />
        <div style={{ position:'absolute',top:140,right:'12%',width:240,height:240,borderRadius:'50%',background:'radial-gradient(circle,rgba(96,165,250,.08),transparent 70%)',animation:'float 11s 2s infinite ease-in-out',pointerEvents:'none' }} />
        <div className="slide-up" style={{ position:'relative',padding:'0 24px' }}>
          <div style={{ display:'inline-flex',alignItems:'center',gap:8,background:'rgba(56,189,248,0.08)',border:`1px solid rgba(56,189,248,0.2)`,borderRadius:100,padding:'6px 18px',marginBottom:24 }}>
            <div style={{ width:7,height:7,borderRadius:'50%',background:C.p,animation:'glow-pulse 2s infinite' }} />
            <span style={{ fontSize:13,color:C.p,fontWeight:600 }}>🔵 Platform Bio #1 Indonesia</span>
          </div>
          <h1 style={{ fontSize:'clamp(34px,6vw,80px)',fontWeight:900,color:C.text,lineHeight:1.05,marginBottom:20,letterSpacing:'-2px' }}>
            Ubah Bio Jadi<br/>
            <span style={{ background:`linear-gradient(135deg,${C.p},${C.acc},${C.pl})`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>
              Mesin Penghasil Uang
            </span>
          </h1>
          <p style={{ fontSize:'clamp(15px,2vw,18px)',color:C.mut,maxWidth:560,margin:'0 auto 36px',lineHeight:1.7 }}>
            Satu link bio. Jual produk digital, terima donasi, kelola afiliasi — semua dalam satu halaman yang cantik.
          </p>
          <div style={{ display:'flex',gap:14,justifyContent:'center',alignItems:'center',flexWrap:'wrap',marginBottom:48 }}>
            <Btn size="lg" onClick={() => navigate('register')}>✦ Mulai Gratis Sekarang</Btn>
            <Btn variant="ghost" size="lg" onClick={() => navigate('bio')}>▶ Lihat Demo Bio</Btn>
          </div>
          <div style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:10 }}>
            <div style={{ display:'flex' }}>
              {["R","S","B","D"].map((l,i)=>(
                <div key={i} style={{ width:32,height:32,borderRadius:'50%',background:`linear-gradient(135deg,${C.p},${C.acc})`,border:`2px solid ${C.bg}`,marginLeft:i?-8:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:800,color:C.bg }}>{l}</div>
              ))}
            </div>
            <span style={{ fontSize:13.5,color:C.mut }}><strong style={{ color:C.text }}>14.200+</strong> creator sudah bergabung</span>
          </div>
        </div>

        {/* Bio preview mockup */}
        <div className="slide-up" style={{ marginTop:56,display:'flex',justifyContent:'center',padding:'0 16px' }}>
          <div style={{ width:'100%',maxWidth:340,background:C.card,border:`1px solid rgba(56,189,248,0.2)`,borderRadius:24,padding:24,boxShadow:'0 32px 80px rgba(0,0,0,0.5)',position:'relative' }}>
            <div style={{ position:'absolute',inset:-1,borderRadius:24,background:`linear-gradient(135deg,rgba(56,189,248,0.1),transparent,rgba(96,165,250,0.06))`,pointerEvents:'none' }} />
            <div style={{ textAlign:'center',marginBottom:20 }}>
              <div style={{ width:64,height:64,borderRadius:'50%',background:`linear-gradient(135deg,${C.p},${C.acc})`,margin:'0 auto 12px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,fontWeight:900,color:C.bg,boxShadow:`0 0 20px rgba(56,189,248,0.4)` }}>R</div>
              <div style={{ fontWeight:800,color:C.text,fontSize:16 }}>Raka Pratama</div>
              <div style={{ color:C.mut,fontSize:12,marginTop:4 }}>UI/UX Designer & Digital Creator 🎨</div>
            </div>
            {[
              {icon:"📘",label:"Ebook Design Pro",badge:"Rp 150K",color:C.p},
              {icon:"🎯",label:"Konsultasi 1-on-1",badge:"Rp 350K",color:C.acc},
              {icon:"💬",label:"Chat via WhatsApp",badge:"Gratis",color:C.ok},
            ].map((l,i)=>(
              <div key={i} style={{ background:`rgba(56,189,248,0.04)`,border:`1px solid ${C.border}`,borderRadius:12,padding:'12px 14px',marginBottom:8,display:'flex',alignItems:'center',gap:12,cursor:'pointer',transition:'all .2s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(56,189,248,0.3)';e.currentTarget.style.transform='translateY(-2px)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.transform='translateY(0)'}}
              >
                <span style={{ fontSize:18 }}>{l.icon}</span>
                <span style={{ flex:1,fontSize:13,fontWeight:600,color:C.text }}>{l.label}</span>
                <span style={{ fontSize:11,fontWeight:700,color:l.color,background:`rgba(56,189,248,0.1)`,padding:'3px 10px',borderRadius:100 }}>{l.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding:'60px 24px',maxWidth:900,margin:'0 auto' }}>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:20 }}>
          {[
            {v:"Rp 8,4M+",l:"Total GMV"},
            {v:"14.200+",l:"Creator Aktif"},
            {v:"124K+",l:"Transaksi"},
            {v:"99,98%",l:"Uptime"},
          ].map((s,i)=>(
            <div key={i} style={{ textAlign:'center',padding:'24px 16px',background:C.card,border:`1px solid ${C.border}`,borderRadius:16 }}>
              <div style={{ fontSize:28,fontWeight:900,color:C.text,letterSpacing:'-1px' }}>{s.v}</div>
              <div style={{ fontSize:12.5,color:C.mut,marginTop:4,fontWeight:500 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding:'60px 24px',maxWidth:960,margin:'0 auto' }}>
        <div style={{ textAlign:'center',marginBottom:48 }}>
          <Badge color="blue">Fitur Lengkap</Badge>
          <h2 style={{ fontSize:'clamp(26px,4vw,42px)',fontWeight:900,color:C.text,marginTop:12,letterSpacing:'-1px' }}>Semua yang Kamu Butuhkan</h2>
          <p style={{ color:C.mut,marginTop:10,fontSize:15 }}>Dari bio link sederhana sampai toko digital lengkap</p>
        </div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:16 }}>
          {FEATURES.map((f,i)=>(
            <div key={i} className="feature-card" style={{ background:'rgba(56,189,248,0.02)',border:`1px solid ${C.border}`,borderRadius:16,padding:'22px 20px',cursor:'default' }}>
              <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12 }}>
                <span style={{ fontSize:26 }}>{f.icon}</span>
                <Badge color={f.tag==='Core'?'gray':f.tag==='Pro'?'blue':f.tag==='Elite'?'purple':'green'} size="xs">{f.tag}</Badge>
              </div>
              <div style={{ fontWeight:700,fontSize:14.5,color:C.text,marginBottom:6 }}>{f.title}</div>
              <div style={{ fontSize:13,color:C.mut,lineHeight:1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ padding:'60px 24px',maxWidth:960,margin:'0 auto' }}>
        <div style={{ textAlign:'center',marginBottom:40 }}>
          <Badge color="blue">Harga Transparan</Badge>
          <h2 style={{ fontSize:'clamp(26px,4vw,42px)',fontWeight:900,color:C.text,marginTop:12,letterSpacing:'-1px' }}>Mulai Gratis, Scale Kapanpun</h2>
          <div style={{ display:'inline-flex',alignItems:'center',gap:14,marginTop:20,background:C.card,border:`1px solid ${C.border}`,borderRadius:100,padding:'6px 8px' }}>
            {["Bulanan","Tahunan"].map((b,i)=>(
              <button key={b} onClick={()=>setYearlyBilling(i===1)}
                style={{ padding:'7px 20px',borderRadius:100,border:'none',cursor:'pointer',fontWeight:700,fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif",background:yearlyBilling===!!i?`linear-gradient(135deg,${C.p},${C.pd})`:'transparent',color:yearlyBilling===!!i?C.bg:C.mut,transition:'all .2s' }}
              >{b} {i===1&&<span style={{fontSize:10,marginLeft:4,color:yearlyBilling?C.bg:C.ok,fontWeight:800}}>-20%</span>}</button>
            ))}
          </div>
        </div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:16 }}>
          {PLANS.map(p=>(
            <div key={p.id} className={p.popular ? 'plan-popular' : ''} style={{ background:C.card,border:`1px solid ${p.popular?'rgba(56,189,248,0.45)':C.border}`,borderRadius:20,padding:'28px 22px',position:'relative',transition:'all .2s' }}>
              {p.badge && <div style={{ position:'absolute',top:-12,left:'50%',transform:'translateX(-50%)',background:`linear-gradient(135deg,${C.p},${C.acc})`,color:C.bg,fontSize:10,fontWeight:800,padding:'4px 14px',borderRadius:100,letterSpacing:1,whiteSpace:'nowrap' }}>{p.badge}</div>}
              <div style={{ marginBottom:20 }}>
                <div style={{ fontSize:12,fontWeight:700,color:C.mut,textTransform:'uppercase',letterSpacing:1,marginBottom:8 }}>{p.name}</div>
                <div style={{ fontSize:32,fontWeight:900,color:C.text,letterSpacing:'-1px' }}>
                  {p.monthly===0 ? 'Gratis' : `Rp ${((yearlyBilling?p.yearly/12:p.monthly)/1000).toFixed(0)}K`}
                  {p.monthly>0 && <span style={{ fontSize:13,fontWeight:500,color:C.dim }}>/bln</span>}
                </div>
                {yearlyBilling && p.monthly>0 && <div style={{ fontSize:11,color:C.ok,marginTop:4 }}>Hemat {rp(p.monthly*12-p.yearly)}/tahun</div>}
                <div style={{ marginTop:10,fontSize:12,color:C.p,fontWeight:600 }}>Fee {p.fee}/transaksi</div>
              </div>
              <div style={{ borderTop:`1px solid ${C.border}`,paddingTop:18,marginBottom:22,display:'flex',flexDirection:'column',gap:10 }}>
                {p.features.map((f,i)=>(
                  <div key={i} style={{ display:'flex',gap:8,alignItems:'flex-start' }}>
                    <span style={{ color:C.ok,fontSize:13,marginTop:1,flexShrink:0 }}>✓</span>
                    <span style={{ fontSize:12.5,color:C.mut }}>{f}</span>
                  </div>
                ))}
              </div>
              <Btn variant={p.popular?'primary':'ghost'} fullWidth onClick={()=>navigate('register')}>
                {p.monthly===0 ? 'Mulai Gratis' : `Pilih ${p.name}`}
              </Btn>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding:'60px 24px',maxWidth:960,margin:'0 auto' }}>
        <div style={{ textAlign:'center',marginBottom:40 }}>
          <Badge color="green">Testimoni</Badge>
          <h2 style={{ fontSize:'clamp(26px,4vw,42px)',fontWeight:900,color:C.text,marginTop:12,letterSpacing:'-1px' }}>Sudah Dipercaya Creator Indonesia</h2>
        </div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:16 }}>
          {TESTIMONIALS.map((t,i)=>(
            <div key={i} className="testimonial-card" style={{ background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:'22px 20px',transition:'all .2s' }}>
              <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:16 }}>
                <div style={{ width:42,height:42,borderRadius:'50%',background:`linear-gradient(135deg,${C.p},${C.acc})`,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:16,color:C.bg,flexShrink:0 }}>{t.name[0]}</div>
                <div>
                  <div style={{ fontWeight:700,color:C.text,fontSize:14 }}>{t.name}</div>
                  <div style={{ fontSize:12,color:C.dim }}>{t.role}</div>
                </div>
                <div style={{ marginLeft:'auto' }}>
                  <Badge color="blue" size="xs">{t.plan.toUpperCase()}</Badge>
                </div>
              </div>
              <p style={{ color:C.mut,fontSize:13,lineHeight:1.7,marginBottom:14 }}>"{t.text}"</p>
              <div style={{ paddingTop:12,borderTop:`1px solid ${C.border}` }}>
                <span style={{ fontSize:13,fontWeight:800,color:C.ok }}>{t.rev}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding:'60px 24px',maxWidth:700,margin:'0 auto' }}>
        <div style={{ textAlign:'center',marginBottom:40 }}>
          <Badge color="blue">FAQ</Badge>
          <h2 style={{ fontSize:'clamp(24px,3vw,38px)',fontWeight:900,color:C.text,marginTop:12,letterSpacing:'-1px' }}>Pertanyaan Umum</h2>
        </div>
        <div style={{ display:'flex',flexDirection:'column',gap:10 }}>
          {FAQS.map((f,i)=>(
            <div key={i} style={{ background:C.card,border:`1px solid ${openFaq===i?'rgba(56,189,248,0.3)':C.border}`,borderRadius:14,overflow:'hidden',transition:'border-color .2s' }}>
              <button onClick={()=>setOpenFaq(openFaq===i?null:i)}
                style={{ width:'100%',padding:'18px 22px',background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'space-between',gap:16 }}>
                <span style={{ fontWeight:600,color:C.text,fontSize:14,textAlign:'left' }}>{f.q}</span>
                <span style={{ color:C.p,fontSize:20,flexShrink:0,transform:openFaq===i?'rotate(45deg)':'rotate(0)',transition:'transform .2s' }}>+</span>
              </button>
              {openFaq===i && <div style={{ padding:'0 22px 18px',color:C.mut,fontSize:13.5,lineHeight:1.7 }}>{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding:'60px 24px',maxWidth:700,margin:'0 auto 80px' }}>
        <div style={{ background:`linear-gradient(135deg,rgba(56,189,248,0.08),rgba(96,165,250,0.05))`,border:`1px solid rgba(56,189,248,0.2)`,borderRadius:24,padding:'56px 36px',textAlign:'center',position:'relative',overflow:'hidden' }}>
          <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 0%,rgba(56,189,248,0.1),transparent 60%)',pointerEvents:'none' }} />
          <h2 style={{ fontSize:'clamp(24px,3.5vw,40px)',fontWeight:900,color:C.text,marginBottom:14,letterSpacing:'-1px',position:'relative' }}>Siap ubah bio jadi cuan? 🚀</h2>
          <p style={{ color:C.mut,fontSize:15,marginBottom:32,position:'relative' }}>Gratis selamanya. Upgrade kapanpun kamu siap scale.</p>
          <Btn size="lg" onClick={()=>navigate('register')} className="btn-primary-glow">✦ Buat Akun Gratis Sekarang</Btn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:`1px solid ${C.border}`,padding:'32px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:16 }}>
        <Logo onClick={()=>{}} />
        <div style={{ display:'flex',gap:20,flexWrap:'wrap' }}>
          {["Privacy","Terms","Support","Blog"].map(l=>(
            <button key={l} style={{ background:'none',border:'none',cursor:'pointer',color:C.dim,fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{l}</button>
          ))}
        </div>
        <span style={{ fontSize:12.5,color:C.dim }}>© 2025 Weiiz.ink — Where Bio Becomes Benefit</span>
      </footer>
    </div>
  );
}

// ── AUTH PAGES ─────────────────────────────────────────────────────
function AuthPage({ mode, navigate }) {
  const [tab, setTab] = useState(mode || 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pwdStrength, setPwdStrength] = useState(0);
  const toast = useToast();

  const calcStrength = (p) => {
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };
  const strengthLabel = ['','Lemah','Lumayan','Kuat','Sangat Kuat'];
  const strengthColor = ['','#f87171','#fbbf24','#34d399','#38bdf8'];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await fetch('/api/auth/login', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email,password}) });
      const data = await res.json();
      if (!res.ok) { setError(data.error||'Login gagal'); return; }
      toast('Login berhasil! Selamat datang 👋');
      setTimeout(()=>navigate('dashboard'), 800);
    } catch { setError('Koneksi bermasalah, coba lagi'); }
    finally { setLoading(false); }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!agreed) { setError('Setujui Terms of Service dahulu'); return; }
    setError(''); setLoading(true);
    try {
      const res = await fetch('/api/auth/register', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({name,email,username,password}) });
      const data = await res.json();
      if (!res.ok) { setError(data.error||'Gagal daftar'); return; }
      toast('Akun berhasil dibuat! Selamat datang 🎉');
      setTimeout(()=>navigate('dashboard'), 800);
    } catch { setError('Koneksi bermasalah, coba lagi'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:'100vh',background:C.bg,display:'flex',fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
      {/* ── Left Panel ── */}
      <div style={{ flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:48,background:`linear-gradient(135deg,rgba(56,189,248,0.05),rgba(96,165,250,0.03))`,borderRight:`1px solid ${C.border}`,position:'relative',overflow:'hidden' }}>
        <div style={{ position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(56,189,248,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,.04) 1px,transparent 1px)',backgroundSize:'48px 48px',maskImage:'radial-gradient(ellipse at center,black 40%,transparent 80%)' }} />
        <div style={{ position:'absolute',top:'25%',left:'30%',width:280,height:280,borderRadius:'50%',background:'radial-gradient(circle,rgba(56,189,248,0.1),transparent 70%)',animation:'float 9s infinite ease-in-out' }} />
        <div style={{ position:'relative',textAlign:'center',maxWidth:400 }}>
          <Logo onClick={()=>navigate('landing')} />
          <p style={{ color:C.mut,fontSize:13.5,marginTop:10,marginBottom:40 }}>Where Bio Becomes Benefit</p>
          <h2 style={{ fontSize:32,fontWeight:900,color:C.text,marginBottom:12,letterSpacing:'-1px',lineHeight:1.15 }}>Satu link.<br/>Seribu peluang.</h2>
          <p style={{ color:C.mut,fontSize:14,lineHeight:1.7,marginBottom:40 }}>Jual produk digital, terima donasi, kelola pembayaran — semuanya dari satu bio link profesional.</p>
          <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
            {["✦ Gratis selamanya untuk mulai","✦ Setup dalam 5 menit","✦ 14.200+ creator sudah bergabung"].map((b,i)=>(
              <div key={i} style={{ display:'flex',alignItems:'center',gap:12,padding:'12px 18px',background:'rgba(56,189,248,0.05)',border:`1px solid ${C.border}`,borderRadius:12 }}>
                <span style={{ fontSize:13,color:C.p,fontWeight:500 }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div style={{ width:460,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:48 }}>
        <div className="slide-up" style={{ width:'100%',maxWidth:400 }}>
          {/* Tab switch */}
          <div style={{ display:'flex',background:C.panel,borderRadius:12,padding:4,marginBottom:32,border:`1px solid ${C.border}` }}>
            {[{k:'login',l:'Masuk'},{k:'register',l:'Daftar Gratis'}].map(t=>(
              <button key={t.k} onClick={()=>{setTab(t.k);setError('')}}
                style={{ flex:1,padding:'9px',border:'none',cursor:'pointer',borderRadius:9,fontWeight:700,fontSize:13.5,fontFamily:"'Plus Jakarta Sans',sans-serif",background:tab===t.k?`linear-gradient(135deg,${C.p},${C.pd})`:'transparent',color:tab===t.k?C.bg:C.mut,transition:'all .2s' }}
              >{t.l}</button>
            ))}
          </div>

          {error && (
            <div style={{ background:'rgba(248,113,113,0.08)',border:'1px solid rgba(248,113,113,0.25)',borderRadius:10,padding:'12px 16px',marginBottom:20,color:C.err,fontSize:13,display:'flex',gap:8,alignItems:'center' }}>
              <span>⚠</span>{error}
            </div>
          )}

          {tab === 'login' ? (
            <form onSubmit={handleLogin} style={{ display:'flex',flexDirection:'column',gap:18 }}>
              <h2 style={{ fontSize:24,fontWeight:900,color:C.text,marginBottom:4,letterSpacing:'-.5px' }}>Selamat Datang Kembali 👋</h2>
              <p style={{ fontSize:13.5,color:C.mut,marginBottom:8 }}>Masuk ke dashboard kamu</p>
              <Input label="Email" placeholder="nama@email.com" type="email" value={email} onChange={setEmail} prefix="✉" />
              <div>
                <Input label="Password" placeholder="Min 8 karakter" type={showPwd?'text':'password'} value={password} onChange={setPassword}
                  prefix="🔒"
                  suffix={<button type="button" onClick={()=>setShowPwd(!showPwd)} style={{ background:'none',border:'none',cursor:'pointer',color:C.dim,fontSize:13 }}>{showPwd?'🙈':'👁'}</button>}
                />
                <div style={{ textAlign:'right',marginTop:6 }}>
                  <button type="button" style={{ background:'none',border:'none',cursor:'pointer',color:C.p,fontSize:12,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600 }}>Lupa password?</button>
                </div>
              </div>
              <Btn type="submit" fullWidth loading={loading} size="lg">{loading?'Memproses...':'Masuk ke Dashboard'}</Btn>
              <div style={{ display:'flex',alignItems:'center',gap:12 }}>
                <div style={{ flex:1,height:1,background:C.border }} />
                <span style={{ color:C.dim,fontSize:12 }}>atau</span>
                <div style={{ flex:1,height:1,background:C.border }} />
              </div>
              <Btn variant="ghost" fullWidth size="lg">
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Lanjutkan dengan Google
              </Btn>
              <p style={{ textAlign:'center',color:C.dim,fontSize:13 }}>
                Belum punya akun?{' '}
                <button type="button" onClick={()=>setTab('register')} style={{ background:'none',border:'none',cursor:'pointer',color:C.p,fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Daftar Gratis →</button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister} style={{ display:'flex',flexDirection:'column',gap:16 }}>
              <h2 style={{ fontSize:24,fontWeight:900,color:C.text,marginBottom:4,letterSpacing:'-.5px' }}>Buat Akun Gratis ✨</h2>
              <p style={{ fontSize:13.5,color:C.mut,marginBottom:4 }}>Setup selesai dalam 5 menit</p>
              <Input label="Nama Lengkap" placeholder="Nama kamu" value={name} onChange={setName} prefix="👤" />
              <Input label="Username" placeholder="username" value={username} onChange={v=>setUsername(v.toLowerCase().replace(/[^a-z0-9_]/g,''))} prefix="weiiz.ink/" hint={username?`weiiz.ink/${username}`:undefined} />
              <Input label="Email" placeholder="nama@email.com" type="email" value={email} onChange={setEmail} prefix="✉" />
              <div>
                <Input label="Password" placeholder="Min 8 karakter" type={showPwd?'text':'password'} value={password} onChange={v=>{setPassword(v);setPwdStrength(calcStrength(v))}} prefix="🔒"
                  suffix={<button type="button" onClick={()=>setShowPwd(!showPwd)} style={{ background:'none',border:'none',cursor:'pointer',color:C.dim,fontSize:13 }}>{showPwd?'🙈':'👁'}</button>}
                />
                {password && (
                  <div style={{ marginTop:8 }}>
                    <div style={{ display:'flex',gap:4 }}>
                      {[1,2,3,4].map(i=>(
                        <div key={i} style={{ flex:1,height:4,borderRadius:2,background:i<=pwdStrength?strengthColor[pwdStrength]:'rgba(56,189,248,0.1)',transition:'background .3s' }} />
                      ))}
                    </div>
                    <div style={{ fontSize:11,marginTop:4,color:strengthColor[pwdStrength] }}>{strengthLabel[pwdStrength]}</div>
                  </div>
                )}
              </div>
              <label style={{ display:'flex',alignItems:'flex-start',gap:10,cursor:'pointer' }}>
                <input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} style={{ marginTop:3,accentColor:C.p }} />
                <span style={{ fontSize:12.5,color:C.mut,lineHeight:1.5 }}>Saya setuju dengan <button type="button" style={{ background:'none',border:'none',cursor:'pointer',color:C.p,fontWeight:600,fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12.5 }}>Terms of Service</button> dan <button type="button" style={{ background:'none',border:'none',cursor:'pointer',color:C.p,fontWeight:600,fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12.5 }}>Privacy Policy</button></span>
              </label>
              <Btn type="submit" fullWidth loading={loading} size="lg" disabled={!agreed}>{loading?'Membuat akun...':'Buat Akun Gratis ✦'}</Btn>
              <p style={{ textAlign:'center',color:C.dim,fontSize:13 }}>
                Sudah punya akun?{' '}
                <button type="button" onClick={()=>setTab('login')} style={{ background:'none',border:'none',cursor:'pointer',color:C.p,fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Masuk →</button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ── BIO PAGE (PUBLIC) ─────────────────────────────────────────────
function BioPage({ navigate }) {
  const toast = useToast();
  const linkColors = { product:'#38bdf8', payment:'#fbbf24', whatsapp:'#34d399', link:'#7ba3c0', download:'#a78bfa', affiliate:'#fb923c' };
  const linkBg = { product:'rgba(56,189,248,0.1)', payment:'rgba(251,191,36,0.1)', whatsapp:'rgba(52,211,153,0.1)', link:'rgba(120,160,200,0.1)', download:'rgba(167,139,250,0.1)', affiliate:'rgba(251,146,60,0.1)' };
  const donationAmounts = [10000,25000,50000];
  const [donationAmt, setDonationAmt] = useState(25000);
  const [customAmt, setCustomAmt] = useState('');

  const BIO_LINKS = [
    {id:1,icon:"📘",title:"Ebook UI/UX Design Pro",type:"product",badge:"Rp 150K",sub:"Best Seller 📈"},
    {id:2,icon:"🎯",title:"Sesi Konsultasi 1-on-1",type:"payment",badge:"Rp 350K/sesi",sub:"Tersisa 3 slot bulan ini"},
    {id:3,icon:"🎨",title:"Figma Template Pack",type:"download",badge:"Rp 75K",sub:"30+ template premium"},
    {id:4,icon:"💬",title:"Chat via WhatsApp",type:"whatsapp",badge:"Gratis",sub:"Respon dalam 2 jam"},
    {id:5,icon:"📸",title:"Instagram @raka.design",type:"link",badge:"→",sub:"106K followers"},
    {id:6,icon:"▶",title:"YouTube Channel",type:"link",badge:"→",sub:"Tutorial UI/UX gratis"},
  ];

  return (
    <div style={{ background:C.bg,minHeight:'100vh',fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
      <div style={{ maxWidth:420,margin:'0 auto',padding:'32px 16px 80px' }}>
        {/* Back button */}
        <button onClick={()=>navigate('landing')} style={{ background:'rgba(56,189,248,0.08)',border:`1px solid ${C.border}`,borderRadius:10,padding:'8px 16px',color:C.mut,fontSize:12.5,fontWeight:600,cursor:'pointer',marginBottom:24,display:'flex',alignItems:'center',gap:6 }}>
          ← Kembali ke Landing
        </button>

        {/* Profile */}
        <div style={{ textAlign:'center',marginBottom:28,position:'relative' }}>
          <div style={{ position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:120,height:120,borderRadius:'50%',background:'radial-gradient(circle,rgba(56,189,248,0.15),transparent 70%)',animation:'glow-pulse 3s infinite',pointerEvents:'none' }} />
          <div style={{ width:72,height:72,borderRadius:'50%',background:`linear-gradient(135deg,${C.p},${C.acc})`,margin:'0 auto 14px',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:28,color:C.bg,boxShadow:`0 0 28px rgba(56,189,248,0.5)`,position:'relative' }}>R</div>
          <h1 style={{ fontSize:22,fontWeight:900,color:C.text,marginBottom:6,letterSpacing:'-.3px' }}>Raka Pratama</h1>
          <p style={{ color:C.mut,fontSize:13.5,lineHeight:1.6,marginBottom:14,maxWidth:280,margin:'0 auto 14px' }}>UI/UX Designer & Digital Creator 🎨<br/>Membantu bisnis tampil lebih profesional</p>
          <div style={{ display:'inline-flex',gap:20,background:C.card,border:`1px solid ${C.border}`,borderRadius:100,padding:'8px 20px' }}>
            {[{v:'4,2K',l:'klik'},{v:'34',l:'terjual'},{v:'5',l:'produk'}].map((s,i)=>(
              <div key={i} style={{ textAlign:'center' }}>
                <div style={{ fontSize:13,fontWeight:800,color:C.text }}>{s.v}</div>
                <div style={{ fontSize:10,color:C.dim }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div style={{ display:'flex',flexDirection:'column',gap:10,marginBottom:24 }}>
          {BIO_LINKS.map(l=>(
            <div key={l.id} className="link-hover" onClick={()=>toast(`Link "${l.title}" diklik!`,'info')}
              style={{ background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:'16px 18px',display:'flex',alignItems:'center',gap:14,cursor:'pointer',transition:'all .2s' }}>
              <div style={{ width:44,height:44,borderRadius:12,background:linkBg[l.type]||'rgba(56,189,248,0.08)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0 }}>{l.icon}</div>
              <div style={{ flex:1,minWidth:0 }}>
                <div style={{ fontWeight:700,color:C.text,fontSize:14 }}>{l.title}</div>
                {l.sub && <div style={{ fontSize:11.5,color:C.dim,marginTop:2 }}>{l.sub}</div>}
              </div>
              <div style={{ display:'flex',alignItems:'center',gap:8,flexShrink:0 }}>
                <span style={{ fontSize:11,fontWeight:700,color:linkColors[l.type]||C.p,background:linkBg[l.type]||'rgba(56,189,248,0.08)',padding:'4px 12px',borderRadius:100 }}>{l.badge}</span>
                <span style={{ color:C.dim,fontSize:14 }}>›</span>
              </div>
            </div>
          ))}
        </div>

        {/* Donation */}
        <div style={{ background:C.card,border:`1px solid ${C.border}`,borderRadius:20,padding:22,marginBottom:24 }}>
          <div style={{ textAlign:'center',marginBottom:18 }}>
            <span style={{ fontSize:22 }}>☕</span>
            <div style={{ fontWeight:800,color:C.text,fontSize:15,marginTop:6 }}>Support Raka</div>
            <div style={{ color:C.dim,fontSize:12.5,marginTop:4 }}>Traktir kopi untuk semangatin konten</div>
          </div>
          <div style={{ display:'flex',gap:8,marginBottom:12 }}>
            {donationAmounts.map(a=>(
              <button key={a} onClick={()=>setDonationAmt(a)}
                style={{ flex:1,padding:'9px 4px',border:`1px solid ${donationAmt===a?'rgba(56,189,248,0.5)':C.border}`,borderRadius:10,background:donationAmt===a?'rgba(56,189,248,0.1)':C.panel,color:donationAmt===a?C.p:C.mut,fontSize:12,fontWeight:700,cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                Rp {(a/1000).toFixed(0)}K
              </button>
            ))}
          </div>
          <input
            placeholder="Atau nominal lain..."
            value={customAmt}
            onChange={e=>setCustomAmt(e.target.value)}
            className="input-focus"
            style={{ width:'100%',background:C.panel,border:`1px solid ${C.border}`,borderRadius:10,padding:'10px 14px',color:C.text,fontSize:13,marginBottom:12,fontFamily:"'Plus Jakarta Sans',sans-serif" }}
          />
          <Btn fullWidth onClick={()=>toast('Membuka halaman pembayaran...')}>💙 Kirim Dukungan {rp(customAmt||donationAmt)}</Btn>
        </div>

        <div style={{ textAlign:'center',color:C.dim,fontSize:12 }}>
          Dibuat dengan{' '}
          <button onClick={()=>navigate('landing')} style={{ background:'none',border:'none',cursor:'pointer',color:C.p,fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12 }}>Weiiz.ink</button>
        </div>
      </div>
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────
function Dashboard({ navigate }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toast = useToast();

  const menuItems = [
    {id:'overview',    icon:'⊞', label:'Overview'},
    {id:'links',       icon:'🔗', label:'Bio & Links'},
    {id:'products',    icon:'📦', label:'Produk Digital'},
    {id:'analytics',   icon:'📊', label:'Analytics'},
    {id:'transactions',icon:'💳', label:'Transaksi'},
    {id:'withdrawal',  icon:'🏦', label:'Withdrawal'},
    {id:'ai',          icon:'🤖', label:'AI Tools'},
    {id:'settings',    icon:'⚙️', label:'Settings'},
  ];

  return (
    <div style={{ display:'flex',minHeight:'100vh',background:C.bg,fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
      {/* ── SIDEBAR ── */}
      <aside style={{ width:240,background:C.panel,borderRight:`1px solid ${C.border}`,display:'flex',flexDirection:'column',flexShrink:0,position:'sticky',top:0,height:'100vh',overflow:'auto' }}>
        <div style={{ padding:'20px 18px 16px',borderBottom:`1px solid ${C.border}` }}>
          <Logo onClick={()=>navigate('landing')} />
        </div>
        {/* User profile */}
        <div style={{ padding:'16px 18px',borderBottom:`1px solid ${C.border}`,display:'flex',gap:12,alignItems:'center' }}>
          <div style={{ width:38,height:38,borderRadius:'50%',background:`linear-gradient(135deg,${C.p},${C.acc})`,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:15,color:C.bg,flexShrink:0 }}>R</div>
          <div style={{ minWidth:0 }}>
            <div style={{ fontWeight:700,fontSize:13,color:C.text,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>Raka Pratama</div>
            <div style={{ display:'flex',alignItems:'center',gap:6,marginTop:2 }}>
              <span style={{ fontSize:11,color:C.dim }}>@raka</span>
              <Badge color="blue" size="xs">PRO</Badge>
            </div>
          </div>
        </div>
        {/* Nav */}
        <nav style={{ flex:1,padding:'10px 10px' }}>
          {menuItems.map(m=>(
            <button key={m.id} onClick={()=>setActiveTab(m.id)}
              className={`sidebar-item ${activeTab===m.id?'sidebar-active':''}`}
              style={{ width:'100%',padding:'10px 12px',borderRadius:10,border:activeTab===m.id?'none':'none',background:'transparent',cursor:'pointer',display:'flex',alignItems:'center',gap:10,color:activeTab===m.id?C.p:C.mut,fontWeight:activeTab===m.id?700:500,fontSize:13.5,textAlign:'left',fontFamily:"'Plus Jakarta Sans',sans-serif",marginBottom:2,borderLeft:activeTab===m.id?`2.5px solid ${C.p}`:'2.5px solid transparent' }}>
              <span style={{ fontSize:16 }}>{m.icon}</span>
              {m.label}
            </button>
          ))}
        </nav>
        {/* Bottom */}
        <div style={{ padding:'12px 10px',borderTop:`1px solid ${C.border}` }}>
          <button onClick={()=>navigate('admin')}
            style={{ width:'100%',padding:'9px 12px',borderRadius:10,border:`1px solid rgba(167,139,250,0.25)`,background:'rgba(167,139,250,0.06)',cursor:'pointer',display:'flex',alignItems:'center',gap:8,color:C.pur,fontSize:12.5,fontWeight:600,fontFamily:"'Plus Jakarta Sans',sans-serif",marginBottom:8 }}>
            🛡 Admin Panel <Badge color="purple" size="xs">Demo</Badge>
          </button>
          <button onClick={()=>navigate('landing')}
            style={{ width:'100%',padding:'9px 12px',borderRadius:10,border:`1px solid ${C.border}`,background:'transparent',cursor:'pointer',display:'flex',alignItems:'center',gap:8,color:C.dim,fontSize:12.5,fontWeight:500,fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
            ← Keluar
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main style={{ flex:1,overflow:'auto',maxHeight:'100vh' }}>
        <DashboardContent tab={activeTab} setTab={setActiveTab} navigate={navigate} toast={toast} />
      </main>
    </div>
  );
}

// ── DASHBOARD CONTENT ─────────────────────────────────────────────
function DashboardContent({ tab, setTab, navigate, toast }) {
  const pages = {
    overview:     <DOverview    toast={toast} setTab={setTab} />,
    links:        <DLinks       toast={toast} />,
    products:     <DProducts    toast={toast} />,
    analytics:    <DAnalytics  />,
    transactions: <DTransactions />,
    withdrawal:   <DWithdrawal  toast={toast} />,
    ai:           <DAITools     toast={toast} />,
    settings:     <DSettings    toast={toast} />,
  };
  return pages[tab] || pages.overview;
}

// ── OVERVIEW ──────────────────────────────────────────────────────
function DOverview({ toast, setTab }) {
  const maxV = Math.max(...CHART_DATA.map(d=>d.v));
  const hour = new Date().getHours();
  const greet = hour<12?'pagi':hour<15?'siang':hour<18?'sore':'malam';

  return (
    <div style={{ padding:28 }}>
      {/* Header */}
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontSize:22,fontWeight:900,color:C.text,letterSpacing:'-.5px' }}>Selamat {greet}, Raka! 👋</h1>
        <div style={{ display:'flex',alignItems:'center',gap:10,marginTop:6 }}>
          <span style={{ fontSize:13.5,color:C.mut }}>Revenue bulan ini</span>
          <Badge color="green" size="xs">↑ 23% vs bulan lalu</Badge>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:16,marginBottom:28 }}>
        <StatCard icon="💰" value="Rp 4,87jt" label="Revenue Bulan Ini" trend="+23%" />
        <StatCard icon="👆" value="7.405" label="Total Klik Bio" trend="+12%" />
        <StatCard icon="📦" value="34" label="Produk Terjual" trend="+8%" />
        <StatCard icon="📈" value="1,4%" label="Conversion Rate" trend="+0.3%" />
        <StatCard icon="🏦" value="Rp 3,75jt" label="Saldo Tersedia" sub="Siap dicairkan" />
      </div>

      <div style={{ display:'grid',gridTemplateColumns:'1fr 380px',gap:20,marginBottom:28 }}>
        {/* Revenue Chart */}
        <Card style={{ padding:24 }}>
          <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20 }}>
            <div>
              <h3 style={{ fontWeight:800,color:C.text,fontSize:15 }}>Revenue 7 Hari</h3>
              <p style={{ fontSize:12,color:C.dim,marginTop:2 }}>Senin – Minggu</p>
            </div>
            <Badge color="blue" size="xs">Minggu Ini</Badge>
          </div>
          <div style={{ display:'flex',alignItems:'flex-end',gap:8,height:140 }}>
            {CHART_DATA.map((d,i)=>{
              const pct = (d.v/maxV)*100;
              const isMax = d.v===maxV;
              return (
                <div key={i} style={{ flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:6,height:'100%',justifyContent:'flex-end' }}>
                  <span style={{ fontSize:9,color:isMax?C.p:C.dim }}>{isMax?rp(d.v):''}</span>
                  <div className="chart-bar" style={{ width:'100%',borderRadius:'4px 4px 0 0',background:isMax?`linear-gradient(to top,${C.pd},${C.p})`:'rgba(56,189,248,0.2)',height:`${pct}%`,transition:'height .6s ease' }} />
                  <span style={{ fontSize:11,color:C.dim }}>{d.day}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card style={{ padding:24 }}>
          <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16 }}>
            <h3 style={{ fontWeight:800,color:C.text,fontSize:15 }}>Transaksi Terbaru</h3>
            <button onClick={()=>setTab('transactions')} style={{ background:'none',border:'none',cursor:'pointer',color:C.p,fontSize:12,fontWeight:600,fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Lihat semua →</button>
          </div>
          <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
            {MOCK_TXN.slice(0,4).map(t=>(
              <div key={t.id} style={{ display:'flex',alignItems:'center',gap:10 }}>
                <div style={{ width:32,height:32,borderRadius:'50%',background:'rgba(56,189,248,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:800,color:C.p,flexShrink:0 }}>{t.buyer[0]}</div>
                <div style={{ flex:1,minWidth:0 }}>
                  <div style={{ fontSize:12.5,fontWeight:600,color:C.text,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{t.buyer}</div>
                  <div style={{ fontSize:11,color:C.dim }}>{t.product}</div>
                </div>
                <div style={{ textAlign:'right',flexShrink:0 }}>
                  <div style={{ fontSize:12.5,fontWeight:700,color:C.ok }}>+{rp(t.amount)}</div>
                  <StatusBadge status={t.status} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick actions */}
      <div style={{ display:'flex',gap:12,flexWrap:'wrap' }}>
        <Btn variant="ghost" size="sm" onClick={()=>setTab('links')}>➕ Tambah Link</Btn>
        <Btn variant="ghost" size="sm" onClick={()=>setTab('products')}>📦 Buat Produk</Btn>
        <Btn variant="ghost" size="sm" onClick={()=>{}}>🔗 Lihat Bio →</Btn>
      </div>
    </div>
  );
}

// ── LINKS ─────────────────────────────────────────────────────────
function DLinks({ toast }) {
  const [links, setLinks] = useState(MOCK_LINKS);
  const [modal, setModal] = useState(false);
  const [newLink, setNewLink] = useState({ title:'', url:'', type:'link', price:'' });
  const [copied, setCopied] = useState(false);
  const linkTypeConfig = {
    product:  {color:'#38bdf8',bg:'rgba(56,189,248,0.1)', label:'PRODUK',  icon:'📦'},
    payment:  {color:'#fbbf24',bg:'rgba(251,191,36,0.1)', label:'PAYMENT', icon:'💳'},
    whatsapp: {color:'#34d399',bg:'rgba(52,211,153,0.1)', label:'WHATSAPP',icon:'💬'},
    link:     {color:'#7ba3c0',bg:'rgba(120,160,200,0.1)',label:'LINK',     icon:'🔗'},
    download: {color:'#a78bfa',bg:'rgba(167,139,250,0.1)',label:'DOWNLOAD',icon:'⬇'},
    affiliate:{color:'#fb923c',bg:'rgba(251,146,60,0.1)', label:'AFILIASI', icon:'🤝'},
  };

  const toggleActive = (id) => {
    setLinks(p=>p.map(l=>l.id===id?{...l,active:!l.active}:l));
    toast('Status link diperbarui','info');
  };
  const deleteLink = (id) => {
    setLinks(p=>p.filter(l=>l.id!==id));
    toast('Link berhasil dihapus','success');
  };
  const addLink = () => {
    if (!newLink.title||!newLink.url) { toast('Judul dan URL wajib diisi','error'); return; }
    setLinks(p=>[...p,{id:Date.now(),...newLink,price:Number(newLink.price)||0,clicks:0,revenue:0,active:true}]);
    setModal(false); setNewLink({title:'',url:'',type:'link',price:''});
    toast('Link berhasil ditambahkan! 🎉');
  };
  const copyBio = () => {
    setCopied(true);
    toast('URL bio disalin! 📋','info');
    setTimeout(()=>setCopied(false),2000);
  };

  return (
    <div style={{ padding:28 }}>
      {/* Header */}
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24,flexWrap:'wrap',gap:12 }}>
        <div>
          <h1 style={{ fontSize:22,fontWeight:900,color:C.text,letterSpacing:'-.5px' }}>Bio & Links</h1>
          <div style={{ display:'flex',alignItems:'center',gap:10,marginTop:6 }}>
            <button onClick={copyBio} style={{ display:'flex',alignItems:'center',gap:6,background:'rgba(56,189,248,0.06)',border:`1px solid ${C.border}`,borderRadius:8,padding:'5px 12px',cursor:'pointer',color:C.p,fontSize:12.5,fontWeight:600,fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
              {copied?'✅':'🔗'} weiiz.ink/raka
            </button>
            <Badge color="blue" size="xs">{links.filter(l=>l.active).length} link aktif</Badge>
          </div>
        </div>
        <div style={{ display:'flex',gap:10 }}>
          <Btn variant="ghost" size="sm">👁 Preview Bio</Btn>
          <Btn size="sm" onClick={()=>setModal(true)}>+ Tambah Link</Btn>
        </div>
      </div>

      {/* Links list */}
      <Card style={{ overflow:'hidden' }}>
        {links.map((l,i)=>{
          const tc = linkTypeConfig[l.type]||linkTypeConfig.link;
          return (
            <div key={l.id} className="row-hover" style={{ padding:'16px 20px',display:'flex',alignItems:'center',gap:14,borderBottom:i<links.length-1?`1px solid ${C.border}`:'none' }}>
              <span style={{ color:C.dim,fontSize:16,cursor:'grab' }}>⣿</span>
              <div style={{ width:40,height:40,borderRadius:10,background:tc.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0 }}>{tc.icon}</div>
              <div style={{ flex:1,minWidth:0 }}>
                <div style={{ display:'flex',alignItems:'center',gap:8,marginBottom:3 }}>
                  <span style={{ fontWeight:700,color:C.text,fontSize:14 }}>{l.title}</span>
                  <span style={{ fontSize:10,fontWeight:700,color:tc.color,background:tc.bg,padding:'1px 7px',borderRadius:100 }}>{tc.label}</span>
                </div>
                <div style={{ fontSize:11.5,color:C.dim,fontFamily:"'Fira Code',monospace",overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{l.url}</div>
              </div>
              <div style={{ display:'flex',gap:20,alignItems:'center',flexShrink:0 }}>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:13,fontWeight:700,color:C.text }}>{l.clicks.toLocaleString()}</div>
                  <div style={{ fontSize:10,color:C.dim }}>klik</div>
                </div>
                {l.revenue>0 && (
                  <div style={{ textAlign:'center' }}>
                    <div style={{ fontSize:13,fontWeight:700,color:C.ok }}>{rp(l.revenue)}</div>
                    <div style={{ fontSize:10,color:C.dim }}>revenue</div>
                  </div>
                )}
                <ToggleSwitch on={l.active} onChange={()=>toggleActive(l.id)} />
                <button onClick={()=>deleteLink(l.id)} style={{ background:'rgba(248,113,113,0.08)',border:`1px solid rgba(248,113,113,0.2)`,borderRadius:8,width:30,height:30,cursor:'pointer',color:C.err,fontSize:14,display:'flex',alignItems:'center',justifyContent:'center' }}>×</button>
              </div>
            </div>
          );
        })}
        {links.length===0 && (
          <div style={{ padding:'60px 24px',textAlign:'center' }}>
            <div style={{ fontSize:40,marginBottom:12 }}>🔗</div>
            <div style={{ color:C.text,fontWeight:700,marginBottom:6 }}>Belum ada link</div>
            <div style={{ color:C.dim,fontSize:13,marginBottom:20 }}>Tambahkan link pertama kamu untuk mulai monetisasi</div>
            <Btn size="sm" onClick={()=>setModal(true)}>+ Tambah Link Pertama</Btn>
          </div>
        )}
      </Card>

      {/* Modal */}
      <Modal open={modal} onClose={()=>setModal(false)} title="Tambah Link Baru">
        <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
          <div>
            <div style={{ fontSize:12,fontWeight:600,color:C.mut,marginBottom:10 }}>TIPE LINK</div>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8 }}>
              {Object.entries(linkTypeConfig).map(([k,v])=>(
                <button key={k} onClick={()=>setNewLink(p=>({...p,type:k}))}
                  style={{ padding:'10px 8px',border:`1px solid ${newLink.type===k?v.color:C.border}`,borderRadius:10,background:newLink.type===k?v.bg:'transparent',cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",transition:'all .15s' }}>
                  <div style={{ fontSize:18,marginBottom:4 }}>{v.icon}</div>
                  <div style={{ fontSize:11,fontWeight:700,color:newLink.type===k?v.color:C.mut }}>{v.label}</div>
                </button>
              ))}
            </div>
          </div>
          <Input label="Judul" placeholder="Nama link" value={newLink.title} onChange={v=>setNewLink(p=>({...p,title:v}))} />
          <Input label={newLink.type==='whatsapp'?'Nomor WA':'URL'} placeholder={newLink.type==='whatsapp'?'628123456789':'https://...'} value={newLink.url} onChange={v=>setNewLink(p=>({...p,url:v}))} />
          {['product','payment'].includes(newLink.type) && (
            <Input label="Harga (Rp)" placeholder="150000" type="number" value={newLink.price} onChange={v=>setNewLink(p=>({...p,price:v}))} prefix="Rp" />
          )}
          <div style={{ display:'flex',gap:10,marginTop:4 }}>
            <Btn variant="ghost" fullWidth onClick={()=>setModal(false)}>Batal</Btn>
            <Btn fullWidth onClick={addLink}>Tambah Link</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ── PRODUCTS ──────────────────────────────────────────────────────
function DProducts({ toast }) {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [modal, setModal] = useState(false);
  const [newP, setNewP] = useState({ name:'', type:'ebook', price:'', description:'' });
  const productTypes = [
    {k:'ebook',icon:'📘',label:'Ebook'},{k:'template',icon:'🎨',label:'Template'},
    {k:'course',icon:'🎓',label:'Course'},{k:'consultation',icon:'🎯',label:'Konsultasi'},
    {k:'membership',icon:'⭐',label:'Membership'},{k:'ticket',icon:'🎫',label:'Tiket Event'},
  ];

  return (
    <div style={{ padding:28 }}>
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24 }}>
        <div>
          <h1 style={{ fontSize:22,fontWeight:900,color:C.text,letterSpacing:'-.5px' }}>Produk Digital</h1>
          <p style={{ color:C.dim,fontSize:13,marginTop:4 }}>{products.filter(p=>p.status==='active').length} produk aktif</p>
        </div>
        <Btn size="sm" onClick={()=>setModal(true)}>+ Buat Produk</Btn>
      </div>
      <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:16 }}>
        {products.map(p=>(
          <div key={p.id} className="product-card" style={{ background:C.card,border:`1px solid ${C.border}`,borderRadius:18,overflow:'hidden',transition:'all .2s' }}>
            <div style={{ padding:'22px 20px',background:`linear-gradient(135deg,rgba(56,189,248,0.06),transparent)`,textAlign:'center' }}>
              <div style={{ fontSize:44,marginBottom:10 }}>{p.cover}</div>
              <StatusBadge status={p.status} />
            </div>
            <div style={{ padding:'16px 18px 20px' }}>
              <div style={{ fontWeight:800,color:C.text,fontSize:14.5,marginBottom:4 }}>{p.name}</div>
              <div style={{ fontSize:12,color:C.dim,marginBottom:14 }}>{p.type.charAt(0).toUpperCase()+p.type.slice(1)}</div>
              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:16 }}>
                <div style={{ background:C.panel,borderRadius:8,padding:'8px 10px' }}>
                  <div style={{ fontSize:12,fontWeight:800,color:C.text }}>{rp(p.price)}</div>
                  <div style={{ fontSize:10,color:C.dim }}>harga</div>
                </div>
                <div style={{ background:C.panel,borderRadius:8,padding:'8px 10px' }}>
                  <div style={{ fontSize:12,fontWeight:800,color:C.ok }}>{p.sold}×</div>
                  <div style={{ fontSize:10,color:C.dim }}>terjual</div>
                </div>
              </div>
              <div style={{ fontSize:11.5,color:C.mut,marginBottom:16 }}>Total revenue: <strong style={{ color:C.ok }}>{rp(p.revenue)}</strong></div>
              <div style={{ display:'flex',gap:8 }}>
                <Btn variant="ghost" size="sm" fullWidth>✏ Edit</Btn>
                <Btn variant={p.status==='active'?'muted':'success'} size="sm" fullWidth onClick={()=>{
                  setProducts(prev=>prev.map(x=>x.id===p.id?{...x,status:x.status==='active'?'inactive':'active'}:x));
                  toast('Status produk diperbarui','info');
                }}>{p.status==='active'?'Nonaktif':'Aktifkan'}</Btn>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modal} onClose={()=>setModal(false)} title="Buat Produk Digital">
        <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
          <div>
            <div style={{ fontSize:12,fontWeight:600,color:C.mut,marginBottom:10 }}>TIPE PRODUK</div>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8 }}>
              {productTypes.map(t=>(
                <button key={t.k} onClick={()=>setNewP(p=>({...p,type:t.k}))}
                  style={{ padding:'10px 8px',border:`1px solid ${newP.type===t.k?C.p:C.border}`,borderRadius:10,background:newP.type===t.k?'rgba(56,189,248,0.1)':'transparent',cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                  <div style={{ fontSize:20,marginBottom:4 }}>{t.icon}</div>
                  <div style={{ fontSize:11,fontWeight:700,color:newP.type===t.k?C.p:C.mut }}>{t.label}</div>
                </button>
              ))}
            </div>
          </div>
          <Input label="Nama Produk" placeholder="Nama yang menarik" value={newP.name} onChange={v=>setNewP(p=>({...p,name:v}))} />
          <Input label="Harga (Rp)" placeholder="150000" type="number" value={newP.price} onChange={v=>setNewP(p=>({...p,price:v}))} prefix="Rp" />
          <div style={{ display:'flex',flexDirection:'column',gap:6 }}>
            <label style={{ fontSize:13,fontWeight:600,color:C.mut }}>Deskripsi</label>
            <textarea value={newP.description} onChange={e=>setNewP(p=>({...p,description:e.target.value}))}
              placeholder="Jelaskan produkmu dengan detail..."
              className="input-focus"
              style={{ background:C.panel,border:`1px solid ${C.border}`,borderRadius:10,padding:'11px 14px',color:C.text,fontSize:13.5,fontFamily:"'Plus Jakarta Sans',sans-serif",resize:'vertical',minHeight:80 }} />
          </div>
          <div style={{ display:'flex',gap:10 }}>
            <Btn variant="ghost" fullWidth onClick={()=>setModal(false)}>Batal</Btn>
            <Btn fullWidth onClick={()=>{ toast('Produk berhasil dibuat! 🎉'); setModal(false); }}>Buat Produk</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ── ANALYTICS ─────────────────────────────────────────────────────
function DAnalytics() {
  const maxV = Math.max(...CHART_DATA.map(d=>d.v));
  const MONTHS = [
    {m:'Agt',v:1200000},{m:'Sep',v:1800000},{m:'Okt',v:2400000},
    {m:'Nov',v:3100000},{m:'Des',v:2800000},{m:'Jan',v:4870000},
  ];
  const maxM = Math.max(...MONTHS.map(m=>m.v));
  const DEVICES = [{l:'Mobile',pct:68,color:C.p},{l:'Desktop',pct:24,color:C.acc},{l:'Tablet',pct:8,color:C.pur}];
  const LOCS = [
    {city:'Jakarta',pct:42,flag:'🇮🇩'},{city:'Surabaya',pct:21,flag:'🇮🇩'},{city:'Bandung',pct:13,flag:'🇮🇩'},
    {city:'Medan',pct:10,flag:'🇮🇩'},{city:'Singapura',pct:6,flag:'🇸🇬'},{city:'Kuala Lumpur',pct:3,flag:'🇲🇾'},
  ];

  return (
    <div style={{ padding:28 }}>
      <h1 style={{ fontSize:22,fontWeight:900,color:C.text,marginBottom:24,letterSpacing:'-.5px' }}>Analytics</h1>
      <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:14,marginBottom:24 }}>
        {[
          {icon:'👥',v:'4.205',l:'Unique Visitors'},
          {icon:'👆',v:'7.405',l:'Total Klik'},
          {icon:'⏱',v:'2m 12s',l:'Avg Session'},
          {icon:'🚪',v:'31%',l:'Bounce Rate'},
          {icon:'🎯',v:'1,4%',l:'Klik → Beli'},
        ].map((s,i)=><StatCard key={i} {...s} />)}
      </div>
      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:20 }}>
        {/* Revenue trend */}
        <Card style={{ padding:24 }}>
          <h3 style={{ fontWeight:800,color:C.text,fontSize:15,marginBottom:20 }}>Revenue 6 Bulan</h3>
          <div style={{ display:'flex',alignItems:'flex-end',gap:8,height:120 }}>
            {MONTHS.map((m,i)=>{
              const pct=(m.v/maxM)*100;
              const isLast=i===MONTHS.length-1;
              return (
                <div key={i} style={{ flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4,height:'100%',justifyContent:'flex-end' }}>
                  <div style={{ width:'100%',borderRadius:'4px 4px 0 0',background:isLast?`linear-gradient(to top,${C.pd},${C.p})`:'rgba(56,189,248,0.2)',height:`${pct}%`,transition:'height .6s ease' }} />
                  <span style={{ fontSize:11,color:C.dim }}>{m.m}</span>
                </div>
              );
            })}
          </div>
        </Card>
        {/* Device */}
        <Card style={{ padding:24 }}>
          <h3 style={{ fontWeight:800,color:C.text,fontSize:15,marginBottom:20 }}>Perangkat Pengunjung</h3>
          {DEVICES.map((d,i)=>(
            <div key={i} style={{ marginBottom:16 }}>
              <div style={{ display:'flex',justifyContent:'space-between',marginBottom:6 }}>
                <span style={{ fontSize:13,color:C.mut }}>{d.l}</span>
                <span style={{ fontSize:13,fontWeight:700,color:C.text }}>{d.pct}%</span>
              </div>
              <div style={{ height:6,borderRadius:3,background:'rgba(56,189,248,0.1)' }}>
                <div style={{ height:'100%',borderRadius:3,background:d.color,width:`${d.pct}%`,transition:'width .6s ease' }} />
              </div>
            </div>
          ))}
        </Card>
      </div>
      {/* Locations */}
      <Card style={{ padding:24 }}>
        <h3 style={{ fontWeight:800,color:C.text,fontSize:15,marginBottom:20 }}>Top Lokasi Pengunjung</h3>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:12 }}>
          {LOCS.map((l,i)=>(
            <div key={i} style={{ display:'flex',alignItems:'center',gap:12,padding:'12px 14px',background:C.panel,borderRadius:12 }}>
              <span style={{ fontSize:20 }}>{l.flag}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13,fontWeight:600,color:C.text }}>{l.city}</div>
                <div style={{ height:4,borderRadius:2,background:'rgba(56,189,248,0.1)',marginTop:6 }}>
                  <div style={{ height:'100%',borderRadius:2,background:C.p,width:`${l.pct}%` }} />
                </div>
              </div>
              <span style={{ fontSize:13,fontWeight:700,color:C.p }}>{l.pct}%</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ── TRANSACTIONS ──────────────────────────────────────────────────
function DTransactions() {
  const [filter, setFilter] = useState('all');
  const statuses = ['all','success','pending','failed'];
  const filtered = filter==='all'?MOCK_TXN:MOCK_TXN.filter(t=>t.status===filter);

  return (
    <div style={{ padding:28 }}>
      <h1 style={{ fontSize:22,fontWeight:900,color:C.text,marginBottom:24,letterSpacing:'-.5px' }}>Transaksi</h1>
      <div style={{ display:'flex',gap:8,marginBottom:20,flexWrap:'wrap' }}>
        {statuses.map(s=>(
          <button key={s} onClick={()=>setFilter(s)}
            style={{ padding:'7px 18px',borderRadius:100,border:`1px solid ${filter===s?C.p:C.border}`,background:filter===s?'rgba(56,189,248,0.1)':'transparent',color:filter===s?C.p:C.mut,cursor:'pointer',fontSize:12.5,fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
            {s==='all'?'Semua':s.charAt(0).toUpperCase()+s.slice(1)}
            <span style={{ marginLeft:6,fontSize:11,opacity:.7 }}>({s==='all'?MOCK_TXN.length:MOCK_TXN.filter(t=>t.status===s).length})</span>
          </button>
        ))}
      </div>
      <Card style={{ overflow:'hidden' }}>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%',borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:'rgba(56,189,248,0.04)' }}>
                {['ID','Pembeli','Produk','Metode','Jumlah','Tgl','Status'].map(h=>(
                  <th key={h} style={{ padding:'12px 16px',textAlign:'left',fontSize:11,fontWeight:700,color:C.dim,letterSpacing:.8,textTransform:'uppercase',borderBottom:`1px solid ${C.border}`,whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(t=>(
                <tr key={t.id} className="row-hover" style={{ borderBottom:`1px solid rgba(56,189,248,0.06)` }}>
                  <td style={{ padding:'14px 16px',fontFamily:"'Fira Code',monospace",fontSize:12,color:C.dim }}>{t.id}</td>
                  <td style={{ padding:'14px 16px' }}>
                    <div style={{ display:'flex',alignItems:'center',gap:8 }}>
                      <div style={{ width:28,height:28,borderRadius:'50%',background:'rgba(56,189,248,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:C.p,flexShrink:0 }}>{t.buyer[0]}</div>
                      <span style={{ fontSize:13,fontWeight:600,color:C.text,whiteSpace:'nowrap' }}>{t.buyer}</span>
                    </div>
                  </td>
                  <td style={{ padding:'14px 16px',fontSize:12.5,color:C.mut,whiteSpace:'nowrap' }}>{t.product}</td>
                  <td style={{ padding:'14px 16px' }}><Badge color="gray" size="xs">{t.method}</Badge></td>
                  <td style={{ padding:'14px 16px',fontSize:13,fontWeight:700,color:C.ok,whiteSpace:'nowrap' }}>+{rp(t.amount)}</td>
                  <td style={{ padding:'14px 16px',fontSize:12,color:C.dim,whiteSpace:'nowrap' }}>{t.date}</td>
                  <td style={{ padding:'14px 16px' }}><StatusBadge status={t.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length===0 && (
          <div style={{ padding:'40px 24px',textAlign:'center',color:C.dim,fontSize:13 }}>Tidak ada transaksi {filter!=='all'&&`dengan status ${filter}`}</div>
        )}
      </Card>
    </div>
  );
}

// ── WITHDRAWAL ────────────────────────────────────────────────────
function DWithdrawal({ toast }) {
  const [amount, setAmount] = useState('');
  const [bank, setBank] = useState('');
  const [account, setAccount] = useState('');
  const [accountName, setAccountName] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = () => {
    if (!amount||!bank||!account||!accountName) { toast('Semua field wajib diisi','error'); return; }
    if (Number(amount)<50000) { toast('Minimum withdrawal Rp 50.000','error'); return; }
    setLoading(true);
    setTimeout(()=>{ setLoading(false); toast('Request withdrawal berhasil! Diproses 1-3 hari kerja 🎉'); setAmount(''); setBank(''); setAccount(''); setAccountName(''); },1200);
  };

  return (
    <div style={{ padding:28 }}>
      <h1 style={{ fontSize:22,fontWeight:900,color:C.text,marginBottom:24,letterSpacing:'-.5px' }}>Withdrawal</h1>
      <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:16,marginBottom:28 }}>
        <StatCard icon="💰" value="Rp 3,75jt" label="Saldo Tersedia" />
        <StatCard icon="✅" value="Rp 15,2jt" label="Total Dicairkan" />
        <StatCard icon="⏳" value="Rp 3jt" label="Sedang Diproses" />
      </div>
      <div style={{ display:'grid',gridTemplateColumns:'1fr 340px',gap:24 }}>
        {/* History */}
        <Card style={{ padding:24 }}>
          <h3 style={{ fontWeight:800,color:C.text,fontSize:15,marginBottom:18 }}>Riwayat Pencairan</h3>
          {[
            {id:'WD-001',amount:2000000,bank:'BCA',account:'****1234',status:'processed',date:'2025-01-10'},
            {id:'WD-002',amount:1500000,bank:'GoPay',account:'081234****',status:'processed',date:'2024-12-28'},
            {id:'WD-003',amount:3000000,bank:'Mandiri',account:'****5678',status:'pending',date:'2025-01-15'},
          ].map(w=>(
            <div key={w.id} className="row-hover" style={{ display:'flex',alignItems:'center',gap:14,padding:'14px 0',borderBottom:`1px solid rgba(56,189,248,0.06)` }}>
              <div style={{ width:38,height:38,borderRadius:10,background:'rgba(56,189,248,0.08)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,flexShrink:0 }}>🏦</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13,fontWeight:700,color:C.text }}>{w.bank} · {w.account}</div>
                <div style={{ fontSize:11.5,color:C.dim,marginTop:2 }}>{w.date}</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:13.5,fontWeight:700,color:C.text,marginBottom:4 }}>{rp(w.amount)}</div>
                <StatusBadge status={w.status} />
              </div>
            </div>
          ))}
        </Card>

        {/* Request form */}
        <Card style={{ padding:24,alignSelf:'start' }}>
          <h3 style={{ fontWeight:800,color:C.text,fontSize:15,marginBottom:18 }}>Request Pencairan</h3>
          <div style={{ display:'flex',flexDirection:'column',gap:14 }}>
            <Input label="Nominal (Rp)" placeholder="min Rp 50.000" type="number" value={amount} onChange={setAmount} prefix="Rp" />
            <div style={{ display:'flex',flexDirection:'column',gap:6 }}>
              <label style={{ fontSize:13,fontWeight:600,color:C.mut }}>Bank / E-Wallet</label>
              <select value={bank} onChange={e=>setBank(e.target.value)} className="input-focus"
                style={{ background:C.panel,border:`1px solid ${C.border}`,borderRadius:10,padding:'11px 14px',color:bank?C.text:C.dim,fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                <option value="">Pilih bank / e-wallet</option>
                {['BCA','Mandiri','BNI','BRI','GoPay','OVO','Dana','ShopeePay'].map(b=><option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <Input label="Nomor Rekening / Akun" placeholder="0123456789" value={account} onChange={setAccount} />
            <Input label="Nama Pemilik Rekening" placeholder="Sesuai nama bank" value={accountName} onChange={setAccountName} />
            <div style={{ padding:'12px 14px',background:'rgba(251,191,36,0.06)',border:'1px solid rgba(251,191,36,0.2)',borderRadius:10,fontSize:12.5,color:C.warn,lineHeight:1.6 }}>
              ⚠ Diproses dalam 1–3 hari kerja. Pastikan nomor rekening benar.
            </div>
            <Btn fullWidth loading={loading} onClick={submit} size="lg">Ajukan Pencairan</Btn>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── AI TOOLS ──────────────────────────────────────────────────────
function DAITools({ toast }) {
  const [activeTool, setActiveTool] = useState('bio');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const tools = [
    {k:'bio',   icon:'✍️', label:'Bio Generator',       placeholder:'Ceritakan profesi dan keahlian kamu...'},
    {k:'caption',icon:'📝',label:'Caption Instagram',   placeholder:'Topik atau produk yang ingin dipromosikan...'},
    {k:'product',icon:'📦',label:'Deskripsi Produk',    placeholder:'Nama dan detail produk kamu...'},
    {k:'cta',   icon:'🎯', label:'CTA Writer',          placeholder:'Produk/layanan yang ingin dijual...'},
  ];

  const SAMPLES = {
    bio: `UI/UX Designer & Digital Creator dengan 5+ tahun pengalaman membantu bisnis tampil lebih profesional. Spesialisasi: design system, landing page, dan dashboard SaaS. Sudah bantu 120+ klien dari startup hingga enterprise. 🎨✨`,
    caption: `📱 Desain yang bagus bukan tentang estetika — tapi tentang konversi!\n\nSaya baru launch ebook "UI/UX Design Pro" yang isinya:\n✦ 80+ halaman tips desain\n✦ Template Figma gratis\n✦ Case study real project\n\n👆 Link di bio untuk dapatkan!`,
    product: `Ebook UI/UX Design Pro adalah panduan komprehensif bagi siapapun yang ingin menguasai desain digital modern. Dengan 80+ halaman konten premium, kamu akan belajar dari dasar hingga mahir membuat interface yang indah sekaligus fungsional.`,
    cta: `🚀 Mau bisnis kamu makin profesional? \nDapatkan sesi konsultasi 1-on-1 dengan Raka dan transformasi visual brand kamu dalam 60 menit! Slot terbatas — only 3 left this month. 🔥`,
  };

  const generate = () => {
    if (!input.trim()) { toast('Masukkan deskripsi terlebih dahulu', 'error'); return; }
    setLoading(true); setResult('');
    setTimeout(()=>{ setResult(SAMPLES[activeTool]); setLoading(false); toast('Konten berhasil digenerate! 🤖'); },1800);
  };

  const activeTl = tools.find(t=>t.k===activeTool);

  return (
    <div style={{ padding:28 }}>
      <div style={{ marginBottom:24 }}>
        <h1 style={{ fontSize:22,fontWeight:900,color:C.text,letterSpacing:'-.5px' }}>AI Tools</h1>
        <p style={{ color:C.dim,fontSize:13,marginTop:4 }}>Generate konten berkualitas tinggi dalam hitungan detik</p>
      </div>
      <div style={{ display:'grid',gridTemplateColumns:'220px 1fr',gap:20 }}>
        {/* Tool picker */}
        <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
          {tools.map(t=>(
            <button key={t.k} onClick={()=>{setActiveTool(t.k);setResult('');setInput('');}}
              className={activeTool===t.k?'sidebar-active sidebar-item':'sidebar-item'}
              style={{ padding:'13px 16px',borderRadius:12,border:'none',background:'transparent',cursor:'pointer',display:'flex',alignItems:'center',gap:10,color:activeTool===t.k?C.p:C.mut,fontWeight:activeTool===t.k?700:500,fontSize:13.5,textAlign:'left',fontFamily:"'Plus Jakarta Sans',sans-serif",borderLeft:activeTool===t.k?`2.5px solid ${C.p}`:'2.5px solid transparent' }}>
              <span style={{ fontSize:18 }}>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>

        {/* Workspace */}
        <Card style={{ padding:28 }}>
          <h3 style={{ fontWeight:800,color:C.text,fontSize:16,marginBottom:6 }}>{activeTl?.icon} {activeTl?.label}</h3>
          <p style={{ color:C.dim,fontSize:12.5,marginBottom:20 }}>Deskripsikan apa yang kamu butuhkan</p>
          <div style={{ display:'flex',flexDirection:'column',gap:6,marginBottom:16 }}>
            <label style={{ fontSize:13,fontWeight:600,color:C.mut }}>Input</label>
            <textarea value={input} onChange={e=>setInput(e.target.value)} placeholder={activeTl?.placeholder}
              className="input-focus"
              style={{ background:C.panel,border:`1px solid ${C.border}`,borderRadius:10,padding:'14px',color:C.text,fontSize:13.5,fontFamily:"'Plus Jakarta Sans',sans-serif",resize:'vertical',minHeight:100 }} />
          </div>
          <Btn fullWidth size="lg" loading={loading} onClick={generate}>
            {loading ? 'AI sedang bekerja...' : '✨ Generate dengan AI'}
          </Btn>
          {result && (
            <div style={{ marginTop:20 }}>
              <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10 }}>
                <span style={{ fontSize:13,fontWeight:600,color:C.mut }}>Hasil Generate:</span>
                <button onClick={()=>{navigator.clipboard?.writeText(result);toast('Disalin!','info');}}
                  style={{ background:'rgba(56,189,248,0.08)',border:`1px solid ${C.border}`,borderRadius:8,padding:'5px 12px',cursor:'pointer',color:C.p,fontSize:12,fontWeight:600,fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                  📋 Salin
                </button>
              </div>
              <div style={{ background:C.panel,border:`1px solid rgba(56,189,248,0.2)`,borderRadius:12,padding:'16px 18px',fontSize:13.5,color:C.text,lineHeight:1.75,whiteSpace:'pre-wrap' }}>{result}</div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

// ── SETTINGS ──────────────────────────────────────────────────────
function DSettings({ toast }) {
  const [subTab, setSubTab] = useState('profile');
  const [name, setName] = useState('Raka Pratama');
  const [bio, setBio] = useState('UI/UX Designer & Digital Creator 🎨');
  const [domain, setDomain] = useState('');
  const [twofa, setTwofa] = useState(false);
  const settingsTabs = [
    {k:'profile',icon:'👤',l:'Profil'},
    {k:'subscription',icon:'💎',l:'Subscription'},
    {k:'domain',icon:'🌐',l:'Domain'},
    {k:'payment',icon:'💳',l:'Payment'},
    {k:'security',icon:'🔐',l:'Keamanan'},
  ];

  return (
    <div style={{ padding:28 }}>
      <h1 style={{ fontSize:22,fontWeight:900,color:C.text,marginBottom:24,letterSpacing:'-.5px' }}>Settings</h1>
      <div style={{ display:'flex',gap:4,marginBottom:24,borderBottom:`1px solid ${C.border}`,paddingBottom:0,flexWrap:'wrap' }}>
        {settingsTabs.map(t=>(
          <button key={t.k} onClick={()=>setSubTab(t.k)}
            className={subTab===t.k?'tab-active':''}
            style={{ padding:'10px 18px',background:'none',border:'none',cursor:'pointer',color:subTab===t.k?C.p:C.mut,fontWeight:subTab===t.k?700:500,fontSize:13.5,fontFamily:"'Plus Jakarta Sans',sans-serif",display:'flex',alignItems:'center',gap:6,whiteSpace:'nowrap' }}>
            {t.icon} {t.l}
          </button>
        ))}
      </div>

      {subTab==='profile' && (
        <Card style={{ padding:28,maxWidth:560 }}>
          <h3 style={{ fontWeight:800,color:C.text,fontSize:15,marginBottom:20 }}>Edit Profil</h3>
          <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
            <div style={{ display:'flex',alignItems:'center',gap:16,marginBottom:8 }}>
              <div style={{ width:64,height:64,borderRadius:'50%',background:`linear-gradient(135deg,${C.p},${C.acc})`,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:24,color:C.bg }}>R</div>
              <Btn variant="ghost" size="sm">Ganti Foto</Btn>
            </div>
            <Input label="Nama Lengkap" value={name} onChange={setName} />
            <Input label="Username" value="raka" onChange={()=>{}} prefix="weiiz.ink/" />
            <Input label="Email" value="raka@gmail.com" onChange={()=>{}} type="email" />
            <div style={{ display:'flex',flexDirection:'column',gap:6 }}>
              <label style={{ fontSize:13,fontWeight:600,color:C.mut }}>Bio</label>
              <textarea value={bio} onChange={e=>setBio(e.target.value)} rows={3} className="input-focus"
                style={{ background:C.panel,border:`1px solid ${C.border}`,borderRadius:10,padding:'11px 14px',color:C.text,fontSize:13.5,fontFamily:"'Plus Jakarta Sans',sans-serif",resize:'vertical' }} />
            </div>
            <Btn onClick={()=>toast('Profil berhasil disimpan! ✅')}>Simpan Perubahan</Btn>
          </div>
        </Card>
      )}

      {subTab==='subscription' && (
        <div style={{ maxWidth:600 }}>
          <Card style={{ padding:24,marginBottom:16 }}>
            <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16 }}>
              <div>
                <div style={{ fontWeight:800,color:C.text,fontSize:16 }}>Plan Pro ⭐</div>
                <div style={{ color:C.dim,fontSize:13,marginTop:4 }}>Aktif hingga 15 Februari 2025</div>
              </div>
              <Badge color="blue">AKTIF</Badge>
            </div>
            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:12 }}>
              {['Rp 99.000/bulan','1% fee transaksi','Custom domain','AI Tools aktif'].map((f,i)=>(
                <div key={i} style={{ display:'flex',gap:8,alignItems:'center',fontSize:13,color:C.mut }}>
                  <span style={{ color:C.ok }}>✓</span>{f}
                </div>
              ))}
            </div>
          </Card>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:12 }}>
            {[{n:'Pro',p:'Rp 99K',badge:'Aktif Sekarang'},{n:'Elite',p:'Rp 199K',badge:'Upgrade'}].map(p=>(
              <Card key={p.n} style={{ padding:20 }}>
                <div style={{ fontWeight:800,color:C.text,marginBottom:4 }}>Plan {p.n}</div>
                <div style={{ fontSize:20,fontWeight:900,color:C.p,marginBottom:12 }}>{p.p}<span style={{ fontSize:12,color:C.dim }}>/bln</span></div>
                <Btn variant={p.badge==='Upgrade'?'primary':'ghost'} fullWidth size="sm" onClick={()=>p.badge==='Upgrade'&&toast('Mengalihkan ke halaman upgrade...')}>{p.badge}</Btn>
              </Card>
            ))}
          </div>
        </div>
      )}

      {subTab==='domain' && (
        <Card style={{ padding:28,maxWidth:520 }}>
          <h3 style={{ fontWeight:800,color:C.text,fontSize:15,marginBottom:6 }}>Custom Domain</h3>
          <p style={{ color:C.dim,fontSize:13,marginBottom:20,lineHeight:1.6 }}>Ganti <code style={{ color:C.p,background:'rgba(56,189,248,0.08)',padding:'1px 7px',borderRadius:5 }}>weiiz.ink/raka</code> dengan domain milikmu sendiri</p>
          <div style={{ padding:'14px 16px',background:'rgba(56,189,248,0.05)',border:`1px solid ${C.border}`,borderRadius:12,marginBottom:20 }}>
            <div style={{ fontSize:12,color:C.dim,marginBottom:6 }}>Domain Default</div>
            <div style={{ fontSize:15,fontWeight:700,color:C.p }}>weiiz.ink/raka</div>
          </div>
          <Input label="Custom Domain" placeholder="bio.namakamu.com" value={domain} onChange={setDomain} />
          {domain && (
            <div style={{ marginTop:16,padding:'14px 16px',background:'rgba(251,191,36,0.06)',border:'1px solid rgba(251,191,36,0.2)',borderRadius:12 }}>
              <div style={{ fontSize:12.5,fontWeight:700,color:C.warn,marginBottom:8 }}>⚙ DNS yang perlu ditambahkan:</div>
              {[{type:'CNAME',name:'bio',value:'proxy.weiiz.ink'}].map((r,i)=>(
                <div key={i} style={{ fontFamily:"'Fira Code',monospace",fontSize:12,color:C.mut,lineHeight:2 }}>
                  Type: <span style={{ color:C.p }}>{r.type}</span> · Name: <span style={{ color:C.p }}>{r.name}</span> · Value: <span style={{ color:C.ok }}>{r.value}</span>
                </div>
              ))}
            </div>
          )}
          <Btn style={{ marginTop:16 }} onClick={()=>toast('Domain sedang diverifikasi...')}>Pasang Domain</Btn>
        </Card>
      )}

      {subTab==='payment' && (
        <div style={{ maxWidth:600 }}>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:14 }}>
            {[
              {name:'Midtrans',icon:'🏦',status:'active',color:'green'},
              {name:'Stripe',icon:'💳',status:'active',color:'blue'},
              {name:'QRIS',icon:'📱',status:'active',color:'green'},
              {name:'Virtual Account',icon:'🔢',status:'inactive',color:'gray'},
            ].map(g=>(
              <Card key={g.name} style={{ padding:20 }}>
                <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14 }}>
                  <div style={{ display:'flex',alignItems:'center',gap:10 }}>
                    <span style={{ fontSize:22 }}>{g.icon}</span>
                    <div>
                      <div style={{ fontWeight:700,color:C.text,fontSize:13.5 }}>{g.name}</div>
                      <StatusBadge status={g.status} />
                    </div>
                  </div>
                </div>
                <Input placeholder="Server key..." value="" onChange={()=>{}} />
              </Card>
            ))}
          </div>
        </div>
      )}

      {subTab==='security' && (
        <Card style={{ padding:28,maxWidth:480 }}>
          <h3 style={{ fontWeight:800,color:C.text,fontSize:15,marginBottom:20 }}>Keamanan Akun</h3>
          <div style={{ marginBottom:24 }}>
            <div style={{ fontSize:13,fontWeight:700,color:C.text,marginBottom:16 }}>Ganti Password</div>
            <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
              <Input label="Password Lama" type="password" value="" onChange={()=>{}} placeholder="••••••••" />
              <Input label="Password Baru" type="password" value="" onChange={()=>{}} placeholder="Min 8 karakter" />
              <Input label="Konfirmasi Password" type="password" value="" onChange={()=>{}} placeholder="Ulangi password baru" />
              <Btn onClick={()=>toast('Password berhasil diperbarui ✅')}>Update Password</Btn>
            </div>
          </div>
          <div style={{ borderTop:`1px solid ${C.border}`,paddingTop:24 }}>
            <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between' }}>
              <div>
                <div style={{ fontSize:13.5,fontWeight:700,color:C.text }}>Two-Factor Authentication</div>
                <div style={{ fontSize:12.5,color:C.dim,marginTop:3 }}>Keamanan login ekstra via Google Authenticator</div>
              </div>
              <ToggleSwitch on={twofa} onChange={v=>{ setTwofa(v); toast(v?'2FA diaktifkan ✅':'2FA dinonaktifkan','info'); }} />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

// ── ADMIN PANEL ───────────────────────────────────────────────────
function AdminPanel({ navigate }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState(ADMIN_USERS);
  const [withdrawals, setWithdrawals] = useState(ADMIN_WITHDRAWALS);
  const toast = useToast();

  const menuItems = [
    {id:'overview',icon:'🏠',label:'Overview'},
    {id:'users',  icon:'👥',label:'Kelola User'},
    {id:'withdrawals',icon:'💸',label:'Withdrawal',badge:withdrawals.filter(w=>w.status==='pending').length},
    {id:'pricing',icon:'💰',label:'Konfigurasi Harga'},
    {id:'global', icon:'📈',label:'Global Analytics'},
  ];

  return (
    <div style={{ display:'flex',minHeight:'100vh',background:C.bg,fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
      {/* Admin Sidebar */}
      <aside style={{ width:230,background:C.panel,borderRight:`1px solid ${C.border}`,display:'flex',flexDirection:'column',flexShrink:0 }}>
        <div style={{ padding:'20px 18px 16px',borderBottom:`1px solid ${C.border}` }}>
          <Logo onClick={()=>navigate('landing')} />
          <div style={{ marginTop:10 }}><Badge color="red">ADMIN PANEL</Badge></div>
        </div>
        <nav style={{ flex:1,padding:'10px 10px' }}>
          {menuItems.map(m=>(
            <button key={m.id} onClick={()=>setActiveTab(m.id)}
              className={`sidebar-item ${activeTab===m.id?'sidebar-active':''}`}
              style={{ width:'100%',padding:'10px 12px',borderRadius:10,border:'none',background:'transparent',cursor:'pointer',display:'flex',alignItems:'center',gap:10,color:activeTab===m.id?C.p:C.mut,fontWeight:activeTab===m.id?700:500,fontSize:13.5,textAlign:'left',fontFamily:"'Plus Jakarta Sans',sans-serif",marginBottom:2,borderLeft:activeTab===m.id?`2.5px solid ${C.p}`:'2.5px solid transparent',justifyContent:'space-between' }}>
              <span style={{ display:'flex',alignItems:'center',gap:10 }}><span>{m.icon}</span>{m.label}</span>
              {m.badge>0 && <Badge color="red" size="xs">{m.badge}</Badge>}
            </button>
          ))}
        </nav>
        <div style={{ padding:'12px 10px',borderTop:`1px solid ${C.border}` }}>
          <button onClick={()=>navigate('dashboard')}
            style={{ width:'100%',padding:'9px 12px',borderRadius:10,border:`1px solid ${C.border}`,background:'transparent',cursor:'pointer',color:C.dim,fontSize:12.5,fontWeight:500,fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
            ← Dashboard User
          </button>
        </div>
      </aside>

      {/* Admin Content */}
      <main style={{ flex:1,padding:28,overflow:'auto' }}>
        {activeTab==='overview' && (
          <div>
            <h1 style={{ fontSize:22,fontWeight:900,color:C.text,marginBottom:24 }}>Admin Overview</h1>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(170px,1fr))',gap:16,marginBottom:24 }}>
              <StatCard icon="💹" value="Rp 8,4M" label="Total GMV" trend="+34%" />
              <StatCard icon="👥" value="14.200" label="Total User" trend="+12%" />
              <StatCard icon="💳" value="1.240" label="Txn Bulan Ini" />
              <StatCard icon="💎" value="2.840" label="Subscriber Aktif" />
              <StatCard icon="⏳" value="Rp 12,5jt" label="Withdrawal Pending" sub="3 request" />
            </div>
            {/* Plan distribution */}
            <Card style={{ padding:24,marginBottom:20 }}>
              <h3 style={{ fontWeight:800,color:C.text,fontSize:15,marginBottom:20 }}>Distribusi Subscription</h3>
              <div style={{ display:'flex',flexDirection:'column',gap:14 }}>
                {[{l:'Free',pct:58,v:'8.236',color:C.dim},{l:'Starter',pct:20,v:'2.840',color:C.p},{l:'Pro',pct:17,v:'2.414',color:C.acc},{l:'Elite',pct:5,v:'710',color:C.pur}].map(p=>(
                  <div key={p.l} style={{ display:'flex',alignItems:'center',gap:16 }}>
                    <span style={{ width:60,fontSize:13,fontWeight:600,color:C.text }}>{p.l}</span>
                    <div style={{ flex:1,height:10,borderRadius:5,background:'rgba(56,189,248,0.1)' }}>
                      <div style={{ height:'100%',borderRadius:5,background:p.color,width:`${p.pct}%` }} />
                    </div>
                    <span style={{ width:40,fontSize:12.5,color:C.mut,textAlign:'right' }}>{p.pct}%</span>
                    <span style={{ width:50,fontSize:12.5,fontWeight:700,color:C.text,textAlign:'right' }}>{p.v}</span>
                  </div>
                ))}
              </div>
            </Card>
            {/* Top creators */}
            <Card style={{ padding:24 }}>
              <h3 style={{ fontWeight:800,color:C.text,fontSize:15,marginBottom:18 }}>Top Creator Bulan Ini</h3>
              {ADMIN_USERS.sort((a,b)=>b.gmv-a.gmv).slice(0,3).map((u,i)=>(
                <div key={u.id} className="row-hover" style={{ display:'flex',alignItems:'center',gap:14,padding:'12px 0',borderBottom:i<2?`1px solid rgba(56,189,248,0.06)`:'none' }}>
                  <span style={{ width:24,fontSize:15,fontWeight:800,color:i===0?C.warn:C.dim }}>#{i+1}</span>
                  <div style={{ width:36,height:36,borderRadius:'50%',background:`linear-gradient(135deg,${C.p},${C.acc})`,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:14,color:C.bg,flexShrink:0 }}>{u.name[0]}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13.5,fontWeight:700,color:C.text }}>{u.name}</div>
                    <div style={{ fontSize:12,color:C.dim }}>@{u.username}</div>
                  </div>
                  <Badge color={u.plan==='elite'?'purple':u.plan==='pro'?'blue':u.plan==='starter'?'green':'gray'}>{u.plan.toUpperCase()}</Badge>
                  <div style={{ fontSize:13.5,fontWeight:800,color:C.ok }}>{rp(u.gmv)}</div>
                </div>
              ))}
            </Card>
          </div>
        )}

        {activeTab==='users' && (
          <div>
            <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24 }}>
              <h1 style={{ fontSize:22,fontWeight:900,color:C.text }}>Kelola User</h1>
              <input placeholder="🔍 Cari nama / email / username..." className="input-focus"
                style={{ width:280,background:C.panel,border:`1px solid ${C.border}`,borderRadius:10,padding:'9px 14px',color:C.text,fontSize:13.5,fontFamily:"'Plus Jakarta Sans',sans-serif" }} />
            </div>
            <Card style={{ overflow:'hidden' }}>
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%',borderCollapse:'collapse' }}>
                  <thead>
                    <tr style={{ background:'rgba(56,189,248,0.04)' }}>
                      {['User','Username','Plan','GMV Total','Bergabung','Status','Aksi'].map(h=>(
                        <th key={h} style={{ padding:'12px 16px',textAlign:'left',fontSize:11,fontWeight:700,color:C.dim,textTransform:'uppercase',letterSpacing:.8,borderBottom:`1px solid ${C.border}`,whiteSpace:'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u=>(
                      <tr key={u.id} className="row-hover" style={{ borderBottom:`1px solid rgba(56,189,248,0.06)` }}>
                        <td style={{ padding:'14px 16px' }}>
                          <div style={{ display:'flex',alignItems:'center',gap:10 }}>
                            <div style={{ width:32,height:32,borderRadius:'50%',background:`linear-gradient(135deg,${C.p},${C.acc})`,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,color:C.bg,flexShrink:0 }}>{u.name[0]}</div>
                            <div>
                              <div style={{ fontSize:13,fontWeight:700,color:C.text,whiteSpace:'nowrap' }}>{u.name}</div>
                              <div style={{ fontSize:11,color:C.dim }}>{u.email}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding:'14px 16px',fontFamily:"'Fira Code',monospace",fontSize:12,color:C.p }}>@{u.username}</td>
                        <td style={{ padding:'14px 16px' }}><Badge color={u.plan==='elite'?'purple':u.plan==='pro'?'blue':u.plan==='starter'?'green':'gray'}>{u.plan.toUpperCase()}</Badge></td>
                        <td style={{ padding:'14px 16px',fontSize:13,fontWeight:700,color:C.ok,whiteSpace:'nowrap' }}>{rp(u.gmv)}</td>
                        <td style={{ padding:'14px 16px',fontSize:12,color:C.dim }}>{u.joined}</td>
                        <td style={{ padding:'14px 16px' }}><StatusBadge status={u.status} /></td>
                        <td style={{ padding:'14px 16px' }}>
                          <Btn variant={u.status==='active'?'danger':'success'} size="sm"
                            onClick={()=>{ setUsers(p=>p.map(x=>x.id===u.id?{...x,status:x.status==='active'?'suspended':'active'}:x)); toast(`User ${u.name} ${u.status==='active'?'disuspend':'diaktifkan'}`, u.status==='active'?'error':'success'); }}>
                            {u.status==='active'?'Suspend':'Aktifkan'}
                          </Btn>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {activeTab==='withdrawals' && (
          <div>
            <h1 style={{ fontSize:22,fontWeight:900,color:C.text,marginBottom:24 }}>Withdrawal Request</h1>
            <div style={{ display:'flex',flexDirection:'column',gap:14 }}>
              {withdrawals.map(w=>(
                <Card key={w.id} style={{ padding:22 }}>
                  <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:16 }}>
                    <div style={{ display:'flex',alignItems:'center',gap:14 }}>
                      <div style={{ width:44,height:44,borderRadius:12,background:'rgba(56,189,248,0.08)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20 }}>🏦</div>
                      <div>
                        <div style={{ fontWeight:700,color:C.text,fontSize:14 }}>{w.user}</div>
                        <div style={{ fontSize:12,color:C.dim }}>{w.email}</div>
                        <div style={{ fontSize:12,color:C.mut,marginTop:2 }}>{w.bank} · {w.account} · {w.date}</div>
                      </div>
                    </div>
                    <div style={{ textAlign:'right' }}>
                      <div style={{ fontSize:22,fontWeight:900,color:C.text,marginBottom:4 }}>{rp(w.amount)}</div>
                      <StatusBadge status={w.status} />
                    </div>
                    {w.status==='pending' && (
                      <div style={{ display:'flex',gap:10 }}>
                        <Btn variant="success" size="sm" onClick={()=>{ setWithdrawals(p=>p.map(x=>x.id===w.id?{...x,status:'approved'}:x)); toast(`Withdrawal ${w.user} disetujui ✅`); }}>✓ Setujui</Btn>
                        <Btn variant="danger" size="sm" onClick={()=>{ setWithdrawals(p=>p.map(x=>x.id===w.id?{...x,status:'rejected'}:x)); toast(`Withdrawal ${w.user} ditolak`,'error'); }}>✕ Tolak</Btn>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab==='pricing' && (
          <div>
            <h1 style={{ fontSize:22,fontWeight:900,color:C.text,marginBottom:24 }}>Konfigurasi Harga</h1>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:16,marginBottom:20 }}>
              {PLANS.filter(p=>p.id!=='free').map(p=>(
                <Card key={p.id} style={{ padding:22 }}>
                  <div style={{ fontWeight:800,color:C.text,marginBottom:14 }}>Plan {p.name}</div>
                  <div style={{ display:'flex',flexDirection:'column',gap:10 }}>
                    <Input label="Harga Bulanan (Rp)" value={String(p.monthly)} onChange={()=>{}} type="number" />
                    <Input label="Harga Tahunan (Rp)" value={String(p.yearly)} onChange={()=>{}} type="number" />
                  </div>
                </Card>
              ))}
            </div>
            <Card style={{ padding:22,maxWidth:480 }}>
              <h3 style={{ fontWeight:800,color:C.text,marginBottom:14 }}>Fee Transaksi</h3>
              <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
                <Input label="Fee Plan Free (%)" value="5" onChange={()=>{}} />
                <Input label="Fee Plan Berbayar (%)" value="1" onChange={()=>{}} />
                <Btn onClick={()=>toast('Konfigurasi harga disimpan ✅')}>Simpan Konfigurasi</Btn>
              </div>
            </Card>
          </div>
        )}

        {activeTab==='global' && (
          <div>
            <h1 style={{ fontSize:22,fontWeight:900,color:C.text,marginBottom:24 }}>Global Analytics</h1>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:16,marginBottom:24 }}>
              <StatCard icon="🌐" value="284K" label="Page Views" trend="+18%" />
              <StatCard icon="⚡" value="1,2M" label="API Calls" />
              <StatCard icon="🖥" value="23%" label="Server Load" />
              <StatCard icon="⚠" value="0,02%" label="Error Rate" />
            </div>
            <Card style={{ padding:24 }}>
              <h3 style={{ fontWeight:800,color:C.text,fontSize:15,marginBottom:18 }}>Top Creator by GMV</h3>
              {ADMIN_USERS.sort((a,b)=>b.gmv-a.gmv).map((u,i)=>(
                <div key={u.id} className="row-hover" style={{ display:'flex',alignItems:'center',gap:14,padding:'12px 0',borderBottom:i<ADMIN_USERS.length-1?`1px solid rgba(56,189,248,0.06)`:'none' }}>
                  <span style={{ width:28,fontSize:14,fontWeight:800,color:i===0?C.warn:i===1?C.mut:C.dim }}>#{i+1}</span>
                  <div style={{ width:34,height:34,borderRadius:'50%',background:`linear-gradient(135deg,${C.p},${C.acc})`,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,color:C.bg,flexShrink:0 }}>{u.name[0]}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13.5,fontWeight:600,color:C.text }}>{u.name}</div>
                    <div style={{ fontSize:11,color:C.dim }}>@{u.username}</div>
                  </div>
                  <Badge color={u.plan==='elite'?'purple':u.plan==='pro'?'blue':u.plan==='starter'?'green':'gray'}>{u.plan.toUpperCase()}</Badge>
                  <div style={{ fontSize:14,fontWeight:800,color:C.ok }}>{rp(u.gmv)}</div>
                </div>
              ))}
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}

// ── PAYMENT SUCCESS ───────────────────────────────────────────────
function PaymentSuccess({ navigate }) {
  return (
    <div style={{ minHeight:'100vh',background:C.bg,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Plus Jakarta Sans',sans-serif",padding:24 }}>
      <div className="slide-up" style={{ maxWidth:440,width:'100%',textAlign:'center' }}>
        <div style={{ width:80,height:80,borderRadius:'50%',background:'rgba(52,211,153,0.12)',border:'2px solid rgba(52,211,153,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:38,margin:'0 auto 24px',boxShadow:'0 0 32px rgba(52,211,153,0.2)' }}>✓</div>
        <h1 style={{ fontSize:28,fontWeight:900,color:C.text,marginBottom:12 }}>Pembayaran Berhasil! 🎉</h1>
        <p style={{ color:C.mut,fontSize:14.5,lineHeight:1.7,marginBottom:32 }}>
          Terima kasih! Produk kamu sedang diproses.<br/>Cek email untuk link download.
        </p>
        <Card style={{ padding:20,marginBottom:24,textAlign:'left' }}>
          {[['Order ID','WZ-20250115-ABC'],['Produk','Ebook UI/UX Design Pro'],['Total','Rp 150.000'],['Metode','GoPay'],['Status','Sukses ✅']].map(([k,v],i)=>(
            <div key={i} style={{ display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:i<4?`1px solid rgba(56,189,248,0.06)`:'none' }}>
              <span style={{ fontSize:13,color:C.dim }}>{k}</span>
              <span style={{ fontSize:13,fontWeight:600,color:C.text,fontFamily:k==='Order ID'?"'Fira Code',monospace":undefined }}>{v}</span>
            </div>
          ))}
        </Card>
        <div style={{ display:'flex',gap:12 }}>
          <Btn variant="ghost" fullWidth size="lg" onClick={()=>navigate('landing')}>Kembali ke Beranda</Btn>
          <Btn fullWidth size="lg">⬇ Download Produk</Btn>
        </div>
      </div>
    </div>
  );
}

// ── NAVIGATION FLOATER ───────────────────────────────────────────
function NavFloater({ page, navigate }) {
  const pages = [
    {id:'landing',   icon:'🏠', label:'Landing'},
    {id:'login',     icon:'🔑', label:'Login'},
    {id:'bio',       icon:'👁', label:'Bio Publik'},
    {id:'dashboard', icon:'📊', label:'Dashboard'},
    {id:'admin',     icon:'🛡', label:'Admin'},
    {id:'success',   icon:'✅', label:'Payment'},
  ];
  return (
    <div style={{ position:'fixed',bottom:24,left:'50%',transform:'translateX(-50%)',zIndex:9998,background:'rgba(5,15,32,0.92)',border:`1px solid rgba(56,189,248,0.2)`,borderRadius:100,padding:'8px 14px',display:'flex',gap:4,backdropFilter:'blur(16px)',boxShadow:'0 8px 32px rgba(0,0,0,0.4)' }}>
      {pages.map(p=>(
        <button key={p.id} onClick={()=>navigate(p.id)}
          style={{ padding:'8px 14px',borderRadius:100,border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:6,background:page===p.id?'rgba(56,189,248,0.18)':'transparent',color:page===p.id?'#38bdf8':'#7ba3c0',fontSize:12,fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif",transition:'all .2s',whiteSpace:'nowrap' }}>
          <span>{p.icon}</span>
          <span style={{ display:'none' }}>{p.label}</span>
        </button>
      ))}
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────
export default function WeiizApp() {
  const [page, setPage] = useState('landing');
  const navigate = (p) => { setPage(p); window.scrollTo(0,0); };

  const pages = {
    landing: <LandingPage navigate={navigate} />,
    login:   <AuthPage mode="login" navigate={navigate} />,
    register:<AuthPage mode="register" navigate={navigate} />,
    bio:     <BioPage navigate={navigate} />,
    dashboard:<Dashboard navigate={navigate} />,
    admin:   <AdminPanel navigate={navigate} />,
    success: <PaymentSuccess navigate={navigate} />,
  };

  return (
    <ToastProvider>
      <FontStyle />
      {pages[page] || pages.landing}
      <NavFloater page={page} navigate={navigate} />
    </ToastProvider>
  );
}