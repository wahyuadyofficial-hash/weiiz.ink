// app/admin/layout.tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/jwt'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { ToastProvider } from '@/components/ui/Toast'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const token = cookieStore.get('weiiz_token')
  if (!token) redirect('/login')

  const user = await getCurrentUser()
  if (!user || user.role !== 'ADMIN') redirect('/dashboard')

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#080a0f] flex">
        <AdminSidebar />
        <main className="flex-1 md:ml-56 min-h-screen">
          {children}
        </main>
      </div>
    </ToastProvider>
  )
}
