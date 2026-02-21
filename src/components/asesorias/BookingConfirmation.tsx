'use client';

import { motion } from 'motion/react';
import {
  CheckCircle,
  Video,
  Calendar,
  Clock,
  Bell,
  Play,
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
      className="py-6 text-center md:py-10"
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
        className="mb-2 font-[var(--font-headline)] text-3xl font-bold text-gray-dark"
      >
        Tu sesión está confirmada
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-6 text-lg text-gray-medium"
      >
        Tu asesoría ya está agendada.
      </motion.p>

      {/* Session details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mx-auto mb-6 max-w-sm space-y-3 rounded-2xl bg-cream p-6 text-left"
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
        {zoomJoinUrl && (
          <a
            href={zoomJoinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-coral hover:text-pink"
          >
            <Video className="h-4 w-4" />
            Abrir enlace de Zoom
          </a>
        )}
      </motion.div>

      {/* Email reminder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mx-auto mb-8 max-w-sm rounded-2xl border border-gray-light/50 bg-white p-5 text-left"
      >
        <p className="mb-3 text-sm font-medium text-gray-dark">
          En unos minutos recibirás un correo con:
        </p>
        <ul className="space-y-2 text-sm text-gray-medium">
          <li className="flex items-center gap-2">
            <Calendar className="h-4 w-4 shrink-0 text-coral" />
            Fecha y hora
          </li>
          <li className="flex items-center gap-2">
            <Video className="h-4 w-4 shrink-0 text-coral" />
            Tu enlace personal de Zoom
          </li>
          <li className="flex items-center gap-2">
            <Bell className="h-4 w-4 shrink-0 text-coral" />
            Recordatorio automático
          </li>
        </ul>
      </motion.div>

      {/* Masterclass recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mx-auto mb-8 max-w-sm rounded-2xl bg-lavender/30 p-6"
      >
        <p className="mb-4 text-sm leading-relaxed text-gray-dark">
          Mientras tanto, te recomiendo ver la masterclass gratuita para que
          llegues con más claridad y podamos aprovechar al máximo nuestro tiempo
          juntas.
        </p>
        <Link
          href="/tienda/masterclass-gratuita"
          className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 font-bold"
        >
          <Play className="h-4 w-4" />
          Ver Masterclass
        </Link>
      </motion.div>

      {/* Closing */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-lg font-medium text-gray-dark"
      >
        Nos vemos pronto
      </motion.p>
    </motion.div>
  );
}
