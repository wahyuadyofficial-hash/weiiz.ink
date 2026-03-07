"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#09090F]/90 backdrop-blur-xl border-b border-white/5" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center shadow-lg shadow-purple-500/30">
            <span className="text-white font-black text-sm">W</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">Weiiz</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {[["Fitur", "#fitur"], ["Harga", "#harga"], ["Blog", "#"], ["Bantuan", "#"]].map(([label, href]) => (
            <Link key={label} href={href} className="text-white/50 hover:text-white text-sm font-medium transition-colors duration-200">{label}</Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden md:block text-white/60 hover:text-white text-sm font-medium transition-colors">Masuk</Link>
          <Link href="/register" className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/25">Mulai Gratis</Link>
        </div>
      </div>
    </nav>
  );
}