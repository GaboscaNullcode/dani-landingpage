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
      .from('testimonios_masterclass')
      .select('id, texto, rol, estrellas, red_social, usuario_red_social, avatar_url')
      .eq('usuario_id', user.id)
      .maybeSingle();

    return NextResponse.json({ testimonio });
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
    const { texto, rol, estrellas, redSocial, usuarioRedSocial, consentimiento, avatarUrl } =
      body;

    // Validations
    if (!texto || !rol || !consentimiento) {
      return NextResponse.json(
        { error: 'Texto, rol y consentimiento son requeridos' },
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
        { error: 'El testimonio no puede tener mas de 1000 caracteres' },
        { status: 400 }
      );
    }

    // Get user name from profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('name')
      .eq('id', user.id)
      .single();

    const nombre = profile?.name || user.email?.split('@')[0] || 'Usuaria';

    // Check if user already has a testimonial
    const { data: existing } = await supabase
      .from('testimonios_masterclass')
      .select('id')
      .eq('usuario_id', user.id)
      .maybeSingle();

    if (existing) {
      // Update existing testimonial
      const { error } = await supabase
        .from('testimonios_masterclass')
        .update({
          nombre,
          rol,
          texto,
          estrellas,
          red_social: redSocial || null,
          usuario_red_social: usuarioRedSocial || null,
          avatar_url: avatarUrl || null,
          consentimiento: true,
          activo: false, // Reset to inactive so admin can re-approve
        })
        .eq('usuario_id', user.id);

      if (error) throw error;

      return NextResponse.json({ message: 'Testimonio actualizado' });
    }

    // Insert new testimonial
    const { error } = await supabase
      .from('testimonios_masterclass')
      .insert({
        usuario_id: user.id,
        nombre,
        rol,
        texto,
        estrellas,
        red_social: redSocial || null,
        usuario_red_social: usuarioRedSocial || null,
        avatar_url: avatarUrl || null,
        consentimiento: true,
        activo: false, // Admin must activate
        orden: 999, // Low priority, admin can reorder
      });

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Ya tienes un testimonio registrado' },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json(
      { message: 'Testimonio enviado correctamente' },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Error al guardar el testimonio' },
      { status: 500 }
    );
  }
}
