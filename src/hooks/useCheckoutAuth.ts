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

// Module-level cache to deduplicate concurrent /api/auth/me calls.
// Multiple components using this hook will share the same fetch promise.
// The cache auto-expires after CACHE_TTL_MS to prevent serving stale data.
let cachedPromise: Promise<CheckoutAuthState> | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 30_000; // 30 seconds

/** Clear the cached auth state so the next hook render re-fetches. */
export function invalidateAuthCache(): void {
  cachedPromise = null;
  cacheTimestamp = 0;
}

function fetchAuthMe(): Promise<CheckoutAuthState> {
  // Invalidate stale cache
  if (cachedPromise && Date.now() - cacheTimestamp > CACHE_TTL_MS) {
    cachedPromise = null;
  }

  if (cachedPromise) return cachedPromise;

  cacheTimestamp = Date.now();
  cachedPromise = fetch('/api/auth/me')
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      if (data?.user) {
        return {
          user: data.user,
          compras: data.compras || [],
          loading: false,
        };
      }
      return { user: null, compras: [], loading: false };
    })
    .catch(() => ({ user: null, compras: [], loading: false } as CheckoutAuthState));

  return cachedPromise;
}

export function useCheckoutAuth() {
  const [state, setState] = useState<CheckoutAuthState>({
    user: null,
    compras: [],
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;

    fetchAuthMe().then((result) => {
      if (!cancelled) setState(result);
    });

    return () => { cancelled = true; };
  }, []);

  return state;
}
