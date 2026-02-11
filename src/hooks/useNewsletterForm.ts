'use client';

import { useState } from 'react';
import type { NewsletterSubscribeResponse } from '@/types/newsletter';

interface UseNewsletterFormReturn {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export function useNewsletterForm(
  source: 'home' | 'newsletter_page' | 'blog' | 'quiz',
): UseNewsletterFormReturn {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, source }),
      });

      const data: NewsletterSubscribeResponse = await res.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      setIsSuccess(true);
    } catch {
      setError('Hubo un error de conexion. Intentalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    isSubmitting,
    isSuccess,
    error,
    handleSubmit,
  };
}
