import React from "react";

const generateBits = (n: number, seed: number) => {
  let x = seed;
  let o = "";
  for (let i = 0; i < n; i++) {
    x = (x * 1103515245 + 12345) & 0x7fffffff;
    o += ((x >> 16) & 1) + " ";
  }
  return o;
};

export const Strip: React.FC<{ seed: number }> = ({ seed }) => {
  const b = generateBits(120, seed);
  return (
    <div
      className="overflow-hidden border-y border-line py-2 font-mono text-xs text-dim select-none"
      aria-hidden="true"
    >
      <span className="bin">
        {b}
        {b}
      </span>
    </div>
  );
};

export const Star: React.FC<{ cls?: string }> = ({ cls = "" }) => (
  <svg className={cls} viewBox="0 0 100 100" aria-hidden="true">
    <path
      fill="currentColor"
      d="M50 0l9 33 33-9-24 26 24 26-33-9-9 33-9-33-33 9 24-26L8 24l33 9z"
    />
  </svg>
);
