import Link from 'next/link';
import {
  CheckCircle,
  Calendar,
  Video,
  Bell,
  Play,
} from 'lucide-react';

export default function ReservaConfirmadaPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream">
      <div className="container-custom py-20 text-center">
        <div className="mx-auto max-w-md">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>

          <h1 className="mb-3 font-[var(--font-headline)] text-3xl font-bold text-gray-dark">
            Tu sesión está confirmada
          </h1>

          <p className="mb-6 text-lg text-gray-medium">
            Tu asesoría ya está agendada.
          </p>

          {/* Email reminder */}
          <div className="mx-auto mb-8 max-w-sm rounded-2xl border border-gray-light/50 bg-white p-5 text-left">
            <p className="mb-3 text-sm font-medium text-gray-dark">
              En unos minutos recibirás un correo con:
            </p>
            <ul className="space-y-2 text-sm text-gray-medium">
              <li className="flex items-center gap-2">
                <Calendar className="h-4 w-4 shrink-0 text-coral" />
                Fecha y hora
              </li>
              <li className="flex items-center gap-2">
                <Video className="h-4 w-4 shrink-0 text-coral" />
                Tu enlace personal de Zoom
              </li>
              <li className="flex items-center gap-2">
                <Bell className="h-4 w-4 shrink-0 text-coral" />
                Recordatorio automático
              </li>
            </ul>
          </div>

          {/* Masterclass recommendation */}
          <div className="mx-auto mb-8 max-w-sm rounded-2xl bg-lavender/30 p-6">
            <p className="mb-4 text-sm leading-relaxed text-gray-dark">
              Mientras tanto, te recomiendo ver la masterclass gratuita para que
              llegues con más claridad y podamos aprovechar al máximo nuestro
              tiempo juntas.
            </p>
            <Link
              href="/tienda/masterclass-gratuita"
              className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 font-bold"
            >
              <Play className="h-4 w-4" />
              Ver Masterclass
            </Link>
          </div>

          <p className="text-lg font-medium text-gray-dark">
            Nos vemos pronto
          </p>
        </div>
      </div>
    </main>
  );
}
