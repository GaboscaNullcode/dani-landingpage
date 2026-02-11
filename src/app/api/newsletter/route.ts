import { NextResponse } from 'next/server';
import type { NewsletterSubscribeRequest } from '@/types/newsletter';
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

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, message: 'Email no valido' },
        { status: 400 },
      );
    }

    const validSources = ['home', 'newsletter_page', 'blog', 'quiz'];
    const source = validSources.includes(body.source) ? body.source : 'home';

    // 1. Add contact to Brevo (primary)
    const { contactId, alreadySubscribed } = await addNewsletterContact(
      body.email,
      body.name,
    );

    // 2. Store in PocketBase (non-critical)
    try {
      await createOrUpdateSubscriber(
        body.email,
        body.name,
        contactId,
        source as 'home' | 'newsletter_page' | 'blog' | 'quiz',
      );
    } catch (pbError) {
      console.error('PocketBase newsletter save failed (non-critical):', pbError);
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
        ? 'Ya estabas suscrita! Revisa tu inbox por la guia.'
        : 'Suscripcion exitosa! Revisa tu inbox.',
      alreadySubscribed,
    });
  } catch (error: unknown) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, message: 'Hubo un error. Intentalo de nuevo.' },
      { status: 500 },
    );
  }
}
