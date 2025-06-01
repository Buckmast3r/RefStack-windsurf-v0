"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Users, Lightbulb, Heart, Zap, Globe, TrendingUp, Shield, Coffee, ArrowRight, CheckCircle } from "lucide-react"

export default function AboutPage() {
  const router = useRouter()

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      bio: "Former growth engineer at Stripe and Airbnb. Passionate about helping creators monetize their influence through smart referral strategies.",
      avatar: "AC",
      color: "bg-blue-600",
    },
    {
      name: "Sarah Johnson",
      role: "Head of Product",
      bio: "Product design veteran with 8+ years at Google and Figma. Believes in building tools that feel magical to use.",
      avatar: "SJ",
      color: "bg-purple-600",
    },
    {
      name: "Marcus Rodriguez",
      role: "Lead Engineer",
      bio: "Full-stack engineer who previously built analytics platforms at Mixpanel. Loves solving complex technical challenges.",
      avatar: "MR",
      color: "bg-teal-600",
    },
    {
      name: "Emily Zhang",
      role: "Head of Growth",
      bio: "Growth marketing expert who scaled user acquisition at several Y Combinator startups. Data-driven and creator-focused.",
      avatar: "EZ",
      color: "bg-green-600",
    },
  ]

  const values = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Creator-First",
      description:
        "Every decision we make starts with asking: 'How does this help creators succeed?' We're building for the people who inspire and influence others.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Trust & Transparency",
      description:
        "We believe in honest analytics, clear pricing, and transparent business practices. Your success is our success, and we're committed to earning your trust every day.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Simplicity in Power",
      description:
        "Complex problems deserve elegant solutions. We build powerful tools that feel simple to use, so you can focus on what matters most - creating great content.",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Continuous Innovation",
      description:
        "The creator economy evolves rapidly, and so do we. We're constantly shipping new features and improvements based on your feedback and industry trends.",
    },
  ]

  const milestones = [
    {
      year: "2023",
      title: "The Idea",
      description:
        "Founded by Alex Chen after struggling to manage dozens of referral links across multiple platforms as a tech content creator.",
    },
    {
      year: "2024",
      title: "First Users",
      description:
        "Launched beta with 100 hand-picked creators. Achieved 95% user retention and $50K in tracked referral revenue in first month.",
    },
    {
      year: "2024",
      title: "Product-Market Fit",
      description:
        "Reached 10,000+ active users and $1M+ in tracked referral revenue. Expanded team and raised seed funding.",
    },
    {
      year: "2025",
      title: "Scale & Growth",
      description:
        "Now serving 50,000+ creators worldwide, with advanced analytics, custom integrations, and enterprise features.",
    },
  ]

  const stats = [
    { label: "Active Creators", value: "50,000+", icon: <Users className="h-5 w-5" /> },
    { label: "Referral Revenue Tracked", value: "$5M+", icon: <TrendingUp className="h-5 w-5" /> },
    { label: "Countries Served", value: "120+", icon: <Globe className="h-5 w-5" /> },
    { label: "Uptime", value: "99.9%", icon: <CheckCircle className="h-5 w-5" /> },
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
              We're Building the Future of
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Creator Monetization
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-200/90 mb-10 max-w-3xl mx-auto">
              RefStack was born from a simple frustration: managing referral links shouldn't be harder than creating
              great content. We're here to change that.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5"></div>
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} className="text-center" variants={fadeIn}>
                <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-200/80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
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
              Our Story
            </h2>
            <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
              From personal frustration to a platform serving thousands of creators worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  <h3 className="text-2xl font-bold mb-4">The Problem We Solved</h3>
                  <p className="text-blue-200/80 mb-6">
                    As a tech content creator, our founder Alex was juggling dozens of referral links across different
                    platforms. Spreadsheets, bookmarks, and sticky notes were everywhere. Tracking performance meant
                    manually checking each platform, and sharing links was a constant copy-paste nightmare.
                  </p>
                  <p className="text-blue-200/80">
                    The breaking point came when Alex realized he'd lost track of a high-performing referral link that
                    could have earned thousands in commissions. That's when the idea for RefStack was born.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-blue-950/40 backdrop-blur-md border border-purple-800/50 rounded-3xl p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-blue-200/80 mb-6">
                    We believe every creator deserves professional-grade tools to monetize their influence. Whether
                    you're a YouTuber with millions of subscribers or a blogger just starting out, you should have
                    access to the same powerful analytics and management tools that big companies use.
                  </p>
                  <p className="text-blue-200/80">
                    RefStack exists to level the playing field and help creators turn their passion into sustainable
                    income.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Timeline */}
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-600/30"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div key={index} className="relative flex items-start" variants={fadeIn}>
                  <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)] relative z-10">
                    <span className="text-white font-bold">{milestone.year}</span>
                  </div>
                  <div className="ml-8 flex-1">
                    <div className="bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-2xl p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                      <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                      <p className="text-blue-200/80">{milestone.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Values
            </h2>
            <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">The principles that guide everything we do</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {values.map((value, index) => (
              <motion.div key={index} className="relative" variants={fadeIn}>
                <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-md"></div>
                <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] h-full">
                  <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-blue-200/80">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
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
              Meet Our Team
            </h2>
            <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
              The passionate people building the future of creator monetization
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {teamMembers.map((member, index) => (
              <motion.div key={index} className="relative" variants={fadeIn}>
                <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-md"></div>
                <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] h-full text-center">
                  <div
                    className={`${member.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(59,130,246,0.3)]`}
                  >
                    <span className="text-white font-bold text-xl">{member.avatar}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-400 font-medium mb-4">{member.role}</p>
                  <p className="text-blue-200/80 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Culture Section */}
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
              Our Culture
            </h2>
            <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">How we work and what makes RefStack special</p>
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
              <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-2xl p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] h-full text-center">
                <Coffee className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Remote-First</h3>
                <p className="text-blue-200/80 text-sm">
                  We're a distributed team across 4 continents, united by our mission to help creators succeed.
                  Flexibility and work-life balance are core to who we are.
                </p>
              </div>
            </motion.div>

            <motion.div className="relative" variants={fadeIn}>
              <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-md"></div>
              <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-2xl p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] h-full text-center">
                <Lightbulb className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Innovation-Driven</h3>
                <p className="text-blue-200/80 text-sm">
                  We encourage experimentation and learning from failure. Every team member has the freedom to propose
                  and test new ideas that could benefit our users.
                </p>
              </div>
            </motion.div>

            <motion.div className="relative" variants={fadeIn}>
              <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-md"></div>
              <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-2xl p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] h-full text-center">
                <Heart className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">User-Obsessed</h3>
                <p className="text-blue-200/80 text-sm">
                  We talk to our users daily, read every piece of feedback, and make decisions based on real creator
                  needs. Your success is literally our success.
                </p>
              </div>
            </motion.div>
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
                  Join Our Mission
                </h2>
                <p className="text-xl text-blue-200/80 mb-8 max-w-2xl mx-auto">
                  Whether you're a creator looking to maximize your referral potential or someone who wants to join our
                  team, we'd love to hear from you.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xl py-6 px-8 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-blue-500/50 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]"
                    onClick={() => router.push("/register")}
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="text-white border-blue-500/50 text-xl py-6 px-8 rounded-full hover:bg-blue-900/30"
                    onClick={() => router.push("/contact")}
                  >
                    Get In Touch
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
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-blue-200/70 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-blue-200/70 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-blue-200/70 hover:text-white transition-colors">
                    Contact
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
                <li>
                  <Link href="/privacy" className="text-blue-200/70 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-800/30 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200/70 mb-4 md:mb-0">© 2025 RefStack. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/terms" className="text-blue-200/70 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-blue-200/70 hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
