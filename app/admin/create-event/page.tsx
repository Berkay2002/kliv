'use client'

export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { useUser, SignInButton, UserButton } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, MapPin, Image as ImageIcon, ArrowLeft, Eye, ShieldX } from 'lucide-react'
import { CTA_OPTIONS, DEFAULT_CTA_TEXT_OPTIONS } from '@/lib/event-parser'
import Link from 'next/link'
import Image from 'next/image'
import { CldUploadWidget } from 'next-cloudinary'

interface EventFormData {
  title: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location: string;
  description: string;
  content: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  customCtaLink: string;
}

export default function CreateEventPage() {
  const { user, isLoaded } = useUser()
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: '',
    description: '',
    content: '',
    image: '',
    ctaText: 'Läs mer',
    ctaLink: '/lovaktiviteter',
    customCtaLink: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPreview, setShowPreview] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

  const handleInputChange = (field: keyof EventFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImageUpload = (result: any) => {
    if (result.event === 'success') {
      setFormData(prev => ({ ...prev, image: result.info.secure_url }))
    }
  }

  // Check authorization on component mount
  useEffect(() => {
    if (isLoaded && user) {
      checkAuthorization()
    }
  }, [isLoaded, user])

  const checkAuthorization = async () => {
    try {
      const response = await fetch('/api/admin/pending-events')
      if (response.ok) {
        setIsAuthorized(true)
      } else if (response.status === 403) {
        setIsAuthorized(false)
      }
    } catch { 
      setIsAuthorized(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const eventData = {
        ...formData,
        ctaLink: formData.ctaLink === 'custom' ? formData.customCtaLink : formData.ctaLink
      }

      const response = await fetch('/api/admin/create-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      })

      if (response.ok) {
        alert('Event skapades framgångsrikt! Det kommer att visas för godkännande.')
        // Reset form
        setFormData({
          title: '',
          startDate: '',
          startTime: '',
          endDate: '',
          endTime: '',
          location: '',
          description: '',
          content: '',
          image: '',
          ctaText: 'Läs mer',
          ctaLink: '/lovaktiviteter',
          customCtaLink: ''
        })
      } else {
        const error = await response.json()
        alert(`Fel: ${error.error}`)
      }
    } catch (error) {
      console.error('Error creating event:', error)
      alert('Kunde inte skapa event')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Laddar...</div>
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold">Skapa Event</h1>
        <p className="text-muted-foreground">Du måste logga in för att skapa events</p>
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
          Endast auktoriserade administratörer kan skapa events.
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
    <div className="container mx-auto px-4 py-4 sm:py-8 max-w-4xl">
      <div className="flex flex-col gap-4 mb-6 sm:mb-8">
        <div className="flex items-center justify-between">
          <Link href="/admin/dashboard">
            <Button variant="ghost" size="sm" className="text-sm">
              <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Tillbaka till Dashboard</span>
              <span className="sm:hidden">Tillbaka</span>
            </Button>
          </Link>
          <UserButton />
        </div>
        
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold">Skapa Nytt Event</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Fyll i formuläret nedan för att skapa ett nytt event</p>
        </div>
        
        <div className="flex justify-center sm:justify-start">
          <Button 
            variant="outline" 
            onClick={() => setShowPreview(!showPreview)}
            className="w-full sm:w-auto"
          >
            <Eye className="h-4 w-4 mr-2" />
            {showPreview ? 'Dölj' : 'Visa'} Förhandsvisning
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Event Information</CardTitle>
            <CardDescription>Grundläggande information om eventet</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Titel *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="T.ex. Höstlovskul"
                  required
                />
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Startdatum *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startTime">Starttid</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => handleInputChange('startTime', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="endDate">Slutdatum</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">Sluttid</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleInputChange('endTime', e.target.value)}
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Plats *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="T.ex. Botkyrkahallen, Brunnavägen 6, 145 67 Norsborg, Sweden"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Kort beskrivning</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="T.ex. Oktober vecka 44"
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Detaljerad beskrivning *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Beskriv eventet i detalj..."
                  rows={4}
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Event Bild</Label>
                <CldUploadWidget
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'kliv_events'}
                  onSuccess={handleImageUpload}
                >
                  {({ open }) => (
                    <div className="space-y-2">
                      <Button type="button" variant="outline" onClick={() => open()}>
                        <ImageIcon className="h-4 w-4 mr-2" />
                        {formData.image ? 'Ändra Bild' : 'Ladda upp Bild'}
                      </Button>
                      {formData.image && (
                        <div className="relative">
                          <Image 
                            src={formData.image} 
                            alt="Event preview" 
                            width={400}
                            height={128}
                            className="w-full h-32 object-cover rounded-md"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </CldUploadWidget>
              </div>

              {/* CTA Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Call-to-Action</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ctaText">Knapptext</Label>
                    <Select 
                      value={formData.ctaText} 
                      onValueChange={(value) => handleInputChange('ctaText', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DEFAULT_CTA_TEXT_OPTIONS.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ctaLink">Länk</Label>
                    <Select 
                      value={formData.ctaLink} 
                      onValueChange={(value) => handleInputChange('ctaLink', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CTA_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {formData.ctaLink === 'custom' && (
                  <div className="space-y-2">
                    <Label htmlFor="customCtaLink">Anpassad länk</Label>
                    <Input
                      id="customCtaLink"
                      value={formData.customCtaLink}
                      onChange={(e) => handleInputChange('customCtaLink', e.target.value)}
                      placeholder="/min-anpassade-sida"
                    />
                  </div>
                )}
              </div>

              {/* Submit */}
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Skapar Event...' : 'Skapa Event'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Preview */}
        {showPreview && (
          <Card className="lg:sticky lg:top-4">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Förhandsvisning</CardTitle>
              <CardDescription>Så här kommer eventet att se ut</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold wrap-break-word">{formData.title || 'Event Titel'}</h3>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span className="wrap-break-word">
                    {formData.startDate || 'Datum ej valt'}
                    {formData.startTime && ` ${formData.startTime}`}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span className="wrap-break-word">{formData.location || 'Plats ej angiven'}</span>
                </div>

                {formData.image && (
                  <Image 
                    src={formData.image} 
                    alt="Event" 
                    width={400}
                    height={192}
                    className="w-full h-32 sm:h-48 object-cover rounded-md"
                  />
                )}

                {formData.description && (
                  <p className="text-sm text-muted-foreground wrap-break-word">{formData.description}</p>
                )}

                <p className="text-sm wrap-break-word">{formData.content || 'Ingen beskrivning...'}</p>

                {formData.ctaText && (
                  <Button size="sm" className="bg-kliv-red hover:bg-kliv-red-dark w-full sm:w-auto">
                    {formData.ctaText}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}