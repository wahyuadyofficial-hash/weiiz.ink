<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Weiiz.ink &ndash; Where Bio Becomes Benefit</title>
  <meta name="description" content="Platform monetisasi terlengkap untuk creator Indonesia. Buat link bio, terima donasi, jual produk digital, dan kelola membership dalam satu platform." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #0a0a0f;
      --bg2: #111118;
      --bg3: #18181f;
      --border: rgba(255,255,255,0.08);
      --border2: rgba(255,255,255,0.12);
      --text: #f0f0f8;
      --text2: #9898b0;
      --text3: #6060788;
      --accent: #ff5c35;
      --accent2: #ff8c35;
      --accent-soft: rgba(255,92,53,0.12);
      --accent-glow: rgba(255,92,53,0.3);
      --green: #22c55e;
      --blue: #3b82f6;
      --purple: #a855f7;
      --radius: 16px;
      --radius-sm: 10px;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      overflow-x: hidden;
    }
    .page { display: none; animation: fadeIn 0.3s ease; }
    .page.active { display: block; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

    /* ======================== NAVBAR ======================== */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 24px; height: 64px;
      background: rgba(10,10,15,0.85);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
    }
    .nav-logo {
      font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800;
      color: var(--text); text-decoration: none; letter-spacing: -0.5px;
    }
    .nav-logo span { color: var(--accent); }
    .nav-links { display: flex; gap: 4px; align-items: center; }
    .nav-links a {
      color: var(--text2); text-decoration: none; font-size: 14px; font-weight: 500;
      padding: 8px 14px; border-radius: 8px; transition: all 0.2s;
    }
    .nav-links a:hover { color: var(--text); background: var(--bg3); }
    .nav-cta { display: flex; gap: 8px; align-items: center; }
    .btn-ghost {
      background: none; border: 1px solid var(--border2); color: var(--text2);
      padding: 8px 18px; border-radius: 8px; font-size: 14px; font-weight: 500;
      cursor: pointer; font-family: inherit; transition: all 0.2s;
      text-decoration: none; display: inline-flex; align-items: center; gap: 6px;
    }
    .btn-ghost:hover { background: var(--bg3); color: var(--text); border-color: var(--border2); }
    .btn-primary {
      background: var(--accent); color: white; border: none;
      padding: 9px 18px; border-radius: 8px; font-size: 14px; font-weight: 600;
      cursor: pointer; font-family: inherit; transition: all 0.2s;
      text-decoration: none; display: inline-flex; align-items: center; gap: 6px;
    }
    .btn-primary:hover { background: #e84d2a; transform: translateY(-1px); box-shadow: 0 4px 20px var(--accent-glow); }
    .hamburger { display: none; background: none; border: none; cursor: pointer; color: var(--text); font-size: 22px; }
    @media (max-width: 768px) {
      .nav-links { display: none; }
      .hamburger { display: block; }
      .mobile-nav { display: none; position: fixed; top: 64px; left: 0; right: 0; background: var(--bg2); border-bottom: 1px solid var(--border); padding: 16px; z-index: 99; flex-direction: column; gap: 4px; }
      .mobile-nav.open { display: flex; }
      .mobile-nav a { color: var(--text2); text-decoration: none; padding: 12px 16px; border-radius: 8px; font-size: 15px; font-weight: 500; }
      .mobile-nav a:hover { background: var(--bg3); color: var(--text); }
    }

    /* ======================== HERO ======================== */
    .hero {
      min-height: 100vh; display: flex; align-items: center; justify-content: center;
      padding: 120px 24px 80px; position: relative; overflow: hidden;
    }
    .hero-bg {
      position: absolute; inset: 0; pointer-events: none;
      background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255,92,53,0.12) 0%, transparent 70%);
    }
    .hero-grid {
      position: absolute; inset: 0; pointer-events: none;
      background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px);
      background-size: 48px 48px;
      mask-image: radial-gradient(ellipse 80% 80% at center, black 0%, transparent 70%);
    }
    .hero-content { text-align: center; max-width: 800px; position: relative; z-index: 1; }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--accent-soft); border: 1px solid rgba(255,92,53,0.25);
      color: var(--accent2); font-size: 13px; font-weight: 600;
      padding: 6px 14px; border-radius: 100px; margin-bottom: 28px;
    }
    .hero-badge .dot { width: 6px; height: 6px; background: var(--green); border-radius: 50%; animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
    .hero h1 {
      font-family: 'Syne', sans-serif; font-size: clamp(42px, 7vw, 80px);
      font-weight: 800; line-height: 1.05; letter-spacing: -2px;
      margin-bottom: 20px;
    }
    .hero h1 span { color: var(--accent); }
    .hero-sub {
      font-size: clamp(16px, 2.5vw, 20px); color: var(--text2);
      line-height: 1.6; max-width: 580px; margin: 0 auto 36px;
    }
    .hero-ctas { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 56px; }
    .btn-large {
      padding: 14px 28px; font-size: 16px; font-weight: 700; border-radius: 12px;
    }
    .btn-demo {
      background: var(--bg3); border: 1px solid var(--border2); color: var(--text);
      padding: 14px 24px; border-radius: 12px; font-size: 16px; font-weight: 600;
      cursor: pointer; font-family: inherit; transition: all 0.2s;
      display: inline-flex; align-items: center; gap: 10px;
    }
    .btn-demo:hover { background: var(--bg2); border-color: var(--accent); }
    .play-icon {
      width: 32px; height: 32px; background: var(--accent); border-radius: 50%;
      display: flex; align-items: center; justify-content: center; font-size: 12px;
    }
    .hero-stats {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
      max-width: 600px; margin: 0 auto;
      border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden;
      background: var(--border);
    }
    .stat {
      background: var(--bg2); padding: 20px 16px; text-align: center;
    }
    .stat-num { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: var(--text); }
    .stat-label { font-size: 12px; color: var(--text2); margin-top: 2px; }
    @media (max-width: 500px) { .hero-stats { grid-template-columns: repeat(2, 1fr); } }

    /* ======================== MOCKUP PREVIEW ======================== */
    .mockup-section { padding: 40px 24px 80px; }
    .mockup-wrap { max-width: 900px; margin: 0 auto; position: relative; }
    .mockup-phone {
      width: 260px; margin: 0 auto; display: block;
      background: var(--bg3); border: 1px solid var(--border2);
      border-radius: 36px; padding: 20px 16px; position: relative;
      box-shadow: 0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px var(--border2);
    }
    .phone-notch { width: 80px; height: 6px; background: var(--bg); border-radius: 3px; margin: 0 auto 16px; }
    .phone-profile { text-align: center; padding-bottom: 16px; border-bottom: 1px solid var(--border); margin-bottom: 16px; }
    .phone-avatar { width: 64px; height: 64px; background: linear-gradient(135deg, var(--accent), var(--accent2)); border-radius: 50%; margin: 0 auto 8px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
    .phone-name { font-size: 16px; font-weight: 700; }
    .phone-handle { font-size: 12px; color: var(--text2); margin-top: 2px; }
    .phone-links { display: flex; flex-direction: column; gap: 8px; }
    .phone-link-btn {
      background: var(--bg2); border: 1px solid var(--border); border-radius: 12px;
      padding: 12px 14px; font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 10px;
      cursor: pointer; transition: all 0.2s;
    }
    .phone-link-btn:hover { background: var(--accent-soft); border-color: var(--accent); }
    .phone-link-btn.accent { background: var(--accent); color: white; border-color: var(--accent); }
    .phone-link-icon { font-size: 16px; }
    .phone-mini-stats { display: flex; gap: 8px; margin-top: 14px; }
    .mini-stat { flex: 1; background: var(--bg); border-radius: 8px; padding: 8px; text-align: center; }
    .mini-stat-val { font-size: 13px; font-weight: 700; color: var(--accent); }
    .mini-stat-lbl { font-size: 10px; color: var(--text2); }
    .mockup-floats { position: absolute; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none; }
    .float-card {
      position: absolute; background: var(--bg3); border: 1px solid var(--border2);
      border-radius: 12px; padding: 10px 14px; font-size: 13px; font-weight: 600;
      display: flex; align-items: center; gap: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.4);
      animation: floatAnim 3s ease-in-out infinite;
    }
    .float-card:nth-child(2) { animation-delay: 1s; }
    .float-card:nth-child(3) { animation-delay: 2s; }
    @keyframes floatAnim { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
    .float-green { color: var(--green); }
    .float-blue { color: var(--blue); }

    /* ======================== SECTIONS ======================== */
    .section { padding: 80px 24px; }
    .section-inner { max-width: 1120px; margin: 0 auto; }
    .section-label {
      display: inline-block; background: var(--accent-soft); border: 1px solid rgba(255,92,53,0.2);
      color: var(--accent); font-size: 12px; font-weight: 700; letter-spacing: 1px;
      text-transform: uppercase; padding: 5px 12px; border-radius: 6px; margin-bottom: 16px;
    }
    .section-title {
      font-family: 'Syne', sans-serif; font-size: clamp(28px, 4vw, 44px);
      font-weight: 800; line-height: 1.1; letter-spacing: -1px; margin-bottom: 14px;
    }
    .section-sub { font-size: 17px; color: var(--text2); max-width: 520px; line-height: 1.6; }
    .section-header { text-align: center; margin-bottom: 56px; }
    .section-header .section-sub { margin: 0 auto; }

    /* ======================== FEATURES ======================== */
    .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    @media (max-width: 768px) { .features-grid { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 480px) { .features-grid { grid-template-columns: 1fr; } }
    .feature-card {
      background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius);
      padding: 28px; transition: all 0.3s;
    }
    .feature-card:hover { border-color: var(--accent); background: var(--bg3); transform: translateY(-3px); }
    .feature-icon { font-size: 32px; margin-bottom: 14px; }
    .feature-title { font-size: 17px; font-weight: 700; margin-bottom: 8px; }
    .feature-desc { font-size: 14px; color: var(--text2); line-height: 1.6; }
    .feature-tag { display: inline-block; margin-top: 14px; background: var(--accent-soft); color: var(--accent); font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 100px; }

    /* ======================== HOW IT WORKS ======================== */
    .steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; position: relative; }
    @media (max-width: 640px) { .steps-grid { grid-template-columns: 1fr; } }
    .steps-grid::before {
      content: ''; position: absolute; top: 32px; left: calc(16.67% + 16px); right: calc(16.67% + 16px);
      height: 1px; background: linear-gradient(90deg, var(--accent), var(--accent2));
      opacity: 0.3;
    }
    @media (max-width: 640px) { .steps-grid::before { display: none; } }
    .step-card { text-align: center; }
    .step-num {
      width: 64px; height: 64px; border-radius: 50%;
      background: var(--bg3); border: 2px solid var(--accent);
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 20px;
      font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: var(--accent);
    }
    .step-icon { font-size: 28px; margin-bottom: 16px; }
    .step-title { font-size: 18px; font-weight: 700; margin-bottom: 8px; }
    .step-desc { font-size: 14px; color: var(--text2); line-height: 1.6; }

    /* ======================== PRICING ======================== */
    .pricing-toggle-wrap {
      display: flex; align-items: center; justify-content: center; gap: 14px;
      margin-bottom: 40px;
    }
    .toggle-label { font-size: 15px; font-weight: 600; color: var(--text2); }
    .toggle-label.active { color: var(--text); }
    .toggle-switch {
      width: 52px; height: 28px; background: var(--bg3); border: 1px solid var(--border2);
      border-radius: 100px; position: relative; cursor: pointer; transition: all 0.3s;
    }
    .toggle-switch.on { background: var(--accent); border-color: var(--accent); }
    .toggle-thumb {
      width: 22px; height: 22px; background: white; border-radius: 50%;
      position: absolute; top: 2px; left: 3px; transition: all 0.3s;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    }
    .toggle-switch.on .toggle-thumb { left: 27px; }
    .annual-badge { background: var(--green); color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 100px; }

    .pricing-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
    @media (max-width: 1024px) { .pricing-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 520px) { .pricing-grid { grid-template-columns: 1fr; } }
    .pricing-card {
      background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius);
      padding: 28px; position: relative; transition: all 0.3s;
    }
    .pricing-card:hover { border-color: var(--border2); }
    .pricing-card.popular {
      border-color: var(--accent); background: var(--bg3);
      box-shadow: 0 0 40px var(--accent-glow);
    }
    .popular-badge {
      position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
      background: var(--accent); color: white; font-size: 11px; font-weight: 700;
      padding: 4px 14px; border-radius: 100px; white-space: nowrap;
    }
    .plan-name { font-size: 14px; font-weight: 700; color: var(--text2); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
    .plan-price { margin-bottom: 6px; }
    .plan-amount { font-family: 'Syne', sans-serif; font-size: 36px; font-weight: 800; }
    .plan-period { font-size: 14px; color: var(--text2); }
    .plan-fee { font-size: 13px; color: var(--text2); margin-bottom: 20px; }
    .plan-fee strong { color: var(--accent); }
    .plan-divider { border: none; border-top: 1px solid var(--border); margin: 20px 0; }
    .plan-features { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
    .plan-features li { font-size: 14px; display: flex; align-items: flex-start; gap: 8px; }
    .plan-features li::before { content: '✓'; color: var(--green); font-weight: 700; flex-shrink: 0; margin-top: 1px; }
    .btn-plan {
      width: 100%; padding: 12px; border-radius: 10px; font-size: 14px; font-weight: 700;
      cursor: pointer; font-family: inherit; transition: all 0.2s; border: none;
      background: var(--bg3); color: var(--text); border: 1px solid var(--border2);
    }
    .btn-plan:hover { background: var(--accent-soft); border-color: var(--accent); color: var(--accent); }
    .btn-plan.accent { background: var(--accent); color: white; border-color: var(--accent); }
    .btn-plan.accent:hover { background: #e84d2a; }
    .pricing-note { text-align: center; margin-top: 20px; font-size: 13px; color: var(--text2); }
    .pricing-note a { color: var(--accent); text-decoration: none; }

    /* ======================== TESTIMONIALS ======================== */
    .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    @media (max-width: 768px) { .testi-grid { grid-template-columns: 1fr; } }
    .testi-card {
      background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius);
      padding: 28px; transition: all 0.3s;
    }
    .testi-card:hover { border-color: var(--border2); transform: translateY(-2px); }
    .testi-stars { color: #fbbf24; font-size: 14px; margin-bottom: 12px; letter-spacing: 2px; }
    .testi-text { font-size: 15px; line-height: 1.7; color: var(--text); margin-bottom: 20px; font-style: italic; }
    .testi-author { display: flex; align-items: center; gap: 12px; }
    .testi-avatar {
      width: 44px; height: 44px; border-radius: 50%;
      background: linear-gradient(135deg, var(--accent), var(--purple));
      display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px;
    }
    .testi-name { font-size: 14px; font-weight: 700; }
    .testi-meta { font-size: 12px; color: var(--text2); margin-top: 2px; }
    .testi-income {
      margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--border);
      display: flex; align-items: center; justify-content: space-between;
    }
    .income-label { font-size: 12px; color: var(--text2); }
    .income-val { font-size: 18px; font-weight: 800; color: var(--green); }

    /* ======================== FAQ ======================== */
    .faq-list { max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; gap: 8px; }
    .faq-item { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-sm); overflow: hidden; }
    .faq-question {
      width: 100%; padding: 20px 24px; text-align: left; background: none; border: none;
      color: var(--text); font-size: 16px; font-weight: 600; cursor: pointer;
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
      font-family: inherit;
    }
    .faq-question:hover { background: var(--bg3); }
    .faq-icon { font-size: 20px; transition: transform 0.3s; color: var(--accent); flex-shrink: 0; }
    .faq-item.open .faq-icon { transform: rotate(45deg); }
    .faq-answer { display: none; padding: 0 24px 20px; font-size: 15px; color: var(--text2); line-height: 1.7; }
    .faq-item.open .faq-answer { display: block; }

    /* ======================== CTA SECTION ======================== */
    .cta-section {
      padding: 80px 24px; text-align: center;
      background: linear-gradient(135deg, rgba(255,92,53,0.05) 0%, transparent 50%);
      border-top: 1px solid var(--border);
    }
    .cta-section h2 { font-family: 'Syne', sans-serif; font-size: clamp(28px, 4vw, 48px); font-weight: 800; margin-bottom: 16px; letter-spacing: -1px; }
    .cta-section p { font-size: 17px; color: var(--text2); max-width: 480px; margin: 0 auto 32px; }
    .cta-checks { display: flex; gap: 24px; justify-content: center; flex-wrap: wrap; margin-top: 20px; }
    .cta-checks span { font-size: 13px; color: var(--text2); display: flex; align-items: center; gap: 6px; }
    .cta-checks span::before { content: '✓'; color: var(--green); font-weight: 700; }

    /* ======================== FOOTER ======================== */
    footer { background: var(--bg2); border-top: 1px solid var(--border); padding: 60px 24px 32px; }
    .footer-inner { max-width: 1120px; margin: 0 auto; }
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 48px; }
    @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr; } }
    .footer-brand .nav-logo { display: block; margin-bottom: 12px; }
    .footer-desc { font-size: 14px; color: var(--text2); line-height: 1.7; margin-bottom: 20px; }
    .footer-socials { display: flex; gap: 8px; }
    .social-btn {
      width: 36px; height: 36px; border-radius: 8px; background: var(--bg3);
      border: 1px solid var(--border); display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 700; text-decoration: none; color: var(--text2); transition: all 0.2s;
    }
    .social-btn:hover { background: var(--accent-soft); border-color: var(--accent); color: var(--accent); }
    .footer-col h4 { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--text2); margin-bottom: 14px; }
    .footer-col a { display: block; font-size: 14px; color: var(--text2); text-decoration: none; padding: 4px 0; transition: color 0.2s; cursor: pointer; }
    .footer-col a:hover { color: var(--text); }
    .footer-bottom { border-top: 1px solid var(--border); padding-top: 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: gap 16px; }
    .footer-bottom-left { font-size: 13px; color: var(--text2); }
    .footer-payments { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
    .payment-badge { background: var(--bg3); border: 1px solid var(--border); border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 700; color: var(--text2); }

    /* ======================== AUTH PAGES ======================== */
    .auth-page { min-height: 100vh; display: flex; padding-top: 64px; }
    .auth-left {
      flex: 1; background: var(--bg2); border-right: 1px solid var(--border);
      padding: 60px; display: flex; flex-direction: column; justify-content: center;
    }
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

    .auth-right {
      width: 480px; max-width: 100%; padding: 60px 40px;
      display: flex; flex-direction: column; justify-content: center;
    }
    @media (max-width: 480px) { .auth-right { padding: 40px 24px; } }
    .auth-form-title { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; margin-bottom: 6px; letter-spacing: -0.5px; }
    .auth-form-sub { font-size: 14px; color: var(--text2); margin-bottom: 32px; }
    .form-group { margin-bottom: 16px; }
    .form-label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: var(--text2); }
    .form-input {
      width: 100%; padding: 12px 14px; border-radius: 10px; font-size: 14px;
      background: var(--bg2); border: 1px solid var(--border2); color: var(--text);
      font-family: inherit; transition: all 0.2s; outline: none;
    }
    .form-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
    .form-input::placeholder { color: var(--text2); opacity: 0.6; }
    .input-group { position: relative; }
    .input-prefix {
      position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
      font-size: 13px; color: var(--text2); white-space: nowrap;
    }
    .input-with-prefix { padding-left: 90px; }
    .form-hint { font-size: 12px; color: var(--text2); margin-top: 5px; }
    .form-check { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 20px; }
    .form-check input[type="checkbox"] { width: 16px; height: 16px; margin-top: 2px; accent-color: var(--accent); cursor: pointer; flex-shrink: 0; }
    .form-check label { font-size: 13px; color: var(--text2); }
    .form-check a { color: var(--accent); text-decoration: none; }
    .btn-full { width: 100%; padding: 13px; font-size: 15px; font-weight: 700; border-radius: 10px; }
    .auth-divider { display: flex; align-items: center; gap: 12px; margin: 20px 0; }
    .auth-divider span { font-size: 13px; color: var(--text2); white-space: nowrap; }
    .auth-divider::before, .auth-divider::after { content: ''; flex: 1; border-top: 1px solid var(--border); }
    .btn-google {
      width: 100%; padding: 12px; border-radius: 10px; font-size: 14px; font-weight: 600;
      background: var(--bg2); border: 1px solid var(--border2); color: var(--text);
      cursor: pointer; font-family: inherit; transition: all 0.2s;
      display: flex; align-items: center; justify-content: center; gap: 10px;
    }
    .btn-google:hover { background: var(--bg3); border-color: var(--border2); }
    .auth-footer { text-align: center; margin-top: 24px; font-size: 14px; color: var(--text2); }
    .auth-footer a { color: var(--accent); text-decoration: none; font-weight: 600; cursor: pointer; }
    .form-forgot { display: flex; justify-content: flex-end; margin-top: -8px; margin-bottom: 16px; }
    .form-forgot a { font-size: 13px; color: var(--accent); text-decoration: none; cursor: pointer; }
    .password-toggle { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); cursor: pointer; color: var(--text2); font-size: 16px; user-select: none; }

    /* Toast */
    .toast {
      position: fixed; bottom: 24px; right: 24px; z-index: 1000;
      background: var(--bg3); border: 1px solid var(--border2); border-radius: 12px;
      padding: 14px 20px; font-size: 14px; font-weight: 600;
      display: flex; align-items: center; gap: 10px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.4);
      transform: translateY(100px); opacity: 0; transition: all 0.4s;
      max-width: 340px;
    }
    .toast.show { transform: translateY(0); opacity: 1; }
    .toast.success { border-color: var(--green); }
    .toast.error { border-color: #ef4444; }

    /* ======================== INNER PAGES ======================== */
    .inner-page { padding: 100px 24px 80px; max-width: 860px; margin: 0 auto; }
    .inner-page h1 { font-family: 'Syne', sans-serif; font-size: clamp(28px, 4vw, 44px); font-weight: 800; margin-bottom: 12px; letter-spacing: -1px; }
    .inner-page .page-sub { font-size: 17px; color: var(--text2); margin-bottom: 48px; }
    .inner-page h2 { font-size: 20px; font-weight: 700; margin: 36px 0 12px; }
    .inner-page h3 { font-size: 16px; font-weight: 700; margin: 24px 0 8px; color: var(--text2); }
    .inner-page p { font-size: 15px; color: var(--text2); line-height: 1.8; margin-bottom: 12px; }
    .inner-page ul { padding-left: 20px; margin-bottom: 14px; }
    .inner-page ul li { font-size: 15px; color: var(--text2); line-height: 1.8; }
    .inner-divider { border: none; border-top: 1px solid var(--border); margin: 40px 0; }
    .last-updated { font-size: 13px; color: var(--text2); background: var(--bg3); border: 1px solid var(--border); padding: 8px 14px; border-radius: 8px; display: inline-block; margin-bottom: 32px; }

    /* About */
    .about-hero { text-align: center; padding: 100px 24px 60px; }
    .about-hero h1 { font-family: 'Syne', sans-serif; font-size: clamp(32px, 5vw, 56px); font-weight: 800; margin-bottom: 16px; }
    .team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 800px; margin: 0 auto; }
    @media (max-width: 600px) { .team-grid { grid-template-columns: 1fr; } }
    .team-card { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius); padding: 28px; text-align: center; }
    .team-avatar { width: 72px; height: 72px; border-radius: 50%; margin: 0 auto 14px; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 700; }
    .team-name { font-size: 16px; font-weight: 700; margin-bottom: 4px; }
    .team-role { font-size: 13px; color: var(--text2); }

    /* Help */
    .help-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 48px; }
    @media (max-width: 600px) { .help-grid { grid-template-columns: 1fr; } }
    .help-card {
      background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius);
      padding: 24px; cursor: pointer; transition: all 0.2s;
    }
    .help-card:hover { border-color: var(--accent); }
    .help-card-icon { font-size: 28px; margin-bottom: 10px; }
    .help-card-title { font-size: 16px; font-weight: 700; margin-bottom: 6px; }
    .help-card-desc { font-size: 14px; color: var(--text2); }

    /* Status */
    .status-overall { display: flex; align-items: center; gap: 12px; background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: var(--radius); padding: 20px 24px; margin-bottom: 32px; }
    .status-dot-lg { width: 12px; height: 12px; border-radius: 50%; background: var(--green); animation: pulse 2s infinite; }
    .status-overall-text { font-size: 16px; font-weight: 700; color: var(--green); }
    .status-list { display: flex; flex-direction: column; gap: 12px; }
    .status-row { display: flex; align-items: center; justify-content: space-between; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 16px 20px; }
    .status-service { font-size: 15px; font-weight: 600; }
    .status-badge { font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 100px; }
    .status-badge.operational { background: rgba(34,197,94,0.15); color: var(--green); }
    .status-badge.degraded { background: rgba(251,191,36,0.15); color: #fbbf24; }

    /* Blog */
    .blog-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
    @media (max-width: 600px) { .blog-grid { grid-template-columns: 1fr; } }
    .blog-card { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; cursor: pointer; transition: all 0.2s; }
    .blog-card:hover { border-color: var(--border2); transform: translateY(-3px); }
    .blog-thumb { height: 160px; background: linear-gradient(135deg, var(--bg3), var(--bg)); display: flex; align-items: center; justify-content: center; font-size: 48px; }
    .blog-body { padding: 20px; }
    .blog-tag { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); margin-bottom: 8px; }
    .blog-title { font-size: 17px; font-weight: 700; line-height: 1.4; margin-bottom: 8px; }
    .blog-meta { font-size: 12px; color: var(--text2); }

    /* Careers */
    .job-list { display: flex; flex-direction: column; gap: 12px; }
    .job-card { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; transition: all 0.2s; cursor: pointer; }
    .job-card:hover { border-color: var(--accent); }
    .job-title { font-size: 16px; font-weight: 700; margin-bottom: 4px; }
    .job-meta { font-size: 13px; color: var(--text2); display: flex; gap: 10px; flex-wrap: wrap; }
    .job-tag { background: var(--bg3); border: 1px solid var(--border); border-radius: 6px; padding: 3px 10px; font-size: 12px; font-weight: 600; }

    /* Support widget */
    .support-widget {
      position: fixed; bottom: 24px; right: 24px; z-index: 90;
      display: flex; flex-direction: column; align-items: flex-end; gap: 12px;
    }
    .support-bubble {
      background: var(--bg3); border: 1px solid var(--border2);
      border-radius: var(--radius); padding: 16px 20px; width: 280px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.4);
      display: none;
    }
    .support-bubble.open { display: block; animation: fadeIn 0.2s ease; }
    .support-bubble-title { font-size: 15px; font-weight: 700; margin-bottom: 6px; }
    .support-bubble-sub { font-size: 13px; color: var(--text2); margin-bottom: 14px; }
    .support-options { display: flex; flex-direction: column; gap: 8px; }
    .support-option { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; background: var(--bg2); border: 1px solid var(--border); font-size: 13px; font-weight: 600; cursor: pointer; text-decoration: none; color: var(--text); transition: all 0.2s; }
    .support-option:hover { background: var(--accent-soft); border-color: var(--accent); color: var(--accent); }
    .support-btn {
      width: 54px; height: 54px; background: var(--accent); border-radius: 50%; border: none;
      cursor: pointer; font-size: 22px; display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 20px var(--accent-glow); transition: all 0.2s;
    }
    .support-btn:hover { background: #e84d2a; transform: scale(1.05); }
    .support-close { position: absolute; top: 12px; right: 12px; cursor: pointer; color: var(--text2); font-size: 16px; }
    .support-bubble { position: relative; }

    /* Demo Modal */
    .modal-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 200;
      display: flex; align-items: center; justify-content: center;
      padding: 24px; opacity: 0; pointer-events: none; transition: all 0.3s;
      backdrop-filter: blur(10px);
    }
    .modal-overlay.open { opacity: 1; pointer-events: all; }
    .modal { background: var(--bg2); border: 1px solid var(--border2); border-radius: 20px; width: 100%; max-width: 760px; overflow: hidden; }
    .modal-header { padding: 20px 24px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
    .modal-title { font-size: 18px; font-weight: 700; }
    .modal-close { cursor: pointer; color: var(--text2); font-size: 22px; background: none; border: none; color: var(--text); }
    .modal-body { padding: 24px; }
    .demo-video-wrap { aspect-ratio: 16/9; background: var(--bg3); border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; border: 1px solid var(--border); }
    .demo-play { width: 72px; height: 72px; background: var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; cursor: pointer; transition: all 0.2s; }
    .demo-play:hover { transform: scale(1.05); box-shadow: 0 8px 30px var(--accent-glow); }
    .demo-label { font-size: 16px; font-weight: 600; color: var(--text2); }
    .demo-features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 20px; }
    .demo-feature { background: var(--bg3); border-radius: 10px; padding: 14px; text-align: center; }
    .demo-feature-icon { font-size: 24px; margin-bottom: 6px; }
    .demo-feature-text { font-size: 13px; font-weight: 600; }
    @media (max-width: 480px) { .demo-features { grid-template-columns: 1fr; } }

    /* Dashboard preview */
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
  </style>
