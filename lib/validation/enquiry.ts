import { z } from "zod";

/**
 * Single schema shared by the client form (for inline validation) and the
 * server action (for the real check — never trust the client). Field list
 * is deliberately tuned so Zoe can quote without a back-and-forth: event
 * type, date, location, guest count, duration and package in one pass.
 */
export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(120),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().max(30).optional().or(z.literal("")),

  eventType: z.enum(
    ["wedding", "corporate", "product-launch", "private-party", "community-popup", "other"],
    { message: "Choose an event type" }
  ),
  eventDate: z.string().trim().min(1, "Enter a date"),
  flexibleDate: z.boolean().optional(),

  location: z.string().trim().min(2, "Enter a location or postcode").max(200),
  indoorOutdoor: z.enum(["indoor", "outdoor", "both", "unsure"]).optional(),
  powerAvailable: z.enum(["yes", "no", "unsure"]).optional(),

  guestCount: z.string().trim().min(1, "Enter an approximate guest count"),
  duration: z.string().trim().min(1, "Enter how long you'll need us for"),

  packageInterest: z.enum(["pay-as-you-go", "all-inclusive", "branded-experience", "unsure"]),
  branding: z.boolean().optional(),

  message: z.string().trim().max(2000).optional().or(z.literal("")),

  // honeypot - real users never see or fill this field
  company: z.string().max(0, "").optional().or(z.literal("")),

  turnstileToken: z.string().optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const eventTypeLabels: Record<EnquiryInput["eventType"], string> = {
  wedding: "Wedding",
  corporate: "Corporate event",
  "product-launch": "Product launch / brand activation",
  "private-party": "Private party",
  "community-popup": "Community event / pop-up",
  other: "Other",
};

export const packageLabels: Record<EnquiryInput["packageInterest"], string> = {
  "pay-as-you-go": "The Flexible Option — pay as you go",
  "all-inclusive": "The All-Inclusive Option — prepaid package",
  "branded-experience": "The Branded Experience — your brand, our coffee",
  unsure: "Not sure yet",
};
