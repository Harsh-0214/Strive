import { NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactPayload {
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  phone: string;
  packageInterest: string;
  message: string;
}

const PACKAGE_LABELS: Record<string, string> = {
  launch: "Launch: $500 (landing / portfolio)",
  growth: "Growth: $1,500 (booking & high-traffic)",
  commerce: "Commerce: $2,000+ (e-commerce)",
  unsure: "Not sure yet",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { firstName, lastName, businessName, email, phone, packageInterest, message } = body;

  if (
    !firstName?.trim() ||
    !lastName?.trim() ||
    !businessName?.trim() ||
    !email?.trim() ||
    !EMAIL_RE.test(email) ||
    !packageInterest?.trim() ||
    !message?.trim()
  ) {
    return NextResponse.json({ error: "Missing or invalid fields." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM || "onboarding@resend.dev";

  if (!apiKey || !to) {
    console.error("Contact form is missing RESEND_API_KEY or CONTACT_EMAIL_TO env vars.");
    return NextResponse.json(
      { error: "Email is not configured on the server." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const packageLabel = PACKAGE_LABELS[packageInterest] ?? packageInterest;

  try {
    const { error } = await resend.emails.send({
      from: `Strive Contact Form <${from}>`,
      to,
      replyTo: email,
      subject: `New request: ${businessName} (${firstName} ${lastName})`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
        <p><strong>Business:</strong> ${escapeHtml(businessName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        <p><strong>Package interest:</strong> ${escapeHtml(packageLabel)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
