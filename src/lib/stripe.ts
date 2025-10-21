import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export const PLANS = {
  FREE: {
    name: 'Free',
    price: 0,
    stripePriceId: null,
    features: {
      maxReviews: 20,
      maxLocations: 1,
      aiResponses: true,
      emailNotifications: true,
      whatsappNotifications: false,
      analytics: 'basic',
      support: 'community',
    }
  },
  PRO: {
    name: 'Pro',
    price: 2900, // $29 in cents
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID,
    features: {
      maxReviews: 500,
      maxLocations: 3,
      aiResponses: true,
      emailNotifications: true,
      whatsappNotifications: false,
      analytics: 'advanced',
      support: 'email',
    }
  },
  BUSINESS: {
    name: 'Business',
    price: 9900, // $99 in cents
    stripePriceId: process.env.STRIPE_BUSINESS_PRICE_ID,
    features: {
      maxReviews: -1, // unlimited
      maxLocations: 10,
      aiResponses: true,
      emailNotifications: true,
      whatsappNotifications: true,
      analytics: 'comprehensive',
      support: 'priority',
    }
  },
  AGENCY: {
    name: 'Agency',
    price: 19900, // $199 in cents
    stripePriceId: process.env.STRIPE_AGENCY_PRICE_ID,
    features: {
      maxReviews: -1, // unlimited
      maxLocations: 50,
      aiResponses: true,
      emailNotifications: true,
      whatsappNotifications: true,
      analytics: 'enterprise',
      support: 'dedicated',
      whiteLabel: true,
    }
  }
}

export class StripeService {
  /**
   * Create a checkout session for subscription
   */
  async createCheckoutSession(
    businessId: string,
    priceId: string,
    successUrl: string,
    cancelUrl: string
  ) {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          businessId,
        },
        subscription_data: {
          metadata: {
            businessId,
          },
        },
      })

      return session
    } catch (error) {
      console.error('Error creating checkout session:', error)
      throw error
    }
  }

  /**
   * Create a billing portal session
   */
  async createBillingPortalSession(
    customerId: string,
    returnUrl: string
  ) {
    try {
      const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
      })

      return session
    } catch (error) {
      console.error('Error creating billing portal session:', error)
      throw error
    }
  }

  /**
   * Handle webhook events
   */
  async handleWebhookEvent(event: any) {
    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutSessionCompleted(event.data.object)
        break
      
      case 'customer.subscription.created':
        await this.handleSubscriptionCreated(event.data.object)
        break
      
      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdated(event.data.object)
        break
      
      case 'customer.subscription.deleted':
        await this.handleSubscriptionDeleted(event.data.object)
        break
      
      case 'invoice.payment_succeeded':
        await this.handlePaymentSucceeded(event.data.object)
        break
      
      case 'invoice.payment_failed':
        await this.handlePaymentFailed(event.data.object)
        break
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }
  }

  /**
   * Handle checkout session completion
   */
  private async handleCheckoutSessionCompleted(session: any) {
    const businessId = session.metadata?.businessId
    const subscriptionId = session.subscription

    if (!businessId || !subscriptionId) {
      console.error('Missing businessId or subscriptionId in session metadata')
      return
    }

    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId)
      const priceId = subscription.items.data[0].price.id

      // Find plan by price ID
      const plan = Object.values(PLANS).find(p => p.stripePriceId === priceId)
      if (!plan) {
        console.error('Unknown price ID:', priceId)
        return
      }

      // Update subscription in database
      await prisma.subscription.upsert({
        where: { businessId },
        update: {
          stripeCustomerId: session.customer,
          stripeSubscriptionId: subscriptionId,
          stripePriceId: priceId,
          plan: plan.name.toUpperCase() as any,
          status: 'ACTIVE',
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
        create: {
          businessId,
          stripeCustomerId: session.customer,
          stripeSubscriptionId: subscriptionId,
          stripePriceId: priceId,
          plan: plan.name.toUpperCase() as any,
          status: 'ACTIVE',
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          maxReviewsPerMonth: plan.features.maxReviews === -1 ? 10000 : plan.features.maxReviews,
        }
      })

      console.log('Subscription updated for business:', businessId)
    } catch (error) {
      console.error('Error handling checkout session:', error)
    }
  }

  /**
   * Handle subscription creation
   */
  private async handleSubscriptionCreated(subscription: any) {
    // Similar to checkout session completed
    await this.handleSubscriptionUpdated(subscription)
  }

  /**
   * Handle subscription updates
   */
  private async handleSubscriptionUpdated(subscription: any) {
    const businessId = subscription.metadata?.businessId
    
    if (!businessId) {
      console.error('Missing businessId in subscription metadata')
      return
    }

    try {
      const priceId = subscription.items.data[0].price.id
      const plan = Object.values(PLANS).find(p => p.stripePriceId === priceId)
      
      if (!plan) {
        console.error('Unknown price ID:', priceId)
        return
      }

      await prisma.subscription.update({
        where: { businessId },
        data: {
          status: subscription.status.toUpperCase() as any,
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
        }
      })

      console.log('Subscription updated:', subscription.id)
    } catch (error) {
      console.error('Error updating subscription:', error)
    }
  }

  /**
   * Handle subscription deletion
   */
  private async handleSubscriptionDeleted(subscription: any) {
    const businessId = subscription.metadata?.businessId
    
    if (!businessId) {
      console.error('Missing businessId in subscription metadata')
      return
    }

    try {
      await prisma.subscription.update({
        where: { businessId },
        data: {
          status: 'CANCELED',
        }
      })

      console.log('Subscription canceled:', subscription.id)
    } catch (error) {
      console.error('Error canceling subscription:', error)
    }
  }

  /**
   * Handle successful payment
   */
  private async handlePaymentSucceeded(invoice: any) {
    const subscriptionId = invoice.subscription
    
    if (!subscriptionId) return

    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId)
      const businessId = subscription.metadata?.businessId
      
      if (!businessId) return

      // Reset monthly usage
      await prisma.subscription.update({
        where: { businessId },
        data: {
          reviewsThisMonth: 0,
        }
      })

      console.log('Payment succeeded, usage reset for business:', businessId)
    } catch (error) {
      console.error('Error handling payment success:', error)
    }
  }

  /**
   * Handle failed payment
   */
  private async handlePaymentFailed(invoice: any) {
    const subscriptionId = invoice.subscription
    
    if (!subscriptionId) return

    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId)
      const businessId = subscription.metadata?.businessId
      
      if (!businessId) return

      // Update subscription status
      await prisma.subscription.update({
        where: { businessId },
        data: {
          status: 'PAST_DUE',
        }
      })

      console.log('Payment failed for business:', businessId)
    } catch (error) {
      console.error('Error handling payment failure:', error)
    }
  }
}

// Export singleton instance
export const stripeService = new StripeService()