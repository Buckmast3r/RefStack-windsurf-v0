"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckIcon, XIcon, AlertCircleIcon, ArrowRightIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { toast } from "sonner"

// Types for subscription data
type SubscriptionPlan = {
  id: string
  name: string
  description: string
  price: number
  interval: 'monthly' | 'yearly'
  currency: string
  features: string[]
  maxLinks: number
  popular?: boolean
  active: boolean
  stripeProductId?: string
  stripePriceId?: string
  paypalPlanId?: string
}

type UserSubscription = {
  id: string
  userId: string
  plan: string
  status: string
  startDate: string
  currentPeriodEnd: string
  maxLinks: number
  features: string[]
  cancelAtPeriodEnd?: boolean
  paymentMethod?: string
}

type SubscriptionData = {
  userSubscription: UserSubscription | null
  availablePlans: SubscriptionPlan[]
}

export default function SubscriptionPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>({
    userSubscription: null,
    availablePlans: []
  })
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'stripe' | 'paypal' | 'crypto'>('stripe')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [cancelReason, setCancelReason] = useState("")
  const [isCancelling, setIsCancelling] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/login?callbackUrl=${encodeURIComponent('/dashboard/subscription')}`)
      return
    }

    if (status === "authenticated") {
      fetchSubscriptionData()
    }
  }, [status, router])

  const fetchSubscriptionData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/subscriptions')
      
      if (!response.ok) {
        throw new Error('Failed to fetch subscription data')
      }
      
      const data = await response.json()
      setSubscriptionData(data)
    } catch (error) {
      console.error('Error fetching subscription data:', error)
      toast.error('Failed to load subscription information')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan)
  }

  const handlePaymentMethodChange = (method: 'stripe' | 'paypal' | 'crypto') => {
    setSelectedPaymentMethod(method)
  }

  const handleSubscribe = async () => {
    if (!selectedPlan) return

    try {
      setIsProcessing(true)
      let response

      if (selectedPaymentMethod === 'stripe') {
        response = await fetch('/api/payments/stripe/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            planId: selectedPlan.id,
          }),
        })
      } else if (selectedPaymentMethod === 'paypal') {
        response = await fetch('/api/payments/paypal/create-subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            planId: selectedPlan.id,
          }),
        })
      } else if (selectedPaymentMethod === 'crypto') {
        response = await fetch('/api/payments/crypto/create-charge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            planId: selectedPlan.id,
          }),
        })
      }

      if (!response || !response.ok) {
        const error = await response?.json()
        throw new Error(error?.error || 'Failed to process payment')
      }

      const data = await response.json()
      
      // Redirect to checkout
      if (selectedPaymentMethod === 'stripe' && data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else if (selectedPaymentMethod === 'paypal' && data.approvalUrl) {
        window.location.href = data.approvalUrl
      } else if (selectedPaymentMethod === 'crypto' && data.hostedUrl) {
        window.location.href = data.hostedUrl
      }
    } catch (error: any) {
      console.error('Payment processing error:', error)
      toast.error(error.message || 'Failed to process payment')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCancelSubscription = async () => {
    try {
      setIsCancelling(true)
      const response = await fetch('/api/subscriptions', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reason: cancelReason,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to cancel subscription')
      }

      toast.success('Subscription has been scheduled for cancellation')
      setShowCancelDialog(false)
      fetchSubscriptionData()
    } catch (error) {
      console.error('Error cancelling subscription:', error)
      toast.error('Failed to cancel subscription')
    } finally {
      setIsCancelling(false)
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="container py-8">
        <Skeleton className="h-12 w-48 mb-8" />
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-96 rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  const { userSubscription, availablePlans } = subscriptionData

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Subscription</h1>
          <p className="text-muted-foreground mt-1">
            Manage your subscription plan and payment method
          </p>
        </div>
      </div>

      {/* Current Subscription Card */}
      {userSubscription && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your active subscription details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">{userSubscription.plan}</h3>
                <p className="text-muted-foreground">
                  {userSubscription.status === 'ACTIVE' 
                    ? `Renews on ${new Date(userSubscription.currentPeriodEnd).toLocaleDateString()}`
                    : userSubscription.status === 'CANCELED' 
                      ? 'Cancels at end of billing period'
                      : userSubscription.status === 'PAST_DUE' 
                        ? 'Payment past due'
                        : 'Inactive'}
                </p>
                
                <div className="mt-4">
                  <Badge variant={
                    userSubscription.status === 'ACTIVE' 
                      ? 'default' 
                      : userSubscription.status === 'CANCELED' 
                        ? 'secondary'
                        : userSubscription.status === 'PAST_DUE' 
                          ? 'destructive'
                          : 'outline'
                  }>
                    {userSubscription.status === 'ACTIVE' 
                      ? 'Active' 
                      : userSubscription.status === 'CANCELED' 
                        ? 'Canceling'
                        : userSubscription.status === 'PAST_DUE' 
                          ? 'Past Due'
                          : 'Inactive'}
                  </Badge>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <p className="font-medium">Plan Features:</p>
                <ul className="mt-2 space-y-1">
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    <span>Up to {userSubscription.maxLinks} referral links</span>
                  </li>
                  {userSubscription.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-4">
            {userSubscription.status === 'ACTIVE' && !userSubscription.cancelAtPeriodEnd && (
              <Button 
                variant="outline" 
                onClick={() => setShowCancelDialog(true)}
              >
                Cancel Subscription
              </Button>
            )}
            <Button onClick={() => window.location.hash = "plans"}>
              Change Plan
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Available Plans */}
      <div id="plans">
        <h2 className="text-2xl font-bold mb-4">Available Plans</h2>
        
        <Tabs defaultValue="monthly" className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly (Save 15%)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="monthly" className="mt-6">
            <div className="grid gap-6 md:grid-cols-3">
              {availablePlans
                .filter(plan => plan.interval === 'monthly' && plan.active)
                .map(plan => (
                  <Card 
                    key={plan.id}
                    className={`${plan.popular ? 'border-primary shadow-md' : ''} relative`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-0 right-0 flex justify-center">
                        <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-6">
                        ${plan.price.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">/month</span>
                      </div>
                      
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                          <span>Up to {plan.maxLinks} referral links</span>
                        </li>
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        onClick={() => handleSelectPlan(plan)}
                        variant={
                          userSubscription?.plan === plan.name 
                            ? "outline" 
                            : plan.popular 
                              ? "default" 
                              : "outline"
                        }
                        disabled={userSubscription?.plan === plan.name}
                      >
                        {userSubscription?.plan === plan.name 
                          ? "Current Plan" 
                          : userSubscription 
                            ? "Switch to This Plan" 
                            : "Select Plan"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="yearly" className="mt-6">
            <div className="grid gap-6 md:grid-cols-3">
              {availablePlans
                .filter(plan => plan.interval === 'yearly' && plan.active)
                .map(plan => (
                  <Card 
                    key={plan.id}
                    className={`${plan.popular ? 'border-primary shadow-md' : ''} relative`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-0 right-0 flex justify-center">
                        <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-6">
                        ${plan.price.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">/year</span>
                      </div>
                      
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                          <span>Up to {plan.maxLinks} referral links</span>
                        </li>
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        onClick={() => handleSelectPlan(plan)}
                        variant={
                          userSubscription?.plan === plan.name 
                            ? "outline" 
                            : plan.popular 
                              ? "default" 
                              : "outline"
                        }
                        disabled={userSubscription?.plan === plan.name}
                      >
                        {userSubscription?.plan === plan.name 
                          ? "Current Plan" 
                          : userSubscription 
                            ? "Switch to This Plan" 
                            : "Select Plan"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Select Payment Method and Subscribe Dialog */}
      {selectedPlan && (
        <Dialog open={!!selectedPlan} onOpenChange={(open) => !open && setSelectedPlan(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Subscribe to {selectedPlan.name}</DialogTitle>
              <DialogDescription>
                Select your preferred payment method
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <Button
                  variant={selectedPaymentMethod === 'stripe' ? "default" : "outline"}
                  onClick={() => handlePaymentMethodChange('stripe')}
                  className="flex flex-col items-center justify-center h-20"
                >
                  <div className="font-semibold">Credit Card</div>
                  <div className="text-xs text-muted-foreground">via Stripe</div>
                </Button>
                
                <Button
                  variant={selectedPaymentMethod === 'paypal' ? "default" : "outline"}
                  onClick={() => handlePaymentMethodChange('paypal')}
                  className="flex flex-col items-center justify-center h-20"
                >
                  <div className="font-semibold">PayPal</div>
                  <div className="text-xs text-muted-foreground">PayPal account</div>
                </Button>
                
                <Button
                  variant={selectedPaymentMethod === 'crypto' ? "default" : "outline"}
                  onClick={() => handlePaymentMethodChange('crypto')}
                  className="flex flex-col items-center justify-center h-20"
                >
                  <div className="font-semibold">Crypto</div>
                  <div className="text-xs text-muted-foreground">BTC, ETH, etc.</div>
                </Button>
              </div>
              
              <div className="p-4 rounded-md bg-muted mb-4">
                <div className="flex justify-between mb-2">
                  <span>Plan:</span>
                  <span className="font-semibold">{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Billing:</span>
                  <span>{selectedPlan.interval === 'monthly' ? 'Monthly' : 'Annual'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Price:</span>
                  <span className="font-semibold">${selectedPlan.price.toFixed(2)} {selectedPlan.currency}</span>
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex justify-between sm:justify-between">
              <Button variant="outline" onClick={() => setSelectedPlan(null)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubscribe} 
                disabled={isProcessing}
                className="min-w-24"
              >
                {isProcessing ? "Processing..." : "Continue"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Cancel Subscription Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Subscription</DialogTitle>
            <DialogDescription>
              Your subscription will remain active until the end of the billing period.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <label className="block text-sm font-medium mb-2">
              Please tell us why you're cancelling (optional)
            </label>
            <textarea
              className="w-full p-2 border rounded-md"
              rows={3}
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Help us improve our service..."
            />
            
            <div className="mt-4 p-4 bg-amber-50 text-amber-800 rounded-md flex">
              <AlertCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
              <p className="text-sm">
                You'll lose access to premium features at the end of your billing period on {userSubscription?.currentPeriodEnd ? new Date(userSubscription.currentPeriodEnd).toLocaleDateString() : 'your renewal date'}.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              Keep Subscription
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleCancelSubscription}
              disabled={isCancelling}
            >
              {isCancelling ? "Processing..." : "Cancel Subscription"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
