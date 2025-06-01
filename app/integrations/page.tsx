"use client"

import { useState } from "react"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Zap,
  Globe,
  Code,
  Webhook,
  Database,
  Mail,
  MessageSquare,
  BarChart3,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  Clock,
  Star,
} from "lucide-react"

export default function IntegrationsPage() {
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

  const integrations = [
    {
      name: "Zapier",
      description: "Automate your referral workflows with 5000+ apps",
      icon: <Zap className="h-8 w-8" />,
      category: "Automation",
      status: "available",
      popular: true,
      features: ["Trigger on new referrals", "Auto-update spreadsheets", "Send notifications"],
    },
    {
      name: "Webhook API",
      description: "Real-time notifications for all referral events",
      icon: <Webhook className="h-8 w-8" />,
      category: "Developer",
      status: "available",
      popular: false,
      features: ["Real-time events", "Custom endpoints", "Retry logic"],
    },
    {
      name: "Google Analytics",
      description: "Track referral performance in your GA dashboard",
      icon: <BarChart3 className="h-8 w-8" />,
      category: "Analytics",
      status: "available",
      popular: true,
      features: ["UTM tracking", "Goal conversion", "Custom events"],
    },
    {
      name: "Mailchimp",
      description: "Add successful referrers to your email lists",
      icon: <Mail className="h-8 w-8" />,
      category: "Email Marketing",
      status: "available",
      popular: false,
      features: ["Auto-add subscribers", "Tag management", "Campaign triggers"],
    },
    {
      name: "Slack",
      description: "Get notified about referral milestones in Slack",
      icon: <MessageSquare className="h-8 w-8" />,
      category: "Communication",
      status: "available",
      popular: false,
      features: ["Channel notifications", "Custom messages", "Team alerts"],
    },
    {
      name: "Airtable",
      description: "Sync referral data to your Airtable bases",
      icon: <Database className="h-8 w-8" />,
      category: "Database",
      status: "coming-soon",
      popular: false,
      features: ["Two-way sync", "Custom fields", "Automated updates"],
    },
    {
      name: "Discord",
      description: "Share referral achievements with your community",
      icon: <MessageSquare className="h-8 w-8" />,
      category: "Community",
      status: "coming-soon",
      popular: false,
      features: ["Server notifications", "Role rewards", "Leaderboards"],
    },
    {
      name: "Shopify",
      description: "Track e-commerce referrals and commissions",
      icon: <Globe className="h-8 w-8" />,
      category: "E-commerce",
      status: "planned",
      popular: false,
      features: ["Order tracking", "Commission calculation", "Customer attribution"],
    },
  ]

  const categories = [
    { name: "All", count: integrations.length },
    { name: "Automation", count: integrations.filter((i) => i.category === "Automation").length },
    { name: "Analytics", count: integrations.filter((i) => i.category === "Analytics").length },
    { name: "Developer", count: integrations.filter((i) => i.category === "Developer").length },
    { name: "Email Marketing", count: integrations.filter((i) => i.category === "Email Marketing").length },
    { name: "Communication", count: integrations.filter((i) => i.category === "Communication").length },
  ]

  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredIntegrations =
    selectedCategory === "All"
      ? integrations
      : integrations.filter((integration) => integration.category === selectedCategory)

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
            <Link href="/features" className="text-blue-200 hover:text-white transition-colors">
              Features
            </Link>
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
              Powerful Integrations
            </h1>
            <p className="text-xl md:text-2xl text-blue-200/90 mb-10 max-w-3xl mx-auto">
              Connect RefStack with your favorite tools and automate your referral workflow. From analytics to
              automation, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 px-8 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-blue-500/50 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]">
                Browse Integrations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="text-white border-blue-500/50 text-lg py-6 px-8 rounded-full hover:bg-blue-900/30"
              >
                <Code className="mr-2 h-5 w-5" />
                API Documentation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-6 py-3 rounded-full transition-all ${
                  selectedCategory === category.name
                    ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    : "bg-blue-950/40 text-blue-200 hover:bg-blue-900/40"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {filteredIntegrations.map((integration, index) => (
              <motion.div key={index} className="relative" variants={fadeIn}>
                <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-md"></div>
                <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                      {integration.icon}
                    </div>
                    <div className="flex gap-2">
                      {integration.popular && (
                        <div className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          Popular
                        </div>
                      )}
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          integration.status === "available"
                            ? "bg-green-900/30 text-green-400"
                            : integration.status === "coming-soon"
                              ? "bg-blue-900/30 text-blue-400"
                              : "bg-gray-900/30 text-gray-400"
                        }`}
                      >
                        {integration.status === "available"
                          ? "Available"
                          : integration.status === "coming-soon"
                            ? "Coming Soon"
                            : "Planned"}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{integration.name}</h3>
                  <p className="text-blue-200/80 mb-4">{integration.description}</p>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-blue-300 mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {integration.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-blue-200/70">
                          <CheckCircle className="h-3 w-3 text-blue-400 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    {integration.status === "available" ? (
                      <>
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">Connect</Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-blue-500/50 text-white hover:bg-blue-900/30"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outline"
                        className="flex-1 border-blue-500/50 text-white hover:bg-blue-900/30"
                        disabled
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        {integration.status === "coming-soon" ? "Coming Soon" : "Planned"}
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Developer Section */}
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
              Build Your Own Integration
            </h2>
            <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
              Use our powerful API to create custom integrations and automate your referral workflows
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div className="relative" variants={fadeIn}>
              <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-md"></div>
              <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-2xl p-6 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] text-center">
                <Code className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">REST API</h3>
                <p className="text-blue-200/80 text-sm">
                  Full REST API with comprehensive documentation and SDKs for popular languages.
                </p>
              </div>
            </motion.div>

            <motion.div className="relative" variants={fadeIn}>
              <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-md"></div>
              <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-2xl p-6 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] text-center">
                <Webhook className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Webhooks</h3>
                <p className="text-blue-200/80 text-sm">
                  Real-time notifications for all events with reliable delivery and retry logic.
                </p>
              </div>
            </motion.div>

            <motion.div className="relative" variants={fadeIn}>
              <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-md"></div>
              <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-2xl p-6 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] text-center">
                <Database className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">GraphQL</h3>
                <p className="text-blue-200/80 text-sm">
                  Flexible GraphQL API for efficient data fetching and real-time subscriptions.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <div className="text-center mt-12">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xl py-6 px-8 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-blue-500/50 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]">
              View API Documentation
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          </div>
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
                  <Link href="/integrations" className="text-blue-200/70 hover:text-white transition-colors">
                    Integrations
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
