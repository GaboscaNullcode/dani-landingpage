'use client';

import { motion } from 'motion/react';
import {
  CheckCircle,
  Video,
  Calendar,
  Clock,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

interface BookingConfirmationProps {
  planName: string;
  fecha: string;
  hora: string;
  duracionMinutos: number;
  timezone: string;
  zoomJoinUrl: string;
}

export default function BookingConfirmation({
  planName,
  fecha,
  hora,
  duracionMinutos,
  timezone,
  zoomJoinUrl,
}: BookingConfirmationProps) {
  const fechaFormatted = new Date(fecha + 'T12:00:00').toLocaleDateString(
    'es-PE',
    {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
  );

  const duracionText =
    duracionMinutos >= 60
      ? `${Math.floor(duracionMinutos / 60)}h ${duracionMinutos % 60 ? `${duracionMinutos % 60}min` : ''}`
      : `${duracionMinutos} minutos`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      {/* Animated check */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
      >
        <CheckCircle className="h-10 w-10 text-green-500" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-2 font-[var(--font-headline)] text-2xl font-bold text-gray-dark"
      >
        Reserva confirmada
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8 text-gray-medium"
      >
        Tu sesion ha sido agendada. Recibiras un email con los detalles y el
        enlace de Zoom.
      </motion.p>

      {/* Session details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mx-auto mb-8 max-w-sm space-y-3 rounded-2xl bg-cream p-6 text-left"
      >
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-coral" />
          <span className="capitalize text-gray-dark">{fechaFormatted}</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-coral" />
          <span className="text-gray-dark">
            {hora} - {duracionText} ({timezone})
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Video className="h-5 w-5 text-coral" />
          <span className="text-gray-dark">{planName} via Zoom</span>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
      >
        {zoomJoinUrl && (
          <a
            href={zoomJoinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-dark px-6 py-3 font-semibold text-gray-dark transition-colors hover:bg-gray-dark hover:text-white"
          >
            <Video className="h-4 w-4" />
            Link de Zoom
          </a>
        )}
        <Link
          href="/mi-cuenta"
          className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 font-bold"
        >
          Ir a Mi Cuenta
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
