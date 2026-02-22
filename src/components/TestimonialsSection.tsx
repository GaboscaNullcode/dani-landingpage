import { Sparkles } from 'lucide-react';
import { getTestimoniosMasterclass } from '@/lib/masterclass-service';
import TestimonialCarousel from '@/components/ui/TestimonialCarousel';

interface TestimonialsSectionProps {
  id?: string;
  badge?: string;
  title?: React.ReactNode;
  subtitle?: string;
}

export default async function TestimonialsSection({
  id = 'testimonios',
  badge = 'Historias reales',
  title = (
    <>
      Ellas ya <span className="gradient-text-playful">confiaron</span> en mí
    </>
  ),
  subtitle = 'Conoce las experiencias de quienes ya dieron el salto al trabajo remoto',
}: TestimonialsSectionProps) {
  const testimonials = await getTestimoniosMasterclass();

  if (testimonials.length === 0) return null;

  return (
    <section
      id={id}
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
            <Sparkles className="h-5 w-5 text-pink" />
            <span className="font-[var(--font-inter)] text-sm font-semibold text-pink">
              {badge}
            </span>
          </div>

          <h2 className="text-section-title font-[var(--font-headline)] font-bold text-black-deep">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-carbon">
              {subtitle}
            </p>
          )}
        </div>

        {/* Carousel */}
        <TestimonialCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}
