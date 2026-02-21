import { redirect } from 'next/navigation';
import { getStripe } from '@/lib/stripe';
import { getCalendarConfig } from '@/lib/reservas-service';
import { getAsesoriaPlanById } from '@/lib/tienda-service';
import BookingCalendar from '@/components/asesorias/BookingCalendar';

interface AgendarPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function AgendarPage({ searchParams }: AgendarPageProps) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect('/asesorias');
  }

  // Validate Stripe session
  let planId: string;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== 'paid') {
      redirect('/asesorias');
    }

    planId = session.metadata?.planId || '';

    if (!planId) {
      redirect('/asesorias');
    }
  } catch {
    redirect('/asesorias');
  }

  const plan = await getAsesoriaPlanById(planId);
  if (!plan) {
    redirect('/asesorias');
  }

  const config = await getCalendarConfig();

  return (
    <main className="min-h-screen bg-cream">
      <div className="container-custom py-12 md:py-20">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-coral/10 px-4 py-2 text-sm font-semibold text-coral">
            Paso 2 de 2
          </span>
          <h1 className="mb-3 font-[var(--font-headline)] text-3xl font-bold text-gray-dark md:text-4xl">
            Agenda tu sesion
          </h1>
          <p className="mx-auto max-w-md text-gray-medium">
            Selecciona la fecha y hora que mejor te convenga para tu sesion.
          </p>
        </div>

        {/* Calendar */}
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] md:p-10">
          <BookingCalendar
            planId={planId}
            planName={plan.name}
            stripeSessionId={session_id}
            duracionMinutos={plan.duracionMinutos}
            timezone={config.timezone}
          />
        </div>
      </div>
    </main>
  );
}
