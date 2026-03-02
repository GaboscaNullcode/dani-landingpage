import { redirect, notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCurrentUser } from '@/lib/auth-service';
import { getUserCompras } from '@/lib/compras-service';
import { getProductBySlug, getPaymentPlans } from '@/lib/tienda-service';
import {
  getProgramaContenido,
  getProductIdsWithContent,
} from '@/lib/programa-contenido-service';
import ProductContentPage from '@/components/mi-cuenta/contenido/ProductContentPage';
import type { CTAData } from '@/components/mi-cuenta/contenido/ProductContentPage';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: 'Contenido no encontrado | Remote con Dani' };
  }

  return {
    title: `${product.name} | Remote con Dani`,
    description: `Accede a los videos, materiales y recursos de ${product.name}.`,
  };
}

export default async function ContenidoPage({ params }: PageProps) {
  const { slug } = await params;

  // 1. Find the product by slug
  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  // 2. Validate the product has content
  const productIdsWithContent = await getProductIdsWithContent();
  if (!productIdsWithContent.has(product.id)) {
    notFound();
  }

  // 3. Redirect masterclass-gratuita to its own public page
  if (product.id === 'masterclass-gratuita') {
    redirect('/masterclass-gratuita');
  }

  // 4. Verify user access
  const user = await getCurrentUser();
  if (!user) {
    redirect('/mi-cuenta/login');
  }

  // Special handling for crea-camino (Programa Intensivo)
  const isCreaCamino = product.id === 'crea-camino';

  if (isCreaCamino) {
    const { programIntensivePaidFull, programIntensivePaid1, programIntensivePaid2 } = user;
    if (!programIntensivePaidFull && !programIntensivePaid1 && !programIntensivePaid2) {
      redirect('/mi-cuenta');
    }
  } else {
    // For regular products: verify active purchase
    const compras = await getUserCompras(user.id);
    const hasAccess = compras.some(
      (c) => c.estado === 'activa' && c.producto === product.id,
    );
    if (!hasAccess) {
      redirect('/mi-cuenta');
    }
  }

  // 5. Fetch content
  const contenido = await getProgramaContenido(product.id);

  // 6. Build CTA data (only for Programa Intensivo)
  let ctaData: CTAData | null = null;

  if (isCreaCamino) {
    const {
      programIntensivePaidFull: paidFull,
      programIntensivePaid1: paid1,
      programIntensivePaid2: paid2,
    } = user;

    const compras = await getUserCompras(user.id);

    let bookingSessionId: string | null = null;
    let parentProductId: string | null = null;
    let pago2Product: {
      id: string;
      stripePriceId: string;
      price: number;
    } | null = null;

    if (paidFull) {
      const fullCompra = compras.find(
        (c) =>
          c.estado === 'activa' &&
          c.productoDetail?.categoria === 'asesoria' &&
          !c.productoDetail?.producto_padre,
      );
      if (fullCompra) {
        bookingSessionId = fullCompra.stripeSessionId;
        parentProductId = fullCompra.producto;
      }
    } else if (paid2) {
      // Use getPaymentPlans to reliably identify pago 2 by position, not orden value
      const childCompra = compras.find(
        (c) =>
          c.estado === 'activa' &&
          c.productoDetail?.producto_padre,
      );
      if (childCompra?.productoDetail?.producto_padre) {
        parentProductId = childCompra.productoDetail.producto_padre;
        const plans = await getPaymentPlans(parentProductId);
        const pago2PlanId = plans.length >= 2 ? plans[1].id : null;
        if (pago2PlanId) {
          const pago2Compra = compras.find(
            (c) => c.estado === 'activa' && c.producto === pago2PlanId,
          );
          if (pago2Compra) {
            bookingSessionId = pago2Compra.stripeSessionId;
          }
        }
      }
    }

    if (paid1 && !paid2 && !paidFull) {
      const pago1Compra = compras.find(
        (c) => c.estado === 'activa' && c.productoDetail?.producto_padre,
      );
      if (pago1Compra?.productoDetail?.producto_padre) {
        parentProductId = pago1Compra.productoDetail.producto_padre;
        const plans = await getPaymentPlans(
          pago1Compra.productoDetail.producto_padre,
        );
        const p2 = plans.length >= 2 ? plans[1] : null;
        if (p2) {
          pago2Product = {
            id: p2.id,
            stripePriceId: p2.stripePriceId,
            price: p2.price,
          };
        }
      }
    }

    ctaData = {
      paidFull,
      paid1,
      paid2,
      bookingSessionId,
      pago2Product,
      parentProductId,
    };
  }

  return (
    <div className="mx-auto max-w-4xl px-4">
      <ProductContentPage
        productName={product.name}
        productDescription={product.description}
        introVideo={contenido.introVideo}
        videos={contenido.videos}
        downloads={contenido.downloads}
        ctaData={ctaData}
      />
    </div>
  );
}
