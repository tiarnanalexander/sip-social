import type { Metadata } from "next";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { FinalCta } from "@/components/sections/FinalCta";
import { WavyRule } from "@/components/ui/WavyRule";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { getGalleryImages } from "@/lib/content/get";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from Sip Social events — the cart, the coffee, and the details in between.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  const images = getGalleryImages();
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Gallery", url: `${site.url}/gallery` },
        ])}
      />

      <section className="shell py-16 text-center lg:py-20">
        <p className="font-display text-lg text-bronze">Gallery</p>
        <h1 className="mx-auto mt-2 max-w-2xl font-display text-5xl leading-[1.02] sm:text-6xl">
          Coffee looks good on you.
        </h1>
        <WavyRule className="mx-auto mt-6 h-[7px] w-36 text-ink" />
        <p className="measure-s mx-auto mt-6 text-stone">
          A look at the cart, the coffee and the details from recent events.
          More to come as the season fills up.
        </p>
      </section>

      <section className="shell pb-20">
        <GalleryGrid images={images} />
      </section>

      <FinalCta />
    </>
  );
}
