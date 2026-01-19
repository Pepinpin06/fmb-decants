"use client";

import { useEffect, useState } from 'react';

export default function AdminPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/orders');
            console.log("Fetch Status:", res.status); // Debug
            if (res.ok) {
                const data = await res.json();
                console.log("Orders Data:", data); // Debug
                setOrders(data);
            } else {
                console.error("Failed to fetch orders");
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple client-side check for demo purposes (Secure this in real app)
        if (password === "admin123") {
            setIsAuthenticated(true);
            fetchOrders();
        } else {
            alert("Contraseña incorrecta");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="bg-card p-8 rounded-lg border border-border space-y-4 w-full max-w-sm">
                    <h1 className="text-2xl font-bold text-white text-center">Admin Access</h1>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        className="w-full p-3 bg-background border border-border rounded text-white"
                    />
                    <button type="submit" className="w-full bg-primary text-black font-bold py-3 rounded">Entrar</button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Panel de Administración</h1>
                    <button onClick={() => setIsAuthenticated(false)} className="text-red-500">Cerrar Sesión</button>
                </div>

                {/* Orders Table */}
                {loading ? (
                    <p className="text-white">Cargando pedidos...</p>
                ) : (
                    <div className="bg-card border border-border rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-400">
                                <thead className="bg-primary/10 text-primary uppercase font-bold">
                                    <tr>
                                        <th className="p-4">Pedido #</th>
                                        <th className="p-4">Fecha</th>
                                        <th className="p-4">Cliente</th>
                                        <th className="p-4">Total</th>
                                        <th className="p-4">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-primary/5 transition-colors">
                                            <td className="p-4 font-bold text-white">#{order.id}</td>
                                            <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td className="p-4">
                                                <div className="font-bold text-white">{order.customerName}</div>
                                                <div className="text-xs">{order.customerEmail}</div>
                                            </td>
                                            <td className="p-4 font-bold text-white">${order.total}</td>
                                            <td className="p-4">
                                                <button
                                                    className="bg-primary text-black px-3 py-1 rounded text-xs font-bold hover:bg-white transition-colors"
                                                    onClick={() => setSelectedOrder(order)}
                                                >
                                                    Ver Detalles
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Detail Modal */}
                {selectedOrder && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
                        <div className="bg-card w-full max-w-2xl rounded-lg border border-primary/50 max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-white">Pedido #{selectedOrder.id}</h2>
                                    <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-white">✕</button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-primary font-bold uppercase tracking-wider text-sm mb-4">Cliente</h3>
                                        <div className="space-y-2 text-gray-300">
                                            <p><span className="text-gray-500">Nombre:</span> {selectedOrder.customerName}</p>
                                            <p><span className="text-gray-500">Email:</span> {selectedOrder.customerEmail}</p>
                                            <p><span className="text-gray-500">Teléfono:</span> <span className="text-white font-mono bg-white/10 px-2 rounded cursor-pointer select-all">{selectedOrder.customerPhone || selectedOrder.shippingAddress?.phone}</span></p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-primary font-bold uppercase tracking-wider text-sm mb-4">Dirección de Envío</h3>
                                        <div className="space-y-2 text-gray-300 bg-black/20 p-4 rounded border border-white/10">
                                            <p><span className="text-gray-500 block text-xs">Calle:</span> {selectedOrder.shippingAddress?.street}</p>
                                            <div className="flex gap-4">
                                                <p><span className="text-gray-500 block text-xs">Ext:</span> {selectedOrder.shippingAddress?.exteriorNumber}</p>
                                                <p><span className="text-gray-500 block text-xs">Int:</span> {selectedOrder.shippingAddress?.interiorNumber || '-'}</p>
                                            </div>
                                            <p><span className="text-gray-500 block text-xs">Colonia:</span> {selectedOrder.shippingAddress?.colonia}</p>
                                            <p><span className="text-gray-500 block text-xs">Referencias:</span> {selectedOrder.shippingAddress?.references || 'Sin referencias'}</p>
                                            <p className="border-t border-white/10 pt-2 mt-2">
                                                {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state}<br />
                                                CP: {selectedOrder.shippingAddress?.zipCode}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-primary font-bold uppercase tracking-wider text-sm mb-4">Productos</h3>
                                    <div className="space-y-2">
                                        {selectedOrder.items.map((item: any) => (
                                            <div key={item.id} className="flex justify-between items-center text-sm p-2 bg-white/5 rounded">
                                                <span className="text-white">{item.quantity}x {item.name} ({item.size}ml)</span>
                                                <span className="text-gray-400">${item.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 flex justify-end text-xl font-bold text-primary">
                                        Total: ${selectedOrder.total}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
