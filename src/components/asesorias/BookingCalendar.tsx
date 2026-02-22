'use client';

import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CalendarGrid from './CalendarGrid';
import TimeSlotPicker from './TimeSlotPicker';
import BookingSummary from './BookingSummary';
import BookingConfirmation from './BookingConfirmation';

type BookingStep = 'calendar' | 'time' | 'summary' | 'confirming' | 'done';

interface BookingCalendarProps {
  planId: string;
  planName: string;
  stripeSessionId: string;
  duracionMinutos: number;
  timezone: string;
}

export default function BookingCalendar({
  planId,
  planName,
  stripeSessionId,
  duracionMinutos,
  timezone,
}: BookingCalendarProps) {
  const [step, setStep] = useState<BookingStep>('calendar');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState('');
  const [zoomJoinUrl, setZoomJoinUrl] = useState('');

  const { minDate, maxDate } = useMemo(() => {
    const min = new Date();
    min.setDate(min.getDate() + 1);
    min.setHours(0, 0, 0, 0);
    const max = new Date();
    max.setDate(max.getDate() + 30);
    max.setHours(23, 59, 59, 999);
    return { minDate: min, maxDate: max };
  }, []);

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setStep('time');
  };

  const handleSelectSlot = (hora: string) => {
    setSelectedSlot(hora);
    setStep('summary');
  };

  const abortControllerRef = useRef<AbortController | null>(null);

  const handleConfirm = async (notas: string) => {
    if (!selectedDate || !selectedSlot) return;

    // Abort any pending request
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setConfirming(true);
    setError('');

    try {
      const res = await fetch('/api/reservas/crear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stripeSessionId,
          planId,
          fecha: selectedDate,
          hora: selectedSlot,
          notasCliente: notas || undefined,
        }),
        signal: controller.signal,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al crear la reserva');
      }

      setZoomJoinUrl(data.zoomJoinUrl || '');
      setStep('done');
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setError(
        err instanceof Error ? err.message : 'Error al crear la reserva',
      );
    } finally {
      setConfirming(false);
    }
  };

  const handleBack = () => {
    if (step === 'time') {
      setStep('calendar');
      setSelectedSlot(null);
    } else if (step === 'summary') {
      setStep('time');
    }
  };

  return (
    <div className="mx-auto max-w-lg">
      {/* Step indicator */}
      {step !== 'done' && (
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            {['Fecha', 'Hora', 'Confirmar'].map((label, idx) => {
              const stepIndex =
                step === 'calendar'
                  ? 0
                  : step === 'time'
                    ? 1
                    : 2;
              const isActive = idx === stepIndex;
              const isCompleted = idx < stepIndex;

              return (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                      isActive
                        ? 'bg-coral text-white'
                        : isCompleted
                          ? 'bg-coral/20 text-coral'
                          : 'bg-gray-light/30 text-gray-medium'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span
                    className={`hidden text-sm sm:inline ${
                      isActive
                        ? 'font-semibold text-gray-dark'
                        : 'text-gray-medium'
                    }`}
                  >
                    {label}
                  </span>
                  {idx < 2 && (
                    <div className="mx-2 h-px w-8 bg-gray-light sm:w-12" />
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-sm text-gray-medium">
            Agenda tu sesion de <strong className="text-gray-dark">{planName}</strong>
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          {error}
        </motion.div>
      )}

      {/* Steps */}
      <AnimatePresence mode="wait">
        {step === 'calendar' && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <CalendarGrid
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
              planId={planId}
              minDate={minDate}
              maxDate={maxDate}
            />
          </motion.div>
        )}

        {step === 'time' && selectedDate && (
          <motion.div
            key="time"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={handleBack}
              className="mb-4 text-sm font-medium text-coral hover:text-pink"
            >
              &larr; Cambiar fecha
            </button>
            <TimeSlotPicker
              fecha={selectedDate}
              planId={planId}
              selectedSlot={selectedSlot}
              onSelectSlot={handleSelectSlot}
            />
          </motion.div>
        )}

        {(step === 'summary' || step === 'confirming') &&
          selectedDate &&
          selectedSlot && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <BookingSummary
                planName={planName}
                fecha={selectedDate}
                hora={selectedSlot}
                duracionMinutos={duracionMinutos}
                timezone={timezone}
                onConfirm={handleConfirm}
                onBack={handleBack}
                loading={confirming}
              />
            </motion.div>
          )}

        {step === 'done' && selectedDate && selectedSlot && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <BookingConfirmation
              planName={planName}
              fecha={selectedDate}
              hora={selectedSlot}
              duracionMinutos={duracionMinutos}
              timezone={timezone}
              zoomJoinUrl={zoomJoinUrl}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
