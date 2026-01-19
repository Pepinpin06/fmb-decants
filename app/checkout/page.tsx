"use client";

import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import { Check, Truck, CreditCard, Lock, ChevronRight, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PayPalWrapper from "@/components/PayPalWrapper";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// InputField moved OUTSIDE the component to prevent re-renders losing focus
const InputField = ({ label, value, onChange, error, className, ...props }: any) => (
    <div className={cn("flex flex-col gap-1.5", className)}>
        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">{label}</label>
        <input
            {...props}
            value={value}
            onChange={onChange}
            className={cn(
                "bg-white/5 border border-white/10 p-3 text-white rounded-md focus:outline-none focus:border-primary/50 transition-colors",
                error ? "border-red-500/50" : ""
            )}
        />
    </div>
);

export default function CheckoutPage() {
    const router = useRouter();
    const { items, subtotal, clearCart } = useCart();
    const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
    const [shippingCost, setShippingCost] = useState<number | null>(null);
    const [zipCode, setZipCode] = useState("");
    const [loadingShipping, setLoadingShipping] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Shipping Options State
    const [shippingOptions, setShippingOptions] = useState<any[]>([]);
    const [selectedOption, setSelectedOption] = useState<any>(null);
    const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'transfer'>('paypal');
    const [processingOrder, setProcessingOrder] = useState(false);

    // Address State
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [exteriorNumber, setExteriorNumber] = useState("");
    const [interiorNumber, setInteriorNumber] = useState("");
    const [references, setReferences] = useState("");
    const [colonias, setColonias] = useState<string[]>([]);
    const [selectedColonia, setSelectedColonia] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [loadingAddress, setLoadingAddress] = useState(false);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    // Auto-fill Address
    const fetchAddressInfo = async (cp: string) => {
        if (cp.length !== 5) return;
        setLoadingAddress(true);
        setColonias([]);
        setCity("");
        setState("");

        try {
            const res = await fetch(`https://api.zippopotam.us/mx/${cp}`);
            if (!res.ok) throw new Error("CP no encontrado");
            const data = await res.json();
            const places = data.places || [];
            const cols = places.map((p: any) => p['place name']);
            const mainPlace = places[0];

            setColonias(cols);
            if (cols.length > 0) setSelectedColonia(cols[0]);

            setState(mainPlace['state']);
            setCity(mainPlace['state']);

        } catch (e) {
            console.error(e);
        } finally {
            setLoadingAddress(false);
        }
    };

    // Shipping Calculation
    const calculateShipping = async () => {
        if (zipCode.length !== 5) return;
        setLoadingShipping(true);
        setErrorMsg(null);
        setShippingOptions([]);
        setShippingCost(null);
        setSelectedOption(null);

        try {
            const res = await fetch('/api/shipping', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ zipcode: zipCode, items })
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Error en el servidor");
            }

            if (data.rates && data.rates.length > 0) {
                setShippingOptions(data.rates);
            } else if (data.price) {
                setShippingCost(data.price);
            } else {
                setErrorMsg("No se encontraron opciones para este CP.");
            }
        } catch (e: any) {
            console.error(e);
            setErrorMsg(e.message || "Error al cotizar. Intenta nuevamente.");
        } finally {
            setLoadingShipping(false);
        }
    };

    const handleSelectShipping = (option: any) => {
        setSelectedOption(option);
        setShippingCost(option.price);
    };

    const total = subtotal + (shippingCost || 0);

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-950">
                <div className="text-center">
                    <h1 className="text-3xl font-serif font-bold text-white mb-4">Tu carrito está vacío</h1>
                    <p className="text-gray-400 mb-8">Agrega fragancias para continuar.</p>
                    <button onClick={() => router.push('/catalog')} className="text-primary hover:underline">
                        Volver al catálogo
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-950 pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Header Steps */}
                <div className="flex items-center gap-4 text-sm font-medium mb-12">
                    <span className={cn("flex items-center gap-2", step === 'shipping' ? "text-primary" : "text-white")}>
                        <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs">1</span>
                        Envío
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                    <span className={cn("flex items-center gap-2", step === 'payment' ? "text-primary" : "text-gray-600")}>
                        <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs">2</span>
                        Pago
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* Left Column: Form */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {step === 'shipping' ? (
                                <div className="space-y-8">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-serif font-bold text-white">Información de Envío</h2>
                                        {/* Optional Login Prompt */}
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <InputField
                                            label="Nombre"
                                            value={firstName}
                                            onChange={(e: any) => setFirstName(e.target.value)}
                                            error={formErrors.includes('firstName')}
                                        />
                                        <InputField
                                            label="Apellidos"
                                            value={lastName}
                                            onChange={(e: any) => setLastName(e.target.value)}
                                            error={formErrors.includes('lastName')}
                                        />
                                        <InputField
                                            label="Email"
                                            type="email"
                                            value={email}
                                            onChange={(e: any) => setEmail(e.target.value)}
                                            className="col-span-2"
                                            error={formErrors.includes('email')}
                                        />
                                        <InputField
                                            label="Teléfono"
                                            type="tel"
                                            value={phone}
                                            onChange={(e: any) => setPhone(e.target.value)}
                                            className="col-span-2"
                                            error={formErrors.includes('phone')}
                                        />
                                        <InputField
                                            label="Calle"
                                            value={street}
                                            onChange={(e: any) => setStreet(e.target.value)}
                                            className="col-span-2"
                                            error={formErrors.includes('street')}
                                        />
                                        <InputField
                                            label="Número Exterior"
                                            value={exteriorNumber}
                                            onChange={(e: any) => setExteriorNumber(e.target.value)}
                                            error={formErrors.includes('exteriorNumber')}
                                        />
                                        <InputField
                                            label="Número Interior (Opc)"
                                            value={interiorNumber}
                                            onChange={(e: any) => setInteriorNumber(e.target.value)}
                                        />

                                        <div className="col-span-2 grid grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Código Postal</label>
                                                <div className="relative">
                                                    <input
                                                        value={zipCode}
                                                        onChange={(e) => {
                                                            const newZip = e.target.value;
                                                            setZipCode(newZip);

                                                            // RESET SHIPPING LOGIC
                                                            setShippingCost(null);
                                                            setSelectedOption(null);
                                                            setShippingOptions([]);

                                                            if (newZip.length === 5) fetchAddressInfo(newZip);
                                                        }}
                                                        maxLength={5}
                                                        className={cn(
                                                            "w-full bg-white/5 border border-white/10 p-3 text-white rounded-md focus:outline-none focus:border-primary/50 transition-colors",
                                                            formErrors.includes('zipCode') ? "border-red-500/50" : ""
                                                        )}
                                                    />
                                                    {zipCode.length === 5 && !shippingCost && (
                                                        <button
                                                            onClick={calculateShipping}
                                                            disabled={loadingShipping}
                                                            className="absolute right-1 top-1 bottom-1 px-4 bg-primary text-black text-xs font-bold uppercase rounded hover:bg-white transition-colors disabled:opacity-50"
                                                        >
                                                            {loadingShipping ? "..." : "Cotizar"}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Colonia</label>
                                                {colonias.length > 1 ? (
                                                    <select
                                                        value={selectedColonia}
                                                        onChange={(e) => setSelectedColonia(e.target.value)}
                                                        className="bg-neutral-900 border border-white/10 p-3 text-white rounded-md focus:outline-none focus:border-primary/50"
                                                    >
                                                        {colonias.map(c => <option key={c} value={c}>{c}</option>)}
                                                    </select>
                                                ) : (
                                                    <input
                                                        value={selectedColonia}
                                                        onChange={(e) => setSelectedColonia(e.target.value)}
                                                        className="bg-white/5 border border-white/10 p-3 text-white rounded-md focus:outline-none focus:border-primary/50"
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        <InputField
                                            label="Ciudad"
                                            value={city}
                                            onChange={(e: any) => setCity(e.target.value)}
                                            error={formErrors.includes('city')}
                                        />
                                        <InputField
                                            label="Estado"
                                            value={state}
                                            onChange={(e: any) => setState(e.target.value)}
                                            error={formErrors.includes('state')}
                                        />
                                        <InputField
                                            label="Referencias"
                                            value={references}
                                            onChange={(e: any) => setReferences(e.target.value)}
                                            className="col-span-2"
                                        />
                                    </div>

                                    {/* Shipping Selection UI */}
                                    {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

                                    {shippingOptions.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="pt-6 border-t border-white/10"
                                        >
                                            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Opciones de Envío</h3>
                                            <div className="grid gap-3">
                                                {shippingOptions.map((opt, idx) => (
                                                    <div
                                                        key={idx}
                                                        onClick={() => handleSelectShipping(opt)}
                                                        className={cn(
                                                            "relative p-4 border rounded-lg cursor-pointer transition-all flex justify-between items-center group",
                                                            selectedOption?.provider === opt.provider && selectedOption?.price === opt.price
                                                                ? "bg-primary/10 border-primary"
                                                                : "bg-white/5 border-white/10 hover:border-primary/50"
                                                        )}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={cn(
                                                                "w-4 h-4 rounded-full border flex items-center justify-center transition-colors",
                                                                selectedOption?.provider === opt.provider && selectedOption?.price === opt.price
                                                                    ? "border-primary"
                                                                    : "border-gray-500 group-hover:border-primary/50"
                                                            )}>
                                                                {selectedOption?.provider === opt.provider && selectedOption?.price === opt.price && (
                                                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                                                )}
                                                            </div>
                                                            <div>
                                                                <span className="block font-bold text-white uppercase text-sm">{opt.provider}</span>
                                                                <span className="text-xs text-gray-400">{opt.service_level}</span>
                                                            </div>
                                                        </div>
                                                        <span className="font-bold text-white text-sm">${opt.price}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {shippingCost !== null && (
                                        <button
                                            onClick={() => {
                                                const errors: string[] = [];
                                                if (!firstName) errors.push('firstName');
                                                if (!lastName) errors.push('lastName');
                                                if (!email || !email.includes('@')) errors.push('email');
                                                if (!phone) errors.push('phone');
                                                if (!street) errors.push('street');
                                                if (!exteriorNumber) errors.push('exteriorNumber');
                                                if (!selectedColonia) errors.push('colonia');
                                                if (!city) errors.push('city');
                                                if (!state) errors.push('state');
                                                if (!zipCode) errors.push('zipCode');

                                                setFormErrors(errors);

                                                if (errors.length > 0) {
                                                    alert("Por favor completa los campos requeridos.");
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    return;
                                                }
                                                setStep('payment');
                                            }}
                                            className="w-full py-4 bg-primary text-black font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-[1.00] transition-all"
                                        >
                                            Continuar al Pago
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-serif font-bold text-white">Método de Pago</h2>
                                        <button onClick={() => setStep('shipping')} className="text-xs text-primary underline">Volver a datos</button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <button
                                            onClick={() => setPaymentMethod('paypal')}
                                            className={cn(
                                                "p-4 border rounded-xl flex flex-col items-center gap-2 transition-all",
                                                paymentMethod === 'paypal' ? "bg-primary/10 border-primary text-primary" : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                                            )}
                                        >
                                            <CreditCard className="w-6 h-6" />
                                            <span className="font-bold text-sm">PayPal / Tarjeta</span>
                                        </button>
                                        <button
                                            onClick={() => setPaymentMethod('transfer')}
                                            className={cn(
                                                "p-4 border rounded-xl flex flex-col items-center gap-2 transition-all",
                                                paymentMethod === 'transfer' ? "bg-primary/10 border-primary text-primary" : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                                            )}
                                        >
                                            <span className="font-serif italic text-lg opacity-80">$</span>
                                            <span className="font-bold text-sm">Transferencia</span>
                                        </button>
                                    </div>

                                    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                                        {paymentMethod === 'paypal' ? (
                                            <>
                                                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                                                    <ShieldCheck className="w-5 h-5 text-primary" />
                                                    <span className="text-sm text-gray-300">Pagos procesados de forma segura por PayPal.</span>
                                                </div>
                                                <PayPalWrapper
                                                    amount={total}
                                                    onSuccess={async (details: any) => {
                                                        try {
                                                            const orderData = {
                                                                orderId: details.id,
                                                                paymentMethod: 'paypal',
                                                                items: items,
                                                                amount: { total, subtotal, shipping: shippingCost },
                                                                shipping: { firstName, lastName, email, phone, street, exteriorNumber, interiorNumber, references, colonia: selectedColonia, city, state, zipCode },
                                                                customer: { name: `${firstName} ${lastName}`, email: email }
                                                            };

                                                            const res = await fetch('/api/orders', { method: 'POST', body: JSON.stringify(orderData) });
                                                            if (res.ok) {
                                                                clearCart();
                                                                router.push('/orders');
                                                            }
                                                        } catch (e) { console.error(e); alert("Error."); }
                                                    }}
                                                />
                                            </>
                                        ) : (
                                            <div className="space-y-6">
                                                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                                                    <h3 className="font-bold text-primary mb-2">Instrucciones:</h3>
                                                    <p className="text-sm text-gray-300 mb-4">
                                                        Realiza tu pedido y envía la captura de tu transferencia o depósito por mensaje directo en nuestras redes sociales.
                                                    </p>
                                                    <div className="flex flex-col gap-3">
                                                        <a href="https://www.instagram.com/fmbdecants?igsh=MTY3NnhqbHVheHAydQ==" target="_blank" className="flex items-center gap-2 text-sm text-white hover:text-primary transition-colors">
                                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                                                            </div>
                                                            Enviar por Instagram
                                                        </a>
                                                        <a href="https://www.tiktok.com/@fmb_decants?_r=1&_t=ZS-93Bec3QcNfx" target="_blank" className="flex items-center gap-2 text-sm text-white hover:text-primary transition-colors">
                                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                                                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                                                </svg>
                                                            </div>
                                                            Enviar por TikTok
                                                        </a>
                                                        <a href="mailto:soporte@fmbdecants.com" className="flex items-center gap-2 text-sm text-white hover:text-primary transition-colors">
                                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                                            </div>
                                                            Enviar por Correo
                                                        </a>
                                                    </div>
                                                </div>

                                                <button
                                                    disabled={processingOrder}
                                                    onClick={async () => {
                                                        setProcessingOrder(true);
                                                        try {
                                                            const orderData = {
                                                                orderId: null,
                                                                paymentMethod: 'transfer',
                                                                items: items,
                                                                amount: { total, subtotal, shipping: shippingCost },
                                                                shipping: { firstName, lastName, email, phone, street, exteriorNumber, interiorNumber, references, colonia: selectedColonia, city, state, zipCode },
                                                                customer: { name: `${firstName} ${lastName}`, email: email }
                                                            };

                                                            const res = await fetch('/api/orders', { method: 'POST', body: JSON.stringify(orderData) });
                                                            if (res.ok) {
                                                                clearCart();
                                                                router.push('/orders');
                                                            } else {
                                                                alert("Error al crear el pedido. Intenta nuevamente.");
                                                            }
                                                        } catch (e) {
                                                            console.error(e);
                                                            alert("Error de conexión.");
                                                        } finally {
                                                            setProcessingOrder(false);
                                                        }
                                                    }}
                                                    className="w-full py-4 bg-primary text-black font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-[1.00] transition-all disabled:opacity-50"
                                                >
                                                    {processingOrder ? "Procesando..." : "Confirmar Pedido"}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Right Column: Sticky Summary */}
                    <div className="lg:col-span-5 hidden lg:block">
                        <div className="sticky top-32 bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm">
                            <h3 className="font-serif font-bold text-xl text-white mb-6">Resumen del Pedido</h3>
                            <div className="space-y-4 custom-scrollbar max-h-[400px] overflow-auto pr-2">
                                {items.map((item) => (
                                    <div key={`${item.productId}-${item.size}`} className="flex gap-4">
                                        <div className="relative w-16 h-16 bg-neutral-900 rounded border border-white/10 overflow-hidden shrink-0">
                                            <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-black text-[10px] font-bold flex items-center justify-center rounded-full">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-white leading-tight">{item.product.name}</p>
                                            <p className="text-xs text-gray-400 mt-1">{item.size}ml</p>
                                        </div>
                                        <span className="text-sm font-medium text-white">${item.product.prices[item.size] * item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-white/10 mt-6 pt-6 space-y-3">
                                <div className="flex justify-between text-sm text-gray-400">
                                    <span>Subtotal</span>
                                    <span>${subtotal}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-400">
                                    <span>Envío</span>
                                    <span>{shippingCost ? `$${shippingCost}` : (zipCode.length === 5 ? 'Calculando...' : '---')}</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-primary pt-3 mt-3 border-t border-white/10">
                                    <span>Total</span>
                                    <span>${total}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
