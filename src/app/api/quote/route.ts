import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type QuoteRequest = {
  name?: string;
  email?: string;
  whatsapp?: string;
  country?: string;
  product?: string;
  quantity?: string;
  size?: string;
  material?: string;
  finishing?: string;
  message?: string;
};

function clean(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim();
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as QuoteRequest;

    const name = clean(body.name);
    const email = clean(body.email);
    const whatsapp = clean(body.whatsapp);
    const country = clean(body.country);
    const product = clean(body.product);
    const quantity = clean(body.quantity);
    const size = clean(body.size);
    const material = clean(body.material);
    const finishing = clean(body.finishing);
    const message = clean(body.message);

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: "Name and email are required." },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpSecure = process.env.SMTP_SECURE === "true";
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const receiverEmail = process.env.QUOTE_RECEIVER_EMAIL;
    const fromEmail = process.env.QUOTE_FROM_EMAIL || smtpUser;

    if (!smtpHost || !smtpUser || !smtpPass || !receiverEmail || !fromEmail) {
      return NextResponse.json(
        { success: false, message: "Email server is not configured." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const subject = `New Quote Request - ${product || "Printy Packaging"}`;

    const text = `
New Quote Request - Printy Packaging

Name: ${name}
Email: ${email}
WhatsApp: ${whatsapp}
Country: ${country}

Product Type: ${product}
Quantity: ${quantity}
Size: ${size}
Material: ${material}
Finishing: ${finishing}

Project Details:
${message}
`;

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#07111F">
        <h2 style="color:#FF6A00">New Quote Request - Printy Packaging</h2>

        <h3>Client Details</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>WhatsApp:</strong> ${whatsapp || "-"}</p>
        <p><strong>Country:</strong> ${country || "-"}</p>

        <h3>Packaging Details</h3>
        <p><strong>Product Type:</strong> ${product || "-"}</p>
        <p><strong>Quantity:</strong> ${quantity || "-"}</p>
        <p><strong>Size:</strong> ${size || "-"}</p>
        <p><strong>Material:</strong> ${material || "-"}</p>
        <p><strong>Finishing:</strong> ${finishing || "-"}</p>

        <h3>Project Details</h3>
        <p>${message || "-"}</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Printy Packaging Quote" <${fromEmail}>`,
      to: receiverEmail,
      replyTo: email,
      subject,
      text,
      html,
    });

    return NextResponse.json({
      success: true,
      message: "Quote request sent successfully.",
    });
  } catch (error) {
    console.error("Quote email error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to send quote request right now.",
      },
      { status: 500 }
    );
  }
}