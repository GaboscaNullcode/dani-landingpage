import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  StageHero,
  WhatsAppCommunityCard,
  StageTransitionCTA,
} from '@/components/stages';
import {
  QuickNavSection,
  MasterclassSection,
  BlogHighlightsSection,
} from '@/components/stages/stage1';
import NewsletterFormCard from '@/components/NewsletterFormCard';

export const metadata: Metadata = {
  title: 'Recursos Gratuitos - Stage 1 | Remote con Dani',
  description:
    'Descubre si el trabajo remoto es para ti. Masterclass gratuita, blog, comunidad y newsletter para dar tu primer paso hacia la libertad laboral.',
  keywords: [
    'recursos gratuitos trabajo remoto',
    'masterclass trabajo remoto gratis',
    'empezar trabajo remoto',
    'blog trabajo remoto',
    'comunidad trabajo remoto',
  ],
  openGraph: {
    title: 'Recursos Gratuitos - Stage 1 | Remote con Dani',
    description:
      'Descubre si el trabajo remoto es para ti con recursos gratuitos: masterclass, blog, comunidad y newsletter.',
    type: 'website',
    locale: 'es_ES',
  },
};

export default function RecursosGratuitosPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <StageHero
          variant="light"
          title="Descubre si el trabajo remoto es para ti"
          subtitle="Si estás empezando y tienes dudas, aquí encontrarás recursos claros y gratuitos para entender si este camino es para ti y avanzar con más tranquilidad."
        />
        <QuickNavSection />
        <MasterclassSection />
        <BlogHighlightsSection />
        <WhatsAppCommunityCard />
        <section className="bg-cream/50 py-16 md:py-20">
          <div className="container-custom">
            <div className="mx-auto max-w-md">
              <NewsletterFormCard />
            </div>
          </div>
        </section>
        <StageTransitionCTA
          text="¿Ya sientes que esto sí es para ti, pero te abruma la información?"
          description="Descubre el paso a paso para avanzar con claridad."
          primaryText="Quiero empezar con claridad"
          primaryHref="/ruta-recomendada"
        />
      </main>
      <Footer />
    </>
  );
}
