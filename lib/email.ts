import { Resend } from 'resend';

// Helper to format currency
const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
};

export async function sendOrderConfirmation(order: any) {
    // If no key in env, try to read it dynamically or fail gracefully with log
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        console.warn("RESEND_API_KEY missing. Skipping email.");
        return;
    }

    const resend = new Resend(apiKey);

    try {
        await resend.emails.send({
            from: 'FMB Decants <onboarding@resend.dev>', // Use verified domain in production if available
            to: [order.customerEmail],
            subject: `Confirmación de Pedido #${order.orderNumber} - FMB Decants`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>Confirmación de Pedido</title>
                    <style>
                        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
                        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                        .header { text-align: center; border-bottom: 2px solid #D4AF37; padding-bottom: 20px; margin-bottom: 30px; }
                        .header h1 { color: #000; font-size: 24px; margin: 0; text-transform: uppercase; letter-spacing: 2px; }
                        .order-info { background-color: #fafafa; padding: 20px; border-radius: 4px; margin-bottom: 30px; border-left: 4px solid #D4AF37; }
                        .order-info h3 { margin-top: 0; color: #333; }
                        .order-info p { margin: 5px 0; color: #555; }
                        .table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                        .table th { text-align: left; border-bottom: 2px solid #eee; padding: 10px; color: #888; font-size: 12px; text-transform: uppercase; }
                        .table td { border-bottom: 1px solid #eee; padding: 15px 10px; color: #333; }
                        .total-row td { border-top: 2px solid #333; font-weight: bold; font-size: 16px; color: #000; }
                        .footer { text-align: center; color: #999; font-size: 12px; margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px; }
                        .address-box { background: #f9f9f9; padding: 15px; border-radius: 4px; font-size: 14px; line-height: 1.5; color: #555; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>FMB Decants</h1>
                        </div>
                        
                        <p style="font-size: 16px; color: #333; line-height: 1.6;">
                            ¡Hola <strong>${order.customerName}</strong>!
                        </p>
                        <p style="font-size: 16px; color: #555; line-height: 1.6;">
                            Gracias por tu compra. Hemos recibido tu pedido correctamente y lo estamos procesando.
                        </p>

                        <div class="order-info">
                            <h3>Pedido #${order.orderNumber}</h3>
                            <p>Fecha: ${new Date(order.createdAt).toLocaleDateString('es-MX')}</p>
                            <p>Estado: <strong>Pagado</strong></p>
                        </div>

                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cant.</th>
                                    <th style="text-align: right;">Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${order.items.map((item: any) => `
                                    <tr>
                                        <td>
                                            <strong>${item.name}</strong><br/>
                                            <span style="font-size: 12px; color: #888;">${item.size}ml</span>
                                        </td>
                                        <td>${item.quantity}</td>
                                        <td style="text-align: right;">${formatMoney(item.price)}</td>
                                    </tr>
                                `).join('')}
                                <tr>
                                    <td colspan="2" style="text-align: right; padding-top: 10px;">Subtotal:</td>
                                    <td style="text-align: right; padding-top: 10px;">${formatMoney(order.subtotal)}</td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="text-align: right;">Envío:</td>
                                    <td style="text-align: right;">${formatMoney(order.shippingCost)}</td>
                                </tr>
                                <tr class="total-row">
                                    <td colspan="2" style="text-align: right; padding-top: 15px;">TOTAL:</td>
                                    <td style="text-align: right; padding-top: 15px; color: #D4AF37;">${formatMoney(order.total)}</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3 style="color: #333; font-size: 18px; margin-bottom: 15px;">Dirección de Envío</h3>
                        <div class="address-box">
                            <strong>${order.shippingAddress.firstName} ${order.shippingAddress.lastName}</strong><br/>
                            ${order.shippingAddress.street} ${order.shippingAddress.exteriorNumber} ${order.shippingAddress.interiorNumber ? 'Int. ' + order.shippingAddress.interiorNumber : ''}<br/>
                            ${order.shippingAddress.colonia}<br/>
                            ${order.shippingAddress.city}, ${order.shippingAddress.state}<br/>
                            CP: ${order.shippingAddress.zipCode}<br/>
                            ${order.shippingAddress.references ? 'Ref: ' + order.shippingAddress.references : ''}
                            <br/><br/>
                            Tel: ${order.shippingAddress.phone}
                        </div>

                        <div class="footer">
                            <p>¿Tienes dudas? Responde a este correo.</p>
                            <p>© ${new Date().getFullYear()} FMB Decants. Todos los derechos reservados.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        });
        console.log("Email sent successfully to", order.customerEmail);
    } catch (error) {
        console.error("Failed to send email:", JSON.stringify(error, null, 2));
    }
}
