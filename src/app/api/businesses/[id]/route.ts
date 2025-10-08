import { NextResponse } from 'next/server'

// GET /api/businesses/[id] - Get single business
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // In production, fetch from database
    const mockBusiness = {
      id: params.id,
      name: 'Rainbow Café',
      type: 'Coffee Shop',
      address: '123 Main St, Downtown',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      phone: '+1 (555) 123-4567',
      website: 'www.rainbowcafe.com',
      email: 'contact@rainbowcafe.com',
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
      certifications: ['Safe Space Certified', 'LGBTQ+ Verified', 'Accessibility Approved'],
      photos: [],
      reviews: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    return NextResponse.json({
      success: true,
      data: mockBusiness
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Business not found' },
      { status: 404 }
    )
  }
}

// PATCH /api/businesses/[id] - Update business
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // In production, update in database
    const updatedBusiness = {
      ...body,
      id: params.id,
      updatedAt: new Date().toISOString()
    }
    
    return NextResponse.json({
      success: true,
      data: updatedBusiness,
      message: 'Business updated successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update business' },
      { status: 500 }
    )
  }
}

// DELETE /api/businesses/[id] - Delete business
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // In production, delete from database
    return NextResponse.json({
      success: true,
      message: 'Business deleted successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete business' },
      { status: 500 }
    )
  }
}
