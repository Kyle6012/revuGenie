import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { stripeService } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { businessId, priceId } = await request.json()

    // Check if user has access to this business
    const membership = await prisma.businessMember.findFirst({
      where: {
        userId: session.user.id,
        businessId
      }
    })

    if (!membership) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    const successUrl = `${process.env.APP_URL}/dashboard/billing?success=true`
    const cancelUrl = `${process.env.APP_URL}/dashboard/billing?canceled=true`

    const checkoutSession = await stripeService.createCheckoutSession(
      businessId,
      priceId,
      successUrl,
      cancelUrl
    )

    return NextResponse.json({ sessionId: checkoutSession.id })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}