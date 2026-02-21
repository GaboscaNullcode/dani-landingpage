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
    'Acompañamiento personalizado para tu camino remoto. Consultoría, asesoría y programa intensivo con Dani.',
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
      'Consultoría, asesoría y programa intensivo para tu transición al trabajo remoto.',
    type: 'website',
    locale: 'es_ES',
  },
};

export default function ServiciosPage() {
  return (
    <>
      <Navigation darkHero />
      <main id="main-content">
        <StageHero
          title="Acompañamiento personalizado para tu camino remoto"
          subtitle="Tienes la decisión tomada y quieres postular con estrategia profesional. Aquí encuentras opciones de acompañamiento directo con Dani, adaptadas a tu caso."
        />
        <ServicesCardsSection />
        <TrustSection />
        <MasterclassNote />
      </main>
      <Footer />
    </>
  );
}
