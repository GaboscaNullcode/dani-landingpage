import { NextRequest, NextResponse } from 'next/server';
import {
  getReservasPendientesRecordatorio,
  updateReserva,
} from '@/lib/reservas-service';
import { sendBookingReminderEmail } from '@/lib/brevo';
import { getServiceSupabase } from '@/lib/supabase/server';
import { PLAN_NOMBRES } from '@/types/reservas';

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const reservas = await getReservasPendientesRecordatorio();
    const now = Date.now();
    let sent = 0;

    for (const reserva of reservas) {
      const horaReserva = new Date(reserva.fecha_hora).getTime();
      const horasHasta = (horaReserva - now) / (60 * 60 * 1000);

      // Get user email
      const supabase = getServiceSupabase();
      const { data: authUser } =
        await supabase.auth.admin.getUserById(reserva.usuario);
      if (!authUser?.user?.email) continue;

      const { data: profile } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', reserva.usuario)
        .single();

      const email = authUser.user.email;
      const name = profile?.name || email.split('@')[0];
      const planName = PLAN_NOMBRES[reserva.plan_id] || reserva.plan_id;
      const fechaFormatted = new Date(reserva.fecha_hora).toLocaleDateString(
        'es-PE',
        {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        },
      );
      const horaFormatted = new Date(reserva.fecha_hora).toLocaleTimeString(
        'es-PE',
        { hour: '2-digit', minute: '2-digit' },
      );

      // 3 days reminder
      if (horasHasta <= 72 && !reserva.recordatorio_3d_enviado) {
        await sendBookingReminderEmail(
          email,
          name,
          planName,
          fechaFormatted,
          horaFormatted,
          reserva.duracion_minutos,
          reserva.timezone,
          reserva.zoom_join_url || '',
          '3d',
        );
        await updateReserva(reserva.id, { recordatorio_3d_enviado: true });
        sent++;
      }

      // 24h reminder
      if (horasHasta <= 24 && !reserva.recordatorio_24h_enviado) {
        await sendBookingReminderEmail(
          email,
          name,
          planName,
          fechaFormatted,
          horaFormatted,
          reserva.duracion_minutos,
          reserva.timezone,
          reserva.zoom_join_url || '',
          '24h',
        );
        await updateReserva(reserva.id, { recordatorio_24h_enviado: true });
        sent++;
      }

      // 1h reminder
      if (horasHasta <= 1 && !reserva.recordatorio_1h_enviado) {
        await sendBookingReminderEmail(
          email,
          name,
          planName,
          fechaFormatted,
          horaFormatted,
          reserva.duracion_minutos,
          reserva.timezone,
          reserva.zoom_join_url || '',
          '1h',
        );
        await updateReserva(reserva.id, { recordatorio_1h_enviado: true });
        sent++;
      }
    }

    return NextResponse.json({
      ok: true,
      processed: reservas.length,
      remindersSent: sent,
    });
  } catch (error) {
    console.error('Error processing reminders:', error);
    return NextResponse.json(
      { error: 'Error processing reminders' },
      { status: 500 },
    );
  }
}
