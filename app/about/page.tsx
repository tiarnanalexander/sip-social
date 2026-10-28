import type { Metadata } from "next";
import { Picture } from "@/components/ui/Picture";
import { Button } from "@/components/ui/Button";
import { WavyRule } from "@/components/ui/WavyRule";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Sip Social",
  description: `Meet ${site.owner}, the founder behind Sip Social's mobile coffee cart.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "About", url: `${site.url}/about` },
        ])}
      />

      <section className="shell grid items-center gap-12 py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:py-24">
        <div className="order-2 lg:order-1">
          <p className="font-display text-lg text-bronze">About Sip Social</p>
          <h1 className="mt-2 font-display text-5xl leading-[1.0] sm:text-6xl">
            Hi, I&apos;m {site.owner.split(" ")[0]}.
          </h1>
          <WavyRule className="mt-6 h-[7px] w-32 text-ink" />

          <div className="measure-s mt-7 space-y-5 text-stone">
            <p>
              Sip Social started with a simple idea: the best part of a good
              event is the moment you stop, take a breath, and have a proper
              coffee with someone. Most events don&apos;t have that moment built
              in — there&apos;s a buffet, maybe a bar, but rarely a café.
            </p>
            <p>
              I set out to change that. Every drink is made properly, to
              order, by a trained barista — because an event full of people
              deserves better than instant coffee from an urn.
            </p>
            <p>
              Since then it&apos;s grown into a fully mobile set-up, equipped and
              insured, that travels to weddings, office days, launches and
              parties. Whatever the occasion, the goal is the same one I
              started with — bring your favourite café to you, and make
              people&apos;s day a little better, one sip at a time.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/enquire" variant="solid">Check your date</Button>
            <Button href="/packages" variant="outline">See the packages</Button>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.5rem] rounded-tl-[0.75rem] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.35)] lg:max-w-none">
            <Picture
              base="/images/photos/zoe-portrait"
              alt={`${site.owner}, founder of Sip Social, holding a freshly made coffee`}
              crop="portrait"
              priority
              sizes="(min-width: 1024px) 45vw, (min-width: 640px) 70vw, 92vw"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-cream-edge bg-cream-deep">
        <div className="shell grid gap-8 py-16 sm:grid-cols-3">
          {[
            { k: "Fully mobile", v: "We travel to you, anywhere in the UK." },
            { k: "Fully equipped", v: "Barista-grade machine, grinder and everything in between." },
            { k: "Fully insured", v: "Public liability cover, details on request for your venue." },
          ].map((item) => (
            <div key={item.k}>
              <h2 className="font-display text-2xl">{item.k}</h2>
              <p className="mt-2 text-[0.95rem] text-stone">{item.v}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="shell grid gap-6 py-16 sm:grid-cols-3">
        {["machine-plants", "portafilter", "cards-fanned"].map((base) => (
          <div key={base} className="relative aspect-square overflow-hidden rounded-2xl">
            <Picture
              base={`/images/photos/${base}`}
              alt=""
              crop="square"
              sizes="(min-width: 640px) 30vw, 90vw"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <Faq
        title="Before you enquire"
        items={[
          {
            q: "What areas do you cover?",
            a: "Sip Social is fully mobile and takes bookings across the UK — tell us your location and we'll confirm availability.",
          },
          {
            q: "Can I see you in action before booking?",
            a: "Keep an eye on our Instagram for upcoming pop-ups, or ask when you enquire — we're happy to point you to photos and feedback from recent events.",
          },
        ]}
      />

      <FinalCta />
    </>
  );
}
