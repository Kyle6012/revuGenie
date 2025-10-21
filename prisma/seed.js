const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create demo user
  const hashedPassword = await bcrypt.hash('demo123', 12)
  
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@revugenie.com' },
    update: {},
    create: {
      name: 'Demo User',
      email: 'demo@revugenie.com',
      password: hashedPassword,
      emailVerified: new Date(),
    }
  })

  // Create demo business
  const demoBusiness = await prisma.business.upsert({
    where: { id: 'demo-business-1' },
    update: {},
    create: {
      id: 'demo-business-1',
      name: 'Demo Coffee Shop',
      description: 'A cozy coffee shop serving the best coffee in town with exceptional customer service.',
      website: 'https://democoffee.com',
      phone: '+1 (555) 123-4567',
      email: 'hello@democoffee.com',
      address: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      postalCode: '94102',
      timezone: 'America/Los_Angeles',
      isActive: true,
      isVerified: true,
    }
  })

  // Create business membership
  await prisma.businessMember.upsert({
    where: {
      userId_businessId: {
        userId: demoUser.id,
        businessId: demoBusiness.id
      }
    },
    update: {},
    create: {
      userId: demoUser.id,
      businessId: demoBusiness.id,
      role: 'OWNER',
    }
  })

  // Create business location
  const demoLocation = await prisma.businessLocation.upsert({
    where: { id: 'demo-location-1' },
    update: {},
    create: {
      id: 'demo-location-1',
      businessId: demoBusiness.id,
      name: 'Main Location',
      address: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      postalCode: '94102',
      phone: '+1 (555) 123-4567',
      email: 'hello@democoffee.com',
      googlePlaceId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
    }
  })

  // Create free subscription
  await prisma.subscription.upsert({
    where: { businessId: demoBusiness.id },
    update: {},
    create: {
      businessId: demoBusiness.id,
      plan: 'FREE',
      status: 'ACTIVE',
      maxReviewsPerMonth: 20,
      reviewsThisMonth: 8,
    }
  })

  // Create demo reviews
  const demoReviews = [
    {
      id: 'demo-review-1',
      businessId: demoBusiness.id,
      locationId: demoLocation.id,
      platform: 'GOOGLE',
      reviewId: 'google-review-1',
      authorName: 'Sarah Johnson',
      authorPhoto: 'https://api.dicebear.com/7.x/initials/svg?seed=SJ',
      rating: 5,
      title: 'Best coffee in the neighborhood!',
      content: 'Absolutely love this place! The coffee is always perfectly brewed, the staff is incredibly friendly, and the atmosphere is so cozy. I come here every morning before work and they remember my order. The pastries are fresh and delicious too. Highly recommend!',
      reviewUrl: 'https://goo.gl/maps/review1',
      publishedAt: new Date('2024-01-15T10:30:00Z'),
      sentiment: 'POSITIVE',
      keywords: ['coffee', 'friendly staff', 'atmosphere', 'pastries'],
      category: 'service',
      status: 'RESPONDED',
      response: 'Thank you so much for your kind words, Sarah! We\'re thrilled to hear about your positive experience. It\'s customers like you that make our job so rewarding. We look forward to seeing you every morning! ☕',
      respondedAt: new Date('2024-01-15T14:20:00Z'),
      responseBy: 'Demo User',
    },
    {
      id: 'demo-review-2',
      businessId: demoBusiness.id,
      locationId: demoLocation.id,
      platform: 'GOOGLE',
      reviewId: 'google-review-2',
      authorName: 'Mike Chen',
      authorPhoto: 'https://api.dicebear.com/7.x/initials/svg?seed=MC',
      rating: 4,
      title: 'Great service, good coffee',
      content: 'Solid coffee shop with excellent service. The baristas really know their craft and the coffee quality is consistently good. Only reason I\'m giving 4 stars instead of 5 is that it can get quite crowded during peak hours, but that\'s also a testament to how popular this place is!',
      reviewUrl: 'https://goo.gl/maps/review2',
      publishedAt: new Date('2024-01-14T16:45:00Z'),
      sentiment: 'POSITIVE',
      keywords: ['service', 'coffee quality', 'crowded', 'popular'],
      category: 'service',
      status: 'PENDING',
      aiResponse: 'Thank you for the fantastic feedback, Mike! We\'re so glad you appreciate our baristas\' craft and coffee quality. We know it can get busy during peak hours - we\'re actually looking into expanding our seating area to better accommodate all our wonderful customers. We appreciate your patience and support!',
    },
    {
      id: 'demo-review-3',
      businessId: demoBusiness.id,
      locationId: demoLocation.id,
      platform: 'FACEBOOK',
      reviewId: 'facebook-review-1',
      authorName: 'Emily Rodriguez',
      authorPhoto: 'https://api.dicebear.com/7.x/initials/svg?seed=ER',
      rating: 3,
      title: 'Decent coffee, slow service',
      content: 'The coffee is decent but the service was slower than expected during my visit. The staff seemed a bit overwhelmed with the lunch rush. I\'d probably come back during off-peak hours to give it another try. The ambiance is nice and the wifi is good for working.',
      reviewUrl: 'https://facebook.com/review3',
      publishedAt: new Date('2024-01-13T12:15:00Z'),
      sentiment: 'NEUTRAL',
      keywords: ['coffee', 'slow service', 'lunch rush', 'ambiance', 'wifi'],
      category: 'service',
      status: 'PENDING',
      aiResponse: 'Hi Emily, thank you for your honest feedback. We apologize for the slower service during your visit - you\'re absolutely right that lunch rush can be challenging for our team. We\'re working on improving our efficiency during peak hours and appreciate your patience. We\'d love to see you again during our quieter hours!',
    },
    {
      id: 'demo-review-4',
      businessId: demoBusiness.id,
      locationId: demoLocation.id,
      platform: 'GOOGLE',
      reviewId: 'google-review-4',
      authorName: 'David Wilson',
      authorPhoto: 'https://api.dicebear.com/7.x/initials/svg?seed=DW',
      rating: 5,
      title: 'Hidden gem!',
      content: 'Found this place by accident and now I\'m a regular! The cold brew is exceptional and their avocado toast is the best I\'ve had in the city. The staff always has great music playing and creates such a welcoming environment. Perfect spot for both quick coffee runs and long work sessions.',
      reviewUrl: 'https://goo.gl/maps/review4',
      publishedAt: new Date('2024-01-12T09:20:00Z'),
      sentiment: 'POSITIVE',
      keywords: ['cold brew', 'avocado toast', 'music', 'welcoming', 'work sessions'],
      category: 'service',
      status: 'PENDING',
      aiResponse: 'David, we\'re so happy you stumbled upon us! Your kind words about our cold brew and avocado toast made our day. We take pride in creating that perfect atmosphere with good music and a welcoming vibe. Thank you for becoming a regular - customers like you are why we love what we do!',
    }
  ]

  // Create reviews
  for (const review of demoReviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: review
    })
  }

  // Create analytics snapshot
  await prisma.analyticsSnapshot.upsert({
    where: { id: 'demo-analytics-1' },
    update: {},
    create: {
      id: 'demo-analytics-1',
      businessId: demoBusiness.id,
      date: new Date(),
      period: 'DAILY',
      totalReviews: 4,
      averageRating: 4.25,
      sentimentPositive: 3,
      sentimentNeutral: 1,
      sentimentNegative: 0,
      responseRate: 25,
      topKeywords: JSON.stringify([
        { keyword: 'coffee', count: 4, sentiment: 'positive' },
        { keyword: 'service', count: 4, sentiment: 'positive' },
        { keyword: 'staff', count: 3, sentiment: 'positive' },
        { keyword: 'atmosphere', count: 2, sentiment: 'positive' }
      ]),
      platformDistribution: JSON.stringify({
        GOOGLE: 3,
        FACEBOOK: 1
      })
    }
  })

  console.log('✅ Database seeded successfully!')
  console.log('📧 Demo account: demo@revugenie.com')
  console.log('🔑 Demo password: demo123')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })