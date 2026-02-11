import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-service';
import { getUserCompras } from '@/lib/compras-service';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('pb_auth')?.value;

  if (!token) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const user = await getCurrentUser(token);

  if (!user) {
    return NextResponse.json({ error: 'Token invalido' }, { status: 401 });
  }

  const compras = await getUserCompras(user.id);

  // Only send fields the Dashboard/ProductCard components need
  const comprasLite = compras.map(({ id, estado, stripeSubscriptionId, expand }) => ({
    id,
    estado,
    stripeSubscriptionId,
    expand,
  }));

  return NextResponse.json({ user, compras: comprasLite });
}
