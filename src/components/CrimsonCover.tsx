"use client";

import React, { useEffect, useState } from "react";
import { invitationConfig } from "@/config/invitation";

interface CrimsonCoverProps {
  onDone: () => void;
  brideName?: string;
  groomName?: string;
  eventDateText?: string;
  hijriDateText?: string;
  coverImage?: string;
}

export default function CrimsonCover({
  onDone,
  brideName = invitationConfig.couple.brideName,
  groomName = invitationConfig.couple.groomName,
  eventDateText = invitationConfig.dates.coverDateDisplay,
  hijriDateText = invitationConfig.dates.hijriDate || "",
  coverImage = invitationConfig.theme.media.coverBackground,
}: CrimsonCoverProps) {
  const [activeBorder, setActiveBorder] = useState(false);
  const [revealTop, setRevealTop] = useState(false);
  const [revealBottom, setRevealBottom] = useState(false);
  const [revealTap, setRevealTap] = useState(false);
  const [closing, setClosing] = useState(false);

  const { primary, primaryDark, gold, textDark, background } =
    invitationConfig.theme.colors;

  useEffect(() => {
    const timers = [
      setTimeout(() => setActiveBorder(true), 100),
      setTimeout(() => setRevealTop(true), 620),
      setTimeout(() => setRevealBottom(true), 2100),
      setTimeout(() => setRevealTap(true), 2100),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleClick = () => {
    document.dispatchEvent(new CustomEvent("invytor:ready"));
    setClosing(true);
    setTimeout(onDone, 700);
  };

  // Dynamic font size adaptation for long names
  const maxNameLen = Math.max(brideName.length, groomName.length);
  const dynamicFontSize =
    maxNameLen > 24
      ? "clamp(20px, 4.5vw, 36px)"
      : maxNameLen > 18
      ? "clamp(24px, 5.8vw, 44px)"
      : "clamp(28px, 7vw, 54px)";

  return (
    <div
      data-cr-cover="true"
      onClick={handleClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        cursor: "pointer",
        overflow: "hidden",
        backgroundColor: background,
        opacity: closing ? 0 : 1,
        transition: closing ? "opacity 0.85s ease" : undefined,
      }}
    >
      {/* Background image */}
      <img
        src={coverImage}
        alt=""
        fetchPriority="high"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "fill",
          display: "block",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,252,248,0.08)",
          pointerEvents: "none",
        }}
      />

      {/* Animated SVG Border */}
      <svg
        viewBox="0 0 320 400"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          width: "min(86vw,320px)",
          height: "auto",
          pointerEvents: "none",
        }}
      >
        <rect
          x={2}
          y={2}
          width={316}
          height={396}
          fill="none"
          stroke={gold}
          strokeWidth={1.2}
          strokeDasharray={1424}
          strokeDashoffset={activeBorder ? 0 : 1424}
          style={{
            transition: activeBorder
              ? "stroke-dashoffset 2.5s cubic-bezier(.4,0,.2,1) .06s"
              : "none",
          }}
        />
        <rect
          x={14}
          y={14}
          width={292}
          height={372}
          fill="none"
          stroke={`${gold}45`}
          strokeWidth={0.6}
          strokeDasharray={1328}
          strokeDashoffset={activeBorder ? 0 : 1328}
          style={{
            transition: activeBorder
              ? "stroke-dashoffset 2s cubic-bezier(.4,0,.2,1) .42s"
              : "none",
          }}
        />
        {[
          [14, 14],
          [306, 14],
          [306, 386],
          [14, 386],
        ].map(([cx, cy], idx) => (
          <circle
            key={idx}
            cx={cx}
            cy={cy}
            r={3.8}
            fill={gold}
            opacity={activeBorder ? 0.8 : 0}
            style={{
              transition: activeBorder
                ? `opacity .4s ease ${(2 + 0.14 * idx).toFixed(2)}s`
                : "none",
            }}
          />
        ))}
        <line
          x1={126}
          y1={196}
          x2={194}
          y2={196}
          stroke={`${gold}48`}
          strokeWidth={0.5}
          strokeDasharray={68}
          strokeDashoffset={activeBorder ? 0 : 68}
          style={{
            transition: activeBorder
              ? "stroke-dashoffset .9s ease 1.6s"
              : "none",
          }}
        />
      </svg>

      {/* Cover Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 28px",
          maxWidth: 360,
          margin: "0 auto",
        }}
      >
        {/* Badge: Wedding Invitation */}
        <div
          style={{
            overflow: "hidden",
            marginBottom: 14,
            textAlign: "center",
          }}
        >
          <div
            style={{
              transform: revealTop ? "translateY(0)" : "translateY(110%)",
              transition: revealTop
                ? "transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)"
                : "none",
            }}
          >
            <span
              style={{
                fontFamily: "'Cinzel', sans-serif",
                fontSize: 8.5,
                letterSpacing: ".58em",
                textTransform: "uppercase",
                color: primaryDark,
                display: "inline-block",
                padding: "5px 18px",
                border: `1px solid ${primary}30`,
                background: "rgba(255,252,248,0.55)",
              }}
            >
              Wedding Invitation
            </span>
          </div>
        </div>

        {/* Divider 1 */}
        <div
          style={{
            width: 52,
            height: 1,
            background: "rgba(201, 160, 96, 0.396)",
            marginBottom: 20,
            opacity: revealTop ? 1 : 0,
            transition: revealTop ? "opacity 0.6s ease 0.3s" : "none",
          }}
        />

        {/* Bride Name */}
        <div
          style={{
            overflow: "hidden",
            textAlign: "center",
            width: "100%",
            maxWidth: 290,
          }}
        >
          <div
            style={{
              transform: revealTop ? "translateY(0)" : "translateY(110%)",
              transition: revealTop
                ? "transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.14s"
                : "none",
            }}
          >
            <h1
              data-cr-name=""
              style={{
                fontFamily: "'Cormorant Garamond', 'Noto Serif', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: textDark,
                lineHeight: 1.25,
                margin: 0,
                fontSize: dynamicFontSize,
                overflowWrap: "break-word",
                wordBreak: "break-word",
              }}
            >
              {brideName}
            </h1>
          </div>
        </div>

        {/* & symbol */}
        <div
          style={{
            overflow: "hidden",
            margin: "10px 0 8px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              transform: revealTop ? "translateY(0)" : "translateY(110%)",
              transition: revealTop
                ? "transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s"
                : "none",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 1,
                  background: "rgba(201,160,96,0.44)",
                  maxWidth: 30,
                }}
              />
              <span
                style={{
                  fontFamily:
                    "'Cormorant Garamond', 'Noto Serif', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: 30,
                  color: gold,
                  lineHeight: 1,
                }}
              >
                &amp;
              </span>
              <div
                style={{
                  width: 28,
                  height: 1,
                  background: "rgba(201,160,96,0.44)",
                  maxWidth: 30,
                }}
              />
            </div>
          </div>
        </div>

        {/* Groom Name */}
        <div
          style={{
            overflow: "hidden",
            textAlign: "center",
            width: "100%",
            maxWidth: 290,
          }}
        >
          <div
            style={{
              transform: revealTop ? "translateY(0)" : "translateY(110%)",
              transition: revealTop
                ? "transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.74s"
                : "none",
            }}
          >
            <h1
              data-cr-name=""
              style={{
                fontFamily: "'Cormorant Garamond', 'Noto Serif', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: textDark,
                lineHeight: 1.25,
                margin: 0,
                fontSize: dynamicFontSize,
                overflowWrap: "break-word",
                wordBreak: "break-word",
              }}
            >
              {groomName}
            </h1>
          </div>
        </div>

        {/* Divider 2 */}
        <div
          style={{
            width: 52,
            height: 1,
            background: "rgba(201, 160, 96, 0.396)",
            marginTop: 20,
            marginBottom: 16,
            opacity: revealBottom ? 1 : 0,
            transition: revealBottom ? "opacity 0.6s ease 0.1s" : "none",
          }}
        />

        {/* Dates */}
        <div style={{ overflow: "hidden", textAlign: "center" }}>
          <div
            style={{
              transform: revealBottom ? "translateY(0)" : "translateY(110%)",
              transition: revealBottom
                ? "transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s"
                : "none",
            }}
          >
            <p
              style={{
                fontFamily: "'Cinzel', sans-serif",
                fontSize: 9,
                letterSpacing: ".3em",
                textTransform: "uppercase",
                color: textDark,
                margin: 0,
                opacity: 0.65,
                fontWeight: 700,
              }}
            >
              {eventDateText}
            </p>
            {hijriDateText && (
              <p
                style={{
                  fontFamily: "'Cinzel', sans-serif",
                  fontSize: 8,
                  letterSpacing: ".28em",
                  textTransform: "uppercase",
                  color: textDark,
                  margin: "6px 0 0",
                  opacity: 0.5,
                }}
              >
                {hijriDateText}
              </p>
            )}
          </div>
        </div>

        {/* Tap to Open Invitation */}
        <p
          style={{
            fontFamily: "'Cinzel', sans-serif",
            fontSize: "clamp(9px, 3.2vw, 12px)",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            textAlign: "center",
            alignSelf: "center",
            color: primary,
            margin: "48px 0 0",
            fontWeight: 700,
            textShadow: `0 1px 12px ${primary}40`,
            opacity: revealTap && !closing ? 1 : 0,
            transition: revealTap ? "opacity 1s ease" : "none",
            animation:
              revealTap && !closing
                ? "cr-pulse2 2.8s ease-in-out infinite"
                : "none",
          }}
        >
          Tap to Open Invitation
        </p>
      </div>
    </div>
  );
}
