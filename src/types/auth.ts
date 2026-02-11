import type { ProductoRecord } from './tienda';

export interface User {
  id: string;
  email: string;
  name: string;
  stripeCustomerId?: string;
}

export interface Compra {
  id: string;
  usuario: string;
  producto: string;
  stripeSessionId: string;
  stripeSubscriptionId?: string;
  estado: 'activa' | 'cancelada' | 'reembolsada';
  created: string;
  expand?: {
    producto?: ProductoRecord;
  };
}
