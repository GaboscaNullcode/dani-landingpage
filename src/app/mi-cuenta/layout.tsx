import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function MiCuentaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-white to-cream pt-32 pb-16">
        {children}
      </main>
      <Footer />
    </>
  );
}
