"use client";

import { useState } from "react";
import {
  Globe,
  Instagram,
  Twitter,
  Youtube,
  ShoppingBag,
  ExternalLink,
  Share2,
  Check,
  Heart,
  Download,
  Tag,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────
interface Link {
  id: string;
  title: string;
  url: string;
  icon?: string;
  type: string;
  isActive: boolean;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  coverImage?: string;
  category: string;
  salesCount: number;
}

interface User {
  id: string;
  username: string;
  name?: string;
  bio?: string;
  avatarUrl?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  website?: string;
  links: Link[];
  products: Product[];
}

// ─── Helpers ──────────────────────────────────────────────
function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n);
}

function getDiscountPct(price: number, original: number) {
  return Math.round(((original - price) / original) * 100);
}

// ─── Link Button ──────────────────────────────────────────
function LinkButton({ link, username }: { link: Link; username: string }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = async () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 1500);
    // Track click
    try {
      await fetch(`/api/links/${link.id}/click`, { method: "POST" });
    } catch { /* silent */ }
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`group relative flex items-center justify-between w-full px-5 py-4 rounded-2xl border transition-all duration-200 font-medium text-sm
        ${clicked
          ? "border-emerald-300 bg-emerald-50 text-emerald-700"
          : "border-gray-200 bg-white hover:border-indigo-200 hover:bg-indigo-50 hover:shadow-sm text-gray-800"
        }`}
    >
      <div className="flex items-center gap-3">
        {link.icon ? (
          <span className="text-lg leading-none">{link.icon}</span>
        ) : (
          <div className="w-7 h-7 rounded-lg bg-gray-100 group-hover:bg-indigo-100 flex items-center justify-center transition">
            <Globe size={14} className="text-gray-400 group-hover:text-indigo-500 transition" />
          </div>
        )}
        <span>{link.title}</span>
      </div>
      {clicked ? (
        <Check size={15} className="text-emerald-500" />
      ) : (
        <ExternalLink size={14} className="text-gray-300 group-hover:text-indigo-400 transition" />
      )}
    </a>
  );
}

// ─── Product Card ─────────────────────────────────────────
function ProductCard({ product, username }: { product: Product; username: string }) {
  const [buying, setBuying] = useState(false);

  const handleBuy = async () => {
    setBuying(true);
    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, sellerUsername: username }),
      });
      const data = await res.json();
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    } catch {
      alert("Terjadi kesalahan, coba lagi.");
    } finally {
      setBuying(false);
    }
  };

  const discountPct =
    product.originalPrice && product.originalPrice > product.price
      ? getDiscountPct(product.price, product.originalPrice)
      : 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
      {/* Cover */}
      <div className="relative h-36 bg-gradient-to-br from-indigo-50 to-purple-50">
        {product.coverImage ? (
          <img src={product.coverImage} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag size={32} className="text-indigo-200" />
          </div>
        )}
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="bg-white/90 backdrop-blur text-xs font-medium text-gray-600 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Tag size={10} />
            {product.category}
          </span>
          {discountPct > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              -{discountPct}%
            </span>
          )}
        </div>
        {product.salesCount > 0 && (
          <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-xs text-gray-500 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Download size={10} />
            {product.salesCount}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-1">{product.name}</h3>
        {product.description && (
          <p className="text-xs text-gray-400 mt-1 line-clamp-2">{product.description}</p>
        )}
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-indigo-600 font-bold text-base">{formatRupiah(product.price)}</span>
            {discountPct > 0 && (
              <span className="text-gray-300 text-xs line-through ml-2">
                {formatRupiah(product.originalPrice!)}
              </span>
            )}
          </div>
          <button
            onClick={handleBuy}
            disabled={buying}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition disabled:opacity-60"
          >
            {buying ? "..." : "Beli"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Social Icon ──────────────────────────────────────────
function SocialLink({
  href,
  icon: Icon,
  label,
  color,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  color: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`w-10 h-10 rounded-xl flex items-center justify-center border border-gray-200 hover:border-transparent transition-all hover:shadow-sm ${color}`}
    >
      <Icon size={16} />
    </a>
  );
}

// ─── Main Client Component ────────────────────────────────
export default function PublicProfileClient({ user }: { user: User }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `https://weiiz.ink/${user.username}`;
    try {
      await navigator.share({ title: user.name || user.username, url });
    } catch {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const hasProducts = user.products.length > 0;
  const hasLinks = user.links.length > 0;
  const hasSocial = user.instagram || user.twitter || user.youtube || user.website;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/50 via-white to-white">
      <div className="max-w-md mx-auto px-4 py-10">

        {/* Profile Header */}
        <div className="text-center mb-8">
          {/* Avatar */}
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-200 to-purple-200 mx-auto ring-4 ring-white shadow-lg">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name || user.username} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-white">
                  {(user.name || user.username).charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* Name & Username */}
          <h1 className="text-xl font-bold text-gray-900">
            {user.name || user.username}
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">@{user.username}</p>

          {/* Bio */}
          {user.bio && (
            <p className="text-sm text-gray-600 mt-3 leading-relaxed max-w-xs mx-auto">
              {user.bio}
            </p>
          )}

          {/* Social Links */}
          {hasSocial && (
            <div className="flex items-center justify-center gap-2 mt-4">
              {user.instagram && (
                <SocialLink href={`https://instagram.com/${user.instagram}`} icon={Instagram} label="Instagram" color="hover:bg-pink-50 hover:text-pink-600 text-gray-500" />
              )}
              {user.twitter && (
                <SocialLink href={`https://twitter.com/${user.twitter}`} icon={Twitter} label="Twitter" color="hover:bg-sky-50 hover:text-sky-500 text-gray-500" />
              )}
              {user.youtube && (
                <SocialLink href={`https://youtube.com/@${user.youtube}`} icon={Youtube} label="YouTube" color="hover:bg-red-50 hover:text-red-600 text-gray-500" />
              )}
              {user.website && (
                <SocialLink href={user.website} icon={Globe} label="Website" color="hover:bg-indigo-50 hover:text-indigo-600 text-gray-500" />
              )}
            </div>
          )}

          {/* Share button */}
          <button
            onClick={handleShare}
            className="mt-4 inline-flex items-center gap-2 text-xs text-gray-400 hover:text-indigo-600 transition border border-gray-200 hover:border-indigo-200 px-3 py-1.5 rounded-full"
          >
            {copied ? <Check size={12} className="text-emerald-500" /> : <Share2 size={12} />}
            {copied ? "Link disalin!" : "Bagikan profil"}
          </button>
        </div>

        {/* Links Section */}
        {hasLinks && (
          <div className="mb-8">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 text-center">
              Link
            </p>
            <div className="space-y-2.5">
              {user.links.map((link) => (
                <LinkButton key={link.id} link={link} username={user.username} />
              ))}
            </div>
          </div>
        )}

        {/* Products Section */}
        {hasProducts && (
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Produk Digital
              </p>
              <span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {user.products.length}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user.products.map((product) => (
                <ProductCard key={product.id} product={product} username={user.username} />
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!hasLinks && !hasProducts && (
          <div className="text-center py-16 text-gray-300">
            <Heart size={40} className="mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-400">Belum ada konten</p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-10 pt-6 border-t border-gray-100">
          <a
            href="https://weiiz.ink"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-indigo-500 transition"
          >
            Dibuat dengan{" "}
            <Heart size={11} className="text-red-400 fill-red-400" />
            <span className="font-semibold">weiiz.ink</span>
          </a>
        </div>
      </div>
    </div>
  );
}
