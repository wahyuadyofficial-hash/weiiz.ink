import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import DashboardClient from "./DashboardClient"; // Kita pindahkan logika state ke sini nanti

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { name: true, username: true }
  });

  return (
    <main className="p-8 max-w-7xl mx-auto bg-[#0a0c10] min-h-screen text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Selamat datang, {user?.name}! 👋</h1>
        <p className="text-gray-400">weiiz.ink/{user?.username}</p>
      </div>
      
      {/* Panggil komponen client untuk fetch data stats & chart */}
      <DashboardClient user={user} />
    </main>
  );
}