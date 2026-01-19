import { NextResponse } from 'next/server';

const { NEXT_PUBLIC_PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const BASE_URL = "https://api-m.sandbox.paypal.com"; // TODO: Switch to production URL based on env

async function generateAccessToken() {
    if (!NEXT_PUBLIC_PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
        throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
        NEXT_PUBLIC_PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
    ).toString("base64");

    const response = await fetch(`${BASE_URL}/v1/oauth2/token`, {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
            Authorization: `Basic ${auth}`,
        },
    });

    const data = await response.json();
    return data.access_token;
}

export async function POST(request: Request) {
    try {
        const { total } = await request.json(); // Simple simplified architecture

        // In a real app, calculate total on server from items to prevent tampering
        // For this demo, we trust the total passed (or recalculate if we had the DB access here easily)

        const accessToken = await generateAccessToken();
        const url = `${BASE_URL}/v2/checkout/orders`;
        const payload = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "MXN",
                        value: total.toFixed(2),
                    },
                },
            ],
        };

        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            method: "POST",
            body: JSON.stringify(payload),
        });

        const json = await response.json();
        return NextResponse.json(json);
    } catch (err: any) {
        console.error("PayPal Create Order Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
