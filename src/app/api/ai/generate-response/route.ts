/// <reference path="../../../../types/next-auth.d.ts" />

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { aiService } from '@/lib/ai'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { reviewId, customTone } = await request.json()

    // Get review
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
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

    // Generate AI response
    const aiResponse = await aiService.generateResponse({
      reviewText: review.content,
      reviewRating: review.rating,
      businessName: review.business.name,
      businessType: 'business',
      tone: customTone || review.business?.tonePreset as any,
      platform: review.platform,
      customerName: review.authorName
    })

    // Update review with AI response
    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: { aiResponse }
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        businessId: review.businessId,
        reviewId: review.id,
        action: 'AI_RESPONSE_GENERATED',
        description: 'Generated AI response for review',
      }
    })

    return NextResponse.json({ 
      review: updatedReview,
      aiResponse 
    })
  } catch (error) {
    console.error('Error generating AI response:', error)
    return NextResponse.json(
      { error: 'Failed to generate AI response' },
      { status: 500 }
    )
  }
}
