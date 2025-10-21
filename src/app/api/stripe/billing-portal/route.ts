import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { stripeService } from '@/lib/stripe'

export async function POST() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's business and subscription
    const membership = await prisma.businessMember.findFirst({
      where: { userId: session.user.id },
      include: { 
        business: {
          include: { subscription: true }
        }
      }
    })

    if (!membership?.business?.subscription?.stripeCustomerId) {
      return NextResponse.json({ error: 'No subscription found' }, { status: 404 })
    }

    const returnUrl = `${process.env.APP_URL}/dashboard/billing`

    const portalSession = await stripeService.createBillingPortalSession(
      membership.business.subscription.stripeCustomerId,
      returnUrl
    )

    return NextResponse.json({ url: portalSession.url })
  } catch (error) {
    console.error('Error creating billing portal session:', error)
    return NextResponse.json(
      { error: 'Failed to create billing portal session' },
      { status: 500 }
    )
  }
}