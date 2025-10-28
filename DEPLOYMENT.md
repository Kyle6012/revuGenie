# RevuGenie Deployment Guide

## Overview
This guide covers deployment options for the RevuGenie SaaS platform, including local development, Docker, and production deployment.

## Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL 14+ database
- Redis 6+ for caching and queues
- Stripe account for payments
- Google Cloud Console account for Google Business API
- OpenAI API key for AI features
- Twilio account for WhatsApp notifications (optional)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DB_USER="avnadmin"
DB_PASSWORD="<PASSWORD>"
DB_HOST="<HOST>"
DB_PORT="<PORT>"
DB_NAME="revuGenie"
DB_SSL_CA="<SSL_CA>"

# Authentication
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Payments
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRO_PRICE_ID="price_..."
STRIPE_BUSINESS_PRICE_ID="price_..."
STRIPE_AGENCY_PRICE_ID="price_..."

# AI Service
AI_PROVIDER="openai" # openai, claude, or together
OPENAI_API_KEY="sk-your-openai-api-key"
ANTHROPIC_API_KEY="sk-your-anthropic-api-key"
TOGETHER_API_KEY="your-together-api-key"

# Storage
IMAGEKIT_PUBLIC_KEY="your-public-key"
IMAGEKIT_PRIVATE_KEY="your-private-key"
IMAGEKIT_URL_ENDPOINT="your-url-endpoint"

# Redis
REDIS_URL="redis://localhost:6379"

# App Settings
APP_URL="http://localhost:3000"
APP_NAME="RevuGenie"
NODE_ENV="development"
```

## Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
# Create database
createdb revugenie

# Run migrations
npx prisma db push

# Seed database with demo data
npx prisma db seed
```

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

**Demo Account:**
- Email: `demo@revugenie.com`
- Password: `demo123`

## Docker Deployment

### 1. Build and Run with Docker Compose
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

### 2. Manual Docker Build
```bash
# Build the application image
docker build -t revugenie-app .

# Build the worker image
docker build -f Dockerfile.worker -t revugenie-worker .

# Run the application
docker run -p 3000:3000 --env-file .env revugenie-app
```

## Production Deployment

### Vercel (Recommended for Frontend)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Railway
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### Fly.io
```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Deploy
fly launch
fly deploy
```

## Database Management

### Backup Database
```bash
# PostgreSQL backup
pg_dump $DATABASE_URL > backup.sql

# Restore from backup
psql $DATABASE_URL < backup.sql
```

### Database Migrations
```bash
# Create new migration
npx prisma migrate dev --name your-migration-name

# Apply migrations in production
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset
```

## Monitoring and Logging

### Application Logs
```bash
# Docker logs
docker-compose logs -f app

# Vercel logs (if deployed on Vercel)
vercel logs your-deployment-url
```

### Database Monitoring
```bash
# Access Prisma Studio
npx prisma studio

# Database health check
npx prisma db seed --dry-run
```

## Security Considerations

### SSL/TLS
- Enable HTTPS in production
- Use proper SSL certificates
- Configure secure headers

### Environment Security
- Never commit `.env` files
- Use different environments for staging/production
- Rotate API keys regularly

### Database Security
- Use strong passwords
- Enable PostgreSQL SSL connections
- Restrict database access by IP

## Performance Optimization

### Database Optimization
```sql
-- Create indexes for better query performance
CREATE INDEX idx_reviews_business_id ON reviews(business_id);
CREATE INDEX idx_reviews_platform ON reviews(platform);
CREATE INDEX idx_reviews_published_at ON reviews(published_at);
CREATE INDEX idx_business_members_user_id ON business_members(user_id);
```

### Caching
- Redis is configured for session storage
- Enable Next.js caching strategies
- Use CDN for static assets

### Monitoring
- Set up application monitoring (e.g., Sentry, Logtail)
- Monitor database performance
- Track API response times

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check DATABASE_URL format
   - Ensure PostgreSQL is running
   - Verify network connectivity

2. **Authentication Issues**
   - Check NEXTAUTH_SECRET and NEXTAUTH_URL
   - Verify Google OAuth credentials
   - Ensure callback URLs are configured

3. **Stripe Webhook Issues**
   - Verify webhook secret
   - Check webhook endpoint URL
   - Ensure proper event handling

4. **AI Response Generation Fails**
   - Verify OpenAI API key
   - Check API usage limits
   - Review error logs

### Debug Mode
```bash
# Enable debug logging
DEBUG=1 npm run dev

# Verbose Prisma logging
npx prisma generate --watch
```

## Support

For deployment support:
- Check the [README.md](README.md) for setup instructions
- Review environment variable requirements
- Consult the [API Documentation](docs/API.md)
- Check [Troubleshooting Guide](docs/TROUBLESHOOTING.md)

## Next Steps

After successful deployment:
1. Configure your Google Business API integration
2. Set up Stripe webhooks for production
3. Customize your branding and settings
4. Train the AI with your business tone
5. Set up team members and permissions

---

**Need Help?** Contact support at support@revugenie.com