import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Faltan campos requeridos' },
                { status: 400 }
            );
        }

        const apiKey = process.env.RESEND_API_KEY;

        if (!apiKey) {
            console.error("RESEND_API_KEY is missing");
            return NextResponse.json(
                { error: 'Error de configuración en el servidor' },
                { status: 500 }
            );
        }

        const resend = new Resend(apiKey);

        // Send email to Admin (You)
        const data = await resend.emails.send({
            from: 'FMB Contacto <onboarding@resend.dev>', // Default testing sender
            to: ['fmbdecants@gmail.com'], // Admin email
            replyTo: email, // This allows you to just hit "Reply" to answer the customer
            subject: `Nuevo Mensaje de Contacto: ${name}`,
            html: `
                <h2>Nuevo mensaje desde la web FMB Decants</h2>
                <p><strong>De:</strong> ${name} (${email})</p>
                <p><strong>Mensaje:</strong></p>
                <div style="background-color: #f4f4f4; padding: 15px; border-left: 4px solid #D4AF37;">
                    ${message.replace(/\n/g, '<br>')}
                </div>
            `,
        });

        if (data.error) {
            console.error("Resend Error:", data.error);
            return NextResponse.json({ error: 'Error enviando el correo' }, { status: 500 });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Contact API Error:", error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}
