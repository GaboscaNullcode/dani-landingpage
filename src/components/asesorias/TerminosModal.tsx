'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Loader2 } from 'lucide-react';
import type { AsesoriaPlan } from '@/types/tienda';

interface TerminosModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: AsesoriaPlan;
}

export default function TerminosModal({
  isOpen,
  onClose,
  plan,
}: TerminosModalProps) {
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    if (!loading) onClose();
  }, [loading, onClose]);

  useEffect(() => {
    if (isOpen) {
      setAccepted(false);
      setError('');
      setLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && checkboxRef.current) {
      checkboxRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  function handleBackdropClick(e: React.MouseEvent) {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  }

  async function handleContinuar() {
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: plan.stripePriceId,
          productId: plan.id,
          isAsesoria: true,
          planId: plan.id,
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError('Error al procesar el pago. Intenta de nuevo.');
        setLoading(false);
      }
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm overscroll-contain"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="terminos-modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-coral to-pink px-6 pb-5 pt-6">
          <h2
            id="terminos-modal-title"
            className="font-[var(--font-headline)] text-xl font-bold text-white"
          >
            Antes de continuar
          </h2>
          <p className="mt-1 text-sm text-white/85">
            Antes de realizar tu pago, es importante que leas y aceptes los
            términos y condiciones del acompañamiento. Esto nos ayuda a respetar
            el tiempo de ambas partes y tener claridad sobre reprogramaciones,
            cancelaciones y funcionamiento de la sesión.
          </p>
        </div>

        {/* Body */}
        <div className="space-y-5 px-6 pb-6 pt-5">
          {/* Checkbox */}
          <label className="group flex cursor-pointer items-start gap-3">
            <input
              ref={checkboxRef}
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 rounded border-2 border-gray-medium accent-coral focus-visible:ring-2 focus-visible:ring-coral/40"
            />
            <span className="text-sm leading-relaxed text-gray-carbon">
              He leído y acepto los{' '}
              <span className="font-semibold text-gray-dark">
                términos y condiciones del acompañamiento
              </span>
              .
            </span>
          </label>

          {/* Error */}
          {error && (
            <div className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* CTA */}
          <button
            onClick={handleContinuar}
            disabled={!accepted || loading}
            className="w-full rounded-xl bg-gradient-to-r from-coral to-pink px-6 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            {loading ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Redirigiendo al pago…
              </span>
            ) : (
              'Continuar al pago'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
