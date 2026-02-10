import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { CheckCircle, ShoppingBag, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Compra Exitosa | Remote con Dani',
  description: 'Tu compra ha sido procesada exitosamente.',
};

export default function ExitoPage() {
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

          <p className="mb-8 text-lg text-gray-carbon">
            Gracias por tu compra. Recibirás un correo electrónico con los
            detalles y el acceso a tu producto.
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
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral to-pink px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <ShoppingBag className="h-4 w-4" />
              Ir al Inicio
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
