"use client";

import { useState, useEffect, useRef } from "react";
import {
  User,
  Lock,
  Wallet,
  Camera,
  Check,
  AlertCircle,
  X,
  Eye,
  EyeOff,
  Loader2,
  CreditCard,
  ChevronRight,
  Globe,
  Instagram,
  Twitter,
  Youtube,
  Copy,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────
interface UserProfile {
  id: string;
  username: string;
  name: string;
  email: string;
  bio: string;
  avatarUrl?: string;
  balance: number;
  totalWithdrawn: number;
  bankName: string;
  bankAccount: string;
  bankHolder: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  website?: string;
}

interface WithdrawalHistory {
  id: string;
  amount: number;
  status: "pending" | "processed" | "rejected";
  bankName: string;
  bankAccount: string;
  createdAt: string;
  note?: string;
}

type Tab = "profile" | "withdrawal" | "password";

// ─── Helpers ──────────────────────────────────────────────
function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n);
}

// ─── Toast ────────────────────────────────────────────────
function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl px-5 py-3 shadow-xl text-white text-sm font-medium ${
        type === "success" ? "bg-emerald-600" : "bg-red-600"
      }`}
    >
      {type === "success" ? <Check size={16} /> : <AlertCircle size={16} />}
      {message}
      <button onClick={onClose}>
        <X size={14} className="opacity-70 hover:opacity-100" />
      </button>
    </div>
  );
}

// ─── Sidebar Tab ──────────────────────────────────────────
function SideTab({
  active,
  icon: Icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
        active
          ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
      }`}
    >
      <Icon size={16} />
      {label}
      <ChevronRight size={14} className="ml-auto opacity-40" />
    </button>
  );
}

