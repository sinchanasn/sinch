"use client";

import React, { useRef } from "react";

interface RadarProps {
  data?: number[];
}

export const Radar: React.FC<RadarProps> = ({
  data = [0.78, 0.64, 0.85, 0.52, 0.7, 0.6],
}) => {
  const ref = useRef<SVGPolygonElement | null>(null);
  const axes = ["Team", "Market", "Product", "Traction", "Efficiency", "Moat"];
  const values = data.length === 6 ? data : [0.78, 0.64, 0.85, 0.52, 0.7, 0.6];

  const getPoint = (i: number, r: number) => {
    const t = -Math.PI / 2 + (i * Math.PI) / 3;
    return [100 + Math.cos(t) * r * 70, 100 + Math.sin(t) * r * 70];
  };

  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label="Risk radar. Weakest axis: Traction at 52 out of 100"
      className="mx-auto w-full max-w-[260px] select-none"
    >
      {[0.33, 0.66, 1].map((k) => (
        <polygon
          key={k}
          points={axes.map((_, i) => getPoint(i, k).join(",")).join(" ")}
          fill="none"
          stroke="var(--line)"
        />
      ))}
      <polygon
        ref={ref}
        points={values.map((v, i) => getPoint(i, v).join(",")).join(" ")}
        fill="var(--acc)"
        fillOpacity=".35"
        stroke="var(--acc)"
        strokeWidth="2"
      />
      {axes.map((a, i) => {
        const [x, y] = getPoint(i, 1.28);
        return (
          <text
            key={a}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="8"
            fill="var(--dim)"
            fontFamily="JetBrains Mono"
          >
            {a}
          </text>
        );
      })}
    </svg>
  );
};
