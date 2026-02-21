'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  Clock,
  Globe,
  FileText,
  Loader2,
  ArrowLeft,
} from 'lucide-react';
interface BookingSummaryProps {
  planName: string;
  fecha: string;
  hora: string;
  duracionMinutos: number;
  timezone: string;
  onConfirm: (notas: string) => void;
  onBack: () => void;
  loading: boolean;
}

export default function BookingSummary({
  planName,
  fecha,
  hora,
  duracionMinutos,
  timezone,
  onConfirm,
  onBack,
  loading,
}: BookingSummaryProps) {
  const [notas, setNotas] = useState('');
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="mb-6 font-[var(--font-headline)] text-xl font-bold text-gray-dark">
        Confirma tu reserva
      </h3>

      <div className="mb-6 space-y-4 rounded-2xl bg-cream p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-coral/10">
            <FileText className="h-5 w-5 text-coral" />
          </div>
          <div>
            <p className="text-xs text-gray-medium">Plan</p>
            <p className="font-semibold text-gray-dark">{planName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-coral/10">
            <Calendar className="h-5 w-5 text-coral" />
          </div>
          <div>
            <p className="text-xs text-gray-medium">Fecha</p>
            <p className="font-semibold capitalize text-gray-dark">
              {fechaFormatted}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-coral/10">
            <Clock className="h-5 w-5 text-coral" />
          </div>
          <div>
            <p className="text-xs text-gray-medium">Hora y duracion</p>
            <p className="font-semibold text-gray-dark">
              {hora} ({duracionText})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-coral/10">
            <Globe className="h-5 w-5 text-coral" />
          </div>
          <div>
            <p className="text-xs text-gray-medium">Zona horaria</p>
            <p className="font-semibold text-gray-dark">{timezone}</p>
          </div>
        </div>
      </div>

      {/* Notes textarea */}
      <div className="mb-6">
        <label
          htmlFor="booking-notes"
          className="mb-2 block text-sm font-medium text-gray-dark"
        >
          Notas o preguntas para la sesion (opcional)
        </label>
        <textarea
          id="booking-notes"
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
          placeholder="Cuentame brevemente que esperas de esta sesion o si hay algo especifico que quieras trabajar..."
          rows={3}
          maxLength={500}
          className="w-full rounded-xl border border-gray-light px-4 py-3 text-sm text-gray-dark placeholder:text-gray-light focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20"
        />
        <p className="mt-1 text-right text-xs text-gray-light">
          {notas.length}/500
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl border-2 border-gray-light px-5 py-3 font-semibold text-gray-carbon transition-colors hover:border-gray-dark disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </button>
        <button
          onClick={() => onConfirm(notas)}
          disabled={loading}
          className="btn-primary flex-1 rounded-xl py-3 font-bold disabled:opacity-50"
        >
          {loading ? (
            <span className="inline-flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Confirmando...
            </span>
          ) : (
            'Confirmar Reserva'
          )}
        </button>
      </div>
    </motion.div>
  );
}
