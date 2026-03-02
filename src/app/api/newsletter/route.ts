import { NextResponse } from 'next/server';
import type { NewsletterSubscribeRequest, NewsletterSource } from '@/types/newsletter';
import { addNewsletterContact, sendNewsletterWelcomeEmail } from '@/lib/brevo';
import { createOrUpdateSubscriber } from '@/lib/newsletter-service';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as NewsletterSubscribeRequest;

    // Validate required fields
    if (!body.email || !body.name) {
      return NextResponse.json(
        { success: false, message: 'Email y nombre son requeridos' },
        { status: 400 },
      );
    }

    // Normalize email
    body.email = body.email.trim().toLowerCase();
    body.name = body.name.trim();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, message: 'Email no válido' },
        { status: 400 },
      );
    }

    const validSources: NewsletterSource[] = [
      'home',
      'newsletter_page',
      'blog',
      'quiz',
      'recursos_gratuitos',
      'guia_gratuita',
    ];
    const source: NewsletterSource = validSources.includes(body.source)
      ? body.source
      : 'home';

    // 1. Add contact to Brevo (primary)
    const { contactId, alreadySubscribed } = await addNewsletterContact(
      body.email,
      body.name,
    );

    // 2. Store in Supabase (non-critical)
    try {
      await createOrUpdateSubscriber(
        body.email,
        body.name,
        contactId,
        source,
      );
    } catch (dbError) {
      console.error('Newsletter DB save failed (non-critical):', dbError);
    }

    // 3. Send welcome email only for new subscribers
    if (!alreadySubscribed) {
      try {
        await sendNewsletterWelcomeEmail(body.email, body.name);
      } catch (emailError) {
        console.error('Newsletter welcome email failed (non-critical):', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: alreadySubscribed
        ? '¡Ya estabas suscrita! Revisa tu inbox para crear tu cuenta.'
        : '¡Suscripción exitosa! Revisa tu inbox para crear tu cuenta.',
      alreadySubscribed,
    });
  } catch (error: unknown) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, message: 'Hubo un error. Inténtalo de nuevo.' },
      { status: 500 },
    );
  }
}
