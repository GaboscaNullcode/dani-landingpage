'use client';

import { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

interface CheckoutButtonProps {
  priceId: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function CheckoutButton({
  priceId,
  children,
  className = '',
  style,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout error:', data.error);
        setLoading(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`${className} disabled:opacity-70`}
      style={style}
    >
      {loading ? (
        <>
          Procesando...
          <Loader2 className="h-4 w-4 animate-spin" />
        </>
      ) : (
        <>
          {children}
          <ArrowRight className="h-4 w-4" />
        </>
      )}
    </button>
  );
}