</head>
<body>

<!-- NAVBAR -->
<nav id="navbar">
  <a href="#" class="nav-logo" onclick="navigate('home')">Weiiz<span>.ink</span></a>
  <div class="nav-links">
    <a href="#" onclick="navigate('home'); scrollTo('#fitur')">Fitur</a>
    <a href="#" onclick="navigate('home'); scrollTo('#harga')">Harga</a>
    <a href="#" onclick="navigate('home'); scrollTo('#kreator')">Kreator</a>
    <a href="#" onclick="navigate('home'); scrollTo('#faq')">FAQ</a>
    <a href="#" onclick="navigate('blog')">Blog</a>
  </div>
  <div class="nav-cta">
    <a href="#" class="btn-ghost" onclick="navigate('login')">Masuk</a>
    <a href="#" class="btn-primary" onclick="navigate('register')">Mulai Gratis</a>
  </div>
  <button class="hamburger" onclick="toggleMobileNav()">&#9776;</button>
</nav>

<div class="mobile-nav" id="mobileNav">
  <a href="#" onclick="navigate('home'); closeMobileNav()">Beranda</a>
  <a href="#" onclick="navigate('home'); scrollTo('#fitur'); closeMobileNav()">Fitur</a>
  <a href="#" onclick="navigate('home'); scrollTo('#harga'); closeMobileNav()">Harga</a>
  <a href="#" onclick="navigate('blog'); closeMobileNav()">Blog</a>
  <a href="#" onclick="navigate('login'); closeMobileNav()">Masuk</a>
  <a href="#" onclick="navigate('register'); closeMobileNav()" style="color: var(--accent); font-weight: 700;">Mulai Gratis &rarr;</a>
