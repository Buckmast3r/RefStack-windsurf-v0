"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  Calendar,
  Clock,
  User,
  ArrowRight,
  TrendingUp,
  Users,
  Lightbulb,
  Target,
  BarChart3,
  Zap,
} from "lucide-react"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

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

  const blogPosts = [
    {
      id: 1,
      title: "10 Proven Strategies to Maximize Your Referral Revenue in 2025",
      excerpt:
        "Discover the latest tactics successful creators are using to boost their referral earnings by up to 300%.",
      author: "Alex Chen",
      date: "2025-01-15",
      readTime: "8 min read",
      category: "Strategy",
      featured: true,
      image: "/placeholder.svg?height=400&width=600",
      tags: ["referrals", "strategy", "revenue"],
    },
    {
      id: 2,
      title: "The Complete Guide to Referral Link Analytics",
      excerpt:
        "Learn how to read and interpret your referral analytics to make data-driven decisions that increase conversions.",
      author: "Sarah Johnson",
      date: "2025-01-12",
      readTime: "12 min read",
      category: "Analytics",
      featured: false,
      image: "/placeholder.svg?height=400&width=600",
      tags: ["analytics", "data", "optimization"],
    },
    {
      id: 3,
      title: "Building Trust: How to Disclose Referral Links Properly",
      excerpt:
        "Best practices for transparent referral disclosure that builds trust with your audience and complies with regulations.",
      author: "Emily Zhang",
      date: "2025-01-10",
      readTime: "6 min read",
      category: "Best Practices",
      featured: false,
      image: "/placeholder.svg?height=400&width=600",
      tags: ["disclosure", "trust", "compliance"],
    },
    {
      id: 4,
      title: "Case Study: How @TechReviewer Earned $50K in Referral Revenue",
      excerpt:
        "A deep dive into the strategies and tools that helped one creator build a six-figure referral business.",
      author: "Marcus Rodriguez",
      date: "2025-01-08",
      readTime: "15 min read",
      category: "Case Study",
      featured: true,
      image: "/placeholder.svg?height=400&width=600",
      tags: ["case-study", "success-story", "revenue"],
    },
    {
      id: 5,
      title: "The Psychology of Referral Marketing: Why People Share",
      excerpt: "Understanding the psychological triggers that motivate people to click and convert on referral links.",
      author: "Dr. Lisa Park",
      date: "2025-01-05",
      readTime: "10 min read",
      category: "Psychology",
      featured: false,
      image: "/placeholder.svg?height=400&width=600",
      tags: ["psychology", "marketing", "behavior"],
    },
    {
      id: 6,
      title: "RefStack API: Building Custom Integrations",
      excerpt: "A technical guide to using the RefStack API to create custom workflows and integrations.",
      author: "Dev Team",
      date: "2025-01-03",
      readTime: "20 min read",
      category: "Technical",
      featured: false,
      image: "/placeholder.svg?height=400&width=600",
      tags: ["api", "development", "integration"],
    },
  ]

  const categories = [
    { name: "All", count: blogPosts.length, icon: <BarChart3 className="h-4 w-4" /> },
    {
      name: "Strategy",
      count: blogPosts.filter((p) => p.category === "Strategy").length,
      icon: <Target className="h-4 w-4" />,
    },
    {
      name: "Analytics",
      count: blogPosts.filter((p) => p.category === "Analytics").length,
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      name: "Best Practices",
      count: blogPosts.filter((p) => p.category === "Best Practices").length,
      icon: <Lightbulb className="h-4 w-4" />,
    },
    {
      name: "Case Study",
      count: blogPosts.filter((p) => p.category === "Case Study").length,
      icon: <Users className="h-4 w-4" />,
    },
    {
      name: "Technical",
      count: blogPosts.filter((p) => p.category === "Technical").length,
      icon: <Zap className="h-4 w-4" />,
    },
  ]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredPosts = blogPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

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
              RefStack Blog
            </h1>
            <p className="text-xl md:text-2xl text-blue-200/90 mb-10 max-w-3xl mx-auto">
              Insights, strategies, and tips to help you maximize your referral potential. Learn from experts and
              successful creators.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 h-5 w-5" />
              <Input
                placeholder="Search articles, tips, and guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-blue-950/40 border-blue-800/50 text-white placeholder:text-blue-300/50 focus-visible:ring-blue-500 rounded-full"
              />
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
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                  selectedCategory === category.name
                    ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    : "bg-blue-950/40 text-blue-200 hover:bg-blue-900/40"
                }`}
              >
                {category.icon}
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === "All" && featuredPosts.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                Featured Articles
              </h2>
              <p className="text-xl text-blue-200/80">Our most popular and impactful content</p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {featuredPosts.map((post) => (
                <motion.article key={post.id} className="relative" variants={fadeIn}>
                  <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-md"></div>
                  <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                    <div className="aspect-video bg-blue-900/30 relative overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-blue-300 mb-3">
                        <span className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full">{post.category}</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                      <p className="text-blue-200/80 mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-blue-400" />
                          <span className="text-sm text-blue-300">{post.author}</span>
                        </div>
                        <Button variant="ghost" className="text-blue-300 hover:text-white p-0">
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {selectedCategory !== "All" && (
            <motion.div
              className="mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                {selectedCategory} Articles
              </h2>
            </motion.div>
          )}

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {(selectedCategory === "All" ? regularPosts : filteredPosts).map((post) => (
              <motion.article key={post.id} className="relative" variants={fadeIn}>
                <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-md"></div>
                <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] h-full">
                  <div className="aspect-video bg-blue-900/30 relative overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-4 text-sm text-blue-300 mb-3">
                      <span className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full">{post.category}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-blue-200/80 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-blue-400" />
                        <span className="text-sm text-blue-300">{post.author}</span>
                      </div>
                      <span className="text-sm text-blue-400">{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-blue-200/80 mb-4">No articles found</p>
              <p className="text-blue-300/60">Try adjusting your search or category filter</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
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
                  Stay Updated
                </h2>
                <p className="text-xl text-blue-200/80 mb-8 max-w-2xl mx-auto">
                  Get the latest referral marketing insights, strategies, and RefStack updates delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
                  <Input
                    placeholder="Enter your email"
                    className="bg-blue-950/40 border-blue-800/50 text-white placeholder:text-blue-300/50 focus-visible:ring-blue-500"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)] border border-blue-500/50">
                    Subscribe
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
                  <Link href="/blog" className="text-blue-200/70 hover:text-white transition-colors">
                    Blog
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
