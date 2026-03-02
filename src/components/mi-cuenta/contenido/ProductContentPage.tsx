'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  GraduationCap,
  PlayCircle,
  BookOpen,
} from 'lucide-react';
import type {
  ProgramaVideo,
  ProgramaDownload,
} from '@/data/programa-intensivo-data';
import VideoPlayer from '../programa-intensivo/VideoPlayer';
import VideoList from '../programa-intensivo/VideoList';
import DownloadsSection from '../programa-intensivo/DownloadsSection';
import ProgramaCTA from '../programa-intensivo/ProgramaCTA';

export interface CTAData {
  paidFull: boolean;
  paid1: boolean;
  paid2: boolean;
  bookingSessionId: string | null;
  pago2Product: { id: string; stripePriceId: string; price: number } | null;
  parentProductId: string | null;
}

interface ProductContentPageProps {
  productName: string;
  productDescription: string;
  introVideo: ProgramaVideo | null;
  videos: ProgramaVideo[];
  downloads: ProgramaDownload[];
  ctaData: CTAData | null;
}

export default function ProductContentPage({
  productName,
  productDescription,
  introVideo,
  videos,
  downloads,
  ctaData,
}: ProductContentPageProps) {
  const hasVideos = videos.length > 0 || introVideo !== null;

  return (
    <div className="space-y-8">
      {/* Back link */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/mi-cuenta"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-medium transition-colors hover:text-coral"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Mi Cuenta
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-3xl bg-white/70 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-sm"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-coral/10">
            <GraduationCap className="h-5 w-5 text-coral" />
          </div>
          <div>
            <h1 className="font-[var(--font-headline)] text-2xl font-bold text-black-deep sm:text-3xl">
              {productName}
            </h1>
            <p className="text-sm text-gray-medium">{productDescription}</p>
          </div>
        </div>
      </motion.div>

      {/* Intro video */}
      {introVideo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-4 flex items-center gap-2">
            <PlayCircle className="h-5 w-5 text-coral" />
            <h2 className="font-[var(--font-headline)] text-lg font-bold text-black-deep">
              {introVideo.title}
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
            <VideoPlayer
              embedUrl={introVideo.embedUrl}
              title={introVideo.title}
            />
          </div>
          <p className="mt-3 text-sm text-gray-medium">
            {introVideo.description}
          </p>
        </motion.div>
      )}

      {/* Video list */}
      {hasVideos && videos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-coral" />
            <h2 className="font-[var(--font-headline)] text-lg font-bold text-black-deep">
              Contenido del programa
            </h2>
          </div>
          <VideoList videos={videos} />
        </motion.div>
      )}

      {/* Downloads */}
      {downloads.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: hasVideos ? 0.4 : 0.2 }}
        >
          <div className="mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-coral" />
            <h2 className="font-[var(--font-headline)] text-lg font-bold text-black-deep">
              Materiales incluidos
            </h2>
          </div>
          <DownloadsSection downloads={downloads} />
        </motion.div>
      )}

      {/* CTA - only for Programa Intensivo */}
      {ctaData && (
        <ProgramaCTA
          paidFull={ctaData.paidFull}
          paid1={ctaData.paid1}
          paid2={ctaData.paid2}
          bookingSessionId={ctaData.bookingSessionId}
          pago2Product={ctaData.pago2Product}
          parentProductId={ctaData.parentProductId}
        />
      )}
    </div>
  );
}
