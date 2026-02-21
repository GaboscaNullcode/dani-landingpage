'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Loader2,
  X,
  User,
  Mail,
  ShieldCheck,
  ArrowRight,
  CircleCheck,
} from 'lucide-react';
import { useCheckoutAuth } from '@/hooks/useCheckoutAuth';

interface CommunityCheckoutButtonProps {
  priceId: string;
  productId: string;
  price?: number;
  originalPrice?: number;
}

export default function CommunityCheckoutButton({
  priceId,
  productId,
  price,
  originalPrice,
}: CommunityCheckoutButtonProps) {
  const displayPrice = price != null ? `$${price}/mes` : '$5.99/mes';
  const { user, compras, loading: authLoading } = useCheckoutAuth();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const alreadyMember = compras.some(
    (c) => c.producto === productId && c.estado === 'activa',
  );

  useEffect(() => {
    if (showModal && !user && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [showModal, user]);

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

  async function goToCheckout(customerName: string, customerEmail: string) {
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          productId,
          customerEmail,
          customerName,
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

  function handleClick() {
    if (user) {
      goToCheckout(user.name, user.email);
    } else {
      setShowModal(true);
    }
  }

  function handleModalCheckout() {
    if (!name.trim() || !email.trim()) {
      setError('Por favor completa todos los campos');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor ingresa un email valido');
      return;
    }

    goToCheckout(name.trim(), email.trim());
  }

  if (!authLoading && alreadyMember) {
    return (
      <>
        <span className="inline-flex items-center gap-2 font-[var(--font-headline)] text-xl font-bold text-mint">
          <CircleCheck className="h-6 w-6" />
          Miembro activo
        </span>
        <Link
          href="/mi-cuenta"
          className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-dark"
        >
          Ir a mi cuenta
          <ArrowRight className="h-4 w-4" />
        </Link>
      </>
    );
  }

  return (
    <>
      <div className="flex items-baseline gap-2">
        <span className="font-[var(--font-headline)] text-3xl font-bold text-lavender">
          {displayPrice}
        </span>
        {originalPrice && (
          <span className="text-lg text-gray-medium line-through">
            ${originalPrice}/mes
          </span>
        )}
      </div>

      <button
        onClick={handleClick}
        disabled={loading || authLoading}
        className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-lavender to-pink px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(167,139,250,0.35)] disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Redirigiendo…
          </>
        ) : (
          <>
            Obtener acceso
            <ArrowRight className="h-4 w-4" />
          </>
        )}
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

            <div className="bg-gradient-to-r from-lavender to-pink px-6 pb-5 pt-6">
              <h2 className="font-[var(--font-headline)] text-xl font-bold text-white">
                Comunidad Privada
              </h2>
              <p className="mt-1 text-sm text-white/85">
                Suscripción mensual de {displayPrice}. Cancela cuando quieras.
              </p>
            </div>

            <div className="px-6 pb-6 pt-5">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="community-name"
                    className="mb-1 flex items-center gap-1.5 text-sm font-semibold text-gray-dark"
                  >
                    <User className="h-3.5 w-3.5 text-lavender" />
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
                    className="w-full rounded-xl border-2 border-gray-light px-4 py-3 text-gray-dark transition-colors placeholder:text-gray-medium/50 focus:border-lavender focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender/40"
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
                    <Mail className="h-3.5 w-3.5 text-lavender" />
                    Tu email
                  </label>
                  <input
                    id="community-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="w-full rounded-xl border-2 border-gray-light px-4 py-3 text-gray-dark transition-colors placeholder:text-gray-medium/50 focus:border-lavender focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender/40"
                    autoComplete="email"
                    spellCheck={false}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleModalCheckout();
                      }
                    }}
                  />
                </div>

                {error && (
                  <div className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <div className="flex items-start gap-2 rounded-xl bg-lavender/10 px-4 py-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-lavender" />
                  <p className="text-xs leading-relaxed text-gray-carbon">
                    Despues del pago recibiras el enlace para unirte al grupo de
                    WhatsApp. Puedes cancelar tu suscripcion en cualquier
                    momento.
                  </p>
                </div>

                <button
                  onClick={handleModalCheckout}
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-lavender to-pink px-6 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 disabled:hover:translate-y-0"
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
