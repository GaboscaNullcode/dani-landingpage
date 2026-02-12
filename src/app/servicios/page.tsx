import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { StageHero } from '@/components/stages';
import {
  ServicesCardsSection,
  TrustSection,
  MasterclassNote,
} from '@/components/stages/stage3';

export const metadata: Metadata = {
  title: 'Servicios Personalizados - Stage 3 | Remote con Dani',
  description:
    'Acompanamiento personalizado para tu camino remoto. Consultoria, asesoria y programa intensivo con Dani.',
  keywords: [
    'asesoria trabajo remoto',
    'consultoria trabajo remoto',
    'coaching carrera remota',
    'mentoria trabajo remoto',
    'programa intensivo trabajo remoto',
  ],
  openGraph: {
    title: 'Servicios Personalizados - Stage 3 | Remote con Dani',
    description:
      'Consultoria, asesoria y programa intensivo para tu transicion al trabajo remoto.',
    type: 'website',
    locale: 'es_ES',
  },
};

export default function ServiciosPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <StageHero
          title="Acompanamiento personalizado para tu camino remoto"
          subtitle="A veces necesitas a alguien que ya recorrio el camino para darte claridad, un plan y la confianza de dar el paso."
        />
        <ServicesCardsSection />
        <TrustSection />
        <MasterclassNote />
      </main>
      <Footer />
    </>
  );
}
