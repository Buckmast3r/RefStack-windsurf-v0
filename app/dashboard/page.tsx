"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ReferralLink {
  id: string
  name: string
  url: string
  shortCode: string
  customSlug?: string
  description?: string
  clickCount?: number
  conversionCount?: number
  createdAt: string
  updatedAt: string
}

interface DashboardStats {
  totalClicks: number
  totalConversions: number
  conversionRate: number
  recentActivity: Array<{
    id: string
    type: string
    description: string
    timestamp: string
  }>
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [referrals, setReferrals] = useState<ReferralLink[]>([])
  const [stats, setStats] = useState<DashboardStats>({
    totalClicks: 0,
    totalConversions: 0,
    conversionRate: 0,
    recentActivity: []
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/login?callbackUrl=${encodeURIComponent('/dashboard')}`)
      return
    }

    if (status === "authenticated") {
      fetchDashboardData()
    }
  }, [status, router])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      
      const [linksRes, statsRes] = await Promise.all([
        fetch('/api/referral-links'),
        fetch('/api/stats')
      ])
      
      if (linksRes.ok) {
        const data = await linksRes.json()
        setReferrals(data.links || [])
      }
      
      if (statsRes.ok) {
        const data = await statsRes.json()
        setStats({
          totalClicks: data.totalClicks || 0,
          totalConversions: data.totalConversions || 0,
          conversionRate: data.conversionRate || 0,
          recentActivity: data.recentActivity || []
        })
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num)
  }

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-10 w-40" />
        </div>
        
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-96 rounded-lg" />
          <Skeleton className="h-96 rounded-lg" />
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button asChild>
          <Link href="/dashboard/referrals/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Referral Link
          </Link>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Clicks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(stats.totalClicks)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Conversions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(stats.totalConversions)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Referral Links */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Referral Links</CardTitle>
          </CardHeader>
          <CardContent>
            {referrals.length > 0 ? (
              <div className="space-y-4">
                {referrals.slice(0, 5).map((link) => (
                  <div key={link.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{link.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {link.clickCount || 0} clicks • {link.conversionCount || 0} conversions
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/referrals/${link.id}`}>
                        View
                      </Link>
                    </Button>
                  </div>
                ))}
                {referrals.length > 5 && (
                  <div className="text-center">
                    <Button variant="ghost" asChild>
                      <Link href="/dashboard/referrals">
                        View all links
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No referral links yet</p>
                <Button asChild>
                  <Link href="/dashboard/referrals/new">
                    Create your first link
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentActivity.length > 0 ? (
              <div className="space-y-4">
                {stats.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="text-sm">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No recent activity</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
