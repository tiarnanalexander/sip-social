import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Positioning } from "@/components/sections/Positioning";
import { PackagesOverview } from "@/components/sections/PackagesOverview";
import { EventTypesStrip } from "@/components/sections/EventTypesStrip";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd, organizationSchema, faqSchema } from "@/lib/schema";
import { getGalleryImages, getSiteFaqs } from "@/lib/content/get";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — Mobile Coffee Cart Hire for Weddings, Corporate Events & Launches`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const faqs = getSiteFaqs().slice(0, 4);
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={faqSchema(faqs)} />
      <Hero />
      <Positioning />
      <PackagesOverview />
      <EventTypesStrip />
      <HowItWorks />
      <InstagramFeed fallback={getGalleryImages()} />
      <Faq items={faqs} />
      <FinalCta />
    </>
  );
}
