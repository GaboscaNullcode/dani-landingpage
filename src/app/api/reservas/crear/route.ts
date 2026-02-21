import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { getCompraById } from '@/lib/compras-service';
import { createBooking } from '@/lib/booking-engine';
import { getAsesoriaPlanById } from '@/lib/tienda-service';
import { getCalendarConfig } from '@/lib/reservas-service';

export async function POST(request: NextRequest) {
  try {
    // Verify auth
    const supabase = await createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const { compraId, planId, fecha, hora, notasCliente } =
      await request.json();

    if (!compraId || !planId || !fecha || !hora) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 },
      );
    }

    // Validate plan
    const plan = await getAsesoriaPlanById(planId);
    if (!plan) {
      return NextResponse.json({ error: 'Plan no valido' }, { status: 400 });
    }
    const duracion = plan.duracionMinutos;

    // Verify compra belongs to user
    const compra = await getCompraById(compraId);
    if (!compra || compra.usuario !== user.id) {
      return NextResponse.json(
        { error: 'Compra no encontrada' },
        { status: 404 },
      );
    }

    if (compra.estado !== 'activa') {
      return NextResponse.json(
        { error: 'Esta compra no esta activa' },
        { status: 400 },
      );
    }

    const config = await getCalendarConfig();

    // Fetch profile for name
    const { data: profile } = await supabase
      .from('profiles')
      .select('name')
      .eq('id', user.id)
      .single();

    const result = await createBooking({
      userId: user.id,
      compraId,
      planId,
      planName: plan.name,
      fecha,
      hora,
      duracionMinutos: duracion,
      timezone: config.timezone,
      notasCliente,
      clientEmail: user.email!,
      clientName: profile?.name || user.email!.split('@')[0],
    });

    return NextResponse.json({
      reserva: result.reserva,
      zoomJoinUrl: result.zoomJoinUrl,
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    const message =
      error instanceof Error ? error.message : 'Error al crear la reserva';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
