'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { LogIn, Loader2, Sparkles, UserPlus } from 'lucide-react';

type Mode = 'login' | 'signup';

export default function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || 'Error al crear la cuenta');
          return;
        }
      } else {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || 'Error al iniciar sesion');
          return;
        }
      }

      router.push('/mi-cuenta');
    } catch {
      setError('Error de conexion. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    setError('');
  };

  const isLogin = mode === 'login';

  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* Blobs decorativos */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="blob absolute -right-24 -top-24 h-[300px] w-[300px] opacity-25"
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 107, 107, 0.4) 0%, rgba(224, 86, 160, 0.3) 100%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="blob absolute -bottom-20 -left-24 h-[250px] w-[250px] opacity-20"
          style={{
            background:
              'linear-gradient(135deg, rgba(167, 139, 250, 0.4) 0%, rgba(110, 231, 183, 0.3) 100%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative rounded-3xl bg-white/80 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm"
      >
        <div className="mb-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-coral/10 px-4 py-1.5"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="h-4 w-4 text-coral" />
            </motion.div>
            <span className="text-xs font-semibold text-coral">
              {isLogin ? 'Bienvenido/a de vuelta' : 'Unete a la comunidad'}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-coral to-pink"
          >
            {isLogin ? (
              <LogIn className="h-6 w-6 text-white" />
            ) : (
              <UserPlus className="h-6 w-6 text-white" />
            )}
          </motion.div>

          {/* Tabs */}
          <div className="mb-4 flex rounded-xl bg-gray-light/40 p-1">
            <button
              type="button"
              onClick={() => switchMode('signup')}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                !isLogin
                  ? 'bg-white text-coral shadow-sm'
                  : 'text-gray-medium hover:text-gray-dark'
              }`}
            >
              Crear cuenta
            </button>
            <button
              type="button"
              onClick={() => switchMode('login')}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                isLogin
                  ? 'bg-white text-coral shadow-sm'
                  : 'text-gray-medium hover:text-gray-dark'
              }`}
            >
              Iniciar sesion
            </button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-2 text-sm text-gray-medium"
          >
            {isLogin
              ? 'Accede a tus productos y recursos'
              : 'Crea tu cuenta para acceder a todo'}
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-semibold text-gray-dark"
              >
                Nombre
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                className="w-full rounded-xl border-2 border-gray-light px-4 py-3 text-gray-dark transition-colors focus:border-coral focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40"
                autoComplete="name"
              />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-semibold text-gray-dark"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full rounded-xl border-2 border-gray-light px-4 py-3 text-gray-dark transition-colors focus:border-coral focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40"
              autoComplete="email"
              spellCheck={false}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-semibold text-gray-dark"
            >
              Contrasena
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={mode === 'signup' ? 6 : undefined}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={
                isLogin ? 'Tu contrasena' : 'Minimo 6 caracteres'
              }
              className="w-full rounded-xl border-2 border-gray-light px-4 py-3 text-gray-dark transition-colors focus:border-coral focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40"
              autoComplete={isLogin ? 'current-password' : 'new-password'}
            />
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-coral to-pink px-6 py-3 font-bold text-white shadow-lg transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {isLogin ? 'Ingresando…' : 'Creando cuenta…'}
                </span>
              ) : isLogin ? (
                'Iniciar Sesion'
              ) : (
                'Crear Cuenta'
              )}
            </button>
          </motion.div>
        </form>

        {isLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-6 text-center"
          >
            <Link
              href="/mi-cuenta/login"
              className="text-sm text-gray-medium transition-colors hover:text-coral"
            >
              ¿Olvidaste tu contrasena?
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
