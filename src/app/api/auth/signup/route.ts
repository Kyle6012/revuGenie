import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { name, email, businessName, password } = await request.json()

    // Validate input
    if (!name || !email || !businessName || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    })

    // Create business
    const business = await prisma.business.create({
      data: {
        name: businessName,
        isActive: true,
      }
    })

    // Create business membership
    await prisma.businessMember.create({
      data: {
        userId: user.id,
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

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      message: 'Account created successfully'
    })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    )
  }
}