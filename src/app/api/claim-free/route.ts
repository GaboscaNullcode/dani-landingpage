import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-service';
import { createCompra } from '@/lib/compras-service';
import { getServiceSupabase } from '@/lib/supabase/server';
import { addNewsletterContact, sendNewsletterWelcomeEmail } from '@/lib/brevo';
import { createOrUpdateSubscriber } from '@/lib/newsletter-service';

export async function POST(request: Request) {
  try {
    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: 'productId requerido' },
        { status: 400 },
      );
    }

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 },
      );
    }

    // Check if already claimed
    const supabase = getServiceSupabase();
    const { data: existing } = await supabase
      .from('compras')
      .select('id')
      .eq('usuario', user.id)
      .eq('producto', productId)
      .eq('estado', 'activa')
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ success: true, alreadyOwned: true });
    }

    // Create compra record for free product
    await createCompra(user.id, productId, `free-claim-${Date.now()}`);

    // Subscribe to newsletter and send guide email (non-critical)
    try {
      const { contactId, alreadySubscribed } = await addNewsletterContact(
        user.email,
        user.name,
      );

      await createOrUpdateSubscriber(
        user.email,
        user.name,
        contactId,
        'guia_gratuita',
      );

      if (!alreadySubscribed) {
        await sendNewsletterWelcomeEmail(user.email, user.name);
      }
    } catch (newsletterError) {
      console.error('Newsletter subscription failed (non-critical):', newsletterError);
    }

    return NextResponse.json({ success: true, alreadyOwned: false });
  } catch (error) {
    console.error('Error claiming free product:', error);
    return NextResponse.json(
      { error: 'Error interno' },
      { status: 500 },
    );
  }
}
