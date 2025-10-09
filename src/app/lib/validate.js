export function validateContactForm(body) {
  const errors = [];
  const sanitize = (s) => String(s || "").trim();

  const fullName = sanitize(body.fullName);
  const phone = sanitize(body.phone);
  const email = sanitize(body.email);
  const subject = sanitize(body.subject);
  const message = sanitize(body.message);

  if (fullName.length < 2 || fullName.length > 80)
    errors.push({ field: "fullName", msg: "Name must be 2-80 chars" });
  if (!/^[\d+\-\s()]{6,20}$/.test(phone))
    errors.push({ field: "phone", msg: "Invalid phone" });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.push({ field: "email", msg: "Invalid email" });
  if (subject.length < 5 || subject.length > 120)
    errors.push({ field: "subject", msg: "Subject must be 5-120 chars" });
  if (message.length < 0 || message.length > 2000)
    errors.push({ field: "message", msg: "Message must be 10-2000 chars" });

  return { errors, fullName, phone, email, subject, message };
}
