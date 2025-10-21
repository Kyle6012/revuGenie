import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid email profile https://www.googleapis.com/auth/business.manage',
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.image = user.image
      }
      
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.provider = account.provider
      }
      
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.image = token.image as string
        session.accessToken = token.accessToken as string
      }
      
      return session
    },
    async signIn({ user, account, profile }) {
      // Check if user exists and create business if needed
      if (user.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
          include: {
            memberships: {
              include: {
                business: true
              }
            }
          }
        })

        if (existingUser && existingUser.memberships.length === 0) {
          // Create a default business for new users
          const business = await prisma.business.create({
            data: {
              name: `${user.name}'s Business`,
              isActive: true,
            }
          })

          await prisma.businessMember.create({
            data: {
              userId: existingUser.id,
              businessId: business.id,
              role: 'OWNER',
            }
          })

          // Create free subscription
          await prisma.subscription.create({
            data: {
              businessId: business.id,
              plan: 'FREE',
              status: 'ACTIVE',
              maxReviewsPerMonth: 20,
            }
          })
        }
      }

      return true
    }
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
}