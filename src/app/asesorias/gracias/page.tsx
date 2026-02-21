import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { CheckCircle, Mail, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gracias por tu compra | Remote con Dani',
  description:
    'Tu pago se realizó con éxito. Recibirás un correo con el enlace para agendar tu sesión.',
};

export default function GraciasAsesoriaPage() {
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
              <CheckCircle className="h-10 w-10 text-white" />
            </div>

            <h1 className="mb-4 font-[var(--font-headline)] text-3xl font-bold text-black-deep md:text-4xl">
              ¡Gracias por tu compra!
            </h1>

            <p className="mb-2 text-lg text-gray-carbon">
              Estoy muy feliz de tenerte aquí. 🙌
            </p>

            <p className="mb-8 text-lg text-gray-carbon">
              Tu pago se realizó con éxito.
            </p>

            <div className="mb-8 rounded-2xl border border-lavender/20 bg-white/80 p-6 shadow-soft backdrop-blur-sm">
              <div className="flex items-start gap-3 text-left">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-coral" />
                <p className="text-gray-carbon">
                  En los próximos minutos recibirás un correo con el enlace para
                  agendar tu sesión en el calendario.
                </p>
              </div>
            </div>

            <div className="mb-8 rounded-2xl border border-coral/10 bg-white/70 p-6 backdrop-blur-sm">
              <div className="mb-3 flex items-center justify-center gap-2">
                <AlertCircle className="h-5 w-5 text-coral" />
                <p className="font-semibold text-black-deep">Importante</p>
              </div>
              <p className="mb-4 text-gray-carbon">
                Revisa tu bandeja de entrada. Si no lo ves, revisa{' '}
                <span className="font-semibold">spam</span> o{' '}
                <span className="font-semibold">promociones</span>.
              </p>
              <p className="text-sm text-gray-medium">
                Si no te llega, escríbeme a{' '}
                <a
                  href="mailto:info@remotecondani.com"
                  className="font-semibold text-coral hover:text-pink"
                >
                  info@remotecondani.com
                </a>{' '}
                y te ayudo.
              </p>
            </div>

            <p className="text-lg text-gray-carbon">
              Estoy emocionada por acompañarte en este paso hacia tu crecimiento
              profesional. 🚀
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
