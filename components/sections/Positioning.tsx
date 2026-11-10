import { Picture } from "@/components/ui/Picture";
import type { HomepageContent } from "@/lib/content/types";

/**
 * The brief's second slogan ("your favourite café, brought to you") gets its
 * own moment here rather than being folded into the hero copy - it's making
 * a different point (the cart is a real café experience, not a novelty) and
 * deserves room to land rather than being a subtitle.
 */
export function Positioning({ content }: { content: HomepageContent["positioning"] }) {
  const [first, second] = content.photos;
  return (
    <section className="border-y border-cream-edge bg-cream-deep">
      <div className="shell grid items-center gap-12 py-20 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
        <div>
          <p className="whitespace-pre-line font-display text-2xl leading-[1.08] sm:text-4xl lg:text-[2.75rem]">
            {content.headline}
          </p>
          <p className="measure-s mt-6 text-stone">{content.body}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {first && (
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Picture
                base={first.base}
                alt=""
                crop="square"
                sizes="(min-width: 1024px) 20vw, 40vw"
                className="h-full w-full object-cover"
              />
            </div>
          )}
          {second && (
            <div className="relative mt-8 aspect-square overflow-hidden rounded-2xl">
              <Picture
                base={second.base}
                alt=""
                crop="square"
                sizes="(min-width: 1024px) 20vw, 40vw"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
