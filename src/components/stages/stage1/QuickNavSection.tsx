'use client';

import { motion } from 'motion/react';
import { Play, BookOpen, Users, Mail } from 'lucide-react';

const navCards = [
  {
    icon: Play,
    label: 'Masterclass',
    href: '#masterclass',
    color: 'bg-coral',
  },
  {
    icon: BookOpen,
    label: 'Blog',
    href: '#blog',
    color: 'bg-lavender',
  },
  {
    icon: Users,
    label: 'Comunidad',
    href: '#comunidad',
    color: 'bg-green-500',
  },
  {
    icon: Mail,
    label: 'Newsletter',
    href: '#newsletter',
    color: 'bg-sunshine',
  },
];

export default function QuickNavSection() {
  return (
    <section className="bg-white py-16">
      <div className="container-custom">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {navCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.a
                key={card.label}
                href={card.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="flex flex-col items-center gap-3 rounded-2xl border border-gray-light/50 bg-white p-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.color} text-white`}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <span className="font-[var(--font-headline)] text-sm font-bold text-gray-dark">
                  {card.label}
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
