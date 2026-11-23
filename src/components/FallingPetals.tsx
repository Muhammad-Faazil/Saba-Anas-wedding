"use client";

import React, { useMemo } from "react";
import { invitationConfig } from "@/config/invitation";

export default function FallingPetals() {
  const petalColors = invitationConfig.theme.colors.petalColors;

  const petals = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: (67 * i + 11) % 95 + 2,
        dx: (11 * i + 7) % 44 * (i % 2 === 0 ? 1 : -1),
        dr: (i % 2 === 0 ? 180 : -180) + ((23 * i) % 140),
        dur: 6 + (i % 6) * 0.7,
        del: (0.55 * i) % 10,
        w: 9 + (i % 4) * 3,
        col: i % petalColors.length,
      })),
    [petalColors.length]
  );

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {petals.map((p) => {
        const height = Math.round(1.75 * p.w);
        return (
          <div
            key={p.id}
            style={
              {
                position: "absolute",
                left: `${p.left}%`,
                top: 0,
                width: p.w,
                height: height,
                "--dx": `${p.dx}px`,
                "--dr": `${p.dr}deg`,
                animation: `cr-fall ${p.dur}s ease-in ${p.del}s infinite`,
                opacity: 0,
              } as React.CSSProperties
            }
          >
            <svg width={p.w} height={height} viewBox="0 0 20 35" fill="none">
              <path
                d="M 10 1 C 17 5, 19 14, 16 23 C 14 29, 10 34, 10 34 C 10 34, 6 29, 4 23 C 1 14, 3 5, 10 1 Z"
                fill={petalColors[p.col]}
                opacity={0.82}
              />
              <path
                d="M 10 3 Q 10 16, 10 32"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth={0.6}
                fill="none"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
