import { cache } from 'react';
import { createAnonSupabase } from './supabase/server';
import type {
  TestimonioMasterclassRecord,
  TestimonioMasterclass,
  MasterclassContent,
} from '@/types/masterclass';

// Transform Supabase record to frontend model
function transformTestimonioRecord(
  record: TestimonioMasterclassRecord,
): TestimonioMasterclass {
  return {
    id: record.id,
    name: record.nombre,
    role: record.rol,
    text: record.texto,
    stars: record.estrellas,
    socialNetwork: record.red_social,
    socialUsername: record.usuario_red_social,
    icon: record.icono,
    avatarUrl: record.avatar_url,
  };
}

// Fetch active testimonials ordered by position
export const getTestimoniosMasterclass = cache(
  async (): Promise<TestimonioMasterclass[]> => {
    try {
      const supabase = createAnonSupabase();
      const { data, error } = await supabase
        .from('testimonios_masterclass')
        .select('*')
        .eq('activo', true)
        .order('orden', { ascending: true });

      if (error) throw error;
      return (data ?? []).map(transformTestimonioRecord);
    } catch (error) {
      console.error('Error fetching masterclass testimonials:', error);
      return [];
    }
  },
);

// Fetch testimonials marked for the masterclass page
export const getTestimoniosMasterclassPage = cache(
  async (): Promise<TestimonioMasterclass[]> => {
    try {
      const supabase = createAnonSupabase();
      const { data, error } = await supabase
        .from('testimonios_masterclass')
        .select('*')
        .eq('activo', true)
        .eq('mostrar_en_masterclass', true)
        .order('orden', { ascending: true });

      if (error) throw error;
      return (data ?? []).map(transformTestimonioRecord);
    } catch (error) {
      console.error(
        'Error fetching masterclass page testimonials:',
        error,
      );
      return [];
    }
  },
);

// Fetch a single masterclass resource by ID
export const getMasterclassResource = cache(
  async (
    resourceId: string,
  ): Promise<{
    id: string;
    title: string;
    downloadUrl: string;
  } | null> => {
    try {
      const supabase = createAnonSupabase();
      const { data, error } = await supabase
        .from('programa_contenido')
        .select('id, titulo, download_url')
        .eq('id', resourceId)
        .eq('producto_id', 'masterclass-gratuita')
        .eq('tipo', 'descarga')
        .single();

      if (error || !data) return null;

      return {
        id: data.id,
        title: data.titulo,
        downloadUrl: data.download_url,
      };
    } catch {
      console.error('Error fetching masterclass resource:', resourceId);
      return null;
    }
  },
);

// Fetch masterclass content (video + downloadable resources)
export const getMasterclassContent = cache(
  async (): Promise<MasterclassContent> => {
    try {
      const supabase = createAnonSupabase();
      const { data, error } = await supabase
        .from('programa_contenido')
        .select('*')
        .eq('producto_id', 'masterclass-gratuita')
        .order('orden', { ascending: true });

      if (error) throw error;

      const records = data ?? [];

      // Find the intro video
      const videoRecord = records.find(
        (r: { tipo: string; es_intro: boolean }) =>
          r.tipo === 'video' && r.es_intro === true,
      );

      // Find downloadable resources
      const downloadRecords = records.filter(
        (r: { tipo: string }) => r.tipo === 'descarga',
      );

      return {
        video: videoRecord
          ? {
              title: videoRecord.titulo,
              embedUrl: videoRecord.embed_url,
              description: videoRecord.descripcion || '',
            }
          : null,
        resources: downloadRecords.map(
          (r: {
            id: string;
            titulo: string;
            descripcion: string | null;
            download_url: string;
            tipo_archivo: string | null;
          }) => ({
            id: r.id,
            title: r.titulo,
            description: r.descripcion || '',
            downloadUrl: r.download_url,
            fileType: (r.tipo_archivo === 'workbook' ? 'workbook' : 'ebook') as
              | 'ebook'
              | 'workbook',
          }),
        ),
      };
    } catch (error) {
      console.error('Error fetching masterclass content:', error);
      return { video: null, resources: [] };
    }
  },
);
