"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle, Download, ArrowRight, Package,
  Receipt, Copy, Check, Loader2,
} from "lucide-react";

interface TransactionDetail {
  id: string;
  orderId: string;
  productName: string;
  productId: string;
  amount: number;
  sellerUsername: string;
  sellerName: string;
  downloadToken?: string;
  paidAt: string;
}

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", minimumFractionDigits: 0,
  }).format(n);
}

export default function PaymentSuccessClient() {
  const params = useSearchParams();
  const orderId = params.get("order_id");
  const [tx, setTx] = useState<TransactionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [animIn, setAnimIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimIn(true), 100);
    if (orderId) fetchTransaction();
    else setLoading(false);
  }, [orderId]);

  async function fetchTransaction() {
    try {
      const res = await fetch(`/api/payment/detail?orderId=${orderId}`);
      const data = await res.json();
      setTx(data.transaction || null);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }

  const handleCopy = () => {
    if (!tx) return;
    navigator.clipboard.writeText(tx.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white flex items-center justify-center p-4">
      <div className={`w-full max-w-md transition-all duration-700 ${animIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

        {/* Success icon */}
        <div className="text-center mb-8">
          <div className="relative inline-flex">
            <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle size={48} className="text-emerald-500" strokeWidth={1.5} />
            </div>
            {/* Rings animation */}
            <div className="absolute inset-0 rounded-full border-2 border-emerald-200 animate-ping opacity-30" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-5">Pembayaran Berhasil!</h1>
          <p className="text-gray-400 text-sm mt-2">
            Terima kasih! Transaksimu telah dikonfirmasi.
          </p>
        </div>

        {/* Transaction Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5">

          {loading ? (
            <div className="py-12 flex items-center justify-center">
              <Loader2 className="animate-spin text-gray-300" size={24} />
            </div>
          ) : tx ? (
            <>
              {/* Product info */}
              <div className="p-6 border-b border-dashed border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                    <Package size={22} className="text-indigo-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 mb-0.5">Produk yang dibeli</p>
                    <p className="font-semibold text-gray-900 leading-tight">{tx.productName}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      oleh <span className="font-medium text-indigo-600">@{tx.sellerUsername}</span>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-gray-900">{formatRupiah(tx.amount)}</p>
                    <p className="text-xs text-emerald-600 font-medium mt-0.5">Lunas ✓</p>
                  </div>
                </div>
              </div>

              {/* Order ID */}
              <div className="px-6 py-4 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-2 text-sm">
                  <Receipt size={14} className="text-gray-400" />
                  <span className="text-gray-500">Order ID</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="text-xs font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded-lg">
                    {tx.orderId}
                  </code>
                  <button onClick={handleCopy}
                    className="text-gray-400 hover:text-indigo-600 transition">
                    {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              {/* Paid at */}
              <div className="px-6 py-3 flex items-center justify-between text-xs text-gray-400 border-t border-gray-50">
                <span>Waktu pembayaran</span>
                <span>{new Date(tx.paidAt).toLocaleString("id-ID", {
                  dateStyle: "medium", timeStyle: "short",
                })}</span>
              </div>
            </>
          ) : (
            <div className="p-6 text-center">
              <Receipt size={28} className="text-gray-200 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Detail transaksi tidak ditemukan</p>
              {orderId && <p className="text-xs text-gray-300 mt-1 font-mono">{orderId}</p>}
            </div>
          )}
        </div>

        {/* Download Button */}
        {tx?.downloadToken && (
          <a
            href={`/api/download/${tx.downloadToken}`}
            className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-semibold text-sm transition shadow-lg shadow-indigo-200 mb-3"
          >
            <Download size={18} />
            Download Produk
          </a>
        )}

        {/* Back to seller */}
        {tx?.sellerUsername && (
          <Link
            href={`/${tx.sellerUsername}`}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3.5 rounded-2xl text-sm font-medium transition mb-3"
          >
            Lihat produk lain dari @{tx.sellerUsername}
            <ArrowRight size={14} />
          </Link>
        )}

        <p className="text-center text-xs text-gray-300 mt-4">
          Konfirmasi pembelian telah dikirim ke email kamu.{" "}
          <Link href="/" className="text-indigo-400 hover:underline">Kembali ke beranda</Link>
        </p>

      </div>
    </div>
  );
}
