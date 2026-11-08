"use client";

import React from "react";
import { Star } from "./Strip";
import { ProfileInfo } from "@/types/portfolio";

interface HeroProps {
  profile: ProfileInfo;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  const has = (u?: string) => !!u && u !== "#";

  return (
    <section id="top" className="mx-auto max-w-7xl px-5 pb-16 pt-32 sm:pt-40">
      <p className="max-w-lg font-mono text-sm text-dim">
        {profile.bioHeadline}
      </p>

      <h1
        className="mt-8 font-display font-extrabold leading-[.9] tracking-tight text-[clamp(3.2rem,13.5vw,11.5rem)] select-none"
        aria-label="Full-Stack Developer"
      >
        <span className="block overflow-hidden pb-2" aria-hidden="true">
          Full-Stack
        </span>
        <span className="flex items-center gap-[.15em] overflow-hidden pb-2" aria-hidden="true">
          <Star cls="animate-spinSlow h-[.7em] w-[.7em] text-acc shrink-0" />
          <span>Developer</span>
        </span>
      </h1>

      <div className="mt-10 grid gap-8 md:grid-cols-2 items-start">
        <p className="max-w-lg text-lg leading-relaxed text-fg/90">
          {profile.bioExtended}
        </p>

        <div className="flex flex-wrap items-start gap-3 md:justify-end font-sans">
          <a
            href="#work"
            className="rounded-full bg-acc px-6 py-3 font-semibold text-[#160000] transition-opacity hover:opacity-90"
          >
            View projects
          </a>
          <a
            href="#contact"
            className="rounded-full border border-fg px-6 py-3 font-semibold transition-colors hover:border-acc hover:text-acc"
          >
            Get in touch
          </a>
          {has(profile.github) && (
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line px-5 py-3 transition-colors hover:border-acc hover:text-acc font-medium"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