// ─── Profile Tab ──────────────────────────────────────────
function ProfileTab({
  profile,
  onSave,
  saving,
}: {
  profile: UserProfile;
  onSave: (data: Partial<UserProfile>, avatar: File | null) => Promise<void>;
  saving: boolean;
}) {
  const [form, setForm] = useState({
    name: profile.name || "",
    bio: profile.bio || "",
    instagram: profile.instagram || "",
    twitter: profile.twitter || "",
    youtube: profile.youtube || "",
    website: profile.website || "",
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState(profile.avatarUrl || "");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setAvatar(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form, avatar);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Avatar */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
            {preview ? (
              <img src={preview} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <User size={32} className="text-indigo-300" />
            )}
          </div>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center shadow-md hover:bg-indigo-700 transition"
          >
            <Camera size={13} className="text-white" />
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
        </div>
        <div>
          <p className="font-semibold text-gray-900">@{profile.username}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            weiiz.ink/<span className="text-indigo-500">{profile.username}</span>
          </p>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(`https://weiiz.ink/${profile.username}`)}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-indigo-600 transition mt-1"
          >
            <Copy size={11} /> Salin link
          </button>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Basic Info */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Tampilan</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nama kamu"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
          <textarea
            rows={3}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            placeholder="Ceritakan tentang dirimu..."
            maxLength={160}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
          />
          <p className="text-xs text-gray-300 text-right mt-1">{form.bio.length}/160</p>
        </div>
      </div>

      {/* Social Links */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Sosial Media</p>
        <div className="space-y-3">
          {[
            { key: "instagram" as const, icon: Instagram, placeholder: "username Instagram", color: "text-pink-500" },
            { key: "twitter" as const, icon: Twitter, placeholder: "username Twitter/X", color: "text-sky-500" },
            { key: "youtube" as const, icon: Youtube, placeholder: "channel YouTube", color: "text-red-500" },
            { key: "website" as const, icon: Globe, placeholder: "https://website.com", color: "text-gray-500" },
          ].map(({ key, icon: Icon, placeholder, color }) => (
            <div key={key} className="relative">
              <Icon size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${color}`} />
              <input
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-sm font-medium transition disabled:opacity-60"
      >
        {saving ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
        {saving ? "Menyimpan..." : "Simpan Profil"}
      </button>
    </form>
  );
}

// ─── Withdrawal Tab ───────────────────────────────────────
function WithdrawalTab({
  profile,
  history,
  onSaveBankInfo,
  onRequestWithdrawal,
  saving,
}: {
  profile: UserProfile;
  history: WithdrawalHistory[];
  onSaveBankInfo: (data: { bankName: string; bankAccount: string; bankHolder: string }) => Promise<void>;
  onRequestWithdrawal: (amount: number) => Promise<void>;
  saving: boolean;
}) {
  const [bank, setBank] = useState({
    bankName: profile.bankName || "",
    bankAccount: profile.bankAccount || "",
    bankHolder: profile.bankHolder || "",
  });
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const minWithdraw = 50_000;

  const statusBadge = (s: WithdrawalHistory["status"]) => {
    const map = {
      pending: "bg-amber-50 text-amber-700",
      processed: "bg-emerald-50 text-emerald-700",
      rejected: "bg-red-50 text-red-600",
    };
    const label = { pending: "Diproses", processed: "Cair", rejected: "Ditolak" };
    return (
      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${map[s]}`}>
        {label[s]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Balance */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <p className="text-sm text-indigo-200">Saldo Tersedia</p>
        <p className="text-3xl font-bold mt-1">{formatRupiah(profile.balance)}</p>
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/20">
          <div>
            <p className="text-xs text-indigo-200">Total Ditarik</p>
            <p className="font-semibold text-sm">{formatRupiah(profile.totalWithdrawn)}</p>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div>
            <p className="text-xs text-indigo-200">Min. Penarikan</p>
            <p className="font-semibold text-sm">{formatRupiah(minWithdraw)}</p>
          </div>
        </div>
      </div>

      {/* Bank Info */}
      <div className="bg-gray-50 rounded-2xl p-5">
        <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-4">
          <CreditCard size={16} className="text-indigo-600" />
          Informasi Rekening
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Nama Bank</label>
            <select
              value={bank.bankName}
              onChange={(e) => setBank({ ...bank, bankName: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="">Pilih Bank</option>
              {["BCA", "BNI", "BRI", "Mandiri", "BSI", "CIMB Niaga", "Danamon", "Permata", "OVO", "GoPay", "DANA", "ShopeePay"].map(
                (b) => <option key={b} value={b}>{b}</option>
              )}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Nomor Rekening / E-Wallet</label>
            <input
              value={bank.bankAccount}
              onChange={(e) => setBank({ ...bank, bankAccount: e.target.value })}
              placeholder="Contoh: 1234567890"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Nama Pemilik Rekening</label>
            <input
              value={bank.bankHolder}
              onChange={(e) => setBank({ ...bank, bankHolder: e.target.value })}
              placeholder="Sesuai buku tabungan"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <button
            onClick={() => onSaveBankInfo(bank)}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 border border-indigo-200 text-indigo-600 hover:bg-indigo-50 py-2.5 rounded-xl text-sm font-medium transition disabled:opacity-60"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
            Simpan Rekening
          </button>
        </div>
      </div>

      {/* Request Withdrawal */}
      <div className="bg-gray-50 rounded-2xl p-5">
        <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-4">
          <Wallet size={16} className="text-indigo-600" />
          Ajukan Penarikan
        </h3>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">Rp</span>
            <input
              type="number"
              min={minWithdraw}
              max={profile.balance}
              step={10000}
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder={`Min. ${formatRupiah(minWithdraw)}`}
              className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <button
            onClick={() => onRequestWithdrawal(Number(withdrawAmount))}
            disabled={
              saving ||
              !withdrawAmount ||
              Number(withdrawAmount) < minWithdraw ||
              Number(withdrawAmount) > profile.balance ||
              !bank.bankName
            }
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : null}
            Cairkan
          </button>
        </div>
        {!bank.bankName && (
          <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
            <AlertCircle size={12} /> Lengkapi informasi rekening terlebih dahulu
          </p>
        )}
        <p className="text-xs text-gray-400 mt-2">
          Proses pencairan 1–3 hari kerja. Biaya admin: Rp 2.500/transaksi
        </p>
      </div>

      {/* History */}
      <div>
        <h3 className="font-semibold text-gray-900 text-sm mb-3">Riwayat Penarikan</h3>
        {history.length === 0 ? (
          <div className="text-center py-8 text-gray-300">
            <Wallet size={32} className="mx-auto mb-2" />
            <p className="text-xs">Belum ada riwayat penarikan</p>
          </div>
        ) : (
          <div className="space-y-2">
            {history.map((h) => (
              <div key={h.id} className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{formatRupiah(h.amount)}</p>
                  <p className="text-xs text-gray-400">
                    {h.bankName} • {h.bankAccount} •{" "}
                    {new Date(h.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                  {h.note && <p className="text-xs text-red-500 mt-0.5">{h.note}</p>}
                </div>
                {statusBadge(h.status)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Password Tab ─────────────────────────────────────────
function PasswordTab({
  onSave,
  saving,
}: {
  onSave: (current: string, newPass: string) => Promise<void>;
  saving: boolean;
}) {
  const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });
  const [show, setShow] = useState({ current: false, newPass: false, confirm: false });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.current) e.current = "Password saat ini harus diisi";
    if (form.newPass.length < 8) e.newPass = "Password minimal 8 karakter";
    if (form.newPass !== form.confirm) e.confirm = "Password tidak cocok";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSave(form.current, form.newPass);
    setForm({ current: "", newPass: "", confirm: "" });
  };

  const strength = (() => {
    const p = form.newPass;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthLabel = ["", "Lemah", "Cukup", "Kuat", "Sangat Kuat"];
  const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-emerald-400", "bg-emerald-600"];

  const PasswordInput = ({
    id,
    label,
    value,
    visible,
    onChange,
    onToggle,
    error,
  }: {
    id: keyof typeof show;
    label: string;
    value: string;
    visible: boolean;
    onChange: (v: string) => void;
    onToggle: () => void;
    error?: string;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full border rounded-xl px-4 pr-11 py-2.5 text-sm focus:outline-none focus:ring-2 ${
            error ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-indigo-300"
          }`}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 flex items-start gap-3">
        <AlertCircle size={16} className="text-amber-500 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-700">
          Setelah ganti password, kamu akan otomatis logout dari semua perangkat.
        </p>
      </div>

      <PasswordInput
        id="current"
        label="Password Saat Ini"
        value={form.current}
        visible={show.current}
        onChange={(v) => setForm({ ...form, current: v })}
        onToggle={() => setShow({ ...show, current: !show.current })}
        error={errors.current}
      />

      <PasswordInput
        id="newPass"
        label="Password Baru"
        value={form.newPass}
        visible={show.newPass}
        onChange={(v) => setForm({ ...form, newPass: v })}
        onToggle={() => setShow({ ...show, newPass: !show.newPass })}
        error={errors.newPass}
      />

      {/* Strength meter */}
      {form.newPass && (
        <div>
          <div className="flex gap-1 mb-1">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  n <= strength ? strengthColor[strength] : "bg-gray-100"
                }`}
              />
            ))}
          </div>
          <p className={`text-xs font-medium ${strength <= 1 ? "text-red-500" : strength === 2 ? "text-amber-500" : "text-emerald-600"}`}>
            {strengthLabel[strength]}
          </p>
        </div>
      )}

      <PasswordInput
        id="confirm"
        label="Konfirmasi Password Baru"
        value={form.confirm}
        visible={show.confirm}
        onChange={(v) => setForm({ ...form, confirm: v })}
        onToggle={() => setShow({ ...show, confirm: !show.confirm })}
        error={errors.confirm}
      />

      <button
        type="submit"
        disabled={saving}
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-sm font-medium transition disabled:opacity-60"
      >
        {saving ? <Loader2 size={15} className="animate-spin" /> : <Lock size={15} />}
        {saving ? "Menyimpan..." : "Ganti Password"}
      </button>
    </form>
  );
}

// ─── Main Page ────────────────────────────────────────────
export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("profile");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [withdrawalHistory, setWithdrawalHistory] = useState<WithdrawalHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") =>
    setToast({ message, type });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [profileRes, withdrawRes] = await Promise.all([
        fetch("/api/profile"),
        fetch("/api/withdrawal"),
      ]);
      const profileData = await profileRes.json();
      const withdrawData = await withdrawRes.json();
      setProfile(profileData.user || profileData);
      setWithdrawalHistory(withdrawData.withdrawals || []);
    } catch {
      showToast("Gagal memuat data", "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveProfile(data: Partial<UserProfile>, avatar: File | null) {
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(data).forEach(([k, v]) => fd.append(k, v as string));
      if (avatar) fd.append("avatar", avatar);
      const res = await fetch("/api/profile", { method: "PUT", body: fd });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setProfile((p) => ({ ...p!, ...updated.user }));
      showToast("Profil berhasil diperbarui", "success");
    } catch {
      showToast("Gagal menyimpan profil", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveBankInfo(data: { bankName: string; bankAccount: string; bankHolder: string }) {
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setProfile((p) => ({ ...p!, ...data }));
      showToast("Rekening berhasil disimpan", "success");
    } catch {
      showToast("Gagal menyimpan rekening", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleWithdrawal(amount: number) {
    setSaving(true);
    try {
      const res = await fetch("/api/withdrawal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      if (!res.ok) throw new Error();
      showToast("Permintaan penarikan berhasil dikirim", "success");
      fetchData();
    } catch {
      showToast("Gagal mengajukan penarikan", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword(current: string, newPass: string) {
    setSaving(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: current, newPassword: newPass }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Gagal");
      }
      showToast("Password berhasil diubah", "success");
    } catch (e: unknown) {
      showToast((e as Error).message || "Gagal mengubah password", "error");
      throw e;
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-400" size={32} />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola profil, rekening, dan keamanan akunmu</p>
        </div>

        <div className="flex gap-6 flex-col md:flex-row">
          {/* Sidebar */}
          <div className="md:w-52 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 space-y-1">
              <SideTab active={tab === "profile"} icon={User} label="Profil" onClick={() => setTab("profile")} />
              <SideTab active={tab === "withdrawal"} icon={Wallet} label="Saldo & Penarikan" onClick={() => setTab("withdrawal")} />
              <SideTab active={tab === "password"} icon={Lock} label="Ganti Password" onClick={() => setTab("password")} />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            {tab === "profile" && (
              <ProfileTab profile={profile} onSave={handleSaveProfile} saving={saving} />
            )}
            {tab === "withdrawal" && (
              <WithdrawalTab
                profile={profile}
                history={withdrawalHistory}
                onSaveBankInfo={handleSaveBankInfo}
                onRequestWithdrawal={handleWithdrawal}
                saving={saving}
              />
            )}
            {tab === "password" && (
              <PasswordTab onSave={handleChangePassword} saving={saving} />
            )}
          </div>
        </div>
      </div>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}
