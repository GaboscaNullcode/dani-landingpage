import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { getCurrentUser } from '@/lib/auth-service';
import { getUserCompras } from '@/lib/compras-service';
import { getPaymentPlans } from '@/lib/tienda-service';
import { getProgramaContenido } from '@/lib/programa-contenido-service';
import ProgramaIntensivoContent from '@/components/mi-cuenta/programa-intensivo/ProgramaIntensivoContent';

const PROGRAMA_INTENSIVO_PRODUCT_ID = 'crea-camino';

export const metadata: Metadata = {
  title: 'Programa Intensivo | Remote con Dani',
  description:
    'Accede a los videos, materiales y recursos del Programa Intensivo.',
};

export default async function ProgramaIntensivoPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/mi-cuenta/login');
  }

  const {
    programIntensivePaidFull: paidFull,
    programIntensivePaid1: paid1,
    programIntensivePaid2: paid2,
  } = user;

  if (!paidFull && !paid1 && !paid2) {
    redirect('/mi-cuenta');
  }

  const [compras, contenido] = await Promise.all([
    getUserCompras(user.id),
    getProgramaContenido(PROGRAMA_INTENSIVO_PRODUCT_ID),
  ]);

  // Resolve booking session ID
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
    const pago2Compra = compras.find(
      (c) =>
        c.estado === 'activa' &&
        c.productoDetail?.producto_padre &&
        c.productoDetail?.orden === 2,
    );
    if (pago2Compra) {
      bookingSessionId = pago2Compra.stripeSessionId;
      parentProductId = pago2Compra.productoDetail!.producto_padre;
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

  return (
    <div className="mx-auto max-w-4xl px-4">
      <ProgramaIntensivoContent
        introVideo={contenido.introVideo}
        videos={contenido.videos}
        downloads={contenido.downloads}
        paidFull={paidFull}
        paid1={paid1}
        paid2={paid2}
        bookingSessionId={bookingSessionId}
        pago2Product={pago2Product}
        parentProductId={parentProductId}
      />
    </div>
  );
}
