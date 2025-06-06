"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  LineChart, 
  BarChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"
import { Download, Calendar, TrendingUp, Users, Share2, Zap, Globe, Laptop, Smartphone, Tablet } from "lucide-react"

export default function AnalyticsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [timeframe, setTimeframe] = useState("30d")
  // Define type interfaces for our data structures
  interface StatsData {
    totalClicks: number;
    totalConversions: number;
    conversionRate: number;
    referralLinks: any[];
  }

  interface TimeSeriesData {
    date: string;
    clicks?: number;
    conversions?: number;
  }

  interface DeviceData {
    name: string;
    value: number;
  }

  interface GeoData {
    country: string;
    clicks: number;
  }

  interface ReferralData {
    id: string;
    name: string;
    clicks: number;
    conversions: number;
  }

  const [stats, setStats] = useState<StatsData>({
    totalClicks: 0,
    totalConversions: 0,
    conversionRate: 0,
    referralLinks: []
  })
  const [clickData, setClickData] = useState<TimeSeriesData[]>([])
  const [conversionData, setConversionData] = useState<TimeSeriesData[]>([])
  const [deviceData, setDeviceData] = useState<DeviceData[]>([])
  const [geoData, setGeoData] = useState<GeoData[]>([])
  const [referralData, setReferralData] = useState<ReferralData[]>([])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }

    if (status === "authenticated") {
      fetchAnalyticsData()
    }
  }, [status, timeframe, router])

  const fetchAnalyticsData = async () => {
    setIsLoading(true)
    try {
      // Fetch overall stats
      const statsResponse = await fetch(`/api/stats?timeframe=${timeframe}`)
      const statsData = await statsResponse.json()
      setStats(statsData)

      // Fetch time series data
      const timeSeriesResponse = await fetch(`/api/analytics/timeseries?timeframe=${timeframe}`)
      const timeSeriesData = await timeSeriesResponse.json()
      setClickData(timeSeriesData.clicks)
      setConversionData(timeSeriesData.conversions)

      // Fetch device data
      const deviceResponse = await fetch(`/api/analytics/devices?timeframe=${timeframe}`)
      const deviceData = await deviceResponse.json()
      setDeviceData(deviceData)

      // Fetch geographic data
      const geoResponse = await fetch(`/api/analytics/geography?timeframe=${timeframe}`)
      const geoData = await geoResponse.json()
      setGeoData(geoData)

      // Fetch referral performance data
      const referralResponse = await fetch(`/api/analytics/referrals?timeframe=${timeframe}`)
      const referralData = await referralResponse.json()
      setReferralData(referralData)
      
    } catch (error) {
      console.error("Error fetching analytics data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Device chart colors
  const DEVICE_COLORS = ["#4f46e5", "#3b82f6", "#10b981", "#f59e0b"]
  
  // Geography chart colors
  const GEO_COLORS = ["#4f46e5", "#3b82f6", "#10b981", "#f59e0b", "#f43f5e", "#8b5cf6", "#ec4899", "#06b6d4"]

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track and analyze your referral links performance.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Summary Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className="text-2xl font-bold">{stats.totalClicks}</div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className="text-2xl font-bold">{stats.totalConversions}</div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className="text-2xl font-bold">{stats.conversionRate}%</div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Links</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className="text-2xl font-bold">{stats.referralLinks?.length || 0}</div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs for different analytics views */}
      <Tabs defaultValue="traffic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
        </TabsList>
        
        {/* Traffic Tab */}
        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Overview</CardTitle>
              <CardDescription>Clicks and conversions over time</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              {isLoading ? (
                <Skeleton className="h-[350px] w-full" />
              ) : (
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart
                    data={clickData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="clicks"
                      stroke="#4f46e5"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="conversions" stroke="#10b981" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Referrals Tab */}
        <TabsContent value="referrals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Referral Performance</CardTitle>
              <CardDescription>Clicks and conversions by referral link</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              {isLoading ? (
                <Skeleton className="h-[350px] w-full" />
              ) : (
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={referralData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="clicks" fill="#4f46e5" />
                    <Bar dataKey="conversions" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Devices Tab */}
        <TabsContent value="devices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Device Breakdown</CardTitle>
              <CardDescription>Clicks by device type</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              {isLoading ? (
                <Skeleton className="h-[350px] w-full" />
              ) : (
                <div className="flex flex-col lg:flex-row items-center justify-center">
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={DEVICE_COLORS[index % DEVICE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6 lg:mt-0">
                    <div className="flex items-center space-x-2">
                      <Laptop className="h-4 w-4 text-primary" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Desktop</p>
                        <p className="text-sm text-muted-foreground">
                          {deviceData.find((d) => d.name === "Desktop")?.value || 0} clicks
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-4 w-4 text-pink-500" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Mobile</p>
                        <p className="text-sm text-muted-foreground">
                          {deviceData.find((d) => d.name === "Mobile")?.value || 0} clicks
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Tablet className="h-4 w-4 text-green-500" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Tablet</p>
                        <p className="text-sm text-muted-foreground">
                          {deviceData.find((d) => d.name === "Tablet")?.value || 0} clicks
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-yellow-500" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Other</p>
                        <p className="text-sm text-muted-foreground">
                          {deviceData.find((d) => d.name === "Other")?.value || 0} clicks
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Geography Tab */}
        <TabsContent value="geography" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Clicks by country</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              {isLoading ? (
                <Skeleton className="h-[350px] w-full" />
              ) : (
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={geoData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="country" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="clicks" fill="#4f46e5">
                      {geoData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={GEO_COLORS[index % GEO_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
