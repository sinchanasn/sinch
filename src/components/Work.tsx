"use client";

import React, { useState } from "react";
import { Project } from "@/types/portfolio";
import { Radar } from "./Radar";

interface WorkProps {
  projects: Project[];
}

export const Work: React.FC<WorkProps> = ({ projects }) => {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const has = (u?: string) => !!u && u !== "#";

  return (
    <section id="work" className="mx-auto max-w-7xl px-5 py-24">
      <h2 className="font-display text-3xl font-extrabold tracking-[.3em] uppercase">
        W O R K
      </h2>
      <p className="mt-3 max-w-md text-dim text-sm sm:text-base">
        A product I designed and built end to end. Open the row for details.
      </p>

      <ul className="mt-10 border-t border-line">
        {projects.map((p, i) => {
          const isOpen = openIndex === i;
          const id = `row-${i}`;

          return (
            <li key={p.id || p.t} className="border-b border-line">
              <h3>
                <button
                  type="button"
                  id={`${id}-b`}
                  aria-expanded={isOpen}
                  aria-controls={id}
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="group flex w-full items-baseline justify-between gap-4 py-6 text-left transition-colors"
                >
                  <span className="font-display text-4xl font-extrabold transition-colors group-hover:text-acc sm:text-6xl tracking-tight">
                    {p.t}
                  </span>
                  <span className="hidden max-w-xs text-right text-sm text-dim sm:block font-medium">
                    {p.s}
                  </span>
                  <span className="font-mono text-sm text-dim shrink-0">
                    #{String(i + 1).padStart(2, "0")}/{String(projects.length).padStart(2, "0")}
                  </span>
                </button>
              </h3>

              <div
                id={id}
                role="region"
                aria-labelledby={`${id}-b`}
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-[800px] opacity-100 pb-10" : "max-h-0 opacity-0 pb-0"
                }`}
              >
                <div className="grid gap-8 md:grid-cols-12 pt-2">
                  {/* Left Column: Description, Tech Tags & Action Buttons */}
                  <div className="md:col-span-6 space-y-5">
                    <p className="text-lg leading-relaxed text-fg/90">
                      {p.d}
                    </p>

                    <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                      {p.tech.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-line px-3 py-1 font-mono text-xs text-dim"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-3 pt-2">
                      {has(p.demo) && (
                        <a
                          tabIndex={isOpen ? 0 : -1}
                          href={p.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full bg-acc px-6 py-2.5 font-semibold text-[#160000] hover:opacity-90 transition-opacity text-sm inline-block"
                        >
                          Live demo
                        </a>
                      )}
                      {has(p.repo) && (
                        <a
                          tabIndex={isOpen ? 0 : -1}
                          href={p.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-fg px-6 py-2.5 font-semibold hover:border-acc hover:text-acc transition-colors text-sm inline-block"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Middle Column: Metrics */}
                  <dl className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-4 md:col-span-3">
                    {p.m.map(([n, l]) => (
                      <div key={l} className="border-l-2 border-acc pl-3">
                        <dt className="sr-only">{l}</dt>
                        <dd className="font-display text-3xl font-extrabold tracking-tight text-fg">
                          {n}
                        </dd>
                        <dd className="text-xs text-dim font-medium mt-0.5">{l}</dd>
                      </div>
                    ))}
                  </dl>

                  {/* Right Column: Risk Radar SVG */}
                  <div className="md:col-span-3 flex items-center justify-center">
                    {p.radar && isOpen && <Radar data={p.radarData} />}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
