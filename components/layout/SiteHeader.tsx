import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { getPrimaryNav } from "@/lib/content/get";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  const nav = getPrimaryNav();
  return (
    <header className="sticky top-0 z-40 border-b border-cream-edge/80 bg-cream/90 backdrop-blur-sm">
      <div className="shell flex h-20 items-center justify-between">
        <Logo priority />

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.95rem] font-medium text-ink/80 transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="/enquire" variant="solid">
            Check your date
          </Button>
        </div>

        <MobileNav items={nav} />
      </div>
    </header>
  );
}
