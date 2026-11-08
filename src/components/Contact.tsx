"use client";

import React, { useState } from "react";
import { ProfileInfo } from "@/types/portfolio";

interface ContactProps {
  profile: ProfileInfo;
}

export const Contact: React.FC<ContactProps> = ({ profile }) => {
  const [copied, setCopied] = useState(false);
  const has = (u?: string) => !!u && u !== "#";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      const t = document.createElement("textarea");
      t.value = profile.email;
      document.body.appendChild(t);
      t.select();
      try {
        document.execCommand("copy");
      } catch {
        // ignore
      }
      t.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="bg-acc py-24 text-[#160000] transition-colors">
      <div className="mx-auto max-w-7xl px-5">
        <h2 className="font-display text-[clamp(2.6rem,10vw,8rem)] font-extrabold leading-[.95] tracking-tight">
          Let’s build something.
        </h2>

        <div className="mt-10 flex flex-wrap gap-3 font-sans">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-[#160000] px-6 py-3 font-semibold text-[#F1E7DF] hover:opacity-90 transition-opacity"
          >
            Email me
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="rounded-full border-2 border-[#160000] px-6 py-3 font-mono text-sm font-medium text-[#160000] hover:bg-[#160000] hover:text-[#F1E7DF] transition-colors"
          >
            {copied ? "Copied to clipboard" : profile.email}
          </button>
          <span className="sr-only" role="status">
            {copied ? "Email address copied" : ""}
          </span>

          {has(profile.github) && (
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border-2 border-[#160000] px-6 py-3 font-semibold text-[#160000] hover:bg-[#160000] hover:text-[#F1E7DF] transition-colors"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
