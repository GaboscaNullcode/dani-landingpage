import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-service';
import { getUserCompras } from '@/lib/compras-service';
import { getAllProducts } from '@/lib/tienda-service';

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

  return NextResponse.json({ user, compras: comprasLite, allProducts });
}
