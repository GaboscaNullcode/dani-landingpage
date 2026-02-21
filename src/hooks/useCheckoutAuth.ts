import { useState, useEffect } from 'react';
import type { User } from '@/types/auth';

interface CompraLite {
  id: string;
  estado: string;
  producto: string;
  stripeSubscriptionId?: string;
}

interface CheckoutAuthState {
  user: User | null;
  compras: CompraLite[];
  loading: boolean;
}

export function useCheckoutAuth() {
  const [state, setState] = useState<CheckoutAuthState>({
    user: null,
    compras: [],
    loading: true,
  });

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setState({
            user: data.user,
            compras: data.compras || [],
            loading: false,
          });
        } else {
          setState({ user: null, compras: [], loading: false });
        }
      })
      .catch(() => setState({ user: null, compras: [], loading: false }));
  }, []);

  return state;
}
