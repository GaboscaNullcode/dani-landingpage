import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-service';
import { getUserCompras } from '@/lib/compras-service';
import { getAllProducts, getPaymentPlans } from '@/lib/tienda-service';

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const [compras, allProducts] = await Promise.all([
    getUserCompras(user.id),
    getAllProducts(),
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

  // If user paid Pago 1 but not Pago 2 or full, include Pago 2 product info
  let pago2Product: { id: string; stripePriceId: string; price: number } | null = null;
  if (user.programIntensivePaid1 && !user.programIntensivePaid2 && !user.programIntensivePaidFull) {
    // Find the pago1 compra to get the parent product ID
    const pago1Compra = compras.find(
      (c) => c.estado === 'activa' && c.productoDetail?.producto_padre,
    );
    if (pago1Compra?.productoDetail?.producto_padre) {
      const plans = await getPaymentPlans(pago1Compra.productoDetail.producto_padre);
      // Pago 2 is the second plan (orden=2)
      const pago2 = plans.length >= 2 ? plans[1] : null;
      if (pago2) {
        pago2Product = { id: pago2.id, stripePriceId: pago2.stripePriceId, price: pago2.price };
      }
    }
  }

  return NextResponse.json({ user, compras: comprasLite, allProducts, pago2Product });
}
