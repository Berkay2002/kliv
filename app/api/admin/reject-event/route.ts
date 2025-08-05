import { NextResponse } from 'next/server'
import { deletePendingEvent } from '@/lib/subscribers'
import { requireAdminAuth } from '@/lib/admin-auth'

export async function POST(request: Request) {
  try {
    // Protect this route - require admin authentication
    const authError = await requireAdminAuth()
    if (authError) {
      return authError
    }

    const { eventId } = await request.json()
    
    if (!eventId) {
      return NextResponse.json({ error: 'Event ID required' }, { status: 400 })
    }

    console.log('❌ Admin rejecting event:', eventId)

    // Delete the pending event
    const deleted = await deletePendingEvent(eventId)
    
    if (!deleted) {
      return NextResponse.json({ error: 'Event not found or could not be deleted' }, { status: 404 })
    }

    console.log(`✅ Event rejected and removed: ${eventId}`)

    return NextResponse.json({
      message: 'Event rejected and removed'
    })

  } catch (error) {
    console.error('❌ Error rejecting event:', error)
    return NextResponse.json(
      { error: 'Failed to reject event' },
      { status: 500 }
    )
  }
}