"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

type ReferralLink = {
  id: string
  name: string
  url: string
  shortCode: string
  customSlug?: string
  description?: string
  clickCount?: number
  conversionCount?: number
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [referrals, setReferrals] = useState<ReferralLink[]>([])
  const [stats, setStats] = useState({
    totalClicks: 0,
    totalConversions: 0,
    conversionRate: 0,
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/login?callbackUrl=${encodeURIComponent('/dashboard')}`)
      return
    }

    if (status === "authenticated") {
      // Fetch user's referral links and stats
      const fetchDashboardData = async () => {
        try {
          const [linksRes, statsRes] = await Promise.all([
            fetch('/api/referral-links'),
            fetch('/api/stats')
          ])
          
          if (linksRes.ok) {
            const linksData = await linksRes.json()
            setReferrals(linksData.links || [])
          }
          
          if (statsRes.ok) {
            const statsData = await statsRes.json()
            setStats(statsData)
          }
        } catch (error) {
          console.error('Error fetching dashboard data:', error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchDashboardData()
    }
  }, [status, router])

  if (status === "loading" || isLoading) {
    return (
      <div className="container py-8">
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    )
  }


  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button asChild>
          <Link href="/dashboard/new" className="flex items-center gap-2">
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
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Conversions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0%</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Your Referral Links</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/referrals">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {referrals.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No referral links yet</h3>
              <p className="text-muted-foreground mb-4">
                Get started by creating your first referral link
              </p>
              <Button asChild>
                <Link href="/dashboard/new">Create Link</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {referrals.slice(0, 5).map((referral) => (
                <div key={referral.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{referral.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {referral.url}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">0 clicks</div>
                      <div className="text-sm text-muted-foreground">
                        0 conversions
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
