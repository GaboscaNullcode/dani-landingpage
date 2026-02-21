import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function ReservaConfirmadaPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream">
      <div className="container-custom py-20 text-center">
        <div className="mx-auto max-w-md">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>

          <h1 className="mb-3 font-[var(--font-headline)] text-3xl font-bold text-gray-dark">
            Reserva confirmada
          </h1>

          <p className="mb-8 text-gray-medium">
            Tu sesion ha sido agendada exitosamente. Revisa tu email para
            encontrar los detalles y el enlace de Zoom.
          </p>

          <Link
            href="/mi-cuenta"
            className="btn-primary inline-flex items-center gap-2 rounded-xl px-8 py-4 font-bold"
          >
            Ir a Mi Cuenta
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
