import { randomUUID } from "node:crypto";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_JSON_BODY_LENGTH = 30_000;
const MAX_UPLOAD_BODY_LENGTH = 4_250_000;
const MAX_FILES = 5;
const MAX_SINGLE_FILE_SIZE = 4_000_000;
const MAX_TOTAL_FILE_SIZE = 4_000_000;
const ALLOWED_FILE_EXTENSIONS = new Set([
  ".pdf", ".ai", ".eps", ".psd", ".svg", ".png", ".jpg",
  ".jpeg", ".webp", ".tif", ".tiff", ".cdr",
]);
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
// The auto-reply goes to a buyer-supplied address, so cap it per recipient to
// stop the form being used to send repeated emails to someone else's inbox.
const MAX_AUTO_REPLIES_PER_EMAIL = 2;

type QuoteRequest = {
  name?: string;
  email?: string;
  whatsapp?: string;
  country?: string;
  product?: string;
  quantity?: string;
  size?: string;
  material?: string;
  gsm?: string;
  printing?: string;
  finishing?: string;
  artworkStatus?: string;
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
  gsm: string;
  printing: string;
  finishing: string;
  artworkStatus: string;
  message: string;
};

type ServiceResult = {
  success: boolean;
  skipped?: boolean;
  message: string;
  messageId?: string;
};

type UploadedFile = {
  filename: string;
  contentType: string;
  size: number;
  content: Buffer;
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

function formValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function safeUploadName(value: string) {
  return value
    .replaceAll("\\", "_")
    .replaceAll("/", "_")
    .replace(/[\r\n\t]/g, " " )
    .replace(/[^a-zA-Z0-9._ ()-]/g, "_")
    .slice(0, 140);
}

function fileExtension(filename: string) {
  const dotIndex = filename.lastIndexOf(".");
  return dotIndex >= 0 ? filename.slice(dotIndex).toLowerCase() : "";
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
    gsm: clean(body.gsm),
    printing: clean(body.printing),
    finishing: clean(body.finishing),
    artworkStatus: clean(body.artworkStatus),
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
    { label: "GSM / Thickness", value: lead.gsm, maxLength: 100 },
    { label: "Printing", value: lead.printing, maxLength: 120 },
    { label: "Finishing", value: lead.finishing, maxLength: 220 },
    { label: "Artwork Status", value: lead.artworkStatus, maxLength: 120 },
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

function checkRateLimit(key: string, maxRequests = MAX_REQUESTS_PER_WINDOW) {
  const now = Date.now();

  if (rateLimitStore.size > 1000) {
    for (const [key, record] of rateLimitStore.entries()) {
      if (record.resetAt <= now) {
        rateLimitStore.delete(key);
      }
    }
  }

  const currentRecord = rateLimitStore.get(key);

  if (!currentRecord || currentRecord.resetAt <= now) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });

    return {
      allowed: true,
      retryAfterSeconds: 0,
    };
  }

  if (currentRecord.count >= maxRequests) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((currentRecord.resetAt - now) / 1000)
      ),
    };
  }

  currentRecord.count += 1;
  rateLimitStore.set(key, currentRecord);

  return {
    allowed: true,
    retryAfterSeconds: 0,
  };
}

