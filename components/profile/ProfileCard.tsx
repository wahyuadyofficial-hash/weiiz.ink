"use client";

import { useRef, useState } from "react";
import {
  Camera,
  User,
  Globe,
  Instagram,
  Twitter,
  Youtube,
  Link2,
  TrendingUp,
  Package,
  DollarSign,
  Eye,
  Edit2,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────
export interface ProfileData {
  username: string;
  name?: string;
  bio?: string;
  avatarUrl?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  website?: string;
}

export interface ProfileStats {
  totalViews: number;
  totalRevenue: number;
  totalProducts: number;
  totalLinks: number;
  totalSales: number;
}

// ═══════════════════════════════════════════════════════════
// 1. AvatarUpload
// ═══════════════════════════════════════════════════════════
export function AvatarUpload({
  currentUrl,
  name,
  size = "lg",
  onFileSelect,
}: {
  currentUrl?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
  onFileSelect: (file: File) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(currentUrl || "");

  const sizeMap = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };
  const btnMap = {
    sm: "w-5 h-5 -bottom-0.5 -right-0.5",
    md: "w-6 h-6 -bottom-1 -right-1",
    lg: "w-8 h-8 -bottom-1.5 -right-1.5",
  };
  const iconMap = { sm: 10, md: 12, lg: 16 };
  const textMap = { sm: "text-sm", md: "text-lg", lg: "text-2xl" };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setPreview(url);
    onFileSelect(f);
  };

  return (
    <div className="relative inline-block cursor-pointer group" onClick={() => fileRef.current?.click()}>
      <div className={`${sizeMap[size]} rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-200 to-purple-200 flex items-center justify-center ring-4 ring-white shadow-md`}>
        {preview ? (
          <img src={preview} alt={name || "avatar"} className="w-full h-full object-cover" />
        ) : (
          <span className={`font-bold text-white ${textMap[size]}`}>
            {name ? name.charAt(0).toUpperCase() : <User size={iconMap[size] * 1.5} className="text-white/70" />}
          </span>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <Camera size={iconMap[size]} className="text-white" />
        </div>
      </div>
      {/* Camera button */}
      <div className={`absolute ${btnMap[size]} bg-indigo-600 rounded-full flex items-center justify-center shadow-md border-2 border-white`}>
        <Camera size={iconMap[size] - 2} className="text-white" />
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 2. ProfileCard — preview kartu publik
// ═══════════════════════════════════════════════════════════
export function ProfileCard({ profile }: { profile: ProfileData }) {
  const [copied, setCopied] = useState(false);
  const url = `https://weiiz.ink/${profile.username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    { key: "instagram", href: `https://instagram.com/${profile.instagram}`, icon: Instagram, color: "text-pink-500" },
    { key: "twitter", href: `https://twitter.com/${profile.twitter}`, icon: Twitter, color: "text-sky-500" },
    { key: "youtube", href: `https://youtube.com/@${profile.youtube}`, icon: Youtube, color: "text-red-500" },
    { key: "website", href: profile.website || "", icon: Globe, color: "text-gray-500" },
  ].filter((s) => profile[s.key as keyof ProfileData]);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Cover gradient */}
      <div className="h-20 bg-gradient-to-br from-indigo-400 to-purple-500" />

      <div className="px-5 pb-5">
        {/* Avatar */}
        <div className="relative -mt-10 mb-3">
          <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-white shadow-md bg-gradient-to-br from-indigo-200 to-purple-200 flex items-center justify-center">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-bold text-white">
                {(profile.name || profile.username).charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-gray-900 text-base">{profile.name || profile.username}</h3>
            <p className="text-sm text-gray-400">@{profile.username}</p>
            {profile.bio && (
              <p className="text-xs text-gray-500 mt-2 leading-relaxed max-w-xs line-clamp-2">{profile.bio}</p>
            )}
          </div>
          <a
            href={`/${profile.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:border-indigo-200 transition"
          >
            <ExternalLink size={15} />
          </a>
        </div>

        {/* Socials */}
        {socials.length > 0 && (
          <div className="flex gap-2 mt-3">
            {socials.map(({ key, href, icon: Icon, color }) => (
              <a key={key} href={href} target="_blank" rel="noopener noreferrer"
                className={`w-8 h-8 rounded-lg border border-gray-100 flex items-center justify-center hover:border-gray-200 transition ${color}`}>
                <Icon size={14} />
              </a>
            ))}
          </div>
        )}

        {/* Share Link */}
        <div className="mt-4 flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5">
          <Link2 size={14} className="text-gray-400 shrink-0" />
          <span className="text-xs text-gray-500 flex-1 truncate">{url}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-medium shrink-0 transition"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Disalin!" : "Salin"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 3. SocialLinksForm — input sosial media
// ═══════════════════════════════════════════════════════════
export function SocialLinksForm({
  values,
  onChange,
}: {
  values: { instagram?: string; twitter?: string; youtube?: string; website?: string };
  onChange: (key: string, value: string) => void;
}) {
  const fields = [
    {
      key: "instagram",
      label: "Instagram",
      icon: Instagram,
      color: "text-pink-500",
      placeholder: "username (tanpa @)",
      prefix: "instagram.com/",
    },
    {
      key: "twitter",
      label: "Twitter / X",
      icon: Twitter,
      color: "text-sky-500",
      placeholder: "username (tanpa @)",
      prefix: "twitter.com/",
    },
    {
      key: "youtube",
      label: "YouTube",
      icon: Youtube,
      color: "text-red-500",
      placeholder: "nama channel",
      prefix: "youtube.com/@",
    },
    {
      key: "website",
      label: "Website",
      icon: Globe,
      color: "text-gray-500",
      placeholder: "https://website.com",
      prefix: "",
    },
  ];

  return (
    <div className="space-y-4">
      {fields.map(({ key, label, icon: Icon, color, placeholder, prefix }) => (
        <div key={key}>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1.5">
            <Icon size={13} className={color} /> {label}
          </label>
          <div className="relative flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-300 transition bg-white">
            {prefix && (
              <span className="pl-3 text-xs text-gray-300 shrink-0 select-none">{prefix}</span>
            )}
            <input
              value={values[key as keyof typeof values] || ""}
              onChange={(e) => onChange(key, e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-3 py-2.5 text-sm focus:outline-none"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 4. ProfileStats — kartu statistik profil
// ═══════════════════════════════════════════════════════════
export function ProfileStatsCard({ stats }: { stats: ProfileStats }) {
  function formatRupiah(n: number) {
    if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(1)}jt`;
    if (n >= 1_000) return `Rp ${(n / 1_000).toFixed(0)}rb`;
    return `Rp ${n}`;
  }

  const items = [
    { label: "Total Kunjungan", value: stats.totalViews.toLocaleString("id-ID"), icon: Eye, color: "text-indigo-600 bg-indigo-50" },
    { label: "Revenue", value: formatRupiah(stats.totalRevenue), icon: DollarSign, color: "text-emerald-600 bg-emerald-50" },
    { label: "Produk Aktif", value: stats.totalProducts, icon: Package, color: "text-amber-600 bg-amber-50" },
    { label: "Penjualan", value: stats.totalSales, icon: TrendingUp, color: "text-purple-600 bg-purple-50" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2.5 ${color}`}>
            <Icon size={16} />
          </div>
          <p className="font-bold text-gray-900 text-base">{value}</p>
          <p className="text-xs text-gray-400 mt-0.5">{label}</p>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 5. ProfileEditButton — tombol shortcut ke settings
// ═══════════════════════════════════════════════════════════
export function ProfileEditButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium transition shadow-sm"
    >
      <Edit2 size={14} />
      Edit Profil
    </button>
  );
}

// ═══════════════════════════════════════════════════════════
// 6. ProfileHeader — combined header (avatar + nama + bio + stats)
// ═══════════════════════════════════════════════════════════
export function ProfileHeader({
  profile,
  stats,
  onAvatarSelect,
  onEdit,
}: {
  profile: ProfileData;
  stats?: ProfileStats;
  onAvatarSelect?: (file: File) => void;
  onEdit?: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          {onAvatarSelect ? (
            <AvatarUpload
              currentUrl={profile.avatarUrl}
              name={profile.name || profile.username}
              size="lg"
              onFileSelect={onAvatarSelect}
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-200 to-purple-200 flex items-center justify-center">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl font-bold text-white">{(profile.name || profile.username).charAt(0).toUpperCase()}</span>
              )}
            </div>
          )}
          <div>
            <h2 className="font-bold text-gray-900 text-lg">{profile.name || profile.username}</h2>
            <p className="text-sm text-gray-400">@{profile.username}</p>
            {profile.bio && (
              <p className="text-xs text-gray-500 mt-1 leading-relaxed max-w-sm">{profile.bio}</p>
            )}
          </div>
        </div>
        {onEdit && <ProfileEditButton onClick={onEdit} />}
      </div>

      {stats && (
        <div className="grid grid-cols-4 gap-3 pt-4 border-t border-gray-50">
          {[
            { label: "Kunjungan", value: stats.totalViews.toLocaleString("id-ID") },
            { label: "Produk", value: stats.totalProducts },
            { label: "Penjualan", value: stats.totalSales },
            { label: "Link", value: stats.totalLinks },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="font-bold text-gray-900 text-base">{value}</p>
              <p className="text-xs text-gray-400">{label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
