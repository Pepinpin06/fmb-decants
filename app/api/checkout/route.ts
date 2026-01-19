import { NextResponse } from 'next/server';
// import { MercadoPagoConfig, Preference } from 'mercadopago';

// const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { items } = body;

        // TODO: Initialize Preference with real items
        /*
        const preference = new Preference(client);
        const result = await preference.create({
          body: {
            items: items.map(item => ({
              title: item.product.name,
              quantity: item.quantity,
              unit_price: item.product.prices[item.size],
            })),
          }
        });
        return NextResponse.json({ id: result.id });
        */

        // Mock ID for now
        return NextResponse.json({ id: 'mock_preference_id' });

    } catch (error) {
        return NextResponse.json({ error: 'Error creating payment preference' }, { status: 500 });
    }
}