</div>

<!-- ===================== PAGE: HOME ===================== -->
<div class="page active" id="page-home">

  <!-- HERO -->
  <section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-grid"></div>
    <div class="hero-content">
      <div class="hero-badge">
        <div class="dot"></div>
        Digunakan 5.000+ Creator Indonesia
      </div>
      <h1>Where Bio<br><span>Becomes Benefit</span></h1>
      <p class="hero-sub">Buat link bio, terima donasi, jual produk digital, dan kelola membership &mdash; semuanya dalam <strong>satu platform</strong>.</p>
      <div class="hero-ctas">
        <a href="#" class="btn-primary btn-large" onclick="navigate('register')">Mulai Gratis &mdash; Tanpa Kartu Kredit</a>
        <button class="btn-demo btn-large" onclick="openDemo()">
          <span class="play-icon">&#9654;</span>
          Lihat Demo
        </button>
      </div>
      <div class="hero-stats">
        <div class="stat"><div class="stat-num">5.000+</div><div class="stat-label">Creator Aktif</div></div>
        <div class="stat"><div class="stat-num">Rp2M+</div><div class="stat-label">Produk Terjual</div></div>
        <div class="stat"><div class="stat-num">50.000+</div><div class="stat-label">Transaksi/bulan</div></div>
        <div class="stat"><div class="stat-num">4.9/5</div><div class="stat-label">Rating</div></div>
      </div>
    </div>
  </section>

  <!-- PHONE MOCKUP -->
  <section class="mockup-section">
    <div class="mockup-wrap">
      <div style="position:relative; width:260px; margin:0 auto;">
        <div class="mockup-phone">
          <div class="phone-notch"></div>
          <div class="phone-profile">
            <div class="phone-avatar">✨</div>
            <div class="phone-name">Kirana.ink</div>
            <div class="phone-handle">Content Creator &amp; Digital Seller</div>
          </div>
          <div class="phone-links">
            <div class="phone-link-btn accent"><span class="phone-link-icon">🛍️</span> Template Canva Viral</div>
            <div class="phone-link-btn"><span class="phone-link-icon">💌</span> Newsletter Mingguan</div>
            <div class="phone-link-btn"><span class="phone-link-icon">☕</span> Dukung Konten Saya</div>
            <div class="phone-link-btn"><span class="phone-link-icon">📦</span> E-Book Instagram Growth</div>
          </div>
          <div class="phone-mini-stats">
            <div class="mini-stat"><div class="mini-stat-val">2.4K</div><div class="mini-stat-lbl">Pengunjung</div></div>
            <div class="mini-stat"><div class="mini-stat-val" style="color:var(--green)">Rp1.2jt</div><div class="mini-stat-lbl">Pendapatan</div></div>
            <div class="mini-stat"><div class="mini-stat-val" style="color:var(--blue)">87%</div><div class="mini-stat-lbl">Konversi</div></div>
          </div>
        </div>
        <!-- Float cards -->
        <div class="float-card float-green" style="top:-20px; right:-100px; display:none;">
          <span>&#128176;</span> Rp45.000 diterima
        </div>
        <div class="float-card float-blue" style="bottom:40px; right:-110px; display:none;">
          <span>&#128200;</span> +23% bulan ini
        </div>
      </div>
    </div>
  </section>

  <!-- DASHBOARD PREVIEW -->
  <section class="section">
    <div class="section-inner">
      <div class="section-header">
        <div class="section-label">Dashboard</div>
        <h2 class="section-title">Semua data dalam satu tampilan</h2>
        <p class="section-sub">Pantau pendapatan, pengunjung, dan performa produk secara real-time.</p>
      </div>
      <div class="dashboard-preview">
        <div class="dash-header">
          <div>
            <div style="font-size:14px; color:var(--text2); margin-bottom:4px;">Selamat datang,</div>
            <div style="font-size:18px; font-weight:700;">Kirana Putri ✨</div>
          </div>
          <div class="btn-primary" style="font-size:13px; cursor:default;">+ Tambah Produk</div>
        </div>
        <div class="dash-stat-grid">
          <div class="dash-stat"><div class="dash-stat-val" style="color:var(--green)">Rp3.2jt</div><div class="dash-stat-lbl">Pendapatan Bulan Ini</div></div>
          <div class="dash-stat"><div class="dash-stat-val">2.4K</div><div class="dash-stat-lbl">Pengunjung</div></div>
          <div class="dash-stat"><div class="dash-stat-val" style="color:var(--blue)">87%</div><div class="dash-stat-lbl">Konversi Rate</div></div>
          <div class="dash-stat"><div class="dash-stat-val">48</div><div class="dash-stat-lbl">Produk Terjual</div></div>
        </div>
        <div class="dash-chart" id="dashChart">
          <!-- bars injected by JS -->
        </div>
        <div style="font-size:12px; color:var(--text2); margin-top:8px; text-align:right;">Pendapatan 7 hari terakhir</div>
      </div>
    </div>
  </section>

  <!-- FEATURES -->
  <section class="section" id="fitur">
    <div class="section-inner">
      <div class="section-header">
        <div class="section-label">Semua yang Kamu Butuhkan</div>
        <h2 class="section-title">Satu platform, semua fitur monetisasi</h2>
        <p class="section-sub">Tidak perlu 5 aplikasi berbeda. Weiiz menggabungkan semua alat terbaik untuk creator Indonesia.</p>
      </div>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">&#128279;</div>
          <div class="feature-title">Link in Bio</div>
          <div class="feature-desc">Satu link untuk semua kontenmu. Tampil profesional di bio Instagram, TikTok, dan YouTube.</div>
          <span class="feature-tag">Gratis</span>
        </div>
        <div class="feature-card">
          <div class="feature-icon">&#128717;</div>
          <div class="feature-title">Digital Product Store</div>
          <div class="feature-desc">Jual e-book, template, preset, kursus, dan produk digital langsung dari halamanmu.</div>
          <span class="feature-tag">File hingga 2GB</span>
        </div>
        <div class="feature-card">
          <div class="feature-icon">&#9749;</div>
          <div class="feature-title">Creator Donations</div>
          <div class="feature-desc">Terima dukungan dari fans dengan sistem donasi yang simpel dan terintegrasi langsung.</div>
          <span class="feature-tag">QRIS &amp; Transfer</span>
        </div>
        <div class="feature-card">
          <div class="feature-icon">&#128081;</div>
          <div class="feature-title">Membership</div>
          <div class="feature-desc">Buat komunitas eksklusif berbayar. Kelola subscriber dan konten premium dalam satu tempat.</div>
          <span class="feature-tag">Pendapatan Stabil</span>
        </div>
        <div class="feature-card">
          <div class="feature-icon">&#129309;</div>
          <div class="feature-title">Affiliate System</div>
          <div class="feature-desc">Buat program afiliasi sendiri. Ajak orang lain promosikan produkmu dan bagi komisi otomatis.</div>
          <span class="feature-tag">Komisi Otomatis</span>
        </div>
        <div class="feature-card">
          <div class="feature-icon">&#128231;</div>
          <div class="feature-title">Email List Builder</div>
          <div class="feature-desc">Kumpulkan email pengunjung dan bangun audiens jangka panjang yang kamu miliki sepenuhnya.</div>
          <span class="feature-tag">Aset Permanen</span>
        </div>
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section class="section" style="background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);">
    <div class="section-inner">
      <div class="section-header">
        <div class="section-label">Semudah 1-2-3</div>
        <h2 class="section-title">Mulai dalam 3 langkah</h2>
        <p class="section-sub">Tidak perlu skill teknis. Tidak perlu coding. Langsung aktif hari ini.</p>
      </div>
      <div class="steps-grid">
        <div class="step-card">
          <div class="step-num">1</div>
          <div class="step-icon">&#9999;&#65039;</div>
          <div class="step-title">Buat Halaman Bio</div>
          <div class="step-desc">Daftar gratis 30 detik. Pilih username, upload foto, halaman bio profesionalmu langsung jadi.</div>
        </div>
        <div class="step-card">
          <div class="step-num">2</div>
          <div class="step-icon">&#128230;</div>
          <div class="step-title">Tambahkan Produk atau Donasi</div>
          <div class="step-desc">Upload produk digitalmu, aktifkan tombol donasi, atau buat halaman membership eksklusif.</div>
        </div>
        <div class="step-card">
          <div class="step-num">3</div>
          <div class="step-icon">&#128184;</div>
          <div class="step-title">Mulai Menghasilkan Uang</div>
          <div class="step-desc">Share link bio ke semua platform. Fans klik, bayar, uang langsung masuk ke rekeningmu.</div>
        </div>
      </div>
      <div style="text-align:center; margin-top:40px;">
        <a href="#" class="btn-primary btn-large" onclick="navigate('register')">Coba Sekarang &mdash; Gratis &rarr;</a>
      </div>
    </div>
  </section>

  <!-- PRICING -->
  <section class="section" id="harga">
    <div class="section-inner">
      <div class="section-header">
        <div class="section-label">Harga Transparan</div>
        <h2 class="section-title">Murah, powerful, tanpa biaya tersembunyi</h2>
        <p class="section-sub">Marketplace lain ambil komisi hingga 10&ndash;15%. Di Weiiz, mulai dari hanya 0.5%! &#127881;</p>
      </div>

      <div class="pricing-toggle-wrap">
        <span class="toggle-label" id="toggle-monthly" style="color:var(--text)">Bulanan</span>
        <div class="toggle-switch" id="pricingToggle" onclick="togglePricing()">
          <div class="toggle-thumb"></div>
        </div>
        <span class="toggle-label" id="toggle-annual">Tahunan</span>
        <span class="annual-badge" id="annualBadge" style="opacity:0.4">Hemat 25%</span>
      </div>

      <div class="pricing-grid">
        <!-- FREE -->
        <div class="pricing-card">
          <div class="plan-name">Free</div>
          <div class="plan-price">
            <span class="plan-amount">Gratis</span>
          </div>
          <div class="plan-fee">Fee: <strong>5%</strong> per transaksi</div>
          <hr class="plan-divider">
          <ul class="plan-features">
            <li>5 link aktif</li>
            <li>2 produk digital</li>
            <li>Analitik dasar</li>
            <li>Subdomain weiiz.ink</li>
          </ul>
          <button class="btn-plan" onclick="navigate('register')">Mulai Gratis</button>
        </div>
        <!-- CREATOR -->
        <div class="pricing-card">
          <div class="plan-name">Creator</div>
          <div class="plan-price">
            <span class="plan-amount" id="price-creator">Rp39.000</span>
            <span class="plan-period"> / bulan</span>
          </div>
          <div class="plan-fee">Fee: <strong>3%</strong> per transaksi</div>
          <hr class="plan-divider">
          <ul class="plan-features">
            <li>25 link aktif</li>
            <li>10 produk digital</li>
            <li>Analitik lengkap</li>
            <li>Custom subdomain</li>
            <li>Withdrawal 2x/bulan</li>
          </ul>
          <button class="btn-plan" onclick="navigate('register')">Mulai Creator</button>
        </div>
        <!-- PRO -->
        <div class="pricing-card popular">
          <div class="popular-badge">&#11088; PALING POPULER</div>
          <div class="plan-name">Pro</div>
          <div class="plan-price">
            <span class="plan-amount" id="price-pro">Rp99.000</span>
            <span class="plan-period"> / bulan</span>
          </div>
          <div class="plan-fee">Fee: <strong>1.5%</strong> per transaksi</div>
          <hr class="plan-divider">
          <ul class="plan-features">
            <li>Unlimited link</li>
            <li>Unlimited produk digital</li>
            <li>Real-time analytics</li>
            <li>Custom domain sendiri</li>
            <li>AI bio generator &#10024;</li>
            <li>Withdrawal kapan saja</li>
          </ul>
          <button class="btn-plan accent" onclick="navigate('register')">Mulai Pro</button>
        </div>
        <!-- BUSINESS -->
        <div class="pricing-card">
          <div class="plan-name">Business</div>
          <div class="plan-price">
            <span class="plan-amount" id="price-business">Rp249.000</span>
            <span class="plan-period"> / bulan</span>
          </div>
          <div class="plan-fee">Fee: <strong>0.5%</strong> per transaksi</div>
          <hr class="plan-divider">
          <ul class="plan-features">
            <li>Semua fitur Pro</li>
            <li>Multi user / tim</li>
            <li>White label branding</li>
            <li>API access</li>
            <li>Priority support 24/7</li>
          </ul>
          <button class="btn-plan" onclick="navigate('contact')">Hubungi Kami</button>
        </div>
      </div>
      <p class="pricing-note">Semua harga dalam IDR &bull; Bisa batalkan kapan saja &bull; Tanpa kontrak jangka panjang &bull; <a href="#" onclick="navigate('privacy')">Privasi terlindungi</a></p>
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section class="section" id="kreator" style="background:var(--bg2); border-top:1px solid var(--border); border-bottom:1px solid var(--border);">
    <div class="section-inner">
      <div class="section-header">
        <div class="section-label">Cerita Nyata</div>
        <h2 class="section-title">Creator yang sudah berhasil</h2>
        <p class="section-sub">Bukan janji. Ini hasil nyata dari creator Indonesia yang sudah menggunakan Weiiz.</p>
      </div>
      <div class="testi-grid">
        <div class="testi-card">
          <div class="testi-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <p class="testi-text">"Sejak pakai Weiiz, saya bisa jual template Canva langsung dari bio Instagram. Bulan pertama sudah balik modal berkali-kali lipat!"</p>
          <div class="testi-author">
            <div class="testi-avatar" style="background:linear-gradient(135deg,#ff5c35,#ff8c35)">KP</div>
            <div>
              <div class="testi-name">Kirana Putri</div>
              <div class="testi-meta">&#64;kirana.putri &bull; Instagram &bull; 120K Followers</div>
            </div>
          </div>
          <div class="testi-income">
            <span class="income-label">Pendapatan bulan ini</span>
            <span class="income-val">Rp3.2jt</span>
          </div>
        </div>
        <div class="testi-card">
          <div class="testi-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <p class="testi-text">"Weiiz paling smooth buat kreator Indonesia. QRIS, transfer lokal, withdrawal cepat, dan dashboard-nya bersih banget. Rekomen!"</p>
          <div class="testi-author">
            <div class="testi-avatar" style="background:linear-gradient(135deg,#3b82f6,#a855f7)">RA</div>
            <div>
              <div class="testi-name">Rizky Aditya</div>
              <div class="testi-meta">&#64;rizky.aditya &bull; TikTok &bull; 380K Followers</div>
            </div>
          </div>
          <div class="testi-income">
            <span class="income-label">Pendapatan bulan ini</span>
            <span class="income-val">Rp7.8jt</span>
          </div>
        </div>
        <div class="testi-card">
          <div class="testi-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <p class="testi-text">"Fitur membership-nya game-changer. Subscriber akses konten eksklusif, saya punya pendapatan stabil setiap bulannya. Luar biasa!"</p>
          <div class="testi-author">
            <div class="testi-avatar" style="background:linear-gradient(135deg,#22c55e,#3b82f6)">SN</div>
            <div>
              <div class="testi-name">Siti Nuraini</div>
              <div class="testi-meta">&#64;siti.nuraini &bull; YouTube &bull; 55K Subscriber</div>
            </div>
          </div>
          <div class="testi-income">
            <span class="income-label">Pendapatan bulan ini</span>
            <span class="income-val">Rp5.5jt</span>
          </div>
        </div>
      </div>
      <div style="text-align:center; margin-top:28px;">
        <div style="font-size:14px; color:var(--text2);">&#11088;&#11088;&#11088;&#11088;&#11088; <strong style="color:var(--text)">4.9 / 5</strong> dari 1.200+ ulasan creator terverifikasi</div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="section" id="faq">
    <div class="section-inner">
      <div class="section-header">
        <div class="section-label">FAQ</div>
        <h2 class="section-title">Pertanyaan yang sering ditanya</h2>
      </div>
      <div class="faq-list">
        <div class="faq-item">
          <button class="faq-question" onclick="toggleFaq(this)">
            Apakah Weiiz.ink benar-benar gratis?
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">Ya! Plan FREE tidak ada biaya bulanan sama sekali. Kamu hanya bayar fee 5% per transaksi yang berhasil. Tidak ada biaya setup, tidak ada kartu kredit yang dibutuhkan. Daftar sekarang dan mulai monetisasi hari ini.</div>
        </div>
        <div class="faq-item">
          <button class="faq-question" onclick="toggleFaq(this)">
            Apa bedanya Weiiz dengan Linktree atau Lynk.id?
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">Weiiz bukan sekadar bio link. Weiiz adalah platform monetisasi lengkap &mdash; kamu bisa jual produk digital, terima donasi, buat membership, kelola afiliasi, dan analitik real-time, semuanya dalam satu dashboard. Platform lain hanya link, Weiiz adalah mesin penghasil uang.</div>
        </div>
        <div class="faq-item">
          <button class="faq-question" onclick="toggleFaq(this)">
            Bagaimana cara withdrawal saldo?
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">Withdrawal bisa dilakukan ke rekening bank lokal manapun (BCA, Mandiri, BNI, BRI, dll) atau e-wallet (GoPay, OVO, DANA). Proses 1x24 jam untuk plan Free &amp; Creator. Plan Pro dan Business bisa withdrawal kapan saja, proses instan.</div>
        </div>
        <div class="faq-item">
          <button class="faq-question" onclick="toggleFaq(this)">
            Apakah bisa pakai domain sendiri?
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">Bisa! Plan Pro ke atas mendukung custom domain. Misalnya kamu bisa set link.namakamu.com atau bio.tokomu.com. Caranya mudah &mdash; cukup arahkan DNS domain kamu ke server Weiiz, dan ikuti panduan di dashboard.</div>
        </div>
        <div class="faq-item">
          <button class="faq-question" onclick="toggleFaq(this)">
            Produk digital apa saja yang bisa dijual?
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">Hampir semua jenis file digital bisa dijual: e-book (PDF), template Canva/Figma, preset Lightroom/VSCO, kursus video, music pack, foto stok, dokumen, spreadsheet, dan banyak lagi. Ukuran file hingga 2GB per produk.</div>
        </div>
        <div class="faq-item">
          <button class="faq-question" onclick="toggleFaq(this)">
            Apakah data dan transaksi aman?
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">Keamanan adalah prioritas utama kami. Semua data dienkripsi dengan SSL 256-bit. Sistem pembayaran diproses melalui Midtrans yang telah bersertifikasi PCI DSS. Kami juga mendukung 2FA untuk perlindungan akun tambahan. Platform kami memiliki uptime 99.98%.</div>
        </div>
        <div class="faq-item">
          <button class="faq-question" onclick="toggleFaq(this)">
            Apakah ada aplikasi mobile?
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">Saat ini Weiiz bisa diakses melalui browser mobile dengan tampilan yang sudah dioptimalkan. Aplikasi mobile native (iOS &amp; Android) sedang dalam tahap pengembangan dan akan segera hadir. Daftar sekarang untuk mendapat early access!</div>
        </div>
      </div>
      <div style="text-align:center; margin-top:28px; font-size:14px; color:var(--text2);">
        Tidak ketemu jawabannya? <a href="mailto:support@weiiz.ink" style="color:var(--accent); font-weight:600;">Hubungi kami</a>
      </div>
    </div>
  </section>

  <!-- CTA FINAL -->
  <div class="cta-section">
    <div>&#128640;&#10024;&#128176;</div>
    <h2>Mulai Monetisasi Audiens Kamu Hari Ini</h2>
    <p>Bergabung dengan 5.000+ creator Indonesia yang sudah menghasilkan dari konten mereka.</p>
    <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
      <a href="#" class="btn-primary btn-large" onclick="navigate('register')">Daftar Gratis &mdash; Mulai Sekarang &rarr;</a>
      <a href="#" class="btn-ghost btn-large" onclick="navigate('home'); setTimeout(()=>scrollTo('#harga'),100)">Lihat Paket Harga</a>
    </div>
    <div class="cta-checks">
      <span>Tanpa kartu kredit</span>
      <span>Cancel kapan saja</span>
      <span>Setup 2 menit</span>
      <span>Support Bahasa Indonesia</span>
    </div>
  </div>

