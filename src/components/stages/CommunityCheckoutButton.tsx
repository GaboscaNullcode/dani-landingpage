'use client';

import { useState, useEffect, useRef } from 'react';
import { Loader2, X, User, Mail, ShieldCheck, ArrowRight } from 'lucide-react';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';

interface CommunityCheckoutButtonProps {
  priceId: string;
  productId: string;
}

export default function CommunityCheckoutButton({
  priceId,
  productId,
}: CommunityCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showModal && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [showModal]);

  useEffect(() => {
    if (!showModal) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setShowModal(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showModal]);

  function handleBackdropClick(e: React.MouseEvent) {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setShowModal(false);
    }
  }

  async function handleCheckout() {
    if (!name.trim() || !email.trim()) {
      setError('Por favor completa todos los campos');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor ingresa un email valido');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          productId,
          customerEmail: email.trim(),
          customerName: name.trim(),
          isCommunity: true,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout error:', data.error);
        setError('Error al procesar. Intenta de nuevo.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Error de conexion. Intenta de nuevo.');
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        disabled={loading}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-green-500 px-8 py-4 font-[var(--font-headline)] font-bold text-white transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(34,197,94,0.3)] disabled:opacity-70"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Unirme a la Comunidad — $5.99/mes
      </button>

      {showModal && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm overscroll-contain"
          onClick={handleBackdropClick}
        >
          <div
            ref={modalRef}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-gray-medium transition-colors hover:bg-gray-light hover:text-gray-dark"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 pb-5 pt-6">
              <h2 className="font-[var(--font-headline)] text-xl font-bold text-white">
                Unirme a la Comunidad
              </h2>
              <p className="mt-1 text-sm text-white/85">
                Suscripcion mensual de $5.99/mes. Cancela cuando quieras.
              </p>
            </div>

            <div className="px-6 pb-6 pt-5">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="community-name"
                    className="mb-1 flex items-center gap-1.5 text-sm font-semibold text-gray-dark"
                  >
                    <User className="h-3.5 w-3.5 text-green-500" />
                    Tu nombre
                  </label>
                  <input
                    ref={nameInputRef}
                    id="community-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: Maria Garcia"
                    className="w-full rounded-xl border-2 border-gray-light px-4 py-3 text-gray-dark transition-colors placeholder:text-gray-medium/50 focus:border-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/40"
                    autoComplete="name"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        document.getElementById('community-email')?.focus();
                      }
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="community-email"
                    className="mb-1 flex items-center gap-1.5 text-sm font-semibold text-gray-dark"
                  >
                    <Mail className="h-3.5 w-3.5 text-green-500" />
                    Tu email
                  </label>
                  <input
                    id="community-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="w-full rounded-xl border-2 border-gray-light px-4 py-3 text-gray-dark transition-colors placeholder:text-gray-medium/50 focus:border-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/40"
                    autoComplete="email"
                    spellCheck={false}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleCheckout();
                      }
                    }}
                  />
                </div>

                {error && (
                  <div className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <div className="flex items-start gap-2 rounded-xl bg-green-50 px-4 py-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <p className="text-xs leading-relaxed text-gray-carbon">
                    Despues del pago recibiras el enlace para unirte al grupo de
                    WhatsApp. Puedes cancelar tu suscripcion en cualquier
                    momento.
                  </p>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Redirigiendo al pago…
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      Continuar al pago
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
