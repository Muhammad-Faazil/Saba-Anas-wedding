"use client";

import React from "react";
import { invitationConfig } from "@/config/invitation";

interface FloralDividerProps {
  inView?: boolean;
  style?: React.CSSProperties;
  color?: string;
  accentColor?: string;
}

export default function FloralDivider({
  inView = true,
  style,
  color = invitationConfig.theme.colors.primary,
  accentColor = invitationConfig.theme.colors.gold,
}: FloralDividerProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        ...style,
      }}
    >
      <div
        style={{
          flex: 1,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${color}40)`,
          transformOrigin: "right",
          transform: inView ? "scaleX(1)" : "scaleX(0)",
          transition: inView ? "transform .9s ease .08s" : "none",
        }}
      />
      <svg
        width={22}
        height={22}
        viewBox="0 0 22 22"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "scale(1) rotate(0deg)" : "scale(0) rotate(-45deg)",
          transition: inView
            ? "opacity .5s ease .4s, transform .7s cubic-bezier(.34,1.56,.64,1) .4s"
            : "none",
        }}
      >
        <circle cx={11} cy={11} r={4.5} fill={color} opacity={0.22} />
        <path d="M11 4 C13 7,14 9,11 11 C8 9,9 7,11 4Z" fill={color} opacity={0.65} />
        <path d="M18 11 C15 13,13 14,11 11 C13 8,15 9,18 11Z" fill={color} opacity={0.65} />
        <path d="M11 18 C9 15,8 13,11 11 C14 13,13 15,11 18Z" fill={color} opacity={0.65} />
        <path d="M4 11 C7 9,9 8,11 11 C9 14,7 13,4 11Z" fill={color} opacity={0.65} />
        <circle cx={11} cy={11} r={2} fill={accentColor} opacity={0.8} />
      </svg>
      <div
        style={{
          flex: 1,
          height: 1,
          background: `linear-gradient(90deg, ${color}40, transparent)`,
          transformOrigin: "left",
          transform: inView ? "scaleX(1)" : "scaleX(0)",
          transition: inView ? "transform .9s ease .08s" : "none",
        }}
      />
    </div>
  );
}
