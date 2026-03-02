// Supabase record (snake_case, mirrors DB schema)
export interface DocRecord {
  id: string;
  created_at: string;
  updated_at: string;
  tipo: string;
  titulo: string;
  url: string;
  activo: boolean;
}

// Frontend model (camelCase)
export interface Doc {
  id: string;
  tipo: string;
  titulo: string;
  url: string;
}
