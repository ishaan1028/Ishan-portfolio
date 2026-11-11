"use server";

import { Resend } from "resend";
import {
  readContactValues,
  validateContact,
  type ContactState,
} from "../lib/contact";

const escapeHtml = (text: string) =>
  text.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );

/**
 * Contact form handler. Validates on the server (the browser can't be
 * trusted), then emails the message to CONTACT_TO_EMAIL with Reply-To set
 * to the visitor, so replying in Gmail answers them directly.
 *
 * shortcut: no rate limiting; add one (e.g. Upstash Ratelimit) if spam gets past the honeypot.
 */
export async function sendMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: hidden from people, but bots fill every field. Pretend it worked.
  if (formData.get("company")) return { status: "success" };

  const values = readContactValues(formData);
  const errors = validateContact(values);

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    console.error(
      "[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not set — message not sent.",
    );
    return {
      status: "error",
      message:
        "The contact form isn't available right now. Please email me instead.",
      values,
    };
  }

  const { name, email, message } = values;
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: `${message}\n\n— ${name} <${email}>`,
    html: `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#111">
  <p style="margin:0 0 16px;white-space:pre-wrap">${escapeHtml(message)}</p>
  <p style="margin:0;color:#666">— ${escapeHtml(name)} &lt;<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>&gt;</p>
  <p style="margin:24px 0 0;font-size:12px;color:#999">Sent from the contact form on your portfolio. Reply to answer ${escapeHtml(name)} directly.</p>
</div>`,
  });

  if (error) {
    console.error("[contact] Resend failed:", error);
    return {
      status: "error",
      message:
        "Something went wrong sending your message. Please try again, or email me directly.",
      values,
    };
  }

  return { status: "success" };
}
