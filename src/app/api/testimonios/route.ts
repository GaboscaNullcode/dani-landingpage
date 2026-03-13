import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const { data: testimonio } = await supabase
      .from('testimonios')
      .select('id, texto, rol, estrellas, red_social, usuario_red_social, avatar_url, es_anonimo')
      .eq('usuario_id', user.id)
      .maybeSingle();

    // Fetch associated product ID if testimonial exists
    let productoId: string | null = null;
    if (testimonio) {
      const { data: link } = await supabase
        .from('producto_testimonios')
        .select('producto_id')
        .eq('testimonio_id', testimonio.id)
        .maybeSingle();
      productoId = link?.producto_id ?? null;
    }

    return NextResponse.json({ testimonio, productoId });
  } catch {
    return NextResponse.json(
      { error: 'Error al obtener testimonio' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const body = await request.json();
    const { texto, rol, estrellas, redSocial, usuarioRedSocial, consentimiento, avatarUrl, productoId, esAnonimo } =
      body;

    // Validations
    if (!texto || !rol || !consentimiento) {
      return NextResponse.json(
        { error: 'Texto, rol y consentimiento son requeridos' },
        { status: 400 }
      );
    }

    if (!productoId) {
      return NextResponse.json(
        { error: 'Debes seleccionar un producto' },
        { status: 400 }
      );
    }

    if (
      typeof estrellas !== 'number' ||
      estrellas < 1 ||
      estrellas > 5
    ) {
      return NextResponse.json(
        { error: 'Las estrellas deben ser entre 1 y 5' },
        { status: 400 }
      );
    }

    if (texto.length > 1000) {
      return NextResponse.json(
        { error: 'El testimonio no puede tener más de 1000 caracteres' },
        { status: 400 }
      );
    }

    // Get user name from profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('name')
      .eq('id', user.id)
      .single();

    const isAnonymous = Boolean(esAnonimo);
    const nombre = isAnonymous
      ? 'Anónimo'
      : profile?.name || user.email?.split('@')[0] || 'Usuaria';

    // Check if user already has a testimonial
    const { data: existing } = await supabase
      .from('testimonios')
      .select('id')
      .eq('usuario_id', user.id)
      .maybeSingle();

    let testimonioId: string;

    if (existing) {
      // Update existing testimonial
      const { error } = await supabase
        .from('testimonios')
        .update({
          nombre,
          rol,
          texto,
          estrellas,
          red_social: isAnonymous ? null : redSocial || null,
          usuario_red_social: isAnonymous ? null : usuarioRedSocial || null,
          avatar_url: isAnonymous ? null : avatarUrl || null,
          consentimiento: true,
          es_anonimo: isAnonymous,
          activo: false, // Reset to inactive so admin can re-approve
        })
        .eq('usuario_id', user.id);

      if (error) throw error;
      testimonioId = existing.id;
    } else {
      // Insert new testimonial
      const { data: inserted, error } = await supabase
        .from('testimonios')
        .insert({
          usuario_id: user.id,
          nombre,
          rol,
          texto,
          estrellas,
          red_social: isAnonymous ? null : redSocial || null,
          usuario_red_social: isAnonymous ? null : usuarioRedSocial || null,
          avatar_url: isAnonymous ? null : avatarUrl || null,
          consentimiento: true,
          es_anonimo: isAnonymous,
          activo: false, // Admin must activate
          orden: 999, // Low priority, admin can reorder
        })
        .select('id')
        .single();

      if (error) {
        if (error.code === '23505') {
          return NextResponse.json(
            { error: 'Ya tienes un testimonio registrado' },
            { status: 409 }
          );
        }
        throw error;
      }

      testimonioId = inserted.id;
    }

    // Upsert product link: remove old link, insert new one
    await supabase
      .from('producto_testimonios')
      .delete()
      .eq('testimonio_id', testimonioId);

    const { error: linkError } = await supabase
      .from('producto_testimonios')
      .insert({
        producto_id: productoId,
        testimonio_id: testimonioId,
        orden: 999,
      });

    if (linkError) {
      console.error('Error linking testimonial to product:', linkError);
    }

    return NextResponse.json(
      { message: existing ? 'Testimonio actualizado' : 'Testimonio enviado correctamente' },
      { status: existing ? 200 : 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Error al guardar el testimonio' },
      { status: 500 }
    );
  }
}
