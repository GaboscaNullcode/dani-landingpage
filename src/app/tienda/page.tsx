import { Metadata } from 'next';
import { cookies } from 'next/headers';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  TiendaHero,
  SeccionRecursosGratuitos,
  SeccionProductos,
  SeccionServicios,
} from '@/components/tienda';
import {
  getFeaturedProducts,
  getAdditionalProducts,
  getFreeResources,
  getCommunityProducts,
} from '@/lib/tienda-service';
import { getCurrentUser } from '@/lib/auth-service';
import { getUserPurchasedProductIds } from '@/lib/compras-service';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Recursos Probados para Trabajo Remoto | Remote con Dani',
  description:
    'Guías, cursos y herramientas que te dan claridad y te ahorran meses de prueba y error. +500 personas ya dieron el salto.',
  keywords: [
    'cursos trabajo remoto',
    'ebook asistente virtual',
    'masterclass freelance',
    'recursos trabajo desde casa',
    'guía carrera digital',
    'comunidad trabajo remoto',
  ],
  openGraph: {
    title: 'Tienda - Remote con Dani',
    description:
      'Cursos, eBooks y recursos para construir tu carrera remota con confianza.',
    type: 'website',
    locale: 'es_ES',
  },
};

async function getUserPurchaseData(): Promise<{
  isLoggedIn: boolean;
  purchasedProductIds: string[];
}> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('pb_auth')?.value;
    if (!token) return { isLoggedIn: false, purchasedProductIds: [] };

    const user = await getCurrentUser(token);
    if (!user) return { isLoggedIn: false, purchasedProductIds: [] };

    const purchasedIds = await getUserPurchasedProductIds(user.id);
    return { isLoggedIn: true, purchasedProductIds: Array.from(purchasedIds) };
  } catch {
    return { isLoggedIn: false, purchasedProductIds: [] };
  }
}

export default async function TiendaPage() {
  const [featuredProducts, additionalProducts, freeResources, communityProducts, purchaseData] =
    await Promise.all([
      getFeaturedProducts(),
      getAdditionalProducts(),
      getFreeResources(),
      getCommunityProducts(),
      getUserPurchaseData(),
    ]);

  return (
    <>
      <Navigation />
      <main id="main-content">
        <TiendaHero />
        <SeccionRecursosGratuitos
          freeResources={freeResources}
          purchasedProductIds={purchaseData.purchasedProductIds}
          isLoggedIn={purchaseData.isLoggedIn}
        />
        <SeccionProductos
          featuredProducts={featuredProducts}
          additionalProducts={additionalProducts}
          purchasedProductIds={purchaseData.purchasedProductIds}
          isLoggedIn={purchaseData.isLoggedIn}
        />
        <SeccionServicios
          communityProducts={communityProducts}
          purchasedProductIds={purchaseData.purchasedProductIds}
          isLoggedIn={purchaseData.isLoggedIn}
        />
      </main>
      <Footer />
    </>
  );
}
