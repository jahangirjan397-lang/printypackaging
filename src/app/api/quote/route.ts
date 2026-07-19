import { randomUUID } from "node:crypto";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_BODY_LENGTH = 30_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

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
  website?: string;
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

type ServiceResult = {
  success: boolean;
  skipped?: boolean;
  message: string;
  messageId?: string;
  raw?: unknown;
};

type RateLimitRecord = {
  count: number;
  resetAt: number;
};

const globalRateLimitStore = globalThis as typeof globalThis & {
  quoteRateLimitStore?: Map<string, RateLimitRecord>;
};

const rateLimitStore =
  globalRateLimitStore.quoteRateLimitStore ??
  new Map<string, RateLimitRecord>();

globalRateLimitStore.quoteRateLimitStore = rateLimitStore;

function clean(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replaceAll("\0", "").trim();
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeHeaderText(value: string) {
  return value.replaceAll("\r", " ").replaceAll("\n", " ").slice(0, 120);
}

function safeSpreadsheetCell(value: string) {
  const trimmed = value.trimStart();

  if (/^[=+\-@]/.test(trimmed)) {
    return `'${value}`;
  }

  return value;
}

function makeQuoteId() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const uniquePart = randomUUID().split("-")[0].toUpperCase();

  return `PP-${year}${month}${day}-${uniquePart}`;
}

function buildLead(body: QuoteRequest): LeadData {
  return {
    quoteId: makeQuoteId(),
    name: clean(body.name),
    email: clean(body.email).toLowerCase(),
    whatsapp: clean(body.whatsapp),
    country: clean(body.country),
    product: clean(body.product),
    quantity: clean(body.quantity),
    size: clean(body.size),
    material: clean(body.material),
    finishing: clean(body.finishing),
    message: clean(body.message),
  };
}

function validateLead(lead: LeadData) {
  if (lead.name.length < 2) {
    return "Please enter a valid name.";
  }

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email) ||
    lead.email.length > 254
  ) {
    return "Please enter a valid email address.";
  }

  const fieldLimits: Array<{
    label: string;
    value: string;
    maxLength: number;
  }> = [
    { label: "Name", value: lead.name, maxLength: 100 },
    { label: "WhatsApp", value: lead.whatsapp, maxLength: 50 },
    { label: "Country", value: lead.country, maxLength: 80 },
    { label: "Product", value: lead.product, maxLength: 120 },
    { label: "Quantity", value: lead.quantity, maxLength: 50 },
    { label: "Size", value: lead.size, maxLength: 100 },
    { label: "Material", value: lead.material, maxLength: 180 },
    { label: "Finishing", value: lead.finishing, maxLength: 220 },
    { label: "Message", value: lead.message, maxLength: 2500 },
  ];

  for (const field of fieldLimits) {
    if (field.value.length > field.maxLength) {
      return `${field.label} is too long.`;
    }
  }

  return "";
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkRateLimit(ip: string) {
  const now = Date.now();

  if (rateLimitStore.size > 1000) {
    for (const [key, record] of rateLimitStore.entries()) {
      if (record.resetAt <= now) {
        rateLimitStore.delete(key);
      }
    }
  }

  const currentRecord = rateLimitStore.get(ip);

  if (!currentRecord || currentRecord.resetAt <= now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });

    return {
      allowed: true,
      retryAfterSeconds: 0,
    };
  }

  if (currentRecord.count >= MAX_REQUESTS_PER_WINDOW) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((currentRecord.resetAt - now) / 1000)
      ),
    };
  }

  currentRecord.count += 1;
  rateLimitStore.set(ip, currentRecord);

  return {
    allowed: true,
    retryAfterSeconds: 0,
  };
}

function isAllowedOrigin(origin: string | null) {
  if (!origin) {
    return true;
  }

  try {
    const url = new URL(origin);

    if (
      url.protocol === "http:" &&
      (url.hostname === "localhost" || url.hostname === "127.0.0.1")
    ) {
      return true;
    }

    return (
      url.protocol === "https:" &&
      (url.hostname === "printypackaging.com" ||
        url.hostname === "www.printypackaging.com")
    );
  } catch {
    return false;
  }
}

