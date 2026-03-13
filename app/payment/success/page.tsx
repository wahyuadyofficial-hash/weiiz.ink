"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Download, ArrowRight, Package, Mail, Loader2, Share2, Copy, Check } from "lucide-react";

interface OrderDetail {
  orderId: string;
  productName: string;
  sellerName: string;
  sellerUsername: string;
  amount: number;
  downloadUrl?: string;
  downloadToken?: string;
  buyerEmail: string;
  paidAt: string;
}

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);
}

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!orderId) { setLoading(false); return; }
    fetchOrder();
  }, [orderId]);

  async function fetchOrder() {
    try {
      const res = await fetch(`/api/payment/detail?order_id=${orderId}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setOrder(data.order);
    } catch {
      // Tetap tampil halaman success meski fetch gagal
    } finally {
      setLoading(false);
    }
  }

  const handleDownload = async () => {
    if (!order?.downloadToken) return;
    setDownloading(true);
    try {
      window.location.href = `/api/download/${order.downloadToken}`;
    } finally {
      setTimeout(() => setDownloading(false), 2000);
    }
  };

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-emerald-400 mx-auto mb-3" size={36} />
          <p className="text-gray-500 text-sm">Memverifikasi pembayaran…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-1">
              <CheckCircle className="text-emerald-600" size={52} strokeWidth={1.5} />
            </div>
            {/* Animated ring */}
            <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-emerald-200 animate-ping opacity-30 mx-auto" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-5">Pembayaran Berhasil!</h1>
          <p className="text-gray-500 text-sm mt-2">
            Terima kasih! Transaksimu telah dikonfirmasi.
          </p>
        </div>

        {/* Order Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
          {/* Header stripe */}
          <div className="h-1.5 bg-gradient-to-r from-emerald-400 to-teal-400" />

          <div className="p-6 space-y-4">
            {order ? (
              <>
                {/* Product */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center shrink-0">
                    <Package size={22} className="text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{order.productName}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      dari{" "}
                      <Link href={`/${order.sellerUsername}`} className="text-indigo-500 hover:underline">
                        @{order.sellerUsername}
                      </Link>
                    </p>
                  </div>
                  <span className="font-bold text-emerald-600 text-base shrink-0">{formatRupiah(order.amount)}</span>
                </div>

                <hr className="border-gray-100" />

                {/* Order Info */}
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Order ID</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-gray-700">{order.orderId}</span>
                      <button onClick={handleCopyOrderId} className="text-gray-300 hover:text-indigo-500 transition">
                        {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">Waktu Bayar</span>
                    <span className="text-xs text-gray-700">
                      {new Date(order.paidAt).toLocaleString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">Email Konfirmasi</span>
                    <span className="text-xs text-gray-700">{order.buyerEmail}</span>
                  </div>
                </div>

                {/* Email Notice */}
                <div className="flex items-start gap-2.5 bg-blue-50 rounded-xl px-3 py-3">
                  <Mail size={15} className="text-blue-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-blue-700">
                    Konfirmasi pembelian dan link download telah dikirim ke emailmu.
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <CheckCircle size={32} className="text-emerald-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-800">Pembayaranmu sudah diterima</p>
                <p className="text-xs text-gray-400 mt-1">Cek email untuk detail dan link download.</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {order?.downloadToken && (
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full flex items-center justify-center gap-2.5 bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-2xl font-semibold text-sm transition shadow-sm shadow-indigo-200"
            >
              {downloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
              {downloading ? "Menyiapkan unduhan…" : "Download Sekarang"}
            </button>
          )}

          {order?.sellerUsername && (
            <Link
              href={`/${order.sellerUsername}`}
              className="w-full flex items-center justify-center gap-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 py-3.5 rounded-2xl font-medium text-sm transition"
            >
              <Share2 size={16} />
              Lihat Produk Lainnya
            </Link>
          )}

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 text-gray-400 hover:text-indigo-600 py-2 text-sm transition"
          >
            Kembali ke Beranda <ArrowRight size={14} />
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-300 mt-8">
          Butuh bantuan?{" "}
          <a href="mailto:support@weiiz.ink" className="text-indigo-400 hover:underline">
            support@weiiz.ink
          </a>
        </p>
      </div>
    </div>
  );
}
