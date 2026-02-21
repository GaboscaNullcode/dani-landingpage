'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  PlayCircle,
  CalendarDays,
  CreditCard,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/types/tienda';

interface Pago2Product {
  id: string;
  stripePriceId: string;
  price: number;
}

interface ProgramaIntensivoSectionProps {
  paidFull: boolean;
  paid1: boolean;
  paid2: boolean;
  pago2Product: Pago2Product | null;
}

export default function ProgramaIntensivoSection({
  paidFull,
  paid1,
  paid2,
  pago2Product,
}: ProgramaIntensivoSectionProps) {
  const [checkingOut, setCheckingOut] = useState(false);

  const hasMaterials = paidFull || paid1 || paid2;
  const canBook = paidFull || paid2;
  const needsPago2 = paid1 && !paid2 && !paidFull;

  if (!hasMaterials) return null;

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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.12 }}
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral/10">
          <GraduationCap className="h-4 w-4 text-coral" />
        </div>
        <h2 className="font-[var(--font-headline)] text-xl font-bold text-black-deep">
          Programa Intensivo
        </h2>
      </div>

      <div className="rounded-2xl bg-white/70 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Materiales */}
          <div className="rounded-xl border border-gray-light/60 p-4">
            <div className="mb-3 flex items-center gap-2">
              <PlayCircle className="h-5 w-5 text-coral" />
              <h3 className="font-semibold text-gray-dark">
                Videos y materiales
              </h3>
            </div>
            <p className="mb-4 text-sm text-gray-medium">
              Accede a todo el contenido del programa: videos, guias y
              ejercicios.
            </p>
            <Link
              href="/mi-cuenta"
              className="inline-flex items-center gap-1.5 rounded-lg bg-coral/10 px-4 py-2 text-sm font-semibold text-coral transition-colors hover:bg-coral hover:text-white"
            >
              <PlayCircle className="h-4 w-4" />
              Ver materiales
            </Link>
          </div>

          {/* Sesion */}
          <div className="rounded-xl border border-gray-light/60 p-4">
            <div className="mb-3 flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-coral" />
              <h3 className="font-semibold text-gray-dark">
                Sesion 1:1
              </h3>
            </div>

            {canBook && (
              <>
                <p className="mb-4 text-sm text-gray-medium">
                  Agenda tu sesion personalizada de 90 minutos con Dani.
                </p>
                <Link
                  href="/asesorias/agendar"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-coral to-pink px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:shadow-md"
                >
                  <CalendarDays className="h-4 w-4" />
                  Agendar sesion
                </Link>
              </>
            )}

            {needsPago2 && (
              <>
                <p className="mb-4 text-sm text-gray-medium">
                  Completa tu segundo pago para desbloquear la sesion 1:1.
                </p>
                <button
                  onClick={handlePago2Checkout}
                  disabled={checkingOut || !pago2Product}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-coral to-pink px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:shadow-md disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {checkingOut ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CreditCard className="h-4 w-4" />
                  )}
                  Hacer 2do pago
                  {pago2Product
                    ? ` (${formatPrice(pago2Product.price)})`
                    : ''}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
