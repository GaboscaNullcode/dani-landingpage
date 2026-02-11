import { Metadata } from 'next';
import Dashboard from '@/components/mi-cuenta/Dashboard';

export const metadata: Metadata = {
  title: 'Mi Cuenta | Remote con Dani',
  description: 'Accede a tus productos, cursos y recursos adquiridos.',
};

export default function MiCuentaPage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <Dashboard />
    </div>
  );
}
