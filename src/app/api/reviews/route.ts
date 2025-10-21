import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { aiService } from '@/lib/ai'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const platform = searchParams.get('platform')
    const sentiment = searchParams.get('sentiment')

    // Get user's business memberships
    const memberships = await prisma.businessMember.findMany({
      where: { userId: session.user.id },
      include: { business: true }
    })

    const businessIds = memberships.map(m => m.businessId)

    // Build where clause
    const whereClause: any = {
      businessId: { in: businessIds }
    }

    if (status) whereClause.status = status
    if (platform) whereClause.platform = platform
    if (sentiment) whereClause.sentiment = sentiment

    // Get reviews
    const reviews = await prisma.review.findMany({
      where: whereClause,
      include: {
        business: true,
        location: true,
      },
      orderBy: { publishedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    })

    // Get total count
    const totalCount = await prisma.review.count({
      where: whereClause
    })

    return NextResponse.json({
      reviews,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { 
      businessId, 
      locationId, 
      platform, 
      reviewId, 
      authorName, 
      authorPhoto, 
      rating, 
      title, 
      content,
      reviewUrl,
      publishedAt 
    } = body

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

    // Analyze sentiment using AI
    const sentimentAnalysis = await aiService.analyzeSentiment(content)

    // Create review
    const review = await prisma.review.create({
      data: {
        businessId,
        locationId,
        platform,
        reviewId,
        authorName,
        authorPhoto,
        rating,
        title,
        content,
        reviewUrl,
        publishedAt: new Date(publishedAt),
        sentiment: sentimentAnalysis.sentiment,
        keywords: sentimentAnalysis.keywords,
        category: sentimentAnalysis.category,
        status: 'PENDING'
      }
    })

    // Generate AI response
    const business = await prisma.business.findUnique({
      where: { id: businessId }
    })

    if (business) {
      const aiResponse = await aiService.generateResponse({
        reviewText: content,
        reviewRating: rating,
        businessName: business.name,
        businessType: 'business',
        tone: business.tonePreset as any,
        platform,
        customerName: authorName
      })

      // Update review with AI response
      await prisma.review.update({
        where: { id: review.id },
        data: { aiResponse }
      })

      review.aiResponse = aiResponse
    }

    return NextResponse.json(review)
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    )
  }
}