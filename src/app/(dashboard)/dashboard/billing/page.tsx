'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Check, 
  X, 
  CreditCard, 
  Calendar, 
  Users,
  MessageSquare,
  Bell,
  Zap
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for small businesses getting started',
    features: [
      { text: 'Up to 20 reviews per month', included: true },
      { text: 'Single business location', included: true },
      { text: 'Basic AI responses', included: true },
      { text: 'Email notifications', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Google Business integration', included: true },
      { text: 'Multi-location support', included: false },
      { text: 'WhatsApp notifications', included: false },
      { text: 'Advanced analytics', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Current Plan',
    popular: false,
    badge: 'Free Forever',
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For growing businesses with moderate review volume',
    features: [
      { text: 'Up to 500 reviews per month', included: true },
      { text: 'Up to 3 business locations', included: true },
      { text: 'Advanced AI responses', included: true },
      { text: 'Email & WhatsApp notifications', included: true },
      { text: 'Advanced analytics & reporting', included: true },
      { text: 'Multi-platform integration', included: true },
      { text: 'Response templates', included: true },
      { text: 'Priority support', included: true },
      { text: 'API access', included: false },
      { text: 'White-label options', included: false },
    ],
    cta: 'Upgrade to Pro',
    popular: true,
    badge: 'Most Popular',
  },
  {
    name: 'Business',
    price: '$99',
    period: '/month',
    description: 'For established businesses with high review volume',
    features: [
      { text: 'Unlimited reviews per month', included: true },
      { text: 'Up to 10 business locations', included: true },
      { text: 'Premium AI responses with tone training', included: true },
      { text: 'Advanced notifications & alerts', included: true },
      { text: 'Comprehensive analytics dashboard', included: true },
      { text: 'All platform integrations', included: true },
      { text: 'Custom response templates', included: true },
      { text: 'White-label options', included: true },
      { text: 'API access', included: true },
      { text: 'Dedicated support', included: true },
    ],
    cta: 'Upgrade to Business',
    popular: false,
    badge: 'Best Value',
  },
]

export default function BillingPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [subscription, setSubscription] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubscription()
  }, [])

  const fetchSubscription = async () => {
    try {
      const response = await fetch('/api/billing/subscription')
      const data = await response.json()
      setSubscription(data.subscription)
    } catch (error) {
      console.error('Error fetching subscription:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpgrade = async (planName: string) => {
    try {
      const plan = plans.find(p => p.name === planName)
      if (!plan) return

      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId: 'default-business-id', // This should come from context
          priceId: getPriceIdForPlan(planName)
        })
      })

      const { sessionId } = await response.json()
      
      // Redirect to Stripe Checkout
      const stripe = (window as any).Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      await stripe.redirectToCheckout({ sessionId })
    } catch (error) {
      toast('Error', {
        description: 'Failed to create checkout session',
        variant: 'destructive'
      })
    }
  }

  const getPriceIdForPlan = (planName: string) => {
    const priceIds: { [key: string]: string } = {
      'Pro': process.env.STRIPE_PRO_PRICE_ID!,
      'Business': process.env.STRIPE_BUSINESS_PRICE_ID!,
      'Agency': process.env.STRIPE_AGENCY_PRICE_ID!,
    }
    return priceIds[planName]
  }

  const getUsagePercentage = () => {
    if (!subscription) return 0
    const { reviewsThisMonth, maxReviewsPerMonth } = subscription
    return Math.min((reviewsThisMonth / maxReviewsPerMonth) * 100, 100)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing & Plans</h1>
          <p className="text-muted-foreground">
            Manage your subscription and billing information
          </p>
        </div>
      </div>

      {/* Current Plan Card */}
      {subscription && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                You're currently on the {subscription.plan} plan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <CreditCard className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-semibold">{subscription.plan} Plan</p>
                      <p className="text-sm text-muted-foreground">
                        {subscription.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                      </p>
                    </div>
                  </div>
                  
                  {subscription.currentPeriodStart && (
                    <div className="flex items-center gap-4">
                      <Calendar className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-semibold">Billing Cycle</p>
                        <p className="text-sm text-muted-foreground">
                          Renews on {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Monthly Usage</span>
                      <span className="text-sm text-muted-foreground">
                        {subscription.reviewsThisMonth} / {subscription.maxReviewsPerMonth} reviews
                      </span>
                    </div>
                    <Progress value={getUsagePercentage()} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  variant="outline"
                  onClick={() => {
                    // Open billing portal
                    window.open('/api/stripe/billing-portal', '_blank')
                  }}
                >
                  Manage Billing
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Plan Selection */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative ${plan.popular ? 'lg:scale-105' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-revugenie-blue to-revugenie-teal text-white px-4 py-1">
                  Most Popular
                </Badge>
              </div>
            )}
            
            <Card className={`h-full flex flex-col ${plan.popular ? 'border-primary shadow-lg' : 'border-border'}`}>
              <CardHeader className="text-center">
                <CardTitle className="text-sm font-medium text-muted-foreground mb-2">
                  {plan.badge}
                </CardTitle>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <CardDescription className="mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <div className="p-6 pt-0">
                <Button 
                  className="w-full"
                  variant={plan.popular ? 'default' : 'outline'}
                  disabled={plan.name === subscription?.plan}
                  onClick={() => handleUpgrade(plan.name)}
                >
                  {plan.name === subscription?.plan ? 'Current Plan' : plan.cta}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Can I change my plan anytime?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, all paid plans come with a 14-day free trial. No credit card required to start.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">What happens if I exceed my review limit?</h3>
              <p className="text-sm text-muted-foreground">
                We'll notify you when you approach your limit. You can upgrade your plan or wait for the next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
