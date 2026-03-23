import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, message } = data || {};

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    if (!SENDGRID_API_KEY || !CONTACT_TO_EMAIL) {
      // fallback: log submission and respond with success but warn in server logs
      // eslint-disable-next-line no-console
      console.warn("SendGrid not configured. Set SENDGRID_API_KEY and CONTACT_TO_EMAIL to enable email sending.");
      // eslint-disable-next-line no-console
      console.log("Contact form submission:", { name, email, phone, message });
      return NextResponse.json({ message: "Message received (not emailed: missing configuration)" }, { status: 200 });
    }

    const msg = {
      to: CONTACT_TO_EMAIL,
      from: CONTACT_TO_EMAIL,
      subject: `New contact form message from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\n\n${message}`,
      html: `<h3>New contact form message</h3>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${phone || "N/A"}</p>
             <hr />
             <p>${message.replace(/\n/g, "<br />")}</p>`,
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
