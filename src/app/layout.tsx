import type { Metadata } from 'next';
import { Fraunces, DM_Sans } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Remote con Dani - Trabaja desde casa y redescubre tu libertad',
  description:
    'Acompanamiento en tu transicion al trabajo remoto con empatia y transparencia. Aprende a conseguir empleo remoto y construir una carrera digital.',
  keywords: [
    'trabajo remoto',
    'coach trabajo remoto',
    'empleo remoto',
    'freelance',
    'trabajar desde casa',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    title: 'Remote con Dani - Trabaja desde casa y redescubre tu libertad',
    description:
      'Acompanamiento en tu transicion al trabajo remoto con empatia y transparencia.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${fraunces.variable} ${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
