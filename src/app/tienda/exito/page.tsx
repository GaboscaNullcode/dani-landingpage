import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { CheckCircle, ArrowLeft, Mail, User } from 'lucide-react';
import { stripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Compra Exitosa | Remote con Dani',
  description: 'Tu compra ha sido procesada exitosamente.',
};

export default async function ExitoPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  let productName: string | null = null;
  let customerEmail: string | null = null;

  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items.data.price.product'],
      });

      customerEmail =
        session.customer_details?.email ?? session.customer_email ?? null;

      const firstItem = session.line_items?.data?.[0];
      if (firstItem?.price?.product && typeof firstItem.price.product === 'object') {
        productName = (firstItem.price.product as { name?: string }).name ?? null;
      }
    } catch {
      // Si la sesion no se puede recuperar, mostrar version generica
    }
  }

  return (
    <>
      <Navigation />
      <main
        id="main-content"
        className="flex min-h-[70vh] items-center justify-center bg-gradient-to-b from-white to-cream px-4 py-20"
      >
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-mint to-lavender shadow-lg">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>

          <h1 className="mb-4 font-[var(--font-headline)] text-3xl font-bold text-black-deep md:text-4xl">
            ¡Compra Exitosa!
          </h1>

          {productName && (
            <p className="mb-2 text-xl font-semibold text-gray-dark">
              {productName}
            </p>
          )}

          {customerEmail && (
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-gray-carbon shadow-sm">
              <Mail className="h-4 w-4 text-coral" />
              <span>{customerEmail}</span>
            </div>
          )}

          <p className="mb-4 text-lg text-gray-carbon">
            Gracias por tu compra. Hemos enviado un email a tu correo con las
            instrucciones de acceso.
          </p>

          <p className="mb-8 text-sm text-gray-medium">
            Revisa tu bandeja de entrada (y la carpeta de spam) para encontrar
            los detalles de tu producto.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/tienda"
              className="inline-flex items-center gap-2 rounded-full border-2 border-coral bg-white px-6 py-3 font-bold text-coral transition-all duration-200 hover:bg-coral hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a la Tienda
            </Link>

            <Link
              href="/mi-cuenta/login"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral to-pink px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <User className="h-4 w-4" />
              Ir a Mi Cuenta
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
