'use client'

import { motion } from 'framer-motion'
import { Check, Star, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for small businesses getting started',
    features: [
      'Up to 20 reviews per month',
      'Single business location',
      'Basic AI responses',
      'Email notifications',
      'Basic analytics',
      'Google Business integration',
    ],
    cta: 'Get Started Free',
    popular: false,
    badge: 'Free Forever',
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For growing businesses with moderate review volume',
    features: [
      'Up to 500 reviews per month',
      'Up to 3 business locations',
      'Advanced AI responses',
      'Email & WhatsApp notifications',
      'Advanced analytics & reporting',
      'Multi-platform integration',
      'Response templates',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    popular: true,
    badge: 'Most Popular',
  },
  {
    name: 'Business',
    price: '$99',
    period: '/month',
    description: 'For established businesses with high review volume',
    features: [
      'Unlimited reviews per month',
      'Up to 10 business locations',
      'Premium AI responses with tone training',
      'Advanced notifications & alerts',
      'Comprehensive analytics dashboard',
      'All platform integrations',
      'Custom response templates',
      'White-label options',
      'API access',
      'Dedicated support',
    ],
    cta: 'Start Free Trial',
    popular: false,
    badge: 'Best Value',
  },
  {
    name: 'Agency',
    price: '$199',
    period: '/month',
    description: 'For agencies managing multiple clients',
    features: [
      'Unlimited reviews per month',
      'Up to 50 business locations',
      'Agency-level AI customization',
      'Client management dashboard',
      'White-label solution',
      'Advanced reporting & analytics',
      'Team collaboration tools',
      'Custom integrations',
      'Priority API access',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
    popular: false,
    badge: 'For Agencies',
  },
]

export function PricingSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-bold mb-4"
          >
            Simple, Transparent{' '}
            <span className="gradient-text">Pricing</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            Choose the perfect plan for your business. All plans include a 14-day free trial.
          </motion.p>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-sm text-muted-foreground">Monthly</span>
            <div className="relative">
              <input type="checkbox" className="sr-only" id="billing-toggle" />
              <label
                htmlFor="billing-toggle"
                className="relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full bg-primary transition-colors"
              >
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
              </label>
            </div>
            <span className="text-sm text-muted-foreground">Annual <Badge className="ml-1">Save 20%</Badge></span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
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
              
              <div className={`bg-card border ${plan.popular ? 'border-primary shadow-lg' : 'border-border'} rounded-xl p-6 h-full flex flex-col`}>
                <div className="text-center mb-6">
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    {plan.badge}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.popular ? 'bg-gradient-to-r from-revugenie-blue to-revugenie-teal' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Not sure which plan is right for you? 
            <a href="/contact" className="text-primary hover:underline ml-1">
              Contact our team
            </a>
          </p>
          
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
