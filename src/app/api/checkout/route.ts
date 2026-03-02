import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getProductById, getPaymentPlans } from '@/lib/tienda-service';

export async function POST(request: NextRequest) {
  try {
    const { priceId, productId, customerEmail, customerName, isAsesoria, isCommunity, planId } =
      await request.json();

    if (!priceId || typeof priceId !== 'string') {
      return NextResponse.json(
        { error: 'Se requiere un priceId válido' },
        { status: 400 },
      );
    }

    // Validate customerEmail format if provided
    if (customerEmail && typeof customerEmail === 'string') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(customerEmail)) {
        return NextResponse.json(
          { error: 'Formato de email inválido' },
          { status: 400 },
        );
      }
    }

    // Validate productId when provided — ensure the priceId belongs to this product
    if (productId && typeof productId === 'string') {
      const product = await getProductById(productId);
      if (product) {
        // Collect all valid price IDs for this product
        const validPrices: string[] = [];
        if (product.stripe_price_id) validPrices.push(product.stripe_price_id);
        if (product.stripe_price_id_descuento) validPrices.push(product.stripe_price_id_descuento);

        // Also check child payment plans (split payments)
        const plans = await getPaymentPlans(productId);
        for (const p of plans) {
          if (p.stripePriceId) validPrices.push(p.stripePriceId);
        }

        // If the product has known prices, the submitted priceId must be one of them
        if (validPrices.length > 0 && !validPrices.includes(priceId)) {
          return NextResponse.json(
            { error: 'El precio no corresponde al producto' },
            { status: 400 },
          );
        }
      }
    }

    const stripeClient = getStripe();
    const price = await stripeClient.prices.retrieve(priceId);
    const isSubscription = !!price.recurring;

    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';

    // Determine success/cancel URLs based on checkout type
    let successUrl: string;
    let cancelUrl: string;

    if (isCommunity) {
      cancelUrl = `${domain}/ruta-recomendada`;
    } else if (isAsesoria) {
      cancelUrl = `${domain}/asesorias`;
    } else {
      cancelUrl = `${domain}/tienda`;
    }

    // Fetch product once if needed (avoid duplicate calls)
    const producto = isAsesoria && productId ? await getProductById(productId) : null;

    if (isCommunity) {
      successUrl = `${domain}/comunidad/gracias?session_id={CHECKOUT_SESSION_ID}`;
    } else if (isAsesoria && producto) {
      if (producto.producto_padre) {
        // Child product (split payment)
        if (producto.orden === 1) {
          successUrl = `${domain}/asesorias/gracias-pago1`;
        } else {
          successUrl = `${domain}/asesorias/gracias`;
        }
      } else {
        // Parent product — check if Programa Intensivo (has children)
        const childPlans = await getPaymentPlans(productId);
        if (childPlans.length > 0) {
          successUrl = `${domain}/asesorias/gracias-completo`;
        } else {
          successUrl = `${domain}/asesorias/gracias`;
        }
      }
    } else if (isAsesoria) {
      successUrl = `${domain}/asesorias/gracias`;
    } else {
      successUrl = `${domain}/tienda/exito?session_id={CHECKOUT_SESSION_ID}`;
    }

    // Derive planId when isAsesoria but planId is missing
    let resolvedPlanId = planId || '';
    if (isAsesoria && !resolvedPlanId && producto) {
      if (producto.producto_padre) {
        resolvedPlanId = producto.producto_padre;
      } else {
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
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 },
    );
  }
}
