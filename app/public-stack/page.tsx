"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ReferralCard from "@/components/referral-card"
import RobotAvatar from "@/components/robot-avatar"
import Link from "next/link"
import { Share2, Download, Settings, Palette, Eye, Users, TrendingUp, ExternalLink } from "lucide-react"

export default function PublicStackPage() {
  const [selectedTheme, setSelectedTheme] = useState("default")

  // Theme configurations
  const themes = {
    default: {
      name: "Ocean Blue",
      gradient: "from-blue-950 via-indigo-950 to-purple-950",
      cardBg: "bg-blue-950/40",
      cardBorder: "border-blue-800/50",
      accent: "bg-blue-600",
      textPrimary: "text-white",
      textSecondary: "text-blue-200/80",
    },
    sunset: {
      name: "Sunset Glow",
      gradient: "from-orange-950 via-red-950 to-pink-950",
      cardBg: "bg-orange-950/40",
      cardBorder: "border-orange-800/50",
      accent: "bg-orange-600",
      textPrimary: "text-white",
      textSecondary: "text-orange-200/80",
    },
    forest: {
      name: "Forest Green",
      gradient: "from-green-950 via-emerald-950 to-teal-950",
      cardBg: "bg-green-950/40",
      cardBorder: "border-green-800/50",
      accent: "bg-green-600",
      textPrimary: "text-white",
      textSecondary: "text-green-200/80",
    },
    midnight: {
      name: "Midnight Purple",
      gradient: "from-purple-950 via-violet-950 to-indigo-950",
      cardBg: "bg-purple-950/40",
      cardBorder: "border-purple-800/50",
      accent: "bg-purple-600",
      textPrimary: "text-white",
      textSecondary: "text-purple-200/80",
    },
  }

  const currentTheme = themes[selectedTheme]

  // Update the referrals array to include the displayOrder field
  const allReferrals = [
    {
      id: "1",
      name: "Dropbox",
      category: "Tech",
      url: "https://refstack.me/dropbox",
      clicks: 12,
      conversions: 2,
      status: "active",
      dateCreated: "2025-04-15",
      logoColor: "bg-blue-500",
      includeInPublicStack: true,
      displayOrder: 1,
    },
    {
      id: "2",
      name: "Coinbase",
      category: "Crypto",
      url: "https://refstack.me/coinbase",
      clicks: 34,
      conversions: 5,
      status: "active",
      dateCreated: "2025-04-10",
      logoColor: "bg-blue-500",
      includeInPublicStack: true,
      displayOrder: 2,
    },
    {
      id: "3",
      name: "RefStack",
      category: "Finance",
      url: "https://refstack.me/refstack",
      clicks: 8,
      conversions: 1,
      status: "active",
      dateCreated: "2025-04-05",
      logoColor: "bg-teal-400",
      includeInPublicStack: true,
      displayOrder: 3,
    },
    {
      id: "4",
      name: "Robinhood",
      category: "Finance",
      url: "https://refstack.me/robinhood",
      clicks: 19,
      conversions: 3,
      status: "active",
      dateCreated: "2025-03-28",
      logoColor: "bg-teal-400",
      includeInPublicStack: true,
      displayOrder: 4,
    },
    {
      id: "5",
      name: "Notion",
      category: "Productivity",
      url: "https://refstack.me/notion",
      clicks: 7,
      conversions: 0,
      status: "active",
      dateCreated: "2025-03-15",
      logoColor: "bg-gray-500",
      includeInPublicStack: true,
      displayOrder: 5,
    },
    {
      id: "6",
      name: "Spotify",
      category: "Entertainment",
      url: "https://refstack.me/spotify",
      clicks: 15,
      conversions: 2,
      status: "active",
      dateCreated: "2025-03-10",
      logoColor: "bg-green-500",
      includeInPublicStack: true,
      displayOrder: 6,
    },
  ]

  // Filter to only show referrals included in public stack and sort by display order
  const publicReferrals = allReferrals
    .filter((referral) => referral.includeInPublicStack)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))

  // Calculate stats from public referrals only
  const totalClicks = publicReferrals.reduce((sum, ref) => sum + ref.clicks, 0)
  const totalReferralCards = publicReferrals.length
  const avgClicksPerCard = totalReferralCards > 0 ? (totalClicks / totalReferralCards).toFixed(1) : "0.0"
  const totalConversions = publicReferrals.reduce((sum, ref) => sum + ref.conversions, 0)

  return (
    <div className={`min-h-screen bg-gradient-to-b ${currentTheme.gradient} text-white`}>
      {/* Floating Theme Selector */}
      <div className="fixed top-20 right-4 z-50">
        <div
          className={`${currentTheme.cardBg} backdrop-blur-md border ${currentTheme.cardBorder} rounded-2xl p-4 shadow-lg`}
        >
          <div className="flex items-center gap-2 mb-3">
            <Palette className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium">Theme</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => setSelectedTheme(key)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  selectedTheme === key ? "border-white scale-110" : "border-transparent"
                }`}
                style={{
                  background: `linear-gradient(135deg, ${
                    key === "default"
                      ? "#1e3a8a, #7c3aed"
                      : key === "sunset"
                        ? "#ea580c, #ec4899"
                        : key === "forest"
                          ? "#166534, #0f766e"
                          : "#7c2d12, #6b21a8"
                  })`,
                }}
                title={theme.name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/">
            <div
              className={`flex items-center space-x-2 ${currentTheme.cardBg} backdrop-blur-md rounded-full py-2 px-4 border ${currentTheme.cardBorder} shadow-[0_0_10px_rgba(59,130,246,0.3)]`}
            >
              <div className={`${currentTheme.accent} rounded-full p-1 flex items-center justify-center`}>
                <span className="text-white text-lg">▶</span>
              </div>
              <span className="font-bold text-lg">RefStack.me</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 ${currentTheme.cardBg} backdrop-blur-md rounded-full py-2 px-4 border ${currentTheme.cardBorder} hover:bg-opacity-60 transition-colors`}
            >
              <span className="text-sm font-medium">Dashboard</span>
              <ExternalLink className="h-4 w-4 text-blue-400" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container - Referral Card Layout */}
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        {/* Referral Card Container */}
        <div className="relative mb-8">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-xl"></div>

          <div
            className={`relative ${currentTheme.cardBg} backdrop-blur-md border ${currentTheme.cardBorder} rounded-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden`}
          >
            {/* Header Section */}
            <div className="p-6 md:p-8 border-b border-white/10">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Profile Avatar */}
                <div className="flex-shrink-0">
                  <RobotAvatar />
                </div>

                {/* Profile Info */}
                <div className="text-center md:text-left flex-1">
                  <h1 className={`text-3xl md:text-5xl font-bold mb-2 ${currentTheme.textPrimary}`}>abuckmaster94</h1>
                  <p className={`text-lg ${currentTheme.textSecondary} mb-4`}>
                    Tech enthusiast sharing the best tools and services I use daily. Each link helps support my content
                    creation journey! 🚀
                  </p>

                  {/* Social Links */}
                  <div className="flex justify-center md:justify-start gap-4 mb-4">
                    <a
                      href="#"
                      className={`${currentTheme.cardBg} border ${currentTheme.cardBorder} rounded-full p-2 hover:bg-opacity-60 transition-colors`}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className={`${currentTheme.cardBg} border ${currentTheme.cardBorder} rounded-full p-2 hover:bg-opacity-60 transition-colors`}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className={`${currentTheme.cardBg} border ${currentTheme.cardBorder} rounded-full p-2 hover:bg-opacity-60 transition-colors`}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <Button
                      className={`${currentTheme.accent} hover:opacity-90 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)] border border-blue-500/50`}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Stack
                    </Button>
                    <Button variant="outline" className={`border-white/20 text-white hover:bg-white/10`}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" className={`border-white/20 text-white hover:bg-white/10`}>
                      <Settings className="h-4 w-4 mr-2" />
                      Customize
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="p-6 md:p-8 border-b border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold mb-1">{totalClicks}</div>
                  <div className={`text-sm ${currentTheme.textSecondary} flex items-center justify-center gap-1`}>
                    <Eye className="h-4 w-4" />
                    Total Clicks
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold mb-1">{totalConversions}</div>
                  <div className={`text-sm ${currentTheme.textSecondary} flex items-center justify-center gap-1`}>
                    <TrendingUp className="h-4 w-4" />
                    Conversions
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold mb-1">{totalReferralCards}</div>
                  <div className={`text-sm ${currentTheme.textSecondary} flex items-center justify-center gap-1`}>
                    <Users className="h-4 w-4" />
                    Active Links
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold mb-1">{avgClicksPerCard}</div>
                  <div className={`text-sm ${currentTheme.textSecondary}`}>Avg. per Link</div>
                </div>
              </div>
            </div>

            {/* Referral Links Section */}
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">My Referral Stack</h2>
                <div
                  className={`${currentTheme.cardBg} border ${currentTheme.cardBorder} rounded-full px-3 py-1 text-sm`}
                >
                  {publicReferrals.length} active links
                </div>
              </div>

              {/* Referral Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {publicReferrals.map((referral, index) => (
                  <div key={referral.id} className="relative">
                    {/* Display order indicator */}
                    <div
                      className={`absolute -top-2 -left-2 ${currentTheme.accent} text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg z-10`}
                    >
                      {index + 1}
                    </div>
                    <ReferralCard
                      category={referral.category}
                      company={referral.name}
                      logo={`/${referral.name.toLowerCase()}-logo.svg`}
                      logoColor={referral.logoColor}
                      hasExternalLink={referral.status === "active"}
                    />
                  </div>
                ))}
                {publicReferrals.length === 0 && (
                  <div className="col-span-2 text-center py-12">
                    <p className={`text-xl ${currentTheme.textSecondary}`}>No referrals in public stack yet</p>
                    <p className={`${currentTheme.textSecondary} mt-2 opacity-60`}>
                      Add some referrals to your public stack from the dashboard
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Section */}
            <div className={`p-6 md:p-8 border-t border-white/10 text-center ${currentTheme.textSecondary}`}>
              <p className="mb-4">
                💡 <strong>Pro Tip:</strong> Using my referral links helps support my content creation and doesn't cost
                you anything extra!
              </p>
              <div className="flex justify-center items-center gap-2 text-sm opacity-75">
                <span>Powered by</span>
                <Link href="/" className="font-bold hover:text-white transition-colors">
                  RefStack.me
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button
            className={`${currentTheme.accent} hover:opacity-90 text-white text-xl py-6 px-12 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-blue-500/50 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]`}
            onClick={() => window.open("/register", "_blank")}
          >
            Build Your Own Referral Stack
          </Button>
        </div>
      </div>
    </div>
  )
}
