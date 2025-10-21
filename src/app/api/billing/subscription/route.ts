import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's business
    const membership = await prisma.businessMember.findFirst({
      where: { userId: session.user.id },
      include: { business: true }
    })

    if (!membership) {
      return NextResponse.json({ error: 'No business found' }, { status: 404 })
    }

    // Get subscription
    const subscription = await prisma.subscription.findUnique({
      where: { businessId: membership.businessId }
    })

    return NextResponse.json({ subscription })
  } catch (error) {
    console.error('Error fetching subscription:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    )
  }
}