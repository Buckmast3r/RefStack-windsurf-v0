"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Users, BarChart3, Globe, Smartphone, ArrowRight, Calendar, Lightbulb } from "lucide-react"

export default function RoadmapPage() {
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

  const roadmapItems = [
    {
      quarter: "Q1 2025",
      status: "completed",
      title: "Foundation & Core Features",
      items: [
        { name: "User Authentication & Dashboard", completed: true },
        { name: "Basic Link Management", completed: true },
        { name: "Public Stack Pages", completed: true },
        { name: "Basic Analytics", completed: true },
        { name: "Custom Themes", completed: true },
      ],
    },
    {
      quarter: "Q2 2025",
      status: "in-progress",
      title: "Advanced Analytics & Integrations",
      items: [
        { name: "Advanced Analytics Dashboard", completed: true },
        { name: "Geographic Tracking", completed: false },
        { name: "Webhook Support", completed: false },
        { name: "API v1 Launch", completed: false },
        { name: "Mobile App (iOS/Android)", completed: false },
      ],
    },
    {
      quarter: "Q3 2025",
      status: "planned",
      title: "Enterprise & Collaboration",
      items: [
        { name: "Team Collaboration Features", completed: false },
        { name: "White-label Solutions", completed: false },
        { name: "Advanced Fraud Protection", completed: false },
        { name: "Custom Domain Support", completed: false },
        { name: "Enterprise SSO", completed: false },
      ],
    },
    {
      quarter: "Q4 2025",
      status: "planned",
      title: "AI & Automation",
      items: [
        { name: "AI-Powered Link Optimization", completed: false },
        { name: "Automated A/B Testing", completed: false },
        { name: "Smart Audience Targeting", completed: false },
        { name: "Predictive Analytics", completed: false },
        { name: "Voice Assistant Integration", completed: false },
      ],
    },
  ]

  const upcomingFeatures = [
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile App",
      description: "Native iOS and Android apps for managing your referrals on the go",
      eta: "Q2 2025",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Advanced Analytics",
      description: "Deep insights with conversion funnels, cohort analysis, and revenue attribution",
      eta: "Q2 2025",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Collaboration",
      description: "Share and manage referral stacks with your team members",
      eta: "Q3 2025",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Expansion",
      description: "Multi-language support and localized referral programs",
      eta: "Q3 2025",
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
              Product Roadmap
            </h1>
            <p className="text-xl md:text-2xl text-blue-200/90 mb-10 max-w-3xl mx-auto">
              See what we're building next and help shape the future of RefStack with your feedback and feature
              requests.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {roadmapItems.map((quarter, index) => (
              <motion.div key={index} className="relative" variants={fadeIn}>
                <div className="flex items-start gap-6">
                  {/* Timeline indicator */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        quarter.status === "completed"
                          ? "bg-green-500 border-green-500"
                          : quarter.status === "in-progress"
                            ? "bg-blue-500 border-blue-500"
                            : "bg-gray-500 border-gray-500"
                      }`}
                    ></div>
                    {index < roadmapItems.length - 1 && <div className="w-0.5 h-24 bg-blue-800/30 mt-2"></div>}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-md"></div>
                      <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold mb-1">{quarter.title}</h3>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-blue-400" />
                              <span className="text-blue-300">{quarter.quarter}</span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  quarter.status === "completed"
                                    ? "bg-green-900/30 text-green-400"
                                    : quarter.status === "in-progress"
                                      ? "bg-blue-900/30 text-blue-400"
                                      : "bg-gray-900/30 text-gray-400"
                                }`}
                              >
                                {quarter.status === "completed"
                                  ? "Completed"
                                  : quarter.status === "in-progress"
                                    ? "In Progress"
                                    : "Planned"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {quarter.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center gap-3">
                              {item.completed ? (
                                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                              ) : (
                                <Clock className="h-5 w-5 text-gray-400 flex-shrink-0" />
                              )}
                              <span className={item.completed ? "text-white" : "text-blue-200/70"}>{item.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Upcoming Features Highlight */}
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
              Coming Soon
            </h2>
            <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
              Exciting features we're working on to make RefStack even better
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {upcomingFeatures.map((feature, index) => (
              <motion.div key={index} className="relative" variants={fadeIn}>
                <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-md"></div>
                <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-2xl p-6 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-blue-200/80 text-sm mb-4">{feature.description}</p>
                  <div className="bg-blue-900/30 rounded-full px-3 py-1 text-xs font-medium text-blue-300">
                    ETA: {feature.eta}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature Request CTA */}
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
                <Lightbulb className="h-16 w-16 text-blue-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                  Have a Feature Idea?
                </h2>
                <p className="text-xl text-blue-200/80 mb-8 max-w-2xl mx-auto">
                  We love hearing from our users! Your feedback helps us prioritize what to build next.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xl py-6 px-8 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-blue-500/50 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]">
                    Submit Feature Request
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="text-white border-blue-500/50 text-xl py-6 px-8 rounded-full hover:bg-blue-900/30"
                  >
                    Join Our Discord
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
                  <Link href="/roadmap" className="text-blue-200/70 hover:text-white transition-colors">
                    Roadmap
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
