import Link from "next/link";
import { Picture } from "@/components/ui/Picture";
import { getEventTypes } from "@/lib/content/get";

export function EventTypesStrip() {
  const events = getEventTypes();
  return (
    <section className="bg-cream-deep py-20">
      <div className="shell">
        <h2 className="font-display text-4xl sm:text-5xl">Built for your kind of event</h2>
        <p className="measure-s mt-3 text-stone">
          From a wedding morning to a conference hall, the cart adapts to
          where you need it.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((e) => (
            <Link
              key={e.slug}
              href={`/events/${e.slug}`}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[3/4]">
                <Picture
                  base={e.heroImage.base}
                  alt={e.heroImage.alt}
                  crop="portrait"
                  sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 90vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-2xl text-cream">{e.shortName}</h3>
                <span className="mt-1 inline-block text-sm text-cream/80 underline decoration-2 underline-offset-4">
                  See how it works
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
