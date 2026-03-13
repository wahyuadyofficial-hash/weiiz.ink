"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Ban,
  CheckCircle,
  Trash2,
  Eye,
  Mail,
  ChevronLeft,
  ChevronRight,
  Download,
  UserCheck,
  UserX,
  DollarSign,
  ShoppingBag,
  X,
  AlertCircle,
  Check,
  Loader2,
  Crown,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────
interface AdminUser {
  id: string;
  username: string;
  name: string;
  email: string;
  avatarUrl?: string;
  isActive: boolean;
  isVerified: boolean;
  role: "user" | "admin";
  balance: number;
  totalRevenue: number;
  totalProducts: number;
  totalSales: number;
  createdAt: string;
  lastLoginAt?: string;
}

interface UserDetail extends AdminUser {
  bio?: string;
  instagram?: string;
  twitter?: string;
  bankName?: string;
  bankAccount?: string;
  totalWithdrawn: number;
  totalLinks: number;
}

interface Pagination {
  page: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
}

// ─── Helpers ──────────────────────────────────────────────
function formatRupiah(n: number) {
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(1)}jt`;
  if (n >= 1_000) return `Rp ${(n / 1_000).toFixed(0)}rb`;
  return `Rp ${n}`;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m lalu`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}j lalu`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}h lalu`;
  return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

// ─── Toast ────────────────────────────────────────────────
function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl px-5 py-3 shadow-xl text-white text-sm font-medium ${type === "success" ? "bg-emerald-600" : "bg-red-600"}`}>
      {type === "success" ? <Check size={16} /> : <AlertCircle size={16} />}
      {message}
      <button onClick={onClose}><X size={14} className="opacity-70 hover:opacity-100" /></button>
    </div>
  );
}

// ─── User Detail Modal ────────────────────────────────────
function UserDetailModal({ user, onClose, onToggleStatus, onDelete }: {
  user: UserDetail;
  onClose: () => void;
  onToggleStatus: (id: string, active: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [acting, setActing] = useState(false);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-bold text-gray-900 text-lg">Detail User</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-5">
          {/* Avatar & Basic */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-200 to-purple-200 flex items-center justify-center overflow-hidden text-2xl font-bold text-white shrink-0">
              {user.avatarUrl ? <img src={user.avatarUrl} className="w-full h-full object-cover" alt="" /> : (user.name || user.username).charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-gray-900">{user.name || user.username}</p>
                {user.role === "admin" && <span className="flex items-center gap-1 bg-amber-50 text-amber-600 text-xs font-semibold px-2 py-0.5 rounded-full"><Crown size={10} /> Admin</span>}
              </div>
              <p className="text-sm text-gray-400">@{user.username}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex gap-2 flex-wrap">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${user.isActive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
              {user.isActive ? "✓ Aktif" : "✕ Nonaktif"}
            </span>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${user.isVerified ? "bg-sky-50 text-sky-600" : "bg-gray-100 text-gray-500"}`}>
              {user.isVerified ? "✓ Terverifikasi" : "Belum Verifikasi"}
            </span>
            <span className="text-xs text-gray-400 px-3 py-1 rounded-full bg-gray-50">
              Bergabung {timeAgo(user.createdAt)}
            </span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Revenue", value: formatRupiah(user.totalRevenue), icon: DollarSign, color: "text-emerald-600 bg-emerald-50" },
              { label: "Produk", value: user.totalProducts, icon: ShoppingBag, color: "text-indigo-600 bg-indigo-50" },
              { label: "Penjualan", value: user.totalSales, icon: Download, color: "text-amber-600 bg-amber-50" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2 ${color}`}>
                  <Icon size={14} />
                </div>
                <p className="font-bold text-gray-900 text-sm">{value}</p>
                <p className="text-xs text-gray-400">{label}</p>
              </div>
            ))}
          </div>

          {/* Bank Info */}
          {user.bankName && (
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-500 mb-2">Rekening</p>
              <p className="text-sm text-gray-800">{user.bankName} — {user.bankAccount}</p>
              <p className="text-xs text-gray-400 mt-1">Total Dicairkan: {formatRupiah(user.totalWithdrawn)}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={async () => { setActing(true); await onToggleStatus(user.id, !user.isActive); setActing(false); onClose(); }}
              disabled={acting}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition ${user.isActive ? "border border-red-200 text-red-600 hover:bg-red-50" : "border border-emerald-200 text-emerald-600 hover:bg-emerald-50"}`}
            >
              {acting ? <Loader2 size={14} className="animate-spin" /> : user.isActive ? <Ban size={14} /> : <CheckCircle size={14} />}
              {user.isActive ? "Nonaktifkan" : "Aktifkan"}
            </button>
            <a href={`mailto:${user.email}`} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm transition">
              <Mail size={14} /> Email
            </a>
            <button
              onClick={async () => { if (!confirm(`Hapus user @${user.username}?`)) return; setActing(true); await onDelete(user.id); setActing(false); onClose(); }}
              disabled={acting}
              className="flex items-center justify-center w-10 h-10 rounded-xl border border-red-100 text-red-500 hover:bg-red-50 transition"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────
