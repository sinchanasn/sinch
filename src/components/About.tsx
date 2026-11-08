import React from "react";

export const About: React.FC = () => {
  const pillars = [
    [
      "Technical foundation",
      "TypeScript, React and Node. I take a feature from schema to deploy.",
    ],
    [
      "Product ownership",
      "I start with who the user is and what they need to decide, then cut scope until it ships.",
    ],
    [
      "Design sensibility",
      "A strong eye for type, hierarchy and restraint. Minimal on the surface, deliberate underneath.",
    ],
  ];

  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-24">
      <div className="grid gap-12 md:grid-cols-12">
        <h2 className="font-display text-3xl font-extrabold md:col-span-4 tracking-tight">
          About
        </h2>
        <div className="space-y-6 text-xl leading-relaxed md:col-span-8">
          <p className="text-fg/90">
            I’m a computer science undergrad in Bengaluru who builds full-stack and AI products. I
            care about typography, layout hierarchy and minimal aesthetics, and I design every
            interface myself, from the type scale to the hover states, so the product looks as
            considered as it works.
          </p>

          <dl className="grid gap-6 border-t border-line pt-6 text-base sm:grid-cols-3">
            {pillars.map(([a, b]) => (
              <div key={a}>
                <dt className="font-display font-extrabold text-acc text-lg">{a}</dt>
                <dd className="mt-2 text-dim text-sm leading-relaxed">{b}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};
