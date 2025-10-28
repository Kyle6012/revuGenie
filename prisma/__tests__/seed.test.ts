import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL,
    },
  },
});

describe('Prisma Seed', () => {
  it('should seed the database with demo data', async () => {
    const users = await prisma.user.findMany();
    const businesses = await prisma.business.findMany();
    const reviews = await prisma.review.findMany();

    expect(users.length).toBe(2);
    expect(businesses.length).toBe(1);
    expect(reviews.length).toBe(2);
  }, 30000);
});
