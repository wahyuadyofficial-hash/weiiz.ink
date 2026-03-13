"use client";

import { useState, useEffect } from "react";
import {
  Wallet,
  Search,
  Check,
  X,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  Users,
  Download,
  Eye,
  Loader2,
  Filter,
  MessageSquare,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────
interface Withdrawal {
  id: string;
  userId: string;
  username: string;
  name: string;
  avatarUrl?: string;
  amount: number;
  bankName: string;
  bankAccount: string;
  bankHolder: string;
  status: "pending" | "processed" | "rejected";
  note?: string;
  createdAt: string;
  processedAt?: string;
}

interface WithdrawalStats {
  totalPending: number;
  totalPendingAmount: number;
  totalProcessedToday: number;
  totalProcessedAmount: number;
}

// ─── Helpers ──────────────────────────────────────────────
function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
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

// ─── Status Badge ─────────────────────────────────────────
function StatusBadge({ status }: { status: Withdrawal["status"] }) {
  const map = {
    pending: { label: "Menunggu", color: "bg-amber-50 text-amber-700", icon: Clock },
    processed: { label: "Dicairkan", color: "bg-emerald-50 text-emerald-700", icon: CheckCircle },
    rejected: { label: "Ditolak", color: "bg-red-50 text-red-600", icon: XCircle },
  };
  const { label, color, icon: Icon } = map[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${color}`}>
      <Icon size={11} /> {label}
    </span>
  );
}

// ─── Process Modal ────────────────────────────────────────
function ProcessModal({ withdrawal, onClose, onApprove, onReject }: {
  withdrawal: Withdrawal;
  onClose: () => void;
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string, note: string) => Promise<void>;
}) {
  const [action, setAction] = useState<"approve" | "reject" | null>(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (action === "approve") await onApprove(withdrawal.id);
      else if (action === "reject") await onReject(withdrawal.id, note);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-bold text-gray-900 text-lg">Proses Penarikan</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-5">
          {/* Withdrawal Info */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-gray-400">User</span>
              <span className="text-sm font-semibold text-gray-800">@{withdrawal.username}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-400">Jumlah</span>
              <span className="text-base font-bold text-indigo-600">{formatRupiah(withdrawal.amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-400">Bank</span>
              <span className="text-sm text-gray-800">{withdrawal.bankName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-400">No. Rekening</span>
              <span className="text-sm font-mono text-gray-800 tracking-wider">{withdrawal.bankAccount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-400">Atas Nama</span>
              <span className="text-sm text-gray-800">{withdrawal.bankHolder}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-400">Tanggal</span>
              <span className="text-xs text-gray-500">{formatDate(withdrawal.createdAt)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          {!action ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setAction("approve")}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition"
              >
                <CheckCircle size={16} /> Setujui
              </button>
              <button
                onClick={() => setAction("reject")}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition"
              >
                <XCircle size={16} /> Tolak
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className={`flex items-center gap-2 p-3 rounded-xl text-sm font-medium ${action === "approve" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                {action === "approve" ? <CheckCircle size={16} /> : <XCircle size={16} />}
                {action === "approve" ? "Konfirmasi setujui transfer" : "Konfirmasi tolak permintaan"}
              </div>

              {action === "reject" && (
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Alasan penolakan (wajib)</label>
                  <div className="relative">
                    <MessageSquare size={14} className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      rows={3}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Misal: Data rekening tidak sesuai..."
                      className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-200 resize-none"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => { setAction(null); setNote(""); }} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition">
                  Kembali
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading || (action === "reject" && !note.trim())}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-medium transition disabled:opacity-60 ${action === "approve" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700"}`}
                >
                  {loading ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                  {loading ? "Memproses..." : "Konfirmasi"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────
export default function AdminWithdrawalPage() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [stats, setStats] = useState<WithdrawalStats | null>(null);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, totalItems: 0, perPage: 20 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("pending");
  const [selected, setSelected] = useState<Withdrawal | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error") => setToast({ message: msg, type });

  useEffect(() => { fetchData(); }, [pagination.page, filterStatus]);
  useEffect(() => { const t = setTimeout(fetchData, 400); return () => clearTimeout(t); }, [search]);

  async function fetchData() {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(pagination.page), search, status: filterStatus, perPage: "20" });
      const [wdRes, statsRes] = await Promise.all([
        fetch(`/api/admin/withdrawals?${params}`),
        fetch("/api/admin/withdrawals/stats"),
      ]);
      const wdData = await wdRes.json();
      const statsData = await statsRes.json();
      setWithdrawals(wdData.withdrawals || []);
      setPagination(wdData.pagination || pagination);
      setStats(statsData);
    } catch {
      showToast("Gagal memuat data", "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(id: string) {
    try {
      const res = await fetch(`/api/admin/withdrawals/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "processed" }),
      });
      if (!res.ok) throw new Error();
      setWithdrawals((w) => w.filter((x) => x.id !== id));
      showToast("Penarikan berhasil disetujui & diproses", "success");
    } catch {
      showToast("Gagal memproses penarikan", "error");
      throw new Error();
    }
  }

  async function handleReject(id: string, note: string) {
    try {
      const res = await fetch(`/api/admin/withdrawals/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected", note }),
      });
      if (!res.ok) throw new Error();
      setWithdrawals((w) => w.filter((x) => x.id !== id));
      showToast("Penarikan ditolak", "success");
    } catch {
      showToast("Gagal menolak penarikan", "error");
      throw new Error();
    }
  }

  const exportCSV = () => {
    const headers = ["Username", "Nama", "Jumlah", "Bank", "No Rekening", "Atas Nama", "Status", "Tanggal"];
    const rows = withdrawals.map((w) => [w.username, w.name, w.amount, w.bankName, w.bankAccount, w.bankHolder, w.status, w.createdAt]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "weiiz-withdrawals.csv"; a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Wallet className="text-indigo-600" size={24} /> Manajemen Penarikan
            </h1>
            <p className="text-gray-500 text-sm mt-1">Review dan proses permintaan pencairan saldo</p>
          </div>
          <button onClick={exportCSV} className="flex items-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium transition shadow-sm">
            <Download size={15} /> Export CSV
          </button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Menunggu Proses", value: stats.totalPending, icon: Clock, color: "text-amber-600 bg-amber-50" },
              { label: "Nilai Pending", value: formatRupiah(stats.totalPendingAmount), icon: DollarSign, color: "text-indigo-600 bg-indigo-50" },
              { label: "Diproses Hari Ini", value: stats.totalProcessedToday, icon: Users, color: "text-emerald-600 bg-emerald-50" },
              { label: "Dicairkan Hari Ini", value: formatRupiah(stats.totalProcessedAmount), icon: Wallet, color: "text-purple-600 bg-purple-50" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${color}`}><Icon size={18} /></div>
                <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                <p className="font-bold text-gray-900 text-base">{value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Pending Alert */}
        {stats && stats.totalPending > 0 && filterStatus === "pending" && (
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5">
            <AlertCircle size={16} className="text-amber-500 shrink-0" />
            <p className="text-sm text-amber-700">
              <span className="font-bold">{stats.totalPending} permintaan</span> menunggu diproses senilai{" "}
              <span className="font-bold">{formatRupiah(stats.totalPendingAmount)}</span>
            </p>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari username atau nama..." className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200" />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-gray-400" />
            {(["pending", "processed", "rejected", "all"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${filterStatus === s ? "bg-indigo-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
              >
                {s === "all" ? "Semua" : s === "pending" ? "Pending" : s === "processed" ? "Cair" : "Ditolak"}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  {["User", "Jumlah", "Rekening Tujuan", "Status", "Tanggal", "Aksi"].map((h) => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-5 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  [...Array(6)].map((_, i) => (
                    <tr key={i}>{[...Array(6)].map((_, j) => (
                      <td key={j} className="px-5 py-4"><div className="h-4 bg-gray-100 rounded animate-pulse" style={{ width: "70%" }} /></td>
                    ))}</tr>
                  ))
                ) : withdrawals.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center text-gray-400">
                      <Wallet size={40} className="mx-auto mb-3 opacity-30" />
                      <p>Tidak ada data penarikan</p>
                    </td>
                  </tr>
                ) : (
                  withdrawals.map((wd) => (
                    <tr key={wd.id} className={`hover:bg-gray-50/50 transition ${wd.status === "pending" ? "bg-amber-50/20" : ""}`}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-sm font-bold text-indigo-600 overflow-hidden shrink-0">
                            {wd.avatarUrl ? <img src={wd.avatarUrl} className="w-full h-full object-cover" alt="" /> : (wd.name || wd.username).charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{wd.name}</p>
                            <p className="text-xs text-gray-400">@{wd.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-bold text-gray-900 text-base">{formatRupiah(wd.amount)}</span>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium text-gray-800">{wd.bankName}</p>
                        <p className="text-xs font-mono text-gray-500 tracking-wider">{wd.bankAccount}</p>
                        <p className="text-xs text-gray-400">{wd.bankHolder}</p>
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={wd.status} />
                        {wd.note && <p className="text-xs text-red-500 mt-1 max-w-[160px] truncate">{wd.note}</p>}
                      </td>
                      <td className="px-5 py-4 text-xs text-gray-400">
                        <p>{formatDate(wd.createdAt)}</p>
                        {wd.processedAt && <p className="text-emerald-600 mt-0.5">✓ {formatDate(wd.processedAt)}</p>}
                      </td>
                      <td className="px-5 py-4">
                        {wd.status === "pending" ? (
                          <button
                            onClick={() => setSelected(wd)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition"
                          >
                            <Eye size={12} /> Proses
                          </button>
                        ) : (
                          <button onClick={() => setSelected(wd)} className="w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-400 flex items-center justify-center transition">
                            <Eye size={14} />
                          </button>
                        )}
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
              <p className="text-xs text-gray-400">{pagination.totalItems} total permintaan</p>
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

      {selected && (
        <ProcessModal
          withdrawal={selected}
          onClose={() => setSelected(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}
