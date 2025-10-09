import { NextResponse } from "next/server";
import { sendContactEmail } from "@/app/lib/mail.service";
import { getInTouchTemplate } from "@/app/lib/templates/getInTouchTemplate"; // ✅ import your footer email template

export async function POST(req) {
  try {
    const { email } = await req.json();

    // ✅ Basic validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, code: "VALIDATION_ERROR", msg: "Invalid email" },
        { status: 400 }
      );
    }

    // ✅ Build proper QTS HTML email
    const html = getInTouchTemplate({ email });

    // ✅ Send styled email via your existing Mailtrap setup
    const info = await sendContactEmail({
      fullName: "Website Visitor",
      phone: "N/A",
      email,
      subject: "New Get In Touch Submission",
      message: `A visitor subscribed with email: ${email}`,
      html, // ✅ pass in the new QTS HTML template
    });

    // ✅ Response
    return NextResponse.json(
      { ok: true, messageId: info?.messageId || null },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET_IN_TOUCH_ERROR:", err);
    return NextResponse.json(
      { ok: false, code: "MAIL_FAILED", msg: "Unable to send email" },
      { status: 502 }
    );
  }
}
