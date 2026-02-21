import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  StageHero,
  WhatsAppCommunityCard,
  StageTransitionCTA,
} from '@/components/stages';
import { RutaProductSection } from '@/components/stages/stage2';
import { getCommunityProducts } from '@/lib/tienda-service';

export const metadata: Metadata = {
  title: 'Ruta Remota: Paso a Paso - Stage 2 | Remote con Dani',
  description:
    'La ruta estructurada que te lleva desde la decisión hasta estar listo para postular. Un sistema con 3 etapas para tu primer trabajo remoto.',
  keywords: [
    'ruta trabajo remoto',
    'curso trabajo remoto',
    'guia paso a paso trabajo remoto',
    'programa trabajo remoto',
  ],
  openGraph: {
    title: 'Ruta Remota: Paso a Paso - Stage 2 | Remote con Dani',
    description:
      'La ruta estructurada que te lleva desde la decisión hasta estar listo para postular.',
    type: 'website',
    locale: 'es_ES',
  },
};

export default async function RutaRecomendadaPage() {
  const communityProducts = await getCommunityProducts();
  const community = communityProducts[0];

  return (
    <>
      <Navigation />
      <main id="main-content">
        <StageHero
          variant="light"
          title="Empieza tu camino remoto paso a paso"
          subtitle="Un sistema paso a paso disenado para que avances con claridad, sin perderte en el camino."
        />
        <RutaProductSection />
        <WhatsAppCommunityCard
          priceId={community?.stripePriceId}
          productId={community?.id}
          price={community?.price}
          originalPrice={community?.originalPrice}
        />
        <StageTransitionCTA
          text="¿Necesitas acompanamiento mas personalizado?"
          primaryText="Ver servicios personalizados"
          primaryHref="/asesorias"
        />
      </main>
      <Footer />
    </>
  );
}
