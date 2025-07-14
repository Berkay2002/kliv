'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Namn är obligatoriskt';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-post är obligatorisk';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ogiltig e-postadress';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Ämne är obligatoriskt';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Meddelande är obligatoriskt';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setStatus('loading');

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset to idle after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const subjects = [
    'Allmän förfrågan',
    'Medlemskap',
    'Lovaktiviteter',
    'Sportstruck & Sportoteket',
    'Samarbete',
    'Volontärarbete',
    'Annat'
  ];

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Name and Email Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-foreground">
            Namn *
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={cn(
              'mt-1',
              errors.name && 'border-red-500 focus:border-red-500 focus:ring-red-500'
            )}
            placeholder="Ditt fullständiga namn"
            disabled={status === 'loading'}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="text-sm font-medium text-foreground">
            E-post *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={cn(
              'mt-1',
              errors.email && 'border-red-500 focus:border-red-500 focus:ring-red-500'
            )}
            placeholder="din@email.com"
            disabled={status === 'loading'}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Phone and Subject Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="phone" className="text-sm font-medium text-foreground">
            Telefon
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="mt-1"
            placeholder="+46 123 456 789"
            disabled={status === 'loading'}
          />
        </div>

        <div>
          <Label htmlFor="subject" className="text-sm font-medium text-foreground">
            Ämne *
          </Label>
          <select
            id="subject"
            value={formData.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            className={cn(
              'mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
              'focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring',
              'disabled:cursor-not-allowed disabled:opacity-50',
              errors.subject && 'border-red-500 focus:border-red-500 focus:ring-red-500'
            )}
            disabled={status === 'loading'}
          >
            <option value="">Välj ämne</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <Label htmlFor="message" className="text-sm font-medium text-foreground">
          Meddelande *
        </Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          className={cn(
            'mt-1 min-h-[120px] resize-none',
            errors.message && 'border-red-500 focus:border-red-500 focus:ring-red-500'
          )}
          placeholder="Berätta om din förfrågan eller hur vi kan hjälpa dig..."
          disabled={status === 'loading'}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex items-center gap-4">
        <Button
          type="submit"
          disabled={status === 'loading'}
          className="bg-kliv-red hover:bg-kliv-red-dark text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
        >
          {status === 'loading' ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Skickar...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Skicka meddelande
            </>
          )}
        </Button>

        {/* Status Messages */}
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-green-600"
          >
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Meddelandet har skickats!</span>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-red-600"
          >
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Något gick fel. Försök igen.</span>
          </motion.div>
        )}
      </div>

      {/* Privacy Note */}
      <div className="text-sm text-muted-foreground">
        <p>
          Genom att skicka detta formulär godkänner du att vi behandlar dina personuppgifter 
          enligt vår{' '}
          <a href="/integritetspolicy" className="text-kliv-red hover:text-kliv-red-light underline">
            integritetspolicy
          </a>
          .
        </p>
      </div>
    </motion.form>
  );
}