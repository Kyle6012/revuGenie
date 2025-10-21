import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { googleBusinessService } from '@/lib/google-business'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { businessId, locationId } = await request.json()

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

    // Check Google integration status
    const integration = await prisma.integration.findFirst({
      where: {
        businessId,
        platform: 'GOOGLE_BUSINESS'
      }
    })

    if (!integration || !integration.isConnected) {
      return NextResponse.json(
        { error: 'Google Business not connected' },
        { status: 400 }
      )
    }

    // Update sync status
    await prisma.integration.update({
      where: { id: integration.id },
      data: { syncStatus: 'SYNCING' }
    })

    try {
      // Sync reviews
      const syncedCount = await googleBusinessService.syncReviews(
        businessId,
        session.user.id,
        locationId
      )

      return NextResponse.json({
        success: true,
        syncedCount,
        message: `Successfully synced ${syncedCount} reviews`
      })
    } catch (syncError) {
      // Update sync status to error
      await prisma.integration.update({
        where: { id: integration.id },
        data: { 
          syncStatus: 'ERROR',
          errorMessage: syncError instanceof Error ? syncError.message : 'Sync failed'
        }
      })

      throw syncError
    }
  } catch (error) {
    console.error('Error syncing Google reviews:', error)
    return NextResponse.json(
      { error: 'Failed to sync reviews' },
      { status: 500 }
    )
  }
}