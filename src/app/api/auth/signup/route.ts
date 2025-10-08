import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/auth/signup
 * Create a new user account
 * Body: { name, email, password, identities?, accessibilityNeeds? }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, identities = [], accessibilityNeeds = [] } = body

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Password validation (min 8 characters)
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // In production:
    // 1. Check if email already exists
    // 2. Hash password using bcrypt
    // 3. Create user in database
    // 4. Generate JWT token
    // 5. Send verification email

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      identities,
      accessibilityNeeds,
      verified: false,
      createdAt: new Date().toISOString()
    }

    // Mock JWT token
    const token = `jwt-token-${Date.now()}`

    return NextResponse.json(
      {
        user: newUser,
        token,
        message: 'Account created successfully. Please check your email to verify your account.'
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating account:', error)
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    )
  }
}
