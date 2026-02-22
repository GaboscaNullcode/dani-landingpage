'use client';

import { motion } from 'motion/react';
import { FileText, ClipboardCheck, Download, Sparkles } from 'lucide-react';
import type { MasterclassContent } from '@/types/masterclass';

interface MasterclassResourcesProps {
  resources: MasterclassContent['resources'];
}

const fileTypeConfig = {
  ebook: {
    icon: FileText,
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 100%)',
    shadowColor: 'rgba(255, 107, 107, 0.3)',
    label: 'RECURSO #1',
  },
  workbook: {
    icon: ClipboardCheck,
    gradient: 'linear-gradient(135deg, #e056a0 0%, #a78bfa 100%)',
    shadowColor: 'rgba(224, 86, 160, 0.3)',
    label: 'RECURSO #2',
  },
};

export default function MasterclassResources({
  resources,
}: MasterclassResourcesProps) {
  return (
    <div>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-coral/10 px-5 py-2">
          <Sparkles className="h-5 w-5 text-coral" />
          <span className="font-[var(--font-dm-sans)] text-sm font-semibold text-coral">
            Incluidos con la masterclass
          </span>
        </div>
        <h2 className="font-[var(--font-headline)] text-2xl font-bold text-black-deep md:text-3xl">
          Recursos{' '}
          <span className="gradient-text-playful">descargables</span>
        </h2>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2">
        {resources.map((item, index) => {
          const config = fileTypeConfig[item.fileType];
          const Icon = config.icon;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                type: 'spring',
                stiffness: 100,
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="group relative overflow-hidden rounded-[28px] bg-white p-8 shadow-[0_10px_50px_rgba(0,0,0,0.08)] transition-shadow duration-500 hover:shadow-[0_25px_80px_rgba(0,0,0,0.12)]"
            >
              {/* Background gradient accent */}
              <div
                className="absolute inset-0 opacity-[0.04] transition-opacity duration-500 group-hover:opacity-[0.08]"
                style={{ background: config.gradient }}
              />

              {/* Label */}
              <div className="relative mb-6">
                <span
                  className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white"
                  style={{ background: config.gradient }}
                >
                  {config.label}
                </span>
              </div>

              {/* Icon + Title */}
              <div className="relative mb-4 flex items-center gap-4">
                <motion.div
                  className="flex h-16 w-16 items-center justify-center rounded-[20px] shadow-lg"
                  style={{
                    background: config.gradient,
                    boxShadow: `0 10px 30px ${config.shadowColor}`,
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Icon className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="font-[var(--font-headline)] text-xl font-bold text-black-deep">
                  {item.title}
                </h3>
              </div>

              {/* Description */}
              <p className="relative mb-8 text-gray-carbon">
                {item.description}
              </p>

              {/* Download button */}
              <a
                href={item.downloadUrl}
                download
                className="btn-shimmer relative inline-flex items-center gap-2 rounded-full px-8 py-3 font-[var(--font-headline)] text-sm font-bold text-white transition-all duration-500 hover:-translate-y-0.5"
                style={{
                  background: config.gradient,
                  boxShadow: `0 10px 30px ${config.shadowColor}`,
                }}
              >
                <Download className="h-4 w-4" />
                Descargar recurso
              </a>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
