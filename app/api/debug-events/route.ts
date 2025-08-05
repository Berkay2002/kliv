import { NextResponse } from 'next/server'
import { getPendingEvents } from '@/lib/subscribers'

export async function GET() {
  try {
    console.log('🔍 Debug: Fetching pending events from Redis')
    
    const pendingEvents = await getPendingEvents()
    
    console.log(`📊 Debug: Found ${pendingEvents.length} pending events`)
    pendingEvents.forEach((event, index) => {
      console.log(`  ${index + 1}. ${event.event.summary} (${event.id}) - Status: ${event.status}`)
    })
    
    return NextResponse.json({
      count: pendingEvents.length,
      events: pendingEvents.map(e => ({
        id: e.id,
        title: e.event.summary,
        status: e.status,
        dateAdded: e.dateAdded
      }))
    })
  } catch (error) {
    console.error('❌ Debug error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch debug info', details: error.message },
      { status: 500 }
    )
  }
}