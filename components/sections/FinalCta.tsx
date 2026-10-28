import { Picture } from "@/components/ui/Picture";
import { Button } from "@/components/ui/Button";
import { WavyRule } from "@/components/ui/WavyRule";

export function FinalCta() {
  return (
    <section className="shell pb-24">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-ink">
        <div className="absolute inset-0 opacity-[0.16]">
          <Picture
            base="/images/photos/cups-window"
            alt=""
            crop="wide"
            sizes="100vw"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="on-ink relative px-6 py-16 text-center sm:px-16 sm:py-24">
          <h2 className="mx-auto max-w-2xl font-display text-4xl leading-[1.05] text-cream sm:text-5xl lg:text-6xl">
            Got a date in mind?
          </h2>
          <WavyRule className="mx-auto mt-6 h-[7px] w-36 text-bronze" />
          <p className="mx-auto mt-6 max-w-md text-cream/70">
            Tell us about your event and we&apos;ll check availability and send
            over a quote — usually within a couple of days.
          </p>
          <Button href="/enquire" variant="invert" className="mt-9">
            Start your enquiry
          </Button>
        </div>
      </div>
    </section>
  );
}
