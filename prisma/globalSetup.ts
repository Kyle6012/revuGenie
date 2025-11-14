import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function globalSetup() {
  // Forcefully free the port
  execSync('sudo lsof -t -i:5433 | xargs -r sudo kill -9 || true');

  // Stop any lingering containers
  execSync('sudo docker kill revugenie-db-test || true');
  execSync('sudo docker compose down -v --rmi local --remove-orphans');

  // Start the test database container
  execSync('sudo docker compose up -d db-test');

  // Wait for the database to be ready
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Run migrations
  execSync('DATABASE_URL="postgresql://postgres:postgres123@localhost:5433/revugenie-test" prisma db push --force-reset');

  // Seed the database
  execSync('DATABASE_URL="postgresql://postgres:postgres123@localhost:5433/revugenie-test" prisma db seed');

  await prisma.$disconnect();
}

export default globalSetup;
