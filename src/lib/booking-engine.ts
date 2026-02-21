/**
 * Booking Engine — orchestrates reservation creation.
 *
 * Flow:
 * 1. Verify slot is available (double-check for race conditions)
 * 2. Verify compra doesn't already have an active reservation
 * 3. Insert reservation as 'pendiente'
 * 4. Create Zoom meeting
 * 5. Create Google Calendar event
 * 6. Update reservation to 'confirmada' with external IDs
 * 7. Send emails (non-blocking)
 * 8. On failure: rollback
 */

import {
  createReserva,
  updateReserva,
  getReservaByCompra,
  isSlotAvailable,
} from './reservas-service';
import { createZoomMeeting, deleteZoomMeeting } from './zoom';
import { createCalendarEvent, deleteCalendarEvent } from './google-calendar';
import {
  sendBookingConfirmationEmail,
  sendBookingNotificationToDani,
} from './brevo';
import type { Reserva } from '@/types/reservas';

interface BookingInput {
  userId: string;
  compraId: string;
  planId: string;
  planName: string;
  fecha: string; // YYYY-MM-DD
  hora: string; // HH:MM
  duracionMinutos: number;
  timezone: string;
  notasCliente?: string;
  clientEmail: string;
  clientName: string;
}

interface BookingResult {
  reserva: Reserva;
  zoomJoinUrl?: string;
}

export async function createBooking(
  input: BookingInput,
): Promise<BookingResult> {
  const {
    userId,
    compraId,
    planId,
    planName,
    fecha,
    hora,
    duracionMinutos,
    timezone,
    notasCliente,
    clientEmail,
    clientName,
  } = input;

  // 1. Verify slot is still available
  const available = await isSlotAvailable(fecha, hora, duracionMinutos);
  if (!available) {
    throw new Error('El horario seleccionado ya no esta disponible');
  }

  // 2. Verify compra doesn't have an active reservation
  const existingReserva = await getReservaByCompra(compraId);
  if (existingReserva) {
    throw new Error('Esta compra ya tiene una reserva activa');
  }

  // 3. Insert reservation as 'pendiente'
  const fechaHora = `${fecha}T${hora}:00`;
  const reserva = await createReserva({
    usuario: userId,
    compraId,
    planId,
    fechaHora,
    duracionMinutos,
    timezone,
    notasCliente,
  });

  let zoomMeetingId: string | undefined;
  let zoomJoinUrl: string | undefined;
  let zoomStartUrl: string | undefined;
  let googleEventId: string | undefined;

  const hasZoom = !!(process.env.ZOOM_CLIENT_ID && process.env.ZOOM_CLIENT_SECRET && process.env.ZOOM_ACCOUNT_ID);
  const hasGoogleCal = !!(process.env.GOOGLE_SERVICE_ACCOUNT_JSON && process.env.GOOGLE_CALENDAR_ID);

  try {
    // 4. Create Zoom meeting (optional)
    if (hasZoom) {
      const zoomResult = await createZoomMeeting({
        topic: `${planName} - ${clientName}`,
        startTime: fechaHora,
        durationMinutes: duracionMinutos,
        timezone,
      });
      zoomMeetingId = zoomResult.meetingId;
      zoomJoinUrl = zoomResult.joinUrl;
      zoomStartUrl = zoomResult.startUrl;
    } else {
      console.log('[booking] Zoom not configured, skipping meeting creation');
    }

    // 5. Create Google Calendar event (optional)
    if (hasGoogleCal) {
      const endTime = new Date(
        new Date(fechaHora).getTime() + duracionMinutos * 60000,
      ).toISOString();

      googleEventId = await createCalendarEvent({
        summary: `${planName} - ${clientName}`,
        description: `Plan: ${planName}\nCliente: ${clientName} (${clientEmail})\nNotas: ${notasCliente || 'Sin notas'}`,
        startDateTime: fechaHora,
        endDateTime: endTime,
        timezone,
        attendeeEmail: clientEmail,
        zoomJoinUrl: zoomJoinUrl,
      });
    } else {
      console.log('[booking] Google Calendar not configured, skipping event creation');
    }

    // 6. Update reservation to 'confirmada'
    const updatedReserva = await updateReserva(reserva.id, {
      estado: 'confirmada',
      zoom_meeting_id: zoomMeetingId,
      zoom_join_url: zoomJoinUrl,
      zoom_start_url: zoomStartUrl,
      google_event_id: googleEventId,
    });

    // 7. Send emails (non-blocking)
    const formattedDate = new Date(fechaHora).toLocaleDateString('es-PE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const formattedTime = hora;

    Promise.allSettled([
      sendBookingConfirmationEmail(
        clientEmail,
        clientName,
        planName,
        formattedDate,
        formattedTime,
        duracionMinutos,
        timezone,
        zoomJoinUrl,
      ),
      sendBookingNotificationToDani(
        clientName,
        clientEmail,
        planName,
        formattedDate,
        formattedTime,
        duracionMinutos,
        timezone,
        zoomStartUrl,
        notasCliente,
      ),
    ]).catch(() => {
      // Email failures are logged but don't fail the booking
      console.error('Error sending booking emails');
    });

    return { reserva: updatedReserva, zoomJoinUrl };
  } catch (error) {
    // 8. Rollback on failure
    console.error('Booking creation failed, rolling back:', error);

    // Clean up partial integrations
    if (zoomMeetingId) {
      await deleteZoomMeeting(zoomMeetingId).catch(() => {});
    }
    if (googleEventId) {
      await deleteCalendarEvent(googleEventId).catch(() => {});
    }

    // Cancel the reservation
    await updateReserva(reserva.id, {
      estado: 'cancelada',
      cancelacion_motivo: 'Error durante creacion - rollback automatico',
    }).catch(() => {});

    throw error;
  }
}
