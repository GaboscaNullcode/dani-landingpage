'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { BookOpen, PenLine, Eye } from 'lucide-react';
import type { ProgramaDownload } from '@/data/programa-intensivo-data';

interface DownloadsSectionProps {
  downloads: ProgramaDownload[];
}

const fileTypeConfig = {
  ebook: {
    icon: BookOpen,
    gradient: 'from-coral/10 to-pink/10',
    iconColor: 'text-coral',
  },
  workbook: {
    icon: PenLine,
    gradient: 'from-lavender/10 to-lavender/5',
    iconColor: 'text-lavender',
  },
};

export default function DownloadsSection({ downloads }: DownloadsSectionProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {downloads.map((item, index) => {
        const config = fileTypeConfig[item.fileType];
        const Icon = config.icon;
        const hasUrl = item.downloadUrl && item.downloadUrl !== '#';

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`rounded-xl bg-gradient-to-br ${config.gradient} border border-gray-light/40 p-5`}
          >
            <div className="mb-3 flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg bg-white/80 ${config.iconColor}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-gray-dark">{item.title}</h3>
            </div>
            <p className="mb-4 text-sm text-gray-medium">{item.description}</p>
            {hasUrl ? (
              <Link
                href={`/mi-cuenta/contenido/recurso/${item.id}`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white/80 px-4 py-2 text-sm font-semibold text-gray-dark transition-colors hover:bg-white hover:shadow-sm"
              >
                <Eye className="h-4 w-4" />
                Ver material
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/40 px-4 py-2 text-sm font-semibold text-gray-medium">
                Proximamente
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
