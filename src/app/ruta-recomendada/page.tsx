import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  StageHero,
  WhatsAppCommunityCard,
  StageTransitionCTA,
} from '@/components/stages';
import { RutaProductSection } from '@/components/stages/stage2';

export const metadata: Metadata = {
  title: 'Ruta Paso a Paso Remota - Stage 2 | Remote con Dani',
  description:
    'Empieza tu camino remoto con una ruta paso a paso. Un sistema completo con 3 etapas para pasar de cero a tu primer trabajo remoto.',
  keywords: [
    'ruta trabajo remoto',
    'curso trabajo remoto',
    'guia paso a paso trabajo remoto',
    'programa trabajo remoto',
  ],
  openGraph: {
    title: 'Ruta Paso a Paso Remota - Stage 2 | Remote con Dani',
    description:
      'Un sistema completo con 3 etapas para pasar de cero a tu primer trabajo remoto.',
    type: 'website',
    locale: 'es_ES',
  },
};

export default function RutaRecomendadaPage() {
  return (
    <>
      <Navigation darkHero />
      <main id="main-content">
        <StageHero
          title="Empieza tu camino remoto con una ruta paso a paso"
          subtitle="Un sistema paso a paso disenado para que avances con claridad, sin perderte en el camino."
        />
        <RutaProductSection />
        <WhatsAppCommunityCard />
        <StageTransitionCTA
          text="¿Necesitas acompanamiento mas personalizado?"
          primaryText="Ver servicios personalizados"
          primaryHref="/servicios"
        />
      </main>
      <Footer />
    </>
  );
}
