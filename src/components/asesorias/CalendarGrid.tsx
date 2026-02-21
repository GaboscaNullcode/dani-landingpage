'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface CalendarGridProps {
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  planId: string;
  minDate: Date;
  maxDate: Date;
}

const WEEKDAYS = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

export default function CalendarGrid({
  selectedDate,
  onSelectDate,
  planId,
  minDate,
  maxDate,
}: CalendarGridProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [availableDates, setAvailableDates] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const fetchMonthAvailability = useCallback(async () => {
    setLoading(true);
    const { year, month } = currentMonth;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dates: string[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      if (date >= minDate && date <= maxDate) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        dates.push(dateStr);
      }
    }

    // Check availability for each valid date
    const available = new Set<string>();
    const results = await Promise.allSettled(
      dates.map(async (fecha) => {
        const res = await fetch(
          `/api/reservas/disponibilidad?fecha=${fecha}&planId=${planId}`,
        );
        if (!res.ok) return null;
        const data = await res.json();
        if (data.slots?.some((s: { disponible: boolean }) => s.disponible)) {
          return fecha;
        }
        return null;
      }),
    );

    for (const result of results) {
      if (result.status === 'fulfilled' && result.value) {
        available.add(result.value);
      }
    }

    setAvailableDates(available);
    setLoading(false);
  }, [currentMonth, planId, minDate, maxDate]);

  useEffect(() => {
    fetchMonthAvailability();
  }, [fetchMonthAvailability]);

  const { year, month } = currentMonth;
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const canGoPrev = new Date(year, month, 1) > minDate;
  const canGoNext = new Date(year, month + 1, 0) < maxDate;

  const monthName = new Date(year, month).toLocaleDateString('es-PE', {
    month: 'long',
    year: 'numeric',
  });

  const goToPrevMonth = () => {
    if (!canGoPrev) return;
    setCurrentMonth((prev) => {
      if (prev.month === 0) return { year: prev.year - 1, month: 11 };
      return { ...prev, month: prev.month - 1 };
    });
  };

  const goToNextMonth = () => {
    if (!canGoNext) return;
    setCurrentMonth((prev) => {
      if (prev.month === 11) return { year: prev.year + 1, month: 0 };
      return { ...prev, month: prev.month + 1 };
    });
  };

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={goToPrevMonth}
          disabled={!canGoPrev}
          className="rounded-full p-2 transition-colors hover:bg-cream disabled:opacity-30"
          aria-label="Mes anterior"
        >
          <ChevronLeft className="h-5 w-5 text-gray-dark" />
        </button>
        <h3 className="font-[var(--font-headline)] text-lg font-bold capitalize text-gray-dark">
          {monthName}
        </h3>
        <button
          onClick={goToNextMonth}
          disabled={!canGoNext}
          className="rounded-full p-2 transition-colors hover:bg-cream disabled:opacity-30"
          aria-label="Mes siguiente"
        >
          <ChevronRight className="h-5 w-5 text-gray-dark" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="mb-2 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="py-2 text-center text-xs font-semibold uppercase text-gray-medium"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${year}-${month}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-7 gap-1"
        >
          {days.map((day, idx) => {
            if (day === null) {
              return <div key={`empty-${idx}`} className="aspect-square" />;
            }

            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isAvailable = availableDates.has(dateStr);
            const isSelected = selectedDate === dateStr;
            const isPast = new Date(year, month, day) < minDate;
            const isFuture = new Date(year, month, day) > maxDate;
            const isDisabled = isPast || isFuture || !isAvailable;

            return (
              <button
                key={dateStr}
                onClick={() => !isDisabled && onSelectDate(dateStr)}
                disabled={isDisabled}
                className={`aspect-square rounded-full text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-coral text-white shadow-lg shadow-coral/30'
                    : isAvailable
                      ? 'bg-coral/10 text-coral hover:bg-coral/20'
                      : 'text-gray-light'
                } ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {day}
              </button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Loading indicator */}
      {loading && (
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-medium">
          <Loader2 className="h-4 w-4 animate-spin" />
          Cargando disponibilidad...
        </div>
      )}
    </div>
  );
}
