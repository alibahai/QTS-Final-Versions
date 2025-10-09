import nodemailer from "nodemailer";

export async function sendContactEmail({ fullName, phone, email, subject, message, html }) {
  console.log("🚀 Starting sendContactEmail()...");
  console.log("🔧 Environment check:", {
    host: process.env.NEXT_SMTP_HOST,
    port: process.env.NEXT_SMTP_PORT,
    user: process.env.NEXT_SMTP_USER ? "✅ Present" : "❌ Missing",
    pass: process.env.NEXT_SMTP_PASS ? "✅ Present" : "❌ Missing",
  });

  try {
    // 🧩 Create transporter
    console.log("📡 Creating transporter...");
    const transporter = nodemailer.createTransport({
      host: process.env.NEXT_SMTP_HOST,
      port: Number(process.env.NEXT_SMTP_PORT || 2525),
      secure: false, // Mailtrap uses TLS false for port 2525
      auth: {
        user: process.env.NEXT_SMTP_USER,
        pass: process.env.NEXT_SMTP_PASS,
      },
      connectionTimeout: 15000,
    });

    // 🧠 Verify SMTP connection
    console.log("🧠 Verifying SMTP connection...");
    await transporter.verify();
    console.log("✅ SMTP connection verified successfully!");

    // ✉️ Prepare email body
    const defaultHtml = `
      <div style="font-family:Arial,sans-serif;">
        <h2>New Contact Form Submission</h2>
        <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
          <tr><td><b>Name</b></td><td>${fullName}</td></tr>
          <tr><td><b>Email</b></td><td>${email}</td></tr>
          <tr><td><b>Phone</b></td><td>${phone}</td></tr>
          <tr><td><b>Subject</b></td><td>${subject}</td></tr>
          <tr><td valign="top"><b>Message</b></td><td>${message}</td></tr>
        </table>
      </div>
    `;

    // ✅ If a formatted HTML template (from contactTemplate.js) is passed, use it
    const htmlBody = html || defaultHtml;

    // 🧾 Also include a text-only fallback for plain clients
    const textBody = `
New Contact Form Submission
---------------------------
Name: ${fullName}
Email: ${email}
Phone: ${phone}
Subject: ${subject}
Message: ${message}
    `;

    // 📨 Send email
    console.log("✉️ Sending email...");
    const info = await transporter.sendMail({
      from: `"${process.env.NEXT_FROM_NAME || "QTS Website"}" <${process.env.NEXT_FROM_EMAIL}>`,
      to: process.env.NEXT_TO_EMAIL,
      subject: `[QTS Contact] ${subject || "No subject"} — ${fullName}`,
      text: textBody,
      html: htmlBody, // ✅ use the full QTS HTML template if provided
    });

    console.log("✅ Email sent successfully!");
    console.log("📬 Mailtrap Message ID:", info.messageId);

    return { ok: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ SMTP mail error occurred:");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Stack trace:", error.stack);

    if (error.code === "ETIMEDOUT") {
      console.error("⚠️ Connection timed out! Check internet/firewall.");
    }
    if (error.code === "EAUTH") {
      console.error("⚠️ Authentication failed! Check SMTP_USER and SMTP_PASS.");
    }

    throw new Error("MAIL_FAILED");
  }
}
