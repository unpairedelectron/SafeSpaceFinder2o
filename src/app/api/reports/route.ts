import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/reports
 * Report a business, review, or user
 * Body: { 
 *   reportType: 'business' | 'review' | 'user',
 *   targetId: string,
 *   reason: string,
 *   description: string,
 *   reporterId: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { reportType, targetId, reason, description, reporterId } = body

    // Validation
    if (!reportType || !targetId || !reason || !reporterId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const validReportTypes = ['business', 'review', 'user']
    if (!validReportTypes.includes(reportType)) {
      return NextResponse.json(
        { error: 'Invalid report type' },
        { status: 400 }
      )
    }

    // In production:
    // 1. Create report in database
    // 2. Notify moderation team
    // 3. If multiple reports, flag content for review
    // 4. Send confirmation to reporter

    const newReport = {
      id: `report-${Date.now()}`,
      reportType,
      targetId,
      reason,
      description,
      reporterId,
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    return NextResponse.json(
      {
        report: newReport,
        message: 'Report submitted successfully. Our moderation team will review it shortly.'
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating report:', error)
    return NextResponse.json(
      { error: 'Failed to submit report' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/reports
 * Get all reports (admin only)
 * Query params:
 * - status: 'pending' | 'reviewing' | 'resolved' | 'dismissed'
 * - type: 'business' | 'review' | 'user'
 * - limit, offset
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'pending'
    const type = searchParams.get('type')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    // In production: Verify admin authentication

    // Mock reports data
    const mockReports = [
      {
        id: 'report-1',
        reportType: 'review',
        targetId: 'review-123',
        reason: 'Inappropriate content',
        description: 'Contains offensive language',
        reporterId: 'user-456',
        status: 'pending',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'report-2',
        reportType: 'business',
        targetId: 'business-789',
        reason: 'Inaccurate information',
        description: 'Business is permanently closed',
        reporterId: 'user-789',
        status: 'reviewing',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      }
    ]

    // Filter reports
    let filteredReports = mockReports
    if (status) {
      filteredReports = filteredReports.filter(r => r.status === status)
    }
    if (type) {
      filteredReports = filteredReports.filter(r => r.reportType === type)
    }

    const paginatedReports = filteredReports.slice(offset, offset + limit)

    return NextResponse.json({
      reports: paginatedReports,
      total: filteredReports.length,
      limit,
      offset
    })
  } catch (error) {
    console.error('Error fetching reports:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    )
  }
}
