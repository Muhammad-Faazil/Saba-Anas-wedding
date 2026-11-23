"use client";

import React from "react";
import { invitationConfig } from "@/config/invitation";

interface VenueCardProps {
  name: string;
  address: string;
  url?: string;
  buttonLabel?: string;
}

export default function VenueCard({
  name,
  address,
  url,
  buttonLabel = "Map",
}: VenueCardProps) {
  const { primary, primaryDark, textDark, background } =
    invitationConfig.theme.colors;

  const content = (
    <>
      <svg
        width="14"
        height="18"
        viewBox="0 0 14 18"
        fill="none"
        style={{ flexShrink: 0 }}
      >
        <path
          d="M7 0C3.69 0 1 2.69 1 6c0 4.5 6 12 6 12s6-7.5 6-12C13 2.69 10.31 0 7 0z"
          fill={primary}
          opacity={0.8}
        />
        <circle cx="7" cy="6" r="2.2" fill="white" />
      </svg>
      <div style={{ flex: 1, textAlign: "left", minWidth: 0 }}>
        <div
          style={{
            fontFamily: "'Lora', 'Georgia', serif",
            fontStyle: "italic",
            fontSize: 13,
            fontWeight: 500,
            color: textDark,
            lineHeight: 1.25,
            marginBottom: 3,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: "'Cinzel', sans-serif",
            fontSize: 8.5,
            letterSpacing: ".11em",
            textTransform: "uppercase",
            color: primaryDark,
            opacity: 0.75,
            lineHeight: 1.4,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {address}
        </div>
      </div>
      {url && (
        <div
          style={{
            flexShrink: 0,
            paddingLeft: 12,
            borderLeft: "1px solid rgba(134,16,25,0.14)",
          }}
        >
          <div
            style={{
              background: primary,
              borderRadius: 8,
              padding: "6px 10px",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span
              style={{
                fontFamily: "'Cinzel', sans-serif",
                fontSize: 8,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: background,
                fontWeight: 700,
              }}
            >
              {buttonLabel}
            </span>
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
              <path
                d="M1.5 4.5h6M4.5 2 7 4.5 4.5 7"
                stroke={background}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );

  const containerStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 12,
    background: "#fff8f2",
    border: "1px solid rgba(134,16,25,0.14)",
    borderRadius: 12,
    padding: "11px 14px",
    textDecoration: "none",
    maxWidth: 260,
    width: "100%",
    boxSizing: "border-box",
    boxShadow: "0 4px 20px rgba(0,0,0,0.28)",
  };

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="cr-card-hover"
        style={containerStyle}
      >
        {content}
      </a>
    );
  }

  return (
    <div className="cr-card-hover" style={containerStyle}>
      {content}
    </div>
  );
}
