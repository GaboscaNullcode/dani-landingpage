'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Instagram, Heart } from 'lucide-react';

const footerLinks = [
  { text: 'Home', href: '/' },
  { text: 'Sobre Mi', href: '/sobre-mi' },
  { text: 'Servicios', href: '#servicios' },
  { text: 'Recursos', href: '/recursos' },
  { text: 'Testimonios', href: '#testimonios' },
];

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/remote.con.dani',
    icon: Instagram,
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 100%)',
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@remotecondani',
    icon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #a78bfa 0%, #6ee7b7 100%)',
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-black-deep py-16 text-white">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="blob absolute -left-32 -top-32 h-[400px] w-[400px] opacity-10"
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 107, 107, 0.5) 0%, rgba(224, 86, 160, 0.3) 100%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="blob absolute -bottom-32 -right-32 h-[350px] w-[350px] opacity-10"
          style={{
            background:
              'linear-gradient(135deg, rgba(167, 139, 250, 0.5) 0%, rgba(110, 231, 183, 0.3) 100%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Top Section */}
        <div className="mb-12 flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Logo */}
          <Link href="/" className="inline-block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Image
                src="/images/logos/logo-blanco-small.png"
                alt="Remote con Dani"
                width={160}
                height={44}
                className="h-11 w-auto"
              />
            </motion.div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link, index) => (
              <motion.div
                key={link.text}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="relative text-sm text-white/70 transition-colors duration-300 hover:text-white"
                >
                  <span className="relative">
                    {link.text}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-coral to-pink transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="mb-12 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Middle Section */}
        <div className="mb-12 grid gap-8 md:grid-cols-3">
          {/* About */}
          <div className="text-center md:text-left">
            <h3 className="mb-4 font-[var(--font-headline)] text-lg font-bold">
              Sobre Remote con Dani
            </h3>
            <p className="text-sm leading-relaxed text-white/60">
              Te acompaño en tu transición al trabajo remoto con empatía,
              transparencia y las herramientas que necesitas para triunfar.
            </p>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <h3 className="mb-4 font-[var(--font-headline)] text-lg font-bold">
              Sígueme
            </h3>
            <div className="flex items-center justify-center gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-xl text-white transition-all duration-300"
                    style={{ background: social.gradient }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    <IconComponent />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h3 className="mb-4 font-[var(--font-headline)] text-lg font-bold">
              Contacto
            </h3>
            <p className="text-sm text-white/60">
              <a
                href="mailto:hola@remotecondani.com"
                className="transition-colors duration-300 hover:text-coral"
              >
                hola@remotecondani.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          {/* Copyright */}
          <p className="text-center text-sm text-white/40">
            &copy; {currentYear} Remote con Dani. Todos los derechos reservados.
          </p>

          {/* Made with love */}
          <motion.p
            className="flex items-center gap-2 text-sm text-white/40"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Hecho con{' '}
            <Heart className="h-4 w-4 fill-coral text-coral" /> para emprendedoras
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
