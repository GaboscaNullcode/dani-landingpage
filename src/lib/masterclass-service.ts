import { cache } from 'react';
import { createAnonSupabase } from './supabase/server';
import type {
  TestimonioRecord,
  Testimonio,
  MasterclassContent,
} from '@/types/masterclass';

// Transform Supabase record to frontend model
function transformTestimonioRecord(record: TestimonioRecord): Testimonio {
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

// Fetch all active testimonials ordered by position
export const getAllTestimonios = cache(
  async (): Promise<Testimonio[]> => {
    try {
      const supabase = createAnonSupabase();
      const { data, error } = await supabase
        .from('testimonios')
        .select('*')
        .eq('activo', true)
        .order('orden', { ascending: true });

      if (error) throw error;
      return (data ?? []).map(transformTestimonioRecord);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
  },
);

// Fetch testimonials assigned to a specific product via producto_testimonios
export const getTestimoniosByProducto = cache(
  async (productoId: string): Promise<Testimonio[]> => {
    try {
      const supabase = createAnonSupabase();
      const { data, error } = await supabase
        .from('producto_testimonios')
        .select('orden, testimonios(*)')
        .eq('producto_id', productoId)
        .order('orden', { ascending: true });

      if (error) throw error;

      return (data ?? [])
        .filter((row) => {
          const t = row.testimonios as unknown as TestimonioRecord | null;
          return t && t.activo;
        })
        .map((row) => {
          const t = row.testimonios as unknown as TestimonioRecord;
          return transformTestimonioRecord(t);
        });
    } catch (error) {
      console.error(
        `Error fetching testimonials for product ${productoId}:`,
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
