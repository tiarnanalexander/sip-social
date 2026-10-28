import type { Metadata } from "next";
import { PackageIcon } from "@/components/sections/PackageIcon";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Button } from "@/components/ui/Button";
import { WavyRule } from "@/components/ui/WavyRule";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { getPackages, getSiteFaqs } from "@/lib/content/get";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Packages & Pricing",
  description:
    "Three ways to book Sip Social's mobile coffee cart: pay-as-you-go, an all-inclusive package, or a fully branded experience.",
  alternates: { canonical: "/packages" },
};

export default function PackagesPage() {
  const packages = getPackages();
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Packages", url: `${site.url}/packages` },
        ])}
      />
      {packages.map((pkg) => (
        <JsonLd
          key={pkg.slug}
          data={serviceSchema({
            name: pkg.name,
            description: pkg.description,
            url: `${site.url}/packages#${pkg.slug}`,
          })}
        />
      ))}

      <section className="shell py-16 text-center lg:py-20">
        <p className="font-display text-lg text-bronze">Packages</p>
        <h1 className="mx-auto mt-2 max-w-2xl font-display text-5xl leading-[1.02] sm:text-6xl">
          A package for every kind of event
        </h1>
        <WavyRule className="mx-auto mt-6 h-[7px] w-36 text-ink" />
        <p className="measure-s mx-auto mt-6 text-stone">
          No fixed price list — every event&apos;s guest count, duration and venue
          are different, so we quote each one individually. Here&apos;s how the
          three options work.
        </p>
      </section>

      <section className="shell pb-20">
        <div className="space-y-6">
          {packages.map((pkg, i) => (
            <article
              key={pkg.slug}
              id={pkg.slug}
              className="scroll-mt-28 rounded-[2rem] border border-cream-edge bg-cream-deep p-8 sm:p-12"
            >
              <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-12">
                <PackageIcon
                  name={pkg.icon}
                  className={`h-14 w-14 ${i === 1 ? "text-bronze" : "text-ink"}`}
                />
                <div>
                  <p className="text-sm font-semibold text-bronze">{pkg.tagline}</p>
                  <h2 className="mt-1 font-display text-3xl sm:text-4xl">{pkg.name}</h2>
                  <p className="measure mt-4 text-stone">{pkg.description}</p>

                  <div className="mt-8 grid gap-8 sm:grid-cols-2">
                    <div>
                      <h3 className="font-display text-lg">Best for</h3>
                      <ul className="mt-3 space-y-2 text-[0.95rem] text-stone">
                        {pkg.bestFor.map((b) => (
                          <li key={b} className="flex gap-2.5">
                            <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-bronze" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-display text-lg">What&apos;s included</h3>
                      <ul className="mt-3 space-y-2 text-[0.95rem] text-stone">
                        {pkg.includes.map((inc) => (
                          <li key={inc} className="flex gap-2.5">
                            <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-ink" />
                            {inc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Button
                    href={`/enquire?package=${pkg.slug}`}
                    variant="outline"
                    className="mt-8"
                  >
                    Enquire about this package
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <HowItWorks />
      <Faq items={getSiteFaqs()} />
      <FinalCta />
    </>
  );
}
