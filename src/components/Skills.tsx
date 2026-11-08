"use client";

import React, { useState, useRef } from "react";

interface SkillsProps {
  skillsData?: Record<string, string[]>;
}

const DEFAULT_SKILLS: Record<string, string[]> = {
  Languages: ["Python", "JavaScript (ES6+)", "TypeScript", "SQL", "HTML5", "CSS3", "C/C++"],
  Frontend: ["React.js", "Next.js", "Tailwind CSS", "Responsive UI/UX prototyping"],
  "Backend & APIs": ["Node.js", "Express.js", "RESTful APIs", "SQLite"],
  "Developer Tools": ["Git", "GitHub", "VS Code", "Vite", "Postman", "npm"],
  "AI & Data": [
    "LLM orchestration",
    "Prompt engineering",
    "Google AI Studio",
    "BeautifulSoup",
    "Selenium",
  ],
};

export const Skills: React.FC<SkillsProps> = ({ skillsData = DEFAULT_SKILLS }) => {
  const tabs = ["All", ...Object.keys(skillsData)];
  const [activeTab, setActiveTab] = useState("All");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, i: number) => {
    let nextIdx = i;
    if (e.key === "ArrowRight") nextIdx = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") nextIdx = (i - 1 + tabs.length) % tabs.length;
    else return;

    e.preventDefault();
    setActiveTab(tabs[nextIdx]);
    refs.current[nextIdx]?.focus();
  };

  const groups: [string, string[]][] =
    activeTab === "All"
      ? Object.entries(skillsData)
      : [[activeTab, skillsData[activeTab] || []]];

  return (
    <section id="skills" className="mx-auto max-w-7xl px-5 py-24">
      <h2 className="font-display text-3xl font-extrabold tracking-tight">
        Technical arsenal
      </h2>

      {/* Category Tabs */}
      <div
        role="tablist"
        aria-label="Skill categories"
        className="mt-8 flex flex-wrap gap-2"
      >
        {tabs.map((x, i) => (
          <button
            key={x}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            id={`t${i}`}
            aria-selected={activeTab === x}
            aria-controls="sp"
            tabIndex={activeTab === x ? 0 : -1}
            onClick={() => setActiveTab(x)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === x
                ? "border-acc bg-acc text-[#160000]"
                : "border-line hover:border-acc hover:text-acc"
            }`}
          >
            {x}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div
        id="sp"
        role="tabpanel"
        aria-labelledby={`t${tabs.indexOf(activeTab)}`}
        className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {groups.map(([name, items]) => (
          <div key={name} className="border-t border-line pt-4 space-y-4">
            <h3 className="font-display text-xl font-extrabold text-fg tracking-tight">
              {name}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {items.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-line px-3 py-1 font-mono text-xs text-dim hover:border-acc hover:text-fg transition-colors"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