</div><!-- /page-home -->


<!-- ===================== PAGE: LOGIN ===================== -->
<div class="page" id="page-login">
  <div class="auth-page">
    <div class="auth-left">
      <div class="auth-left-logo">Weiiz<span>.ink</span></div>
      <div class="auth-tagline">Selamat datang <span>kembali,</span><br>creator! 👋</div>
      <div class="auth-perks">
        <div class="auth-perk">
          <div class="perk-icon">&#128279;</div>
          <span>Bio link profesional yang menghasilkan</span>
        </div>
        <div class="auth-perk">
          <div class="perk-icon">&#128184;</div>
          <span>Terima pembayaran dari QRIS, bank, e-wallet</span>
        </div>
        <div class="auth-perk">
          <div class="perk-icon">&#128200;</div>
          <span>Analytics real-time untuk semua kontenmu</span>
        </div>
        <div class="auth-perk">
          <div class="perk-icon">&#129302;</div>
          <span>AI bio generator untuk boost konversi</span>
        </div>
      </div>
      <div class="auth-avatars">
        <div class="avatar-stack">
          <div class="avatar-sm" style="background:linear-gradient(135deg,#ff5c35,#ff8c35)">KP</div>
          <div class="avatar-sm" style="background:linear-gradient(135deg,#3b82f6,#a855f7)">RA</div>
          <div class="avatar-sm" style="background:linear-gradient(135deg,#22c55e,#3b82f6)">SN</div>
          <div class="avatar-sm" style="background:var(--bg3); border:1px solid var(--border2); font-size:11px;">+4K</div>
        </div>
        <span class="auth-count">Bergabung dengan 5.000+ creator</span>
      </div>
    </div>
    <div class="auth-right">
      <div class="auth-form-title">Masuk ke Weiiz</div>
      <div class="auth-form-sub">Belum punya akun? <a onclick="navigate('register')">Daftar gratis &rarr;</a></div>

      <div id="login-error" style="display:none; background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); border-radius:10px; padding:12px 14px; font-size:13px; color:#ef4444; margin-bottom:16px;"></div>

      <div class="form-group">
        <label class="form-label">Email</label>
        <input class="form-input" type="email" id="login-email" placeholder="kamu@email.com" autocomplete="email" />
      </div>
      <div class="form-group">
        <label class="form-label">Password</label>
        <div class="input-group">
          <input class="form-input" type="password" id="login-password" placeholder="&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;" autocomplete="current-password" />
          <span class="password-toggle" onclick="togglePassword('login-password', this)">&#128065;</span>
        </div>
      </div>
      <div class="form-forgot">
        <a onclick="showForgotToast()">Lupa password?</a>
      </div>
      <button class="btn-primary btn-full" onclick="handleLogin()">Masuk ke Akun</button>
      <div class="auth-divider"><span>atau masuk dengan</span></div>
      <button class="btn-google" onclick="handleGoogleAuth()">
        <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.29-8.16 2.29-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
        Daftar dengan Google
      </button>
      <div class="auth-footer" style="margin-top:20px; font-size:12px; color:var(--text2);">&#128274; Data kamu aman &amp; terenkripsi dengan SSL 256-bit</div>
    </div>
  </div>
