"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircle, RefreshCw, ArrowRight, MessageCircle, Loader2, AlertTriangle, Home } from "lucide-react";

interface FailedOrder {
  orderId: string;
  productName: string;
  sellerUsername: string;
  amount: number;
  failReason?: string;
  status: "failed" | "expired" | "cancel";
}

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);
}

const FAIL_REASONS: Record<string, { title: string; desc: string }> = {
  expired: { title: "Waktu Pembayaran Habis", desc: "Batas waktu untuk menyelesaikan pembayaran ini telah lewat." },
  cancel: { title: "Pembayaran Dibatalkan", desc: "Kamu membatalkan proses pembayaran." },
  deny: { title: "Pembayaran Ditolak", desc: "Bank atau penyedia pembayaranmu menolak transaksi ini." },
  failed: { title: "Pembayaran Gagal", desc: "Terjadi kesalahan saat memproses pembayaran." },
};

function PaymentFailedContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const statusCode = searchParams.get("status_code");
  const transactionStatus = searchParams.get("transaction_status") || "failed";

  const [order, setOrder] = useState<FailedOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [retrying, setRetrying] = useState(false);

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
      // Show generic error
    } finally {
      setLoading(false);
    }
  }

  async function handleRetry() {
    if (!order) return;
    setRetrying(true);
    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.orderId, retry: true }),
      });
      const data = await res.json();
      if (data.redirectUrl) window.location.href = data.redirectUrl;
    } catch {
      alert("Gagal membuat ulang pembayaran. Coba lagi.");
    } finally {
      setRetrying(false);
    }
  }

  const reasonKey = transactionStatus in FAIL_REASONS ? transactionStatus : "failed";
  const reason = FAIL_REASONS[reasonKey];
  const isExpired = transactionStatus === "expired";

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center">
        <Loader2 className="animate-spin text-red-300" size={36} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-1 bg-red-100">
            {isExpired
              ? <AlertTriangle className="text-amber-500" size={48} strokeWidth={1.5} />
              : <XCircle className="text-red-500" size={52} strokeWidth={1.5} />}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-5">{reason.title}</h1>
          <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto">{reason.desc}</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
          <div className={`h-1.5 ${isExpired ? "bg-gradient-to-r from-amber-400 to-orange-400" : "bg-gradient-to-r from-red-400 to-pink-500"}`} />
          <div className="p-6 space-y-4">
            {order ? (
              <>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">Produk</span>
                    <span className="text-sm font-medium text-gray-800 text-right max-w-[200px] truncate">{order.productName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">Jumlah</span>
                    <span className="text-sm font-bold text-gray-800">{formatRupiah(order.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">Order ID</span>
                    <span className="text-xs font-mono text-gray-600">{order.orderId}</span>
                  </div>
                  {statusCode && (
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Kode Status</span>
                      <span className="text-xs text-gray-600">{statusCode}</span>
                    </div>
                  )}
                </div>
                <hr className="border-gray-100" />
                <div className="flex items-start gap-2.5 bg-blue-50 rounded-xl px-3 py-3">
                  <MessageCircle size={15} className="text-blue-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-blue-700">Tidak ada dana yang dipotong dari akunmu. Jika ada kejanggalan, hubungi kami.</p>
                </div>
              </>
            ) : (
              <div className="text-center py-4 text-gray-500 text-sm">
                Pembayaran tidak dapat diselesaikan. Tidak ada dana yang dipotong.
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 mb-4">
          <p className="text-xs font-semibold text-gray-500 mb-2.5">💡 Saran untuk coba lagi:</p>
          <ul className="space-y-1.5 text-xs text-gray-500">
            <li className="flex items-start gap-1.5"><span className="text-gray-300 mt-0.5">•</span> Pastikan saldo cukup</li>
            <li className="flex items-start gap-1.5"><span className="text-gray-300 mt-0.5">•</span> Coba metode pembayaran lain</li>
            <li className="flex items-start gap-1.5"><span className="text-gray-300 mt-0.5">•</span> Periksa koneksi internet</li>
            <li className="flex items-start gap-1.5"><span className="text-gray-300 mt-0.5">•</span> Hubungi bank jika kartu ditolak</li>
          </ul>
        </div>

        <div className="space-y-3">
          {order && (
            <button onClick={handleRetry} disabled={retrying}
              className="w-full flex items-center justify-center gap-2.5 bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-2xl font-semibold text-sm transition shadow-sm shadow-indigo-200">
              {retrying ? <Loader2 size={18} className="animate-spin" /> : <RefreshCw size={18} />}
              {retrying ? "Memproses…" : "Coba Bayar Lagi"}
            </button>
          )}
          {order?.sellerUsername && (
            <Link href={`/${order.sellerUsername}`}
              className="w-full flex items-center justify-center gap-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 py-3.5 rounded-2xl font-medium text-sm transition">
              <Home size={16} />
              Kembali ke Halaman Penjual
            </Link>
          )}
          <Link href="/" className="w-full flex items-center justify-center gap-2 text-gray-400 hover:text-indigo-600 py-2 text-sm transition">
            Kembali ke Beranda <ArrowRight size={14} />
          </Link>
        </div>
        <p className="text-center text-xs text-gray-300 mt-8">
          Masih ada masalah?{" "}
          <a href="mailto:support@weiiz.ink" className="text-indigo-400 hover:underline">Hubungi support</a>
        </p>
      </div>
    </div>
  );
}

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center">
        <Loader2 className="animate-spin text-red-300" size={36} />
      </div>
    }>
      <PaymentFailedContent />
    </Suspense>
  );
}
