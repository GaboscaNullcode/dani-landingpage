'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { CalendarDays, CreditCard, Loader2, MessageCircle } from 'lucide-react';
import { formatPrice } from '@/types/tienda';

interface ProgramaCTAProps {
  paidFull: boolean;
  paid1: boolean;
  paid2: boolean;
  bookingSessionId: string | null;
  pago2Product: { id: string; stripePriceId: string; price: number } | null;
  parentProductId: string | null;
}

export default function ProgramaCTA({
  paidFull,
  paid1,
  paid2,
  bookingSessionId,
  pago2Product,
  parentProductId,
}: ProgramaCTAProps) {
  const [checkingOut, setCheckingOut] = useState(false);

  const canBook = paidFull || paid2;
  const needsPago2 = paid1 && !paid2 && !paidFull;

  const handlePago2Checkout = async () => {
    if (!pago2Product) return;
    setCheckingOut(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: pago2Product.stripePriceId,
          productId: pago2Product.id,
          isAsesoria: true,
          planId: parentProductId,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setCheckingOut(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded-2xl bg-gradient-to-r from-coral/10 via-pink/5 to-lavender/10 p-6 text-center"
    >
      {canBook && (
        <>
          <h3 className="mb-2 font-[var(--font-headline)] text-lg font-bold text-gray-dark">
            Ya estoy list@ para agendar mi sesion con Dani
          </h3>
          {bookingSessionId ? (
            <Link
              href={`/asesorias/agendar?session_id=${bookingSessionId}`}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-coral to-pink px-6 py-3 font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:shadow-xl"
            >
              <CalendarDays className="h-5 w-5" />
              Agendar mi sesion
            </Link>
          ) : (
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/60 px-5 py-3 text-sm text-gray-medium">
              <MessageCircle className="h-4 w-4" />
              No pudimos encontrar tu sesion de pago. Contacta a Dani para
              recibir ayuda.
            </div>
          )}
        </>
      )}

      {needsPago2 && (
        <>
          <h3 className="mb-2 font-[var(--font-headline)] text-lg font-bold text-gray-dark">
            Ya estoy list@ para hacer el 2do pago y agendar mi sesion
          </h3>
          <button
            onClick={handlePago2Checkout}
            disabled={checkingOut || !pago2Product}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-coral to-pink px-6 py-3 font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {checkingOut ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <CreditCard className="h-5 w-5" />
            )}
            Hacer 2do pago
            {pago2Product ? ` (${formatPrice(pago2Product.price)})` : ''}
          </button>
        </>
      )}
    </motion.div>
  );
}
