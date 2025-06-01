import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function FeaturesPage() {
  const features = [
    {
      title: "Link Management",
      description: "Create, organize, and manage all your referral links in one place.",
      icon: <CheckCircle className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Analytics Dashboard",
      description: "Track clicks, conversions, and other important metrics in real-time.",
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
    },
    {
      title: "Custom Domains",
      description: "Use your own domain to build trust with your audience.",
      icon: <CheckCircle className="h-6 w-6 text-purple-500" />,
    },
    {
      title: "Team Collaboration",
      description: "Invite team members and manage permissions with ease.",
      icon: <CheckCircle className="h-6 w-6 text-yellow-500" />,
    },
    {
      title: "API Access",
      description: "Integrate with your existing tools using our powerful API.",
      icon: <CheckCircle className="h-6 w-6 text-red-500" />,
    },
    {
      title: "White Label",
      description: "Remove RefStack branding and use your own.",
      icon: <CheckCircle className="h-6 w-6 text-pink-500" />,
    },
  ]

  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Powerful Features for Your Referral Links
        </h1>
        <p className="text-lg text-muted-foreground">
          Everything you need to create, manage, and track your referral links in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="h-full transition-all hover:shadow-lg hover:border-blue-500/20">
            <CardHeader>
              <div className="flex items-center space-x-2">
                {feature.icon}
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
