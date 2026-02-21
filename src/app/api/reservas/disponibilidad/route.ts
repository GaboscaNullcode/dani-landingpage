import { NextRequest, NextResponse } from 'next/server';
import { getAvailableSlots } from '@/lib/reservas-service';
import { PLAN_DURACIONES } from '@/types/reservas';

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

    const duracion = PLAN_DURACIONES[planId];
    if (!duracion) {
      return NextResponse.json(
        { error: 'Plan no valido' },
        { status: 400 },
      );
    }

    const disponibilidad = await getAvailableSlots(fecha, duracion);

    return NextResponse.json(disponibilidad);
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { error: 'Error al obtener disponibilidad' },
      { status: 500 },
    );
  }
}
