// Types for programa_contenido table records
export interface ProgramaContenidoRecord {
  id: string;
  created_at: string;
  updated_at: string;
  producto_id: string;
  tipo: 'video' | 'descarga';
  titulo: string;
  descripcion: string;
  embed_url: string | null;
  download_url: string | null;
  duracion: string | null;
  tipo_archivo: 'ebook' | 'workbook' | null;
  es_intro: boolean;
  orden: number;
}

// Frontend models
export interface ProgramaVideo {
  id: string;
  title: string;
  description: string;
  embedUrl: string;
  duration: string;
  orden: number;
  isIntro: boolean;
}

export interface ProgramaDownload {
  id: string;
  title: string;
  description: string;
  downloadUrl: string;
  fileType: 'ebook' | 'workbook';
}

// Transform functions
export function transformToVideo(record: ProgramaContenidoRecord): ProgramaVideo {
  return {
    id: record.id,
    title: record.titulo,
    description: record.descripcion,
    embedUrl: record.embed_url || '',
    duration: record.duracion || '',
    orden: record.orden,
    isIntro: record.es_intro,
  };
}

export function transformToDownload(record: ProgramaContenidoRecord): ProgramaDownload {
  return {
    id: record.id,
    title: record.titulo,
    description: record.descripcion,
    downloadUrl: record.download_url || '',
    fileType: record.tipo_archivo || 'ebook',
  };
}
