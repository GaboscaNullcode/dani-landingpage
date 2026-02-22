'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'motion/react';
import {
  Mail,
  BookOpen,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Check,
  User,
  X,
  Download,
  CircleCheck,
} from 'lucide-react';
import { useNewsletterForm } from '@/hooks/useNewsletterForm';
import { useCheckoutAuth } from '@/hooks/useCheckoutAuth';
import type { Product } from '@/types/tienda';

/* ------------------------------------------------------------------ */
/*  Guide request modal                                                */
/* ------------------------------------------------------------------ */

function GuideModal({
  isOpen,
  onClose,
  downloadUrl,
  authUser,
  productId,
}: {
  isOpen: boolean;
  onClose: () => void;
  downloadUrl?: string;
  authUser: { name: string; email: string } | null;
  productId?: string;
}) {
  // Form for unauthenticated users
  const newsletterForm = useNewsletterForm('guia_gratuita');

  // State for authenticated user claim flow
  const [claimLoading, setClaimLoading] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);
  const [claimError, setClaimError] = useState<string | null>(null);

  async function handleAuthClaim() {
    if (!productId) return;
    setClaimLoading(true);
    setClaimError(null);

    try {
      const res = await fetch('/api/claim-free', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setClaimError(data.error || 'Error al procesar. Intenta de nuevo.');
        return;
      }

      setClaimSuccess(true);
    } catch {
      setClaimError('Error de conexion. Intenta de nuevo.');
    } finally {
      setClaimLoading(false);
    }
  }

  const isSuccess = authUser ? claimSuccess : newsletterForm.isSuccess;
  const displayName = authUser ? authUser.name : newsletterForm.name;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md rounded-[28px] bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200"
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" />
            </button>

            {isSuccess ? (
              /* ── Success state ── */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center"
              >
                <div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{
                    background:
                      'linear-gradient(135deg, #6ee7b7 0%, #34d399 100%)',
                    boxShadow: '0 12px 32px rgba(52, 211, 153, 0.4)',
                  }}
                >
                  <Check className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-[var(--font-headline)] text-xl font-bold text-black-deep">
                  ¡Listo, {displayName}!
                </h3>
                <p className="mt-2 text-sm text-gray-medium">
                  Revisa tu inbox. Te enviamos la guía.
                </p>
                {downloadUrl && (
                  <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-lavender/10 px-5 py-2.5 text-sm font-semibold text-lavender transition-colors hover:bg-lavender/20"
                  >
                    <Download className="h-4 w-4" />
                    Descargar guía ahora
                  </a>
                )}
              </motion.div>
            ) : authUser ? (
              /* ── Authenticated user: simple confirmation ── */
              <>
                <div className="mb-6 text-center">
                  <div
                    className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{
                      background:
                        'linear-gradient(135deg, #a78bfa 0%, #6ee7b7 100%)',
                      boxShadow: '0 10px 30px rgba(167, 139, 250, 0.3)',
                    }}
                  >
                    <BookOpen className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-[var(--font-headline)] text-xl font-bold text-black-deep">
                    Recibe tu guía gratuita
                  </h3>
                  <p className="mt-2 text-sm text-gray-carbon">
                    La guía se enviará a{' '}
                    <span className="font-semibold text-lavender">
                      {authUser.email}
                    </span>
                  </p>
                </div>

                {claimError && (
                  <p className="mb-4 text-center text-sm font-medium text-red-500">
                    {claimError}
                  </p>
                )}

                <motion.button
                  onClick={handleAuthClaim}
                  disabled={claimLoading}
                  className="btn-shimmer w-full rounded-full py-4 font-[var(--font-headline)] text-base font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
                  style={{
                    background:
                      'linear-gradient(135deg, #a78bfa 0%, #6ee7b7 100%)',
                    boxShadow: '0 10px 30px rgba(167, 139, 250, 0.35)',
                  }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    {claimLoading ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        >
                          <Sparkles className="h-5 w-5" />
                        </motion.span>
                        Enviando&hellip;
                      </>
                    ) : (
                      <>
                        Recibir guía
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </span>
                </motion.button>
              </>
            ) : (
              /* ── Unauthenticated user: full form ── */
              <>
                <div className="mb-6 text-center">
                  <div
                    className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{
                      background:
                        'linear-gradient(135deg, #a78bfa 0%, #6ee7b7 100%)',
                      boxShadow: '0 10px 30px rgba(167, 139, 250, 0.3)',
                    }}
                  >
                    <BookOpen className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-[var(--font-headline)] text-xl font-bold text-black-deep">
                    Recibe tu guía gratuita
                  </h3>
                  <p className="mt-2 text-sm text-gray-carbon">
                    Ingresa tus datos y te la enviaremos al instante.
                  </p>
                </div>

                <form
                  onSubmit={newsletterForm.handleSubmit}
                  className="space-y-4"
                >
                  <div className="relative">
                    <label htmlFor="guide-name" className="sr-only">
                      Tu nombre
                    </label>
                    <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2">
                      <User className="h-5 w-5 text-gray-medium" />
                    </div>
                    <input
                      id="guide-name"
                      type="text"
                      placeholder="Tu nombre"
                      value={newsletterForm.name}
                      onChange={(e) => newsletterForm.setName(e.target.value)}
                      className="w-full rounded-xl border-2 border-gray-100 bg-white py-3.5 pl-12 pr-5 font-[var(--font-inter)] text-black-deep placeholder-gray-400 transition-colors duration-300 focus:border-lavender/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender/40"
                      required
                      autoComplete="name"
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="guide-email" className="sr-only">
                      Tu correo electrónico
                    </label>
                    <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2">
                      <Mail className="h-5 w-5 text-gray-medium" />
                    </div>
                    <input
                      id="guide-email"
                      type="email"
                      placeholder="Tu mejor correo"
                      value={newsletterForm.email}
                      onChange={(e) => newsletterForm.setEmail(e.target.value)}
                      className="w-full rounded-xl border-2 border-gray-100 bg-white py-3.5 pl-12 pr-5 font-[var(--font-inter)] text-black-deep placeholder-gray-400 transition-colors duration-300 focus:border-lavender/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender/40"
                      required
                      autoComplete="email"
                      spellCheck={false}
                    />
                  </div>

                  {newsletterForm.error && (
                    <p className="text-center text-sm font-medium text-red-500">
                      {newsletterForm.error}
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={newsletterForm.isSubmitting}
                    className="btn-shimmer w-full rounded-full py-4 font-[var(--font-headline)] text-base font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
                    style={{
                      background:
                        'linear-gradient(135deg, #a78bfa 0%, #6ee7b7 100%)',
                      boxShadow: '0 10px 30px rgba(167, 139, 250, 0.35)',
                    }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <AnimatePresence mode="wait">
                      {newsletterForm.isSubmitting ? (
                        <motion.span
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                          >
                            <Sparkles className="h-5 w-5" />
                          </motion.span>
                          Enviando&hellip;
                        </motion.span>
                      ) : (
                        <motion.span
                          key="default"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          Quiero mi guía
                          <ArrowRight className="h-5 w-5" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Main section                                                       */
/* ------------------------------------------------------------------ */

interface FreeResourcesSectionProps {
  guideProduct?: Product;
  whatsappGroupProduct?: Product;
}

export default function FreeResourcesSection({
  guideProduct,
  whatsappGroupProduct,
}: FreeResourcesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const { user, compras, loading: authLoading } = useCheckoutAuth();

  const guideAlreadyOwned = guideProduct?.id
    ? compras.some(
        (c) => c.producto === guideProduct.id && c.estado === 'activa',
      )
    : false;

  const {
    name,
    setName,
    email,
    setEmail,
    isSubmitting,
    isSuccess,
    error,
    handleSubmit,
  } = useNewsletterForm('recursos_gratuitos');

  const whatsappLink =
    whatsappGroupProduct?.whatsappLink ||
    whatsappGroupProduct?.ctaLink ||
    'https://chat.whatsapp.com/HYmBiEU0UXl2VsMMlWatAE';

  return (
    <>
      <section
        id="newsletter"
        ref={ref}
        className="relative overflow-hidden py-20"
        style={{
          background:
            'linear-gradient(135deg, #fef7f0 0%, #fce7f3 50%, #fef7f0 100%)',
        }}
      >
        {/* Background decorative blobs */}
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="blob absolute -right-40 top-20 h-[500px] w-[500px] opacity-20"
            style={{
              background:
                'linear-gradient(135deg, rgba(255, 107, 107, 0.3) 0%, rgba(252, 211, 77, 0.2) 100%)',
            }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="blob absolute -left-32 bottom-0 h-[400px] w-[400px] opacity-15"
            style={{
              background:
                'linear-gradient(135deg, rgba(167, 139, 250, 0.3) 0%, rgba(110, 231, 183, 0.2) 100%)',
            }}
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <div className="container-custom relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-2 shadow-md backdrop-blur-sm"
            >
              <Sparkles className="h-5 w-5 text-coral" />
              <span className="font-[var(--font-inter)] text-sm font-semibold text-gray-dark">
                Recursos gratuitos
              </span>
            </motion.div>

            <h2 className="text-section-title font-[var(--font-headline)] font-bold text-black-deep">
              Más{' '}
              <span className="gradient-text-playful">recursos para ti</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-carbon">
              Una selección de recursos gratuitos pensados para acompañarte en
              tu proceso.
            </p>
          </motion.div>

          {/* Cards grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 — Newsletter semanal */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                type: 'spring',
                stiffness: 100,
              }}
              className="group relative flex flex-col overflow-hidden rounded-[28px] bg-white p-8 shadow-[0_10px_50px_rgba(0,0,0,0.08)]"
            >
              <motion.div
                className="mb-6 flex h-20 w-20 items-center justify-center rounded-[20px] shadow-lg"
                style={{
                  background: 'var(--gradient-coral-pink)',
                  boxShadow: '0 10px 30px rgba(255, 107, 107, 0.3)',
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Mail className="h-10 w-10 text-white" />
              </motion.div>

              <h3 className="mb-1 font-[var(--font-headline)] text-2xl font-bold text-black-deep">
                Newsletter semanal
              </h3>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 flex flex-1 flex-col items-center justify-center py-6 text-center"
                >
                  <div
                    className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{
                      background:
                        'linear-gradient(135deg, #6ee7b7 0%, #34d399 100%)',
                      boxShadow: '0 12px 32px rgba(52, 211, 153, 0.4)',
                    }}
                  >
                    <Check className="h-7 w-7 text-white" />
                  </div>
                  <p className="font-[var(--font-headline)] text-lg font-bold text-black-deep">
                    ¡Listo, {name}!
                  </p>
                  <p className="mt-1 text-sm text-gray-medium">
                    Revisa tu inbox. Te enviamos la guía y contenido exclusivo.
                  </p>
                </motion.div>
              ) : (
                <>
                  <p className="mb-2 text-sm text-gray-carbon">
                    Recibe cada semana contenido práctico, oportunidades y
                    recursos para avanzar con más claridad.
                  </p>
                  <p className="mb-6 text-sm font-semibold text-coral">
                    Incluye GRATIS la guía &ldquo;Fórmula para un Título
                    Optimizado&rdquo;.
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    className="mt-auto space-y-3"
                  >
                    <div className="relative">
                      <label htmlFor="free-res-name" className="sr-only">
                        Tu nombre
                      </label>
                      <div className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2">
                        <User className="h-4 w-4 text-gray-medium" />
                      </div>
                      <input
                        id="free-res-name"
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl border-2 border-gray-100 bg-white py-3 pl-10 pr-4 text-sm text-black-deep placeholder-gray-400 transition-colors focus:border-coral/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40"
                        required
                        autoComplete="name"
                      />
                    </div>

                    <div className="relative">
                      <label htmlFor="free-res-email" className="sr-only">
                        Tu correo electrónico
                      </label>
                      <div className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2">
                        <Mail className="h-4 w-4 text-gray-medium" />
                      </div>
                      <input
                        id="free-res-email"
                        type="email"
                        placeholder="Tu mejor correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border-2 border-gray-100 bg-white py-3 pl-10 pr-4 text-sm text-black-deep placeholder-gray-400 transition-colors focus:border-coral/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40"
                        required
                        autoComplete="email"
                        spellCheck={false}
                      />
                    </div>

                    <label className="flex cursor-pointer items-start gap-2 pt-1">
                      <input
                        type="checkbox"
                        checked={accepted}
                        onChange={(e) => setAccepted(e.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 accent-coral"
                      />
                      <span className="text-xs leading-snug text-gray-carbon">
                        Acepto recibir correos y puedo cancelar cuando quiera.
                      </span>
                    </label>

                    {error && (
                      <p className="text-center text-xs font-medium text-red-500">
                        {error}
                      </p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isSubmitting || !accepted}
                      className="btn-shimmer w-full rounded-full py-3.5 font-[var(--font-headline)] text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
                      style={{
                        background: 'var(--gradient-coral-pink)',
                        boxShadow: '0 10px 30px rgba(255, 107, 107, 0.3)',
                      }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: 'linear',
                              }}
                            >
                              <Sparkles className="h-4 w-4" />
                            </motion.span>
                            Enviando&hellip;
                          </>
                        ) : (
                          <>
                            Unirme gratis
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </span>
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>

            {/* Card 2 — Guía gratuita */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.15,
                type: 'spring',
                stiffness: 100,
              }}
              className="group relative flex flex-col overflow-hidden rounded-[28px] bg-white p-8 shadow-[0_10px_50px_rgba(0,0,0,0.08)]"
            >
              <motion.div
                className="mb-6 flex h-20 w-20 items-center justify-center rounded-[20px] shadow-lg"
                style={{
                  background:
                    'linear-gradient(135deg, #a78bfa 0%, #6ee7b7 100%)',
                  boxShadow: '0 10px 30px rgba(167, 139, 250, 0.3)',
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <BookOpen className="h-10 w-10 text-white" />
              </motion.div>

              <h3 className="mb-1 font-[var(--font-headline)] text-2xl font-bold text-black-deep">
                {guideProduct?.name || 'Guía gratuita'}
              </h3>
              <p
                className="mb-4 font-[var(--font-headline)] text-lg font-semibold"
                style={{ color: '#a78bfa' }}
              >
                {guideProduct?.subtitle ||
                  'Las habilidades que te harán brillar en el trabajo remoto'}
              </p>
              <p className="mb-8 flex-1 text-sm text-gray-carbon">
                {guideProduct?.description || (
                  <>
                    Descubre las <strong>habilidades blandas</strong> que te
                    ayudarán a{' '}
                    <strong>
                      destacar, comunicarte mejor y crecer en el mundo remoto
                    </strong>
                    .
                  </>
                )}
              </p>

              {/* CTA: different states based on auth */}
              {!authLoading && guideAlreadyOwned ? (
                <Link
                  href="/mi-cuenta"
                  className="mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-lavender/10 py-4 font-[var(--font-headline)] text-sm font-bold text-lavender transition-colors hover:bg-lavender/20"
                >
                  <CircleCheck className="h-5 w-5" />
                  Ya tienes esta guía
                </Link>
              ) : (
                <motion.button
                  onClick={() => setGuideModalOpen(true)}
                  disabled={authLoading}
                  className="btn-shimmer mt-auto flex w-full items-center justify-center gap-2 rounded-full py-4 font-[var(--font-headline)] text-sm font-bold uppercase tracking-wide text-white disabled:opacity-70"
                  style={{
                    background:
                      'linear-gradient(135deg, #a78bfa 0%, #6ee7b7 100%)',
                    boxShadow: '0 10px 30px rgba(167, 139, 250, 0.3)',
                  }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>
                    {guideProduct?.ctaText || 'Quiero mi guía'}
                  </span>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </motion.button>
              )}
            </motion.div>

            {/* Card 3 — Grupo WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.3,
                type: 'spring',
                stiffness: 100,
              }}
              className="group relative flex flex-col overflow-hidden rounded-[28px] bg-white p-8 shadow-[0_10px_50px_rgba(0,0,0,0.08)]"
            >
              <motion.div
                className="mb-6 flex h-20 w-20 items-center justify-center rounded-[20px] shadow-lg"
                style={{
                  background:
                    'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  boxShadow: '0 10px 30px rgba(37, 211, 102, 0.3)',
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <MessageCircle className="h-10 w-10 text-white" />
              </motion.div>

              <h3 className="mb-1 font-[var(--font-headline)] text-2xl font-bold text-black-deep">
                {whatsappGroupProduct?.name || 'Grupo WhatsApp'}
              </h3>
              <p
                className="mb-4 font-[var(--font-headline)] text-lg font-semibold"
                style={{ color: '#25D366' }}
              >
                {whatsappGroupProduct?.subtitle || 'Vive en Modo Remoto'}
              </p>
              <p className="mb-8 flex-1 text-sm text-gray-carbon">
                {whatsappGroupProduct?.description ||
                  'Un espacio para mantenerte al día con recursos gratuitos, avisos de masterclass y oportunidades relacionadas al trabajo remoto.'}
              </p>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer mt-auto flex w-full items-center justify-center gap-2 rounded-full py-4 font-[var(--font-headline)] text-sm font-bold uppercase tracking-wide text-white"
                style={{
                  background:
                    'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  boxShadow: '0 10px 30px rgba(37, 211, 102, 0.3)',
                }}
              >
                <span>
                  {whatsappGroupProduct?.ctaText || 'Unirme al grupo'}
                </span>
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <GuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
        downloadUrl={guideProduct?.downloadUrl}
        authUser={user ? { name: user.name, email: user.email } : null}
        productId={guideProduct?.id}
      />
    </>
  );
}
