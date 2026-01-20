"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useState } from "react";

const initialOptions = {
    "clientId": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
    currency: "MXN",
    intent: "capture",
};

interface PayPalWrapperProps {
    amount: number;
    onSuccess: (details: any) => void;
}

export default function PayPalWrapper({ amount, onSuccess }: PayPalWrapperProps) {
    const [error, setError] = useState<string | null>(null);

    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

    if (!clientId) {
        return (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm text-center">
                Error de configuración: Falta el Client ID de PayPal.
            </div>
        );
    }

    return (
        <div className="w-full z-0 relative">
            <PayPalScriptProvider options={{ ...initialOptions, clientId }}>
                <PayPalButtons
                    style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay" }}
                    createOrder={async () => {
                        try {
                            const res = await fetch("/api/paypal/create-order", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ total: amount }),
                            });
                            const order = await res.json();
                            if (order.id) return order.id;
                            throw new Error("Order ID missing");
                        } catch (err) {
                            console.error("Create Order Error", err);
                            setError("Error al iniciar el pago con PayPal.");
                            return "";
                        }
                    }}
                    onApprove={async (data, actions) => {
                        try {
                            const res = await fetch("/api/paypal/capture-order", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ orderID: data.orderID }),
                            });
                            const details = await res.json();
                            // Optional: Validate details.status === 'COMPLETED'
                            onSuccess(details);
                        } catch (err) {
                            console.error("Capture Error", err);
                            setError("Error al procesar el pago.");
                        }
                    }}
                    onError={(err) => {
                        console.error("PayPal Button Error", err);
                        setError("Hubo un problema con la conexión a PayPal.");
                    }}
                />
            </PayPalScriptProvider>
            {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        </div>
    );
}
