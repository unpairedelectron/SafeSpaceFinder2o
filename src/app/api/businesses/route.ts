import { NextResponse } from 'next/server'

// Mock database - replace with actual database in production
let businesses = [
  {
    id: '1',
    name: 'Rainbow Café',
    type: 'Coffee Shop',
    address: '123 Main St, Downtown',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    phone: '+1 (555) 123-4567',
    website: 'www.rainbowcafe.com',
    rating: 4.8,
    safetyScore: 95,
    features: ['lgbtq-friendly', 'wheelchair-accessible', 'quiet-space'],
    description: 'A welcoming space for everyone with excellent coffee and inclusive atmosphere.',
    verifiedReviews: 24,
    hours: {
      monday: { open: '07:00', close: '20:00', closed: false },
      tuesday: { open: '07:00', close: '20:00', closed: false },
      wednesday: { open: '07:00', close: '20:00', closed: false },
      thursday: { open: '07:00', close: '20:00', closed: false },
      friday: { open: '07:00', close: '22:00', closed: false },
      saturday: { open: '08:00', close: '22:00', closed: false },
      sunday: { open: '08:00', close: '18:00', closed: false }
    },
    photos: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

// GET /api/businesses - Get all businesses with optional filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')
    const category = searchParams.get('category')
    const features = searchParams.get('features')?.split(',')
    const minSafetyScore = searchParams.get('minSafetyScore')
    const city = searchParams.get('city')
    
    let filteredBusinesses = [...businesses]
    
    // Apply filters
    if (query) {
      const searchLower = query.toLowerCase()
      filteredBusinesses = filteredBusinesses.filter(b => 
        b.name.toLowerCase().includes(searchLower) ||
        b.type.toLowerCase().includes(searchLower) ||
        b.description.toLowerCase().includes(searchLower)
      )
    }
    
    if (category) {
      filteredBusinesses = filteredBusinesses.filter(b => b.type === category)
    }
    
    if (features && features.length > 0) {
      filteredBusinesses = filteredBusinesses.filter(b =>
        features.some(f => b.features.includes(f))
      )
    }
    
    if (minSafetyScore) {
      const minScore = parseInt(minSafetyScore)
      filteredBusinesses = filteredBusinesses.filter(b => b.safetyScore >= minScore)
    }
    
    if (city) {
      filteredBusinesses = filteredBusinesses.filter(b => 
        b.city.toLowerCase() === city.toLowerCase()
      )
    }
    
    return NextResponse.json({
      success: true,
      data: filteredBusinesses,
      total: filteredBusinesses.length
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch businesses' },
      { status: 500 }
    )
  }
}

// POST /api/businesses - Create new business
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validation
    if (!body.businessName || !body.category || !body.address) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Create new business
    const newBusiness = {
      id: (businesses.length + 1).toString(),
      name: body.businessName,
      type: body.category,
      address: body.address,
      city: body.city,
      state: body.state,
      zipCode: body.zipCode,
      phone: body.phone || '',
      website: body.website || '',
      email: body.email || '',
      description: body.description,
      rating: 0,
      safetyScore: 0,
      features: [
        ...body.accessibilityFeatures || [],
        ...body.identityFeatures || [],
        ...body.neurodiversityFeatures || []
      ],
      hours: body.hours,
      verifiedReviews: 0,
      photos: [],
      policies: body.policies || '',
      accommodations: body.accommodations || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    businesses.push(newBusiness)
    
    return NextResponse.json({
      success: true,
      data: newBusiness,
      message: 'Business created successfully'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create business' },
      { status: 500 }
    )
  }
}
