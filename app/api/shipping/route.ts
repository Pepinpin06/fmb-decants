import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { zipcode, items } = body;

        if (!zipcode || zipcode.length !== 5) {
            return NextResponse.json({ error: 'Código postal inválido' }, { status: 400 });
        }

        const originZip = process.env.NEXT_PUBLIC_SHIPPING_ORIGIN_ZIP || '14330';

        // Weight calculation based on user data
        // Packaging (bag) ~ 6g
        // 3ml ~ 10g, 5ml ~ 12g, 10ml ~ 22g (estimated/provided)
        const packagingWeight = 6;
        const weightGrams = items.reduce((acc: number, item: any) => {
            const perItemWeight = item.size === 10 ? 22 : item.size === 5 ? 12 : 10;
            return acc + (perItemWeight * item.quantity);
        }, packagingWeight);

        // Verified V2 Payload Structure
        // https://apienviosperros.docs.apiary.io/#reference/cotizaciones/shipping-rates
        // Dimensions: 151mm x 108mm x 19mm -> 15cm x 11cm x 2cm
        const payload = {
            origin: { codePostal: originZip },
            destination: { codePostal: zipcode },
            depth: 15,
            width: 11,
            height: 2,
            weight: Math.max(1, Math.ceil(weightGrams / 1000))
        };

        console.log("Sending to Envios Perros (V2 Verified):", JSON.stringify(payload));

        const res = await fetch('https://app.enviosperros.com/api/v2/shipping/rates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${process.env.ENVIOS_PERROS_API_KEY}`
            },
            body: JSON.stringify(payload)
        });

        console.log("Response Status:", res.status);
        const responseText = await res.text();
        console.log("Response Body:", responseText);

        if (!res.ok) {
            console.error("Envios Perros Error Structure:", responseText);
            throw new Error(`API Error: ${responseText}`);
        }

        const data = JSON.parse(responseText);

        // Envios Perros V2 returns { message: [ ... options ... ] }
        const options = data.message || [];

        // Find cheapest option
        if (options && options.length > 0) {
            // Filter only available options
            const availableOptions = options.filter((opt: any) => opt.available);

            if (availableOptions.length === 0) {
                return NextResponse.json({ error: 'No hay paqueterías disponibles para esta zona.' }, { status: 404 });
            }

            // Return all available options
            const rates = availableOptions.map((opt: any) => ({
                provider: opt.deliveryType.company,
                service_level: opt.deliveryType.feature,
                days: opt.deliveryType.feature,
                price: parseFloat(opt.cost),
                currency: 'MXN',
                rating: 5
            })).sort((a: any, b: any) => a.price - b.price);

            return NextResponse.json({ rates });
        }

        return NextResponse.json({ error: 'No shipping options found' }, { status: 404 });

    } catch (error: any) {
        console.error("Critical Error in Shipping Route:", error);
        // Return the actual error message to the client for debugging
        return NextResponse.json({ error: `Error interno: ${error.message}` }, { status: 500 });
    }
}
