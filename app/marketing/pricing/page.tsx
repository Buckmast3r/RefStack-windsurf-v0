import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: 9,
      period: 'month',
      description: 'Perfect for individuals getting started with referrals',
      features: [
        'Up to 1000 link clicks/month',
        'Basic analytics',
        'Custom domains',
        'Email support',
      ],
      cta: 'Get Started',
      featured: false,
    },
    {
      name: 'Pro',
      price: 29,
      period: 'month',
      description: 'For professionals and growing businesses',
      features: [
        'Up to 10,000 link clicks/month',
        'Advanced analytics',
        'Custom domains',
        'Team members',
        'Priority support',
        'API access',
      ],
      cta: 'Start Free Trial',
      featured: true,
    },
    {
      name: 'Enterprise',
      price: 99,
      period: 'month',
      description: 'For businesses with high-volume needs',
      features: [
        'Unlimited link clicks',
        'Advanced analytics',
        'Custom domains',
        'Unlimited team members',
        'Priority 24/7 support',
        'API access',
        'White labeling',
      ],
      cta: 'Contact Sales',
      featured: false,
    },
  ]

  return (
    <div className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose the perfect plan for your needs. Start with a 14-day free trial, no credit card required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-2xl border p-8 ${
                plan.featured 
                  ? 'border-blue-500 shadow-xl shadow-blue-500/10' 
                  : 'border-border'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-500 text-white text-xs font-medium px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">/{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full ${
                  plan.featured 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-primary'
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
