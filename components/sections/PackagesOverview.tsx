import Link from "next/link";
import { getPackages } from "@/lib/content/get";
import { PackageIcon } from "./PackageIcon";
import { Button } from "@/components/ui/Button";

export function PackagesOverview() {
  const packages = getPackages();
  return (
    <section className="shell py-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-4xl sm:text-5xl">Three ways to work with us</h2>
          <p className="measure-s mt-3 text-stone">
            Every event is different, so pick the shape that fits yours —
            or talk to us and we&apos;ll help you choose.
          </p>
        </div>
        <Button href="/packages" variant="ghost" className="hidden sm:inline-flex">
          Compare all packages
        </Button>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {packages.map((pkg, i) => (
          <Link
            key={pkg.slug}
            href={`/packages#${pkg.slug}`}
            className="group flex flex-col rounded-[1.75rem] border border-cream-edge bg-cream p-8 transition-colors hover:border-ink"
          >
            <PackageIcon
              name={pkg.icon}
              className={`h-10 w-10 ${i === 1 ? "text-bronze" : "text-ink"}`}
            />
            <p className="mt-6 text-sm font-semibold text-bronze">{pkg.tagline}</p>
            <h3 className="mt-1 font-display text-2xl">{pkg.name}</h3>
            <p className="mt-3 flex-1 text-[0.95rem] text-stone">{pkg.description}</p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline decoration-2 underline-offset-4 group-hover:text-bronze">
              See what&apos;s included
            </span>
          </Link>
        ))}
      </div>

      <Button href="/packages" variant="ghost" className="mt-8 sm:hidden">
        Compare all packages
      </Button>
    </section>
  );
}
