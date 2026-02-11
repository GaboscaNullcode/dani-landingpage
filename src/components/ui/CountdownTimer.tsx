'use client';

import { useState, useEffect, useCallback, useMemo, useSyncExternalStore } from 'react';
import { motion } from 'motion/react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  endDate: Date | string;
  onComplete?: () => void;
  title?: string;
  showDays?: boolean;
  compact?: boolean;
}

// Hook to detect client-side mounting without setState in useEffect
function useHasMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

function calculateTimeLeft(endDate: Date): TimeLeft {
  const difference = endDate.getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function TimeBlock({
  value,
  label,
  compact,
}: {
  value: number;
  label: string;
  compact?: boolean;
}) {
  const formattedValue = value.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ scale: 1.1, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={`flex items-center justify-center rounded-xl font-[var(--font-headline)] font-bold ${
          compact
            ? 'h-12 w-12 text-xl bg-white text-gray-dark shadow-sm'
            : 'h-16 w-16 text-2xl md:h-20 md:w-20 md:text-3xl text-white'
        }`}
        style={
          !compact
            ? { background: 'var(--gradient-coral-pink)' }
            : undefined
        }
      >
        {formattedValue}
      </motion.div>
      <span
        className={`mt-2 uppercase tracking-wide ${
          compact ? 'text-[10px] text-gray-medium' : 'text-xs text-gray-carbon'
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({
  endDate,
  onComplete,
  title,
  showDays = true,
  compact = false,
}: CountdownTimerProps) {
  const targetDate = useMemo(
    () => (typeof endDate === 'string' ? new Date(endDate) : endDate),
    [endDate]
  );
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate));
  const hasMounted = useHasMounted();

  const checkComplete = useCallback(() => {
    const { days, hours, minutes, seconds } = timeLeft;
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      onComplete?.();
    }
  }, [timeLeft, onComplete]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  useEffect(() => {
    checkComplete();
  }, [checkComplete]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!hasMounted) {
    return (
      <div className={`flex items-center justify-center gap-3 ${compact ? 'gap-2' : 'gap-4'}`}>
        {showDays && <TimeBlock value={0} label="Días" compact={compact} />}
        <TimeBlock value={0} label="Horas" compact={compact} />
        <TimeBlock value={0} label="Min" compact={compact} />
        <TimeBlock value={0} label="Seg" compact={compact} />
      </div>
    );
  }

  const isExpired =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  if (isExpired) {
    return (
      <div className="rounded-xl bg-gray-100 px-6 py-4 text-center">
        <p className="font-[var(--font-headline)] font-bold text-gray-dark">
          ¡La oferta ha terminado!
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      {title && (
        <p className="mb-4 text-sm font-medium uppercase tracking-wide text-gray-carbon">
          {title}
        </p>
      )}
      <div className={`flex items-center justify-center ${compact ? 'gap-2' : 'gap-3 md:gap-4'}`}>
        {showDays && <TimeBlock value={timeLeft.days} label="Días" compact={compact} />}
        {!compact && showDays && (
          <span className="text-2xl font-bold text-gray-light">:</span>
        )}
        <TimeBlock value={timeLeft.hours} label="Horas" compact={compact} />
        {!compact && <span className="text-2xl font-bold text-gray-light">:</span>}
        <TimeBlock value={timeLeft.minutes} label="Min" compact={compact} />
        {!compact && <span className="text-2xl font-bold text-gray-light">:</span>}
        <TimeBlock value={timeLeft.seconds} label="Seg" compact={compact} />
      </div>
    </div>
  );
}
