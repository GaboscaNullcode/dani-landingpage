import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { CheckCircle, AlertCircle, ShieldX } from 'lucide-react';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { getStripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Gracias por unirte a la Comunidad | Remote con Dani',
  description:
    'Tu suscripción se ha procesado con éxito. Únete al grupo de WhatsApp de la comunidad.',
};

const WHATSAPP_LINK = 'https://chat.whatsapp.com/HYmBiEU0UXl2VsMMlWatAE';

export default async function GraciasComunidadPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  let isValidSession = false;

  if (session_id) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(session_id);
      isValidSession =
        session.payment_status === 'paid' || session.status === 'complete';
    } catch {
      // Session invalid or not found
    }
  }

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
              'linear-gradient(135deg, rgba(34, 197, 94, 0.4) 0%, rgba(110, 231, 183, 0.3) 100%)',
          }}
        />
        <div
          className="blob absolute -left-32 bottom-0 h-[400px] w-[400px] opacity-20"
          style={{
            background:
              'linear-gradient(135deg, rgba(167, 139, 250, 0.4) 0%, rgba(110, 231, 183, 0.3) 100%)',
          }}
        />

        <div className="container-custom relative z-10 flex items-center justify-center">
          <div className="mx-auto max-w-2xl text-center">
            {isValidSession ? (
              <>
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>

                <h1 className="mb-4 font-[var(--font-headline)] text-3xl font-bold text-black-deep md:text-4xl">
                  ¡Gracias por unirte a la comunidad!
                </h1>

                <p className="mb-2 text-lg text-gray-carbon">
                  Tu suscripción se ha procesado con éxito.
                </p>

                <p className="mb-8 text-lg text-gray-carbon">
                  Ya eres parte de la Comunidad Remote con Dani.
                </p>

                <div className="mb-8 rounded-2xl border border-green-200 bg-white/80 p-6 shadow-soft backdrop-blur-sm">
                  <p className="mb-4 text-gray-carbon">
                    Haz clic en el botón para unirte al grupo de WhatsApp donde
                    compartimos ofertas laborales, sesiones en vivo y mucho más.
                  </p>

                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-green-500 px-8 py-4 font-[var(--font-headline)] font-bold text-white transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(34,197,94,0.3)]"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Unirme al grupo de WhatsApp
                  </a>
                </div>

                <div className="mb-8 rounded-2xl border border-coral/10 bg-white/70 p-6 backdrop-blur-sm">
                  <div className="mb-3 flex items-center justify-center gap-2">
                    <AlertCircle className="h-5 w-5 text-coral" />
                    <p className="font-semibold text-black-deep">Importante</p>
                  </div>
                  <p className="mb-4 text-gray-carbon">
                    También recibirás un correo de confirmación. Si no lo ves,
                    revisa <span className="font-semibold">spam</span> o{' '}
                    <span className="font-semibold">promociones</span>.
                  </p>
                  <p className="text-sm text-gray-medium">
                    Si tienes alguna duda, escríbeme a{' '}
                    <a
                      href="mailto:info@remotecondani.com"
                      className="font-semibold text-coral hover:text-pink"
                    >
                      info@remotecondani.com
                    </a>
                  </p>
                </div>

                <p className="text-lg text-gray-carbon">
                  ¡Bienvenida a la comunidad! Nos vemos adentro.
                </p>
              </>
            ) : (
              <>
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gray-light to-gray-medium shadow-lg">
                  <ShieldX className="h-10 w-10 text-white" />
                </div>

                <h1 className="mb-4 font-[var(--font-headline)] text-3xl font-bold text-black-deep md:text-4xl">
                  Acceso no disponible
                </h1>

                <p className="mb-8 text-lg text-gray-carbon">
                  Esta página solo está disponible después de completar el pago
                  de la suscripción a la comunidad.
                </p>

                <Link
                  href="/ruta-recomendada"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral to-pink px-8 py-4 font-[var(--font-headline)] font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Volver a la ruta recomendada
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
