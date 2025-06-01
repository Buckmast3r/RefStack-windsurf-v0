import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function MarketingPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Manage Your Referral Links with Ease
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          RefStack helps you create, manage, and track your referral links in one place.
          Get detailed analytics and grow your audience with ease.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild size="lg">
            <Link href="/register">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/features">Learn more</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
