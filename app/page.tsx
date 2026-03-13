'use client';

import { useState, useEffect, useRef } from 'react';

const PAGES = ['home','login','register','about','blog','help','privacy','terms','status','careers','press','contact'];
const PAGES_WITH_FOOTER = ['home','about','blog','help','privacy','terms','status','careers','press'];

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [toast, setToast] = useState({ msg: '', type: '', show: false });
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [showRegPass, setShowRegPass] = useState(false);
  const [usernameHint, setUsernameHint] = useState('Huruf kecil, angka, dan underscore (_)');
  const [usernameValid, setUsernameValid] = useState<boolean | null>(null);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordStrengthColor, setPasswordStrengthColor] = useState('');
  const [statusTime, setStatusTime] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const prices = { creator: [39000, 29000], pro: [99000, 74000], business: [249000, 187000] };
  const fmt = (n: number) => 'Rp' + n.toLocaleString('id-ID');

  const loginEmail = useRef<HTMLInputElement>(null);
  const loginPass = useRef<HTMLInputElement>(null);
  const regName = useRef<HTMLInputElement>(null);
  const regUsername = useRef<HTMLInputElement>(null);
  const regEmail = useRef<HTMLInputElement>(null);
  const regPassword = useRef<HTMLInputElement>(null);
  const regTerms = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setStatusTime(new Date().toLocaleString('id-ID'));
    const hash = window.location.hash.replace('#', '');
    if (hash && PAGES.includes(hash)) setCurrentPage(hash);
  }, []);

  useEffect(() => {
    window.location.hash = currentPage === 'home' ? '' : currentPage;
    window.scrollTo(0, 0);
  }, [currentPage]);

  const navigate = (page: string) => {
    if (page === 'contact') {
      showToast('Halaman kontak segera hadir! Hubungi kami di support@weiiz.ink');
      return;
    }
    setCurrentPage(page);
    setMobileNavOpen(false);
  };

  const scrollToSection = (id: string) => {
    setTimeout(() => {
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const showToast = (msg: string, type = '') => {
    setToast({ msg, type, show: true });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, show: false })), 3500);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqs(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };

  const handleLogin = () => {
    const email = loginEmail.current?.value.trim() || '';
    const pass = loginPass.current?.value || '';
    if (!email || !pass) { setLoginError('Email dan password tidak boleh kosong.'); return; }
    if (!email.includes('@')) { setLoginError('Format email tidak valid.'); return; }
    setLoginError('');
    setLoginLoading(true);
    setTimeout(() => {
      setLoginLoading(false);
      showToast('Login berhasil! Selamat datang kembali 👋', 'success');
    }, 1500);
  };

  const handleRegister = () => {
    const name = regName.current?.value.trim() || '';
    const username = regUsername.current?.value.trim() || '';
    const email = regEmail.current?.value.trim() || '';
    const pass = regPassword.current?.value || '';
    const terms = regTerms.current?.checked || false;
    if (!name || !username || !email || !pass) { setRegisterError('Semua field wajib diisi.'); return; }
    if (!email.includes('@')) { setRegisterError('Format email tidak valid.'); return; }
    if (pass.length < 8) { setRegisterError('Password minimal 8 karakter.'); return; }
    if (!terms) { setRegisterError('Kamu harus menyetujui Terms of Service.'); return; }
    setRegisterError('');
    setRegisterLoading(true);
    setTimeout(() => {
      setRegisterLoading(false);
      showToast('Akun berhasil dibuat! Cek email untuk verifikasi ✉️', 'success');
    }, 1800);
  };

  const handleGoogleAuth = () => {
    showToast('Menghubungkan dengan Google...', 'success');
    setTimeout(() => showToast('Login Google berhasil! 🎉', 'success'), 1500);
  };

  const checkUsername = (val: string) => {
    if (!val) { setUsernameHint('Huruf kecil, angka, dan underscore (_)'); setUsernameValid(null); return; }
    const valid = /^[a-z0-9_]+$/.test(val);
    setUsernameValid(valid);
    setUsernameHint(valid ? '✓ Username tersedia!' : '✗ Hanya huruf kecil, angka, dan underscore');
  };

  const checkPasswordStrength = (val: string) => {
    if (!val) { setPasswordStrength(''); return; }
    let strength = 0;
    if (val.length >= 8) strength++;
    if (/[A-Z]/.test(val)) strength++;
    if (/[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;
    const levels = ['', 'Lemah', 'Cukup', 'Kuat', 'Sangat Kuat'];
    const colors = ['', '#ef4444', '#fbbf24', 'var(--accent)', 'var(--green)'];
    setPasswordStrength(strength ? 'Kekuatan: ' + levels[strength] : '');
    setPasswordStrengthColor(colors[strength]);
  };

  const showsFooter = PAGES_WITH_FOOTER.includes(currentPage);

  // Dashboard chart bars
  const chartBars = [40, 65, 55, 80, 70, 90, 75];

  const faqs = [
    { q: 'Apakah Weiiz.ink benar-benar gratis?', a: 'Ya! Plan FREE tidak ada biaya bulanan sama sekali. Kamu hanya bayar fee 5% per transaksi yang berhasil. Tidak ada biaya setup, tidak ada kartu kredit yang dibutuhkan. Daftar sekarang dan mulai monetisasi hari ini.' },
    { q: 'Apa bedanya Weiiz dengan Linktree atau Lynk.id?', a: 'Weiiz bukan sekadar bio link. Weiiz adalah platform monetisasi lengkap — kamu bisa jual produk digital, terima donasi, buat membership, kelola afiliasi, dan analitik real-time, semuanya dalam satu dashboard. Platform lain hanya link, Weiiz adalah mesin penghasil uang.' },
    { q: 'Bagaimana cara withdrawal saldo?', a: 'Withdrawal bisa dilakukan ke rekening bank lokal manapun (BCA, Mandiri, BNI, BRI, dll) atau e-wallet (GoPay, OVO, DANA). Proses 1x24 jam untuk plan Free & Creator. Plan Pro dan Business bisa withdrawal kapan saja, proses instan.' },
    { q: 'Apakah bisa pakai domain sendiri?', a: 'Bisa! Plan Pro ke atas mendukung custom domain. Misalnya kamu bisa set link.namakamu.com atau bio.tokomu.com. Caranya mudah — cukup arahkan DNS domain kamu ke server Weiiz, dan ikuti panduan di dashboard.' },
    { q: 'Produk digital apa saja yang bisa dijual?', a: 'Hampir semua jenis file digital bisa dijual: e-book (PDF), template Canva/Figma, preset Lightroom/VSCO, kursus video, music pack, foto stok, dokumen, spreadsheet, dan banyak lagi. Ukuran file hingga 2GB per produk.' },
    { q: 'Apakah data dan transaksi aman?', a: 'Keamanan adalah prioritas utama kami. Semua data dienkripsi dengan SSL 256-bit. Sistem pembayaran diproses melalui Midtrans yang telah bersertifikasi PCI DSS. Kami juga mendukung 2FA untuk perlindungan akun tambahan. Platform kami memiliki uptime 99.98%.' },
    { q: 'Apakah ada aplikasi mobile?', a: 'Saat ini Weiiz bisa diakses melalui browser mobile dengan tampilan yang sudah dioptimalkan. Aplikasi mobile native (iOS & Android) sedang dalam tahap pengembangan dan akan segera hadir. Daftar sekarang untuk mendapat early access!' },
  ];

  const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.29-8.16 2.29-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        :root {
          --bg: #0a0a0f; --bg2: #111118; --bg3: #18181f;
          --border: rgba(255,255,255,0.08); --border2: rgba(255,255,255,0.12);
          --text: #f0f0f8; --text2: #9898b0;
          --accent: #ff5c35; --accent2: #ff8c35;
          --accent-soft: rgba(255,92,53,0.12); --accent-glow: rgba(255,92,53,0.3);
          --green: #22c55e; --blue: #3b82f6; --purple: #a855f7;
          --radius: 16px; --radius-sm: 10px;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; overflow-x: hidden; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes floatAnim { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; height: 64px; background: rgba(10,10,15,0.85); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); }
        .nav-logo { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: var(--text); text-decoration: none; letter-spacing: -0.5px; cursor: pointer; }
        .nav-logo span { color: var(--accent); }
        .nav-links { display: flex; gap: 4px; align-items: center; }
        .nav-links a { color: var(--text2); text-decoration: none; font-size: 14px; font-weight: 500; padding: 8px 14px; border-radius: 8px; transition: all 0.2s; cursor: pointer; }
        .nav-links a:hover { color: var(--text); background: var(--bg3); }
        .nav-cta { display: flex; gap: 8px; align-items: center; }
        .btn-ghost { background: none; border: 1px solid var(--border2); color: var(--text2); padding: 8px 18px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: inherit; transition: all 0.2s; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; }
        .btn-ghost:hover { background: var(--bg3); color: var(--text); }
        .btn-primary { background: var(--accent); color: white; border: none; padding: 9px 18px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; transition: all 0.2s; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; }
        .btn-primary:hover { background: #e84d2a; transform: translateY(-1px); box-shadow: 0 4px 20px var(--accent-glow); }
        .hamburger { display: none; background: none; border: none; cursor: pointer; color: var(--text); font-size: 22px; }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hamburger { display: block; }
          .mobile-nav { display: none; position: fixed; top: 64px; left: 0; right: 0; background: var(--bg2); border-bottom: 1px solid var(--border); padding: 16px; z-index: 99; flex-direction: column; gap: 4px; }
          .mobile-nav.open { display: flex; }
          .mobile-nav a { color: var(--text2); text-decoration: none; padding: 12px 16px; border-radius: 8px; font-size: 15px; font-weight: 500; cursor: pointer; display: block; }
          .mobile-nav a:hover { background: var(--bg3); color: var(--text); }
        }
        .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 120px 24px 80px; position: relative; overflow: hidden; }
        .hero-bg { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255,92,53,0.12) 0%, transparent 70%); }
        .hero-grid { position: absolute; inset: 0; pointer-events: none; background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px); background-size: 48px 48px; mask-image: radial-gradient(ellipse 80% 80% at center, black 0%, transparent 70%); }
        .hero-content { text-align: center; max-width: 800px; position: relative; z-index: 1; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--accent-soft); border: 1px solid rgba(255,92,53,0.25); color: var(--accent2); font-size: 13px; font-weight: 600; padding: 6px 14px; border-radius: 100px; margin-bottom: 28px; }
        .hero-badge .dot { width: 6px; height: 6px; background: var(--green); border-radius: 50%; animation: pulse 2s infinite; }
        .hero h1 { font-family: 'Syne', sans-serif; font-size: clamp(42px, 7vw, 80px); font-weight: 800; line-height: 1.05; letter-spacing: -2px; margin-bottom: 20px; }
        .hero h1 span { color: var(--accent); }
        .hero-sub { font-size: clamp(16px, 2.5vw, 20px); color: var(--text2); line-height: 1.6; max-width: 580px; margin: 0 auto 36px; }
        .hero-ctas { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 56px; }
        .btn-large { padding: 14px 28px; font-size: 16px; font-weight: 700; border-radius: 12px; }
        .btn-demo { background: var(--bg3); border: 1px solid var(--border2); color: var(--text); padding: 14px 24px; border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; font-family: inherit; transition: all 0.2s; display: inline-flex; align-items: center; gap: 10px; }
        .btn-demo:hover { background: var(--bg2); border-color: var(--accent); }
        .play-icon { width: 32px; height: 32px; background: var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; }
        .hero-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; max-width: 600px; margin: 0 auto; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; background: var(--border); }
        .stat { background: var(--bg2); padding: 20px 16px; text-align: center; }
        .stat-num { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: var(--text); }
        .stat-label { font-size: 12px; color: var(--text2); margin-top: 2px; }
        @media (max-width: 500px) { .hero-stats { grid-template-columns: repeat(2, 1fr); } }
        .mockup-section { padding: 40px 24px 80px; }
        .mockup-wrap { max-width: 900px; margin: 0 auto; position: relative; }
        .mockup-phone { width: 260px; margin: 0 auto; display: block; background: var(--bg3); border: 1px solid var(--border2); border-radius: 36px; padding: 20px 16px; position: relative; box-shadow: 0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px var(--border2); }
        .phone-notch { width: 80px; height: 6px; background: var(--bg); border-radius: 3px; margin: 0 auto 16px; }
        .phone-profile { text-align: center; padding-bottom: 16px; border-bottom: 1px solid var(--border); margin-bottom: 16px; }
        .phone-avatar { width: 64px; height: 64px; background: linear-gradient(135deg, var(--accent), var(--accent2)); border-radius: 50%; margin: 0 auto 8px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
        .phone-name { font-size: 16px; font-weight: 700; }
        .phone-handle { font-size: 12px; color: var(--text2); margin-top: 2px; }
        .phone-links { display: flex; flex-direction: column; gap: 8px; }
        .phone-link-btn { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 12px 14px; font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 10px; cursor: pointer; transition: all 0.2s; }
        .phone-link-btn:hover { background: var(--accent-soft); border-color: var(--accent); }
        .phone-link-btn.accent { background: var(--accent); color: white; border-color: var(--accent); }
        .phone-link-icon { font-size: 16px; }
        .phone-mini-stats { display: flex; gap: 8px; margin-top: 14px; }
        .mini-stat { flex: 1; background: var(--bg); border-radius: 8px; padding: 8px; text-align: center; }
        .mini-stat-val { font-size: 13px; font-weight: 700; color: var(--accent); }
        .mini-stat-lbl { font-size: 10px; color: var(--text2); }
        .section { padding: 80px 24px; }
        .section-inner { max-width: 1120px; margin: 0 auto; }
        .section-label { display: inline-block; background: var(--accent-soft); border: 1px solid rgba(255,92,53,0.2); color: var(--accent); font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 5px 12px; border-radius: 6px; margin-bottom: 16px; }
        .section-title { font-family: 'Syne', sans-serif; font-size: clamp(28px, 4vw, 44px); font-weight: 800; line-height: 1.1; letter-spacing: -1px; margin-bottom: 14px; }
        .section-sub { font-size: 17px; color: var(--text2); max-width: 520px; line-height: 1.6; }
        .section-header { text-align: center; margin-bottom: 56px; }
        .section-header .section-sub { margin: 0 auto; }
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        @media (max-width: 768px) { .features-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 480px) { .features-grid { grid-template-columns: 1fr; } }
        .feature-card { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius); padding: 28px; transition: all 0.3s; }
        .feature-card:hover { border-color: var(--accent); background: var(--bg3); transform: translateY(-3px); }
        .feature-icon { font-size: 32px; margin-bottom: 14px; }
        .feature-title { font-size: 17px; font-weight: 700; margin-bottom: 8px; }
        .feature-desc { font-size: 14px; color: var(--text2); line-height: 1.6; }
        .feature-tag { display: inline-block; margin-top: 14px; background: var(--accent-soft); color: var(--accent); font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 100px; }
        .steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; position: relative; }
        @media (max-width: 640px) { .steps-grid { grid-template-columns: 1fr; } }
        .step-card { text-align: center; }
        .step-num { width: 64px; height: 64px; border-radius: 50%; background: var(--bg3); border: 2px solid var(--accent); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: var(--accent); }
        .step-icon { font-size: 28px; margin-bottom: 16px; }
        .step-title { font-size: 18px; font-weight: 700; margin-bottom: 8px; }
        .step-desc { font-size: 14px; color: var(--text2); line-height: 1.6; }
        .pricing-toggle-wrap { display: flex; align-items: center; justify-content: center; gap: 14px; margin-bottom: 40px; }
        .toggle-label { font-size: 15px; font-weight: 600; color: var(--text2); }
        .toggle-switch { width: 52px; height: 28px; background: var(--bg3); border: 1px solid var(--border2); border-radius: 100px; position: relative; cursor: pointer; transition: all 0.3s; }
        .toggle-switch.on { background: var(--accent); border-color: var(--accent); }
        .toggle-thumb { width: 22px; height: 22px; background: white; border-radius: 50%; position: absolute; top: 2px; left: 3px; transition: all 0.3s; box-shadow: 0 2px 6px rgba(0,0,0,0.3); }
        .toggle-switch.on .toggle-thumb { left: 27px; }
        .annual-badge { background: var(--green); color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 100px; }
        .pricing-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        @media (max-width: 1024px) { .pricing-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 520px) { .pricing-grid { grid-template-columns: 1fr; } }
        .pricing-card { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius); padding: 28px; position: relative; transition: all 0.3s; }
        .pricing-card.popular { border-color: var(--accent); background: var(--bg3); box-shadow: 0 0 40px var(--accent-glow); }
        .popular-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--accent); color: white; font-size: 11px; font-weight: 700; padding: 4px 14px; border-radius: 100px; white-space: nowrap; }
        .plan-name { font-size: 14px; font-weight: 700; color: var(--text2); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
        .plan-price { margin-bottom: 6px; }
        .plan-amount { font-family: 'Syne', sans-serif; font-size: 36px; font-weight: 800; }
        .plan-period { font-size: 14px; color: var(--text2); }
        .plan-fee { font-size: 13px; color: var(--text2); margin-bottom: 20px; }
        .plan-fee strong { color: var(--accent); }
        .plan-divider { border: none; border-top: 1px solid var(--border); margin: 20px 0; }
        .plan-features { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; padding: 0; }
        .plan-features li { font-size: 14px; display: flex; align-items: flex-start; gap: 8px; }
        .plan-features li::before { content: '✓'; color: var(--green); font-weight: 700; flex-shrink: 0; margin-top: 1px; }
        .btn-plan { width: 100%; padding: 12px; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: inherit; transition: all 0.2s; background: var(--bg3); color: var(--text); border: 1px solid var(--border2); }
        .btn-plan:hover { background: var(--accent-soft); border-color: var(--accent); color: var(--accent); }
        .btn-plan.accent { background: var(--accent); color: white; border-color: var(--accent); }
        .btn-plan.accent:hover { background: #e84d2a; }
        .pricing-note { text-align: center; margin-top: 20px; font-size: 13px; color: var(--text2); }
        .pricing-note a { color: var(--accent); text-decoration: none; cursor: pointer; }
        .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        @media (max-width: 768px) { .testi-grid { grid-template-columns: 1fr; } }
        .testi-card { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius); padding: 28px; transition: all 0.3s; }
        .testi-card:hover { border-color: var(--border2); transform: translateY(-2px); }
        .testi-stars { color: #fbbf24; font-size: 14px; margin-bottom: 12px; letter-spacing: 2px; }
        .testi-text { font-size: 15px; line-height: 1.7; color: var(--text); margin-bottom: 20px; font-style: italic; }
        .testi-author { display: flex; align-items: center; gap: 12px; }
        .testi-avatar { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; }
        .testi-name { font-size: 14px; font-weight: 700; }
        .testi-meta { font-size: 12px; color: var(--text2); margin-top: 2px; }
        .testi-income { margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
        .income-label { font-size: 12px; color: var(--text2); }
        .income-val { font-size: 18px; font-weight: 800; color: var(--green); }
        .faq-list { max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; gap: 8px; }
        .faq-item { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-sm); overflow: hidden; }
        .faq-question { width: 100%; padding: 20px 24px; text-align: left; background: none; border: none; color: var(--text); font-size: 16px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 16px; font-family: inherit; }
        .faq-question:hover { background: var(--bg3); }
        .faq-icon { font-size: 20px; transition: transform 0.3s; color: var(--accent); flex-shrink: 0; }
        .faq-icon.open { transform: rotate(45deg); }
        .faq-answer { padding: 0 24px 20px; font-size: 15px; color: var(--text2); line-height: 1.7; }
        .cta-section { padding: 80px 24px; text-align: center; background: linear-gradient(135deg, rgba(255,92,53,0.05) 0%, transparent 50%); border-top: 1px solid var(--border); }
        .cta-section h2 { font-family: 'Syne', sans-serif; font-size: clamp(28px, 4vw, 48px); font-weight: 800; margin-bottom: 16px; letter-spacing: -1px; }
        .cta-section p { font-size: 17px; color: var(--text2); max-width: 480px; margin: 0 auto 32px; }
        .cta-checks { display: flex; gap: 24px; justify-content: center; flex-wrap: wrap; margin-top: 20px; }
        .cta-checks span { font-size: 13px; color: var(--text2); display: flex; align-items: center; gap: 6px; }
        .cta-checks span::before { content: '✓'; color: var(--green); font-weight: 700; }
        footer { background: var(--bg2); border-top: 1px solid var(--border); padding: 60px 24px 32px; }
        .footer-inner { max-width: 1120px; margin: 0 auto; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 48px; }
        @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr; } }
        .footer-desc { font-size: 14px; color: var(--text2); line-height: 1.7; margin-bottom: 20px; }
        .footer-socials { display: flex; gap: 8px; }
        .social-btn { width: 36px; height: 36px; border-radius: 8px; background: var(--bg3); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; text-decoration: none; color: var(--text2); transition: all 0.2s; }
        .social-btn:hover { background: var(--accent-soft); border-color: var(--accent); color: var(--accent); }
        .footer-col h4 { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--text2); margin-bottom: 14px; }
        .footer-col a { display: block; font-size: 14px; color: var(--text2); text-decoration: none; padding: 4px 0; transition: color 0.2s; cursor: pointer; }
        .footer-col a:hover { color: var(--text); }
        .footer-bottom { border-top: 1px solid var(--border); padding-top: 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
        .footer-bottom-left { font-size: 13px; color: var(--text2); }
        .footer-payments { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
        .payment-badge { background: var(--bg3); border: 1px solid var(--border); border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 700; color: var(--text2); }
        .auth-page { min-height: 100vh; display: flex; padding-top: 64px; }
        .auth-left { flex: 1; background: var(--bg2); border-right: 1px solid var(--border); padding: 60px; display: flex; flex-direction: column; justify-content: center; }
        @media (max-width: 768px) { .auth-left { display: none; } }
        .auth-left-logo { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; margin-bottom: 48px; }
        .auth-left-logo span { color: var(--accent); }
        .auth-tagline { font-family: 'Syne', sans-serif; font-size: clamp(24px, 3vw, 36px); font-weight: 800; line-height: 1.2; margin-bottom: 24px; letter-spacing: -1px; }
        .auth-tagline span { color: var(--accent); }
        .auth-perks { display: flex; flex-direction: column; gap: 16px; margin-bottom: 40px; }
        .auth-perk { display: flex; align-items: center; gap: 12px; font-size: 15px; }
        .perk-icon { width: 36px; height: 36px; background: var(--accent-soft); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
        .auth-avatars { display: flex; align-items: center; gap: 12px; }
        .avatar-stack { display: flex; }
        .avatar-sm { width: 36px; height: 36px; border-radius: 50%; border: 2px solid var(--bg2); margin-left: -10px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; }
        .avatar-sm:first-child { margin-left: 0; }
        .auth-count { font-size: 14px; color: var(--text2); }
        .auth-right { width: 480px; max-width: 100%; padding: 60px 40px; display: flex; flex-direction: column; justify-content: center; }
        @media (max-width: 480px) { .auth-right { padding: 40px 24px; } }
        .auth-form-title { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; margin-bottom: 6px; letter-spacing: -0.5px; }
        .auth-form-sub { font-size: 14px; color: var(--text2); margin-bottom: 32px; }
        .auth-form-sub a { color: var(--accent); text-decoration: none; cursor: pointer; font-weight: 600; }
        .form-group { margin-bottom: 16px; }
        .form-label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: var(--text2); }
        .form-input { width: 100%; padding: 12px 14px; border-radius: 10px; font-size: 14px; background: var(--bg2); border: 1px solid var(--border2); color: var(--text); font-family: inherit; transition: all 0.2s; outline: none; }
        .form-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
        .form-input::placeholder { color: var(--text2); opacity: 0.6; }
        .input-group { position: relative; }
        .input-prefix { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 13px; color: var(--text2); white-space: nowrap; }
        .input-with-prefix { padding-left: 90px; }
        .form-hint { font-size: 12px; color: var(--text2); margin-top: 5px; }
        .form-check { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 20px; }
        .form-check input[type="checkbox"] { width: 16px; height: 16px; margin-top: 2px; accent-color: var(--accent); cursor: pointer; flex-shrink: 0; }
        .form-check label { font-size: 13px; color: var(--text2); }
        .form-check a { color: var(--accent); text-decoration: none; cursor: pointer; }
        .btn-full { width: 100%; padding: 13px; font-size: 15px; font-weight: 700; border-radius: 10px; }
        .auth-divider { display: flex; align-items: center; gap: 12px; margin: 20px 0; }
        .auth-divider span { font-size: 13px; color: var(--text2); white-space: nowrap; }
        .auth-divider::before, .auth-divider::after { content: ''; flex: 1; border-top: 1px solid var(--border); }
        .btn-google { width: 100%; padding: 12px; border-radius: 10px; font-size: 14px; font-weight: 600; background: var(--bg2); border: 1px solid var(--border2); color: var(--text); cursor: pointer; font-family: inherit; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .btn-google:hover { background: var(--bg3); }
        .auth-footer { text-align: center; margin-top: 24px; font-size: 14px; color: var(--text2); }
        .auth-footer a { color: var(--accent); text-decoration: none; font-weight: 600; cursor: pointer; }
        .form-forgot { display: flex; justify-content: flex-end; margin-top: -8px; margin-bottom: 16px; }
        .form-forgot a { font-size: 13px; color: var(--accent); text-decoration: none; cursor: pointer; }
        .password-toggle { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); cursor: pointer; color: var(--text2); font-size: 16px; user-select: none; }
        .toast { position: fixed; bottom: 24px; right: 24px; z-index: 1000; background: var(--bg3); border: 1px solid var(--border2); border-radius: 12px; padding: 14px 20px; font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 10px; box-shadow: 0 20px 50px rgba(0,0,0,0.4); transform: translateY(100px); opacity: 0; transition: all 0.4s; max-width: 340px; pointer-events: none; }
        .toast.show { transform: translateY(0); opacity: 1; }
        .toast.success { border-color: var(--green); }
        .inner-page { padding: 100px 24px 80px; max-width: 860px; margin: 0 auto; }
        .inner-page h1 { font-family: 'Syne', sans-serif; font-size: clamp(28px, 4vw, 44px); font-weight: 800; margin-bottom: 12px; letter-spacing: -1px; }
        .inner-page .page-sub { font-size: 17px; color: var(--text2); margin-bottom: 48px; }
        .inner-page h2 { font-size: 20px; font-weight: 700; margin: 36px 0 12px; }
        .inner-page p { font-size: 15px; color: var(--text2); line-height: 1.8; margin-bottom: 12px; }
        .inner-page ul { padding-left: 20px; margin-bottom: 14px; }
        .inner-page ul li { font-size: 15px; color: var(--text2); line-height: 1.8; }
        .last-updated { font-size: 13px; color: var(--text2); background: var(--bg3); border: 1px solid var(--border); padding: 8px 14px; border-radius: 8px; display: inline-block; margin-bottom: 32px; }
        .about-hero { text-align: center; padding: 100px 24px 60px; }
        .about-hero h1 { font-family: 'Syne', sans-serif; font-size: clamp(32px, 5vw, 56px); font-weight: 800; margin-bottom: 16px; }
        .team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 800px; margin: 0 auto; }
        @media (max-width: 600px) { .team-grid { grid-template-columns: 1fr; } }
        .team-card { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius); padding: 28px; text-align: center; }
        .team-avatar { width: 72px; height: 72px; border-radius: 50%; margin: 0 auto 14px; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 700; }
        .team-name { font-size: 16px; font-weight: 700; margin-bottom: 4px; }
        .team-role { font-size: 13px; color: var(--text2); }
        .help-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 48px; }
        @media (max-width: 600px) { .help-grid { grid-template-columns: 1fr; } }
        .help-card { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; cursor: pointer; transition: all 0.2s; }
        .help-card:hover { border-color: var(--accent); }
        .help-card-icon { font-size: 28px; margin-bottom: 10px; }
        .help-card-title { font-size: 16px; font-weight: 700; margin-bottom: 6px; }
        .help-card-desc { font-size: 14px; color: var(--text2); }
        .status-overall { display: flex; align-items: center; gap: 12px; background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: var(--radius); padding: 20px 24px; margin-bottom: 32px; }
        .status-dot-lg { width: 12px; height: 12px; border-radius: 50%; background: var(--green); animation: pulse 2s infinite; }
        .status-overall-text { font-size: 16px; font-weight: 700; color: var(--green); }
        .status-list { display: flex; flex-direction: column; gap: 12px; }
        .status-row { display: flex; align-items: center; justify-content: space-between; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 16px 20px; }
        .status-service { font-size: 15px; font-weight: 600; }
        .status-badge { font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 100px; }
        .status-badge.operational { background: rgba(34,197,94,0.15); color: var(--green); }
        .blog-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        @media (max-width: 600px) { .blog-grid { grid-template-columns: 1fr; } }
        .blog-card { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; cursor: pointer; transition: all 0.2s; }
        .blog-card:hover { border-color: var(--border2); transform: translateY(-3px); }
        .blog-thumb { height: 160px; background: linear-gradient(135deg, var(--bg3), var(--bg)); display: flex; align-items: center; justify-content: center; font-size: 48px; }
        .blog-body { padding: 20px; }
        .blog-tag { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); margin-bottom: 8px; }
        .blog-title { font-size: 17px; font-weight: 700; line-height: 1.4; margin-bottom: 8px; }
        .blog-meta { font-size: 12px; color: var(--text2); }
        .job-list { display: flex; flex-direction: column; gap: 12px; }
        .job-card { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; transition: all 0.2s; cursor: pointer; }
        .job-card:hover { border-color: var(--accent); }
        .job-title { font-size: 16px; font-weight: 700; margin-bottom: 4px; }
        .job-meta { font-size: 13px; color: var(--text2); display: flex; gap: 10px; flex-wrap: wrap; }
        .job-tag { background: var(--bg3); border: 1px solid var(--border); border-radius: 6px; padding: 3px 10px; font-size: 12px; font-weight: 600; }
        .support-widget { position: fixed; bottom: 24px; right: 24px; z-index: 90; display: flex; flex-direction: column; align-items: flex-end; gap: 12px; }
        .support-bubble { position: relative; background: var(--bg3); border: 1px solid var(--border2); border-radius: var(--radius); padding: 16px 20px; width: 280px; box-shadow: 0 20px 50px rgba(0,0,0,0.4); animation: fadeIn 0.2s ease; }
        .support-bubble-title { font-size: 15px; font-weight: 700; margin-bottom: 6px; }
        .support-bubble-sub { font-size: 13px; color: var(--text2); margin-bottom: 14px; }
        .support-options { display: flex; flex-direction: column; gap: 8px; }
        .support-option { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; background: var(--bg2); border: 1px solid var(--border); font-size: 13px; font-weight: 600; cursor: pointer; text-decoration: none; color: var(--text); transition: all 0.2s; }
        .support-option:hover { background: var(--accent-soft); border-color: var(--accent); color: var(--accent); }
        .support-btn { width: 54px; height: 54px; background: var(--accent); border-radius: 50%; border: none; cursor: pointer; font-size: 22px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px var(--accent-glow); transition: all 0.2s; }
        .support-btn:hover { background: #e84d2a; transform: scale(1.05); }
        .support-close { position: absolute; top: 12px; right: 12px; cursor: pointer; color: var(--text2); font-size: 16px; background: none; border: none; color: var(--text2); }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 24px; backdrop-filter: blur(10px); animation: fadeIn 0.3s ease; }
        .modal { background: var(--bg2); border: 1px solid var(--border2); border-radius: 20px; width: 100%; max-width: 760px; overflow: hidden; }
        .modal-header { padding: 20px 24px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
        .modal-title { font-size: 18px; font-weight: 700; }
        .modal-close { cursor: pointer; color: var(--text); font-size: 22px; background: none; border: none; }
        .modal-body { padding: 24px; }
        .demo-video-wrap { aspect-ratio: 16/9; background: var(--bg3); border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; border: 1px solid var(--border); }
        .demo-play { width: 72px; height: 72px; background: var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; cursor: pointer; transition: all 0.2s; border: none; color: white; }
        .demo-play:hover { transform: scale(1.05); box-shadow: 0 8px 30px var(--accent-glow); }
        .demo-label { font-size: 16px; font-weight: 600; color: var(--text2); }
        .demo-features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 20px; }
        .demo-feature { background: var(--bg3); border-radius: 10px; padding: 14px; text-align: center; }
        .demo-feature-icon { font-size: 24px; margin-bottom: 6px; }
        .demo-feature-text { font-size: 13px; font-weight: 600; }
        .dashboard-preview { background: var(--bg3); border: 1px solid var(--border2); border-radius: var(--radius); padding: 20px; max-width: 700px; margin: 0 auto; }
        .dash-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .dash-stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
        @media (max-width: 480px) { .dash-stat-grid { grid-template-columns: repeat(2, 1fr); } }
        .dash-stat { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 14px; }
        .dash-stat-val { font-size: 20px; font-weight: 800; margin-bottom: 3px; }
        .dash-stat-lbl { font-size: 11px; color: var(--text2); }
        .dash-chart { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 16px; height: 100px; display: flex; align-items: flex-end; gap: 6px; overflow: hidden; }
        .chart-bar { flex: 1; border-radius: 4px 4px 0 0; background: var(--accent); opacity: 0.7; transition: all 0.3s; min-height: 8px; }
        .chart-bar:hover { opacity: 1; }
        .error-box { display: block; background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); border-radius: 10px; padding: 12px 14px; font-size: 13px; color: #ef4444; margin-bottom: 16px; }
      `}</style>

      {/* NAVBAR */}
      <nav>
        <span className="nav-logo" onClick={() => navigate('home')}>Weiiz<span>.ink</span></span>
        <div className="nav-links">
          <a onClick={() => { navigate('home'); scrollToSection('#fitur'); }}>Fitur</a>
          <a onClick={() => { navigate('home'); scrollToSection('#harga'); }}>Harga</a>
          <a onClick={() => { navigate('home'); scrollToSection('#kreator'); }}>Kreator</a>
          <a onClick={() => { navigate('home'); scrollToSection('#faq'); }}>FAQ</a>
          <a onClick={() => navigate('blog')}>Blog</a>
        </div>
        <div className="nav-cta">
          <button className="btn-ghost" onClick={() => navigate('login')}>Masuk</button>
          <button className="btn-primary" onClick={() => navigate('register')}>Mulai Gratis</button>
        </div>
        <button className="hamburger" onClick={() => setMobileNavOpen(o => !o)}>&#9776;</button>
      </nav>

      {/* MOBILE NAV */}
      <div className={`mobile-nav ${mobileNavOpen ? 'open' : ''}`}>
        <a onClick={() => navigate('home')}>Beranda</a>
        <a onClick={() => { navigate('home'); scrollToSection('#fitur'); }}>Fitur</a>
        <a onClick={() => { navigate('home'); scrollToSection('#harga'); }}>Harga</a>
        <a onClick={() => navigate('blog')}>Blog</a>
        <a onClick={() => navigate('login')}>Masuk</a>
        <a onClick={() => navigate('register')} style={{ color: 'var(--accent)', fontWeight: 700 }}>Mulai Gratis &rarr;</a>
      </div>

      {/* PAGE: HOME */}
      {currentPage === 'home' && (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>
          {/* HERO */}
          <section className="hero">
            <div className="hero-bg"></div>
            <div className="hero-grid"></div>
            <div className="hero-content">
              <div className="hero-badge">
                <div className="dot"></div>
                Digunakan 5.000+ Creator Indonesia
              </div>
              <h1>Where Bio<br /><span>Becomes Benefit</span></h1>
              <p className="hero-sub">Buat link bio, terima donasi, jual produk digital, dan kelola membership &mdash; semuanya dalam <strong>satu platform</strong>.</p>
              <div className="hero-ctas">
                <button className="btn-primary btn-large" onClick={() => navigate('register')}>Mulai Gratis &mdash; Tanpa Kartu Kredit</button>
                <button className="btn-demo btn-large" onClick={() => setDemoOpen(true)}>
                  <span className="play-icon">&#9654;</span>
                  Lihat Demo
                </button>
              </div>
              <div className="hero-stats">
                <div className="stat"><div className="stat-num">5.000+</div><div className="stat-label">Creator Aktif</div></div>
                <div className="stat"><div className="stat-num">Rp2M+</div><div className="stat-label">Produk Terjual</div></div>
                <div className="stat"><div className="stat-num">50.000+</div><div className="stat-label">Transaksi/bulan</div></div>
                <div className="stat"><div className="stat-num">4.9/5</div><div className="stat-label">Rating</div></div>
              </div>
            </div>
          </section>

          {/* PHONE MOCKUP */}
          <section className="mockup-section">
            <div className="mockup-wrap">
              <div style={{ position: 'relative', width: 260, margin: '0 auto' }}>
                <div className="mockup-phone">
                  <div className="phone-notch"></div>
                  <div className="phone-profile">
                    <div className="phone-avatar">✨</div>
                    <div className="phone-name">Kirana.ink</div>
                    <div className="phone-handle">Content Creator &amp; Digital Seller</div>
                  </div>
                  <div className="phone-links">
                    <div className="phone-link-btn accent"><span className="phone-link-icon">🛍️</span> Template Canva Viral</div>
                    <div className="phone-link-btn"><span className="phone-link-icon">💌</span> Newsletter Mingguan</div>
                    <div className="phone-link-btn"><span className="phone-link-icon">☕</span> Dukung Konten Saya</div>
                    <div className="phone-link-btn"><span className="phone-link-icon">📦</span> E-Book Instagram Growth</div>
                  </div>
                  <div className="phone-mini-stats">
                    <div className="mini-stat"><div className="mini-stat-val">2.4K</div><div className="mini-stat-lbl">Pengunjung</div></div>
                    <div className="mini-stat"><div className="mini-stat-val" style={{ color: 'var(--green)' }}>Rp1.2jt</div><div className="mini-stat-lbl">Pendapatan</div></div>
                    <div className="mini-stat"><div className="mini-stat-val" style={{ color: 'var(--blue)' }}>87%</div><div className="mini-stat-lbl">Konversi</div></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* DASHBOARD PREVIEW */}
          <section className="section">
            <div className="section-inner">
              <div className="section-header">
                <div className="section-label">Dashboard</div>
                <h2 className="section-title">Semua data dalam satu tampilan</h2>
                <p className="section-sub">Pantau pendapatan, pengunjung, dan performa produk secara real-time.</p>
              </div>
              <div className="dashboard-preview">
                <div className="dash-header">
                  <div>
                    <div style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 4 }}>Selamat datang,</div>
                    <div style={{ fontSize: 18, fontWeight: 700 }}>Kirana Putri ✨</div>
                  </div>
                  <div className="btn-primary" style={{ fontSize: 13, cursor: 'default' }}>+ Tambah Produk</div>
                </div>
                <div className="dash-stat-grid">
                  <div className="dash-stat"><div className="dash-stat-val" style={{ color: 'var(--green)' }}>Rp3.2jt</div><div className="dash-stat-lbl">Pendapatan Bulan Ini</div></div>
                  <div className="dash-stat"><div className="dash-stat-val">2.4K</div><div className="dash-stat-lbl">Pengunjung</div></div>
                  <div className="dash-stat"><div className="dash-stat-val" style={{ color: 'var(--blue)' }}>87%</div><div className="dash-stat-lbl">Konversi Rate</div></div>
                  <div className="dash-stat"><div className="dash-stat-val">48</div><div className="dash-stat-lbl">Produk Terjual</div></div>
                </div>
                <div className="dash-chart">
                  {chartBars.map((h, i) => (
                    <div key={i} className="chart-bar" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 8, textAlign: 'right' }}>Pendapatan 7 hari terakhir</div>
              </div>
            </div>
          </section>

          {/* FEATURES */}
          <section className="section" id="fitur">
            <div className="section-inner">
              <div className="section-header">
                <div className="section-label">Semua yang Kamu Butuhkan</div>
                <h2 className="section-title">Satu platform, semua fitur monetisasi</h2>
                <p className="section-sub">Tidak perlu 5 aplikasi berbeda. Weiiz menggabungkan semua alat terbaik untuk creator Indonesia.</p>
              </div>
              <div className="features-grid">
                {[
                  { icon: '🔗', title: 'Link in Bio', desc: 'Satu link untuk semua kontenmu. Tampil profesional di bio Instagram, TikTok, dan YouTube.', tag: 'Gratis' },
                  { icon: '🛍', title: 'Digital Product Store', desc: 'Jual e-book, template, preset, kursus, dan produk digital langsung dari halamanmu.', tag: 'File hingga 2GB' },
                  { icon: '☕', title: 'Creator Donations', desc: 'Terima dukungan dari fans dengan sistem donasi yang simpel dan terintegrasi langsung.', tag: 'QRIS & Transfer' },
                  { icon: '👑', title: 'Membership', desc: 'Buat komunitas eksklusif berbayar. Kelola subscriber dan konten premium dalam satu tempat.', tag: 'Pendapatan Stabil' },
                  { icon: '🤝', title: 'Affiliate System', desc: 'Buat program afiliasi sendiri. Ajak orang lain promosikan produkmu dan bagi komisi otomatis.', tag: 'Komisi Otomatis' },
                  { icon: '📧', title: 'Email List Builder', desc: 'Kumpulkan email pengunjung dan bangun audiens jangka panjang yang kamu miliki sepenuhnya.', tag: 'Aset Permanen' },
                ].map((f, i) => (
                  <div className="feature-card" key={i}>
                    <div className="feature-icon">{f.icon}</div>
                    <div className="feature-title">{f.title}</div>
                    <div className="feature-desc">{f.desc}</div>
                    <span className="feature-tag">{f.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="section" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            <div className="section-inner">
              <div className="section-header">
                <div className="section-label">Semudah 1-2-3</div>
                <h2 className="section-title">Mulai dalam 3 langkah</h2>
                <p className="section-sub">Tidak perlu skill teknis. Tidak perlu coding. Langsung aktif hari ini.</p>
              </div>
              <div className="steps-grid">
                {[
                  { num: '1', icon: '✏️', title: 'Buat Halaman Bio', desc: 'Daftar gratis 30 detik. Pilih username, upload foto, halaman bio profesionalmu langsung jadi.' },
                  { num: '2', icon: '📦', title: 'Tambahkan Produk atau Donasi', desc: 'Upload produk digitalmu, aktifkan tombol donasi, atau buat halaman membership eksklusif.' },
                  { num: '3', icon: '💸', title: 'Mulai Menghasilkan Uang', desc: 'Share link bio ke semua platform. Fans klik, bayar, uang langsung masuk ke rekeningmu.' },
                ].map((s, i) => (
                  <div className="step-card" key={i}>
                    <div className="step-num">{s.num}</div>
                    <div className="step-icon">{s.icon}</div>
                    <div className="step-title">{s.title}</div>
                    <div className="step-desc">{s.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: 40 }}>
                <button className="btn-primary btn-large" onClick={() => navigate('register')}>Coba Sekarang &mdash; Gratis &rarr;</button>
              </div>
            </div>
          </section>

          {/* PRICING */}
          <section className="section" id="harga">
            <div className="section-inner">
              <div className="section-header">
                <div className="section-label">Harga Transparan</div>
                <h2 className="section-title">Murah, powerful, tanpa biaya tersembunyi</h2>
                <p className="section-sub">Marketplace lain ambil komisi hingga 10–15%. Di Weiiz, mulai dari hanya 0.5%! 🎉</p>
              </div>
              <div className="pricing-toggle-wrap">
                <span className="toggle-label" style={{ color: isAnnual ? 'var(--text2)' : 'var(--text)' }}>Bulanan</span>
                <div className={`toggle-switch ${isAnnual ? 'on' : ''}`} onClick={() => setIsAnnual(a => !a)}>
                  <div className="toggle-thumb"></div>
                </div>
                <span className="toggle-label" style={{ color: isAnnual ? 'var(--text)' : 'var(--text2)' }}>Tahunan</span>
                <span className="annual-badge" style={{ opacity: isAnnual ? 1 : 0.4 }}>Hemat 25%</span>
              </div>
              <div className="pricing-grid">
                <div className="pricing-card">
                  <div className="plan-name">Free</div>
                  <div className="plan-price"><span className="plan-amount">Gratis</span></div>
                  <div className="plan-fee">Fee: <strong>5%</strong> per transaksi</div>
                  <hr className="plan-divider" />
                  <ul className="plan-features"><li>5 link aktif</li><li>2 produk digital</li><li>Analitik dasar</li><li>Subdomain weiiz.ink</li></ul>
                  <button className="btn-plan" onClick={() => navigate('register')}>Mulai Gratis</button>
                </div>
                <div className="pricing-card">
                  <div className="plan-name">Creator</div>
                  <div className="plan-price"><span className="plan-amount">{fmt(prices.creator[isAnnual ? 1 : 0])}</span><span className="plan-period"> / bulan</span></div>
                  <div className="plan-fee">Fee: <strong>3%</strong> per transaksi</div>
                  <hr className="plan-divider" />
                  <ul className="plan-features"><li>25 link aktif</li><li>10 produk digital</li><li>Analitik lengkap</li><li>Custom subdomain</li><li>Withdrawal 2x/bulan</li></ul>
                  <button className="btn-plan" onClick={() => navigate('register')}>Mulai Creator</button>
                </div>
                <div className="pricing-card popular">
                  <div className="popular-badge">⭐ PALING POPULER</div>
                  <div className="plan-name">Pro</div>
                  <div className="plan-price"><span className="plan-amount">{fmt(prices.pro[isAnnual ? 1 : 0])}</span><span className="plan-period"> / bulan</span></div>
                  <div className="plan-fee">Fee: <strong>1.5%</strong> per transaksi</div>
                  <hr className="plan-divider" />
                  <ul className="plan-features"><li>Unlimited link</li><li>Unlimited produk digital</li><li>Real-time analytics</li><li>Custom domain sendiri</li><li>AI bio generator ✨</li><li>Withdrawal kapan saja</li></ul>
                  <button className="btn-plan accent" onClick={() => navigate('register')}>Mulai Pro</button>
                </div>
                <div className="pricing-card">
                  <div className="plan-name">Business</div>
                  <div className="plan-price"><span className="plan-amount">{fmt(prices.business[isAnnual ? 1 : 0])}</span><span className="plan-period"> / bulan</span></div>
                  <div className="plan-fee">Fee: <strong>0.5%</strong> per transaksi</div>
                  <hr className="plan-divider" />
                  <ul className="plan-features"><li>Semua fitur Pro</li><li>Multi user / tim</li><li>White label branding</li><li>API access</li><li>Priority support 24/7</li></ul>
                  <button className="btn-plan" onClick={() => showToast('Hubungi kami di support@weiiz.ink')}>Hubungi Kami</button>
                </div>
              </div>
              <p className="pricing-note">Semua harga dalam IDR &bull; Bisa batalkan kapan saja &bull; Tanpa kontrak jangka panjang &bull; <a onClick={() => navigate('privacy')}>Privasi terlindungi</a></p>
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section className="section" id="kreator" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            <div className="section-inner">
              <div className="section-header">
                <div className="section-label">Cerita Nyata</div>
                <h2 className="section-title">Creator yang sudah berhasil</h2>
                <p className="section-sub">Bukan janji. Ini hasil nyata dari creator Indonesia yang sudah menggunakan Weiiz.</p>
              </div>
              <div className="testi-grid">
                {[
                  { av: 'KP', bg: 'linear-gradient(135deg,#ff5c35,#ff8c35)', text: '"Sejak pakai Weiiz, saya bisa jual template Canva langsung dari bio Instagram. Bulan pertama sudah balik modal berkali-kali lipat!"', name: 'Kirana Putri', meta: '@kirana.putri • Instagram • 120K Followers', income: 'Rp3.2jt' },
                  { av: 'RA', bg: 'linear-gradient(135deg,#3b82f6,#a855f7)', text: '"Weiiz paling smooth buat kreator Indonesia. QRIS, transfer lokal, withdrawal cepat, dan dashboard-nya bersih banget. Rekomen!"', name: 'Rizky Aditya', meta: '@rizky.aditya • TikTok • 380K Followers', income: 'Rp7.8jt' },
                  { av: 'SN', bg: 'linear-gradient(135deg,#22c55e,#3b82f6)', text: '"Fitur membership-nya game-changer. Subscriber akses konten eksklusif, saya punya pendapatan stabil setiap bulannya. Luar biasa!"', name: 'Siti Nuraini', meta: '@siti.nuraini • YouTube • 55K Subscriber', income: 'Rp5.5jt' },
                ].map((t, i) => (
                  <div className="testi-card" key={i}>
                    <div className="testi-stars">★★★★★</div>
                    <p className="testi-text">{t.text}</p>
                    <div className="testi-author">
                      <div className="testi-avatar" style={{ background: t.bg }}>{t.av}</div>
                      <div><div className="testi-name">{t.name}</div><div className="testi-meta">{t.meta}</div></div>
                    </div>
                    <div className="testi-income">
                      <span className="income-label">Pendapatan bulan ini</span>
                      <span className="income-val">{t.income}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: 28 }}>
                <div style={{ fontSize: 14, color: 'var(--text2)' }}>⭐⭐⭐⭐⭐ <strong style={{ color: 'var(--text)' }}>4.9 / 5</strong> dari 1.200+ ulasan creator terverifikasi</div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="section" id="faq">
            <div className="section-inner">
              <div className="section-header">
                <div className="section-label">FAQ</div>
                <h2 className="section-title">Pertanyaan yang sering ditanya</h2>
              </div>
              <div className="faq-list">
                {faqs.map((faq, i) => (
                  <div className="faq-item" key={i}>
                    <button className="faq-question" onClick={() => toggleFaq(i)}>
                      {faq.q}
                      <span className={`faq-icon ${openFaqs.includes(i) ? 'open' : ''}`}>+</span>
                    </button>
                    {openFaqs.includes(i) && <div className="faq-answer">{faq.a}</div>}
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: 28, fontSize: 14, color: 'var(--text2)' }}>
                Tidak ketemu jawabannya? <a href="mailto:support@weiiz.ink" style={{ color: 'var(--accent)', fontWeight: 600 }}>Hubungi kami</a>
              </div>
            </div>
          </section>

          {/* CTA FINAL */}
          <div className="cta-section">
            <div>🚀✨💸</div>
            <h2>Mulai Monetisasi Audiens Kamu Hari Ini</h2>
            <p>Bergabung dengan 5.000+ creator Indonesia yang sudah menghasilkan dari konten mereka.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn-primary btn-large" onClick={() => navigate('register')}>Daftar Gratis &mdash; Mulai Sekarang &rarr;</button>
              <button className="btn-ghost btn-large" onClick={() => { navigate('home'); setTimeout(() => scrollToSection('#harga'), 100); }}>Lihat Paket Harga</button>
            </div>
            <div className="cta-checks">
              <span>Tanpa kartu kredit</span>
              <span>Cancel kapan saja</span>
              <span>Setup 2 menit</span>
              <span>Support Bahasa Indonesia</span>
            </div>
          </div>
        </div>
      )}

      {/* PAGE: LOGIN */}
      {currentPage === 'login' && (
        <div className="auth-page" style={{ animation: 'fadeIn 0.3s ease' }}>
          <div className="auth-left">
            <div className="auth-left-logo">Weiiz<span>.ink</span></div>
            <div className="auth-tagline">Selamat datang <span>kembali,</span><br />creator! 👋</div>
            <div className="auth-perks">
              {['Bio link profesional yang menghasilkan', 'Terima pembayaran dari QRIS, bank, e-wallet', 'Analytics real-time untuk semua kontenmu', 'AI bio generator untuk boost konversi'].map((p, i) => (
                <div className="auth-perk" key={i}><div className="perk-icon">✓</div><span>{p}</span></div>
              ))}
            </div>
            <div className="auth-avatars">
              <div className="avatar-stack">
                <div className="avatar-sm" style={{ background: 'linear-gradient(135deg,#ff5c35,#ff8c35)' }}>KP</div>
                <div className="avatar-sm" style={{ background: 'linear-gradient(135deg,#3b82f6,#a855f7)' }}>RA</div>
                <div className="avatar-sm" style={{ background: 'linear-gradient(135deg,#22c55e,#3b82f6)' }}>SN</div>
                <div className="avatar-sm" style={{ background: 'var(--bg3)', border: '1px solid var(--border2)', fontSize: 11 }}>+4K</div>
              </div>
              <span className="auth-count">Bergabung dengan 5.000+ creator</span>
            </div>
          </div>
          <div className="auth-right">
            <div className="auth-form-title">Masuk ke Weiiz</div>
            <div className="auth-form-sub">Belum punya akun? <a onClick={() => navigate('register')}>Daftar gratis &rarr;</a></div>
            {loginError && <div className="error-box">{loginError}</div>}
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" ref={loginEmail} placeholder="kamu@email.com" autoComplete="email" />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-group">
                <input className="form-input" type={showLoginPass ? 'text' : 'password'} ref={loginPass} placeholder="••••••••" autoComplete="current-password" />
                <span className="password-toggle" onClick={() => setShowLoginPass(v => !v)}>{showLoginPass ? '🙈' : '👁'}</span>
              </div>
            </div>
            <div className="form-forgot"><a onClick={() => showToast('Link reset password dikirim ke email kamu! 📧', 'success')}>Lupa password?</a></div>
            <button className="btn-primary btn-full" onClick={handleLogin} disabled={loginLoading}>{loginLoading ? 'Memproses...' : 'Masuk ke Akun'}</button>
            <div className="auth-divider"><span>atau masuk dengan</span></div>
            <button className="btn-google" onClick={handleGoogleAuth}><GoogleIcon /> Daftar dengan Google</button>
            <div className="auth-footer" style={{ marginTop: 20, fontSize: 12, color: 'var(--text2)' }}>🔒 Data kamu aman &amp; terenkripsi dengan SSL 256-bit</div>
          </div>
        </div>
      )}

      {/* PAGE: REGISTER */}
      {currentPage === 'register' && (
        <div className="auth-page" style={{ animation: 'fadeIn 0.3s ease' }}>
          <div className="auth-left">
            <div className="auth-left-logo">Weiiz<span>.ink</span></div>
            <div className="auth-tagline">Mulai <span>monetisasi</span><br />bio-mu sekarang</div>
            <div className="auth-perks">
              {['Gratis selamanya untuk mulai', 'Terima pembayaran dalam 5 menit', 'Analytics lengkap & real-time', 'AI tools untuk boost konversi'].map((p, i) => (
                <div className="auth-perk" key={i}><div className="perk-icon">✓</div><span>{p}</span></div>
              ))}
            </div>
            <div className="auth-avatars">
              <div className="avatar-stack">
                {['R', 'S', 'B'].map((l, i) => (
                  <div key={i} className="avatar-sm" style={{ background: ['linear-gradient(135deg,#ff5c35,#ff8c35)', 'linear-gradient(135deg,#3b82f6,#a855f7)', 'linear-gradient(135deg,#22c55e,#3b82f6)'][i] }}>{l}</div>
                ))}
                <div className="avatar-sm" style={{ background: 'var(--bg3)', border: '1px solid var(--border2)', fontSize: 11 }}>+14K</div>
              </div>
              <span className="auth-count"><strong>14.200+</strong> creator bergabung</span>
            </div>
          </div>
          <div className="auth-right">
            <div className="auth-form-title">Buat Akun Gratis ✨</div>
            <div className="auth-form-sub">Setup 5 menit · Tanpa kartu kredit · Langsung aktif</div>
            {registerError && <div className="error-box">{registerError}</div>}
            <div className="form-group">
              <label className="form-label">Nama Lengkap</label>
              <input className="form-input" type="text" ref={regName} placeholder="Nama Kamu" autoComplete="name" />
            </div>
            <div className="form-group">
              <label className="form-label">Username</label>
              <div className="input-group">
                <span className="input-prefix">weiiz.ink/</span>
                <input className="form-input input-with-prefix" type="text" ref={regUsername} placeholder="username-mu" onChange={e => checkUsername(e.target.value)} />
              </div>
              <div className="form-hint" style={{ color: usernameValid === null ? 'var(--text2)' : usernameValid ? 'var(--green)' : '#ef4444' }}>{usernameHint}</div>
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" ref={regEmail} placeholder="kamu@email.com" autoComplete="email" />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-group">
                <input className="form-input" type={showRegPass ? 'text' : 'password'} ref={regPassword} placeholder="Min. 8 karakter" autoComplete="new-password" onChange={e => checkPasswordStrength(e.target.value)} />
                <span className="password-toggle" onClick={() => setShowRegPass(v => !v)}>{showRegPass ? '🙈' : '👁'}</span>
              </div>
              {passwordStrength && <div style={{ marginTop: 6, fontSize: 12, color: passwordStrengthColor }}>{passwordStrength}</div>}
            </div>
            <div className="form-check">
              <input type="checkbox" id="reg-terms" ref={regTerms} />
              <label htmlFor="reg-terms">Saya setuju dengan <a onClick={() => navigate('terms')}>Terms of Service</a> dan <a onClick={() => navigate('privacy')}>Privacy Policy</a></label>
            </div>
            <button className="btn-primary btn-full" onClick={handleRegister} disabled={registerLoading}>{registerLoading ? 'Membuat akun...' : 'Buat Akun Gratis'}</button>
            <div className="auth-divider"><span>atau daftar dengan</span></div>
            <button className="btn-google" onClick={handleGoogleAuth}><GoogleIcon /> Daftar dengan Google</button>
            <div className="auth-footer">Sudah punya akun? 👋 <a onClick={() => navigate('login')}>Masuk &rarr;</a></div>
          </div>
        </div>
      )}

      {/* PAGE: ABOUT */}
      {currentPage === 'about' && (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>
          <div className="about-hero">
            <div className="section-label">Tentang Kami</div>
            <h1>Kami percaya setiap <span style={{ color: 'var(--accent)' }}>creator</span> berhak menghasilkan dari karyanya</h1>
            <p style={{ fontSize: 18, color: 'var(--text2)', maxWidth: 560, margin: '16px auto 0', lineHeight: 1.7 }}>Weiiz lahir dari frustrasi creator Indonesia yang harus menggunakan 5+ platform berbeda hanya untuk monetisasi konten mereka.</p>
          </div>
          <section className="section">
            <div className="section-inner" style={{ maxWidth: 800 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 60, alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 14 }}>Cerita di Balik Weiiz</h2>
                  <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.8 }}>Didirikan pada 2023 di Jakarta, Weiiz dimulai sebagai proyek sampingan dua developer yang juga creator konten.</p>
                  <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.8, marginTop: 12 }}>Hari ini, Weiiz telah membantu lebih dari 5.000 creator Indonesia menghasilkan lebih dari Rp2 miliar dari konten mereka.</p>
                </div>
                <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 28, textAlign: 'center' }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🏢</div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 36, fontWeight: 800, color: 'var(--accent)' }}>2023</div>
                  <div style={{ fontSize: 14, color: 'var(--text2)' }}>Tahun Berdiri</div>
                  <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 32, fontWeight: 800 }}>Jakarta</div>
                    <div style={{ fontSize: 14, color: 'var(--text2)' }}>Kantor Pusat</div>
                  </div>
                </div>
              </div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 28, textAlign: 'center' }}>Tim Kami</h2>
              <div className="team-grid">
                {[
                  { av: '👨‍💻', name: 'Andi Firmansyah', role: 'Co-Founder & CEO', bg: 'linear-gradient(135deg,#ff5c35,#ff8c35)' },
                  { av: '👩‍🎨', name: 'Dina Rahmawati', role: 'Co-Founder & CPO', bg: 'linear-gradient(135deg,#3b82f6,#a855f7)' },
                  { av: '👨‍💼', name: 'Bagas Santoso', role: 'Head of Engineering', bg: 'linear-gradient(135deg,#22c55e,#16a34a)' },
                ].map((m, i) => (
                  <div className="team-card" key={i}>
                    <div className="team-avatar" style={{ background: m.bg }}>{m.av}</div>
                    <div className="team-name">{m.name}</div>
                    <div className="team-role">{m.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* PAGE: BLOG */}
      {currentPage === 'blog' && (
        <section className="section" style={{ paddingTop: 100, animation: 'fadeIn 0.3s ease' }}>
          <div className="section-inner">
            <div className="section-header">
              <div className="section-label">Blog &amp; Tips</div>
              <h2 className="section-title">Resources untuk Creator Indonesia</h2>
              <p className="section-sub">Tips monetisasi, growth hack, dan berita terbaru seputar creator economy.</p>
            </div>
            <div className="blog-grid">
              {[
                { icon: '🛍', tag: 'Monetisasi', title: '5 Cara Creator Pemula Hasilkan Rp1 Juta Pertama dari Bio Link', meta: '15 Maret 2025 • 8 menit baca' },
                { icon: '📈', tag: 'Growth', title: 'Cara Meningkatkan Konversi Bio Link hingga 3x Lipat', meta: '10 Maret 2025 • 6 menit baca' },
                { icon: '📧', tag: 'Email Marketing', title: 'Kenapa Email List Adalah Aset Terpenting Creator di 2025', meta: '5 Maret 2025 • 10 menit baca' },
                { icon: '🌟', tag: 'Membership', title: 'Panduan Lengkap Membuat Komunitas Berbayar yang Sukses', meta: '1 Maret 2025 • 12 menit baca' },
              ].map((b, i) => (
                <div className="blog-card" key={i} onClick={() => showToast('Artikel sedang dalam pengembangan!')}>
                  <div className="blog-thumb">{b.icon}</div>
                  <div className="blog-body">
                    <div className="blog-tag">{b.tag}</div>
                    <div className="blog-title">{b.title}</div>
                    <div className="blog-meta">{b.meta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PAGE: HELP */}
      {currentPage === 'help' && (
        <section className="section" style={{ paddingTop: 100, animation: 'fadeIn 0.3s ease' }}>
          <div className="section-inner" style={{ maxWidth: 860 }}>
            <div className="section-header">
              <div className="section-label">Pusat Bantuan</div>
              <h2 className="section-title">Bagaimana kami bisa membantu?</h2>
            </div>
            <div className="help-grid">
              {[
                { icon: '⚙️', title: 'Pengaturan Akun', desc: 'Profil, keamanan, notifikasi, dan preferensi akun' },
                { icon: '💸', title: 'Pembayaran & Withdrawal', desc: 'Cara menerima dan menarik saldo ke rekening' },
                { icon: '🔗', title: 'Bio Link & Halaman', desc: 'Cara kustomisasi dan mengelola link bio-mu' },
                { icon: '🛍', title: 'Produk Digital', desc: 'Upload, harga, dan distribusi produk digitalmu' },
                { icon: '👑', title: 'Membership', desc: 'Membuat dan mengelola komunitas berbayar' },
                { icon: '📊', title: 'Analytics & Laporan', desc: 'Memahami data pengunjung dan performa kontenmu' },
              ].map((h, i) => (
                <div className="help-card" key={i} onClick={() => showToast('Halaman bantuan sedang disiapkan!')}>
                  <div className="help-card-icon">{h.icon}</div>
                  <div className="help-card-title">{h.title}</div>
                  <div className="help-card-desc">{h.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PAGE: PRIVACY */}
      {currentPage === 'privacy' && (
        <div className="inner-page" style={{ animation: 'fadeIn 0.3s ease' }}>
          <div className="section-label">Legal</div>
          <h1>Kebijakan Privasi</h1>
          <p className="page-sub">Kami berkomitmen melindungi data dan privasi Anda.</p>
          <div className="last-updated">📅 Terakhir diperbarui: 1 Maret 2025</div>
          <h2>1. Data yang Kami Kumpulkan</h2>
          <p>Kami mengumpulkan informasi yang Anda berikan langsung kepada kami, termasuk nama, alamat email, username, dan informasi akun lainnya saat Anda mendaftar.</p>
          <h2>2. Penggunaan Data</h2>
          <p>Data Anda digunakan untuk menyediakan layanan, memproses transaksi, mengirimkan notifikasi, dan meningkatkan platform.</p>
          <h2>3. Keamanan Data</h2>
          <p>Semua data dienkripsi menggunakan SSL 256-bit. Sistem pembayaran kami diproses melalui Midtrans yang telah bersertifikasi PCI DSS Level 1.</p>
          <h2>4. Hak Anda</h2>
          <p>Anda berhak untuk mengakses, memperbaiki, atau menghapus data pribadi Anda kapan saja. Hubungi kami di <a href="mailto:privacy@weiiz.ink" style={{ color: 'var(--accent)' }}>privacy@weiiz.ink</a>.</p>
        </div>
      )}

      {/* PAGE: TERMS */}
      {currentPage === 'terms' && (
        <div className="inner-page" style={{ animation: 'fadeIn 0.3s ease' }}>
          <div className="section-label">Legal</div>
          <h1>Syarat &amp; Ketentuan</h1>
          <p className="page-sub">Harap baca syarat dan ketentuan ini sebelum menggunakan layanan Weiiz.</p>
          <div className="last-updated">📅 Terakhir diperbarui: 1 Maret 2025</div>
          <h2>1. Penerimaan Syarat</h2>
          <p>Dengan mengakses atau menggunakan platform Weiiz.ink, Anda menyetujui untuk terikat oleh syarat dan ketentuan ini.</p>
          <h2>2. Layanan</h2>
          <p>Weiiz menyediakan platform link-in-bio dan monetisasi digital untuk creator konten.</p>
          <h2>3. Akun Pengguna</h2>
          <ul><li>Anda harus berusia minimal 17 tahun untuk membuat akun</li><li>Satu orang hanya boleh memiliki satu akun aktif</li></ul>
          <h2>4. Pembayaran dan Fee</h2>
          <p>Weiiz mengenakan biaya transaksi sesuai dengan paket yang dipilih (0.5%–5%).</p>
        </div>
      )}

      {/* PAGE: STATUS */}
      {currentPage === 'status' && (
        <section className="section" style={{ paddingTop: 100, animation: 'fadeIn 0.3s ease' }}>
          <div className="section-inner" style={{ maxWidth: 720 }}>
            <div className="section-header">
              <div className="section-label">Status Platform</div>
              <h2 className="section-title">Status Sistem Weiiz</h2>
            </div>
            <div className="status-overall">
              <div className="status-dot-lg"></div>
              <div>
                <div className="status-overall-text">Semua Sistem Berjalan Normal</div>
                <div style={{ fontSize: 13, color: 'var(--text2)', marginTop: 2 }}>Terakhir diperbarui: {statusTime}</div>
              </div>
            </div>
            <div className="status-list">
              {['🌐 Website & Dashboard', '💸 Payment Gateway (Midtrans)', '📦 File Upload & CDN', '📊 Analytics Engine', '📧 Email Notifications', '🤖 AI Bio Generator', '🔗 Public Bio Pages', '🔔 Webhook & API'].map((s, i) => (
                <div className="status-row" key={i}>
                  <div className="status-service">{s}</div>
                  <span className="status-badge operational">Operational</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PAGE: CAREERS */}
      {currentPage === 'careers' && (
        <section className="section" style={{ paddingTop: 100, animation: 'fadeIn 0.3s ease' }}>
          <div className="section-inner" style={{ maxWidth: 800 }}>
            <div className="section-header">
              <div className="section-label">Karir</div>
              <h2 className="section-title">Bergabung dengan tim Weiiz</h2>
            </div>
            <div className="job-list">
              {['Senior Frontend Engineer', 'Backend Engineer (Node.js)', 'Product Designer', 'Growth Marketer'].map((j, i) => (
                <div className="job-card" key={i} onClick={() => showToast('Kirim CV ke career@weiiz.ink')}>
                  <div><div className="job-title">{j}</div><div className="job-meta"><span>📍 Remote</span><span>⏱ Full-time</span><span style={{ color: 'var(--green)' }}>● Aktif</span></div></div>
                  <span className="job-tag">Lamar</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      {showsFooter && (
        <footer>
          <div className="footer-inner">
            <div className="footer-grid">
              <div>
                <span className="nav-logo" onClick={() => navigate('home')} style={{ display: 'block', marginBottom: 12 }}>Weiiz<span>.ink</span></span>
                <p className="footer-desc">Platform monetisasi terlengkap untuk creator Indonesia. Satu link, semua penghasilan.</p>
                <div className="footer-socials">
                  <a href="https://instagram.com/weiiz.ink" target="_blank" rel="noreferrer" className="social-btn">IG</a>
                  <a href="https://tiktok.com/@weiiz.ink" target="_blank" rel="noreferrer" className="social-btn">TT</a>
                  <a href="https://youtube.com/@weiizink" target="_blank" rel="noreferrer" className="social-btn">YT</a>
                </div>
              </div>
              <div className="footer-col">
                <h4>Produk</h4>
                <a onClick={() => { navigate('home'); scrollToSection('#fitur'); }}>Link in Bio</a>
                <a onClick={() => { navigate('home'); scrollToSection('#fitur'); }}>Digital Store</a>
                <a onClick={() => { navigate('home'); scrollToSection('#fitur'); }}>Donasi</a>
                <a onClick={() => { navigate('home'); scrollToSection('#fitur'); }}>Membership</a>
              </div>
              <div className="footer-col">
                <h4>Perusahaan</h4>
                <a onClick={() => navigate('about')}>Tentang Kami</a>
                <a onClick={() => navigate('blog')}>Blog</a>
                <a onClick={() => navigate('careers')}>Karir</a>
              </div>
              <div className="footer-col">
                <h4>Dukungan</h4>
                <a onClick={() => navigate('help')}>Pusat Bantuan</a>
                <a onClick={() => navigate('status')}>Status Platform</a>
                <a onClick={() => navigate('privacy')}>Kebijakan Privasi</a>
                <a onClick={() => navigate('terms')}>Syarat &amp; Ketentuan</a>
              </div>
            </div>
            <div className="footer-bottom">
              <div className="footer-bottom-left">© 2025 Weiiz.ink · Dibuat dengan ❤️ untuk creator Indonesia</div>
              <div className="footer-payments">
                <span style={{ fontSize: 12, color: 'var(--text2)', marginRight: 4 }}>Pembayaran via</span>
                {['Midtrans', 'QRIS', 'VA Bank', 'GoPay', 'OVO'].map(p => <span key={p} className="payment-badge">{p}</span>)}
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* SUPPORT WIDGET */}
      <div className="support-widget">
        {supportOpen && (
          <div className="support-bubble">
            <button className="support-close" onClick={() => setSupportOpen(false)}>✕</button>
            <div className="support-bubble-title">👋 Halo! Ada yang bisa dibantu?</div>
            <div className="support-bubble-sub">Tim support kami siap membantu kamu</div>
            <div className="support-options">
              <a href="mailto:support@weiiz.ink" className="support-option">📧 Email Support</a>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="support-option">📱 WhatsApp Chat</a>
              <a className="support-option" onClick={() => { navigate('help'); setSupportOpen(false); }}>📚 Pusat Bantuan</a>
              <a className="support-option" onClick={() => { navigate('status'); setSupportOpen(false); }}>📊 Status Platform</a>
            </div>
          </div>
        )}
        <button className="support-btn" onClick={() => setSupportOpen(o => !o)} title="Butuh bantuan?">💬</button>
      </div>

      {/* DEMO MODAL */}
      {demoOpen && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setDemoOpen(false); }}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">▶ Demo Weiiz.ink</div>
              <button className="modal-close" onClick={() => setDemoOpen(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="demo-video-wrap">
                <button className="demo-play" onClick={() => showToast('Video demo segera hadir! Daftar untuk early access.')}>▶</button>
                <div className="demo-label">Klik untuk memutar demo (2 menit)</div>
              </div>
              <div className="demo-features">
                {[{ icon: '🔗', text: 'Bio Link Setup' }, { icon: '🛍', text: 'Jual Produk Digital' }, { icon: '📊', text: 'Analytics Real-time' }].map((d, i) => (
                  <div className="demo-feature" key={i}><div className="demo-feature-icon">{d.icon}</div><div className="demo-feature-text">{d.text}</div></div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: 20 }}>
                <button className="btn-primary" onClick={() => { navigate('register'); setDemoOpen(false); }}>Coba Langsung &mdash; Gratis &rarr;</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      <div className={`toast ${toast.show ? 'show' : ''} ${toast.type}`}>
        {toast.type === 'success' ? '✓ ' : ''}{toast.msg}
      </div>
    </>
  );
}
