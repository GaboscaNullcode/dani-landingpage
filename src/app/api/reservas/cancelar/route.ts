import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { getReservaById, updateReserva } from '@/lib/reservas-service';
import { deleteZoomMeeting } from '@/lib/zoom';
import { deleteCalendarEvent } from '@/lib/google-calendar';

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

    const { reservaId, motivo } = await request.json();

    if (!reservaId) {
      return NextResponse.json(
        { error: 'Se requiere reservaId' },
        { status: 400 },
      );
    }

    // Get reservation and verify ownership
    const reserva = await getReservaById(reservaId);
    if (!reserva || reserva.usuario !== user.id) {
      return NextResponse.json(
        { error: 'Reserva no encontrada' },
        { status: 404 },
      );
    }

    if (reserva.estado === 'cancelada') {
      return NextResponse.json(
        { error: 'La reserva ya esta cancelada' },
        { status: 400 },
      );
    }

    // Cancel external integrations (non-blocking)
    const cleanupPromises: Promise<void>[] = [];

    if (reserva.zoomMeetingId) {
      cleanupPromises.push(
        deleteZoomMeeting(reserva.zoomMeetingId).catch((err) =>
          console.error('Error deleting Zoom meeting:', err),
        ),
      );
    }

    if (reserva.googleEventId) {
      cleanupPromises.push(
        deleteCalendarEvent(reserva.googleEventId).catch((err) =>
          console.error('Error deleting Calendar event:', err),
        ),
      );
    }

    await Promise.allSettled(cleanupPromises);

    // Update reservation status
    const updated = await updateReserva(reservaId, {
      estado: 'cancelada',
      cancelacion_motivo: motivo || 'Cancelada por el usuario',
    });

    return NextResponse.json({ reserva: updated });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return NextResponse.json(
      { error: 'Error al cancelar la reserva' },
      { status: 500 },
    );
  }
}
