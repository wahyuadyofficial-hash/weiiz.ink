import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FeatureCard {
  icon: string;
  title: string;
  desc: string;
  hoverBg: string;
  hoverBorder: string;
}

interface Step {
  icon: string;
  num: number;
  gradFrom: string;
  gradTo: string;
  shadow: string;
  title: string;
  desc: string;
}

interface PricingPlan {
  tier: string;
  price: string | number;
  period?: string;
  fee: string;
  feeBg: string;
  feeColor: string;
  features: string[];
  btnLabel: string;
  btnClass: string;
  badge?: string;
  badgeStyle?: React.CSSProperties;
  popular?: boolean;
  href: string;
}

interface Testimonial {
  quote: string;
  earningLabel: string;
  earning: string;
  name: string;
  platform: string;
  initials: string;
  avatarGrad: string;
}

interface StatCard {
  icon: string;
  value: string;
  label: string;
  sub: string;
  color: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const FEATURES: FeatureCard[] = [
  {
    icon: "🔗",
    title: "Link in Bio",
    desc: "Satu link untuk semua kontenmu. Tampil profesional di bio Instagram, TikTok, dan YouTube.",
    hoverBg: "rgba(30,111,217,.18)",
    hoverBorder: "rgba(30,111,217,.4)",
  },
  {
    icon: "🛍️",
    title: "Digital Product Store",
    desc: "Jual e-book, template, preset, kursus, dan produk digital lainnya langsung dari halamanmu.",
    hoverBg: "rgba(0,212,255,.1)",
    hoverBorder: "rgba(0,212,255,.3)",
  },
  {
    icon: "☕",
    title: "Creator Donations",
    desc: "Terima dukungan dari fans dengan sistem donasi yang simpel dan terintegrasi langsung.",
    hoverBg: "rgba(255,184,48,.1)",
    hoverBorder: "rgba(255,184,48,.3)",
  },
  {
    icon: "👑",
    title: "Membership",
    desc: "Buat komunitas eksklusif berbayar. Kelola subscriber dan konten premium dalam satu tempat.",
    hoverBg: "rgba(52,211,153,.1)",
    hoverBorder: "rgba(52,211,153,.3)",
  },
  {
    icon: "🤝",
    title: "Affiliate System",
    desc: "Buat program afiliasi sendiri. Ajak orang lain promosikan produkmu dan bagi komisi otomatis.",
    hoverBg: "rgba(167,139,250,.1)",
    hoverBorder: "rgba(167,139,250,.3)",
  },
  {
    icon: "📧",
    title: "Email List Builder",
    desc: "Kumpulkan email pengunjung dan bangun audiens jangka panjang yang kamu miliki sepenuhnya.",
    hoverBg: "rgba(251,113,133,.1)",
    hoverBorder: "rgba(251,113,133,.3)",
  },
];

const STEPS: Step[] = [
  {
    icon: "✏️",
    num: 1,
    gradFrom: "#1E6FD9",
    gradTo: "#0EA5E9",
    shadow: "rgba(30,111,217,.5)",
    title: "Buat Halaman Bio",
    desc: "Daftar gratis 30 detik. Pilih username, upload foto, halaman bio profesionalmu langsung jadi.",
  },
  {
    icon: "📦",
    num: 2,
    gradFrom: "#0EA5E9",
    gradTo: "#00D4FF",
    shadow: "rgba(0,212,255,.4)",
    title: "Tambahkan Produk atau Donasi",
    desc: "Upload produk digitalmu, aktifkan tombol donasi, atau buat halaman membership eksklusif.",
  },
  {
    icon: "💸",
    num: 3,
    gradFrom: "#00D4FF",
    gradTo: "#34D399",
    shadow: "rgba(52,211,153,.4)",
    title: "Mulai Menghasilkan Uang",
    desc: "Share link bio ke semua platform. Fans klik, bayar, uang langsung masuk ke rekeningmu.",
  },
];

const PRICING: PricingPlan[] = [
  {
    tier: "Free",
    price: 0,
    fee: "5%",
    feeBg: "rgba(255,255,255,.05)",
    feeColor: "rgba(255,255,255,.4)",
    features: ["5 link aktif", "2 produk digital", "Analitik dasar", "Subdomain weiiz.ink"],
    btnLabel: "Mulai Gratis",
    btnClass: "sec",
    href: "/register",
  },
  {
    tier: "Creator",
    price: "39rb",
    period: "/ bulan",
    fee: "3%",
    feeBg: "rgba(255,255,255,.05)",
    feeColor: "rgba(255,255,255,.4)",
    features: ["25 link aktif", "10 produk digital", "Analitik lengkap", "Custom subdomain", "Withdrawal 2x/bulan"],
    btnLabel: "Mulai Creator",
    btnClass: "sec",
    badge: "Hemat 40%",
    badgeStyle: { color: "#34D399", background: "rgba(52,211,153,.12)", border: "1px solid rgba(52,211,153,.3)" },
    href: "/register",
  },
  {
    tier: "Pro",
    price: "99rb",
    period: "/ bulan",
    fee: "1.5%",
    feeBg: "rgba(30,111,217,.2)",
    feeColor: "#60B8FF",
    features: [
      "Unlimited link",
      "Unlimited produk digital",
      "Real-time analytics",
      "Custom domain sendiri",
      "AI bio generator ✨",
      "Withdrawal kapan saja",
    ],
    btnLabel: "Mulai Pro",
    btnClass: "pr",
    badge: "PALING POPULER",
    badgeStyle: { color: "#60B8FF", background: "rgba(30,111,217,.2)", border: "1px solid rgba(30,111,217,.4)" },
    popular: true,
    href: "/register",
  },
  {
    tier: "Business",
    price: "249rb",
    period: "/ bulan",
    fee: "0.5%",
    feeBg: "rgba(255,255,255,.05)",
    feeColor: "rgba(255,255,255,.4)",
    features: ["Semua fitur Pro", "Multi user / tim", "White label branding", "API access", "Priority support 24/7"],
    btnLabel: "Hubungi Kami",
    btnClass: "sec",
    href: "/contact",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Sejak pakai Weiiz, saya bisa jual template Canva langsung dari bio Instagram. Bulan pertama saja sudah balik modal berkali-kali lipat!",
    earningLabel: "Pendapatan",
    earning: "Rp3.2jt",
    name: "Kirana Putri",
    platform: "Instagram · 120K Followers",
    initials: "KP",
    avatarGrad: "linear-gradient(135deg,#1E6FD9,#00D4FF)",
  },
  {
    quote:
      "Weiiz paling smooth buat kreator Indonesia. QRIS, transfer lokal, withdrawal cepat, dan dashboard-nya bersih banget.",
    earningLabel: "Pendapatan",
    earning: "Rp7.8jt",
    name: "Rizky Aditya",
    platform: "TikTok · 380K Followers",
    initials: "RA",
    avatarGrad: "linear-gradient(135deg,#0EA5E9,#34D399)",
  },
  {
    quote:
      "Fitur membership-nya game-changer. Subscriber akses konten eksklusif, saya punya pendapatan stabil setiap bulannya.",
    earningLabel: "Pendapatan",
    earning: "Rp5.5jt",
    name: "Siti Nuraini",
    platform: "YouTube · 55K Subscriber",
    initials: "SN",
    avatarGrad: "linear-gradient(135deg,#00D4FF,#60B8FF)",
  },
];

const STATS: StatCard[] = [
  { icon: "👥", value: "5.000+", label: "Creator Aktif", sub: "TikTok, IG, YouTube", color: "#60B8FF" },
  { icon: "💰", value: "Rp2 Miliar", label: "Produk Terjual", sub: "Sejak 2023", color: "#00D4FF" },
  { icon: "⚡", value: "50.000+", label: "Transaksi", sub: "Rata-rata/bulan", color: "#FFB830" },
  { icon: "⭐", value: "4.9/5", label: "Rating", sub: "1.200+ ulasan", color: "#34D399" },
];

// ─── Inline Styles (CSS-in-JS) ────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  :root {
    --navy:#081529; --navy2:#0D1F3C; --blue:#1E6FD9; --blue2:#0EA5E9;
    --cyan:#00D4FF; --glow:#60B8FF; --gold:#FFB830; --green:#34D399;
    --muted:rgba(255,255,255,0.4);
  }
  html { scroll-behavior:smooth; }
  body {
    background:var(--navy);
    font-family:'Plus Jakarta Sans',sans-serif;
    color:rgba(255,255,255,0.85);
    overflow-x:hidden;
  }
  a { text-decoration:none; color:inherit; }
  ::-webkit-scrollbar { width:3px; }
  ::-webkit-scrollbar-track { background:#081529; }
  ::-webkit-scrollbar-thumb { background:#1E6FD9; border-radius:2px; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
  @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
  @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:0.4} }
  .fade-up { animation: fadeUp 0.8s ease both; }
  .d1 { animation-delay:.1s } .d2 { animation-delay:.2s }
  .d3 { animation-delay:.3s } .d4 { animation-delay:.4s }
  .float { animation: float 5s ease-in-out infinite; }
  .shimmer-text {
    background: linear-gradient(90deg,var(--glow) 0%,#fff 25%,var(--cyan) 50%,#fff 75%,var(--glow) 100%);
    background-size:300% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text;
    animation: shimmer 5s linear infinite;
  }
  .pulse-dot { animation: pulse 2s ease infinite; }
`;

// ─── Sub-components ────────────────────────────────────────────────────────────

const NavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    transition: "all .4s",
    padding: "0 48px",
    ...(scrolled && {
      background: "rgba(8,21,41,.95)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,.05)",
    }),
  };

  return (
    <nav style={navStyle}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a href="/">
          <span style={{ fontSize: 22, fontWeight: 800, color: "#60B8FF", letterSpacing: "-.02em" }}>Weiiz.ink</span>
        </a>
        <div style={{ display: "flex", gap: 32 }}>
          {["#fitur", "#harga", "#", "#"].map((href, i) => (
            <a
              key={i}
              href={href}
              style={{ color: "rgba(255,255,255,.5)", fontSize: 14, fontWeight: 500, transition: "color .2s" }}
              onMouseOver={(e) => ((e.target as HTMLElement).style.color = "#fff")}
              onMouseOut={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,.5)")}
            >
              {["Fitur", "Harga", "Blog", "Bantuan"][i]}
            </a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a
            href="/login"
            style={{ color: "rgba(255,255,255,.5)", fontSize: 14, fontWeight: 500 }}
          >
            Masuk
          </a>
          <a
            href="/register"
            style={{
              background: "linear-gradient(135deg,#1E6FD9,#0EA5E9)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              padding: "10px 22px",
              borderRadius: 100,
              boxShadow: "0 4px 20px rgba(30,111,217,.4)",
              transition: "all .3s",
              display: "inline-block",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(30,111,217,.6)";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(30,111,217,.4)";
            }}
          >
            Mulai Gratis
          </a>
        </div>
      </div>
    </nav>
  );
};

const HeroSection: React.FC = () => {
  const mockupLinks = [
    { bg: "rgba(30,111,217,.28)", border: "1px solid rgba(30,111,217,.5)", icon: "🛍️", label: "Template Canva Viral" },
    { bg: "rgba(0,212,255,.12)", border: "1px solid rgba(0,212,255,.28)", icon: "💌", label: "Newsletter Mingguan" },
    { bg: "rgba(255,184,48,.13)", border: "1px solid rgba(255,184,48,.3)", icon: "☕", label: "Dukung Konten Saya" },
    { bg: "rgba(96,184,255,.1)", border: "1px solid rgba(96,184,255,.22)", icon: "📦", label: "E-Book Instagram Growth" },
  ];

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "100px 48px 60px",
      }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: "5%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 1000,
            height: 650,
            borderRadius: "50%",
            background: "radial-gradient(ellipse,rgba(30,111,217,.2) 0%,rgba(14,165,233,.08) 45%,transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "-10%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(0,212,255,.05)",
            filter: "blur(100px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30%",
            right: "-10%",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "rgba(30,111,217,.06)",
            filter: "blur(100px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.025,
            backgroundImage:
              "linear-gradient(rgba(96,184,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(96,184,255,1) 1px,transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center,transparent 30%,var(--navy) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        {/* Badge */}
        <div
          className="fade-up"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(30,111,217,.12)",
            border: "1px solid rgba(30,111,217,.35)",
            borderRadius: 100,
            padding: "6px 18px",
            marginBottom: 36,
          }}
        >
          <span
            className="pulse-dot"
            style={{ width: 7, height: 7, borderRadius: "50%", background: "#00D4FF", boxShadow: "0 0 10px #00D4FF", display: "inline-block" }}
          />
          <span style={{ color: "rgba(96,184,255,.9)", fontSize: 11.5, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>
            Digunakan 5.000+ Creator Indonesia
          </span>
        </div>

        {/* Headline */}
        <h1
          className="fade-up d1"
          style={{
            fontSize: "clamp(3rem,7.5vw,6rem)",
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: "-.03em",
            color: "#fff",
            marginBottom: 28,
          }}
        >
          Where Bio
          <br />
          <span className="shimmer-text">Becomes Benefit</span>
        </h1>

        {/* Sub */}
        <p
          className="fade-up d2"
          style={{
            color: "var(--muted)",
            fontSize: "clamp(1rem,2.2vw,1.18rem)",
            maxWidth: 540,
            margin: "0 auto 44px",
            lineHeight: 1.75,
          }}
        >
          Buat link bio, terima donasi, jual produk digital, dan kelola membership &mdash; semuanya dalam{" "}
          <strong style={{ color: "rgba(96,184,255,.85)", fontWeight: 600 }}>satu platform</strong>.
        </p>

        {/* CTA Row */}
        <div
          className="fade-up d3"
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 80 }}
        >
          <a
            href="/register"
            style={{
              background: "linear-gradient(135deg,#1E6FD9,#0EA5E9)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              padding: "17px 34px",
              borderRadius: 16,
              boxShadow: "0 8px 40px rgba(30,111,217,.45),inset 0 1px 0 rgba(255,255,255,.15)",
              transition: "all .3s",
              display: "inline-block",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 50px rgba(30,111,217,.6)";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 40px rgba(30,111,217,.45),inset 0 1px 0 rgba(255,255,255,.15)";
            }}
          >
            Mulai Gratis — Tanpa Kartu Kredit
          </a>
          <a
            href="#demo"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              color: "rgba(255,255,255,.5)",
              fontSize: 14,
              fontWeight: 500,
              padding: "14px 22px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,.1)",
              transition: "all .2s",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#fff";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.25)";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.5)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.1)";
            }}
          >
            <span
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 9,
              }}
            >
              ▶
            </span>{" "}
            Lihat Demo
          </a>
        </div>

        {/* Mockup */}
        <div className="float fade-up d4" style={{ position: "relative", maxWidth: 860, margin: "0 auto" }}>
          <div
            style={{
              position: "absolute",
              inset: -24,
              background: "linear-gradient(135deg,rgba(30,111,217,.18),rgba(0,212,255,.12))",
              borderRadius: 36,
              filter: "blur(32px)",
            }}
          />
          <div
            style={{
              position: "relative",
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.1)",
              borderRadius: 28,
              padding: 5,
              boxShadow: "0 48px 120px rgba(0,0,0,.65),inset 0 1px 0 rgba(255,255,255,.07)",
            }}
          >
            {/* Browser Bar */}
            <div
              style={{
                background: "rgba(255,255,255,.04)",
                borderRadius: 22,
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 4,
              }}
            >
              <div style={{ display: "flex", gap: 5 }}>
                {["rgba(255,90,70,.7)", "rgba(255,195,0,.7)", "rgba(50,210,50,.7)"].map((c, i) => (
                  <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                ))}
              </div>
              <div
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,.04)",
                  borderRadius: 8,
                  padding: "5px 14px",
                  color: "rgba(255,255,255,.2)",
                  fontSize: 11,
                  fontFamily: "monospace",
                }}
              >
                weiiz.ink/kirana
              </div>
            </div>

            {/* Profile Area */}
            <div
              style={{
                background: "linear-gradient(180deg,#0E2040 0%,#081529 100%)",
                borderRadius: 22,
                padding: "36px 24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 18,
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#1E6FD9,#00D4FF)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 30,
                  fontWeight: 800,
                  color: "#fff",
                  boxShadow: "0 0 0 3px rgba(30,111,217,.25),0 0 0 6px rgba(30,111,217,.1),0 12px 40px rgba(30,111,217,.5)",
                  position: "relative",
                }}
              >
                K
                <div
                  style={{
                    position: "absolute",
                    bottom: 2,
                    right: 2,
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "#00D4FF",
                    border: "2px solid #081529",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    color: "#081529",
                    fontWeight: 800,
                  }}
                >
                  ✓
                </div>
              </div>

              {/* Name */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>Kirana ✨</div>
                <div style={{ color: "rgba(96,184,255,.5)", fontSize: 12.5, marginTop: 2 }}>Content Creator & Digital Seller</div>
              </div>

              {/* Links */}
              <div style={{ width: "100%", maxWidth: 340, display: "flex", flexDirection: "column", gap: 9 }}>
                {mockupLinks.map((l, i) => (
                  <div
                    key={i}
                    style={{
                      borderRadius: 13,
                      padding: "12px 18px",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "rgba(255,255,255,.82)",
                      textAlign: "center",
                      cursor: "pointer",
                      background: l.bg,
                      border: l.border,
                      transition: "transform .2s,filter .2s",
                    }}
                    onMouseOver={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
                      (e.currentTarget as HTMLElement).style.filter = "brightness(1.15)";
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "";
                      (e.currentTarget as HTMLElement).style.filter = "";
                    }}
                  >
                    {l.icon} {l.label}
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div
                style={{
                  display: "flex",
                  gap: 36,
                  paddingTop: 18,
                  borderTop: "1px solid rgba(255,255,255,.05)",
                  width: "100%",
                  maxWidth: 340,
                  justifyContent: "center",
                }}
              >
                {[
                  { v: "2.4K", l: "Pengunjung", c: "#60B8FF" },
                  { v: "Rp1.2jt", l: "Pendapatan", c: "#00D4FF" },
                  { v: "87%", l: "Konversi", c: "#FFB830" },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: 800, fontSize: 17, color: s.c }}>{s.v}</div>
                    <div style={{ color: "rgba(255,255,255,.25)", fontSize: 11, marginTop: 2 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialProof: React.FC = () => (
  <div style={{ padding: "64px 48px", position: "relative" }}>
    <div
      style={{ width: 200, height: 1, background: "linear-gradient(90deg,transparent,rgba(30,111,217,.5),transparent)", margin: "0 auto 50px" }}
    />
    <p
      style={{ textAlign: "center", color: "rgba(255,255,255,.2)", fontSize: 11, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 48 }}
    >
      Dipercaya ribuan creator Indonesia
    </p>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, maxWidth: 1100, margin: "0 auto" }}>
      {STATS.map((s, i) => (
        <div
          key={i}
          style={{
            background: "rgba(255,255,255,.03)",
            border: "1px solid rgba(255,255,255,.06)",
            borderRadius: 20,
            padding: "24px 16px",
            textAlign: "center",
            transition: "all .3s",
            cursor: "default",
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(30,111,217,.08)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(30,111,217,.3)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.03)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.06)";
            (e.currentTarget as HTMLElement).style.transform = "";
          }}
        >
          <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
          <div style={{ fontSize: 30, fontWeight: 800, color: s.color, marginBottom: 4, letterSpacing: "-.02em" }}>{s.value}</div>
          <div style={{ color: "rgba(255,255,255,.6)", fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{s.label}</div>
          <div style={{ color: "rgba(255,255,255,.22)", fontSize: 11 }}>{s.sub}</div>
        </div>
      ))}
    </div>
  </div>
);

const FeaturesSection: React.FC = () => (
  <section id="fitur" style={{ padding: "96px 48px", position: "relative" }}>
    <div style={{ textAlign: "center", marginBottom: 64 }}>
      <span
        style={{
          display: "inline-block",
          padding: "6px 16px",
          borderRadius: 100,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: ".1em",
          textTransform: "uppercase",
          marginBottom: 18,
          background: "rgba(30,111,217,.12)",
          border: "1px solid rgba(30,111,217,.3)",
          color: "#60B8FF",
        }}
      >
        Semua yang Kamu Butuhkan
      </span>
      <h2
        style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 800, color: "#fff", lineHeight: 1.08, letterSpacing: "-.025em", marginBottom: 16 }}
      >
        Satu platform, <span style={{ color: "#60B8FF" }}>semua fitur monetisasi</span>
      </h2>
      <p style={{ color: "var(--muted)", fontSize: "1.05rem", maxWidth: 480, margin: "0 auto", lineHeight: 1.75 }}>
        Tidak perlu 5 aplikasi berbeda. Weiiz menggabungkan semua alat terbaik.
      </p>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, maxWidth: 1200, margin: "0 auto" }}>
      {FEATURES.map((f, i) => (
        <div
          key={i}
          style={{
            background: "rgba(255,255,255,.025)",
            border: "1px solid rgba(255,255,255,.07)",
            borderRadius: 20,
            padding: 26,
            transition: "all .3s",
            cursor: "default",
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLElement).style.background = f.hoverBg;
            (e.currentTarget as HTMLElement).style.borderColor = f.hoverBorder;
            (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.025)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.07)";
            (e.currentTarget as HTMLElement).style.transform = "";
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 14 }}>{f.icon}</div>
          <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{f.title}</h3>
          <p style={{ color: "rgba(255,255,255,.35)", fontSize: 13.5, lineHeight: 1.65 }}>{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const HowItWorksSection: React.FC = () => (
  <section
    style={{
      padding: "96px 48px",
      background: "rgba(255,255,255,.01)",
      borderTop: "1px solid rgba(255,255,255,.04)",
      borderBottom: "1px solid rgba(255,255,255,.04)",
    }}
  >
    <div style={{ textAlign: "center", marginBottom: 64 }}>
      <span
        style={{
          display: "inline-block",
          padding: "6px 16px",
          borderRadius: 100,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: ".1em",
          textTransform: "uppercase",
          marginBottom: 18,
          background: "rgba(52,211,153,.1)",
          border: "1px solid rgba(52,211,153,.25)",
          color: "#34D399",
        }}
      >
        Semudah 1-2-3
      </span>
      <h2
        style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 800, color: "#fff", lineHeight: 1.08, letterSpacing: "-.025em", marginBottom: 16 }}
      >
        Mulai dalam <span style={{ color: "#34D399" }}>3 langkah</span>
      </h2>
      <p style={{ color: "var(--muted)", fontSize: "1.05rem", maxWidth: 480, margin: "0 auto", lineHeight: 1.75 }}>
        Tidak perlu skill teknis. Tidak perlu coding. Langsung aktif hari ini.
      </p>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32, maxWidth: 1100, margin: "0 auto" }}>
      {STEPS.map((s, i) => (
        <div key={i} style={{ textAlign: "center", padding: 8 }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              margin: "0 auto 24px",
              position: "relative",
              background: `linear-gradient(135deg,${s.gradFrom},${s.gradTo})`,
              boxShadow: `0 16px 48px ${s.shadow}`,
              transition: "transform .3s",
              cursor: "default",
            }}
            onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1.1)")}
            onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.transform = "")}
          >
            {s.icon}
            <span
              style={{
                position: "absolute",
                top: -7,
                right: -7,
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "#081529",
                border: "1px solid rgba(30,111,217,.5)",
                color: "#60B8FF",
                fontSize: 11,
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {s.num}
            </span>
          </div>
          <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{s.title}</h3>
          <p style={{ color: "rgba(255,255,255,.35)", fontSize: 13.5, lineHeight: 1.65, maxWidth: 250, margin: "0 auto" }}>{s.desc}</p>
        </div>
      ))}
    </div>
    <div style={{ textAlign: "center", marginTop: 56 }}>
      <a
        href="/register"
        style={{
          background: "linear-gradient(135deg,#1E6FD9,#0EA5E9)",
          color: "#fff",
          fontWeight: 700,
          fontSize: 15,
          padding: "17px 34px",
          borderRadius: 16,
          boxShadow: "0 8px 40px rgba(30,111,217,.45)",
          display: "inline-block",
          transition: "all .3s",
        }}
      >
        Coba Sekarang — Gratis →
      </a>
    </div>
  </section>
);

const PricingSection: React.FC = () => (
  <section id="harga" style={{ padding: "96px 48px", position: "relative" }}>
    <div style={{ textAlign: "center", marginBottom: 64 }}>
      <span
        style={{
          display: "inline-block",
          padding: "6px 16px",
          borderRadius: 100,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: ".1em",
          textTransform: "uppercase",
          marginBottom: 18,
          background: "rgba(255,184,48,.1)",
          border: "1px solid rgba(255,184,48,.28)",
          color: "#FFB830",
        }}
      >
        Harga Transparan
      </span>
      <h2
        style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 800, color: "#fff", lineHeight: 1.08, letterSpacing: "-.025em", marginBottom: 16 }}
      >
        Murah, powerful, <span style={{ color: "#60B8FF" }}>tanpa biaya tersembunyi</span>
      </h2>
      <p style={{ color: "var(--muted)", fontSize: "1.05rem", maxWidth: 520, margin: "0 auto", lineHeight: 1.75 }}>
        Marketplace lain ambil komisi hingga{" "}
        <span style={{ textDecoration: "line-through", textDecorationColor: "#EF4444", color: "rgba(255,255,255,.5)" }}>10–15%</span>
      </p>
      <p style={{ color: "#34D399", fontWeight: 600, fontSize: "1.05rem", marginTop: 6 }}>Di Weiiz, mulai dari hanya 0.5%! 🎉</p>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, maxWidth: 1280, margin: "0 auto", alignItems: "start" }}>
      {PRICING.map((p, i) => (
        <div
          key={i}
          style={{
            borderRadius: 24,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            transition: "all .3s",
            ...(p.popular
              ? {
                  background: "linear-gradient(145deg,rgba(30,111,217,.22),rgba(14,165,233,.14))",
                  border: "2px solid rgba(30,111,217,.55)",
                  boxShadow: "0 0 60px rgba(30,111,217,.18)",
                  transform: "scale(1.04)",
                }
              : {
                  background: "rgba(255,255,255,.03)",
                  border: "1px solid rgba(255,255,255,.07)",
                }),
          }}
        >
          <div style={{ height: 28, marginBottom: 16 }}>
            {p.badge && (
              <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 100, ...p.badgeStyle }}>{p.badge}</span>
            )}
          </div>
          <div style={{ color: "rgba(255,255,255,.38)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 8 }}>
            {p.tier}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 4 }}>
            <span style={{ color: "rgba(255,255,255,.3)", fontSize: 18 }}>Rp</span>
            <span style={{ fontSize: 38, fontWeight: 800, color: "#fff", letterSpacing: "-.02em" }}>
              {typeof p.price === "number" ? p.price : p.price.replace("rb", ".000")}
            </span>
          </div>
          {p.period && <div style={{ color: "rgba(255,255,255,.25)", fontSize: 13, marginBottom: 6 }}>{p.period}</div>}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 12,
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: 100,
              marginBottom: 20,
              width: "fit-content",
              background: p.feeBg,
              color: p.feeColor,
            }}
          >
            {p.fee} <span style={{ fontWeight: 400, color: p.popular ? "rgba(96,184,255,.5)" : "rgba(255,255,255,.25)" }}>transaksi</span>
          </div>
          <div style={{ height: 1, background: "rgba(255,255,255,.05)", marginBottom: 20 }} />
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 24, flex: 1 }}>
            {p.features.map((feat, j) => (
              <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, color: "rgba(255,255,255,.55)", fontSize: 13.5 }}>
                <span
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9,
                    flexShrink: 0,
                    marginTop: 1,
                    background: p.popular ? "rgba(30,111,217,.3)" : "rgba(255,255,255,.08)",
                    color: p.popular ? "#60B8FF" : "rgba(255,255,255,.4)",
                  }}
                >
                  ✓
                </span>
                {feat}
              </li>
            ))}
          </ul>
          <a
            href={p.href}
            style={{
              display: "block",
              width: "100%",
              textAlign: "center",
              fontWeight: 700,
              fontSize: 14,
              padding: 13,
              borderRadius: 14,
              transition: "all .2s",
              ...(p.btnClass === "pr"
                ? { background: "linear-gradient(135deg,#1E6FD9,#0EA5E9)", color: "#fff", boxShadow: "0 6px 24px rgba(30,111,217,.4)" }
                : { border: "1px solid rgba(255,255,255,.15)", color: "rgba(255,255,255,.6)" }),
            }}
          >
            {p.btnLabel}
          </a>
        </div>
      ))}
    </div>
    <p style={{ textAlign: "center", color: "rgba(255,255,255,.18)", fontSize: 12, marginTop: 24 }}>
      Semua harga dalam IDR • Bisa batalkan kapan saja • Tanpa kontrak jangka panjang
    </p>
  </section>
);

const TestimonialsSection: React.FC = () => (
  <section
    style={{
      padding: "96px 48px",
      background: "rgba(255,255,255,.01)",
      borderTop: "1px solid rgba(255,255,255,.04)",
    }}
  >
    <div style={{ textAlign: "center", marginBottom: 64 }}>
      <span
        style={{
          display: "inline-block",
          padding: "6px 16px",
          borderRadius: 100,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: ".1em",
          textTransform: "uppercase",
          marginBottom: 18,
          background: "rgba(255,184,48,.1)",
          border: "1px solid rgba(255,184,48,.28)",
          color: "#FFB830",
        }}
      >
        Cerita Nyata
      </span>
      <h2
        style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 800, color: "#fff", lineHeight: 1.08, letterSpacing: "-.025em", marginBottom: 16 }}
      >
        Creator yang <span style={{ color: "#FFB830" }}>sudah berhasil</span>
      </h2>
      <p style={{ color: "var(--muted)", fontSize: "1.05rem", maxWidth: 480, margin: "0 auto", lineHeight: 1.75 }}>
        Bukan janji. Ini hasil nyata dari creator Indonesia.
      </p>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, maxWidth: 1200, margin: "0 auto" }}>
      {TESTIMONIALS.map((t, i) => (
        <div
          key={i}
          style={{
            background: "rgba(255,255,255,.03)",
            border: "1px solid rgba(255,255,255,.07)",
            borderRadius: 22,
            padding: 26,
            display: "flex",
            flexDirection: "column",
            transition: "all .3s",
            cursor: "default",
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(30,111,217,.06)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(30,111,217,.4)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.03)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.07)";
            (e.currentTarget as HTMLElement).style.transform = "";
          }}
        >
          <div style={{ fontSize: 48, color: "rgba(30,111,217,.25)", lineHeight: 1, marginBottom: 12 }}>"</div>
          <p style={{ color: "rgba(255,255,255,.55)", fontSize: 14, lineHeight: 1.7, flex: 1, marginBottom: 20 }}>{t.quote}</p>
          <div
            style={{
              background: "rgba(52,211,153,.08)",
              border: "1px solid rgba(52,211,153,.2)",
              borderRadius: 14,
              padding: "10px 14px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 18,
            }}
          >
            <span style={{ color: "rgba(255,255,255,.28)", fontSize: 12 }}>{t.earningLabel}</span>
            <div>
              <div style={{ color: "#34D399", fontWeight: 800, fontSize: 20, lineHeight: 1 }}>{t.earning}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: 13,
                flexShrink: 0,
                background: t.avatarGrad,
              }}
            >
              {t.initials}
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>{t.name}</div>
              <div style={{ color: "rgba(255,255,255,.28)", fontSize: 11.5 }}>{t.platform}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 48, flexWrap: "wrap" }}>
      <div style={{ color: "#FFB830", fontSize: 22 }}>⭐⭐⭐⭐⭐</div>
      <span style={{ color: "#fff", fontWeight: 700, fontSize: 20 }}>4.9 / 5</span>
      <span style={{ color: "rgba(255,255,255,.35)", fontSize: 14 }}>dari 1.200+ ulasan creator</span>
    </div>
  </section>
);

const CTASection: React.FC = () => (
  <div style={{ padding: "48px 48px 96px" }}>
    <div
      style={{
        maxWidth: 960,
        margin: "0 auto",
        position: "relative",
        borderRadius: 28,
        overflow: "hidden",
        textAlign: "center",
        padding: "72px 40px",
      }}
    >
      {/* BG layers */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg,#0C2145 0%,#1A3A6B 40%,#0C4580 70%,#091E40 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(96,184,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(96,184,255,.03) 1px,transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -30,
          left: "50%",
          transform: "translateX(-50%)",
          width: 500,
          height: 200,
          background: "rgba(30,111,217,.22)",
          filter: "blur(60px)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{ position: "absolute", inset: 0, border: "1px solid rgba(30,111,217,.3)", borderRadius: 28, pointerEvents: "none" }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 52, marginBottom: 20 }}>🚀✨💰</div>
        <h2
          style={{
            fontSize: "clamp(2rem,5vw,3.6rem)",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.05,
            letterSpacing: "-.025em",
            marginBottom: 16,
          }}
        >
          Mulai Monetisasi
          <br />
          Audiens Kamu Hari Ini
        </h2>
        <p style={{ color: "rgba(255,255,255,.55)", fontSize: "1.1rem", maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.7 }}>
          Bergabung dengan 5.000+ creator Indonesia yang sudah menghasilkan dari konten mereka.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 32 }}>
          <a
            href="/register"
            style={{
              display: "inline-block",
              background: "#fff",
              color: "#0C2145",
              fontWeight: 800,
              fontSize: 16,
              padding: "17px 38px",
              borderRadius: 16,
              boxShadow: "0 8px 40px rgba(0,0,0,.35)",
              transition: "all .2s",
            }}
            onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(-3px)")}
            onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.transform = "")}
          >
            Daftar Gratis — Mulai Sekarang →
          </a>
          <a
            href="#harga"
            style={{
              display: "inline-block",
              color: "rgba(255,255,255,.55)",
              fontWeight: 600,
              fontSize: 14,
              padding: "14px 26px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,.18)",
              transition: "all .2s",
            }}
          >
            Lihat Paket Harga
          </a>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 24 }}>
          {["Tanpa kartu kredit", "Cancel kapan saja", "Setup 2 menit", "Support Bahasa Indonesia"].map((item, i) => (
            <span key={i} style={{ color: "rgba(255,255,255,.4)", fontSize: 13 }}>
              ✓ {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Footer: React.FC = () => {
  const paymentMethods = ["Midtrans", "QRIS", "VA Bank", "GoPay", "OVO"];
  const footerLinks: Record<string, string[]> = {
    Produk: ["Link in Bio", "Digital Store", "Donasi", "Membership", "Affiliate"],
    Perusahaan: ["Tentang Kami", "Blog", "Karir", "Press Kit"],
    Dukungan: ["Pusat Bantuan", "Hubungi Kami", "Status", "Kebijakan Privasi", "Syarat & Ketentuan"],
  };

  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,.05)", padding: "48px 48px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 14 }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: "#60B8FF" }}>Weiiz.ink</span>
            </div>
            <p style={{ color: "rgba(255,255,255,.22)", fontSize: 13, lineHeight: 1.65, maxWidth: 200 }}>
              Platform monetisasi terlengkap untuk creator Indonesia.
            </p>
          </div>
          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <div
                style={{
                  color: "rgba(255,255,255,.4)",
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                  marginBottom: 14,
                }}
              >
                {title}
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{ color: "rgba(255,255,255,.25)", fontSize: 13, transition: "color .2s" }}
                      onMouseOver={(e) => ((e.target as HTMLElement).style.color = "rgba(96,184,255,.8)")}
                      onMouseOut={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,.25)")}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,.05)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ color: "rgba(255,255,255,.15)", fontSize: 12 }}>
            © 2024 Weiiz.ink • Dibuat dengan ❤️ untuk creator Indonesia.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ color: "rgba(255,255,255,.15)", fontSize: 11 }}>Pembayaran via</span>
            {paymentMethods.map((m) => (
              <span
                key={m}
                style={{
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.07)",
                  color: "rgba(255,255,255,.35)",
                  fontSize: 11,
                  padding: "3px 9px",
                  borderRadius: 6,
                }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// ─── Main App ─────────────────────────────────────────────────────────────────
const WeiizLanding: React.FC = () => {
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = globalStyles;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => {
      if (styleRef.current) document.head.removeChild(styleRef.current);
    };
  }, []);

  return (
    <div>
      <NavBar />
      <HeroSection />
      <SocialProof />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default WeiizLanding;
