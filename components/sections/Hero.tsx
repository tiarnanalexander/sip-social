import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { WavyRule } from "@/components/ui/WavyRule";

/**
 * Split hero rather than full-bleed banner: the source footage (and every
 * photo) is shot portrait on a phone, so a 4:5 frame looks considered in a
 * half-width slot, where a stretched-thin 21:9 banner crop would look soft.
 * Design choice driven by what the real photography/footage actually is.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="shell grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20">
        <div className="order-2 lg:order-1">
          <p className="rise rise-1 font-display text-lg text-bronze sm:text-xl">
            Mobile coffee cart hire
          </p>

          <h1 className="rise rise-2 mt-2 font-display text-5xl leading-[0.98] sm:text-6xl lg:text-[4.2rem]">
            Elevating events,
            <br />
            one sip at a time.
          </h1>

          <WavyRule className="rise rise-3 mt-7 h-[7px] w-40 text-ink" />

          <p className="rise rise-3 measure-s mt-6 text-lg text-stone">
            A fully mobile coffee cart with barista-made drinks, set up wherever
            your event is — weddings, corporate days, launches and parties
            across the UK.
          </p>

          <div className="rise rise-4 mt-9 flex flex-wrap gap-4">
            <Button href="/enquire" variant="solid">
              Check availability
            </Button>
            <Button href="/packages" variant="outline">
              See the packages
            </Button>
          </div>

          <p className="rise rise-4 mt-12 max-w-md border-t border-cream-edge pt-6 font-display text-lg text-stone">
            Mobile. Equipped. Insured.
          </p>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.5rem] rounded-tr-[0.75rem] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.35)] lg:max-w-none">
            {/*
             * Real event footage, muted and looping, with the poster frame as
             * the instant first paint (so this stays the LCP element rather
             * than waiting on video decode). Hidden for prefers-reduced-motion
             * in favour of the static poster — autoplaying video is exactly
             * the kind of motion that setting asks us to drop.
             */}
            <Image
              src="/images/photos/hero-video-poster.jpg"
              alt="The Sip Social mobile coffee cart, set up and ready to serve"
              width={864}
              height={1080}
              priority
              sizes="(min-width: 1024px) 45vw, (min-width: 640px) 70vw, 92vw"
              className="hidden h-full w-full object-cover motion-reduce:block"
            />
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/images/photos/hero-video-poster.jpg"
              aria-hidden="true"
              className="h-full w-full object-cover motion-reduce:hidden"
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
