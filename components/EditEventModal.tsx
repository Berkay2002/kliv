'use client'

import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, Save, X } from 'lucide-react'
import { CTA_OPTIONS, DEFAULT_CTA_TEXT_OPTIONS, parseEventDescription } from '@/lib/event-parser'
import { PendingEvent } from '@/lib/subscribers'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'

interface EditEventModalProps {
  event: PendingEvent | null
  isOpen: boolean
  onClose: () => void
  onSave: (eventId: string) => void
}

interface EditFormData {
  title: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  location: string
  description: string
  content: string
  image: string
  ctaText: string
  ctaLink: string
  customCtaLink: string
}

export default function EditEventModal({ event, isOpen, onClose, onSave }: EditEventModalProps) {
  const [formData, setFormData] = useState<EditFormData>({
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

  // Populate form when event changes
  useEffect(() => {
    if (event) {
      const googleEvent = event.event
      
      // Parse existing description
      const parsed = parseEventDescription(googleEvent.description || '')
      
      // Extract dates and times
      const startDate = googleEvent.start?.dateTime || googleEvent.start?.date || ''
      const endDate = googleEvent.end?.dateTime || googleEvent.end?.date || ''
      
      const startDateOnly = startDate.split('T')[0] || ''
      const startTimeOnly = startDate.includes('T') ? startDate.split('T')[1]?.substring(0, 5) || '' : ''
      const endDateOnly = endDate.split('T')[0] || ''
      const endTimeOnly = endDate.includes('T') ? endDate.split('T')[1]?.substring(0, 5) || '' : ''

      setFormData({
        title: googleEvent.summary || '',
        startDate: startDateOnly,
        startTime: startTimeOnly,
        endDate: endDateOnly,
        endTime: endTimeOnly,
        location: googleEvent.location || '',
        description: '',
        content: parsed.content || googleEvent.description || '',
        image: parsed.src || '',
        ctaText: parsed.ctaText || 'Läs mer',
        ctaLink: parsed.ctaLink || '/lovaktiviteter',
        customCtaLink: ''
      })
    }
  }, [event])

  const handleInputChange = (field: keyof EditFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (result: any) => {
    if (result.event === 'success') {
      setFormData(prev => ({ ...prev, image: result.info.secure_url }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!event) return
    
    setIsSubmitting(true)

    try {
      const eventData = {
        eventId: event.id,
        ...formData,
        ctaLink: formData.ctaLink === 'custom' ? formData.customCtaLink : formData.ctaLink
      }

      const response = await fetch('/api/admin/edit-event', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      })

      if (response.ok) {
        onSave(event.id)
        onClose()
      } else {
        const error = await response.json()
        alert(`Fel: ${error.error}`)
      }
    } catch (error) {
      console.error('Error editing event:', error)
      alert('Kunde inte uppdatera event')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!event) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Redigera Event
          </DialogTitle>
          <DialogDescription>
            Gör ändringar i eventet innan du godkänner det
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="edit-title">Titel *</Label>
            <Input
              id="edit-title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="T.ex. Höstlovskul"
              required
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-startDate">Startdatum *</Label>
              <Input
                id="edit-startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-startTime">Starttid</Label>
              <Input
                id="edit-startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => handleInputChange('startTime', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-endDate">Slutdatum</Label>
              <Input
                id="edit-endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-endTime">Sluttid</Label>
              <Input
                id="edit-endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => handleInputChange('endTime', e.target.value)}
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="edit-location">Plats *</Label>
            <Input
              id="edit-location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="T.ex. Botkyrkahallen, Brunnavägen 6, 145 67 Norsborg, Sweden"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="edit-description">Kort beskrivning</Label>
            <Input
              id="edit-description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="T.ex. Oktober vecka 44"
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="edit-content">Detaljerad beskrivning *</Label>
            <Textarea
              id="edit-content"
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="Beskriv eventet i detalj..."
              rows={3}
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
                    {formData.image ? 'Ändra Bild' : 'Ladda upp Bild'}
                  </Button>
                  {formData.image && (
                    <div className="relative">
                      <Image 
                        src={formData.image} 
                        alt="Event preview" 
                        width={400}
                        height={128}
                        className="w-full h-24 sm:h-32 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
              )}
            </CldUploadWidget>
          </div>

          {/* CTA Section */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Call-to-Action</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-ctaText">Knapptext</Label>
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
                <Label htmlFor="edit-ctaLink">Länk</Label>
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
                <Label htmlFor="edit-customCtaLink">Anpassad länk</Label>
                <Input
                  id="edit-customCtaLink"
                  value={formData.customCtaLink}
                  onChange={(e) => handleInputChange('customCtaLink', e.target.value)}
                  placeholder="/min-anpassade-sida"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-kliv-red hover:bg-kliv-red-dark text-white flex-1"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Sparar...' : 'Spara Ändringar'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              <X className="h-4 w-4 mr-2" />
              Avbryt
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}