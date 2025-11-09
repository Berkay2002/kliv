'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { subscriptionForm } from '@/config/content';
// import { addSubscriber } from '@/lib/subscribers'; // Removed direct import

export function SubscriptionForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      toast.error('Invalid Email', {
        description: 'Please enter a valid email address.',
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Subscribed!', {
          description: data.message || 'You will now receive updates on our events.',
        });
        setEmail(''); // Clear the input
      } else {
        const errorData = await response.json();
        toast.error('Subscription Failed', {
          description: errorData.message || 'There was an error subscribing. Please try again.',
        });
      }
    } catch (error) {
      console.error('Frontend subscription error:', error);
      toast.error('Subscription Failed', {
        description: 'Network error or server unreachable. Please try again.',
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">{subscriptionForm.heading}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center max-w-xs">
        {subscriptionForm.description}
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-3">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email" className="sr-only">E-post</Label>
          <Input
            type="email"
            id="email"
            placeholder={subscriptionForm.placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <Button type="submit" className="w-full bg-kliv-red hover:bg-kliv-red-dark transition-colors duration-200" disabled={isLoading}>
          {isLoading ? subscriptionForm.buttonLoading : subscriptionForm.button}
        </Button>
      </form>
    </div>
  );
} 