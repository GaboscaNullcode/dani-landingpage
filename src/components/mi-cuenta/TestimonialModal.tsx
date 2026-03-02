'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  Loader2,
  X,
  MessageSquareHeart,
  Camera,
  User,
} from 'lucide-react';
import Image from 'next/image';

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ExistingTestimonial {
  id: string;
  texto: string;
  rol: string;
  estrellas: number;
  red_social: string | null;
  usuario_red_social: string | null;
  avatar_url: string | null;
}

export default function TestimonialModal({
  isOpen,
  onClose,
}: TestimonialModalProps) {
  const [texto, setTexto] = useState('');
  const [rol, setRol] = useState('');
  const [estrellas, setEstrellas] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [redSocial, setRedSocial] = useState('instagram');
  const [usuarioRedSocial, setUsuarioRedSocial] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [consentimiento, setConsentimiento] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingExisting, setLoadingExisting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch existing testimonial when modal opens
  useEffect(() => {
    if (!isOpen) return;

    const fetchExisting = async () => {
      setLoadingExisting(true);
      try {
        const res = await fetch('/api/testimonios');
        if (res.ok) {
          const { testimonio }: { testimonio: ExistingTestimonial | null } =
            await res.json();
          if (testimonio) {
            setTexto(testimonio.texto);
            setRol(testimonio.rol);
            setEstrellas(testimonio.estrellas);
            setRedSocial(testimonio.red_social || 'instagram');
            setUsuarioRedSocial(testimonio.usuario_red_social || '');
            setAvatarUrl(testimonio.avatar_url);
            setAvatarPreview(testimonio.avatar_url);
            setConsentimiento(true);
            setIsEditing(true);
          }
        }
      } catch {
        // Ignore — user can still submit new
      } finally {
        setLoadingExisting(false);
      }
    };

    fetchExisting();
  }, [isOpen]);

  const resetForm = () => {
    setTexto('');
    setRol('');
    setEstrellas(5);
    setHoveredStar(0);
    setRedSocial('instagram');
    setUsuarioRedSocial('');
    setAvatarUrl(null);
    setAvatarPreview(null);
    setUploadingAvatar(false);
    setConsentimiento(false);
    setError('');
    setSuccess(false);
    setIsEditing(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate
    if (file.size > 10 * 1024 * 1024) {
      setError('La imagen no puede exceder 10 MB');
      return;
    }

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Solo se permiten imágenes JPG, PNG o WebP');
      return;
    }

    // Show preview immediately
    const preview = URL.createObjectURL(file);
    setAvatarPreview(preview);
    setError('');
    setUploadingAvatar(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'testimoniales');

      const res = await fetch('/api/upload', { method: 'POST', body: formData });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Error al subir la imagen');
        setAvatarPreview(avatarUrl);
        return;
      }

      const { url } = await res.json();
      setAvatarUrl(url);
      setAvatarPreview(url);
    } catch {
      setError('Error al subir la imagen');
      setAvatarPreview(avatarUrl);
    } finally {
      setUploadingAvatar(false);
      // Revoke preview if it was a blob
      if (preview.startsWith('blob:')) URL.revokeObjectURL(preview);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!texto.trim()) {
      setError('Escribe tu experiencia');
      return;
    }

    if (!rol.trim()) {
      setError('Indica tu rol o profesión');
      return;
    }

    if (!consentimiento) {
      setError('Debes dar tu consentimiento para publicar el testimonio');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/testimonios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          texto: texto.trim(),
          rol: rol.trim(),
          estrellas,
          redSocial: usuarioRedSocial.trim() ? redSocial : null,
          usuarioRedSocial: usuarioRedSocial.trim() || null,
          avatarUrl,
          consentimiento,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Error al enviar el testimonio');
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
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
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative max-h-[85vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute right-3 top-3 rounded-full p-1.5 text-gray-medium transition-colors hover:bg-gray-light/50 hover:text-gray-dark"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-coral to-pink">
                <MessageSquareHeart className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-[var(--font-headline)] text-lg font-bold text-black-deep">
                  {isEditing ? 'Editar Testimonio' : 'Dejar Testimonio'}
                </h2>
                <p className="text-xs text-gray-medium">
                  Comparte tu experiencia
                </p>
              </div>
            </div>

            {loadingExisting ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-coral" />
              </div>
            ) : success ? (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2 rounded-xl bg-green-50 px-4 py-5 text-center"
              >
                <p className="text-sm font-semibold text-green-700">
                  {isEditing
                    ? 'Testimonio actualizado correctamente'
                    : 'Testimonio enviado correctamente'}
                </p>
                <p className="text-xs text-green-600">
                  Será revisado y publicado pronto. ¡Gracias!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Avatar + Stars row */}
                <div className="flex items-start gap-4">
                  {/* Avatar upload */}
                  <div className="shrink-0">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingAvatar}
                      className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-gray-light transition-colors hover:border-coral"
                    >
                      {avatarPreview ? (
                        <Image
                          src={avatarPreview}
                          alt="Avatar"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <User className="h-6 w-6 text-gray-light" />
                      )}
                      {/* Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                        {uploadingAvatar ? (
                          <Loader2 className="h-5 w-5 animate-spin text-white" />
                        ) : (
                          <Camera className="h-4 w-4 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                        )}
                      </div>
                    </button>
                    <p className="mt-1 text-center text-[10px] text-gray-medium">
                      Tu foto
                    </p>
                  </div>

                  {/* Stars */}
                  <div className="flex-1">
                    <label className="mb-1.5 block text-sm font-semibold text-gray-dark">
                      Tu calificación
                    </label>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setEstrellas(star)}
                          onMouseEnter={() => setHoveredStar(star)}
                          onMouseLeave={() => setHoveredStar(0)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`h-6 w-6 transition-colors ${
                              star <= (hoveredStar || estrellas)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'fill-gray-200 text-gray-200'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Testimonial text */}
                <div>
                  <label
                    htmlFor="testimonio-texto"
                    className="mb-1 block text-sm font-semibold text-gray-dark"
                  >
                    Tu experiencia
                  </label>
                  <textarea
                    id="testimonio-texto"
                    required
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    placeholder="Cuenta cómo ha sido tu experiencia..."
                    maxLength={1000}
                    rows={3}
                    className="w-full resize-none rounded-xl border-2 border-gray-light px-3 py-2.5 text-sm text-gray-dark transition-colors focus:border-coral focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40"
                  />
                  <p className="mt-0.5 text-right text-[10px] text-gray-medium">
                    {texto.length}/1000
                  </p>
                </div>

                {/* Role */}
                <div>
                  <label
                    htmlFor="testimonio-rol"
                    className="mb-1 block text-sm font-semibold text-gray-dark"
                  >
                    Tu rol o profesión
                  </label>
                  <input
                    id="testimonio-rol"
                    type="text"
                    required
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                    placeholder="Ej: Diseñadora Gráfica, Marketing Digital..."
                    maxLength={100}
                    className="w-full rounded-xl border-2 border-gray-light px-3 py-2.5 text-sm text-gray-dark transition-colors focus:border-coral focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40"
                  />
                </div>

                {/* Social media (optional) */}
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-dark">
                    Red social{' '}
                    <span className="font-normal text-gray-medium">
                      (opcional)
                    </span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={redSocial}
                      onChange={(e) => setRedSocial(e.target.value)}
                      className="rounded-xl border-2 border-gray-light px-2.5 py-2.5 text-sm text-gray-dark transition-colors focus:border-coral focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40"
                    >
                      <option value="instagram">Instagram</option>
                      <option value="tiktok">TikTok</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="twitter">X / Twitter</option>
                    </select>
                    <input
                      type="text"
                      value={usuarioRedSocial}
                      onChange={(e) => setUsuarioRedSocial(e.target.value)}
                      placeholder="@tuusuario"
                      maxLength={100}
                      className="flex-1 rounded-xl border-2 border-gray-light px-3 py-2.5 text-sm text-gray-dark transition-colors focus:border-coral focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40"
                    />
                  </div>
                </div>

                {/* Consent checkbox */}
                <div className="rounded-xl bg-cream/50 px-3 py-3">
                  <label className="flex cursor-pointer items-start gap-2.5">
                    <input
                      type="checkbox"
                      checked={consentimiento}
                      onChange={(e) => setConsentimiento(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-coral"
                    />
                    <span className="text-xs leading-relaxed text-gray-carbon">
                      Doy mi consentimiento para que mi testimonio, nombre y
                      foto sean publicados en la página web de Remote con Dani.
                    </span>
                  </label>
                </div>

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl bg-red-50 px-3 py-2.5 text-xs text-red-600"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Info + Submit */}
                <div className="space-y-3">
                  <p className="text-[10px] text-gray-medium">
                    Tu testimonio será revisado antes de ser publicado.
                  </p>
                  <button
                    type="submit"
                    disabled={loading || uploadingAvatar}
                    className="w-full rounded-xl bg-gradient-to-r from-coral to-pink px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Enviando...
                      </span>
                    ) : isEditing ? (
                      'Actualizar Testimonio'
                    ) : (
                      'Enviar Testimonio'
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
