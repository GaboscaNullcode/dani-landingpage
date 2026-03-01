import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function MasterclassGratuitaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