function isAllowedOrigin(origin: string | null, requestUrl: string) {
  if (!origin) {
    return true;
  }

  try {
    const url = new URL(origin);
    const site = new URL(requestUrl);

    if (url.origin === site.origin) {
      return true;
    }

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
  lead: LeadData,
  uploadedFiles: UploadedFile[]
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
        gsm: safeSpreadsheetCell(lead.gsm),
        printing: safeSpreadsheetCell(lead.printing),
        finishing: safeSpreadsheetCell(lead.finishing),
        artworkStatus: safeSpreadsheetCell(lead.artworkStatus),
        artworkFiles: safeSpreadsheetCell(
          uploadedFiles.map((file) => file.filename).join(", " )
        ),
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
  const safeGsm = escapeHtml(lead.gsm || "-");
  const safePrinting = escapeHtml(lead.printing || "-");
  const safeFinishing = escapeHtml(lead.finishing || "-");
  const safeArtworkStatus = escapeHtml(lead.artworkStatus || "-");
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
        <p><strong>GSM / Board Thickness:</strong> ${safeGsm}</p>
        <p><strong>Printing Colors:</strong> ${safePrinting}</p>
        <p><strong>Finishing:</strong> ${safeFinishing}</p>
        <p><strong>Artwork Status:</strong> ${safeArtworkStatus}</p>

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
  lead: LeadData,
  uploadedFiles: UploadedFile[]
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
GSM / Board Thickness: ${lead.gsm}
Printing Colors: ${lead.printing}
Finishing: ${lead.finishing}
Artwork Status: ${lead.artworkStatus}

Project Details:
${lead.message}
`,
      attachments: uploadedFiles.map((file) => ({
        filename: file.filename,
        content: file.content,
        contentType: file.contentType,
      })),
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
    if (!isAllowedOrigin(request.headers.get("origin"), request.url)) {
      return NextResponse.json(
        {
          success: false,
          message: "Request origin is not allowed.",
        },
        { status: 403 }
      );
    }

    const contentType = request.headers.get("content-type") || "";
    const normalizedContentType = contentType.toLowerCase();
    const isJsonRequest = normalizedContentType.includes("application/json");
    const isMultipartRequest = normalizedContentType.includes("multipart/form-data");

    if (!isJsonRequest && !isMultipartRequest) {
      return NextResponse.json({ success: false, message: "Invalid request format." }, { status: 415 });
    }

    const contentLength = Number(request.headers.get("content-length") || 0);
    const maxRequestSize = isMultipartRequest ? MAX_UPLOAD_BODY_LENGTH : MAX_JSON_BODY_LENGTH;
    if (contentLength > maxRequestSize) {
      return NextResponse.json({ success: false, message: "Quote request is too large." }, { status: 413 });
    }

    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(clientIp);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, message: "Too many quote requests. Please wait a few minutes and try again." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
      );
    }

    let body: QuoteRequest;
    const uploadedFiles: UploadedFile[] = [];

    if (isMultipartRequest) {
      const formData = await request.formData();
      body = {
        name: formValue(formData, "name"), email: formValue(formData, "email"),
        whatsapp: formValue(formData, "whatsapp"), country: formValue(formData, "country"),
        product: formValue(formData, "product"), quantity: formValue(formData, "quantity"),
        size: formValue(formData, "size"), material: formValue(formData, "material"),
        gsm: formValue(formData, "gsm"), printing: formValue(formData, "printing"),
        finishing: formValue(formData, "finishing"), artworkStatus: formValue(formData, "artworkStatus"),
        message: formValue(formData, "message"), website: formValue(formData, "website"),
      };

      const realFiles = formData.getAll("artworkFiles").filter(
        (entry): entry is File => typeof entry !== "string" && entry.size > 0
      );
      if (realFiles.length > MAX_FILES) {
        return NextResponse.json({ success: false, message: "Please upload a maximum of 5 artwork files." }, { status: 400 });
      }
      let totalFileSize = 0;
      for (const file of realFiles) {
        const filename = safeUploadName(file.name);
        const extension = fileExtension(filename);
        if (!filename || !ALLOWED_FILE_EXTENSIONS.has(extension)) {
          return NextResponse.json({ success: false, message: "One of the uploaded files is not a supported artwork format." }, { status: 400 });
        }
        if (file.size > MAX_SINGLE_FILE_SIZE) {
          return NextResponse.json({ success: false, message: `"${filename}" is larger than 4 MB.` }, { status: 400 });
        }
        totalFileSize += file.size;
        if (totalFileSize > MAX_TOTAL_FILE_SIZE) {
          return NextResponse.json({ success: false, message: "Artwork files must be 4 MB or less in total." }, { status: 400 });
        }
        uploadedFiles.push({ filename, contentType: file.type || "application/octet-stream", size: file.size, content: Buffer.from(await file.arrayBuffer()) });
      }
    } else {
      const rawBody = await request.text();
      if (!rawBody || rawBody.length > MAX_JSON_BODY_LENGTH) {
        return NextResponse.json({ success: false, message: "Invalid quote request." }, { status: rawBody.length > MAX_JSON_BODY_LENGTH ? 413 : 400 });
      }
      try {
        const parsedBody = JSON.parse(rawBody) as unknown;
        if (!parsedBody || typeof parsedBody !== "object" || Array.isArray(parsedBody)) throw new Error("Invalid request body.");
        body = parsedBody as QuoteRequest;
      } catch {
        return NextResponse.json({ success: false, message: "Invalid quote request." }, { status: 400 });
      }
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

    // Artwork is delivered through the admin email attachment. Reject before
    // saving a CRM row if that channel cannot carry the files.
    if (uploadedFiles.length > 0 && !getEmailConfig().configured) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Artwork upload is temporarily unavailable. Please send your quote without files or contact us through WhatsApp.",
        },
        { status: 503 }
      );
    }

    let crmResult: ServiceResult;
    let adminEmailResult: ServiceResult;

    if (uploadedFiles.length > 0) {
      // The email attachment is the delivery channel for artwork. Do not
      // record the lead first and then ask the buyer to retry a failed upload.
      adminEmailResult = await sendAdminEmail(lead, uploadedFiles);
      if (!adminEmailResult.success) {
        return NextResponse.json(
          {
            success: false,
            message:
              "We could not deliver your artwork right now. Please try again or contact us through WhatsApp.",
          },
          { status: 503 }
        );
      }
      crmResult = await saveLeadToGoogleSheet(lead, uploadedFiles);
    } else {
      [crmResult, adminEmailResult] = await Promise.all([
        saveLeadToGoogleSheet(lead, uploadedFiles),
        sendAdminEmail(lead, uploadedFiles),
      ]);
    }

    console.info("Quote lead:",{quoteId:lead.quoteId});
    console.info("Google Sheet CRM:",{quoteId:lead.quoteId,success:crmResult.success,skipped:Boolean(crmResult.skipped)});
    console.info("Admin Email:",{quoteId:lead.quoteId,success:adminEmailResult.success,skipped:Boolean(adminEmailResult.skipped)});

    const primarySuccess =
      uploadedFiles.length > 0
        ? adminEmailResult.success
        : crmResult.success || adminEmailResult.success;

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

    const autoReplyLimit = checkRateLimit(
      `auto-reply:${lead.email}`,
      MAX_AUTO_REPLIES_PER_EMAIL
    );
    const clientEmailResult: ServiceResult = autoReplyLimit.allowed
      ? await sendClientAutoReply(lead)
      : {
          success: false,
          skipped: true,
          message: "Auto reply limit reached for this address.",
        };

    console.info("Client Email:",{quoteId:lead.quoteId,success:clientEmailResult.success,skipped:Boolean(clientEmailResult.skipped)});

    return NextResponse.json({
      success: true,
      message: "Quote request processed successfully.",
      quoteId: lead.quoteId,
    });
  } catch (error) {
    console.error("Quote API Error:",{name:error instanceof Error?error.name:"UnknownError"});

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