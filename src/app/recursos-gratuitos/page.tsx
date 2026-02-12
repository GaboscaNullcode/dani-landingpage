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
  NewsletterStageSection,
} from '@/components/stages/stage1';

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
          title="Descubre si el trabajo remoto es para ti"
          subtitle="Explora recursos gratuitos que te ayudan a entender qué es el trabajo remoto, si es para ti, y cómo empezar sin invertir un centavo."
        />
        <QuickNavSection />
        <MasterclassSection />
        <BlogHighlightsSection />
        <WhatsAppCommunityCard />
        <NewsletterStageSection />
        <StageTransitionCTA
          text="¿Ya sientes que esto si es para ti?"
          primaryText="Ver la Ruta Paso a Paso"
          primaryHref="/ruta-recomendada"
        />
      </main>
      <Footer />
    </>
  );
}
