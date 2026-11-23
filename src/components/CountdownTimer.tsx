"use client";

import React, { useEffect, useRef, useState } from "react";
import { invitationConfig } from "@/config/invitation";

interface CountdownTimerProps {
  targetDate?: string;
  inView?: boolean;
}

interface TimeRemaining {
  d: number;
  h: number;
  m: number;
  s: number;
}

export default function CountdownTimer({
  targetDate = invitationConfig.dates.primaryEventDateISO,
  inView = true,
}: CountdownTimerProps) {
  const [liveRemaining, setLiveRemaining] = useState<TimeRemaining>({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) {
        setLiveRemaining({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      setLiveRemaining({
        d: Math.floor(diff / 864e5),
        h: Math.floor((diff % 864e5) / 36e5),
        m: Math.floor((diff % 36e5) / 6e4),
        s: Math.floor((diff % 6e4) / 1e3),
      });
    };
    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const [displayVals, setDisplayVals] = useState<TimeRemaining>({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });
  const stateRef = useRef<"idle" | "roll" | "live">("idle");

  useEffect(() => {
    if (!inView || stateRef.current !== "idle") return;
    stateRef.current = "roll";
    const target = { ...liveRemaining };
    const startTime = Date.now();

    const animate = () => {
      const progress = Math.min((Date.now() - startTime) / 1200, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayVals({
        d: Math.round(ease * target.d),
        h: Math.round(ease * target.h),
        m: Math.round(ease * target.m),
        s: Math.round(ease * target.s),
      });
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        stateRef.current = "live";
      }
    };
    requestAnimationFrame(animate);
  }, [inView, liveRemaining]);

  useEffect(() => {
    if (stateRef.current === "live") {
      setDisplayVals(liveRemaining);
    }
  }, [liveRemaining]);

  const units: [string, number][] = [
    ["Days", displayVals.d],
    ["Hrs", displayVals.h],
    ["Min", displayVals.m],
    ["Sec", displayVals.s],
  ];

  const primaryColor = invitationConfig.theme.colors.primary;
  const darkColor = invitationConfig.theme.colors.primaryDark;

  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {units.map(([label, value], idx) => {
        const delay = (0.1 + 0.12 * idx).toFixed(2);
        return (
          <div
            key={label}
            style={{
              background: `${primaryColor}1A`,
              border: `1px solid ${primaryColor}38`,
              borderRadius: 14,
              padding: "14px 16px",
              textAlign: "center",
              minWidth: 68,
              flex: "1 1 68px",
              maxWidth: 90,
              opacity: inView ? 1 : 0,
              transform: inView
                ? "scale(1) translateY(0)"
                : "scale(0.78) translateY(22px)",
              transition: inView
                ? `opacity .6s ease ${delay}s, transform .75s cubic-bezier(.34,1.56,.64,1) ${delay}s`
                : "none",
            }}
          >
            <div
              style={{
                fontFamily:
                  "'Cormorant Garamond', 'Noto Serif', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: 38,
                color: primaryColor,
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
                overflow: "hidden",
                animation:
                  stateRef.current === "live" ? "cr-flip .3s ease" : undefined,
              }}
            >
              <span style={{ display: "block" }}>
                {String(value).padStart(2, "0")}
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Cinzel', sans-serif",
                fontSize: 7.5,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: darkColor,
                opacity: 0.7,
                marginTop: 6,
                fontWeight: 700,
              }}
            >
              {label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
