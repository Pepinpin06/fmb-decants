import { NextResponse } from 'next/server';

const { NEXT_PUBLIC_PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const BASE_URL = "https://api-m.paypal.com"; // PRODUCTION URL

async function generateAccessToken() {
    if (!NEXT_PUBLIC_PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
        throw new Error("MISSING_API_CREDENTIALS");
    }

    // Trim credentials to avoid whitespace issues
    const clientId = NEXT_PUBLIC_PAYPAL_CLIENT_ID.trim();
    const clientSecret = PAYPAL_CLIENT_SECRET.trim();

    const auth = Buffer.from(
        clientId + ":" + clientSecret,
    ).toString("base64");

    const response = await fetch(`${BASE_URL}/v1/oauth2/token`, {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
            Authorization: `Basic ${auth}`,
        },
    });

    const data = await response.json();
    if (!response.ok) {
        console.error("PayPal Token Error:", data);
        throw new Error(`AUTH_FAILED: ${data.error_description || data.error}`);
    }
    return data.access_token;
}

export async function POST(request: Request) {
    try {
        const { total } = await request.json();

        const accessToken = await generateAccessToken();
        const url = `${BASE_URL}/v2/checkout/orders`;

        // Ensure total is a string with 2 decimals
        const value = Number(total).toFixed(2);

        const payload = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "MXN",
                        value: value,
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

        if (!response.ok) {
            console.error("PayPal Order Creation Failed:", json);
            const msg = json.details?.[0]?.description || json.message || "Unknown Error";
            return NextResponse.json({ error: `PAYPAL_API: ${msg}` }, { status: 400 });
        }

        return NextResponse.json(json);
    } catch (err: any) {
        console.error("PayPal Create Order Fatal Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
