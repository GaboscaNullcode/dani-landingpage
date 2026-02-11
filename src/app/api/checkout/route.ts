import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { priceId, productId, customerEmail, customerName } =
      await request.json();

    if (!priceId || typeof priceId !== 'string') {
      return NextResponse.json(
        { error: 'Se requiere un priceId valido' },
        { status: 400 },
      );
    }

    const stripeClient = getStripe();
    const price = await stripeClient.prices.retrieve(priceId);
    const isSubscription = !!price.recurring;

    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';

    const session = await stripeClient.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode: isSubscription ? 'subscription' : 'payment',
      success_url: `${domain}/tienda/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/tienda`,
      ...(isSubscription ? {} : { customer_creation: 'always' }),
      ...(customerEmail ? { customer_email: customerEmail } : {}),
      metadata: {
        productId: productId || '',
        customerName: customerName || '',
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
