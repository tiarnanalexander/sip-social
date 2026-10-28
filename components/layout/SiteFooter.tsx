import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { WavyRule } from "@/components/ui/WavyRule";
import { getPrimaryNav, getEventTypes } from "@/lib/content/get";
import { site } from "@/lib/site";

export function SiteFooter() {
  const nav = getPrimaryNav();
  const eventTypes = getEventTypes();

  return (
    <footer className="on-ink bg-ink text-cream">
      <div className="shell py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div>
            <Logo className="brightness-0 invert" />
            <p className="mt-5 max-w-[30ch] text-[0.95rem] text-cream/70">
              {site.tagline}.
            </p>
            <WavyRule className="mt-6 h-[6px] w-24 text-bronze" />
          </div>

          <nav aria-label="Site">
            <h3 className="font-display text-lg">Site</h3>
            <ul className="mt-4 space-y-3 text-[0.95rem] text-cream/70">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-cream">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Events">
            <h3 className="font-display text-lg">Events</h3>
            <ul className="mt-4 space-y-3 text-[0.95rem] text-cream/70">
              {eventTypes.map((e) => (
                <li key={e.slug}>
                  <Link href={`/events/${e.slug}`} className="transition-colors hover:text-cream">
                    {e.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-lg">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-[0.95rem] text-cream/70">
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-cream">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phone}`} className="transition-colors hover:text-cream">
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-cream"
                >
                  {site.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-cream/15 pt-8 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. Est. {site.foundedYear}.
          </p>
          <p>Fully mobile, fully equipped, fully insured.</p>
        </div>
      </div>
    </footer>
  );
}
