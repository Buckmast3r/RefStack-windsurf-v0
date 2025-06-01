"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  Mail,
  Book,
  Video,
  HelpCircle,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  Users,
} from "lucide-react"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFaq, setExpandedFaq] = useState(null)

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

  const helpCategories = [
    {
      title: "Getting Started",
      icon: <Book className="h-6 w-6" />,
      description: "Learn the basics of RefStack",
      articles: [
        "Creating your first referral link",
        "Setting up your public stack",
        "Understanding analytics basics",
        "Customizing your profile",
      ],
    },
    {
      title: "Link Management",
      icon: <HelpCircle className="h-6 w-6" />,
      description: "Managing and organizing your links",
      articles: [
        "Adding new referral programs",
        "Organizing links by category",
        "Setting up custom URLs",
        "Bulk operations",
      ],
    },
    {
      title: "Analytics & Tracking",
      icon: <CheckCircle className="h-6 w-6" />,
      description: "Understanding your performance data",
      articles: [
        "Reading your analytics dashboard",
        "Geographic tracking insights",
        "Conversion rate optimization",
        "Revenue attribution",
      ],
    },
    {
      title: "Account & Billing",
      icon: <Users className="h-6 w-6" />,
      description: "Managing your account and subscription",
      articles: [
        "Upgrading to Pro",
        "Managing billing information",
        "Canceling your subscription",
        "Account security settings",
      ],
    },
  ]

  const faqs = [
    {
      question: "How do I create my first referral link?",
      answer:
        "To create your first referral link, go to your dashboard and click the 'Add Referral' button. Enter the company name, category, and your referral URL. RefStack will automatically generate a trackable link for you.",
    },
    {
      question: "What's the difference between Free and Pro plans?",
      answer:
        "The Free plan includes up to 5 referral links and basic analytics. Pro plan offers unlimited links, advanced analytics, custom branding, priority support, and additional features like link scheduling and conversion tracking.",
    },
    {
      question: "How accurate is the click tracking?",
      answer:
        "Our click tracking is highly accurate, using industry-standard methods to track genuine clicks while filtering out bots and invalid traffic. We provide real-time updates and detailed analytics.",
    },
    {
      question: "Can I use my own domain for referral links?",
      answer:
        "Yes! Custom domains are available as an add-on feature for $5/month. This allows you to use links like 'links.yourdomain.com' for professional branding.",
    },
    {
      question: "How do I make my referral stack public?",
      answer:
        "In your dashboard, you can toggle the 'Include in Public Stack' option for each referral link. Your public stack will be available at refstack.me/yourusername.",
    },
    {
      question: "Is there an API available?",
      answer:
        "Yes! We offer a comprehensive REST API for Pro users. The API allows you to manage links, retrieve analytics, and integrate RefStack with your existing tools and workflows.",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "You can cancel your subscription anytime from your account settings. Go to Settings > Billing > Cancel Subscription. Your account will remain active until the end of your current billing period.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 14-day money-back guarantee for all new Pro subscriptions. If you're not satisfied, contact our support team for a full refund.",
    },
  ]

  const supportOptions = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: <MessageCircle className="h-8 w-8" />,
      availability: "24/7 for Pro users, Business hours for Free users",
      action: "Start Chat",
    },
    {
      title: "Email Support",
      description: "Send us a detailed message",
      icon: <Mail className="h-8 w-8" />,
      availability: "Response within 24 hours",
      action: "Send Email",
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step guides",
      icon: <Video className="h-8 w-8" />,
      availability: "Available anytime",
      action: "Watch Videos",
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
              Help Center
            </h1>
            <p className="text-xl md:text-2xl text-blue-200/90 mb-10 max-w-3xl mx-auto">
              Find answers to your questions and learn how to get the most out of RefStack.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 h-5 w-5" />
              <Input
                placeholder="Search for help articles and FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-blue-950/40 border-blue-800/50 text-white placeholder:text-blue-300/50 focus-visible:ring-blue-500 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Get Support
            </h2>
            <p className="text-xl text-blue-200/80">Choose the best way to get help</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {supportOptions.map((option, index) => (
              <motion.div key={index} className="relative" variants={fadeIn}>
                <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-md"></div>
                <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] h-full text-center">
                  <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    {option.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{option.title}</h3>
                  <p className="text-blue-200/80 mb-4">{option.description}</p>
                  <p className="text-sm text-blue-300 mb-6">{option.availability}</p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)] border border-blue-500/50">
                    {option.action}
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10"></div>
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Browse by Category
            </h2>
            <p className="text-xl text-blue-200/80">Find help articles organized by topic</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {helpCategories.map((category, index) => (
              <motion.div key={index} className="relative" variants={fadeIn}>
                <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-md"></div>
                <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{category.title}</h3>
                      <p className="text-blue-200/70 text-sm">{category.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {category.articles.map((article, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-blue-200/80 hover:text-white transition-colors cursor-pointer"
                      >
                        <ChevronRight className="h-4 w-4 mr-2 text-blue-400" />
                        {article}
                      </li>
                    ))}
                  </ul>
                  <Button variant="ghost" className="w-full mt-4 text-blue-300 hover:text-white">
                    View All Articles
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-blue-200/80">Quick answers to common questions</p>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {filteredFaqs.map((faq, index) => (
              <motion.div key={index} className="relative" variants={fadeIn}>
                <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-md"></div>
                <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  <button
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-blue-900/20 transition-colors rounded-2xl"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                    <ChevronDown
                      className={`h-5 w-5 text-blue-400 transition-transform ${
                        expandedFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-blue-200/80 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredFaqs.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <p className="text-xl text-blue-200/80 mb-4">No FAQs found</p>
              <p className="text-blue-300/60">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
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
                  Still Need Help?
                </h2>
                <p className="text-xl text-blue-200/80 mb-8 max-w-2xl mx-auto">
                  Can't find what you're looking for? Our support team is here to help you succeed.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xl py-6 px-8 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-blue-500/50 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]">
                    Contact Support
                    <MessageCircle className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="text-white border-blue-500/50 text-xl py-6 px-8 rounded-full hover:bg-blue-900/30"
                  >
                    Join Community
                    <ExternalLink className="ml-2 h-5 w-5" />
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
                  <Link href="/help" className="text-blue-200/70 hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
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
                <li>
                  <Link href="/blog" className="text-blue-200/70 hover:text-white transition-colors">
                    Blog
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