</div>


<!-- ===================== PAGE: REGISTER ===================== -->
<div class="page" id="page-register">
  <div class="auth-page">
    <div class="auth-left">
      <div class="auth-left-logo">Weiiz<span>.ink</span></div>
      <div class="auth-tagline">Mulai <span>monetisasi</span><br>bio-mu sekarang</div>
      <div class="auth-perks">
        <div class="auth-perk"><div class="perk-icon">&#10003;</div> <span>Gratis selamanya untuk mulai</span></div>
        <div class="auth-perk"><div class="perk-icon">&#9889;</div> <span>Terima pembayaran dalam 5 menit</span></div>
        <div class="auth-perk"><div class="perk-icon">&#128202;</div> <span>Analytics lengkap &amp; real-time</span></div>
        <div class="auth-perk"><div class="perk-icon">&#129302;</div> <span>AI tools untuk boost konversi</span></div>
      </div>
      <div class="auth-avatars">
        <div class="avatar-stack">
          <div class="avatar-sm" style="background:linear-gradient(135deg,#ff5c35,#ff8c35)">R</div>
          <div class="avatar-sm" style="background:linear-gradient(135deg,#3b82f6,#a855f7)">S</div>
          <div class="avatar-sm" style="background:linear-gradient(135deg,#22c55e,#3b82f6)">B</div>
          <div class="avatar-sm" style="background:var(--bg3); border:1px solid var(--border2); font-size:11px;">+14K</div>
        </div>
        <span class="auth-count"><strong>14.200+</strong> creator bergabung</span>
      </div>
    </div>
    <div class="auth-right">
      <div class="auth-form-title">Buat Akun Gratis &#10024;</div>
      <div class="auth-form-sub">Setup 5 menit &middot; Tanpa kartu kredit &middot; Langsung aktif</div>

      <div id="register-error" style="display:none; background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); border-radius:10px; padding:12px 14px; font-size:13px; color:#ef4444; margin-bottom:16px;"></div>

      <div class="form-group">
        <label class="form-label">Nama Lengkap</label>
        <input class="form-input" type="text" id="reg-name" placeholder="Nama Kamu" autocomplete="name" />
      </div>
      <div class="form-group">
        <label class="form-label">Username</label>
        <div class="input-group">
          <span class="input-prefix">weiiz.ink/</span>
          <input class="form-input input-with-prefix" type="text" id="reg-username" placeholder="username-mu" oninput="checkUsername(this)" />
        </div>
        <div class="form-hint" id="username-hint">Huruf kecil, angka, dan underscore (_)</div>
      </div>
      <div class="form-group">
        <label class="form-label">Email</label>
        <input class="form-input" type="email" id="reg-email" placeholder="kamu@email.com" autocomplete="email" />
      </div>
      <div class="form-group">
        <label class="form-label">Password</label>
        <div class="input-group">
          <input class="form-input" type="password" id="reg-password" placeholder="Min. 8 karakter" autocomplete="new-password" oninput="checkPasswordStrength(this)" />
          <span class="password-toggle" onclick="togglePassword('reg-password', this)">&#128065;</span>
        </div>
        <div id="password-strength" style="margin-top:6px; font-size:12px;"></div>
      </div>
      <div class="form-check">
        <input type="checkbox" id="reg-terms" />
        <label for="reg-terms">Saya setuju dengan <a onclick="navigate('terms')">Terms of Service</a> dan <a onclick="navigate('privacy')">Privacy Policy</a></label>
      </div>
      <button class="btn-primary btn-full" onclick="handleRegister()">Buat Akun Gratis</button>
      <div class="auth-divider"><span>atau daftar dengan</span></div>
      <button class="btn-google" onclick="handleGoogleAuth()">
        <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.29-8.16 2.29-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
        Daftar dengan Google
      </button>
      <div class="auth-footer">Sudah punya akun? &#128075; <a onclick="navigate('login')">Masuk &rarr;</a></div>
    </div>
  </div>
</div>


