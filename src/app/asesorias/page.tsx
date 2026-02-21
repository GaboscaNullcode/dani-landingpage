import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { AsesoriaHero, PlanesSection, ContenidoSection } from '@/components/asesorias';
import { getAsesoriaPlanes, getPaymentPlans } from '@/lib/tienda-service';

export const metadata: Metadata = {
  title: 'Asesorías 1:1 - Deja de dar vueltas | Remote con Dani',
  description:
    'Una sesión conmigo puede ahorrarte meses de prueba y error. Claridad, un plan concreto y la confianza para dar el siguiente paso.',
  keywords: [
    'asesoría trabajo remoto',
    'coaching trabajo remoto',
    'mentoría asistente virtual',
    'consultoría freelance',
    'coach carrera remota',
  ],
  openGraph: {
    title: 'Asesorías 1:1 - Deja de dar vueltas | Remote con Dani',
    description:
      'Una sesión conmigo puede ahorrarte meses de prueba y error. Saldrás con un plan claro.',
    type: 'website',
    locale: 'es_ES',
  },
};

export default async function AsesoriasPage() {
  const [planes, paymentPlans] = await Promise.all([
    getAsesoriaPlanes(),
    getPaymentPlans('crea-camino'),
  ]);

  return (
    <>
      <Navigation />
      <main id="main-content">
        <AsesoriaHero />
        <PlanesSection planes={planes} paymentPlans={paymentPlans} />
        <ContenidoSection />
      </main>
      <Footer />
    </>
  );
}
