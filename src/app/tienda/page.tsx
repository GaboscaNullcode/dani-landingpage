import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  TiendaHero,
  SeccionProductos,
  SeccionNiveles,
} from '@/components/tienda';
import {
  getFeaturedProducts,
  getProductsByLevel,
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
    const user = await getCurrentUser();
    if (!user) return { isLoggedIn: false, purchasedProductIds: [] };

    const purchasedIds = await getUserPurchasedProductIds(user.id);
    return { isLoggedIn: true, purchasedProductIds: Array.from(purchasedIds) };
  } catch {
    return { isLoggedIn: false, purchasedProductIds: [] };
  }
}

export default async function TiendaPage() {
  const [featuredProducts, productsByLevel, purchaseData] = await Promise.all([
    getFeaturedProducts(),
    getProductsByLevel(),
    getUserPurchaseData(),
  ]);

  return (
    <>
      <Navigation />
      <main id="main-content">
        <TiendaHero />
        <SeccionProductos
          featuredProducts={featuredProducts}
          purchasedProductIds={purchaseData.purchasedProductIds}
          isLoggedIn={purchaseData.isLoggedIn}
        />
        <SeccionNiveles
          levels={productsByLevel}
          purchasedProductIds={purchaseData.purchasedProductIds}
          isLoggedIn={purchaseData.isLoggedIn}
        />
      </main>
      <Footer />
    </>
  );
}
