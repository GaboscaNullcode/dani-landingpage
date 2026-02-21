import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getProductById, getPaymentPlans } from '@/lib/tienda-service';

export async function POST(request: NextRequest) {
  try {
    const { priceId, productId, customerEmail, customerName, isAsesoria, planId } =
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

    // Determine success/cancel URLs based on checkout type
    let successUrl: string;
    const cancelUrl = isAsesoria ? `${domain}/asesorias` : `${domain}/tienda`;

    if (isAsesoria && productId) {
      const producto = await getProductById(productId);
      if (producto?.producto_padre) {
        // Child product (split payment)
        if (producto.orden === 1) {
          successUrl = `${domain}/asesorias/gracias-pago1`;
        } else {
          successUrl = `${domain}/asesorias/agendar?session_id={CHECKOUT_SESSION_ID}`;
        }
      } else if (producto) {
        // Parent product — check if Programa Intensivo (has children)
        const childPlans = await getPaymentPlans(productId);
        if (childPlans.length > 0) {
          successUrl = `${domain}/asesorias/gracias-completo`;
        } else {
          successUrl = `${domain}/asesorias/agendar?session_id={CHECKOUT_SESSION_ID}`;
        }
      } else {
        successUrl = `${domain}/asesorias/agendar?session_id={CHECKOUT_SESSION_ID}`;
      }
    } else if (isAsesoria) {
      successUrl = `${domain}/asesorias/agendar?session_id={CHECKOUT_SESSION_ID}`;
    } else {
      successUrl = `${domain}/tienda/exito?session_id={CHECKOUT_SESSION_ID}`;
    }

    // Derive planId when isAsesoria but planId is missing
    let resolvedPlanId = planId || '';
    if (isAsesoria && !resolvedPlanId && productId) {
      const producto = await getProductById(productId);
      if (producto?.producto_padre) {
        resolvedPlanId = producto.producto_padre;
      } else if (producto) {
        resolvedPlanId = productId;
      }
    }

    const session = await stripeClient.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode: isSubscription ? 'subscription' : 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      ...(isSubscription ? {} : { customer_creation: 'always' }),
      ...(customerEmail ? { customer_email: customerEmail } : {}),
      metadata: {
        productId: productId || '',
        customerName: customerName || '',
        ...(isAsesoria ? { isAsesoria: 'true', planId: resolvedPlanId } : {}),
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
