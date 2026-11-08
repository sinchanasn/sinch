"use client";

import React from "react";

interface HeaderProps {
  light: boolean;
  setLight: (light: boolean) => void;
  name?: string;
}

export const Header: React.FC<HeaderProps> = ({
  light,
  setLight,
  name = "Sinchana",
}) => {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/85 backdrop-blur transition-colors"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 text-sm"
      >
        <a href="#top" className="font-display text-lg font-extrabold tracking-tight">
          {name}
        </a>
        <ul className="flex items-center gap-1 sm:gap-4 font-sans font-medium">
          {[
            ["About", "#about"],
            ["Work", "#work"],
            ["Skills", "#skills"],
            ["Contact", "#contact"],
          ].map(([a, h]) => (
            <li key={h}>
              <a href={h} className="px-2 py-1 transition-colors hover:text-acc">
                {a}
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              aria-pressed={light}
              onClick={() => setLight(!light)}
              className="rounded-full border border-line px-3 py-1 font-mono text-xs transition-colors hover:border-acc hover:text-acc"
            >
              Change contrast
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
