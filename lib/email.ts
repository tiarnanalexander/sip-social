import { eventTypeLabels, packageLabels, type EnquiryInput } from "./validation/enquiry";
import { site } from "./site";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const shell = (inner: string) => `
<div style="background:#fffbea;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#000;">
  <div style="max-width:560px;margin:0 auto;background:#fffbea;">
    <div style="font-size:28px;font-weight:700;letter-spacing:-0.02em;margin-bottom:24px;">
      SIP <span style="font-size:14px;font-weight:600;vertical-align:middle;">SOCIAL</span>
    </div>
    ${inner}
    <div style="margin-top:32px;padding-top:16px;border-top:1px solid #e8dfbd;font-size:12px;color:#6b6559;">
      ${esc(site.name)} · ${esc(site.email)} · ${esc(site.phoneDisplay)}
    </div>
  </div>
</div>`;

const row = (label: string, value: string) =>
  value
    ? `<tr><td style="padding:6px 0;color:#6b6559;font-size:13px;width:140px;vertical-align:top;">${esc(label)}</td><td style="padding:6px 0;font-size:14px;">${esc(value)}</td></tr>`
    : "";

/** Internal notification to Zoe's inbox — every field she needs to quote. */
export function enquiryNotificationEmail(data: EnquiryInput) {
  const subject = `New enquiry — ${eventTypeLabels[data.eventType]} — ${data.eventDate}`;
  const html = shell(`
    <h1 style="font-size:20px;margin:0 0 4px;">New enquiry</h1>
    <p style="color:#6b6559;font-size:14px;margin:0 0 20px;">via the website enquiry form</p>
    <table style="width:100%;border-collapse:collapse;">
      ${row("Name", data.name)}
      ${row("Email", data.email)}
      ${row("Phone", data.phone ?? "")}
      ${row("Event type", eventTypeLabels[data.eventType])}
      ${row("Date", data.eventDate + (data.flexibleDate ? " (flexible)" : ""))}
      ${row("Location", data.location)}
      ${row("Indoor/outdoor", data.indoorOutdoor ?? "")}
      ${row("Power available", data.powerAvailable ?? "")}
      ${row("Guest count", data.guestCount)}
      ${row("Duration", data.duration)}
      ${row("Package interest", packageLabels[data.packageInterest])}
      ${row("Branding wanted", data.branding ? "Yes" : "No")}
    </table>
    ${data.message ? `<p style="margin-top:20px;font-size:14px;"><strong>Message:</strong><br>${esc(data.message).replace(/\n/g, "<br>")}</p>` : ""}
    <p style="margin-top:24px;">
      <a href="mailto:${esc(data.email)}" style="display:inline-block;background:#000;color:#fffbea;padding:10px 20px;border-radius:999px;text-decoration:none;font-size:14px;font-weight:600;">Reply to ${esc(data.name.split(" ")[0] ?? "them")}</a>
    </p>
  `);
  return { subject, html };
}

/** Instant auto-reply to the enquirer — makes a one-person operation feel responsive. */
export function enquiryAutoReplyEmail(data: EnquiryInput) {
  const firstName = data.name.trim().split(" ")[0] ?? "there";
  const subject = `We've got your enquiry, ${firstName}`;
  const html = shell(`
    <h1 style="font-size:22px;margin:0 0 12px;">Thanks, ${esc(firstName)} — we've got it.</h1>
    <p style="font-size:14px;color:#3a362e;line-height:1.6;">
      Your enquiry for ${esc(data.eventDate)} has landed with ${esc(site.owner)}. We check real
      availability and work out a tailored quote for every enquiry, so it isn't instant —
      but you'll normally hear back within a couple of days.
    </p>
    <p style="font-size:14px;color:#3a362e;line-height:1.6;">
      In the meantime, if anything changes about your date, guest numbers or venue, just
      reply to this email and it'll reach us directly.
    </p>
    <p style="margin-top:24px;font-size:14px;color:#6b6559;">
      Elevating events, one sip at a time.<br>— ${esc(site.owner)}
    </p>
  `);
  return { subject, html };
}
