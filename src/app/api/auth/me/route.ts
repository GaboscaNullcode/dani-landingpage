import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-service';
import { getUserCompras } from '@/lib/compras-service';
import { getAllProducts, getPaymentPlans, getProductTypesMap } from '@/lib/tienda-service';
import { getProductIdsWithContent } from '@/lib/programa-contenido-service';

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const [compras, allProducts, productTypes, productIdsWithContent] =
    await Promise.all([
      getUserCompras(user.id),
      getAllProducts(),
      getProductTypesMap(),
      getProductIdsWithContent(),
    ]);

  // Only send fields the Dashboard/ProductCard components need
  const comprasLite = compras.map(
    ({ id, estado, stripeSubscriptionId, productoDetail, producto }) => ({
      id,
      estado,
      stripeSubscriptionId,
      productoDetail,
      producto,
    }),
  );

  // Resolve booking session ID and parent product ID for Programa Intensivo
  let bookingSessionId: string | null = null;
  let parentProductId: string | null = null;
  let pago2Product: { id: string; stripePriceId: string; price: number } | null = null;

  if (user.programIntensivePaidFull) {
    // Full payment: find the active compra for the parent asesoria product
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
  } else if (user.programIntensivePaid2) {
    // Paid pago 2: find the active compra for the pago 2 child product
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

  if (user.programIntensivePaid1 && !user.programIntensivePaid2 && !user.programIntensivePaidFull) {
    // Find the pago1 compra to get the parent product ID
    const pago1Compra = compras.find(
      (c) => c.estado === 'activa' && c.productoDetail?.producto_padre,
    );
    if (pago1Compra?.productoDetail?.producto_padre) {
      parentProductId = pago1Compra.productoDetail.producto_padre;
      const plans = await getPaymentPlans(pago1Compra.productoDetail.producto_padre);
      // Pago 2 is the second plan (orden=2)
      const pago2 = plans.length >= 2 ? plans[1] : null;
      if (pago2) {
        pago2Product = { id: pago2.id, stripePriceId: pago2.stripePriceId, price: pago2.price };
      }
    }
  }

  return NextResponse.json({ user, compras: comprasLite, allProducts, productTypes, pago2Product, bookingSessionId, parentProductId, productIdsWithContent: [...productIdsWithContent] });
}