<!-- ===================== PAGE: ABOUT ===================== -->
<div class="page" id="page-about">
  <div class="about-hero">
    <div class="section-label">Tentang Kami</div>
    <h1>Kami percaya setiap <span style="color:var(--accent)">creator</span> berhak menghasilkan dari karyanya</h1>
    <p style="font-size:18px; color:var(--text2); max-width:560px; margin:16px auto 0; line-height:1.7;">Weiiz lahir dari frustrasi creator Indonesia yang harus menggunakan 5+ platform berbeda hanya untuk monetisasi konten mereka.</p>
  </div>
  <section class="section">
    <div class="section-inner" style="max-width:800px;">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:40px; margin-bottom:60px; align-items:center;">
        <div>
          <h2 style="font-family:'Syne',sans-serif; font-size:28px; font-weight:800; margin-bottom:14px;">Cerita di Balik Weiiz</h2>
          <p style="font-size:15px; color:var(--text2); line-height:1.8;">Didirikan pada 2023 di Jakarta, Weiiz dimulai sebagai proyek sampingan dua developer yang juga creator konten. Mereka lelah membayar komisi mahal ke berbagai platform asing yang tidak memahami kebutuhan creator lokal.</p>
          <p style="font-size:15px; color:var(--text2); line-height:1.8; margin-top:12px;">Hari ini, Weiiz telah membantu lebih dari 5.000 creator Indonesia menghasilkan lebih dari Rp2 miliar dari konten mereka &mdash; dan angka ini terus bertumbuh setiap bulannya.</p>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:var(--radius); padding:28px; text-align:center;">
          <div style="font-size:48px; margin-bottom:12px;">&#127981;</div>
          <div style="font-family:'Syne',sans-serif; font-size:36px; font-weight:800; color:var(--accent);">2023</div>
          <div style="font-size:14px; color:var(--text2);">Tahun Berdiri</div>
          <div style="margin-top:20px; padding-top:20px; border-top:1px solid var(--border);">
            <div style="font-family:'Syne',sans-serif; font-size:32px; font-weight:800;">Jakarta</div>
            <div style="font-size:14px; color:var(--text2);">Kantor Pusat</div>
          </div>
        </div>
      </div>
      <h2 style="font-family:'Syne',sans-serif; font-size:28px; font-weight:800; margin-bottom:28px; text-align:center;">Tim Kami</h2>
      <div class="team-grid">
        <div class="team-card">
          <div class="team-avatar" style="background:linear-gradient(135deg,#ff5c35,#ff8c35)">&#128104;&#8205;&#128187;</div>
          <div class="team-name">Andi Firmansyah</div>
          <div class="team-role">Co-Founder &amp; CEO</div>
        </div>
        <div class="team-card">
          <div class="team-avatar" style="background:linear-gradient(135deg,#3b82f6,#a855f7)">&#128105;&#8205;&#127912;</div>
          <div class="team-name">Dina Rahmawati</div>
          <div class="team-role">Co-Founder &amp; CPO</div>
        </div>
        <div class="team-card">
          <div class="team-avatar" style="background:linear-gradient(135deg,#22c55e,#16a34a)">&#128104;&#8205;&#128188;</div>
          <div class="team-name">Bagas Santoso</div>
          <div class="team-role">Head of Engineering</div>
        </div>
      </div>
      <div style="text-align:center; margin-top:40px;">
        <p style="font-size:15px; color:var(--text2); margin-bottom:20px;">Ingin bergabung dengan tim kami?</p>
        <a href="#" class="btn-primary" onclick="navigate('careers')">Lihat Posisi Terbuka &rarr;</a>
      </div>
    </div>
  </section>
</div>


<!-- ===================== PAGE: BLOG ===================== -->
<div class="page" id="page-blog">
  <section class="section" style="padding-top:100px;">
    <div class="section-inner">
      <div class="section-header">
        <div class="section-label">Blog &amp; Tips</div>
        <h2 class="section-title">Resources untuk Creator Indonesia</h2>
        <p class="section-sub">Tips monetisasi, growth hack, dan berita terbaru seputar creator economy.</p>
      </div>
      <div class="blog-grid">
        <div class="blog-card" onclick="showToast('Artikel sedang dalam pengembangan!')">
          <div class="blog-thumb">&#128717;</div>
          <div class="blog-body">
            <div class="blog-tag">Monetisasi</div>
            <div class="blog-title">5 Cara Creator Pemula Hasilkan Rp1 Juta Pertama dari Bio Link</div>
            <div class="blog-meta">15 Maret 2025 &bull; 8 menit baca</div>
          </div>
        </div>
        <div class="blog-card" onclick="showToast('Artikel sedang dalam pengembangan!')">
          <div class="blog-thumb">&#128200;</div>
          <div class="blog-body">
            <div class="blog-tag">Growth</div>
            <div class="blog-title">Cara Meningkatkan Konversi Bio Link hingga 3x Lipat</div>
            <div class="blog-meta">10 Maret 2025 &bull; 6 menit baca</div>
          </div>
        </div>
        <div class="blog-card" onclick="showToast('Artikel sedang dalam pengembangan!')">
          <div class="blog-thumb">&#128231;</div>
          <div class="blog-body">
            <div class="blog-tag">Email Marketing</div>
            <div class="blog-title">Kenapa Email List Adalah Aset Terpenting Creator di 2025</div>
            <div class="blog-meta">5 Maret 2025 &bull; 10 menit baca</div>
          </div>
        </div>
        <div class="blog-card" onclick="showToast('Artikel sedang dalam pengembangan!')">
          <div class="blog-thumb">&#127774;</div>
          <div class="blog-body">
            <div class="blog-tag">Membership</div>
            <div class="blog-title">Panduan Lengkap Membuat Komunitas Berbayar yang Sukses</div>
            <div class="blog-meta">1 Maret 2025 &bull; 12 menit baca</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>


<!-- ===================== PAGE: HELP ===================== -->
<div class="page" id="page-help">
  <section class="section" style="padding-top:100px;">
    <div class="section-inner" style="max-width:860px;">
      <div class="section-header">
        <div class="section-label">Pusat Bantuan</div>
        <h2 class="section-title">Bagaimana kami bisa membantu?</h2>
        <p class="section-sub">Temukan jawaban atas pertanyaanmu di sini.</p>
      </div>
      <div style="margin-bottom:32px;">
        <input class="form-input" type="text" placeholder="&#128269; Cari pertanyaanmu..." style="font-size:16px; padding:14px 18px;" />
      </div>
      <div class="help-grid">
        <div class="help-card" onclick="showToast('Halaman bantuan sedang disiapkan!')">
          <div class="help-card-icon">&#128736;&#65039;</div>
          <div class="help-card-title">Pengaturan Akun</div>
          <div class="help-card-desc">Profil, keamanan, notifikasi, dan preferensi akun</div>
        </div>
        <div class="help-card" onclick="showToast('Halaman bantuan sedang disiapkan!')">
          <div class="help-card-icon">&#128184;</div>
          <div class="help-card-title">Pembayaran &amp; Withdrawal</div>
          <div class="help-card-desc">Cara menerima dan menarik saldo ke rekening</div>
        </div>
        <div class="help-card" onclick="showToast('Halaman bantuan sedang disiapkan!')">
          <div class="help-card-icon">&#128279;</div>
          <div class="help-card-title">Bio Link &amp; Halaman</div>
          <div class="help-card-desc">Cara kustomisasi dan mengelola link bio-mu</div>
        </div>
        <div class="help-card" onclick="showToast('Halaman bantuan sedang disiapkan!')">
          <div class="help-card-icon">&#128717;</div>
          <div class="help-card-title">Produk Digital</div>
          <div class="help-card-desc">Upload, harga, dan distribusi produk digitalmu</div>
        </div>
        <div class="help-card" onclick="showToast('Halaman bantuan sedang disiapkan!')">
          <div class="help-card-icon">&#128081;</div>
          <div class="help-card-title">Membership</div>
          <div class="help-card-desc">Membuat dan mengelola komunitas berbayar</div>
        </div>
        <div class="help-card" onclick="showToast('Halaman bantuan sedang disiapkan!')">
          <div class="help-card-icon">&#128202;</div>
          <div class="help-card-title">Analytics &amp; Laporan</div>
          <div class="help-card-desc">Memahami data pengunjung dan performa kontenmu</div>
        </div>
      </div>
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:var(--radius); padding:28px; text-align:center;">
        <div style="font-size:28px; margin-bottom:10px;">&#128172;</div>
        <div style="font-size:17px; font-weight:700; margin-bottom:8px;">Tidak menemukan jawaban?</div>
        <p style="font-size:14px; color:var(--text2); margin-bottom:16px;">Tim support kami siap membantu kamu melalui email atau chat</p>
        <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
          <a href="mailto:support@weiiz.ink" class="btn-primary">&#128231; Email Support</a>
          <button class="btn-ghost" onclick="toggleSupport()">&#128172; Live Chat</button>
        </div>
      </div>
    </div>
  </section>
</div>


<!-- ===================== PAGE: PRIVACY ===================== -->
<div class="page" id="page-privacy">
  <div class="inner-page">
    <div class="section-label">Legal</div>
    <h1>Kebijakan Privasi</h1>
    <p class="page-sub">Kami berkomitmen melindungi data dan privasi Anda.</p>
    <div class="last-updated">&#128197; Terakhir diperbarui: 1 Maret 2025</div>

    <h2>1. Data yang Kami Kumpulkan</h2>
    <p>Kami mengumpulkan informasi yang Anda berikan langsung kepada kami, termasuk nama, alamat email, username, dan informasi akun lainnya saat Anda mendaftar.</p>
    <p>Kami juga secara otomatis mengumpulkan informasi teknis seperti alamat IP, jenis browser, dan data penggunaan platform untuk meningkatkan layanan kami.</p>

    <h2>2. Penggunaan Data</h2>
    <p>Data Anda digunakan untuk:</p>
    <ul>
      <li>Menyediakan, memelihara, dan meningkatkan layanan Weiiz</li>
      <li>Memproses transaksi dan mengirimkan notifikasi terkait</li>
      <li>Mengirimkan informasi teknis dan pembaruan keamanan</li>
      <li>Merespons pertanyaan dan permintaan dukungan</li>
      <li>Menganalisis penggunaan platform untuk pengembangan fitur</li>
    </ul>

    <h2>3. Keamanan Data</h2>
    <p>Semua data dienkripsi menggunakan SSL 256-bit. Sistem pembayaran kami diproses melalui Midtrans yang telah bersertifikasi PCI DSS Level 1. Kami tidak pernah menjual data pribadi Anda kepada pihak ketiga.</p>

    <h2>4. Berbagi Data dengan Pihak Ketiga</h2>
    <p>Kami tidak menjual, memperdagangkan, atau mentransfer informasi pribadi Anda kepada pihak luar kecuali dalam konteks penyediaan layanan (misalnya, gateway pembayaran) atau jika diwajibkan oleh hukum.</p>

    <h2>5. Hak Anda</h2>
    <p>Anda berhak untuk mengakses, memperbaiki, atau menghapus data pribadi Anda kapan saja. Untuk mengajukan permintaan, hubungi kami di <a href="mailto:privacy@weiiz.ink" style="color:var(--accent)">privacy@weiiz.ink</a>.</p>

    <h2>6. Cookie</h2>
    <p>Kami menggunakan cookie untuk meningkatkan pengalaman pengguna, menganalisis traffic, dan personalisasi konten. Anda dapat menonaktifkan cookie melalui pengaturan browser Anda.</p>

    <h2>7. Perubahan Kebijakan</h2>
    <p>Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan signifikan akan diberitahukan melalui email atau notifikasi di platform.</p>

    <h2>8. Kontak</h2>
    <p>Pertanyaan seputar privasi: <a href="mailto:privacy@weiiz.ink" style="color:var(--accent)">privacy@weiiz.ink</a></p>
  </div>
</div>


