"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState, useEffect } from "react";

interface PayPalWrapperProps {
    amount: number;
    onSuccess: (details: any) => void;
}

export default function PayPalWrapper({ amount, onSuccess }: PayPalWrapperProps) {
    const [error, setError] = useState<string | null>(null);
    const [clientId, setClientId] = useState<string | null>(null);

    useEffect(() => {
        // Safe check for env var on client side mount
        const key = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
        if (key) {
            setClientId(key.trim());
        } else {
            setError("Falta la CLAVE DE CLIENTE (NEXT_PUBLIC_PAYPAL_CLIENT_ID).");
        }
    }, []);

    if (error) {
        return (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm text-center">
                Error: {error}
            </div>
        );
    }

    if (!clientId) {
        return <div className="text-white/50 text-center text-xs animate-pulse">Cargando pagos...</div>;
    }

    const options = {
        "clientId": clientId,
        currency: "MXN",
        intent: "capture",
    };

    return (
        <div className="w-full z-0 relative">
            <PayPalScriptProvider options={options}>
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

                            if (!res.ok) {
                                throw new Error(order.error || "Error desconocido en el servidor");
                            }

                            if (order.id) return order.id;
                            throw new Error("Order ID missing");
                        } catch (err: any) {
                            console.error("Create Order Error", err);
                            // Show the actual error message from the server
                            setError(err.message || "Error al iniciar el pago con PayPal.");
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
                            onSuccess(details);
                        } catch (err) {
                            console.error("Capture Error", err);
                            setError("Error al procesar el pago.");
                        }
                    }}
                    onError={(err) => {
                        console.error("PayPal Button Error", err);
                        setError("Problema de conexión con PayPal.");
                    }}
                />
            </PayPalScriptProvider>
            {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        </div>
    );
}
