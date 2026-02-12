import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-service';
import { getUserCompras } from '@/lib/compras-service';
import { getAllProducts } from '@/lib/tienda-service';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('pb_auth')?.value;

  if (!token) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const user = await getCurrentUser(token);

  if (!user) {
    return NextResponse.json({ error: 'Token invalido' }, { status: 401 });
  }

  const [compras, allProducts] = await Promise.all([
    getUserCompras(user.id),
    getAllProducts(),
  ]);

  // Only send fields the Dashboard/ProductCard components need
  const comprasLite = compras.map(({ id, estado, stripeSubscriptionId, expand, producto }) => ({
    id,
    estado,
    stripeSubscriptionId,
    expand,
    producto,
  }));

  return NextResponse.json({ user, compras: comprasLite, allProducts });
}
