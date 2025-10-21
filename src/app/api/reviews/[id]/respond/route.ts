import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { response, useAI = false } = await request.json()

    // Get review
    const review = await prisma.review.findUnique({
      where: { id: params.id },
      include: {
        business: {
          include: {
            memberships: true
          }
        }
      }
    })

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }

    // Check if user has access to this business
    const hasAccess = review.business.memberships.some(
      m => m.userId === session.user.id
    )

    if (!hasAccess) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    // Update review with response
    const updatedReview = await prisma.review.update({
      where: { id: params.id },
      data: {
        response: useAI ? review.aiResponse : response,
        responseBy: session.user.name || session.user.email,
        respondedAt: new Date(),
        status: 'RESPONDED'
      }
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        businessId: review.businessId,
        reviewId: review.id,
        action: 'REVIEW_RESPONDED',
        description: `Responded to review from ${review.authorName}`,
      }
    })

    return NextResponse.json(updatedReview)
  } catch (error) {
    console.error('Error responding to review:', error)
    return NextResponse.json(
      { error: 'Failed to respond to review' },
      { status: 500 }
    )
  }
}