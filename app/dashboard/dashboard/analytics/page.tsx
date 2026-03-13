"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  Users,
  Eye,
  DollarSign,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  BarChart2,
  Activity,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────
interface DailyStat {
  date: string;
  views: number;
  revenue: number;
  sales: number;
}

interface TopProduct {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  category: string;
}

interface TrafficSource {
  source: string;
  visits: number;
  percentage: number;
}

interface AnalyticsData {
  totalViews: number;
  totalRevenue: number;
  totalSales: number;
  totalFollowers: number;
  viewsChange: number;
  revenueChange: number;
  salesChange: number;
  followersChange: number;
  daily: DailyStat[];
  topProducts: TopProduct[];
  trafficSources: TrafficSource[];
}

type Range = "7d" | "30d" | "90d";

// ─── Helpers ──────────────────────────────────────────────
function formatRupiah(n: number) {
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(1)}jt`;
  if (n >= 1_000) return `Rp ${(n / 1_000).toFixed(0)}rb`;
  return `Rp ${n}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

// ─── Stat Card ────────────────────────────────────────────
function StatCard({
  label,
  value,
  change,
  icon: Icon,
  color,
  prefix,
}: {
  label: string;
  value: number;
  change: number;
  icon: React.ElementType;
  color: string;
  prefix?: string;
}) {
  const up = change >= 0;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={18} />
        </div>
        <span
          className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
            up ? "text-emerald-700 bg-emerald-50" : "text-red-600 bg-red-50"
          }`}
        >
          {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {Math.abs(change)}%
        </span>
      </div>
      <p className="text-2xl font-bold text-gray-900 mt-3">
        {prefix}
        {value.toLocaleString("id-ID")}
      </p>
      <p className="text-xs text-gray-400 mt-1">{label}</p>
    </div>
  );
}

// ─── Mini Bar Chart ───────────────────────────────────────
function BarChart({
  data,
  dataKey,
  color,
  label,
}: {
  data: DailyStat[];
  dataKey: "views" | "revenue" | "sales";
  color: string;
  label: string;
}) {
  const max = Math.max(...data.map((d) => d[dataKey]), 1);
  const formatVal = (v: number) =>
    dataKey === "revenue" ? formatRupiah(v) : v.toLocaleString("id-ID");

  return (
    <div>
      <p className="text-xs font-medium text-gray-500 mb-3">{label}</p>
      <div className="flex items-end gap-1 h-28">
        {data.map((d, i) => {
          const h = Math.max((d[dataKey] / max) * 100, 2);
          return (
            <div
              key={i}
              className="relative flex-1 group flex flex-col items-center justify-end"
            >
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-10 pointer-events-none">
                <div className="bg-gray-900 text-white text-[10px] rounded-lg px-2 py-1 whitespace-nowrap shadow">
                  <p className="font-semibold">{formatVal(d[dataKey])}</p>
                  <p className="opacity-60">{formatDate(d.date)}</p>
                </div>
                <div className="w-1.5 h-1.5 bg-gray-900 rotate-45 -mt-0.5" />
              </div>
              <div
                style={{ height: `${h}%` }}
                className={`w-full rounded-t-lg transition-all duration-300 ${color} opacity-80 group-hover:opacity-100`}
              />
            </div>
          );
        })}
      </div>
      {/* X-axis dates */}
      <div className="flex mt-1">
        {data.map((d, i) => (
          <div key={i} className="flex-1 text-center">
            {(i === 0 || i === Math.floor(data.length / 2) || i === data.length - 1) && (
              <span className="text-[9px] text-gray-300">{formatDate(d.date)}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Traffic Source Row ────────────────────────────────────
function TrafficRow({ source, visits, percentage }: TrafficSource) {
  const colors: Record<string, string> = {
    Direct: "bg-indigo-500",
    Instagram: "bg-pink-500",
    TikTok: "bg-gray-900",
    Twitter: "bg-sky-500",
    WhatsApp: "bg-emerald-500",
    Other: "bg-gray-300",
  };
  return (
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full shrink-0 ${colors[source] || "bg-gray-300"}`} />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between text-xs mb-1">
          <span className="font-medium text-gray-700">{source}</span>
          <span className="text-gray-400">{visits.toLocaleString("id-ID")} kunjungan</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            style={{ width: `${percentage}%` }}
            className={`h-full rounded-full ${colors[source] || "bg-gray-300"} transition-all duration-700`}
          />
        </div>
      </div>
      <span className="text-xs font-semibold text-gray-500 w-10 text-right shrink-0">
        {percentage}%
      </span>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────
