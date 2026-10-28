import { site } from "./site";

/**
 * JSON-LD builders. LocalBusiness is used (not just Organization) because
 * it's the schema Google actually surfaces for service-area businesses in
 * rich results, even without a storefront address - areaServed plus the
 * omission of a street address signals "comes to you" correctly.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.legalName,
    description: site.description,
    url: site.url,
    image: `${site.url}/opengraph-image`,
    telephone: site.phone,
    email: site.email,
    priceRange: site.priceRange,
    areaServed: { "@type": "Country", name: site.areaServed },
    founder: { "@type": "Person", name: site.owner },
    sameAs: [site.instagram],
  };
}

export function serviceSchema(opts: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: { "@id": `${site.url}/#business` },
    areaServed: { "@type": "Country", name: site.areaServed },
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
