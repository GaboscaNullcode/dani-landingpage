import type { Metadata } from 'next';
import { Fraunces, DM_Sans } from 'next/font/google';
import './globals.css';
import WhatsAppButton from '@/components/WhatsAppButton';
import MasterclassPopup from '@/components/MasterclassPopup';

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
  metadataBase: new URL('https://remotecondani.com'),
  other: {
    'theme-color': '#fef7f0',
    'color-scheme': 'light',
  },
  title: {
    default: 'Remote con Dani - Trabaja desde casa y redescubre tu libertad',
    template: '%s | Remote con Dani',
  },
  description:
    'Acompañamiento en tu transición al trabajo remoto con empatía y transparencia. Aprende a conseguir empleo remoto y construir una carrera digital.',
  keywords: [
    'trabajo remoto',
    'coach trabajo remoto',
    'empleo remoto',
    'freelance',
    'trabajar desde casa',
    'asistente virtual',
    'trabajo desde casa',
  ],
  authors: [{ name: 'Dani', url: 'https://remotecondani.com' }],
  creator: 'Remote con Dani',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://remotecondani.com',
    siteName: 'Remote con Dani',
    title: 'Remote con Dani - Trabaja desde casa y redescubre tu libertad',
    description:
      'Acompañamiento en tu transición al trabajo remoto con empatía y transparencia.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Remote con Dani - Coach de Trabajo Remoto',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remote con Dani - Trabaja desde casa y redescubre tu libertad',
    description:
      'Acompañamiento en tu transición al trabajo remoto con empatía y transparencia.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
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
        {/* Skip link para accesibilidad */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-coral focus:px-4 focus:py-2 focus:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-coral"
        >
          Saltar al contenido principal
        </a>
        {children}
        <WhatsAppButton />
        <MasterclassPopup />
      </body>
    </html>
  );
}
