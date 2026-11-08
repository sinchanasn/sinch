import React from "react";

interface DesignProps {
  principles?: [string, string][];
}

const DEFAULT_PRINCIPLES: [string, string][] = [
  [
    "Typography",
    "I choose type for character and legibility, then set a clear scale so headings, body text and code each have a job.",
  ],
  [
    "Layout and hierarchy",
    "Every screen has one focal point. Spacing, alignment and contrast guide the eye to what matters first.",
  ],
  [
    "Colour and contrast",
    "Restrained palettes with accessible contrast, checked in both light and dark.",
  ],
  [
    "Interaction and motion",
    "Hover, focus and transition states that show what changed, never decoration for its own sake.",
  ],
  [
    "UI prototyping",
    "I turn rough ideas into responsive, working prototypes and refine them until they feel finished.",
  ],
];

export const Design: React.FC<DesignProps> = ({ principles = DEFAULT_PRINCIPLES }) => {
  return (
    <section id="design" className="mx-auto max-w-7xl px-5 py-24">
      <h2 className="font-display text-3xl font-extrabold tracking-tight">
        Visual craft
      </h2>
      <p className="mt-3 max-w-xl text-dim text-sm sm:text-base">
        Design is where I am strongest. I want the things I build to look as considered as they work.
      </p>

      <ol className="mt-10 border-t border-line">
        {principles.map(([n, d], i) => (
          <li
            key={i}
            className="grid gap-2 border-b border-line py-6 md:grid-cols-12 items-baseline"
          >
            <h3 className="font-display text-2xl font-extrabold md:col-span-5 text-fg tracking-tight">
              {n}
            </h3>
            <p className="text-dim md:col-span-7 leading-relaxed text-base">
              {d}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
};
