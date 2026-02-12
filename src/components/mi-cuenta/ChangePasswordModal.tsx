'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KeyRound, Eye, EyeOff, Loader2, X } from 'lucide-react';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({
  isOpen,
  onClose,
}: ChangePasswordModalProps) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const resetForm = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowOld(false);
    setShowNew(false);
    setShowConfirm(false);
    setError('');
    setSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('Todos los campos son requeridos');
      return;
    }

    if (newPassword.length < 8) {
      setError('La nueva contrasena debe tener al menos 8 caracteres');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contrasenas no coinciden');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error al cambiar la contrasena');
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch {
      setError('Error de conexion. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md rounded-3xl bg-white/90 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 rounded-full p-1.5 text-gray-medium transition-colors hover:bg-gray-light/50 hover:text-gray-dark"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-coral to-pink">
                <KeyRound className="h-6 w-6 text-white" />
              </div>
              <h2 className="font-[var(--font-headline)] text-2xl font-bold text-black-deep">
                <span className="gradient-text-playful">
                  Cambiar Contrasena
                </span>
              </h2>
              <p className="mt-2 text-sm text-gray-medium">
                Ingresa tu contrasena actual y elige una nueva
              </p>
            </div>

            {success ? (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl bg-green-50 px-4 py-3 text-center text-sm text-green-700"
              >
                Contrasena actualizada correctamente
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Current password */}
                <div>
                  <label
                    htmlFor="old-password"
                    className="mb-1 block text-sm font-semibold text-gray-dark"
                  >
                    Contrasena actual
                  </label>
                  <div className="relative">
                    <input
                      id="old-password"
                      type={showOld ? 'text' : 'password'}
                      required
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Tu contrasena actual"
                      className="w-full rounded-xl border-2 border-gray-light px-4 py-3 pr-11 text-gray-dark transition-colors focus:border-coral focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOld(!showOld)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-medium transition-colors hover:text-gray-dark"
                    >
                      {showOld ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* New password */}
                <div>
                  <label
                    htmlFor="new-password"
                    className="mb-1 block text-sm font-semibold text-gray-dark"
                  >
                    Nueva contrasena
                  </label>
                  <div className="relative">
                    <input
                      id="new-password"
                      type={showNew ? 'text' : 'password'}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimo 8 caracteres"
                      className="w-full rounded-xl border-2 border-gray-light px-4 py-3 pr-11 text-gray-dark transition-colors focus:border-coral focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-medium transition-colors hover:text-gray-dark"
                    >
                      {showNew ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm password */}
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="mb-1 block text-sm font-semibold text-gray-dark"
                  >
                    Confirmar nueva contrasena
                  </label>
                  <div className="relative">
                    <input
                      id="confirm-password"
                      type={showConfirm ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repite la nueva contrasena"
                      className="w-full rounded-xl border-2 border-gray-light px-4 py-3 pr-11 text-gray-dark transition-colors focus:border-coral focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-medium transition-colors hover:text-gray-dark"
                    >
                      {showConfirm ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-coral to-pink px-6 py-3 font-bold text-white shadow-lg transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Actualizando…
                    </span>
                  ) : (
                    'Cambiar Contrasena'
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
