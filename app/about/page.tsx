import type { Metadata } from "next";
import { Picture } from "@/components/ui/Picture";
import { Button } from "@/components/ui/Button";
import { WavyRule } from "@/components/ui/WavyRule";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { getAboutContent } from "@/lib/content/get";

export const metadata: Metadata = {
  title: "About Sip Social",
  description: `Meet ${site.owner}, the founder behind Sip Social's mobile coffee cart.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const about = getAboutContent();
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
            {about.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/enquire" variant="solid">Check availability</Button>
            <Button href="/packages" variant="outline">See the packages</Button>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.5rem] rounded-tl-[0.75rem] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.35)] lg:max-w-none">
            <Picture
              base={about.portrait.base}
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
        <div className="shell py-16">
          <p className="font-display text-2xl sm:text-3xl">
            {about.featuresHeading}
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {about.features.map((item) => (
              <div key={item.title}>
                <h2 className="font-display text-xl">{item.title}</h2>
                <p className="mt-2 text-[0.95rem] text-stone">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="shell grid gap-6 py-16 sm:grid-cols-3">
        {about.bioImages.map((img) => (
          <div key={img.base} className="relative aspect-square overflow-hidden rounded-2xl">
            <Picture
              base={img.base}
              alt=""
              crop="square"
              sizes="(min-width: 640px) 30vw, 90vw"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <Faq title="Before you enquire" items={about.faqs} />

      <FinalCta />
    </>
  );
}
