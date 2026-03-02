import { cache } from 'react';
import { createAnonSupabase } from './supabase/server';
import type { DocRecord, Doc } from '@/types/docs';

function transformDocRecord(record: DocRecord): Doc {
  return {
    id: record.id,
    tipo: record.tipo,
    titulo: record.titulo,
    url: record.url,
  };
}

/**
 * Get a document URL by its type (e.g. 'terminos_condiciones', 'politica_privacidad')
 * Returns the URL string or null if not found
 */
export const getDocUrl = cache(
  async (tipo: string): Promise<string | null> => {
    const supabase = createAnonSupabase();
    const { data, error } = await supabase
      .from('docs')
      .select('*')
      .eq('tipo', tipo)
      .eq('activo', true)
      .single();

    if (error || !data) return null;

    const doc = transformDocRecord(data as DocRecord);
    return doc.url;
  }
);

/**
 * Get all active documents
 */
export const getAllDocs = cache(async (): Promise<Doc[]> => {
  const supabase = createAnonSupabase();
  const { data, error } = await supabase
    .from('docs')
    .select('*')
    .eq('activo', true)
    .order('tipo');

  if (error || !data) return [];

  return (data as DocRecord[]).map(transformDocRecord);
});
