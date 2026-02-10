import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { priceId } = await request.json();

    if (!priceId || typeof priceId !== 'string') {
      return NextResponse.json(
        { error: 'Se requiere un priceId válido' },
        { status: 400 },
      );
    }

    const price = await stripe.prices.retrieve(priceId);

    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode: price.recurring ? 'subscription' : 'payment',
      success_url: `${domain}/tienda/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/tienda`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    const message =
      error instanceof Error ? error.message : 'Error interno del servidor';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
