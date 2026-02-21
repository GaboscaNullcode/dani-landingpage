import { NextResponse } from 'next/server';
import { getCurrentUser, updateStripeCustomerId } from '@/lib/auth-service';
import { getUserCompras } from '@/lib/compras-service';
import { getStripe } from '@/lib/stripe';

export async function POST() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    let customerId = user.stripeCustomerId;

    // If no stripe_customer_id on profile, resolve it from an active subscription
    if (!customerId) {
      const compras = await getUserCompras(user.id);
      const subscriptionCompra = compras.find(
        (c) => c.stripeSubscriptionId && c.estado === 'activa',
      );

      if (subscriptionCompra?.stripeSubscriptionId) {
        const subscription = await getStripe().subscriptions.retrieve(
          subscriptionCompra.stripeSubscriptionId,
        );
        customerId = subscription.customer as string;

        // Save it to the profile for future use
        await updateStripeCustomerId(user.id, customerId);
      }
    }

    if (!customerId) {
      return NextResponse.json(
        { error: 'No se encontro un cliente de Stripe asociado a tu cuenta' },
        { status: 400 },
      );
    }

    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';

    const session = await getStripe().billingPortal.sessions.create({
      customer: customerId,
      return_url: `${domain}/mi-cuenta`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating portal session:', error);
    const message =
      error instanceof Error ? error.message : 'Error interno del servidor';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
