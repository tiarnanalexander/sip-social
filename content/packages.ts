import type { Package } from "@/lib/content/types";

/**
 * The three packages exactly as Zoe described them, tightened for clarity.
 * Nothing invented: no prices (confirmed quote-only), no guest-count bands
 * that weren't given.
 */
export const packages: Package[] = [
  {
    slug: "pay-as-you-go",
    name: "The Flexible Option",
    tagline: "Pay as you go",
    description:
      "You bring the guests, we'll bring the coffee. Our mobile cart sets up at your event and guests simply buy their favourite drinks as they go — no upfront cost to you.",
    bestFor: ["Markets & pop-ups", "Community events", "Open-door occasions"],
    includes: [
      "Fully equipped cart, set up and run by us",
      "Guests pay per drink, cash or card",
      "No minimum spend for you",
      "Full menu of barista-made drinks",
    ],
    icon: "cart",
  },
  {
    slug: "all-inclusive",
    name: "The All-Inclusive Option",
    tagline: "Prepaid package",
    description:
      "Your treat, our pleasure. Pay one upfront fee and let us take care of the rest — we'll set up and serve barista-style drinks for every guest, tailored to your numbers and the length of your event.",
    bestFor: ["Weddings", "Corporate events", "Private parties"],
    includes: [
      "One fixed fee, no surprises on the day",
      "Tailored to your guest count and event duration",
      "Unlimited drinks for your guests",
      "Full set-up, service and clear-down",
    ],
    icon: "gift",
  },
  {
    slug: "branded-experience",
    name: "The Branded Experience",
    tagline: "Your brand, our coffee",
    description:
      "Make Sip Social your own. We transform the cart into a bespoke branded experience — your logo on the cart and custom takeaway cups — for a standout, memorable moment with your guests.",
    bestFor: ["Product launches", "Brand activations", "Corporate hospitality"],
    includes: [
      "Your logo applied to the cart",
      "Custom-printed takeaway cups",
      "Fully branded, photo-ready set-up",
      "Can be combined with either package above",
    ],
    icon: "sparkle",
  },
];

export const howItWorks = [
  {
    title: "Get in touch",
    body: "Tell us your date, location and what you've got in mind. No two events are the same, so there's no fixed price list — just an enquiry form that takes two minutes.",
  },
  {
    title: "We check and quote",
    body: "We check the date, work out what suits your guest numbers and event length, and send back a clear, tailored quote.",
  },
  {
    title: "Confirm your date",
    body: "Happy with the quote? We lock in your date and start planning the details — branding, menu, timings.",
  },
  {
    title: "We arrive and set up",
    body: "On the day, we bring the cart, the kit and the coffee. You and your guests just enjoy it.",
  },
];
