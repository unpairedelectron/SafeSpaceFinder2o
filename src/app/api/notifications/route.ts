import { NextRequest, NextResponse } from 'next/server'

// Mock notifications data
const mockNotifications = [
  {
    id: '1',
    userId: 'user-1',
    type: 'safety',
    title: 'Safety Score Update',
    message: 'Rainbow Café safety score increased to 95',
    businessId: '1',
    read: false,
    priority: 'high',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    userId: 'user-1',
    type: 'community',
    title: 'New Review Response',
    message: 'The owner responded to your review',
    businessId: '2',
    read: false,
    priority: 'medium',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  }
]

/**
 * GET /api/notifications
 * Fetch all notifications for the authenticated user
 * Query params:
 * - filter: 'all' | 'unread' | 'safety' | 'community'
 * - limit: number
 * - offset: number
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filter = searchParams.get('filter') || 'all'
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const userId = searchParams.get('userId') || 'user-1' // In production, get from auth session

    // Filter notifications
    let filteredNotifications = mockNotifications.filter(n => n.userId === userId)

    if (filter === 'unread') {
      filteredNotifications = filteredNotifications.filter(n => !n.read)
    } else if (filter !== 'all') {
      filteredNotifications = filteredNotifications.filter(n => n.type === filter)
    }

    // Pagination
    const paginatedNotifications = filteredNotifications.slice(offset, offset + limit)

    const unreadCount = mockNotifications.filter(n => n.userId === userId && !n.read).length

    return NextResponse.json({
      notifications: paginatedNotifications,
      unreadCount,
      total: filteredNotifications.length,
      limit,
      offset
    })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/notifications
 * Create a new notification
 * Body: { userId, type, title, message, businessId?, priority? }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, type, title, message, businessId, priority = 'medium' } = body

    // Validation
    if (!userId || !type || !title || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // In production: Save to database
    const newNotification = {
      id: `notif-${Date.now()}`,
      userId,
      type,
      title,
      message,
      businessId,
      priority,
      read: false,
      createdAt: new Date().toISOString()
    }

    mockNotifications.push(newNotification)

    return NextResponse.json(
      { notification: newNotification, message: 'Notification created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating notification:', error)
    return NextResponse.json(
      { error: 'Failed to create notification' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/notifications
 * Bulk update notifications (e.g., mark all as read)
 * Body: { action: 'mark-all-read' | 'delete-all', userId }
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, userId } = body

    if (!userId || !action) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (action === 'mark-all-read') {
      // In production: Update all notifications for user in database
      const updatedCount = mockNotifications.filter(n => 
        n.userId === userId && !n.read
      ).length

      mockNotifications.forEach(n => {
        if (n.userId === userId) {
          n.read = true
        }
      })

      return NextResponse.json({
        message: `${updatedCount} notifications marked as read`,
        updatedCount
      })
    }

    if (action === 'delete-all') {
      // In production: Delete all notifications for user in database
      const deleteCount = mockNotifications.filter(n => n.userId === userId).length
      
      // Remove from mock array
      const index = mockNotifications.findIndex(n => n.userId === userId)
      if (index > -1) {
        mockNotifications.splice(index, deleteCount)
      }

      return NextResponse.json({
        message: `${deleteCount} notifications deleted`,
        deletedCount: deleteCount
      })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error updating notifications:', error)
    return NextResponse.json(
      { error: 'Failed to update notifications' },
      { status: 500 }
    )
  }
}
