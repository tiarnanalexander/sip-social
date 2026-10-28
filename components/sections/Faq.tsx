import type { FaqItem } from "@/lib/content/types";

export function Faq({ items, title = "Questions, answered" }: { items: FaqItem[]; title?: string }) {
  return (
    <section className="shell py-20">
      <h2 className="font-display text-4xl sm:text-5xl">{title}</h2>
      <div className="mt-10 divide-y divide-cream-edge border-y border-cream-edge">
        {items.map((item) => (
          <details key={item.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg sm:text-xl">
              {item.q}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="flex-none text-bronze transition-transform duration-300 group-open:rotate-45"
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
            </summary>
            <p className="measure-s mt-3 text-stone">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
