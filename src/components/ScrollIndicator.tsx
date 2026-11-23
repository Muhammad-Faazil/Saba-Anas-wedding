"use client";

import React, { useEffect, useState } from "react";
import { invitationConfig } from "@/config/invitation";

interface ScrollIndicatorProps {
  color?: string;
  style?: React.CSSProperties;
}

export default function ScrollIndicator({
  color = invitationConfig.theme.colors.primary,
  style,
}: ScrollIndicatorProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const scrollPos =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      if (scrollPos > 30) {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 30,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        zIndex: 10,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity .6s ease",
        ...style,
      }}
    >
      <p
        style={{
          fontFamily: "'Cinzel', sans-serif",
          fontSize: 8,
          letterSpacing: ".38em",
          textTransform: "uppercase",
          color: color,
          opacity: 0.75,
          margin: 0,
          fontWeight: 600,
        }}
      >
        Scroll
      </p>
      <svg
        width={16}
        height={16}
        viewBox="0 0 18 18"
        fill="none"
        style={{
          animation: "cr-scroll-bounce 1.6s ease-in-out infinite",
        }}
      >
        <path
          d="M3 6 L9 12 L15 6"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.65}
        />
      </svg>
    </div>
  );
}
