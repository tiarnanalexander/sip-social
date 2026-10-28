import type { EventType } from "@/lib/content/types";

/**
 * One page per event type. These are the landing pages aimed at searches
 * like "wedding coffee cart hire" and "corporate coffee cart" - queries that
 * don't localise hard the way town-level searches do, which matters for a
 * mobile operator with no fixed base.
 *
 * Town-level pages are deliberately not built yet (see /lib/content/towns.ts
 * for the dormant scaffold) - there isn't enough event history to back up
 * location-specific claims, and Google heavily favours established local
 * operators on those queries regardless of page quality.
 */
export const eventTypes: EventType[] = [
  {
    slug: "wedding-coffee-cart",
    name: "Wedding Coffee Cart Hire",
    shortName: "Weddings",
    heroImage: { base: "/images/photos/zoe-with-cart", alt: "Sip Social coffee cart set up for a wedding" },
    intro:
      "A coffee cart gives your guests something to do and somewhere to gather, at exactly the moments a wedding day needs it most.",
    body: [
      "The gap between ceremony and wedding breakfast is the hardest part of a wedding day to plan for. Guests are dressed up, photos are happening, and there's often an hour or two with nothing official going on. A coffee cart gives people a reason to linger somewhere specific — and a hot drink is especially welcome if your ceremony is outdoors or the weather turns.",
      "It works just as well later in the day. An evening coffee cart, after the dancing has been going a while, is a genuinely appreciated reset — and it keeps the night going for guests who'd otherwise start heading home.",
      "Most couples choose the all-inclusive package for a wedding, so no guest reaches for their wallet. If it suits your day, the branded experience lets you put your own monogram or wedding date on the takeaway cups — a detail guests tend to photograph.",
    ],
    highlights: [
      "Fills the ceremony-to-breakfast gap guests remember",
      "Works outdoors, indoors, or both across the day",
      "Branded cups make a lovely, photographable detail",
      "One fixed fee — no guest ever needs to pay",
    ],
    suggestedPackageSlugs: ["all-inclusive", "branded-experience"],
    faqs: [
      {
        q: "How much space does the cart need?",
        a: "Enough for the cart itself and room for us to work and for a short queue to form — in practice a few metres is normally plenty. We'll confirm the exact footprint once we know your venue.",
      },
      {
        q: "Can you work outdoors?",
        a: "Yes, weather and venue access allowing. We'll talk through the specifics of your location, including power and any cover, when you enquire.",
      },
      {
        q: "How far in advance should we book?",
        a: "As early as you can once your date and venue are confirmed. Wedding season weekends go first.",
      },
    ],
  },
  {
    slug: "corporate-coffee-cart",
    name: "Corporate Event Coffee Cart",
    shortName: "Corporate",
    heroImage: { base: "/images/photos/cart-hero", alt: "Sip Social coffee cart at a corporate event" },
    intro:
      "Proper coffee, on site, for conferences, launches, office days and client events — no queue at a café down the road.",
    body: [
      "Good coffee changes the tone of a work event. It gives people a reason to stop at your stand, keeps a conference crowd alert through the afternoon slump, and gives staff something better than a vending machine on a long office day.",
      "For client-facing events, the branded experience package puts your company's identity on the cart and the cups — a small, consistent touch that reinforces the brand at exactly the moment people are already paying attention.",
      "We work with event organisers directly, so if you need particular timings, a specific footprint, or coordination with other suppliers on site, that's a normal part of planning your event.",
    ],
    highlights: [
      "On-brand set-up available for client-facing events",
      "Keeps a conference or all-day event running on good coffee",
      "Pay-as-you-go suits open office or drop-in events",
      "We coordinate directly with your event team",
    ],
    suggestedPackageSlugs: ["branded-experience", "all-inclusive", "pay-as-you-go"],
    faqs: [
      {
        q: "Can you work inside an office building?",
        a: "Yes — we just need to know about lift access, loading, and where we'll be set up, so get in touch with the building details.",
      },
      {
        q: "Do you have public liability insurance?",
        a: "Yes, we're fully insured. Details can be provided to your venue or facilities team on request.",
      },
      {
        q: "Can we pay per head instead of a fixed fee?",
        a: "That's what the pay-as-you-go package is for — guests buy individually, so there's no fixed fee at all. Let us know which suits your event when you enquire.",
      },
    ],
  },
  {
    slug: "product-launch-coffee-cart",
    name: "Product Launch & Brand Activation",
    shortName: "Launches",
    heroImage: { base: "/images/photos/cart-sunlit", alt: "Branded Sip Social coffee cart at a product launch" },
    intro:
      "Turn the cart into a fully branded activation — your logo, your cups, a standout moment guests will photograph.",
    body: [
      "A branded coffee cart does two things a normal catering stand can't: it gives people a reason to come to you, and it hands them something with your branding on it that they'll carry around the room, photograph, and post. For a launch or activation, that's worth more than the coffee itself.",
      "We apply your logo to the cart and print custom takeaway cups, so the whole set-up reads as part of your event rather than a generic add-on. It works as a standalone activation or alongside a wider launch.",
    ],
    highlights: [
      "Your logo on the cart, your branding on every cup",
      "A natural gathering point for guests at a launch",
      "Genuinely photographable — built for social sharing",
      "Flexible on timing, from a two-hour activation to a full day",
    ],
    suggestedPackageSlugs: ["branded-experience"],
    faqs: [
      {
        q: "How far ahead do you need our branding?",
        a: "The earlier the better once you've booked — cup printing has its own lead time, so send logo files as soon as you have them.",
      },
      {
        q: "Can the cart match our brand colours?",
        a: "Within what's practical on the day — let us know your palette when you enquire and we'll talk through what's possible.",
      },
    ],
  },
  {
    slug: "private-party-coffee-cart",
    name: "Private Party Coffee Cart",
    shortName: "Private parties",
    heroImage: { base: "/images/photos/cart-serving", alt: "Coffee being prepared on the Sip Social cart at a private event" },
    intro:
      "Birthdays, christenings, garden parties and family celebrations — proper coffee for your guests, without you lifting a finger.",
    body: [
      "Not every party needs a full bar, but most benefit from good coffee somewhere in the day — for the designated drivers, for anyone who needs to perk up before a long afternoon, or simply because it's a nicer thing to offer guests than instant from a flask.",
      "We set up, serve, and clear down, so hosting the party doesn't mean also running a drinks station.",
    ],
    highlights: [
      "Ideal for garden parties, birthdays and family celebrations",
      "You host — we handle the coffee",
      "Scales from a small gathering to a large garden party",
    ],
    suggestedPackageSlugs: ["all-inclusive", "pay-as-you-go"],
    faqs: [
      {
        q: "What's the smallest event you'll cater?",
        a: "Get in touch with your guest numbers and we'll let you know what works — there's no fixed minimum, but very small gatherings may suit a different package than a large one.",
      },
      {
        q: "Do you need access to a kitchen or power supply?",
        a: "The cart is fully self-contained for most set-ups, but access to power is helpful. Tell us about your location when you enquire and we'll confirm what's needed.",
      },
    ],
  },
];

export function getEventTypeBySlug(slug: string) {
  return eventTypes.find((e) => e.slug === slug);
}
