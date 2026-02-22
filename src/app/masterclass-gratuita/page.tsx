import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  MasterclassHero,
  MasterclassResources,
  MasterclassTestimonials,
} from '@/components/masterclass';
import VideoPlayer from '@/components/mi-cuenta/programa-intensivo/VideoPlayer';
import MasterclassCTA from '@/components/masterclass/MasterclassCTA';
import { getMasterclassContent } from '@/lib/masterclass-service';

export const metadata: Metadata = {
  title: 'Masterclass Gratuita: Vive en Modo Remoto | Remote con Dani',
  description:
    'Masterclass gratuita de 2 horas donde aprendes como iniciar en el trabajo remoto desde cero. Contenido practico, paso a paso, para LATAM y el mundo.',
  keywords: [
    'masterclass trabajo remoto gratis',
    'trabajo remoto desde cero',
    'empezar trabajo remoto',
    'curso gratis trabajo remoto',
    'vive en modo remoto',
  ],
  openGraph: {
    title: 'Masterclass Gratuita: Vive en Modo Remoto | Remote con Dani',
    description:
      'Masterclass gratuita de 2 horas donde aprendes como iniciar en el trabajo remoto desde cero.',
    type: 'website',
    locale: 'es_ES',
  },
};

export default async function MasterclassGratuitaPage() {
  const content = await getMasterclassContent();

  return (
    <>
      <Navigation />
      <main id="main-content">
        {/* Hero */}
        <MasterclassHero />

        {/* Video Player - Main element */}
        <section
          className="relative overflow-hidden"
          style={{
            background:
              'linear-gradient(180deg, #fce7f3 0%, #fef7f0 30%, #fef7f0 100%)',
            padding: '0 0 var(--section-padding) 0',
          }}
        >
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              {content.video && (
                <div className="overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                  <VideoPlayer
                    embedUrl={content.video.embedUrl}
                    title={content.video.title}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Resources */}
        {content.resources.length > 0 && (
          <section
            className="relative overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, #fef7f0 0%, #ffecd2 50%, #fce7f3 100%)',
              padding: 'var(--section-padding) 0',
            }}
          >
            <div className="container-custom">
              <div className="mx-auto max-w-4xl">
                <MasterclassResources resources={content.resources} />
              </div>
            </div>
          </section>
        )}

        {/* Testimonials */}
        <MasterclassTestimonials />

        {/* CTA */}
        <MasterclassCTA />
      </main>
      <Footer />
    </>
  );
}
