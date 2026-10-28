import type { Metadata } from "next";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { WavyRule } from "@/components/ui/WavyRule";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Enquire",
  description: "Tell us about your event and get a tailored quote for Sip Social's mobile coffee cart.",
  alternates: { canonical: "/enquire" },
};

export default function EnquirePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Enquire", url: `${site.url}/enquire` },
        ])}
      />

      <section className="shell py-16 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-lg text-bronze">Enquire</p>
          <h1 className="mt-2 font-display text-5xl leading-[1.0] sm:text-6xl">
            Let&apos;s talk about your event
          </h1>
          <WavyRule className="mx-auto mt-6 h-[7px] w-32 text-ink" />
          <p className="measure-s mx-auto mt-6 text-stone">
            Every event is different, so we quote each one individually.
            Fill this in and we&apos;ll check your date and come back with a
            tailored price — usually within a couple of days.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-2xl">
          <Suspense fallback={<FormSkeleton />}>
            <EnquiryForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}

function FormSkeleton() {
  return (
    <div className="space-y-6" aria-hidden="true">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-14 animate-pulse rounded-xl bg-cream-deep" />
      ))}
    </div>
  );
}
