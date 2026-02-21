'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Loader2 } from 'lucide-react';
import type { TimeSlot } from '@/types/reservas';

interface TimeSlotPickerProps {
  fecha: string;
  planId: string;
  selectedSlot: string | null;
  onSelectSlot: (hora: string) => void;
}

export default function TimeSlotPicker({
  fecha,
  planId,
  selectedSlot,
  onSelectSlot,
}: TimeSlotPickerProps) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [timezone, setTimezone] = useState('');

  useEffect(() => {
    async function fetchSlots() {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/reservas/disponibilidad?fecha=${fecha}&planId=${planId}`,
        );
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setSlots(data.slots || []);
        setTimezone(data.timezone || '');
      } catch {
        setSlots([]);
      } finally {
        setLoading(false);
      }
    }

    fetchSlots();
  }, [fecha, planId]);

  const availableSlots = slots.filter((s) => s.disponible);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-coral" />
        <span className="ml-2 text-gray-medium">Cargando horarios...</span>
      </div>
    );
  }

  if (availableSlots.length === 0) {
    return (
      <div className="py-8 text-center">
        <Clock className="mx-auto mb-3 h-10 w-10 text-gray-light" />
        <p className="text-gray-medium">
          No hay horarios disponibles para esta fecha.
        </p>
        <p className="mt-1 text-sm text-gray-light">
          Intenta seleccionar otro dia.
        </p>
      </div>
    );
  }

  const fechaFormatted = new Date(fecha + 'T12:00:00').toLocaleDateString(
    'es-PE',
    {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    },
  );

  return (
    <div>
      <div className="mb-4">
        <h4 className="font-[var(--font-headline)] text-lg font-bold capitalize text-gray-dark">
          {fechaFormatted}
        </h4>
        {timezone && (
          <p className="text-sm text-gray-medium">
            Horario en {timezone}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {availableSlots.map((slot, index) => (
          <motion.button
            key={slot.hora}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
            onClick={() => onSelectSlot(slot.hora)}
            className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
              selectedSlot === slot.hora
                ? 'bg-coral text-white shadow-lg shadow-coral/30'
                : 'border border-gray-light bg-white text-gray-dark hover:border-coral hover:text-coral'
            }`}
          >
            <Clock className="mr-1.5 inline-block h-4 w-4" />
            {slot.hora}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
