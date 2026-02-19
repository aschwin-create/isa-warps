import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.log("Contact form submission (email not sent - API key not configured):", {
        name,
        email,
        subject,
      });
      return NextResponse.json(
        { message: "Form received (email functionality will be activated soon)" },
        { status: 200 }
      );
    }

    // Send email using Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    console.log("Attempting to send email to:", "isa@warps.nl");
    console.log("From:", "noreply@isawarps.com");

    const result = await resend.emails.send({
      from: "Isa Warps Website <noreply@isawarps.com>",
      to: "isa@warps.nl",
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>Nieuw contactformulier bericht</h2>
        <p><strong>Van:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Onderwerp:</strong> ${subject}</p>
        <p><strong>Bericht:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    console.log("Email send result:", result);

    return NextResponse.json(
      { message: "Email sent successfully", result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    return NextResponse.json(
      { error: "Failed to send email", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
