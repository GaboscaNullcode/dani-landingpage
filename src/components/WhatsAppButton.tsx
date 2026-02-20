'use client';

import { motion } from 'motion/react';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export default function WhatsAppButton({
  phoneNumber = '51950907963',
  message = 'Hola Dani, me gustaría saber más sobre tu acompañamiento para trabajo remoto',
}: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-[1000] flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-shadow hover:shadow-xl md:bottom-6 md:right-6 md:h-14 md:w-14"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Contactar por WhatsApp"
    >
      {/* Pulse animation ring */}
      <span className="absolute h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />

      {/* Icon */}
      <WhatsAppIcon className="relative h-6 w-6 md:h-7 md:w-7" />
    </motion.a>
  );
}
