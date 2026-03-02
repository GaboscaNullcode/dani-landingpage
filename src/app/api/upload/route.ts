import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function POST(request: Request) {
  try {
    // Auth check
    const supabase = await createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'uploads';

    if (!file) {
      return NextResponse.json(
        { error: 'No se envio ningun archivo' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'El archivo no puede exceder 10 MB' },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Solo se permiten imagenes JPG, PNG o WebP' },
        { status: 400 }
      );
    }

    // Check env vars
    const storageApiKey = process.env.BUNNY_STORAGE_API_KEY;
    const storageZone = process.env.BUNNY_STORAGE_ZONE_NAME;
    const storageBaseUrl = process.env.BUNNY_STORAGE_BASE_URL;
    const cdnBaseUrl = process.env.BUNNY_CDN_BASE_URL;

    if (!storageApiKey || !storageZone || !storageBaseUrl || !cdnBaseUrl) {
      return NextResponse.json(
        { error: 'Configuracion de storage no disponible' },
        { status: 500 }
      );
    }

    // Generate unique filename
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const sanitizedName = file.name
      .replace(/\.[^.]+$/, '')
      .replace(/[^a-zA-Z0-9-_]/g, '-')
      .toLowerCase()
      .slice(0, 50);
    const fileName = `${folder}/${Date.now()}-${sanitizedName}.${ext}`;

    // Upload to Bunny Storage
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadUrl = `${storageBaseUrl}/${storageZone}/${fileName}`;

    const uploadRes = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        AccessKey: storageApiKey,
        'Content-Type': 'application/octet-stream',
      },
      body: buffer,
    });

    if (!uploadRes.ok) {
      throw new Error(`Bunny upload failed: ${uploadRes.status}`);
    }

    const cdnUrl = `${cdnBaseUrl}/${fileName}`;

    return NextResponse.json({ url: cdnUrl });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json(
      { error: 'Error al subir el archivo' },
      { status: 500 }
    );
  }
}
