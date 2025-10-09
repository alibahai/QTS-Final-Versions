import { NextResponse } from "next/server";
import { validateContactForm } from "@/app/lib/validate";
import { sendContactEmail } from "@/app/lib/mail.service";
import { contactTemplate } from "@/app/lib/templates/contactTemplate"; // ✅ Import template

export async function POST(req) {
  try {
    // 🧾 Parse incoming JSON
    const body = await req.json();

    // 🧪 Validate input using your existing validator
    const { errors, ...clean } = validateContactForm(body);

    // ❌ If any validation errors
    if (errors.length > 0) {
      return NextResponse.json(
        { ok: false, code: "VALIDATION_ERROR", errors },
        { status: 400 }
      );
    }

    // 🧱 Generate the HTML email using your QTS template
    const html = contactTemplate({
      fullName: clean.fullName,
      phone: clean.phone,
      email: clean.email,
      subject: clean.subject,
      message: clean.message,
    });

    // 📨 Send formatted email using existing Mail Service
    const info = await sendContactEmail({
      ...clean,
      html, // ✅ add HTML body to the email
    });

    // ✅ Return successful response
    return NextResponse.json(
      { ok: true, messageId: info?.messageId || null },
      { status: 200 }
    );
  } catch (err) {
    console.error("CONTACT_ERROR:", err);

    // ❌ Error fallback
    return NextResponse.json(
      { ok: false, code: "MAIL_FAILED", msg: "Unable to send email" },
      { status: 502 }
    );
  }
}
