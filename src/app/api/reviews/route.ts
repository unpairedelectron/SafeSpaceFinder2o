import { NextResponse } from 'next/server'

// Mock reviews database
let reviews = [
  {
    id: '1',
    businessId: '1',
    userId: 'user1',
    userName: 'Alex Johnson',
    userAvatar: '👤',
    rating: 5,
    safetyScore: 95,
    comment: 'Absolutely love this place! Staff are incredibly welcoming and the space is very accessible. Gender-neutral bathrooms are a huge plus.',
    features: ['lgbtq-friendly', 'wheelchair-accessible'],
    photos: [],
    verified: true,
    helpful: 12,
    reported: 0,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    businessId: '1',
    userId: 'user2',
    userName: 'Sam Rivera',
    userAvatar: '👤',
    rating: 5,
    safetyScore: 100,
    comment: 'Perfect quiet space for someone with sensory sensitivities. The staff understand and are very accommodating. Highly recommend!',
    features: ['autism-friendly', 'quiet-space'],
    photos: [],
    verified: true,
    helpful: 8,
    reported: 0,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  }
]

// GET /api/reviews - Get all reviews with optional filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const businessId = searchParams.get('businessId')
    const userId = searchParams.get('userId')
    const minRating = searchParams.get('minRating')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')
    
    let filteredReviews = [...reviews]
    
    // Apply filters
    if (businessId) {
      filteredReviews = filteredReviews.filter(r => r.businessId === businessId)
    }
    
    if (userId) {
      filteredReviews = filteredReviews.filter(r => r.userId === userId)
    }
    
    if (minRating) {
      const minScore = parseInt(minRating)
      filteredReviews = filteredReviews.filter(r => r.rating >= minScore)
    }
    
    // Sort by most recent
    filteredReviews.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    
    // Pagination
    const paginatedReviews = filteredReviews.slice(offset, offset + limit)
    
    return NextResponse.json({
      success: true,
      data: paginatedReviews,
      total: filteredReviews.length,
      limit,
      offset
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

// POST /api/reviews - Create new review
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validation
    if (!body.businessId || !body.rating || !body.safetyScore || !body.comment) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    if (body.rating < 1 || body.rating > 5) {
      return NextResponse.json(
        { success: false, error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }
    
    if (body.safetyScore < 0 || body.safetyScore > 100) {
      return NextResponse.json(
        { success: false, error: 'Safety score must be between 0 and 100' },
        { status: 400 }
      )
    }
    
    // Create new review
    const newReview = {
      id: (reviews.length + 1).toString(),
      businessId: body.businessId,
      userId: body.userId || 'anonymous',
      userName: body.userName || 'Anonymous User',
      userAvatar: body.userAvatar || '👤',
      rating: body.rating,
      safetyScore: body.safetyScore,
      comment: body.comment,
      features: body.features || [],
      photos: body.photos || [],
      verified: body.verified || false,
      helpful: 0,
      reported: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    reviews.push(newReview)
    
    return NextResponse.json({
      success: true,
      data: newReview,
      message: 'Review created successfully'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create review' },
      { status: 500 }
    )
  }
}
