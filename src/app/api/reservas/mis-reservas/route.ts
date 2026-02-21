import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { getUserReservas } from '@/lib/reservas-service';
import { getAsesoriaPlanes } from '@/lib/tienda-service';

export async function GET() {
  try {
    const supabase = await createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const [reservas, planes] = await Promise.all([
      getUserReservas(user.id),
      getAsesoriaPlanes(),
    ]);

    const planNames: Record<string, string> = {};
    for (const plan of planes) {
      planNames[plan.id] = plan.name;
    }

    return NextResponse.json({ reservas, planNames });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json(
      { error: 'Error al obtener reservas' },
      { status: 500 },
    );
  }
}
