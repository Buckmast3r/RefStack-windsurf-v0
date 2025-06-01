"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Clock,
  Users,
  Heart,
  Zap,
  Globe,
  ArrowRight,
  Coffee,
  Lightbulb,
  Target,
  Code,
  BarChart3,
  Palette,
  MessageSquare,
} from "lucide-react"

export default function CareersPage() {
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

  const openPositions = [
    {
      title: "Senior Full-Stack Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description:
        "Join our engineering team to build scalable features for our growing platform. Work with React, Node.js, and modern cloud infrastructure.",
      requirements: ["5+ years full-stack experience", "React/Node.js expertise", "Cloud platform experience"],
      icon: <Code className="h-6 w-6" />,
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      description:
        "Shape the user experience of RefStack by designing intuitive interfaces and delightful user journeys.",
      requirements: ["3+ years product design experience", "Figma proficiency", "User research experience"],
      icon: <Palette className="h-6 w-6" />,
    },
    {
      title: "Data Analyst",
      department: "Analytics",
      location: "Remote",
      type: "Full-time",
      description:
        "Help us understand user behavior and optimize our platform through data-driven insights and analytics.",
      requirements: ["SQL and Python skills", "Analytics experience", "Data visualization expertise"],
      icon: <BarChart3 className="h-6 w-6" />,
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      description:
        "Help our users succeed by providing exceptional support and building relationships with our creator community.",
      requirements: ["Customer success experience", "Excellent communication", "SaaS background preferred"],
      icon: <MessageSquare className="h-6 w-6" />,
    },
  ]

  const benefits = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Remote-First Culture",
      description: "Work from anywhere in the world with flexible hours and async communication",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness stipend",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Learning & Growth",
      description: "$2,000 annual learning budget for courses, conferences, and skill development",
    },
    {
      icon: <Coffee className="h-6 w-6" />,
      title: "Work-Life Balance",
      description: "Unlimited PTO, sabbatical options, and respect for your personal time",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Equity & Impact",
      description: "Meaningful equity package and the chance to shape the creator economy",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Amazing Team",
      description: "Work with passionate, talented people who care about creators and innovation",
    },
  ]

  const values = [
    {
      title: "Creator-Obsessed",
      description: "We put creators first in every decision we make",
      icon: <Target className="h-6 w-6" />,
    },
    {
      title: "Move Fast",
      description: "We ship quickly and iterate based on feedback",
      icon: <Zap className="h-6 w-6" />,
    },
    {
      title: "Think Global",
      description: "We build for creators around the world",
      icon: <Globe className="h-6 w-6" />,
    },
    {
      title: "Stay Curious",
      description: "We're always learning and experimenting",
      icon: <Lightbulb className="h-6 w-6" />,
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
              Join Our Mission
            </h1>
            <p className="text-xl md:text-2xl text-blue-200/90 mb-10 max-w-3xl mx-auto">
              Help us build the future of creator monetization. Join a passionate team that's empowering creators
              worldwide to maximize their referral potential.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 px-8 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-blue-500/50 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]">
                View Open Positions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="text-white border-blue-500/50 text-lg py-6 px-8 rounded-full hover:bg-blue-900/30"
              >
                Learn About Our Culture
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Our Values
            </h2>
            <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">The principles that guide everything we do</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {values.map((value, index) => (
              <motion.div key={index} className="relative" variants={fadeIn}>
                <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-md"></div>
                <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-2xl p-6 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] text-center">
                  <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-blue-200/80 text-sm">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
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
              Why Work at RefStack?
            </h2>
            <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
              We believe in taking care of our team so they can do their best work
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {benefits.map((benefit, index) => (
              <motion.div key={index} className="relative" variants={fadeIn}>
                <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-md"></div>
                <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] h-full">
                  <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-blue-200/80">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Open Positions
            </h2>
            <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
              Join our growing team and help shape the future of creator monetization
            </p>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {openPositions.map((position, index) => (
              <motion.div key={index} className="relative" variants={fadeIn}>
                <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-md"></div>
                <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)] flex-shrink-0">
                          {position.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-2">{position.title}</h3>
                          <div className="flex flex-wrap gap-4 text-sm text-blue-300 mb-3">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {position.department}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {position.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {position.type}
                            </div>
                          </div>
                          <p className="text-blue-200/80 mb-4">{position.description}</p>
                          <div>
                            <h4 className="text-sm font-medium text-blue-300 mb-2">Key Requirements:</h4>
                            <ul className="space-y-1">
                              {position.requirements.map((req, idx) => (
                                <li key={idx} className="flex items-center text-sm text-blue-200/70">
                                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:flex-shrink-0">
                      <Button className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)] border border-blue-500/50">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {openPositions.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-blue-200/80 mb-4">No open positions at the moment</p>
              <p className="text-blue-300/60 mb-8">
                But we're always looking for exceptional talent! Send us your resume and we'll keep you in mind for
                future opportunities.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)] border border-blue-500/50">
                Send Resume
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Application CTA */}
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
                <Users className="h-16 w-16 text-blue-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                  Ready to Join Us?
                </h2>
                <p className="text-xl text-blue-200/80 mb-8 max-w-2xl mx-auto">
                  Don't see a perfect fit? We're always interested in hearing from talented people who share our
                  mission.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xl py-6 px-8 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-blue-500/50 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]">
                    Apply Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="text-white border-blue-500/50 text-xl py-6 px-8 rounded-full hover:bg-blue-900/30"
                  >
                    Learn More About Us
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
                  <Link href="/careers" className="text-blue-200/70 hover:text-white transition-colors">
                    Careers
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
                  <Link href="/guides" className="text-blue-200/70 hover:text-white transition-colors">
                    Guides
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
                <li>
                  <Link href="/careers" className="text-blue-200/70 hover:text-white transition-colors">
                    Careers
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