<!-- ===================== PAGE: TERMS ===================== -->
<div class="page" id="page-terms">
  <div class="inner-page">
    <div class="section-label">Legal</div>
    <h1>Syarat &amp; Ketentuan</h1>
    <p class="page-sub">Harap baca syarat dan ketentuan ini sebelum menggunakan layanan Weiiz.</p>
    <div class="last-updated">&#128197; Terakhir diperbarui: 1 Maret 2025</div>

    <h2>1. Penerimaan Syarat</h2>
    <p>Dengan mengakses atau menggunakan platform Weiiz.ink, Anda menyetujui untuk terikat oleh syarat dan ketentuan ini. Jika Anda tidak setuju, mohon tidak menggunakan layanan kami.</p>

    <h2>2. Layanan</h2>
    <p>Weiiz menyediakan platform link-in-bio dan monetisasi digital untuk creator konten, termasuk namun tidak terbatas pada: halaman bio link, toko produk digital, sistem donasi, membership, dan analitik.</p>

    <h2>3. Akun Pengguna</h2>
    <p>Anda bertanggung jawab atas keamanan akun Anda. Weiiz tidak bertanggung jawab atas kerugian yang timbul akibat penggunaan akun Anda oleh pihak yang tidak berwenang.</p>
    <ul>
      <li>Anda harus berusia minimal 17 tahun untuk membuat akun</li>
      <li>Satu orang hanya boleh memiliki satu akun aktif</li>
      <li>Informasi akun harus akurat dan terkini</li>
    </ul>

    <h2>4. Konten yang Dilarang</h2>
    <p>Pengguna dilarang mengunggah atau mendistribusikan konten yang:</p>
    <ul>
      <li>Melanggar hak cipta atau hak kekayaan intelektual</li>
      <li>Mengandung pornografi atau konten eksplisit</li>
      <li>Menipu atau menyesatkan pembeli</li>
      <li>Melanggar hukum yang berlaku di Indonesia</li>
    </ul>

    <h2>5. Pembayaran dan Fee</h2>
    <p>Weiiz mengenakan biaya transaksi sesuai dengan paket yang dipilih (0.5%–5%). Pembayaran langganan diproses di muka. Tidak ada pengembalian dana kecuali terdapat kegagalan teknis dari pihak Weiiz.</p>

    <h2>6. Penonaktifan Akun</h2>
    <p>Weiiz berhak menonaktifkan akun yang melanggar syarat dan ketentuan ini tanpa pemberitahuan sebelumnya. Saldo yang tersisa akan dikembalikan sesuai prosedur yang berlaku.</p>

    <h2>7. Hukum yang Berlaku</h2>
    <p>Syarat dan ketentuan ini diatur oleh hukum Republik Indonesia. Sengketa diselesaikan melalui musyawarah, atau jika tidak tercapai kesepakatan, melalui Pengadilan Negeri Jakarta Pusat.</p>

    <h2>8. Kontak</h2>
    <p>Pertanyaan seputar syarat &amp; ketentuan: <a href="mailto:legal@weiiz.ink" style="color:var(--accent)">legal@weiiz.ink</a></p>
  </div>
</div>


<!-- ===================== PAGE: STATUS ===================== -->
<div class="page" id="page-status">
  <section class="section" style="padding-top:100px;">
    <div class="section-inner" style="max-width:720px;">
      <div class="section-header">
        <div class="section-label">Status Platform</div>
        <h2 class="section-title">Status Sistem Weiiz</h2>
      </div>
      <div class="status-overall">
        <div class="status-dot-lg"></div>
        <div>
          <div class="status-overall-text">Semua Sistem Berjalan Normal</div>
          <div style="font-size:13px; color:var(--text2); margin-top:2px;">Terakhir diperbarui: <span id="status-time"></span></div>
        </div>
      </div>
      <div class="status-list">
        <div class="status-row">
          <div class="status-service">&#127760; Website &amp; Dashboard</div>
          <span class="status-badge operational">Operational</span>
        </div>
        <div class="status-row">
          <div class="status-service">&#128184; Payment Gateway (Midtrans)</div>
          <span class="status-badge operational">Operational</span>
        </div>
        <div class="status-row">
          <div class="status-service">&#128230; File Upload &amp; CDN</div>
          <span class="status-badge operational">Operational</span>
        </div>
        <div class="status-row">
          <div class="status-service">&#128202; Analytics Engine</div>
          <span class="status-badge operational">Operational</span>
        </div>
        <div class="status-row">
          <div class="status-service">&#128231; Email Notifications</div>
          <span class="status-badge operational">Operational</span>
        </div>
        <div class="status-row">
          <div class="status-service">&#129302; AI Bio Generator</div>
          <span class="status-badge operational">Operational</span>
        </div>
        <div class="status-row">
          <div class="status-service">&#128279; Public Bio Pages</div>
          <span class="status-badge operational">Operational</span>
        </div>
        <div class="status-row">
          <div class="status-service">&#127380; Webhook &amp; API</div>
          <span class="status-badge operational">Operational</span>
        </div>
      </div>
      <div style="margin-top:28px; background:var(--bg2); border:1px solid var(--border); border-radius:var(--radius); padding:20px 24px;">
        <div style="font-size:15px; font-weight:700; margin-bottom:6px;">Uptime 30 Hari Terakhir</div>
        <div style="font-size:32px; font-weight:800; color:var(--green); font-family:'Syne',sans-serif;">99.98%</div>
        <div style="font-size:13px; color:var(--text2);">Berlangganan notifikasi: <a href="mailto:status@weiiz.ink" style="color:var(--accent)">status@weiiz.ink</a></div>
      </div>
    </div>
  </section>
</div>


<!-- ===================== PAGE: CAREERS ===================== -->
<div class="page" id="page-careers">
  <section class="section" style="padding-top:100px;">
    <div class="section-inner" style="max-width:800px;">
      <div class="section-header">
        <div class="section-label">Karir</div>
        <h2 class="section-title">Bergabung dengan tim Weiiz</h2>
        <p class="section-sub">Kami sedang membangun platform terbaik untuk creator Indonesia. Mau ikut?</p>
      </div>
      <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-bottom:48px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:var(--radius); padding:20px; text-align:center;">
          <div style="font-size:28px; margin-bottom:8px;">&#127968;</div>
          <div style="font-size:14px; font-weight:700;">Remote-first</div>
          <div style="font-size:13px; color:var(--text2);">Kerja dari mana saja</div>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:var(--radius); padding:20px; text-align:center;">
          <div style="font-size:28px; margin-bottom:8px;">&#128640;</div>
          <div style="font-size:14px; font-weight:700;">Growth Cepat</div>
          <div style="font-size:13px; color:var(--text2);">Startup yang berkembang pesat</div>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:var(--radius); padding:20px; text-align:center;">
          <div style="font-size:28px; margin-bottom:8px;">&#127873;</div>
          <div style="font-size:14px; font-weight:700;">Benefit Menarik</div>
          <div style="font-size:13px; color:var(--text2);">Gaji kompetitif + equity</div>
        </div>
      </div>
      <h3 style="font-size:20px; font-weight:700; margin-bottom:16px;">Posisi Terbuka</h3>
      <div class="job-list">
        <div class="job-card" onclick="showToast('Kirim CV ke career@weiiz.ink')">
          <div>
            <div class="job-title">Senior Frontend Engineer</div>
            <div class="job-meta"><span>&#128205; Remote</span><span>&#9201;&#65039; Full-time</span><span style="color:var(--green)">&#9679; Aktif</span></div>
          </div>
          <span class="job-tag">React / TypeScript</span>
        </div>
        <div class="job-card" onclick="showToast('Kirim CV ke career@weiiz.ink')">
          <div>
            <div class="job-title">Product Designer (UI/UX)</div>
            <div class="job-meta"><span>&#128205; Remote</span><span>&#9201;&#65039; Full-time</span><span style="color:var(--green)">&#9679; Aktif</span></div>
          </div>
          <span class="job-tag">Figma</span>
        </div>
        <div class="job-card" onclick="showToast('Kirim CV ke career@weiiz.ink')">
          <div>
            <div class="job-title">Creator Partnership Manager</div>
            <div class="job-meta"><span>&#128205; Jakarta / Remote</span><span>&#9201;&#65039; Full-time</span><span style="color:var(--green)">&#9679; Aktif</span></div>
          </div>
          <span class="job-tag">Marketing</span>
        </div>
        <div class="job-card" onclick="showToast('Kirim CV ke career@weiiz.ink')">
          <div>
            <div class="job-title">Customer Support Specialist</div>
            <div class="job-meta"><span>&#128205; Remote</span><span>&#9201;&#65039; Part-time</span><span style="color:var(--green)">&#9679; Aktif</span></div>
          </div>
          <span class="job-tag">Support</span>
        </div>
      </div>
      <div style="text-align:center; margin-top:32px; font-size:14px; color:var(--text2);">
        Tidak ada posisi yang cocok? Kirim CV terbaikmu ke <a href="mailto:career@weiiz.ink" style="color:var(--accent); font-weight:600;">career@weiiz.ink</a>
      </div>
    </div>
  </section>
</div>


<!-- ===================== PAGE: PRESS ===================== -->
<div class="page" id="page-press">
  <section class="section" style="padding-top:100px;">
    <div class="section-inner" style="max-width:800px;">
      <div class="section-header">
        <div class="section-label">Press Kit</div>
        <h2 class="section-title">Media &amp; Press</h2>
        <p class="section-sub">Semua yang kamu butuhkan untuk meliput Weiiz.</p>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:40px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:var(--radius); padding:28px;">
          <h3 style="font-size:16px; font-weight:700; margin-bottom:12px;">&#128194; Download Assets</h3>
          <div style="display:flex; flex-direction:column; gap:8px;">
            <button class="btn-ghost" style="justify-content:flex-start; gap:8px;" onclick="showToast('Logo pack sedang dipersiapkan')">&#128444;&#65039; Logo Pack (SVG, PNG)</button>
            <button class="btn-ghost" style="justify-content:flex-start; gap:8px;" onclick="showToast('Brand guidelines sedang dipersiapkan')">&#127912; Brand Guidelines (PDF)</button>
            <button class="btn-ghost" style="justify-content:flex-start; gap:8px;" onclick="showToast('Screenshot sedang dipersiapkan')">&#128247; Product Screenshots</button>
          </div>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:var(--radius); padding:28px;">
          <h3 style="font-size:16px; font-weight:700; margin-bottom:12px;">&#128222; Kontak Media</h3>
          <p style="font-size:14px; color:var(--text2); line-height:1.7;">Untuk wawancara, liputan, atau pertanyaan media:</p>
          <a href="mailto:press@weiiz.ink" style="display:block; margin-top:12px; color:var(--accent); font-weight:600; font-size:14px;">press@weiiz.ink</a>
          <div style="margin-top:8px; font-size:13px; color:var(--text2);">Respon dalam 24 jam kerja</div>
        </div>
      </div>
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:var(--radius); padding:28px;">
        <h3 style="font-size:18px; font-weight:700; margin-bottom:16px;">Fakta Kunci</h3>
        <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:16px;">
          <div><div style="font-size:24px; font-weight:800; color:var(--accent)">5.000+</div><div style="font-size:13px; color:var(--text2)">Creator aktif</div></div>
          <div><div style="font-size:24px; font-weight:800; color:var(--accent)">Rp2M+</div><div style="font-size:13px; color:var(--text2)">GMV terjual</div></div>
          <div><div style="font-size:24px; font-weight:800; color:var(--accent)">50.000+</div><div style="font-size:13px; color:var(--text2)">Transaksi/bulan</div></div>
          <div><div style="font-size:24px; font-weight:800; color:var(--accent)">2023</div><div style="font-size:13px; color:var(--text2)">Tahun berdiri</div></div>
        </div>
      </div>
    </div>
  </section>
</div>