export default function AnalyticsPage() {
  const [range, setRange] = useState<Range>("30d");
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);

  async function fetchAnalytics() {
    setLoading(true);
    try {
      const res = await fetch(`/api/analytics?range=${range}`);
      if (!res.ok) throw new Error();
      const json = await res.json();
      setData(json);
    } catch {
      // Fallback demo data so UI isn't broken
      setData(generateDemoData(range));
    } finally {
      setLoading(false);
    }
  }

  const rangeLabel: Record<Range, string> = {
    "7d": "7 Hari",
    "30d": "30 Hari",
    "90d": "90 Hari",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Activity className="mx-auto text-indigo-400 mb-3 animate-pulse" size={36} />
          <p className="text-gray-500 text-sm">Memuat statistik…</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart2 className="text-indigo-600" size={24} />
              Analitik
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Pantau performa halaman dan penjualanmu
            </p>
          </div>
          {/* Range Selector */}
          <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {(["7d", "30d", "90d"] as Range[]).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-4 py-2 text-sm font-medium transition ${
                  range === r
                    ? "bg-indigo-600 text-white"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {rangeLabel[r]}
              </button>
            ))}
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard label="Total Kunjungan" value={data.totalViews} change={data.viewsChange} icon={Eye} color="text-indigo-600 bg-indigo-50" />
          <StatCard label="Total Revenue" value={data.totalRevenue} change={data.revenueChange} icon={DollarSign} color="text-emerald-600 bg-emerald-50" prefix="Rp " />
          <StatCard label="Total Penjualan" value={data.totalSales} change={data.salesChange} icon={ShoppingBag} color="text-amber-600 bg-amber-50" />
          <StatCard label="Followers" value={data.totalFollowers} change={data.followersChange} icon={Users} color="text-purple-600 bg-purple-50" />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">

          {/* Views Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-semibold text-gray-900 text-sm">Grafik Kunjungan</h2>
                <p className="text-xs text-gray-400 mt-0.5">{rangeLabel[range]} terakhir</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Calendar size={13} />
                {formatDate(data.daily[0]?.date)} – {formatDate(data.daily[data.daily.length - 1]?.date)}
              </div>
            </div>
            <BarChart data={data.daily} dataKey="views" color="bg-indigo-400" label="Kunjungan Harian" />
          </div>

          {/* Traffic Sources */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 text-sm mb-1">Sumber Traffic</h2>
            <p className="text-xs text-gray-400 mb-5">{rangeLabel[range]} terakhir</p>
            <div className="space-y-4">
              {data.trafficSources.map((s) => (
                <TrafficRow key={s.source} {...s} />
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Chart + Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-semibold text-gray-900 text-sm">Grafik Revenue</h2>
                <p className="text-xs text-gray-400 mt-0.5">{rangeLabel[range]} terakhir</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{formatRupiah(data.totalRevenue)}</p>
                <p className="text-xs text-emerald-600 flex items-center justify-end gap-0.5">
                  <TrendingUp size={11} />
                  +{data.revenueChange}% vs periode sebelumnya
                </p>
              </div>
            </div>
            <BarChart data={data.daily} dataKey="revenue" color="bg-emerald-400" label="Revenue Harian" />
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 text-sm mb-1">Produk Terlaris</h2>
            <p className="text-xs text-gray-400 mb-4">{rangeLabel[range]} terakhir</p>
            {data.topProducts.length === 0 ? (
              <div className="text-center py-8 text-gray-300">
                <ShoppingBag size={32} className="mx-auto mb-2" />
                <p className="text-xs">Belum ada penjualan</p>
              </div>
            ) : (
              <div className="space-y-3">
                {data.topProducts.map((p, i) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 truncate">{p.name}</p>
                      <p className="text-[10px] text-gray-400">{p.category}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-semibold text-gray-700">{formatRupiah(p.revenue)}</p>
                      <p className="text-[10px] text-gray-400">{p.sales} terjual</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sales Timeline */}
        <div className="mt-5 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 text-sm mb-5">Penjualan Harian</h2>
          <BarChart data={data.daily} dataKey="sales" color="bg-amber-400" label="Unit Terjual" />
        </div>

      </div>
    </div>
  );
}

// ─── Demo data generator (fallback jika API belum siap) ────
function generateDemoData(range: Range): AnalyticsData {
  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const daily: DailyStat[] = Array.from({ length: days }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (days - 1 - i));
    return {
      date: d.toISOString().split("T")[0],
      views: Math.floor(Math.random() * 200) + 50,
      revenue: Math.floor(Math.random() * 500_000) + 50_000,
      sales: Math.floor(Math.random() * 8),
    };
  });

  return {
    totalViews: daily.reduce((s, d) => s + d.views, 0),
    totalRevenue: daily.reduce((s, d) => s + d.revenue, 0),
    totalSales: daily.reduce((s, d) => s + d.sales, 0),
    totalFollowers: 342,
    viewsChange: 12,
    revenueChange: 8,
    salesChange: 23,
    followersChange: 5,
    daily,
    topProducts: [
      { id: "1", name: "Ebook UI/UX Pemula", sales: 24, revenue: 1_200_000, category: "E-Book" },
      { id: "2", name: "Template Notion Produktif", sales: 18, revenue: 900_000, category: "Template" },
      { id: "3", name: "Preset Lightroom VSCo Style", sales: 15, revenue: 450_000, category: "Preset" },
    ],
    trafficSources: [
      { source: "Instagram", visits: 1840, percentage: 48 },
      { source: "Direct", visits: 920, percentage: 24 },
      { source: "TikTok", visits: 570, percentage: 15 },
      { source: "WhatsApp", visits: 380, percentage: 10 },
      { source: "Other", visits: 115, percentage: 3 },
    ],
  };
}
