import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Play, Lock, Mail, User, PartyPopper } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gracias por tu compra | Programa Intensivo | Remote con Dani',
  description:
    'Tu acceso al Programa Intensivo ya está activo. Crea tu cuenta para comenzar.',
};

export default function GraciasCompletoPage() {
  return (
    <>
      <Navigation />
      <main
        id="main-content"
        className="relative min-h-[80vh] overflow-hidden"
        style={{
          paddingTop: 'var(--hero-padding-top)',
          paddingBottom: 'var(--section-padding)',
          background:
            'linear-gradient(135deg, #fef7f0 0%, #ffecd2 50%, #fce7f3 100%)',
        }}
      >
        {/* Decorative blobs */}
        <div
          className="blob absolute -right-32 -top-32 h-[500px] w-[500px] opacity-25"
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 107, 107, 0.4) 0%, rgba(224, 86, 160, 0.3) 100%)',
          }}
        />
        <div
          className="blob absolute -left-32 bottom-0 h-[400px] w-[400px] opacity-20"
          style={{
            background:
              'linear-gradient(135deg, rgba(167, 139, 250, 0.4) 0%, rgba(110, 231, 183, 0.3) 100%)',
          }}
        />
        <div
          className="blob absolute right-[10%] bottom-[10%] h-[200px] w-[200px] opacity-15"
          style={{
            background:
              'linear-gradient(135deg, rgba(252, 211, 77, 0.5) 0%, rgba(255, 107, 107, 0.3) 100%)',
          }}
        />

        <div className="container-custom relative z-10 flex items-center justify-center">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-coral to-pink shadow-lg">
              <PartyPopper className="h-10 w-10 text-white" />
            </div>

            <h1 className="mb-4 font-[var(--font-headline)] text-3xl font-bold text-black-deep md:text-4xl">
              ¡Gracias por tu compra!
            </h1>

            <p className="mb-6 text-lg text-gray-carbon">
              Tu acceso al Programa Intensivo ya está activo.
            </p>

            <div className="mb-8 rounded-2xl border border-lavender/20 bg-white/80 p-6 text-left shadow-soft backdrop-blur-sm">
              <p className="mb-4 text-gray-carbon">
                Desde ahora puedes entrar a tu perfil y empezar a ver los{' '}
                <span className="font-semibold text-black-deep">
                  10 videos teóricos
                </span>
                , descargar tus materiales y avanzar a tu ritmo.
              </p>

              <div className="flex items-start gap-3 rounded-xl bg-cream/50 p-4">
                <Play className="mt-0.5 h-5 w-5 shrink-0 text-coral" />
                <p className="text-sm text-gray-dark">
                  Te recomiendo comenzar por el{' '}
                  <span className="font-semibold">video introductorio</span>{' '}
                  antes de avanzar con el resto del contenido.
                </p>
              </div>
            </div>

            <div className="mb-8 rounded-2xl border border-coral/10 bg-white/70 p-6 backdrop-blur-sm">
              <div className="mb-3 flex items-center justify-center gap-2">
                <Lock className="h-5 w-5 text-coral" />
                <p className="font-semibold text-black-deep">Próximo paso</p>
              </div>
              <p className="mb-5 text-gray-carbon">
                Crea tu cuenta o inicia sesión para acceder a tu programa.
              </p>

              <Link
                href="/mi-cuenta/login"
                className="btn-shimmer inline-flex items-center gap-2 rounded-full px-8 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                style={{ background: 'var(--gradient-coral-pink)' }}
              >
                <User className="h-4 w-4" />
                Crear mi cuenta / Ingresar
              </Link>
            </div>

            <div className="inline-flex items-start gap-2 rounded-full bg-white/80 px-5 py-3 text-sm text-gray-medium shadow-sm backdrop-blur-sm">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
              <p>
                También recibirás un correo con el enlace para ingresar. Si no
                lo ves en tu bandeja principal, revisa spam o promociones.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