<!-- ===================== FOOTER ===================== -->
<footer id="main-footer">
  <div class="footer-inner">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="#" class="nav-logo" onclick="navigate('home')">Weiiz<span>.ink</span></a>
        <p class="footer-desc">Platform monetisasi terlengkap untuk creator Indonesia. Satu link, semua penghasilan.</p>
        <div class="footer-socials">
          <a href="https://instagram.com/weiiz.ink" target="_blank" class="social-btn">IG</a>
          <a href="https://tiktok.com/@weiiz.ink" target="_blank" class="social-btn">TT</a>
          <a href="https://youtube.com/@weiizink" target="_blank" class="social-btn">YT</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Produk</h4>
        <a onclick="navigate('home'); scrollTo('#fitur')">Link in Bio</a>
        <a onclick="navigate('home'); scrollTo('#fitur')">Digital Store</a>
        <a onclick="navigate('home'); scrollTo('#fitur')">Donasi</a>
        <a onclick="navigate('home'); scrollTo('#fitur')">Membership</a>
        <a onclick="navigate('home'); scrollTo('#fitur')">Affiliate</a>
      </div>
      <div class="footer-col">
        <h4>Perusahaan</h4>
        <a onclick="navigate('about')">Tentang Kami</a>
        <a onclick="navigate('blog')">Blog</a>
        <a onclick="navigate('careers')">Karir</a>
        <a onclick="navigate('press')">Press Kit</a>
      </div>
      <div class="footer-col">
        <h4>Dukungan</h4>
        <a onclick="navigate('help')">Pusat Bantuan</a>
        <a href="mailto:support@weiiz.ink">Hubungi Kami</a>
        <a onclick="navigate('status')">Status Platform</a>
        <a onclick="navigate('privacy')">Kebijakan Privasi</a>
        <a onclick="navigate('terms')">Syarat &amp; Ketentuan</a>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-bottom-left">&copy; 2025 Weiiz.ink &bull; Dibuat dengan &#10084;&#65039; untuk creator Indonesia</div>
      <div class="footer-payments">
        <span style="font-size:12px; color:var(--text2); margin-right:4px;">Pembayaran via</span>
        <span class="payment-badge">Midtrans</span>
        <span class="payment-badge">QRIS</span>
        <span class="payment-badge">VA Bank</span>
        <span class="payment-badge">GoPay</span>
        <span class="payment-badge">OVO</span>
      </div>
    </div>
  </div>
</footer>


<!-- SUPPORT WIDGET -->
<div class="support-widget">
  <div class="support-bubble" id="supportBubble">
    <span class="support-close" onclick="closeSupport()">&#10005;</span>
    <div class="support-bubble-title">&#128075; Halo! Ada yang bisa dibantu?</div>
    <div class="support-bubble-sub">Tim support kami siap membantu kamu</div>
    <div class="support-options">
      <a href="mailto:support@weiiz.ink" class="support-option">&#128231; Email Support</a>
      <a href="https://wa.me/6281234567890" target="_blank" class="support-option">&#128241; WhatsApp Chat</a>
      <a href="#" class="support-option" onclick="navigate('help'); closeSupport()">&#128218; Pusat Bantuan</a>
      <a href="#" class="support-option" onclick="navigate('status'); closeSupport()">&#128202; Status Platform</a>
    </div>
  </div>
  <button class="support-btn" onclick="toggleSupport()" title="Butuh bantuan?">&#128172;</button>
</div>


<!-- DEMO MODAL -->
<div class="modal-overlay" id="demoModal" onclick="closeDemo(event)">
  <div class="modal">
    <div class="modal-header">
      <div class="modal-title">&#9654;&#65038; Demo Weiiz.ink</div>
      <button class="modal-close" onclick="closeModalDirect()">&times;</button>
    </div>
    <div class="modal-body">
      <div class="demo-video-wrap">
        <div class="demo-play" onclick="showToast('Video demo segera hadir! Daftar untuk early access.')">&#9654;</div>
        <div class="demo-label">Klik untuk memutar demo (2 menit)</div>
      </div>
      <div class="demo-features">
        <div class="demo-feature">
          <div class="demo-feature-icon">&#128279;</div>
          <div class="demo-feature-text">Bio Link Setup</div>
        </div>
        <div class="demo-feature">
          <div class="demo-feature-icon">&#128717;</div>
          <div class="demo-feature-text">Jual Produk Digital</div>
        </div>
        <div class="demo-feature">
          <div class="demo-feature-icon">&#128202;</div>
          <div class="demo-feature-text">Analytics Real-time</div>
        </div>
      </div>
      <div style="text-align:center; margin-top:20px;">
        <a href="#" class="btn-primary" onclick="navigate('register'); closeModalDirect()">Coba Langsung &mdash; Gratis &rarr;</a>
      </div>
    </div>
  </div>
</div>


<!-- TOAST -->
<div class="toast" id="toast"></div>


<script>
// ===================== ROUTING =====================
const pages = ['home','login','register','about','blog','help','privacy','terms','status','careers','press','contact'];
const pagesWithFooter = ['home','about','blog','help','privacy','terms','status','careers','press'];
const pagesWithNav = true;

function navigate(page) {
  // hide all
  pages.forEach(p => {
    const el = document.getElementById('page-' + p);
    if (el) el.classList.remove('active');
  });
  // show target
  const target = document.getElementById('page-' + page);
  if (target) {
    target.classList.add('active');
  } else if (page === 'contact') {
    showToast('Halaman kontak segera hadir! Hubungi kami di support@weiiz.ink');
    document.getElementById('page-home').classList.add('active');
    return;
  } else {
    document.getElementById('page-home').classList.add('active');
  }
  // footer visibility
  const footer = document.getElementById('main-footer');
  const authPages = ['login','register'];
  footer.style.display = authPages.includes(page) ? 'none' : 'block';
  // scroll top
  window.scrollTo(0,0);
  // update URL hash
  window.location.hash = page === 'home' ? '' : page;
}

function scrollTo(id) {
  setTimeout(() => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

// Handle hash routing on load
window.addEventListener('load', () => {
  const hash = window.location.hash.replace('#','');
  if (hash && pages.includes(hash)) navigate(hash);
  initDashChart();
  initStatusTime();
});

window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#','');
  if (hash && pages.includes(hash)) navigate(hash);
});

// ===================== MOBILE NAV =====================
function toggleMobileNav() {
  document.getElementById('mobileNav').classList.toggle('open');
}
function closeMobileNav() {
  document.getElementById('mobileNav').classList.remove('open');
}

// ===================== FAQ =====================
function toggleFaq(btn) {
  const item = btn.parentElement;
  item.classList.toggle('open');
}

// ===================== PRICING TOGGLE =====================
let isAnnual = false;
const prices = { creator: [39000, 29000], pro: [99000, 74000], business: [249000, 187000] };

function togglePricing() {
  isAnnual = !isAnnual;
  const toggle = document.getElementById('pricingToggle');
  const monthly = document.getElementById('toggle-monthly');
  const annual = document.getElementById('toggle-annual');
  const badge = document.getElementById('annualBadge');
  toggle.classList.toggle('on', isAnnual);
  monthly.style.color = isAnnual ? 'var(--text2)' : 'var(--text)';
  annual.style.color = isAnnual ? 'var(--text)' : 'var(--text2)';
  badge.style.opacity = isAnnual ? '1' : '0.4';
  const fmt = n => 'Rp' + n.toLocaleString('id-ID');
  document.getElementById('price-creator').textContent = fmt(prices.creator[isAnnual?1:0]);
  document.getElementById('price-pro').textContent = fmt(prices.pro[isAnnual?1:0]);
  document.getElementById('price-business').textContent = fmt(prices.business[isAnnual?1:0]);
}

// ===================== AUTH FORMS =====================
function handleLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-password').value;
  const errEl = document.getElementById('login-error');
  if (!email || !pass) {
    errEl.textContent = 'Email dan password tidak boleh kosong.';
    errEl.style.display = 'block'; return;
  }
  if (!email.includes('@')) {
    errEl.textContent = 'Format email tidak valid.';
    errEl.style.display = 'block'; return;
  }
  errEl.style.display = 'none';
  const btn = event.target;
  btn.textContent = 'Memproses...'; btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Masuk ke Akun'; btn.disabled = false;
    showToast('Login berhasil! Selamat datang kembali 👋', 'success');
  }, 1500);
}

function handleRegister() {
  const name = document.getElementById('reg-name').value.trim();
  const username = document.getElementById('reg-username').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass = document.getElementById('reg-password').value;
  const terms = document.getElementById('reg-terms').checked;
  const errEl = document.getElementById('register-error');
  if (!name || !username || !email || !pass) {
    errEl.textContent = 'Semua field wajib diisi.'; errEl.style.display='block'; return;
  }
  if (!email.includes('@')) {
    errEl.textContent = 'Format email tidak valid.'; errEl.style.display='block'; return;
  }
  if (pass.length < 8) {
    errEl.textContent = 'Password minimal 8 karakter.'; errEl.style.display='block'; return;
  }
  if (!terms) {
    errEl.textContent = 'Kamu harus menyetujui Terms of Service.'; errEl.style.display='block'; return;
  }
  errEl.style.display = 'none';
  const btn = event.target;
  btn.textContent = 'Membuat akun...'; btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Buat Akun Gratis'; btn.disabled = false;
    showToast('Akun berhasil dibuat! Cek email untuk verifikasi ✉️', 'success');
  }, 1800);
}

function handleGoogleAuth() {
  showToast('Menghubungkan dengan Google...', 'success');
  setTimeout(() => showToast('Login Google berhasil! 🎉', 'success'), 1500);
}

function showForgotToast() {
  showToast('Link reset password dikirim ke email kamu! 📧', 'success');
}

function togglePassword(id, btn) {
  const input = document.getElementById(id);
  if (input.type === 'password') { input.type = 'text'; btn.textContent = '🙈'; }
  else { input.type = 'password'; btn.textContent = '👁'; }
}

function checkUsername(input) {
  const val = input.value;
  const hint = document.getElementById('username-hint');
  if (!val) { hint.style.color = 'var(--text2)'; hint.textContent = 'Huruf kecil, angka, dan underscore (_)'; return; }
  const valid = /^[a-z0-9_]+$/.test(val);
  hint.style.color = valid ? 'var(--green)' : '#ef4444';
  hint.textContent = valid ? '✓ Username tersedia!' : '✗ Hanya huruf kecil, angka, dan underscore';
}

function checkPasswordStrength(input) {
  const val = input.value;
  const el = document.getElementById('password-strength');
  if (!val) { el.textContent = ''; return; }
  let strength = 0;
  if (val.length >= 8) strength++;
  if (/[A-Z]/.test(val)) strength++;
  if (/[0-9]/.test(val)) strength++;
  if (/[^A-Za-z0-9]/.test(val)) strength++;
  const levels = ['','Lemah','Cukup','Kuat','Sangat Kuat'];
  const colors = ['','#ef4444','#fbbf24','var(--accent)','var(--green)'];
  el.style.color = colors[strength];
  el.textContent = strength ? 'Kekuatan: ' + levels[strength] : '';
}

// ===================== TOAST =====================
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.className = 'toast ' + type;
  t.innerHTML = (type === 'success' ? '✓ ' : '') + msg;
  t.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => t.classList.remove('show'), 3500);
}

// ===================== DEMO MODAL =====================
function openDemo() {
  document.getElementById('demoModal').classList.add('open');
}
function closeDemo(e) {
  if (e.target === document.getElementById('demoModal')) closeModalDirect();
}
function closeModalDirect() {
  document.getElementById('demoModal').classList.remove('open');
}

// ===================== SUPPORT WIDGET =====================
function toggleSupport() {
  document.getElementById('supportBubble').classList.toggle('open');
}
function closeSupport() {
  document.getElementById('supportBubble').classList.remove('open');
}

// ===================== DASHBOARD CHART =====================
function initDashChart() {
  const chart = document.getElementById('dashChart');
  if (!chart) return;
  const vals = [45, 78, 52, 91, 67, 110, 88];
  const max = Math.max(...vals);
  chart.innerHTML = vals.map((v,i) =>
    `<div class="chart-bar" style="height:${Math.round(v/max*100)}%; opacity:${0.4 + (i/vals.length)*0.6}"></div>`
  ).join('');
}

// ===================== STATUS TIME =====================
function initStatusTime() {
  const el = document.getElementById('status-time');
  if (el) {
    const now = new Date();
    el.textContent = now.toLocaleString('id-ID', { dateStyle:'medium', timeStyle:'short' });
  }
}

// ===================== KEYBOARD SHORTCUTS =====================
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModalDirect();
    closeSupport();
  }
});
</script>

</body>
</html>
