import { Picture } from "@/components/ui/Picture";

/**
 * The brief's second slogan ("your favourite café, brought to you") gets its
 * own moment here rather than being folded into the hero copy - it's making
 * a different point (the cart is a real café experience, not a novelty) and
 * deserves room to land rather than being a subtitle.
 */
export function Positioning() {
  return (
    <section className="border-y border-cream-edge bg-cream-deep">
      <div className="shell grid items-center gap-12 py-20 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
        <div>
          <p className="font-display text-2xl leading-[1.08] sm:text-4xl lg:text-[2.75rem]">
            Your favourite café,
            <br />
            brought to you.
          </p>
          <p className="measure-s mt-6 text-stone">
            Barista-grade equipment, proper beans, and drinks made the way
            you&apos;d expect from a café counter — not a flask and a folding
            table. We bring that whole experience to wherever your event is
            happening, so your guests get the real thing.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <Picture
              base="/images/photos/espresso-pour"
              alt="Espresso pouring into a branded Sip Social cup"
              crop="square"
              sizes="(min-width: 1024px) 20vw, 40vw"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative mt-8 aspect-square overflow-hidden rounded-2xl">
            <Picture
              base="/images/photos/biscuits"
              alt="Shortbread biscuits stamped with the Sip Social logo"
              crop="square"
              sizes="(min-width: 1024px) 20vw, 40vw"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
