'use client';

import { motion } from 'motion/react';
import { Mail, Instagram, Youtube, MessageCircle, ExternalLink } from 'lucide-react';
import { contactInfo } from '@/data/faq-data';

const socialLinks = [
  {
    name: 'Email',
    value: contactInfo.email,
    url: `mailto:${contactInfo.email}`,
    icon: Mail,
    color: '#ff6b6b',
    bgColor: 'bg-coral/10',
  },
  {
    name: 'Instagram',
    value: contactInfo.instagram,
    url: contactInfo.instagramUrl,
    icon: Instagram,
    color: '#e056a0',
    bgColor: 'bg-pink/10',
  },
  {
    name: 'YouTube',
    value: contactInfo.youtube,
    url: contactInfo.youtubeUrl,
    icon: Youtube,
    color: '#ff0000',
    bgColor: 'bg-red-50',
  },
  {
    name: 'TikTok',
    value: contactInfo.tiktok,
    url: contactInfo.tiktokUrl,
    icon: MessageCircle,
    color: '#a78bfa',
    bgColor: 'bg-lavender/10',
  },
];

export default function ContactoSection() {
  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <h2 className="text-section-title mb-4 font-[var(--font-headline)] font-bold text-gray-dark">
            Conecta Conmigo
          </h2>
          <p className="text-lg text-gray-carbon">
            Estoy aquí para ayudarte. Elige el canal que prefieras para comunicarte conmigo.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-3xl gap-4 md:grid-cols-2">
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.name}
                href={link.url}
                target={link.url.startsWith('mailto') ? undefined : '_blank'}
                rel={link.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex items-center gap-4 rounded-2xl border border-gray-light bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)]"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${link.bgColor} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="h-6 w-6" style={{ color: link.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-medium">{link.name}</p>
                  <p className="font-[var(--font-headline)] font-semibold text-gray-dark">
                    {link.value}
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-light transition-colors group-hover:text-coral" />
              </motion.a>
            );
          })}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-12 max-w-2xl rounded-2xl p-8 text-center"
          style={{ background: 'var(--cream)' }}
        >
          <h3 className="mb-3 font-[var(--font-headline)] text-xl font-bold text-gray-dark">
            Horario de Atención
          </h3>
          <p className="text-gray-carbon">
            Respondo mensajes de lunes a viernes, generalmente dentro de 24-48 horas.
            Para consultas urgentes, las asesorías son la mejor opción.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
