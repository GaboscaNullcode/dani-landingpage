'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, User } from 'lucide-react';

const navItems = [
  { text: 'Home', href: '/' },
  { text: 'Blog', href: '/blog' },
  { text: 'Tienda', href: '/tienda' },
  { text: 'Asesorías', href: '/asesorias' },
  { text: 'Info', href: '/info' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
      className={`fixed left-0 right-0 top-0 z-[1000] px-4 transition-all duration-500 ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      <motion.nav
        className={`mx-auto flex items-center justify-between transition-all duration-500 ${
          isScrolled
            ? 'max-w-4xl rounded-full bg-white/80 px-6 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl'
            : 'container-custom bg-transparent px-6 py-0'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="relative z-[1002]">
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
              className={`w-auto brightness-0 transition-all duration-500 ${
                isScrolled ? 'h-8' : 'h-11'
              }`}
              priority
            />
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <ul className={`hidden items-center md:flex transition-all duration-500 ${isScrolled ? 'gap-5' : 'gap-8'}`}>
          {navItems.map((item, index) => (
            <motion.li
              key={item.text}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className={`nav-link-underline group relative font-[var(--font-dm-sans)] font-semibold tracking-wide transition-all duration-500 text-gray-dark hover:text-coral ${
                  isScrolled ? 'text-xs' : 'text-sm'
                }`}
              >
                {item.text}
              </Link>
            </motion.li>
          ))}
          <motion.li
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Link
              href="/mi-cuenta"
              className={`flex items-center justify-center rounded-full border-2 border-gray-light text-gray-dark transition-all duration-300 hover:border-coral hover:text-coral ${
                isScrolled ? 'h-8 w-8' : 'h-9 w-9'
              }`}
              aria-label="Mi Cuenta"
            >
              <User className={isScrolled ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
            </Link>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <Link
              href="/empezar"
              className={`btn-shimmer group relative inline-flex items-center gap-2 rounded-full font-[var(--font-headline)] font-bold text-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(255,107,107,0.4)] ${
                isScrolled ? 'px-4 py-2 text-xs' : 'px-6 py-3 text-sm'
              }`}
              style={{
                background: 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 100%)',
              }}
            >
              <span>Empezar</span>
              <motion.div
                animate={{ rotate: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className={isScrolled ? 'h-3 w-3' : 'h-4 w-4'} />
              </motion.div>
            </Link>
          </motion.li>
        </ul>

      </motion.nav>

      {/* Hamburger Button - Outside nav to avoid container restrictions */}
      <button
        className={`absolute right-4 z-[1002] flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl bg-white shadow-md md:hidden ${
          isScrolled ? 'top-1/2 -translate-y-1/2' : 'top-1/2 -translate-y-1/2'
        }`}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
      >
        <motion.span
          animate={{
            rotate: isMobileMenuOpen ? 45 : 0,
            y: isMobileMenuOpen ? 8 : 0,
          }}
          className="block h-0.5 w-5 rounded-full bg-gray-dark"
        />
        <motion.span
          animate={{
            opacity: isMobileMenuOpen ? 0 : 1,
            scale: isMobileMenuOpen ? 0 : 1,
          }}
          className="block h-0.5 w-5 rounded-full bg-gray-dark"
        />
        <motion.span
          animate={{
            rotate: isMobileMenuOpen ? -45 : 0,
            y: isMobileMenuOpen ? -8 : 0,
          }}
          className="block h-0.5 w-5 rounded-full bg-gray-dark"
        />
      </button>

      {/* Mobile Menu Overlay - Outside nav to avoid container restrictions */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1001] overflow-hidden md:hidden"
            style={{
              background:
                'linear-gradient(135deg, #fef7f0 0%, #ffecd2 50%, #fce7f3 100%)',
            }}
          >
            {/* Decorative blobs in mobile menu */}
            <motion.div
              className="blob absolute -right-20 -top-20 h-[300px] w-[300px] opacity-30"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255, 107, 107, 0.4) 0%, rgba(224, 86, 160, 0.3) 100%)',
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="blob absolute -bottom-20 -left-20 h-[250px] w-[250px] opacity-25"
              style={{
                background:
                  'linear-gradient(135deg, rgba(167, 139, 250, 0.4) 0%, rgba(110, 231, 183, 0.3) 100%)',
              }}
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            />

            <ul className="flex h-full flex-col items-center justify-center gap-6">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.text}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="font-[var(--font-headline)] text-3xl font-bold text-gray-dark transition-colors hover:text-coral"
                  >
                    {item.text}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4, delay: navItems.length * 0.1 }}
              >
                <Link
                  href="/mi-cuenta"
                  onClick={closeMobileMenu}
                  className="inline-flex items-center gap-3 font-[var(--font-headline)] text-3xl font-bold text-gray-dark transition-colors hover:text-coral"
                >
                  <User className="h-7 w-7" />
                  Mi Cuenta
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4, delay: (navItems.length + 1) * 0.1 }}
                className="mt-4"
              >
                <Link
                  href="/empezar"
                  onClick={closeMobileMenu}
                  className="btn-shimmer inline-flex items-center gap-3 rounded-full px-10 py-5 font-[var(--font-headline)] text-xl font-bold text-white shadow-[0_15px_50px_rgba(255,107,107,0.4)]"
                  style={{
                    background:
                      'linear-gradient(135deg, #ff6b6b 0%, #e056a0 100%)',
                  }}
                >
                  <span>Empezar</span>
                  <Sparkles className="h-5 w-5" />
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
