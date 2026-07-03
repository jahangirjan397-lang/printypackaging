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

type LeadData = {
  quoteId: string;
  name: string;
  email: string;
  whatsapp: string;
  country: string;
  product: string;
  quantity: string;
  size: string;
  material: string;
  finishing: string;
  message: string;
};

function clean(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function makeQuoteId() {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const random = Math.floor(1000 + Math.random() * 9000);

  return `PP-${y}${m}${d}-${random}`;
}

async function saveLeadToGoogleSheet(lead: LeadData) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_SECRET;

  if (!webhookUrl || !secret) {
    return {
      success: false,
      skipped: true,
      message: "Google Sheet CRM is not configured in .env.local.",
    };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: secret,
        quoteId: lead.quoteId,
        name: lead.name,
        email: lead.email,
        whatsapp: lead.whatsapp,
        country: lead.country,
        product: lead.product,
        quantity: lead.quantity,
        size: lead.size,
        material: lead.material,
        finishing: lead.finishing,
        message: lead.message,
      }),
    });

    const text = await response.text();

    try {
      return JSON.parse(text);
    } catch {
      return {
        success: false,
        message: text.slice(0, 300),
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unable to save CRM lead.",
    };
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Quote API is working.",
    crmUrlConfigured: Boolean(process.env.GOOGLE_SHEETS_WEBHOOK_URL),
    crmSecretConfigured: Boolean(process.env.GOOGLE_SHEETS_SECRET),
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as QuoteRequest;

    const quoteId = makeQuoteId();

    const lead: LeadData = {
      quoteId,
      name: clean(body.name),
      email: clean(body.email),
      whatsapp: clean(body.whatsapp),
      country: clean(body.country),
      product: clean(body.product),
      quantity: clean(body.quantity),
      size: clean(body.size),
      material: clean(body.material),
      finishing: clean(body.finishing),
      message: clean(body.message),
    };

    if (!lead.name || !lead.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Name and email are required.",
        },
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
        {
          success: false,
          message: "Email server is not configured. Please check .env.local.",
        },
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

    const safeName = escapeHtml(lead.name);
    const safeEmail = escapeHtml(lead.email);
    const safeWhatsapp = escapeHtml(lead.whatsapp || "-");
    const safeCountry = escapeHtml(lead.country || "-");
    const safeProduct = escapeHtml(lead.product || "-");
    const safeQuantity = escapeHtml(lead.quantity || "-");
    const safeSize = escapeHtml(lead.size || "-");
    const safeMaterial = escapeHtml(lead.material || "-");
    const safeFinishing = escapeHtml(lead.finishing || "-");
    const safeMessage = escapeHtml(lead.message || "-").replaceAll(
      "\n",
      "<br />"
    );

    const adminSubject = `New Quote Request ${quoteId} - ${
      lead.product || "Printy Packaging"
    }`;

    const adminHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#07111F;background:#f7fafc;padding:24px">
        <div style="max-width:760px;margin:auto;background:#ffffff;border-radius:18px;padding:24px;border:1px solid #e2e8f0">
          <h2 style="color:#FF6A00;margin-top:0">New Quote Request</h2>
          <p style="font-size:16px"><strong>Quote ID:</strong> ${quoteId}</p>

          <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0" />

          <h3>Client Details</h3>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>WhatsApp:</strong> ${safeWhatsapp}</p>
          <p><strong>Country:</strong> ${safeCountry}</p>

          <h3>Packaging Details</h3>
          <p><strong>Product Type:</strong> ${safeProduct}</p>
          <p><strong>Quantity:</strong> ${safeQuantity}</p>
          <p><strong>Size:</strong> ${safeSize}</p>
          <p><strong>Material:</strong> ${safeMaterial}</p>
          <p><strong>Finishing:</strong> ${safeFinishing}</p>

          <h3>Project Details</h3>
          <p>${safeMessage}</p>

          <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0" />

          <p style="font-size:13px;color:#64748b">
            This lead was submitted from Printy Packaging website and saved to Google Sheet CRM.
          </p>
        </div>
      </div>
    `;

    const clientSubject = `We received your quote request ${quoteId} - Printy Packaging`;

    const clientHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#07111F;background:#f7fafc;padding:24px">
        <div style="max-width:720px;margin:auto;background:#ffffff;border-radius:18px;padding:24px;border:1px solid #e2e8f0">
          <h2 style="color:#FF6A00;margin-top:0">Thank you, ${safeName}</h2>

          <p>
            We received your custom packaging quote request. Our packaging team will review your details and contact you soon.
          </p>

          <p><strong>Your Quote ID:</strong> ${quoteId}</p>

          <p>
            Please keep this Quote ID for future communication.
          </p>

          <div style="margin-top:24px;padding:18px;border-radius:14px;background:#07111F;color:#ffffff">
            <p style="margin:0"><strong>Printy Packaging</strong></p>
            <p style="margin:8px 0 0;color:#cbd5e1">
              Custom boxes, rigid boxes, butter paper, food packaging, paper bags and labels.
            </p>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Printy Packaging Website" <${fromEmail}>`,
      to: receiverEmail,
      replyTo: lead.email,
      subject: adminSubject,
      html: adminHtml,
      text: `
New Quote Request

Quote ID: ${quoteId}

Name: ${lead.name}
Email: ${lead.email}
WhatsApp: ${lead.whatsapp}
Country: ${lead.country}

Product Type: ${lead.product}
Quantity: ${lead.quantity}
Size: ${lead.size}
Material: ${lead.material}
Finishing: ${lead.finishing}

Project Details:
${lead.message}
`,
    });

    await transporter.sendMail({
      from: `"Printy Packaging" <${fromEmail}>`,
      to: lead.email,
      replyTo: receiverEmail,
      subject: clientSubject,
      html: clientHtml,
      text: `
Thank you ${lead.name},

We received your custom packaging quote request.

Your Quote ID: ${quoteId}

Our packaging team will review your details and contact you soon.

Printy Packaging
`,
    });

    const crmResult = await saveLeadToGoogleSheet(lead);

    console.log("Google Sheet CRM Result:", crmResult);

    return NextResponse.json({
      success: true,
      message: "Quote request sent successfully.",
      quoteId,
      crm: crmResult,
    });
  } catch (error) {
    console.error("Quote API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to send quote request right now. Please check SMTP or CRM settings.",
      },
      { status: 500 }
    );
  }
}