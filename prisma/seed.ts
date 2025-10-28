import { PrismaClient } from '@prisma/client'
import pkg from 'bcryptjs';
const { hash } = pkg;

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')
  const password = await hash('password123', 12)

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      email: 'owner@example.com',
      name: 'Business Owner',
      password,
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: 'manager@example.com',
      name: 'Store Manager',
      password,
    },
  })

  // Create Business
  const business1 = await prisma.business.create({
    data: {
      name: 'The Grand Cafe',
      description: 'A cozy cafe serving the best coffee and pastries in town.',
      website: 'https://grandcafe.com',
      phone: '123-456-7890',
      email: 'contact@grandcafe.com',
      address: '123 Main St',
      city: 'Metropolis',
      state: 'CA',
      country: 'USA',
      postalCode: '90210',
      timezone: 'America/Los_Angeles',
      memberships: {
        create: [
          { userId: user1.id, role: 'OWNER' },
          { userId: user2.id, role: 'MANAGER' },
        ],
      },
    },
  })

  // Create Reviews
  await prisma.review.createMany({
    data: [
      {
        businessId: business1.id,
        platform: 'GOOGLE',
        reviewId: 'review-1',
        authorName: 'John Doe',
        rating: 5,
        title: 'Amazing Experience!',
        content: 'The coffee was excellent and the staff were super friendly. Highly recommend!',
        publishedAt: new Date('2023-10-20T10:00:00Z'),
      },
      {
        businessId: business1.id,
        platform: 'YELP',
        reviewId: 'review-2',
        authorName: 'Jane Smith',
        rating: 2,
        title: 'Disappointing Visit',
        content: 'The service was slow and my order was incorrect. Not what I expected.',
        publishedAt: new Date('2023-10-21T14:30:00Z'),
      },
    ],
  })

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
