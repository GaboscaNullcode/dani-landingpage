import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { priceId, productId } = await request.json();

    if (!priceId || typeof priceId !== 'string') {
      return NextResponse.json(
        { error: 'Se requiere un priceId valido' },
        { status: 400 },
      );
    }

    const price = await stripe.prices.retrieve(priceId);
    const isSubscription = !!price.recurring;

    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode: isSubscription ? 'subscription' : 'payment',
      success_url: `${domain}/tienda/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/tienda`,
      ...(isSubscription ? {} : { customer_creation: 'always' }),
      metadata: {
        productId: productId || '',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    const message =
      error instanceof Error ? error.message : 'Error interno del servidor';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
