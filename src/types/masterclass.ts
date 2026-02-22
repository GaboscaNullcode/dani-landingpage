// Supabase record (matches testimonios_masterclass table)
export interface TestimonioMasterclassRecord {
  id: string;
  created_at: string;
  nombre: string;
  rol: string;
  texto: string;
  estrellas: number;
  red_social: string | null;
  usuario_red_social: string | null;
  icono: string;
  activo: boolean;
  orden: number;
  avatar_url: string | null;
}

// Frontend model
export interface TestimonioMasterclass {
  id: string;
  name: string;
  role: string;
  text: string;
  stars: number;
  socialNetwork: string | null;
  socialUsername: string | null;
  icon: string;
  avatarUrl: string | null;
}

// Masterclass content from programa_contenido table
export interface MasterclassContent {
  video: {
    title: string;
    embedUrl: string;
    description: string;
  } | null;
  resources: {
    id: string;
    title: string;
    description: string;
    downloadUrl: string;
    fileType: 'ebook' | 'workbook';
  }[];
}
