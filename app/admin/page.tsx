"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Wallet,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ArrowRight,
  Activity,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Shield,
} from "lucide-react";

interface AdminStats {
  totalUsers: number;
  newUsersToday: number;
  totalRevenue: number;
  revenueToday: number;
  totalWithdrawals: number;
  pendingWithdrawals: number;
  pendingWithdrawalAmount: number;
  totalProducts: number;
  totalSales: number;
  totalPageViews: number;
}

interface RecentWithdrawal {
  id: string;
  userName: string;
  userUsername: string;
  amount: number;
  bankName: string;
  bankAccount: string;
  status: "pending" | "processed" | "rejected";
  createdAt: string;
}

interface RecentUser {
  id: string;
  name: string;
  username: string;
  email: string;
  createdAt: string;
  productsCount: number;
  totalRevenue: number;
}

function formatRupiah(n: number) {
  if (n >= 1_000_000_000) return `Rp ${(n / 1_000_000_000).toFixed(1)}M`;
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(1)}jt`;
  if (n >= 1_000) return `Rp ${(n / 1_000).toFixed(0)}rb`;
  return `Rp ${n}`;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m lalu`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}j lalu`;
  return `${Math.floor(hours / 24)}h lalu`;
}

function StatCard({ label, value, sub, icon: Icon, color, href }: {
  label: string; value: string | number; sub?: string;
  icon: React.ElementType; color: string; href?: string;
}) {
  const content = (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all ${href ? "cursor-pointer" : ""}`}>
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={20} />
        </div>
        {href && <ArrowUpRight size={15} className="text-gray-300" />}
      </div>
      <p className="text-2xl font-bold text-gray-900 mt-3">{value}</p>
      <p className="text-xs text-gray-400 mt-0.5">{label}</p>
      {sub && <p className="text-xs font-medium text-emerald-600 mt-1">{sub}</p>}
    </div>
  );
  return href ? <Link href={href}>{content}</Link> : content;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentWithdrawals, setRecentWithdrawals] = useState<RecentWithdrawal[]>([]);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [statsRes, wdRes, usersRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/withdrawals?status=pending&limit=5"),
        fetch("/api/admin/users?limit=5&sort=newest"),
      ]);
      const [s, w, u] = await Promise.all([statsRes.json(), wdRes.json(), usersRes.json()]);
      setStats(s);
      setRecentWithdrawals(w.withdrawals || []);
      setRecentUsers(u.users || []);
    } catch {
      // fallback demo
      setStats({
        totalUsers: 248, newUsersToday: 12, totalRevenue: 18_500_000,
        revenueToday: 450_000, totalWithdrawals: 87, pendingWithdrawals: 6,
        pendingWithdrawalAmount: 2_350_000, totalProducts: 134, totalSales: 412,
        totalPageViews: 14_280,
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-indigo-400 mx-auto mb-3" size={32} />
          <p className="text-gray-400 text-sm">Memuat data admin…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <Shield size={20} className="text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-400 text-sm">Monitoring & manajemen platform weiiz.ink</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/users"
              className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition">
              <Users size={15} /> Kelola User
            </Link>
            <Link href="/admin/withdrawals"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition">
              <Wallet size={15} />
              Penarikan
              {stats?.pendingWithdrawals ? (
                <span className="bg-white text-red-600 text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                  {stats.pendingWithdrawals}
                </span>
              ) : null}
            </Link>
          </div>
        </div>

        {/* Alert if pending withdrawals */}
        {stats && stats.pendingWithdrawals > 0 && (
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle size={18} className="text-amber-500 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-800">
                  {stats.pendingWithdrawals} permintaan penarikan menunggu persetujuan
                </p>
                <p className="text-xs text-amber-600">
                  Total {formatRupiah(stats.pendingWithdrawalAmount)} perlu dicairkan
                </p>
              </div>
            </div>
            <Link href="/admin/withdrawals"
              className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-900 transition">
              Proses sekarang <ArrowRight size={13} />
            </Link>
          </div>
        )}

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard label="Total User" value={stats.totalUsers.toLocaleString("id-ID")}
              sub={`+${stats.newUsersToday} hari ini`}
              icon={Users} color="text-indigo-600 bg-indigo-50" href="/admin/users" />
            <StatCard label="Total Revenue" value={formatRupiah(stats.totalRevenue)}
              sub={`+${formatRupiah(stats.revenueToday)} hari ini`}
              icon={DollarSign} color="text-emerald-600 bg-emerald-50" />
            <StatCard label="Total Produk" value={stats.totalProducts.toLocaleString("id-ID")}
              sub={`${stats.totalSales} terjual`}
              icon={ShoppingBag} color="text-purple-600 bg-purple-50" />
            <StatCard label="Penarikan Pending" value={stats.pendingWithdrawals}
              sub={stats.pendingWithdrawals > 0 ? `${formatRupiah(stats.pendingWithdrawalAmount)} menunggu` : "Semua clear ✓"}
              icon={Wallet} color="text-amber-600 bg-amber-50" href="/admin/withdrawals" />
            <StatCard label="Total Penjualan" value={stats.totalSales.toLocaleString("id-ID")}
              icon={TrendingUp} color="text-rose-600 bg-rose-50" />
            <StatCard label="Total Penarikan" value={stats.totalWithdrawals}
              icon={CheckCircle} color="text-teal-600 bg-teal-50" />
            <StatCard label="Page Views" value={stats.totalPageViews.toLocaleString("id-ID")}
              icon={Eye} color="text-sky-600 bg-sky-50" />
            <StatCard label="Platform Activity" value="Live"
              icon={Activity} color="text-green-600 bg-green-50" />
          </div>
        )}

        {/* Two column: Withdrawals + Recent Users */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Pending Withdrawals */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
              <h2 className="font-semibold text-gray-900 text-sm">Penarikan Terbaru</h2>
              <Link href="/admin/withdrawals" className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
                Lihat semua <ArrowRight size={12} />
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {recentWithdrawals.length === 0 ? (
                <div className="py-10 text-center text-gray-300">
                  <Wallet size={28} className="mx-auto mb-2" />
                  <p className="text-xs">Tidak ada penarikan pending</p>
                </div>
              ) : recentWithdrawals.map((w) => (
                <div key={w.id} className="flex items-center gap-3 px-6 py-3.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-xs font-bold text-indigo-600 shrink-0">
                    {(w.userName || w.userUsername).charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">{w.userName || w.userUsername}</p>
                    <p className="text-[10px] text-gray-400">{w.bankName} • {w.bankAccount}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-gray-900">{formatRupiah(w.amount)}</p>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                      w.status === "pending" ? "bg-amber-50 text-amber-600"
                        : w.status === "processed" ? "bg-emerald-50 text-emerald-600"
                        : "bg-red-50 text-red-600"
                    }`}>
                      {w.status === "pending" ? "Pending" : w.status === "processed" ? "Cair" : "Ditolak"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Users */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
              <h2 className="font-semibold text-gray-900 text-sm">User Terbaru</h2>
              <Link href="/admin/users" className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
                Lihat semua <ArrowRight size={12} />
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {recentUsers.length === 0 ? (
                <div className="py-10 text-center text-gray-300">
                  <Users size={28} className="mx-auto mb-2" />
                  <p className="text-xs">Belum ada user</p>
                </div>
              ) : recentUsers.map((u) => (
                <div key={u.id} className="flex items-center gap-3 px-6 py-3.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-xs font-bold text-indigo-600 shrink-0">
                    {(u.name || u.username).charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">{u.name || u.username}</p>
                    <p className="text-[10px] text-gray-400">@{u.username} • {timeAgo(u.createdAt)}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-medium text-gray-700">{u.productsCount} produk</p>
                    <p className="text-[10px] text-gray-400">{formatRupiah(u.totalRevenue)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
