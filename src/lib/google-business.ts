import { google } from 'googleapis'
import { prisma } from '@/lib/prisma'

export class GoogleBusinessService {
  private oauth2Client: any

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.APP_URL}/api/auth/callback/google`
    )
  }

  /**
   * Get authenticated client for a user
   */
  async getAuthenticatedClient(userId: string) {
    const account = await prisma.account.findFirst({
      where: {
        userId,
        provider: 'google'
      }
    })

    if (!account || !account.access_token) {
      throw new Error('No Google account found for user')
    }

    this.oauth2Client.setCredentials({
      access_token: account.access_token,
      refresh_token: account.refresh_token,
    })

    return this.oauth2Client
  }

  /**
   * Fetch reviews for a business location
   */
  async fetchReviews(userId: string, locationId: string) {
    try {
      const auth = await this.getAuthenticatedClient(userId)
      
      const myBusiness = new google.mybusinessreviews_v1.Mybusinessreviews({ auth })

      const reviewsResponse = await myBusiness.accounts.locations.reviews.list({
        parent: locationId,
        pageSize: 50
      })

      return reviewsResponse.data.reviews || []
    } catch (error) {
      console.error('Error fetching Google reviews:', error)
      throw new Error('Failed to fetch Google reviews')
    }
  }

  /**
   * Get business locations for a user
   */
  async getBusinessLocations(userId: string) {
    try {
      const auth = await this.getAuthenticatedClient(userId)
      
      const myBusiness = new google.mybusinessbusinessinformation_v1.Mybusinessbusinessinformation({ auth })

      // Get accounts
      const accountsResponse = await myBusiness.accounts.list({
        pageSize: 50
      })
      const accounts = accountsResponse.data.accounts || []

      const locations = []

      for (const account of accounts) {
        const locationsResponse = await myBusiness.accounts.locations.list({
          parent: account.name,
          pageSize: 50
        })

        if (locationsResponse.data.locations) {
          locations.push(...locationsResponse.data.locations)
        }
      }

      return locations
    } catch (error) {
      console.error('Error fetching Google business locations:', error)
      throw new Error('Failed to fetch business locations')
    }
  }

  /**
   * Reply to a Google review
   */
  async replyToReview(
    userId: string,
    locationId: string,
    reviewId: string,
    response: string
  ) {
    try {
      const auth = await this.getAuthenticatedClient(userId)
      
      const myBusiness = new google.mybusinessreviews_v1.Mybusinessreviews({ auth })

      await myBusiness.accounts.locations.reviews.updateReply({
        name: `${locationId}/reviews/${reviewId}`,
        requestBody: {
          comment: response
        }
      })

      return true
    } catch (error) {
      console.error('Error replying to Google review:', error)
      throw new Error('Failed to reply to review')
    }
  }

  /**
   * Sync reviews for a business
   */
  async syncReviews(businessId: string, userId: string, locationId: string) {
    try {
      const reviews = await this.fetchReviews(userId, locationId)
      const business = await prisma.business.findUnique({
        where: { id: businessId }
      })

      if (!business) {
        throw new Error('Business not found')
      }

      // Process each review
      for (const googleReview of reviews) {
        // Check if review already exists
        const existingReview = await prisma.review.findUnique({
          where: { reviewId: googleReview.reviewId }
        })

        if (existingReview) {
          continue // Skip existing reviews
        }

        // Create new review
        await prisma.review.create({
          data: {
            businessId,
            platform: 'GOOGLE',
            reviewId: googleReview.reviewId,
            authorName: googleReview.reviewer?.displayName,
            authorPhoto: googleReview.reviewer?.profilePhotoUrl,
            rating: googleReview.starRating,
            title: '',
            content: googleReview.comment || '',
            reviewUrl: `https://search.google.com/local/reviews?placeid=${locationId}&q=reviews&review=${googleReview.reviewId}`,
            publishedAt: new Date(googleReview.createTime),
            status: googleReview.reviewReply ? 'RESPONDED' : 'PENDING',
            response: googleReview.reviewReply?.comment || '',
            respondedAt: googleReview.reviewReply?.updateTime 
              ? new Date(googleReview.reviewReply.updateTime) 
              : null,
            sentiment: 'NEUTRAL', // Will be updated by AI service
            keywords: []
          }
        })
      }

      // Update integration sync status
      await prisma.integration.updateMany({
        where: {
          businessId,
          platform: 'GOOGLE_BUSINESS'
        },
        data: {
          lastSync: new Date(),
          syncStatus: 'SYNCED'
        }
      })

      return reviews.length
    } catch (error) {
      console.error('Error syncing Google reviews:', error)
      throw error
    }
  }
}

// Export singleton instance
export const googleBusinessService = new GoogleBusinessService()
