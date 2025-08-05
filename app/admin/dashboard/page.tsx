'use client'

import { useState, useEffect } from 'react'
import { useUser, SignInButton, UserButton } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Users, Clock, CheckCircle2, XCircle, Plus, ShieldX, Edit } from 'lucide-react'
import { PendingEvent } from '@/lib/subscribers'
import Link from 'next/link'
import EditEventModal from '@/components/EditEventModal'

interface PendingEventWithParsed extends PendingEvent {
  parsedDescription?: string;
}

function formatEventTime(event: any): string {
  const start = event.start?.dateTime || event.start?.date;
  const end = event.end?.dateTime || event.end?.date;
  
  if (!start) return 'Okänd tid';
  
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : null;
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: event.start?.dateTime ? 'numeric' : undefined,
    minute: event.start?.dateTime ? 'numeric' : undefined,
    timeZone: 'Europe/Stockholm'
  };
  
  let timeString = startDate.toLocaleDateString('sv-SE', options);
  
  if (endDate && event.end?.dateTime) {
    const endTimeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'Europe/Stockholm'
    };
    timeString += ` - ${endDate.toLocaleTimeString('sv-SE', endTimeOptions)}`;
  }
  
  return timeString;
}

export default function AdminDashboard() {
  const { user, isLoaded } = useUser()
  const [pendingEvents, setPendingEvents] = useState<PendingEventWithParsed[]>([])
  const [subscriberCount, setSubscriberCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [processingEvents, setProcessingEvents] = useState<Set<string>>(new Set())
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [editingEvent, setEditingEvent] = useState<PendingEventWithParsed | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  useEffect(() => {
    if (isLoaded && user) {
      fetchPendingEvents()
      fetchSubscriberCount()
    }
  }, [isLoaded, user])

  const fetchPendingEvents = async () => {
    try {
      const response = await fetch('/api/admin/pending-events')
      if (response.ok) {
        const events = await response.json()
        setPendingEvents(events)
        setIsAuthorized(true)
      } else if (response.status === 403) {
        setIsAuthorized(false)
      }
    } catch (error) {
      console.error('Error fetching pending events:', error)
      setIsAuthorized(false)
    } finally {
      setLoading(false)
    }
  }

  const fetchSubscriberCount = async () => {
    try {
      const response = await fetch('/api/subscribers')
      if (response.ok) {
        const data = await response.json()
        console.log('📊 Dashboard received subscriber data:', data)
        
        // Use the count field first, then fallback to calculating from array
        const count = data.count ?? (Array.isArray(data.subscribers) ? data.subscribers.length : 0)
        console.log('📊 Setting subscriber count to:', count)
        setSubscriberCount(count)
      } else {
        console.error('Failed to fetch subscribers:', response.status, response.statusText)
        setSubscriberCount(0)
      }
    } catch (error) {
      console.error('Error fetching subscriber count:', error)
      setSubscriberCount(0)
    }
  }

  const handleApproveEvent = async (eventId: string) => {
    setProcessingEvents(prev => new Set([...Array.from(prev), eventId]))
    
    try {
      const response = await fetch('/api/admin/approve-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId })
      })

      if (response.ok) {
        // Remove the approved event from the list
        setPendingEvents(prev => prev.filter(e => e.id !== eventId))
        alert('Event approved and sent to subscribers!')
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error approving event:', error)
      alert('Failed to approve event')
    } finally {
      setProcessingEvents(prev => {
        const newSet = new Set(prev)
        newSet.delete(eventId)
        return newSet
      })
    }
  }

  const handleRejectEvent = async (eventId: string) => {
    setProcessingEvents(prev => new Set([...Array.from(prev), eventId]))
    
    try {
      const response = await fetch('/api/admin/reject-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId })
      })

      if (response.ok) {
        // Remove the rejected event from the list
        setPendingEvents(prev => prev.filter(e => e.id !== eventId))
        alert('Event rejected and removed')
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error rejecting event:', error)
      alert('Failed to reject event')
    } finally {
      setProcessingEvents(prev => {
        const newSet = new Set(prev)
        newSet.delete(eventId)
        return newSet
      })
    }
  }

  const handleEditEvent = (event: PendingEventWithParsed) => {
    setEditingEvent(event)
    setIsEditModalOpen(true)
  }

  const handleEditSave = () => {
    // Refresh the pending events list after successful edit
    fetchPendingEvents()
    alert('Event uppdaterat framgångsrikt!')
  }

  const handleEditClose = () => {
    setEditingEvent(null)
    setIsEditModalOpen(false)
  }

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Laddar...</div>
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Du måste logga in för att komma åt admin-panelen</p>
        <SignInButton mode="modal">
          <Button>Logga in</Button>
        </SignInButton>
      </div>
    )
  }

  // Show unauthorized message for authenticated but non-admin users
  if (user && isAuthorized === false) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
        <ShieldX className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground" />
        <h1 className="text-xl sm:text-2xl font-bold text-center">Åtkomst Nekad</h1>
        <p className="text-muted-foreground text-center max-w-md text-sm sm:text-base">
          Du är inloggad som <strong className="break-all">{user.emailAddresses[0]?.emailAddress}</strong>, men denna användare har inte administratörsbehörighet.
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground text-center">
          Endast auktoriserade administratörer kan komma åt denna panel.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
          <Button variant="outline" onClick={() => window.location.href = '/'} className="w-full">
            Tillbaka till hemsidan
          </Button>
          <div className="flex justify-center">
            <UserButton />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8 max-w-6xl">
      <div className="flex flex-col gap-4 mb-6 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Hantera evenemang-notifikationer</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Badge variant="secondary" className="flex items-center justify-center gap-2 py-2">
            <Users className="h-4 w-4" />
            <span className="text-sm">{subscriberCount} prenumeranter</span>
          </Badge>
          <div className="flex items-center gap-2">
            <Link href="/admin/create-event" className="flex-1 sm:flex-none">
              <Button className="bg-kliv-red hover:bg-kliv-red-dark text-white w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Skapa Event
              </Button>
            </Link>
            <UserButton />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-kliv-red mx-auto mb-4"></div>
            <p>Laddar väntande evenemang...</p>
          </div>
        </div>
      ) : pendingEvents.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Inga väntande evenemang</h3>
            <p className="text-muted-foreground">
              Alla nya evenemang som läggs till i kalendern kommer att visas här för godkännande.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Väntande Evenemang ({pendingEvents.length})
              </CardTitle>
              <CardDescription>
                Nya evenemang som behöver godkännande innan prenumeranter meddelas
              </CardDescription>
            </CardHeader>
          </Card>

          {pendingEvents.map((pendingEvent) => {
            const event = pendingEvent.event
            const isProcessing = processingEvents.has(pendingEvent.id)
            
            return (
              <Card key={pendingEvent.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg sm:text-xl mb-2 leading-tight">{event.summary}</CardTitle>
                      <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 flex-shrink-0" />
                          <span className="break-words">{formatEventTime(event)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          <span className="break-words">{event.location || 'Okänd plats'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 flex-shrink-0" />
                          <span>Tillagt {new Date(pendingEvent.dateAdded).toLocaleDateString('sv-SE')}</span>
                        </div>
                      </div>
                      {pendingEvent.parsedDescription && (
                        <p className="text-sm mb-4 p-3 bg-muted rounded-md break-words">
                          {pendingEvent.parsedDescription}
                        </p>
                      )}
                    </div>
                    <Badge variant="outline" className="self-start">
                      Väntande
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Button
                      onClick={() => handleApproveEvent(pendingEvent.id)}
                      disabled={isProcessing}
                      className="bg-kliv-red hover:bg-kliv-red-dark text-white w-full sm:flex-1 text-sm"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">
                        {isProcessing ? 'Skickar...' : `Godkänn & Skicka till ${subscriberCount || 0}`}
                      </span>
                    </Button>
                    
                    <div className="flex gap-3 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        onClick={() => handleEditEvent(pendingEvent)}
                        disabled={isProcessing}
                        className="flex-1 sm:w-auto"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Redigera
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleRejectEvent(pendingEvent.id)}
                        disabled={isProcessing}
                        className="flex-1 sm:w-auto"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Avvisa
                      </Button>
                    </div>
                    
                    {event.htmlLink && (
                      <Button variant="ghost" asChild className="w-full sm:w-auto text-sm">
                        <a href={event.htmlLink} target="_blank" rel="noopener noreferrer">
                          Google Kalender
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
      
      {/* Edit Event Modal */}
      <EditEventModal
        event={editingEvent}
        isOpen={isEditModalOpen}
        onClose={handleEditClose}
        onSave={handleEditSave}
      />
    </div>
  )
}