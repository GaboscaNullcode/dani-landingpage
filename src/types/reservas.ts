// ── DB Record (snake_case, matches Supabase schema) ──

export interface ReservaRecord {
  id: string;
  usuario: string;
  compra_id: string;
  plan_id: string;
  fecha_hora: string;
  duracion_minutos: number;
  timezone: string;
  estado: 'pendiente' | 'confirmada' | 'cancelada' | 'completada' | 'no_show';
  zoom_meeting_id: string | null;
  zoom_join_url: string | null;
  zoom_start_url: string | null;
  google_event_id: string | null;
  notas_cliente: string | null;
  recordatorio_3d_enviado: boolean;
  recordatorio_24h_enviado: boolean;
  recordatorio_1h_enviado: boolean;
  cancelacion_motivo: string | null;
  created_at: string;
  updated_at: string;
}

// ── Frontend model (camelCase) ──

export interface Reserva {
  id: string;
  usuario: string;
  compraId: string;
  planId: string;
  fechaHora: string;
  duracionMinutos: number;
  timezone: string;
  estado: ReservaRecord['estado'];
  zoomMeetingId: string | null;
  zoomJoinUrl: string | null;
  zoomStartUrl: string | null;
  googleEventId: string | null;
  notasCliente: string | null;
  cancelacionMotivo: string | null;
  createdAt: string;
}

// ── Calendar / Booking types ──

export interface TimeSlot {
  hora: string; // "09:00"
  disponible: boolean;
}

export interface DisponibilidadResponse {
  fecha: string;
  timezone: string;
  slots: TimeSlot[];
}

export interface ConfigCalendario {
  timezone: string;
  diasAnticipacionMin: number;
  diasAnticipacionMax: number;
  duracionBufferMinutos: number;
}

export interface DisponibilidadSemanalRecord {
  id: string;
  dia_semana: number;
  hora_inicio: string;
  hora_fin: string;
  activo: boolean;
}

export interface BloqueoCalendarioRecord {
  id: string;
  fecha_inicio: string;
  fecha_fin: string;
  motivo: string | null;
}

