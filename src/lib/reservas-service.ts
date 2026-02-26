import { cache } from 'react';
import { getServiceSupabase } from './supabase/server';
import { getFreeBusySlots } from './google-calendar';
import type {
  ReservaRecord,
  Reserva,
  TimeSlot,
  BusyPeriod,
  DisponibilidadResponse,
  ConfigCalendario,
} from '@/types/reservas';

// ── Transform ──

function mapReserva(r: ReservaRecord): Reserva {
  return {
    id: r.id,
    usuario: r.usuario,
    compraId: r.compra_id,
    planId: r.plan_id,
    fechaHora: r.fecha_hora,
    duracionMinutos: r.duracion_minutos,
    timezone: r.timezone,
    estado: r.estado,
    zoomMeetingId: r.zoom_meeting_id,
    zoomJoinUrl: r.zoom_join_url,
    zoomStartUrl: r.zoom_start_url,
    googleEventId: r.google_event_id,
    notasCliente: r.notas_cliente,
    cancelacionMotivo: r.cancelacion_motivo,
    createdAt: r.created_at,
  };
}

// ── Config (env-based, no Supabase) ──

const BOOKING_HOURS_START = process.env.BOOKING_HOURS_START || '07:00';
const BOOKING_HOURS_END = process.env.BOOKING_HOURS_END || '22:00';

const calendarConfig: ConfigCalendario = {
  timezone: process.env.BOOKING_TIMEZONE || 'America/Lima',
  diasAnticipacionMin: 1,
  diasAnticipacionMax: 30,
  duracionBufferMinutos: parseInt(
    process.env.BOOKING_BUFFER_MINUTES || '15',
    10,
  ),
};

export function getCalendarConfig(): ConfigCalendario {
  return calendarConfig;
}

// ── Slots (Google Calendar FreeBusy as primary source) ──

export async function getAvailableSlots(
  fecha: string,
  duracionMinutos: number,
): Promise<DisponibilidadResponse> {
  const config = getCalendarConfig();

  // 1. Fetch Google Calendar FreeBusy (primary source of availability)
  const dayStart = `${fecha}T00:00:00`;
  const dayEnd = `${fecha}T23:59:59`;

  let gcalBusy: BusyPeriod[] = [];
  try {
    gcalBusy = await getFreeBusySlots(dayStart, dayEnd);
  } catch {
    // FreeBusy unavailable — all slots will show as available
  }

  // 2. Get existing reservations as safety net (in case GCal hasn't synced yet)
  const supabase = getServiceSupabase();
  const { data: reservasExistentes } = await supabase
    .from('reservas')
    .select('fecha_hora, duracion_minutos')
    .gte('fecha_hora', dayStart)
    .lte('fecha_hora', dayEnd)
    .in('estado', ['pendiente', 'confirmada']);

  const reservas = (reservasExistentes ?? []) as Array<{
    fecha_hora: string;
    duracion_minutos: number;
  }>;

  // 3. Generate slots within booking hours, filtered by busy periods
  const totalSlotMinutos = duracionMinutos + config.duracionBufferMinutos;
  const slots: TimeSlot[] = [];

  const [startH, startM] = BOOKING_HOURS_START.split(':').map(Number);
  const [endH, endM] = BOOKING_HOURS_END.split(':').map(Number);
  const windowStartMin = startH * 60 + startM;
  const windowEndMin = endH * 60 + endM;

  for (
    let slotStart = windowStartMin;
    slotStart + totalSlotMinutos <= windowEndMin;
    slotStart += 30
  ) {
    const slotHour = Math.floor(slotStart / 60);
    const slotMin = slotStart % 60;
    const hora = `${String(slotHour).padStart(2, '0')}:${String(slotMin).padStart(2, '0')}`;

    const slotDateTime = new Date(`${fecha}T${hora}:00`);
    const slotEndTime = new Date(
      slotDateTime.getTime() + totalSlotMinutos * 60000,
    );

    // Check Google Calendar busy periods (primary)
    const isGcalBusy = gcalBusy.some((b) => {
      const bStart = new Date(b.start);
      const bEnd = new Date(b.end);
      return slotDateTime < bEnd && slotEndTime > bStart;
    });

    // Check existing reservations (safety net)
    const isBooked = reservas.some((r) => {
      const rStart = new Date(r.fecha_hora);
      const rEnd = new Date(
        rStart.getTime() +
          (r.duracion_minutos + config.duracionBufferMinutos) * 60000,
      );
      return slotDateTime < rEnd && slotEndTime > rStart;
    });

    slots.push({
      hora,
      disponible: !isGcalBusy && !isBooked,
    });
  }

  return { fecha, timezone: config.timezone, slots };
}

// ── CRUD Reservas ──

export async function createReserva(data: {
  usuario: string;
  compraId: string;
  planId: string;
  fechaHora: string;
  duracionMinutos: number;
  timezone: string;
  notasCliente?: string;
}): Promise<Reserva> {
  const supabase = getServiceSupabase();
  const { data: record, error } = await supabase
    .from('reservas')
    .insert({
      usuario: data.usuario,
      compra_id: data.compraId,
      plan_id: data.planId,
      fecha_hora: data.fechaHora,
      duracion_minutos: data.duracionMinutos,
      timezone: data.timezone,
      notas_cliente: data.notasCliente || null,
      estado: 'pendiente',
    })
    .select()
    .single();

  if (error) throw error;
  return mapReserva(record as ReservaRecord);
}

export async function updateReserva(
  reservaId: string,
  updates: Partial<ReservaRecord>,
): Promise<Reserva> {
  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from('reservas')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', reservaId)
    .select()
    .single();

  if (error) throw error;
  return mapReserva(data as ReservaRecord);
}

export async function getReservaById(
  reservaId: string,
): Promise<Reserva | null> {
  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from('reservas')
    .select('*')
    .eq('id', reservaId)
    .single();

  if (error) return null;
  return data ? mapReserva(data as ReservaRecord) : null;
}

export async function getReservaByCompra(
  compraId: string,
): Promise<Reserva | null> {
  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from('reservas')
    .select('*')
    .eq('compra_id', compraId)
    .in('estado', ['pendiente', 'confirmada'])
    .maybeSingle();

  if (error) return null;
  return data ? mapReserva(data as ReservaRecord) : null;
}

export const getUserReservas = cache(
  async (userId: string): Promise<Reserva[]> => {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('reservas')
      .select('*')
      .eq('usuario', userId)
      .order('fecha_hora', { ascending: false });

    if (error) return [];
    return (data ?? []).map((r: ReservaRecord) => mapReserva(r));
  },
);

export async function getReservasPendientesRecordatorio(): Promise<
  ReservaRecord[]
> {
  const supabase = getServiceSupabase();
  const now = new Date().toISOString();
  const in72h = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from('reservas')
    .select('*')
    .eq('estado', 'confirmada')
    .gte('fecha_hora', now)
    .lte('fecha_hora', in72h);

  if (error) return [];
  return (data ?? []) as ReservaRecord[];
}

export async function isSlotAvailable(
  fecha: string,
  hora: string,
  duracionMinutos: number,
): Promise<boolean> {
  const response = await getAvailableSlots(fecha, duracionMinutos);
  const slot = response.slots.find((s) => s.hora === hora);
  return slot?.disponible ?? false;
}
