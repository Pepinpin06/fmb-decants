import { NextResponse } from 'next/server';

const { NEXT_PUBLIC_PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const BASE_URL = "https://api-m.sandbox.paypal.com";

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
        const { orderID } = await request.json();
        const accessToken = await generateAccessToken();

        const url = `${BASE_URL}/v2/checkout/orders/${orderID}/capture`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const json = await response.json();
        return NextResponse.json(json);
    } catch (err: any) {
        console.error("PayPal Capture Order Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
