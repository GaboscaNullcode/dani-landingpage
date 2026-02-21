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
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #fef7f0 0%, #ffecd2 50%, #fce7f3 100%)',
      }}
    >
      {/* Decorative blobs */}
      <div
        className="blob absolute -right-32 -top-32 h-[500px] w-[500px] opacity-30"
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

      <div className="container-custom relative z-10 py-20 md:py-28 text-center">
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
