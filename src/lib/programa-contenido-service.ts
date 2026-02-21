import { cache } from 'react';
import { createAnonSupabase } from './supabase/server';
import type { ProgramaContenidoRecord } from '@/data/programa-intensivo-data';
import {
  transformToVideo,
  transformToDownload,
  type ProgramaVideo,
  type ProgramaDownload,
} from '@/data/programa-intensivo-data';

// Fetch all content for a product, sorted by orden
const getContenidoByProducto = cache(
  async (productoId: string): Promise<ProgramaContenidoRecord[]> => {
    try {
      const supabase = createAnonSupabase();
      const { data, error } = await supabase
        .from('programa_contenido')
        .select('*')
        .eq('producto_id', productoId)
        .order('orden', { ascending: true });

      if (error) throw error;
      return (data ?? []) as ProgramaContenidoRecord[];
    } catch (error) {
      console.error('Error fetching programa contenido:', error);
      return [];
    }
  },
);

export interface ProgramaContenido {
  introVideo: ProgramaVideo | null;
  videos: ProgramaVideo[];
  downloads: ProgramaDownload[];
}

export const getProgramaContenido = cache(
  async (productoId: string): Promise<ProgramaContenido> => {
    const records = await getContenidoByProducto(productoId);

    const videoRecords = records.filter((r) => r.tipo === 'video');
    const downloadRecords = records.filter((r) => r.tipo === 'descarga');

    const introRecord = videoRecords.find((r) => r.es_intro);
    const regularVideos = videoRecords.filter((r) => !r.es_intro);

    return {
      introVideo: introRecord ? transformToVideo(introRecord) : null,
      videos: regularVideos.map(transformToVideo),
      downloads: downloadRecords.map(transformToDownload),
    };
  },
);
