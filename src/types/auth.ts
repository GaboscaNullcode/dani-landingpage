import type { ProductoRecord } from './tienda';

export interface User {
  id: string;
  email: string;
  name: string;
  stripeCustomerId?: string;
  programIntensivePaidFull: boolean;
  programIntensivePaid1: boolean;
  programIntensivePaid2: boolean;
}

export interface Compra {
  id: string;
  usuario: string;
  producto: string;
  stripeSessionId: string;
  stripeSubscriptionId?: string;
  estado: 'activa' | 'cancelada' | 'reembolsada';
  created: string;
  // Supabase join: producto data is embedded directly (not via expand)
  productoDetail?: ProductoRecord | null;
}
