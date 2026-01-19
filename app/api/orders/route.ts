import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendOrderConfirmation } from '@/lib/email';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            orderId, // PayPal ID (optional if transfer)
            paymentMethod, // 'paypal' | 'transfer'
            items,
            amount,
            customer,
            shipping
        } = body;

        // Basic validation
        if (!items || !amount || !customer || !shipping) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const isTransfer = paymentMethod === 'transfer';
        const status = isTransfer ? 'PENDING_PAYMENT' : 'PAID';
        const paymentStatus = isTransfer ? 'PENDING' : 'PAID';
        const finalPaymentId = orderId || (isTransfer ? `TRANSFER-${Date.now()}` : 'UNKNOWN');

        // Create Order in DB
        const newOrder = await prisma.order.create({
            data: {
                paymentId: finalPaymentId,
                paymentStatus: paymentStatus,
                status: status,
                subtotal: amount.subtotal || 0, // Simplified
                total: amount.total,
                shippingCost: amount.shipping || 0,

                customerName: `${shipping.firstName} ${shipping.lastName}`,
                customerEmail: shipping.email,
                customerPhone: shipping.phone || "",

                shippingAddress: {
                    create: {
                        firstName: shipping.firstName,
                        lastName: shipping.lastName,
                        email: shipping.email,
                        phone: shipping.phone,
                        street: shipping.street,
                        exteriorNumber: shipping.exteriorNumber || "",
                        interiorNumber: shipping.interiorNumber || "",
                        references: shipping.references || "",
                        colonia: shipping.colonia || "",
                        city: shipping.city,
                        state: shipping.state,
                        zipCode: shipping.zipCode,
                        isOcurre: false // Default for now
                    }
                },

                items: {
                    create: items.map((item: any) => ({
                        productId: item.productId,
                        name: item.product.name,
                        size: item.size,
                        price: item.product.prices[item.size],
                        quantity: item.quantity,
                        image: item.product.images?.[0] || ""
                    }))
                }
            },
            include: {
                items: true,
                shippingAddress: true
            }
        });

        // Send Email (async, don't block response)
        sendOrderConfirmation(newOrder).catch(err => console.error("Email failed:", err));

        return NextResponse.json({ success: true, order: newOrder });

    } catch (error: any) {
        console.error("Error creating order:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(request: Request) {
    // Basic Admin/User fetch (Protected in real app)
    // For now, fetch all descending
    try {
        const orders = await prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                items: true,
                shippingAddress: true
            }
        });
        return NextResponse.json(orders);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
