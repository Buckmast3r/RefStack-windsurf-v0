"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Code, Copy, ExternalLink, Key, Database, Zap, Shield, Globe, Book, Terminal } from "lucide-react"

export default function ApiPage() {
  const [copiedCode, setCopiedCode] = useState("")

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

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(""), 2000)
  }

  const apiFeatures = [
    {
      icon: <Database className="h-6 w-6" />,
      title: "RESTful API",
      description: "Clean, intuitive REST endpoints following industry standards",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-time Webhooks",
      description: "Get instant notifications for clicks, conversions, and events",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Authentication",
      description: "API keys and OAuth 2.0 for secure access to your data",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Rate Limiting",
      description: "Fair usage policies with generous rate limits for all plans",
    },
  ]

  const endpoints = [
    {
      method: "GET",
      path: "/api/v1/links",
      description: "Retrieve all your referral links",
      response: "Array of link objects with analytics data",
    },
    {
      method: "POST",
      path: "/api/v1/links",
      description: "Create a new referral link",
      response: "Created link object with tracking URL",
    },
    {
      method: "GET",
      path: "/api/v1/links/{id}/analytics",
      description: "Get detailed analytics for a specific link",
      response: "Analytics data including clicks, conversions, and geography",
    },
    {
      method: "PUT",
      path: "/api/v1/links/{id}",
      description: "Update an existing referral link",
      response: "Updated link object",
    },
    {
      method: "DELETE",
      path: "/api/v1/links/{id}",
      description: "Delete a referral link",
      response: "Success confirmation",
    },
  ]

  type CodeLanguage = 'javascript' | 'python' | 'curl';
  
  const codeExamples: Record<CodeLanguage, string> = {
    javascript: `// Initialize the RefStack API client
const RefStack = require('@refstack/api');
const client = new RefStack('your-api-key');

// Create a new referral link
const newLink = await client.links.create({
  name: 'Dropbox',
  category: 'Tech',
  url: 'https://dropbox.com/referrals/your-code',
  includeInPublicStack: true
});

// Get analytics for a link
const analytics = await client.links.getAnalytics(newLink.id, {
  period: '30d'
});

console.log(\`Clicks: \${analytics.clicks}, Conversions: \${analytics.conversions}\`);`,

    python: `# Install: pip install refstack-api
from refstack import RefStackAPI

# Initialize client
client = RefStackAPI('your-api-key')

# Create a new referral link
new_link = client.links.create({
    'name': 'Dropbox',
    'category': 'Tech', 
    'url': 'https://dropbox.com/referrals/your-code',
    'include_in_public_stack': True
})

# Get analytics
analytics = client.links.get_analytics(new_link['id'], period='30d')
print(f"Clicks: {analytics['clicks']}, Conversions: {analytics['conversions']}")`,

    curl: `# Create a new referral link
curl -X POST https://api.refstack.me/v1/links \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Dropbox",
    "category": "Tech",
    "url": "https://dropbox.com/referrals/your-code",
    "includeInPublicStack": true
  }'

# Get analytics for a link
curl -X GET https://api.refstack.me/v1/links/link-id/analytics?period=30d \\
  -H "Authorization: Bearer your-api-key"`,
  }

  const [selectedLanguage, setSelectedLanguage] = useState<CodeLanguage>("javascript")

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
              RefStack API
            </h1>
            <p className="text-xl md:text-2xl text-blue-200/90 mb-10 max-w-3xl mx-auto">
              Build powerful integrations with our comprehensive REST API. Manage links, track analytics, and automate
              your referral workflows.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 px-8 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-blue-500/50 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]">
                <Key className="mr-2 h-5 w-5" />
                Get API Key
              </Button>
              <Button
                variant="outline"
                className="text-white border-blue-500/50 text-lg py-6 px-8 rounded-full hover:bg-blue-900/30"
              >
                <Book className="mr-2 h-5 w-5" />
                View Documentation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* API Features */}
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
              Powerful API Features
            </h2>
            <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
              Everything you need to integrate RefStack into your applications and workflows
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {apiFeatures.map((feature, index) => (
              <motion.div key={index} className="relative" variants={fadeIn}>
                <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-md"></div>
                <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-2xl p-6 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] text-center">
                  <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-blue-200/80 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Code Examples */}
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
              Quick Start Examples
            </h2>
            <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
              Get started quickly with code examples in your favorite language
            </p>
          </motion.div>

          <motion.div
            className="max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            {/* Language Selector */}
            <div className="flex justify-center gap-4 mb-8">
              {(Object.keys(codeExamples) as CodeLanguage[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-6 py-3 rounded-full transition-all capitalize ${
                    selectedLanguage === lang
                      ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                      : "bg-blue-950/40 text-blue-200 hover:bg-blue-900/40"
                  }`}
                >
                  {lang === "javascript" ? "JavaScript" : lang === "curl" ? "cURL" : "Python"}
                </button>
              ))}
            </div>

            {/* Code Block */}
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-md"></div>
              <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <div className="flex items-center justify-between p-4 border-b border-blue-800/30">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-5 w-5 text-blue-400" />
                    <span className="text-blue-300 font-medium capitalize">
                      {selectedLanguage === "javascript"
                        ? "JavaScript"
                        : selectedLanguage === "curl"
                          ? "cURL"
                          : "Python"}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(codeExamples[selectedLanguage], selectedLanguage)}
                    className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                    {copiedCode === selectedLanguage ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="p-6 overflow-x-auto">
                  <code className="text-blue-100 text-sm leading-relaxed">{codeExamples[selectedLanguage]}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* API Endpoints */}
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
              API Endpoints
            </h2>
            <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
              Core endpoints for managing your referral links
            </p>
          </motion.div>

          <motion.div
            className="max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-md"></div>
              <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-blue-800/50">
                        <th className="px-6 py-4 text-left text-sm font-medium text-blue-200">Method</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-blue-200">Endpoint</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-blue-200">Description</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-blue-200">Response</th>
                      </tr>
                    </thead>
                    <tbody>
                      {endpoints.map((endpoint, index) => (
                        <motion.tr
                          key={index}
                          className="border-b border-blue-800/30 hover:bg-blue-900/20 transition-colors"
                          variants={fadeIn}
                        >
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                endpoint.method === "GET"
                                  ? "bg-green-900/30 text-green-400"
                                  : endpoint.method === "POST"
                                    ? "bg-blue-900/30 text-blue-400"
                                    : endpoint.method === "PUT"
                                      ? "bg-yellow-900/30 text-yellow-400"
                                      : "bg-red-900/30 text-red-400"
                              }`}
                            >
                              {endpoint.method}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-mono text-sm text-blue-300">{endpoint.path}</td>
                          <td className="px-6 py-4 text-sm text-blue-200">{endpoint.description}</td>
                          <td className="px-6 py-4 text-sm text-blue-200/70">{endpoint.response}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Getting Started CTA */}
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
                <Code className="h-16 w-16 text-blue-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                  Ready to Build?
                </h2>
                <p className="text-xl text-blue-200/80 mb-8 max-w-2xl mx-auto">
                  Get your API key and start integrating RefStack into your applications today.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xl py-6 px-8 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-blue-500/50 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]">
                    Get API Key
                    <Key className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="text-white border-blue-500/50 text-xl py-6 px-8 rounded-full hover:bg-blue-900/30"
                  >
                    Full Documentation
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
                  <Link href="/api" className="text-blue-200/70 hover:text-white transition-colors">
                    API
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
