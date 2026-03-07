"use client";
export default function DashboardClient({ user }: { user: any }) {
  return (
    <div className="mt-6 p-4 bg-gray-900 rounded-xl">
      <p className="text-gray-400">Statistik untuk {user?.name} akan muncul di sini.</p>
    </div>
  );
}