async function saveLeadToGoogleSheet(
  lead: LeadData
): Promise<ServiceResult> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_SECRET;

  if (!webhookUrl || !secret) {
    return {
      success: false,
      skipped: true,
      message: "Google Sheet CRM is not configured.",
    };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(15_000),
      body: JSON.stringify({
        token: secret,
        quoteId: lead.quoteId,
        name: safeSpreadsheetCell(lead.name),
        email: safeSpreadsheetCell(lead.email),
        whatsapp: safeSpreadsheetCell(lead.whatsapp),
        country: safeSpreadsheetCell(lead.country),
        product: safeSpreadsheetCell(lead.product),
        quantity: safeSpreadsheetCell(lead.quantity),
        size: safeSpreadsheetCell(lead.size),
        material: safeSpreadsheetCell(lead.material),
        finishing: safeSpreadsheetCell(lead.finishing),
        message: safeSpreadsheetCell(lead.message),
      }),
    });

    const responseText = await response.text();

    try {
      const parsed = JSON.parse(responseText) as {
        success?: boolean;
        message?: string;
      };

      return {
        success: Boolean(parsed.success ?? response.ok),
        message: parsed.message || "Google Sheet response received.",
        raw: parsed,
      };
    } catch {
      return {
        success: response.ok,
        message:
          responseText.slice(0, 300) || "Google Sheet response received.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to save the CRM lead.",
    };
  }
}

function getEmailConfig() {
  const smtpHost = process.env.SMTP_HOST;
  const parsedPort = Number(process.env.SMTP_PORT || 465);
  const smtpPort = Number.isFinite(parsedPort) ? parsedPort : 465;
  const smtpSecure = process.env.SMTP_SECURE === "true";
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const receiverEmail = process.env.QUOTE_RECEIVER_EMAIL;
  const fromEmail = process.env.QUOTE_FROM_EMAIL || smtpUser;

  const configured = Boolean(
    smtpHost && smtpUser && smtpPass && receiverEmail && fromEmail
  );

  return {
    configured,
    smtpHost,
    smtpPort,
    smtpSecure,
    smtpUser,
    smtpPass,
    receiverEmail,
    fromEmail,
  };
}

function createTransporter() {
  const config = getEmailConfig();

  if (!config.configured) {
    return {
      configured: false as const,
      config,
      transporter: null,
    };
  }

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpSecure,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  return {
    configured: true as const,
    config,
    transporter,
  };
}

function getEmailHtml(lead: LeadData) {
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

  const adminHtml = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#07111F;background:#f7fafc;padding:24px">
      <div style="max-width:760px;margin:auto;background:#ffffff;border-radius:18px;padding:24px;border:1px solid #e2e8f0">
        <h2 style="color:#FF6A00;margin-top:0">New Quote Request</h2>
        <p style="font-size:16px"><strong>Quote ID:</strong> ${lead.quoteId}</p>

        <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0" />

        <h3>Client Details</h3>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>WhatsApp / Phone:</strong> ${safeWhatsapp}</p>
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
          This lead was submitted from the Printy Packaging website.
        </p>
      </div>
    </div>
  `;

  const clientHtml = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#07111F;background:#f7fafc;padding:24px">
      <div style="max-width:720px;margin:auto;background:#ffffff;border-radius:18px;padding:24px;border:1px solid #e2e8f0">
        <h2 style="color:#FF6A00;margin-top:0">Thank you, ${safeName}</h2>

        <p>
          We received your custom packaging quote request. Our packaging team
          will review your details and contact you soon.
        </p>

        <p><strong>Your Quote ID:</strong> ${lead.quoteId}</p>

        <p>Please keep this Quote ID for future communication.</p>

        <div style="margin-top:24px;padding:18px;border-radius:14px;background:#07111F;color:#ffffff">
          <p style="margin:0"><strong>Printy Packaging</strong></p>
          <p style="margin:8px 0 0;color:#cbd5e1">
            Custom boxes, rigid boxes, butter paper, food packaging,
            paper bags and labels.
          </p>
        </div>
      </div>
    </div>
  `;

  return {
    adminHtml,
    clientHtml,
  };
}

