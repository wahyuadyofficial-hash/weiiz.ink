// app/dashboard/layout.tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/jwt'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import { ToastProvider } from '@/components/ui/Toast'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const token = cookieStore.get('weiiz_token')

  if (!token) redirect('/login')

  const user = await getCurrentUser()
  if (!user) redirect('/login')

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#0a0c10] flex">
        <DashboardSidebar user={user} />
        <main className="flex-1 md:ml-60 min-h-screen">
          {children}
        </main>
      </div>
    </ToastProvider>
  )
}
