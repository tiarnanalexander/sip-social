import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { WavyRule } from "@/components/ui/WavyRule";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

/**
 * The one spot on the site that borrows the actual hand-drawn illustration
 * from Zoe's opening-shift poster, rather than just its style (which the
 * package icons already echo). A 404 is low-stakes and rarely seen, so it's
 * a safe, charming place to spend that asset without competing with the
 * photography-led feel of the main pages.
 */
export default function NotFound() {
  return (
    <section className="shell flex flex-col items-center gap-8 py-20 text-center sm:py-28">
      <Image
        src="/images/machine-sketch.png"
        alt=""
        width={850}
        height={768}
        className="w-56 opacity-90 sm:w-72"
        priority
      />

      <div>
        <p className="font-display text-lg text-bronze">404</p>
        <h1 className="mt-2 font-display text-4xl leading-[1.05] sm:text-5xl">
          Nothing brewing here.
        </h1>
        <WavyRule className="mx-auto mt-5 h-[7px] w-32 text-ink" />
        <p className="measure-s mx-auto mt-6 text-stone">
          That page has gone cold. Let&apos;s get you back to something warmer.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button href="/" variant="solid">Back to home</Button>
        <Button href="/enquire" variant="outline">Check availability</Button>
      </div>
    </section>
  );
}
