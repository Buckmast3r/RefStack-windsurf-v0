import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BarChart, Code, Globe } from "lucide-react"

export default function AboutPage() {
  const stats = [
    { name: 'Active Users', value: '10,000+', icon: Users },
    { name: 'Links Created', value: '1M+', icon: Code },
    { name: 'Monthly Clicks', value: '100M+', icon: BarChart },
    { name: 'Countries', value: '150+', icon: Globe },
  ]

  const team = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      image: '/team/alex.jpg',
      bio: 'Passionate about building tools that make the web more connected.'
    },
    {
      name: 'Taylor Smith',
      role: 'CTO',
      image: '/team/taylor.jpg',
      bio: 'Loves solving complex technical challenges with elegant solutions.'
    },
    {
      name: 'Jordan Lee',
      role: 'Head of Product',
      image: '/team/jordan.jpg',
      bio: 'Focused on creating intuitive user experiences that delight customers.'
    },
  ]

  return (
    <div className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            About RefStack
          </h1>
          <p className="text-xl text-muted-foreground">
            Empowering businesses and creators to grow through better link management and analytics.
          </p>
        </div>

        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
          <div className="prose prose-lg dark:prose-invert max-w-3xl mx-auto">
            <p className="text-lg">
              RefStack was founded in 2023 with a simple mission: to help businesses and creators 
              maximize the potential of their referral links. We noticed that existing solutions were 
              either too complex or lacked essential features, so we set out to build something better.
            </p>
            <p className="text-lg">
              Today, RefStack powers thousands of businesses worldwide, from solo entrepreneurs to 
              Fortune 500 companies. Our platform makes it easy to create, manage, and track 
              referral links while providing powerful analytics to help you optimize your campaigns.
            </p>
          </div>
        </div>

        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-12 text-center">By The Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                      <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-4xl font-bold">{stat.value}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{stat.name}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <div className="h-48 bg-muted/20 flex items-center justify-center">
                  <div className="h-32 w-32 rounded-full bg-muted/40 flex items-center justify-center">
                    <span className="text-4xl">👤</span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{member.name}</CardTitle>
                  <p className="text-muted-foreground">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
