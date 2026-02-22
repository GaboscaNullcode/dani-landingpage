import { getTestimoniosMasterclass } from '@/lib/masterclass-service';
import TestimonialGrid from './TestimonialGrid';

export default async function MasterclassTestimonials() {
  const testimonials = await getTestimoniosMasterclass();

  if (testimonials.length === 0) return null;

  return (
    <section
      className="relative overflow-hidden bg-white"
      style={{ padding: 'var(--section-padding) 0' }}
    >
      {/* Background decorative blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="blob absolute -left-32 top-1/4 h-[350px] w-[350px] opacity-15"
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 107, 107, 0.3) 0%, rgba(224, 86, 160, 0.2) 100%)',
          }}
        />
        <div
          className="blob absolute -right-20 bottom-20 h-[280px] w-[280px] opacity-20"
          style={{
            background:
              'linear-gradient(135deg, rgba(167, 139, 250, 0.3) 0%, rgba(110, 231, 183, 0.2) 100%)',
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Section header */}
        <div className="container-custom mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-pink/10 px-5 py-2">
            <span className="text-lg">💬</span>
            <span className="font-[var(--font-dm-sans)] text-sm font-semibold text-pink">
              Testimonios reales
            </span>
          </div>

          <h2 className="text-section-title font-[var(--font-headline)] font-bold text-black-deep">
            Lo que dicen quienes{' '}
            <span className="gradient-text-playful">ya la vieron.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-carbon">
            Historias de personas que dieron el primer paso con esta masterclass
          </p>
        </div>

        {/* Carousel */}
        <TestimonialGrid testimonials={testimonials} />
      </div>
    </section>
  );
}
