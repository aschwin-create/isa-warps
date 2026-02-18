import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { companyName, contactPerson, email, phone, tierInterest, message } =
      body;

    // Validate required fields
    if (
      !companyName ||
      !contactPerson ||
      !email ||
      !tierInterest ||
      !message
    ) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Map tier to readable name
    const tierNames: Record<string, string> = {
      premium: "Premium Partner",
      official: "Official Partner",
      supporting: "Supporting Partner",
    };

    const tierName = tierNames[tierInterest] || tierInterest;

    // Send email using Resend
    await resend.emails.send({
      from: "Isa Warps Website <noreply@isawarps.com>",
      to: "info@isawarps.com",
      replyTo: email,
      subject: `Partnership Aanvraag: ${tierName}`,
      html: `
        <h2>Nieuwe Partnership Aanvraag</h2>
        <p><strong>Bedrijfsnaam:</strong> ${companyName}</p>
        <p><strong>Contactpersoon:</strong> ${contactPerson}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefoon:</strong> ${phone}</p>` : ""}
        <p><strong>Interesse in:</strong> ${tierName}</p>
        <p><strong>Bericht:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