export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, totalPages: 1, totalItems: 0, perPage: 20 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => setToast({ message, type });

  useEffect(() => { fetchUsers(); }, [pagination.page, filterStatus]);

  useEffect(() => {
    const t = setTimeout(() => fetchUsers(), 400);
    return () => clearTimeout(t);
  }, [search]);

  async function fetchUsers() {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(pagination.page),
        search,
        status: filterStatus,
        perPage: "20",
      });
      const res = await fetch(`/api/admin/users?${params}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setUsers(data.users || []);
      setPagination(data.pagination || pagination);
    } catch {
      showToast("Gagal memuat data user", "error");
    } finally {
      setLoading(false);
    }
  }

  async function fetchUserDetail(id: string) {
    try {
      const res = await fetch(`/api/admin/users/${id}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setSelectedUser(data.user);
    } catch {
      showToast("Gagal memuat detail user", "error");
    }
  }

  async function toggleStatus(id: string, active: boolean) {
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: active }),
      });
      if (!res.ok) throw new Error();
      setUsers((u) => u.map((x) => (x.id === id ? { ...x, isActive: active } : x)));
      showToast(active ? "User diaktifkan" : "User dinonaktifkan", "success");
    } catch {
      showToast("Gagal mengubah status user", "error");
    }
  }

  async function deleteUser(id: string) {
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setUsers((u) => u.filter((x) => x.id !== id));
      showToast("User dihapus", "success");
    } catch {
      showToast("Gagal menghapus user", "error");
    }
  }

  // Export CSV
  const exportCSV = () => {
    const headers = ["Username", "Nama", "Email", "Status", "Revenue", "Produk", "Bergabung"];
    const rows = users.map((u) => [u.username, u.name, u.email, u.isActive ? "Aktif" : "Nonaktif", u.totalRevenue, u.totalProducts, u.createdAt]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "weiiz-users.csv"; a.click();
  };

  const statsBar = [
    { label: "Total User", value: pagination.totalItems, icon: Users, color: "text-indigo-600 bg-indigo-50" },
    { label: "Aktif", value: users.filter((u) => u.isActive).length, icon: UserCheck, color: "text-emerald-600 bg-emerald-50" },
    { label: "Nonaktif", value: users.filter((u) => !u.isActive).length, icon: UserX, color: "text-red-500 bg-red-50" },
    { label: "Total Revenue", value: formatRupiah(users.reduce((s, u) => s + u.totalRevenue, 0)), icon: DollarSign, color: "text-amber-600 bg-amber-50" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="text-indigo-600" size={24} /> Manajemen User
            </h1>
            <p className="text-gray-500 text-sm mt-1">Kelola semua pengguna weiiz.ink</p>
          </div>
          <button onClick={exportCSV} className="flex items-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium transition shadow-sm">
            <Download size={15} /> Export CSV
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {statsBar.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${color}`}><Icon size={18} /></div>
              <p className="text-xs text-gray-400 mb-0.5">{label}</p>
              <p className="font-bold text-gray-900 text-base">{value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari username, nama, email..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-gray-400" />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200">
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="inactive">Nonaktif</option>
              <option value="unverified">Belum Verifikasi</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  {["User", "Status", "Revenue", "Produk", "Bergabung", "Login Terakhir", ""].map((h) => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-5 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  [...Array(8)].map((_, i) => (
                    <tr key={i}>
                      {[...Array(7)].map((_, j) => (
                        <td key={j} className="px-5 py-4">
                          <div className="h-4 bg-gray-100 rounded animate-pulse" style={{ width: `${60 + Math.random() * 40}%` }} />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-16 text-center text-gray-400">
                      <Users size={40} className="mx-auto mb-3 opacity-30" />
                      <p>Tidak ada user ditemukan</p>
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-sm font-bold text-indigo-600 overflow-hidden shrink-0">
                            {user.avatarUrl ? <img src={user.avatarUrl} className="w-full h-full object-cover" alt="" /> : (user.name || user.username).charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className="font-medium text-gray-900">{user.name || user.username}</p>
                              {user.role === "admin" && <Crown size={12} className="text-amber-500" />}
                            </div>
                            <p className="text-xs text-gray-400">@{user.username} · {user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-1">
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full w-fit ${user.isActive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                            {user.isActive ? "Aktif" : "Nonaktif"}
                          </span>
                          {!user.isVerified && <span className="text-xs text-amber-500">Belum verif</span>}
                        </div>
                      </td>
                      <td className="px-5 py-4 font-semibold text-gray-800">{formatRupiah(user.totalRevenue)}</td>
                      <td className="px-5 py-4 text-gray-600">{user.totalProducts} produk</td>
                      <td className="px-5 py-4 text-gray-400 text-xs">{timeAgo(user.createdAt)}</td>
                      <td className="px-5 py-4 text-gray-400 text-xs">{user.lastLoginAt ? timeAgo(user.lastLoginAt) : "–"}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <button onClick={() => fetchUserDetail(user.id)} className="w-8 h-8 rounded-lg hover:bg-indigo-50 text-gray-400 hover:text-indigo-600 flex items-center justify-center transition"><Eye size={14} /></button>
                          <button onClick={() => toggleStatus(user.id, !user.isActive)} className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${user.isActive ? "hover:bg-red-50 text-gray-400 hover:text-red-500" : "hover:bg-emerald-50 text-gray-400 hover:text-emerald-600"}`}>
                            {user.isActive ? <Ban size={14} /> : <CheckCircle size={14} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                {(pagination.page - 1) * pagination.perPage + 1}–{Math.min(pagination.page * pagination.perPage, pagination.totalItems)} dari {pagination.totalItems} user
              </p>
              <div className="flex items-center gap-2">
                <button onClick={() => setPagination((p) => ({ ...p, page: p.page - 1 }))} disabled={pagination.page === 1} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition">
                  <ChevronLeft size={15} />
                </button>
                <span className="text-sm font-medium text-gray-700">{pagination.page} / {pagination.totalPages}</span>
                <button onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))} disabled={pagination.page === pagination.totalPages} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition">
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedUser && (
        <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} onToggleStatus={toggleStatus} onDelete={deleteUser} />
      )}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}
