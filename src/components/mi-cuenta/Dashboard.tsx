'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, ShoppingBag, Loader2 } from 'lucide-react';
import type { User, Compra } from '@/types/auth';
import ProductCard from './ProductCard';

interface MeResponse {
  user: User;
  compras: Compra[];
}

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.status === 401) {
          router.push('/mi-cuenta/login');
          return;
        }
        if (!res.ok) {
          setError('Error al cargar tus datos');
          return;
        }
        const json = await res.json();
        setData(json);
      } catch {
        setError('Error de conexion');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
    } catch {
      setLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="mb-2 h-8 w-48 animate-pulse rounded-lg bg-gray-light" />
            <div className="h-5 w-32 animate-pulse rounded-lg bg-gray-light" />
          </div>
          <div className="h-10 w-32 animate-pulse rounded-xl bg-gray-light" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-2xl bg-gray-light"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="mb-4 text-lg text-gray-carbon">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-xl bg-coral px-6 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-[var(--font-headline)] text-3xl font-bold text-black-deep">
            Hola, {data.user.name}
          </h1>
          <p className="mt-1 text-gray-medium">{data.user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="inline-flex items-center gap-2 self-start rounded-xl border-2 border-gray-light px-5 py-2.5 font-semibold text-gray-carbon transition-all duration-200 hover:border-coral hover:text-coral disabled:opacity-60"
        >
          {loggingOut ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4" />
          )}
          Cerrar Sesion
        </button>
      </div>

      {data.compras.length === 0 ? (
        <div className="rounded-2xl bg-white py-16 text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
          <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-gray-light" />
          <h2 className="mb-2 font-[var(--font-headline)] text-xl font-bold text-gray-dark">
            Aun no tienes productos
          </h2>
          <p className="mb-6 text-gray-medium">
            Explora nuestra tienda y encuentra recursos para tu crecimiento.
          </p>
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral to-pink px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            <ShoppingBag className="h-4 w-4" />
            Ir a la Tienda
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.compras.map((compra) => (
            <ProductCard key={compra.id} compra={compra} />
          ))}
        </div>
      )}
    </div>
  );
}
