import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { AsesoriaHero, PlanesSection, ContenidoSection } from '@/components/asesorias';

export const metadata: Metadata = {
  title: 'Asesorías Personalizadas - Remote con Dani',
  description:
    'Asesorías 1:1 para ayudarte a dar el salto al trabajo remoto. Planes desde $66 USD con seguimiento personalizado.',
  keywords: [
    'asesoría trabajo remoto',
    'coaching trabajo remoto',
    'mentoría asistente virtual',
    'consultoría freelance',
    'coach carrera remota',
  ],
  openGraph: {
    title: 'Asesorías Personalizadas - Remote con Dani',
    description:
      'Acompañamiento individual para construir tu carrera remota con claridad y estrategia.',
    type: 'website',
    locale: 'es_ES',
  },
};

export default function AsesoriasPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <AsesoriaHero />
        <PlanesSection />
        <ContenidoSection />
      </main>
      <Footer />
    </>
  );
}
