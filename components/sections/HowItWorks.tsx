import { getHowItWorks } from "@/lib/content/get";

/**
 * The one place on the site that earns numbered markers - this genuinely is
 * a sequence (enquire, then quote, then confirm, then the day itself), not
 * decoration bolted onto an unordered list.
 */
export function HowItWorks() {
  const steps = getHowItWorks();
  return (
    <section className="shell py-20">
      <h2 className="font-display text-4xl sm:text-5xl">How it works</h2>
      <p className="measure-s mt-3 text-stone">
        No price list, because no two events need the same thing — just a
        quick back-and-forth to get your quote right.
      </p>

      <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.title} className="relative">
            <span className="font-display text-5xl text-bronze/35" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-display text-xl">{step.title}</h3>
            <p className="mt-2 text-[0.95rem] text-stone">{step.body}</p>
            {i < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute -right-5 top-5 hidden h-px w-10 bg-cream-edge lg:block"
              />
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
