import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;
const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS) || 60 * 60 * 1000; // default 1 hour
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX) || 6; // default 6 requests per window
const RATE_STORE_MAX_SIZE = Number(process.env.RATE_STORE_MAX_SIZE) || 5000;

type RateEntry = number[];
// simple in-memory store: IP -> timestamps (ms)
const rateStore: Map<string, RateEntry> = new Map();

function getIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

function pruneRateStore() {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  rateStore.forEach((timestamps, ip) => {
    const recent = timestamps.filter((t: number) => t > cutoff);
    if (recent.length === 0) rateStore.delete(ip);
    else rateStore.set(ip, recent);
  });
  // Evict oldest entries if store grows too large
  if (rateStore.size > RATE_STORE_MAX_SIZE) {
    const excess = rateStore.size - RATE_STORE_MAX_SIZE;
    const keys = Array.from(rateStore.keys()).slice(0, excess);
    for (const k of keys) rateStore.delete(k);
  }
}

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export async function POST(req: Request) {
  // rate limiting by IP
  pruneRateStore();
  const ip = getIp(req);
  const now = Date.now();
  const prev = rateStore.get(ip) || [];
  if (prev.length >= RATE_LIMIT_MAX) {
    return NextResponse.json({ error: "Rate limit exceeded. Please try again later." }, { status: 429 });
  }
  prev.push(now);
  rateStore.set(ip, prev);

  try {
    const data = await req.json();
    const { name, email, phone, message } = data || {};

    // validate types and simple length limits
    if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid input types" }, { status: 400 });
    }
    const tName = name.trim();
    const tEmail = email.trim();
    const tPhone = typeof phone === "string" ? phone.trim() : "";
    const tMessage = message.trim();

    if (!tName || !tEmail || !tMessage) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (tName.length > 200 || tMessage.length > 10000 || tEmail.length > 320 || tPhone.length > 64) {
      return NextResponse.json({ error: "Input too long" }, { status: 413 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(tEmail)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    if (!SENDGRID_API_KEY || !CONTACT_TO_EMAIL) {
      // Avoid logging PII. Return explicit server error so callers know delivery failed.
      // In development you may want to accept and log safely; for production return 503.
      // eslint-disable-next-line no-console
      console.warn("SendGrid disabled: email not sent (missing configuration)");
      return NextResponse.json({ error: "Email provider not configured" }, { status: 503 });
    }

    // escape HTML to prevent injection in emails
    const escapeHtml = (str: string) =>
      str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

    const safeName = escapeHtml(tName);
    const safeEmail = escapeHtml(tEmail);
    const safePhone = escapeHtml(tPhone || "N/A");
    const safeMessage = escapeHtml(tMessage).replace(/\n/g, "<br />");

    const msg = {
      to: CONTACT_TO_EMAIL,
      from: CONTACT_TO_EMAIL,
      subject: `New contact form message from ${safeName}`,
      replyTo: tEmail,
      text: `Name: ${tName}\nEmail: ${tEmail}\nPhone: ${tPhone || "N/A"}\n\n${tMessage}`,
      html: `<h3>New contact form message</h3>
             <p><strong>Name:</strong> ${safeName}</p>
             <p><strong>Email:</strong> ${safeEmail}</p>
             <p><strong>Phone:</strong> ${safePhone}</p>
             <hr />
             <p>${safeMessage}</p>`,
    };

    await sgMail.send(msg);

    return NextResponse.json({ message: "Message sent" }, { status: 200 });
  } catch (err: unknown) {
    // eslint-disable-next-line no-console
    const msg = err instanceof Error ? err.message : String(err);
    // eslint-disable-next-line no-console
    console.error("Error sending contact email:", msg);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
