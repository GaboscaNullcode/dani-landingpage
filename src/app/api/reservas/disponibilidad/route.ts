import { NextRequest, NextResponse } from 'next/server';
import { getAvailableSlots } from '@/lib/reservas-service';
import { getAsesoriaPlanById } from '@/lib/tienda-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const fecha = searchParams.get('fecha');
    const planId = searchParams.get('planId');

    if (!fecha || !planId) {
      return NextResponse.json(
        { error: 'Se requiere fecha y planId' },
        { status: 400 },
      );
    }

    // Validate date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
      return NextResponse.json(
        { error: 'Formato de fecha invalido (YYYY-MM-DD)' },
        { status: 400 },
      );
    }

    const plan = await getAsesoriaPlanById(planId);
    if (!plan) {
      return NextResponse.json(
        { error: 'Plan no valido' },
        { status: 400 },
      );
    }

    const disponibilidad = await getAvailableSlots(fecha, plan.duracionMinutos);

    return NextResponse.json(disponibilidad);
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { error: 'Error al obtener disponibilidad' },
      { status: 500 },
    );
  }
}
