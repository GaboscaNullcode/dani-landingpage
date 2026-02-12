'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  LogOut,
  ShoppingBag,
  Loader2,
  Lock,
  Sparkles,
  Package,
  KeyRound,
} from 'lucide-react';
import type { User, Compra } from '@/types/auth';
import type { Product } from '@/types/tienda';
import ProductCard from './ProductCard';
import ChangePasswordModal from './ChangePasswordModal';

interface MeResponse {
  user: User;
  compras: Compra[];
  allProducts: Product[];
}

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

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
      <div className="relative">
        <div className="space-y-8">
          <div className="rounded-3xl bg-white/60 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="mb-3 h-6 w-28 animate-pulse rounded-full bg-coral/10" />
                <div className="mb-2 h-9 w-56 animate-pulse rounded-xl bg-gradient-to-r from-gray-light to-gray-light/50" />
                <div className="h-5 w-36 animate-pulse rounded-lg bg-gray-light/60" />
              </div>
              <div className="h-11 w-36 animate-pulse rounded-xl bg-gray-light/60" />
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-72 animate-pulse rounded-2xl bg-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-20 text-center"
      >
        <p className="mb-4 text-lg text-gray-carbon">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-xl bg-gradient-to-r from-coral to-pink px-6 py-3 font-bold text-white transition-transform hover:-translate-y-0.5 hover:shadow-lg"
        >
          Reintentar
        </button>
      </motion.div>
    );
  }

  if (!data) return null;

  const purchasedProductIds = new Set(
    data.compras
      .filter((c) => c.estado === 'activa')
      .map((c) => c.producto),
  );
  const lockedProducts = (data.allProducts || []).filter(
    (p) => !purchasedProductIds.has(p.id) && !p.isFree,
  );

  return (
    <div className="relative space-y-10">
      {/* Header hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="rounded-3xl bg-white/70 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-sm"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-3 inline-flex items-center gap-2 rounded-full bg-coral/10 px-4 py-1.5"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="h-4 w-4 text-coral" />
              </motion.div>
              <span className="text-xs font-semibold text-coral">
                Tu espacio personal
              </span>
            </motion.div>

            <h1 className="font-[var(--font-headline)] text-3xl font-bold text-black-deep">
              Hola,{' '}
              <span className="gradient-text-playful">{data.user.name}</span>
            </h1>
            <p className="mt-1 text-gray-medium">{data.user.email}</p>
          </div>

          <div className="flex items-center gap-2 self-start">
            <button
              onClick={() => setShowChangePassword(true)}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-light px-5 py-2.5 font-semibold text-gray-carbon transition-colors duration-200 hover:border-coral hover:text-coral"
            >
              <KeyRound className="h-4 w-4" />
              <span className="hidden sm:inline">Cambiar Contrasena</span>
            </button>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-light px-5 py-2.5 font-semibold text-gray-carbon transition-colors duration-200 hover:border-coral hover:text-coral disabled:opacity-60"
            >
              {loggingOut ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="h-4 w-4" />
              )}
              Cerrar Sesion
            </button>
          </div>
        </div>
      </motion.div>

      {/* Purchased products */}
      {data.compras.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral/10">
              <Package className="h-4 w-4 text-coral" />
            </div>
            <h2 className="font-[var(--font-headline)] text-xl font-bold text-black-deep">
              Mis Productos
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.compras.map((compra, index) => (
              <ProductCard
                key={compra.id}
                compra={compra}
                variant="purchased"
                index={index}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Locked products */}
      {lockedProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lavender/10">
              <Lock className="h-4 w-4 text-lavender" />
            </div>
            <h2 className="font-[var(--font-headline)] text-xl font-bold text-black-deep">
              Otros Productos
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lockedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="locked"
                index={index}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Empty state */}
      {data.compras.length === 0 &&
        (!data.allProducts || data.allProducts.length === 0) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative overflow-hidden rounded-3xl bg-white/70 py-16 text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-gray-light" />
            </motion.div>
            <h2 className="mb-2 font-[var(--font-headline)] text-xl font-bold text-gray-dark">
              Aun no tienes productos
            </h2>
            <p className="mb-6 text-gray-medium">
              Explora nuestra tienda y encuentra recursos para tu crecimiento.
            </p>
            <Link
              href="/tienda"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral to-pink px-6 py-3 font-bold text-white shadow-lg transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <ShoppingBag className="h-4 w-4" />
              Ir a la Tienda
            </Link>
          </motion.div>
        )}
      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </div>
  );
}
