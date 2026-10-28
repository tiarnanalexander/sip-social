import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Picture } from "@/components/ui/Picture";
import { Button } from "@/components/ui/Button";
import { WavyRule } from "@/components/ui/WavyRule";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd, breadcrumbSchema, serviceSchema, faqSchema } from "@/lib/schema";
import { getEventTypes, getEventTypeBySlug, getPackages } from "@/lib/content/get";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getEventTypes().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventTypeBySlug(slug);
  if (!event) return {};
  return {
    title: event.name,
    description: event.intro,
    alternates: { canonical: `/events/${event.slug}` },
  };
}

export default async function EventTypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventTypeBySlug(slug);
  if (!event) notFound();

  const packages = getPackages().filter((p) => event.suggestedPackageSlugs.includes(p.slug));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: event.shortName, url: `${site.url}/events/${event.slug}` },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          name: event.name,
          description: event.intro,
          url: `${site.url}/events/${event.slug}`,
        })}
      />
      <JsonLd data={faqSchema(event.faqs)} />

      <section className="relative overflow-hidden">
        <div className="shell grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20">
          <div className="order-2 lg:order-1">
            <p className="font-display text-lg text-bronze">{event.shortName}</p>
            <h1 className="mt-2 font-display text-5xl leading-[1.0] sm:text-6xl">{event.name}</h1>
            <WavyRule className="mt-6 h-[7px] w-32 text-ink" />
            <p className="measure-s mt-6 text-lg text-stone">{event.intro}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href={`/enquire?event=${event.slug}`} variant="solid">
                Check your date
              </Button>
              <Button href="/packages" variant="outline">
                See packages
              </Button>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.5rem] rounded-tr-[0.75rem] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.35)] lg:max-w-none">
              <Picture
                base={event.heroImage.base}
                alt={event.heroImage.alt}
                crop="portrait"
                priority
                sizes="(min-width: 1024px) 45vw, (min-width: 640px) 70vw, 92vw"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-cream-edge bg-cream-deep">
        <div className="shell grid gap-12 py-16 lg:grid-cols-[1fr_0.8fr] lg:py-20">
          <div className="measure space-y-5 text-stone">
            {event.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div>
            <h2 className="font-display text-xl">Why it works</h2>
            <ul className="mt-5 space-y-3">
              {event.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-[0.95rem] text-stone">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-bronze" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {packages.length > 0 && (
        <section className="shell py-20">
          <h2 className="font-display text-4xl sm:text-5xl">Suggested packages</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {packages.map((pkg) => (
              <div key={pkg.slug} className="rounded-[1.75rem] border border-cream-edge p-8">
                <p className="text-sm font-semibold text-bronze">{pkg.tagline}</p>
                <h3 className="mt-1 font-display text-2xl">{pkg.name}</h3>
                <p className="mt-3 text-[0.95rem] text-stone">{pkg.description}</p>
                <Button href={`/packages#${pkg.slug}`} variant="ghost" className="mt-5">
                  Full details
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}

      <Faq items={event.faqs} title={`${event.shortName} — common questions`} />
      <FinalCta />
    </>
  );
}
