import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

// This would typically come from your CMS or API
const posts = [
  {
    id: 1,
    title: "How to Maximize Your Referral Program in 2024",
    excerpt: "Learn the latest strategies to boost your referral program's performance and increase conversions.",
    date: "May 15, 2024",
    readTime: "5 min read",
    category: "Growth",
    image: "/blog/referral-program.jpg"
  },
  {
    id: 2,
    title: "The Psychology Behind Successful Referral Programs",
    excerpt: "Understanding the psychological triggers that make people more likely to refer your product or service.",
    date: "April 28, 2024",
    readTime: "7 min read",
    category: "Psychology",
    image: "/blog/psychology.jpg"
  },
  {
    id: 3,
    title: "10 Tools Every Affiliate Marketer Should Be Using",
    excerpt: "Discover the essential tools that can help you optimize your affiliate marketing efforts.",
    date: "April 10, 2024",
    readTime: "6 min read",
    category: "Tools",
    image: "/blog/tools.jpg"
  },
  {
    id: 4,
    title: "From Zero to Hero: Building a Successful Affiliate Program",
    excerpt: "A step-by-step guide to creating an affiliate program that drives results.",
    date: "March 22, 2024",
    readTime: "8 min read",
    category: "Tutorial",
    image: "/blog/affiliate-program.jpg"
  },
  {
    id: 5,
    title: "The Future of Link Management: Trends to Watch",
    excerpt: "How link management is evolving and what it means for marketers and content creators.",
    date: "March 5, 2024",
    readTime: "5 min read",
    category: "Trends",
    image: "/blog/future-link-management.jpg"
  },
  {
    id: 6,
    title: "Case Study: How Company X Increased Conversions by 300%",
    excerpt: "A deep dive into the strategies that helped Company X achieve remarkable results with their referral program.",
    date: "February 18, 2024",
    readTime: "10 min read",
    category: "Case Study",
    image: "/blog/case-study.jpg"
  },
]

export default function BlogPage() {
  return (
    <div className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Blog & Resources
          </h1>
          <p className="text-xl text-muted-foreground">
            Learn about referral marketing, link management, and growth strategies from our team of experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col h-full group hover:shadow-lg transition-shadow">
              <div className="h-48 bg-muted/20 flex items-center justify-center">
                <div className="h-full w-full bg-muted/40 flex items-center justify-center">
                  <span className="text-2xl">📝</span>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                  <Link href={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="mt-2">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href={`/blog/${post.id}`} className="flex items-center">
                    Read more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  )
}
