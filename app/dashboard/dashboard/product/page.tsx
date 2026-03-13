"use client";

import { useState, useEffect, useRef } from "react";
import {
  Package,
  Plus,
  Upload,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Download,
  DollarSign,
  X,
  Check,
  AlertCircle,
  FileText,
  Image as ImageIcon,
  Archive,
  Loader2,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  coverImage?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  category: string;
  isActive: boolean;
  salesCount: number;
  revenue: number;
  createdAt: string;
}

interface ProductForm {
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  category: string;
  isActive: boolean;
}

const CATEGORIES = [
  "E-Book",
  "Template",
  "Preset",
  "Course",
  "Source Code",
  "Design Asset",
  "Audio",
  "Video",
  "Other",
];

const EMPTY_FORM: ProductForm = {
  name: "",
  description: "",
  price: "",
  originalPrice: "",
  category: "E-Book",
  isActive: true,
};

// ─── Helpers ──────────────────────────────────────────────
function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

function formatFileSize(bytes?: number) {
  if (!bytes) return "–";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
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
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl px-5 py-3 shadow-xl text-white text-sm font-medium animate-in slide-in-from-bottom-4 ${
        type === "success" ? "bg-emerald-600" : "bg-red-600"
      }`}
    >
      {type === "success" ? <Check size={16} /> : <AlertCircle size={16} />}
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
        <X size={14} />
      </button>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────
function ProductCard({
  product,
  onEdit,
  onDelete,
  onToggle,
}: {
  product: Product;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string, active: boolean) => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Cover */}
      <div className="relative h-40 bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        {product.coverImage ? (
          <img
            src={product.coverImage}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-indigo-300">
            <Package size={36} />
            <span className="text-xs">No Cover</span>
          </div>
        )}
        {/* Badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-semibold text-indigo-700 px-2 py-0.5 rounded-full">
          {product.category}
        </span>
        <span
          className={`absolute top-3 right-3 text-xs font-semibold px-2 py-0.5 rounded-full ${
            product.isActive
              ? "bg-emerald-100 text-emerald-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {product.isActive ? "Aktif" : "Nonaktif"}
        </span>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
          {product.description || "Tidak ada deskripsi"}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-indigo-600 font-bold text-base">
            {formatRupiah(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-gray-300 text-xs line-through">
              {formatRupiah(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex gap-4 mt-3 pt-3 border-t border-gray-50">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Download size={12} />
            <span>{product.salesCount} terjual</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <DollarSign size={12} />
            <span>{formatRupiah(product.revenue)}</span>
          </div>
          {product.fileName && (
            <div className="flex items-center gap-1.5 text-xs text-gray-400 ml-auto">
              <FileText size={12} />
              <span>{formatFileSize(product.fileSize)}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onToggle(product.id, !product.isActive)}
            className="flex-1 flex items-center justify-center gap-1.5 text-xs py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition text-gray-600"
          >
            {product.isActive ? <EyeOff size={13} /> : <Eye size={13} />}
            {product.isActive ? "Nonaktifkan" : "Aktifkan"}
          </button>
          <button
            onClick={() => onEdit(product)}
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-indigo-100 text-indigo-600 hover:bg-indigo-50 transition"
          >
            <Edit2 size={13} />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 transition"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────
function ProductModal({
  open,
  product,
  onClose,
  onSave,
}: {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onSave: (form: ProductForm, coverFile: File | null, productFile: File | null) => Promise<void>;
}) {
  const [form, setForm] = useState<ProductForm>(EMPTY_FORM);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [productFile, setProductFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const coverRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        price: String(product.price),
        originalPrice: product.originalPrice ? String(product.originalPrice) : "",
        category: product.category,
        isActive: product.isActive,
      });
      setCoverPreview(product.coverImage || "");
    } else {
      setForm(EMPTY_FORM);
      setCoverPreview("");
    }
    setCoverFile(null);
    setProductFile(null);
  }, [product, open]);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setCoverFile(f);
    setCoverPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(form, coverFile, productFile);
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-bold text-gray-900 text-lg">
            {product ? "Edit Produk" : "Tambah Produk Baru"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Cover Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Produk
            </label>
            <div
              onClick={() => coverRef.current?.click()}
              className="relative h-36 rounded-xl border-2 border-dashed border-gray-200 hover:border-indigo-300 cursor-pointer overflow-hidden flex items-center justify-center bg-gray-50 transition"
            >
              {coverPreview ? (
                <img src={coverPreview} alt="cover" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center text-gray-400">
                  <ImageIcon size={28} className="mx-auto mb-1" />
                  <p className="text-xs">Klik untuk upload cover (JPG/PNG)</p>
                </div>
              )}
            </div>
            <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Produk <span className="text-red-400">*</span>
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Contoh: Ebook Desain UI/UX Pemula"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Jelaskan isi produk kamu..."
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Harga (Rp) <span className="text-red-400">*</span>
              </label>
              <input
                required
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="50000"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Harga Coret (Rp)
              </label>
              <input
                type="number"
                min="0"
                value={form.originalPrice}
                onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                placeholder="100000"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              File Produk {!product && <span className="text-red-400">*</span>}
            </label>
            <div
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-3 border-2 border-dashed border-gray-200 hover:border-indigo-300 rounded-xl px-4 py-3 cursor-pointer bg-gray-50 transition"
            >
              <Archive size={20} className="text-gray-400 shrink-0" />
              <div className="min-w-0">
                {productFile ? (
                  <>
                    <p className="text-sm font-medium text-gray-700 truncate">{productFile.name}</p>
                    <p className="text-xs text-gray-400">{formatFileSize(productFile.size)}</p>
                  </>
                ) : product?.fileName ? (
                  <>
                    <p className="text-sm text-gray-600 truncate">{product.fileName}</p>
                    <p className="text-xs text-indigo-500">Klik untuk ganti file</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-400">Klik untuk upload file produk</p>
                    <p className="text-xs text-gray-300">ZIP, PDF, MP4, dll — maks 500MB</p>
                  </>
                )}
              </div>
            </div>
            <input ref={fileRef} type="file" className="hidden" onChange={(e) => setProductFile(e.target.files?.[0] || null)} />
          </div>

          {/* Status */}
          <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm font-medium text-gray-700">Status Produk</p>
              <p className="text-xs text-gray-400">Produk aktif akan tampil di halaman publik</p>
            </div>
            <button
              type="button"
              onClick={() => setForm({ ...form, isActive: !form.isActive })}
              className={`relative w-11 h-6 rounded-full transition-colors ${form.isActive ? "bg-indigo-600" : "bg-gray-300"}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.isActive ? "translate-x-5" : ""}`} />
            </button>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
              {saving ? "Menyimpan..." : product ? "Simpan Perubahan" : "Tambah Produk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────
export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const showToast = (message: string, type: "success" | "error") =>
    setToast({ message, type });

  // ── Fetch products ──
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setProducts(data.products || []);
    } catch {
      showToast("Gagal memuat produk", "error");
    } finally {
      setLoading(false);
    }
  }

  // ── Save (create / update) ──
  async function handleSave(
    form: ProductForm,
    coverFile: File | null,
    productFile: File | null
  ) {
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("description", form.description);
      fd.append("price", form.price);
      fd.append("originalPrice", form.originalPrice);
      fd.append("category", form.category);
      fd.append("isActive", String(form.isActive));
      if (coverFile) fd.append("cover", coverFile);
      if (productFile) fd.append("file", productFile);

      const url = editProduct ? `/api/products/${editProduct.id}` : "/api/products";
      const method = editProduct ? "PUT" : "POST";

      const res = await fetch(url, { method, body: fd });
      if (!res.ok) throw new Error();

      showToast(editProduct ? "Produk berhasil diperbarui" : "Produk berhasil ditambahkan", "success");
      setModalOpen(false);
      setEditProduct(null);
      fetchProducts();
    } catch {
      showToast("Gagal menyimpan produk", "error");
      throw new Error();
    }
  }

  // ── Delete ──
  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      showToast("Produk dihapus", "success");
      setDeleteId(null);
      setProducts((p) => p.filter((x) => x.id !== id));
    } catch {
      showToast("Gagal menghapus produk", "error");
    }
  }

  // ── Toggle ──
  async function handleToggle(id: string, active: boolean) {
    try {
      await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: active }),
      });
      setProducts((p) => p.map((x) => (x.id === id ? { ...x, isActive: active } : x)));
    } catch {
      showToast("Gagal mengubah status produk", "error");
    }
  }

  // ── Filter ──
  const filtered = products.filter((p) => {
    const catOk = filterCategory === "all" || p.category === filterCategory;
    const statOk =
      filterStatus === "all" ||
      (filterStatus === "active" && p.isActive) ||
      (filterStatus === "inactive" && !p.isActive);
    return catOk && statOk;
  });

  const totalRevenue = products.reduce((s, p) => s + p.revenue, 0);
  const totalSales = products.reduce((s, p) => s + p.salesCount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Package className="text-indigo-600" size={24} />
              Produk Digital
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Upload dan kelola produk digitalmu di sini
            </p>
          </div>
          <button
            onClick={() => { setEditProduct(null); setModalOpen(true); }}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition shadow-sm shadow-indigo-200"
          >
            <Plus size={16} />
            Tambah Produk
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Produk", value: products.length, icon: Package, color: "text-indigo-600 bg-indigo-50" },
            { label: "Produk Aktif", value: products.filter((p) => p.isActive).length, icon: Eye, color: "text-emerald-600 bg-emerald-50" },
            { label: "Total Terjual", value: totalSales, icon: Download, color: "text-amber-600 bg-amber-50" },
            { label: "Total Revenue", value: formatRupiah(totalRevenue), icon: DollarSign, color: "text-purple-600 bg-purple-50" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                <Icon size={18} />
              </div>
              <p className="text-xs text-gray-400 mb-0.5">{label}</p>
              <p className="font-bold text-gray-900 text-base">{value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            <option value="all">Semua Kategori</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            <option value="all">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="inactive">Nonaktif</option>
          </select>
          <span className="ml-auto text-xs text-gray-400 self-center">
            {filtered.length} produk ditemukan
          </span>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 h-72 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Package size={48} className="mx-auto mb-4 opacity-30" />
            <p className="font-medium text-gray-500">Belum ada produk</p>
            <p className="text-sm mt-1">Mulai tambahkan produk digitalmu sekarang</p>
            <button
              onClick={() => { setEditProduct(null); setModalOpen(true); }}
              className="mt-5 inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition"
            >
              <Plus size={15} /> Tambah Produk Pertama
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onEdit={(prod) => { setEditProduct(prod); setModalOpen(true); }}
                onDelete={setDeleteId}
                onToggle={handleToggle}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal: Add/Edit */}
      <ProductModal
        open={modalOpen}
        product={editProduct}
        onClose={() => { setModalOpen(false); setEditProduct(null); }}
        onSave={handleSave}
      />

      {/* Modal: Confirm Delete */}
      {deleteId && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center">
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-red-500" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Hapus Produk?</h3>
            <p className="text-gray-400 text-sm mt-2">
              Tindakan ini tidak dapat dibatalkan. Semua data produk akan dihapus permanen.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-medium transition"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}
