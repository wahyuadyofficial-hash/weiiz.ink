"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Clock, RefreshCw, ArrowRight, AlertCircle, CreditCard, Loader2, CheckCircle } from "lucide-react";

interface OrderStatus {
  orderId: string;
  status: "pending" | "paid" | "failed" | "expired";
  productName: string;
  amount: number;
  paymentType?: string;
  vaNumber?: string;
  qrCode?: string;
  expiresAt?: string;
}

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);
}

function Countdown({ expiresAt }: { expiresAt: string }) {
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    const update = () => {
      const diff = new Date(expiresAt).getTime() - Date.now();
      if (diff <= 0) { setRemaining("Kadaluarsa"); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setRemaining(`${h > 0 ? h + "j " : ""}${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`);
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [expiresAt]);

  const isExpired = remaining === "Kadaluarsa";
  return (
    <span className={`font-mono font-bold text-base ${isExpired ? "text-red-500" : "text-amber-600"}`}>
      {remaining}
    </span>
  );
}

function PaymentPendingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order_id");

  const [order, setOrder] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);

  const fetchStatus = useCallback(async (silent = false) => {
    if (!orderId) return;
    if (!silent) setChecking(true);
    try {
      const res = await fetch(`/api/payment/status?order_id=${orderId}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setOrder(data.order);
      if (data.order?.status === "paid") {
        router.replace(`/payment/success?order_id=${orderId}`);
      } else if (data.order?.status === "failed" || data.order?.status === "expired") {
        router.replace(`/payment/failed?order_id=${orderId}`);
      }
    } catch {
      // Keep existing state
    } finally {
      setLoading(false);
      if (!silent) setChecking(false);
    }
  }, [orderId, router]);

  useEffect(() => { fetchStatus(); }, [fetchStatus]);

  useEffect(() => {
    if (!orderId) return;
    const interval = setInterval(() => fetchStatus(true), 10000);
    return () => clearInterval(interval);
  }, [orderId, fetchStatus]);

  const paymentTypeLabel: Record<string, string> = {
    bank_transfer: "Transfer Bank", qris: "QRIS", gopay: "GoPay",
    shopeepay: "ShopeePay", credit_card: "Kartu Kredit",
    indomaret: "Indomaret", alfamart: "Alfamart",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-amber-400 mx-auto mb-3" size={36} />
          <p className="text-gray-500 text-sm">Memuat status pembayaran…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
            <Clock className="text-amber-500" size={48} strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-5">Menunggu Pembayaran</h1>
          <p className="text-gray-500 text-sm mt-2">Selesaikan pembayaranmu sebelum waktu habis</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
          <div className="h-1.5 bg-gradient-to-r from-amber-400 to-orange-400" />
          <div className="p-6 space-y-5">
            {order ? (
              <>
                <div className="text-center py-2">
                  <p className="text-xs text-gray-400 mb-1">Total Pembayaran</p>
                  <p className="text-3xl font-bold text-gray-900">{formatRupiah(order.amount)}</p>
                  <p className="text-xs text-gray-500 mt-1 truncate">{order.productName}</p>
                </div>
                <hr className="border-gray-100" />
                {order.expiresAt && (
                  <div className="flex items-center justify-between bg-amber-50 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-2 text-amber-600">
                      <Clock size={15} />
                      <span className="text-xs font-medium">Batas waktu pembayaran</span>
                    </div>
                    <Countdown expiresAt={order.expiresAt} />
                  </div>
                )}
                {order.paymentType && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Metode Pembayaran</span>
                    <div className="flex items-center gap-1.5">
                      <CreditCard size={13} className="text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">{paymentTypeLabel[order.paymentType] || order.paymentType}</span>
                    </div>
                  </div>
                )}
                {order.vaNumber && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Nomor Virtual Account</p>
                    <p className="text-xl font-mono font-bold text-gray-900 tracking-widest">{order.vaNumber}</p>
                    <button onClick={() => navigator.clipboard.writeText(order.vaNumber!)} className="text-xs text-indigo-500 hover:underline mt-1">
                      Salin nomor VA
                    </button>
                  </div>
                )}
                {order.qrCode && (
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-3">Scan QR Code</p>
                    <img src={order.qrCode} alt="QR Code" className="w-48 h-48 mx-auto rounded-xl border border-gray-100" />
                  </div>
                )}
                <div className="flex justify-between items-center pt-1">
                  <span className="text-xs text-gray-400">Order ID</span>
                  <span className="text-xs font-mono text-gray-600">{order.orderId}</span>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <AlertCircle size={32} className="text-amber-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Pembayaran sedang diproses. Cek email untuk instruksi lengkap.</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Otomatis cek status setiap 10 detik
        </div>

        <div className="space-y-3">
          <button onClick={() => fetchStatus()} disabled={checking}
            className="w-full flex items-center justify-center gap-2.5 border border-indigo-200 text-indigo-600 hover:bg-indigo-50 py-3.5 rounded-2xl font-medium text-sm transition">
            {checking ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
            {checking ? "Mengecek…" : "Cek Status Sekarang"}
          </button>
          <div className="flex items-center gap-2 bg-sky-50 rounded-xl px-4 py-3">
            <CheckCircle size={15} className="text-sky-500 shrink-0" />
            <p className="text-xs text-sky-700">Halaman akan otomatis redirect setelah pembayaran dikonfirmasi.</p>
          </div>
          <Link href="/" className="w-full flex items-center justify-center gap-2 text-gray-400 hover:text-indigo-600 py-2 text-sm transition">
            Kembali ke Beranda <ArrowRight size={14} />
          </Link>
        </div>
        <p className="text-center text-xs text-gray-300 mt-8">
          Butuh bantuan?{" "}
          <a href="mailto:support@weiiz.ink" className="text-indigo-400 hover:underline">support@weiiz.ink</a>
        </p>
      </div>
    </div>
  );
}

export default function PaymentPendingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <Loader2 className="animate-spin text-amber-400" size={36} />
      </div>
    }>
      <PaymentPendingContent />
    </Suspense>
  );
}
