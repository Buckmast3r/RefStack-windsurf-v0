"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  LinkIcon,
  BarChart3,
  Users,
  Shield,
  Zap,
  Globe,
  Palette,
  Clock,
  Code,
  Eye,
  Target,
  TrendingUp,
  MapPin,
  Calendar,
  Settings,
  Crown,
  Check,
  X,
  ArrowRight,
  Sparkles,
  Lock,
  Smartphone,
} from "lucide-react"

export default function FeaturesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("core")

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const coreFeatures = [
    {
      icon: <LinkIcon className="h-6 w-6" />,
      title: "Smart Link Management",
      description:
        "Create, organize, and manage all your referral links in one centralized dashboard with custom URLs and intelligent categorization.",
      features: [
        "Unlimited referral links (Pro)",
        "Custom URL slugs",
        "Bulk link operations",
        "Link categorization",
        "Quick copy & share",
      ],
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Advanced Analytics",
      description:
        "Track performance with detailed analytics including click-through rates, geographic data, conversion tracking, and revenue insights.",
      features: [
        "Real-time click tracking",
        "Geographic analytics",
        "Conversion tracking",
        "Revenue attribution",
        "Performance insights",
      ],
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Audience Targeting",
      description:
        "Create custom landing pages and referral experiences tailored to different audiences and traffic sources.",
      features: [
        "Custom landing pages",
        "Audience segmentation",
        "A/B testing",
        "Traffic source tracking",
        "Personalized experiences",
      ],
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Fraud Protection",
      description:
        "Advanced security features to prevent referral fraud, click abuse, and protect your earnings with intelligent monitoring.",
      features: [
        "Click fraud detection",
        "IP monitoring",
        "Bot protection",
        "Suspicious activity alerts",
        "Whitelist/blacklist controls",
      ],
    },
  ]

  const managementFeatures = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Quick Actions",
      description: "Streamlined workflows for common tasks",
      isPro: false,
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Link Scheduling",
      description: "Schedule links to activate/deactivate automatically",
      isPro: true,
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Auto-Expiring Links",
      description: "Time-based link control for limited promotions",
      isPro: true,
      isAddon: true,
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Smart Categorization",
      description: "Organize links by category, performance, or custom tags",
      isPro: false,
    },
  ]

  const analyticsFeatures = [
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Basic Analytics",
      description: "View counts and basic performance metrics",
      isPro: false,
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Advanced Analytics",
      description: "CTR, conversion rates, and revenue tracking",
      isPro: true,
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Geographic Insights",
      description: "See where your clicks are coming from worldwide",
      isPro: true,
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Top Performer Insights",
      description: "Identify your best-performing referrals",
      isPro: true,
    },
  ]

  const customizationFeatures = [
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Custom Themes",
      description: "Personalize your referral pages with custom branding",
      isPro: true,
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Custom Domain",
      description: "Use your own domain like links.mysite.com",
      isPro: true,
      isAddon: true,
    },
    {
      icon: <Crown className="h-6 w-6" />,
      title: "White-Label Solution",
      description: "Remove all RefStack branding completely",
      isPro: true,
      isAddon: true,
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Advanced Layouts",
      description: "Media embeds and custom page layouts",
      isPro: true,
    },
  ]

  const integrationFeatures = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Developer API",
      description: "Full REST API for custom integrations",
      isPro: true,
      isAddon: true,
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Webhook Support",
      description: "Real-time notifications for events",
      isPro: true,
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "SSO Integration",
      description: "Single sign-on with your existing systems",
      isPro: true,
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile Optimization",
      description: "Fully responsive on all devices",
      isPro: false,
    },
  ]

  const comparisonFeatures = [
    { name: "Referral Links", free: "Up to 5", pro: "Unlimited" },
    { name: "Analytics", free: "Basic (views only)", pro: "Advanced (CTR, geography, etc.)" },
    { name: "Themes", free: "Default theme", pro: "Custom branding & themes" },
    { name: "Support", free: "Standard", pro: "Priority" },
    { name: "Custom URL Slugs", free: false, pro: true },
    { name: "Link Scheduling", free: false, pro: true },
    { name: "Profile Pages", free: false, pro: true },
    { name: "Conversion Tracking", free: false, pro: true },
    { name: "Advanced Layouts", free: false, pro: true },
    { name: "Media Embeds", free: false, pro: true },
    { name: "Geographic Analytics", free: false, pro: true },
    { name: "Top Performer Insights", free: false, pro: true },
  ]

  const addons = [
    {
      name: "Custom Domain",
      price: "$5/mo",
      description: "Use your own domain like links.mysite.com for professional branding",
      icon: <Globe className="h-6 w-6" />,
    },
    {
      name: "White-Labeling",
      price: "$10/mo",
      description: "Remove all RefStack branding for a completely custom experience",
      icon: <Crown className="h-6 w-6" />,
    },
    {
      name: "Developer API Access",
      price: "$25/mo",
      description: "Full REST API access for custom integrations and automation",
      icon: <Code className="h-6 w-6" />,
    },
    {
      name: "Auto-Expiring Links",
      price: "$2/mo",
      description: "Time-based link control perfect for limited-time promotions",
      icon: <Clock className="h-6 w-6" />,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-indigo-950 to-purple-950 text-white">
      {/* Header */}
      <header className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center space-x-2 bg-blue-900/70 backdrop-blur-md rounded-full py-2 px-4 border border-blue-700/50 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
              <div className="bg-blue-600 rounded-full p-1 flex items-center justify-center">
                <span className="text-white text-lg">▶</span>
              </div>
              <span className="font-bold text-lg">RefStack.me</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/pricing" className="text-blue-200 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/dashboard" className="text-blue-200 hover:text-white transition-colors">
              Dashboard
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden md:block text-blue-200 hover:text-white transition-colors px-4 py-2">
              Log In
            </Link>
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)] border border-blue-500/50 transition-all hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center max-w-4xl mx-auto" initial="hidden" animate="visible" variants={fadeIn}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 leading-tight">
              Powerful Features for
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Maximum Impact
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-200/90 mb-10 max-w-3xl mx-auto">
              Everything you need to create, manage, and optimize your referral strategy. From basic link management to
              advanced analytics and custom integrations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 px-8 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-blue-500/50 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]"
                onClick={() => router.push("/register")}
              >
                Start Free Trial
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="text-white border-blue-500/50 text-lg py-6 px-8 rounded-full hover:bg-blue-900/30"
                onClick={() => router.push("/pricing")}
              >
                View Pricing
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Core Features
            </h2>
            <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
              The essential tools you need to maximize your referral potential
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {coreFeatures.map((feature, index) => (
              <motion.div key={index} className="relative" variants={fadeIn}>
                <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-md"></div>
                <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] h-full">
                  <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-blue-200/80 mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-blue-100">
                        <Check className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature Categories */}
      <section className="py-16 md:py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10"></div>
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Feature Categories
            </h2>
            <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
              Explore features organized by category to find exactly what you need
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: "management", label: "Link Management", icon: <LinkIcon className="h-4 w-4" /> },
              { id: "analytics", label: "Analytics", icon: <BarChart3 className="h-4 w-4" /> },
              { id: "customization", label: "Customization", icon: <Palette className="h-4 w-4" /> },
              { id: "integration", label: "Integrations", icon: <Code className="h-4 w-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    : "bg-blue-950/40 text-blue-200 hover:bg-blue-900/40"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Feature Grids */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {activeTab === "management" &&
              managementFeatures.map((feature, index) => (
                <div key={index} className="relative">
                  <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-md"></div>
                  <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-2xl p-6 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <div className="flex gap-1">
                        {feature.isPro && (
                          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">Pro</span>
                        )}
                        {feature.isAddon && (
                          <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">Add-on</span>
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-blue-200/80 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}

            {activeTab === "analytics" &&
              analyticsFeatures.map((feature, index) => (
                <div key={index} className="relative">
                  <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-md"></div>
                  <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-2xl p-6 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center">
                        {feature.icon}
                      </div>
                      {feature.isPro && (
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">Pro</span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-blue-200/80 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}

            {activeTab === "customization" &&
              customizationFeatures.map((feature, index) => (
                <div key={index} className="relative">
                  <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-md"></div>
                  <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-2xl p-6 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <div className="flex gap-1">
                        {feature.isPro && (
                          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">Pro</span>
                        )}
                        {feature.isAddon && (
                          <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">Add-on</span>
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-blue-200/80 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}

            {activeTab === "integration" &&
              integrationFeatures.map((feature, index) => (
                <div key={index} className="relative">
                  <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-md"></div>
                  <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-2xl p-6 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <div className="flex gap-1">
                        {feature.isPro && (
                          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">Pro</span>
                        )}
                        {feature.isAddon && (
                          <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">Add-on</span>
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-blue-200/80 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Free vs Pro Comparison
            </h2>
            <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">See exactly what's included in each plan</p>
          </motion.div>

          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-md"></div>
            <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-blue-800/50">
                      <th className="px-6 py-4 text-left text-lg font-bold text-white">Feature</th>
                      <th className="px-6 py-4 text-center text-lg font-bold text-white">
                        Free
                        <div className="text-sm font-normal text-blue-200/70 mt-1">$0/month</div>
                      </th>
                      <th className="px-6 py-4 text-center text-lg font-bold text-white">
                        Pro
                        <div className="text-sm font-normal text-blue-200/70 mt-1">$9.99/month</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((feature, index) => (
                      <tr key={index} className="border-b border-blue-800/30 hover:bg-blue-900/20">
                        <td className="px-6 py-4 font-medium text-white">{feature.name}</td>
                        <td className="px-6 py-4 text-center">
                          {typeof feature.free === "boolean" ? (
                            feature.free ? (
                              <Check className="h-5 w-5 text-green-400 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-gray-400 mx-auto" />
                            )
                          ) : (
                            <span className="text-blue-200">{feature.free}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {typeof feature.pro === "boolean" ? (
                            feature.pro ? (
                              <Check className="h-5 w-5 text-green-400 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-gray-400 mx-auto" />
                            )
                          ) : (
                            <span className="text-blue-200">{feature.pro}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-16 md:py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5"></div>
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Optional Add-ons
            </h2>
            <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
              Extend your RefStack experience with powerful add-on features
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {addons.map((addon, index) => (
              <motion.div key={index} className="relative" variants={fadeIn}>
                <div className="absolute inset-0 bg-purple-500/10 rounded-2xl blur-md"></div>
                <div className="relative bg-blue-950/40 backdrop-blur-md border border-purple-800/50 rounded-2xl p-6 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(147,51,234,0.5)]">
                    {addon.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{addon.name}</h3>
                  <div className="mb-3">
                    <span className="text-2xl font-bold text-purple-400">{addon.price}</span>
                  </div>
                  <p className="text-blue-200/80 text-sm mb-4">{addon.description}</p>
                  <Button variant="outline" className="w-full text-white border-purple-500/50 hover:bg-purple-900/30">
                    Add to Plan
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl p-8 md:p-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-900/20 pointer-events-none"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                  Ready to Maximize Your Referrals?
                </h2>
                <p className="text-xl text-blue-200/80 mb-8 max-w-2xl mx-auto">
                  Start with our free plan and upgrade as you grow. No setup fees, no hidden costs.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xl py-6 px-8 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-blue-500/50 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]"
                    onClick={() => router.push("/register")}
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="text-white border-blue-500/50 text-xl py-6 px-8 rounded-full hover:bg-blue-900/30"
                    onClick={() => router.push("/pricing")}
                  >
                    View Pricing
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-blue-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-600 rounded-full p-1 flex items-center justify-center">
                  <span className="text-white text-lg">▶</span>
                </div>
                <span className="font-bold text-lg">RefStack.me</span>
              </div>
              <p className="text-blue-200/70 mb-4">
                The all-in-one platform to create, manage, and track your referral links.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="text-blue-200/70 hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-blue-200/70 hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-blue-200/70 hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="text-blue-200/70 hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="text-blue-200/70 hover:text-white transition-colors">
                    API Docs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-blue-200/70 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-blue-200/70 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-800/30 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200/70 mb-4 md:mb-0">© 2025 RefStack. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-blue-200/70 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-blue-200/70 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
