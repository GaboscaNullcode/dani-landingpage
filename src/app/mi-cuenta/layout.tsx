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
      <main
        className="relative min-h-screen overflow-hidden pt-32 pb-16"
        style={{
          background:
            'linear-gradient(135deg, #fef7f0 0%, #ffecd2 50%, #fce7f3 100%)',
        }}
      >
        {/* Blobs decorativos */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="blob absolute -right-32 -top-32 h-[400px] w-[400px] animate-blob opacity-25"
            style={{
              background:
                'linear-gradient(135deg, rgba(255, 107, 107, 0.4) 0%, rgba(224, 86, 160, 0.3) 100%)',
            }}
          />
          <div
            className="blob absolute -left-40 bottom-0 h-[350px] w-[350px] animate-blob opacity-20"
            style={{
              background:
                'linear-gradient(135deg, rgba(167, 139, 250, 0.4) 0%, rgba(110, 231, 183, 0.3) 100%)',
              animationDelay: '3s',
            }}
          />
        </div>

        <div className="relative z-10">{children}</div>
      </main>
      <Footer />
    </>
  );
}
