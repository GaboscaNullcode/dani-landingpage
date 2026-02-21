import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { getUserReservas } from '@/lib/reservas-service';

export async function GET() {
  try {
    const supabase = await createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const reservas = await getUserReservas(user.id);

    return NextResponse.json({ reservas });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json(
      { error: 'Error al obtener reservas' },
      { status: 500 },
    );
  }
}
