"use server";

import { Resend } from "resend";
import { enquirySchema, type EnquiryInput } from "@/lib/validation/enquiry";
import { enquiryNotificationEmail, enquiryAutoReplyEmail } from "@/lib/email";
import { site } from "@/lib/site";

export type EnquiryState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: Partial<Record<keyof EnquiryInput, string>> };

async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured yet — don't block real users on it
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = (await res.json()) as { success: boolean };
    return data.success;
  } catch {
    return false;
  }
}

export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData
): Promise<EnquiryState> {
  const raw = {
    name: formData.get("name")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    eventType: formData.get("eventType")?.toString() ?? "",
    eventDate: formData.get("eventDate")?.toString() ?? "",
    flexibleDate: formData.get("flexibleDate") === "on",
    location: formData.get("location")?.toString() ?? "",
    indoorOutdoor: formData.get("indoorOutdoor")?.toString() || undefined,
    powerAvailable: formData.get("powerAvailable")?.toString() || undefined,
    guestCount: formData.get("guestCount")?.toString() ?? "",
    duration: formData.get("duration")?.toString() ?? "",
    packageInterest: formData.get("packageInterest")?.toString() ?? "",
    branding: formData.get("branding") === "on",
    message: formData.get("message")?.toString() ?? "",
    company: formData.get("company")?.toString() ?? "", // honeypot
    turnstileToken: formData.get("cf-turnstile-response")?.toString() ?? "",
  };

  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof EnquiryInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof EnquiryInput | undefined;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Check the highlighted fields and try again.", fieldErrors };
  }

  const data = parsed.data;

  // honeypot tripped — pretend success, send nothing
  if (data.company) {
    return { status: "success" };
  }

  const human = await verifyTurnstile(data.turnstileToken);
  if (!human) {
    return { status: "error", message: "We couldn't verify you're human — please try again." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL ?? site.email;
  const from = process.env.ENQUIRY_FROM_EMAIL ?? `Sip Social <onboarding@resend.dev>`;

  if (!apiKey) {
    // Not configured yet. Fail loudly in logs so this is never silently
    // dropped in production, but don't tell the enquirer it's broken.
    console.error(
      "[enquiry] RESEND_API_KEY is not set — enquiry was validated but NOT sent:",
      JSON.stringify({ name: data.name, email: data.email, eventDate: data.eventDate })
    );
    return {
      status: "error",
      message:
        "Sorry, enquiries aren't connected yet. Please email us directly at " + site.email + ".",
    };
  }

  const resend = new Resend(apiKey);
  const notification = enquiryNotificationEmail(data);
  const autoReply = enquiryAutoReplyEmail(data);

  const [toZoe, toEnquirer] = await Promise.allSettled([
    resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: notification.subject,
      html: notification.html,
    }),
    resend.emails.send({
      from,
      to: data.email,
      subject: autoReply.subject,
      html: autoReply.html,
    }),
  ]);

  if (toZoe.status === "rejected") {
    console.error("[enquiry] failed to notify owner:", toZoe.reason);
    return {
      status: "error",
      message: "Something went wrong sending your enquiry. Please email us directly at " + site.email + ".",
    };
  }
  if (toEnquirer.status === "rejected") {
    // The enquiry itself landed — don't block success on the nice-to-have auto-reply.
    console.error("[enquiry] notified owner but auto-reply failed:", toEnquirer.reason);
  }

  return { status: "success" };
}
