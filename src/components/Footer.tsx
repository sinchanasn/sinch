import React from "react";
import Link from "next/link";
import { Lock } from "lucide-react";

export const Footer: React.FC<{ name?: string }> = ({ name = "Sinchana" }) => {
  return (
    <footer className="mx-auto max-w-7xl px-5 py-8 font-mono text-xs text-dim flex flex-wrap items-center justify-between gap-4">
      <div>
        © 2026 {name}. Bengaluru, India. React, Tailwind CSS and Next.js.
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/admin"
          className="text-dim/60 hover:text-acc transition-colors flex items-center gap-1"
          title="Admin CMS"
        >
          <Lock className="w-3 h-3" />
          <span>Studio</span>
        </Link>
      </div>
    </footer>
  );
};