async function sendAdminEmail(
  lead: LeadData
): Promise<ServiceResult> {
  const emailService = createTransporter();

  if (!emailService.configured || !emailService.transporter) {
    return {
      success: false,
      skipped: true,
      message: "Email server is not configured.",
    };
  }

  try {
    const { adminHtml } = getEmailHtml(lead);
    const productSubject = safeHeaderText(
      lead.product || "Printy Packaging"
    );

    const info = await emailService.transporter.sendMail({
      from: `"Printy Packaging Website" <${emailService.config.fromEmail}>`,
      to: emailService.config.receiverEmail,
      replyTo: lead.email,
      subject: `New Quote Request ${lead.quoteId} - ${productSubject}`,
      html: adminHtml,
      text: `
New Quote Request

Quote ID: ${lead.quoteId}

Name: ${lead.name}
Email: ${lead.email}
WhatsApp / Phone: ${lead.whatsapp}
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

    return {
      success: true,
      message: "Admin email sent.",
      messageId: info.messageId,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Admin email send failed.",
    };
  }
}

async function sendClientAutoReply(
  lead: LeadData
): Promise<ServiceResult> {
  const emailService = createTransporter();

  if (!emailService.configured || !emailService.transporter) {
    return {
      success: false,
      skipped: true,
      message: "Email server is not configured.",
    };
  }

  try {
    const { clientHtml } = getEmailHtml(lead);

    const info = await emailService.transporter.sendMail({
      from: `"Printy Packaging" <${emailService.config.fromEmail}>`,
      to: lead.email,
      replyTo: emailService.config.receiverEmail,
      subject: `We received your quote request ${lead.quoteId} - Printy Packaging`,
      html: clientHtml,
      text: `
Thank you ${lead.name},

We received your custom packaging quote request.

Your Quote ID: ${lead.quoteId}

Our packaging team will review your details and contact you soon.

Printy Packaging
`,
    });

    return {
      success: true,
      message: "Client auto reply sent.",
      messageId: info.messageId,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Client auto reply failed.",
    };
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Printy Packaging quote API is available.",
  });
}

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request.headers.get("origin"))) {
      return NextResponse.json(
        {
          success: false,
          message: "Request origin is not allowed.",
        },
        { status: 403 }
      );
    }

    const contentType = request.headers.get("content-type") || "";

    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request format.",
        },
        { status: 415 }
      );
    }

    const contentLength = Number(
      request.headers.get("content-length") || 0
    );

    if (contentLength > MAX_BODY_LENGTH) {
      return NextResponse.json(
        {
          success: false,
          message: "Quote request is too large.",
        },
        { status: 413 }
      );
    }

    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(clientIp);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Too many quote requests. Please wait a few minutes and try again.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSeconds),
          },
        }
      );
    }

    const rawBody = await request.text();

    if (!rawBody || rawBody.length > MAX_BODY_LENGTH) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid quote request.",
        },
        { status: rawBody.length > MAX_BODY_LENGTH ? 413 : 400 }
      );
    }

    let body: QuoteRequest;

    try {
      const parsedBody = JSON.parse(rawBody) as unknown;

      if (
        !parsedBody ||
        typeof parsedBody !== "object" ||
        Array.isArray(parsedBody)
      ) {
        throw new Error("Invalid request body.");
      }

      body = parsedBody as QuoteRequest;
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid quote request.",
        },
        { status: 400 }
      );
    }

    if (clean(body.website)) {
      return NextResponse.json({
        success: true,
        message: "Quote request processed successfully.",
      });
    }

    const lead = buildLead(body);
    const validationError = validateLead(lead);

    if (validationError) {
      return NextResponse.json(
        {
          success: false,
          message: validationError,
        },
        { status: 400 }
      );
    }

    const [crmResult, adminEmailResult] = await Promise.all([
      saveLeadToGoogleSheet(lead),
      sendAdminEmail(lead),
    ]);

    console.log("Quote lead:", lead.quoteId);
    console.log("Google Sheet CRM Result:", crmResult);
    console.log("Admin Email Result:", adminEmailResult);

    const primarySuccess =
      crmResult.success || adminEmailResult.success;

    if (!primarySuccess) {
      return NextResponse.json(
        {
          success: false,
          message:
            "We could not process your quote request right now. Please try again or contact us through WhatsApp.",
        },
        { status: 503 }
      );
    }

    const clientEmailResult = await sendClientAutoReply(lead);

    console.log("Client Email Result:", clientEmailResult);

    return NextResponse.json({
      success: true,
      message: "Quote request processed successfully.",
      quoteId: lead.quoteId,
    });
  } catch (error) {
    console.error("Quote API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to send your quote request right now. Please try again.",
      },
      { status: 500 }
    );
  }
}