import React from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { 
  Layers, 
  CreditCard,
  UserCircle,
  Bell,
  BarChart,
  LogOut
} from "lucide-react"

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Server-side authentication check
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect("/login?callbackUrl=/dashboard")
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 bg-background border-r">
        <div className="flex h-14 items-center border-b px-4">
          <Link
            href="/"
            className="flex items-center font-semibold"
          >
            <span className="text-primary font-bold">RefStack</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent transition-all"
            >
              <BarChart className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/referrals"
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent transition-all"
            >
              <Layers className="h-4 w-4" />
              Referral Links
            </Link>
            <Link
              href="/dashboard/subscription"
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent transition-all"
            >
              <CreditCard className="h-4 w-4" />
              Subscription
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent transition-all"
            >
              <UserCircle className="h-4 w-4" />
              Profile
            </Link>
            <Link
              href="/dashboard/notifications"
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent transition-all"
            >
              <Bell className="h-4 w-4" />
              Notifications
            </Link>
            <Link
              href="/api/auth/signout"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-all mt-auto"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4 border-t">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="rounded-full bg-primary/10 p-1">
              <UserCircle className="h-5 w-5 text-primary" />
            </div>
            <div className="text-sm">
              <p className="font-medium">{session.user?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground">{session.user?.email}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile header */}
      <div className="md:hidden flex h-14 items-center px-4 border-b sticky top-0 z-10 bg-background">
        <Link
          href="/"
          className="flex items-center font-semibold"
        >
          <span className="text-primary font-bold">RefStack</span>
        </Link>
        
        {/* Mobile menu button would go here */}
      </div>
      
      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <main>{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
