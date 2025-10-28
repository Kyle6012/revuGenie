# RevuGenie - AI-Powered Review Management Platform

## Overview
RevuGenie is a comprehensive SaaS platform that automates customer review management, responses, and analytics for local businesses. It uses AI to generate contextual replies and provides deep insights into customer sentiment.

## Tech Stack
- **Frontend**: Next.js 15, TypeScript, TailwindCSS, ShadCN/UI, Recharts
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with JWT + OAuth
- **Payments**: Stripe (test + production)
- **Cache & Queue**: Redis
- **Storage**: ImageKit
- **Notifications**: Twilio (WhatsApp), Nodemailer (Email)
- **AI**: Custom/Open-Source Model (currently mocked)

## Features

### Core Features
- Multi-tenant architecture with business/user management
- Review fetching from Google Business, Facebook, Instagram
- AI-generated contextual replies with tone matching
- Sentiment analytics dashboard with trends and insights
- Multi-location and multi-user access for agencies
- Email and WhatsApp notifications for new reviews
- Subscription billing with Stripe integration

### AI Capabilities
- Review reply generator with tone presets (friendly, formal, empathetic)
- Sentiment analysis (positive/neutral/negative classification)
- Keyword extraction and insights engine
- Weekly summary generation with actionable recommendations
- Tone trainer that learns from approved replies

### Pricing Tiers
- **Free**: 20 reviews/month, single business
- **Pro ($29/month)**: 500 reviews, analytics, email notifications
- **Business ($99/month)**: Unlimited reviews, WhatsApp alerts, multi-location
- **Agency ($199/month)**: Up to 10 businesses, white-label dashboard

## Project Structure
```
revugenie/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (dashboard)/
│   │   ├── (landing)/
│   │   ├── admin/
│   │   └── api/
│   ├── components/
│   ├── lib/
│   ├── hooks/
│   ├── types/
│   └── utils/
├── prisma/
├── public/
├── docker/
└── docs/
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 6+
- Stripe account
- Google Cloud Console account
- OpenAI API key
- Twilio account

### Installation
1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your credentials
3. Install dependencies: `npm install`
4. Set up database: `npx prisma db push`
5. Seed database: `npx prisma db seed`
6. Run development server: `npm run dev`

### Environment Variables
```env
# Database
DB_USER="avnadmin"
DB_PASSWORD="<PASSWORD>"
DB_HOST="<HOST>"
DB_PORT="<PORT>"
DB_NAME="revuGenie"
DB_SSL_CA="<SSL_CA>"

# Authentication
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Payments
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# AI
OPENAI_API_KEY="sk-..."

# Notifications
TWILIO_ACCOUNT_SID="..."
TWILIO_AUTH_TOKEN="..."
TWILIO_PHONE_NUMBER="..."

# Storage
SUPABASE_URL="..."
SUPABASE_ANON_KEY="..."

# Redis
REDIS_URL="redis://localhost:6379"
```

## Deployment

### Docker
```bash
docker-compose up -d
```

### Vercel
```bash
vercel --prod
```

### Railway/Fly.io
```bash
railway up
# or
fly deploy
```

## API Documentation
- REST API documentation available at `/docs/api`
- GraphQL API available at `/api/graphql`

## Admin Panel
Access admin dashboard at `/admin` with master credentials

## Support
- User Guide: `/docs/user-guide`
- Admin Guide: `/docs/admin-guide`
- API Reference: `/docs/api-reference`

## License
MIT License - see LICENSE file for details