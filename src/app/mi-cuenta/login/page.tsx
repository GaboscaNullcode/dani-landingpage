import { Metadata } from 'next';
import LoginForm from '@/components/mi-cuenta/LoginForm';

export const metadata: Metadata = {
  title: 'Iniciar Sesion | Remote con Dani',
  description: 'Inicia sesion para acceder a tus productos y recursos.',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <LoginForm />
    </div>
  );
}
