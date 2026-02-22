import type { Metadata } from 'next';
import ResetPasswordForm from '@/components/mi-cuenta/ResetPasswordForm';

export const metadata: Metadata = {
  title: 'Restablecer Contrasena | Remote con Dani',
};

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-4 py-16">
      <ResetPasswordForm />
    </main>
  );
}
