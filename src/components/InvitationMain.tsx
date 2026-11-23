"use client";

import React, { useEffect, useRef, useState } from "react";
import FallingPetals from "./FallingPetals";
import FloralDivider from "./FloralDivider";
import CountdownTimer from "./CountdownTimer";
import ScrollIndicator from "./ScrollIndicator";
import { invitationConfig } from "@/config/invitation";

function useInView(threshold = 0.08) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function FadeIn({
  children,
  inView,
  delay = 0,
  style,
  className,
}: {
  children: React.ReactNode;
  inView: boolean;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(36px)",
        transition: inView
          ? `opacity .85s ease ${delay}s, transform 1s cubic-bezier(.16,1,.3,1) ${delay}s`
          : "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function RevealY({
  children,
  inView,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  inView: boolean;
  delay?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ overflow: "hidden", ...style }}>
      <div
        style={{
          transform: inView ? "translateY(0)" : "translateY(110%)",
          transition: inView
            ? `transform 1.1s cubic-bezier(.16,1,.3,1) ${delay}s`
            : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function InvitationMain() {
  const sec1 = useInView(0.08);
  const sec2 = useInView(0.08);
  const secEvent = useInView(0.08);
  const secCountdown = useInView(0.08);

  const [calendarMenuOpen, setCalendarMenuOpen] = useState(false);

  const { couple, dates, theme, event, features, footer } = invitationConfig;
  const { colors, media } = theme;

  // Calendar Helpers
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(
      event.calendarTitle || `${event.title} - ${couple.brideName} & ${couple.groomName}`
    );
    const details = encodeURIComponent(
      event.calendarDescription ||
        `The Nikah & Wedding Celebration of ${couple.brideName} and ${couple.groomName} at ${event.venueName}.`
    );
    const location = encodeURIComponent(`${event.venueName}, ${event.address}`);

    // IST is UTC+05:30. 4:30 PM (16:30) IST = 11:00 UTC. 10:30 PM (22:30) IST = 17:00 UTC.
    const startIso = event.calendarStartDateISO
      ? new Date(event.calendarStartDateISO).toISOString().replace(/-|:|\.\d\d\d/g, "")
      : "20261227T110000Z";
    const endIso = event.calendarEndDateISO
      ? new Date(event.calendarEndDateISO).toISOString().replace(/-|:|\.\d\d\d/g, "")
      : "20261227T170000Z";

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
  };

  const handleDownloadIcs = () => {
    const startIso = event.calendarStartDateISO
      ? new Date(event.calendarStartDateISO).toISOString().replace(/-|:|\.\d\d\d/g, "")
      : "20261227T110000Z";
    const endIso = event.calendarEndDateISO
      ? new Date(event.calendarEndDateISO).toISOString().replace(/-|:|\.\d\d\d/g, "")
      : "20261227T170000Z";

    const title =
      event.calendarTitle ||
      `${event.title} - ${couple.brideName} & ${couple.groomName}`;
    const description =
      event.calendarDescription ||
      `The Nikah & Wedding Celebration of ${couple.brideName} and ${couple.groomName} at ${event.venueName}.`;
    const location = `${event.venueName}, ${event.address}`;

    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Wedding Invitation//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      `DTSTART:${startIso}`,
      `DTEND:${endIso}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `wedding-${couple.brideName}-${couple.groomName}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCalendarMenuOpen(false);
  };

  const cardStyle: React.CSSProperties = {
    background: colors.cardBackground,
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    borderRadius: 20,
    border: "1px solid rgba(255,250,244,0.92)",
    boxShadow:
      "0 10px 42px rgba(61,10,16,.24), inset 0 1px 0 rgba(255,255,255,0.85)",
    overflow: "hidden",
  };

  return (
    <main style={{ minHeight: "100vh", position: "relative" }}>
      {/* ================= SECTION 1: HERO & OPENING BLESSING ================= */}
      <div
        ref={sec1.ref}
        style={{
          position: "relative",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          backgroundColor: colors.background,
        }}
      >
        <img
          src={media.heroBackground}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            display: "block",
            pointerEvents: "none",
          }}
        />
        <FallingPetals />

        <div
          style={{
            maxWidth: 520,
            width: "100%",
            padding:
              "clamp(56px,12vw,96px) clamp(28px,8vw,64px) clamp(48px,10vw,80px)",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Bismillah Arabic Calligraphy */}
          {couple.bismillahArabic && (
            <FadeIn inView={sec1.inView} delay={0}>
              <p
                style={{
                  fontFamily: "'Amiri', 'Arial', serif",
                  fontSize: "clamp(22px, 6vw, 38px)",
                  color: colors.primary,
                  lineHeight: 1.6,
                  margin: "0 0 10px",
                  direction: "rtl",
                  letterSpacing: ".02em",
                  textShadow: `0 2px 20px ${colors.primary}2E`,
                }}
              >
                {couple.bismillahArabic}
              </p>
            </FadeIn>
          )}

          {/* Opening Greeting */}
          <FadeIn inView={sec1.inView} delay={0.12}>
            <p
              style={{
                fontFamily: "'Cinzel', sans-serif",
                fontSize: "clamp(10px, 2.8vw, 13px)",
                letterSpacing: ".32em",
                textTransform: "uppercase",
                color: colors.primaryDark,
                fontWeight: 700,
                margin: "0 0 18px",
              }}
            >
              {couple.openingGreeting}
            </p>
          </FadeIn>

          <FloralDivider
            inView={sec1.inView}
            style={{ maxWidth: 220, margin: "0 auto 20px" }}
          />

          {/* Invitation Intro Message */}
          <FadeIn inView={sec1.inView} delay={0.2}>
            <p
              style={{
                fontFamily: "'Noto Serif', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(12px, 3.2vw, 14.5px)",
                color: colors.textDark,
                opacity: 0.78,
                lineHeight: 1.9,
                margin: "0 auto 28px",
                width: "92%",
                textAlign: "center",
              }}
            >
              {couple.invitationIntroText}
            </p>
          </FadeIn>

          <FloralDivider
            inView={sec1.inView}
            style={{ maxWidth: 260, margin: "0 auto 24px" }}
          />

          {/* Bride Name & Parents */}
          <div style={{ marginBottom: 20 }}>
            <RevealY inView={sec1.inView} delay={0.28}>
              <h1
                style={{
                  fontFamily:
                    "'Cormorant Garamond', 'Noto Serif', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "clamp(26px, 7vw, 44px)",
                  color: colors.textDark,
                  lineHeight: 1.2,
                  margin: "0 0 6px",
                  wordBreak: "break-word",
                }}
              >
                {couple.brideName}
              </h1>
            </RevealY>
            <FadeIn inView={sec1.inView} delay={0.34}>
              <p
                style={{
                  fontFamily: "'Noto Serif', Georgia, serif",
                  fontSize: "clamp(11px, 2.8vw, 13px)",
                  fontWeight: 500,
                  color: colors.primaryDark,
                  opacity: 0.75,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {couple.brideParents}
              </p>
            </FadeIn>
          </div>

          {/* & Divider */}
          <FadeIn inView={sec1.inView} delay={0.38}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                justifyContent: "center",
                margin: "14px 0",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 1,
                  background: `${colors.gold}99`,
                }}
              />
              <span
                style={{
                  fontFamily:
                    "'Cormorant Garamond', 'Noto Serif', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: 28,
                  color: colors.gold,
                  lineHeight: 1,
                }}
              >
                &amp;
              </span>
              <div
                style={{
                  width: 32,
                  height: 1,
                  background: `${colors.gold}99`,
                }}
              />
            </div>
          </FadeIn>

          {/* Groom Name & Parents */}
          <div style={{ marginTop: 10 }}>
            <RevealY inView={sec1.inView} delay={0.42}>
              <h1
                style={{
                  fontFamily:
                    "'Cormorant Garamond', 'Noto Serif', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "clamp(26px, 7vw, 44px)",
                  color: colors.textDark,
                  lineHeight: 1.2,
                  margin: "0 0 6px",
                  wordBreak: "break-word",
                }}
              >
                {couple.groomName}
              </h1>
            </RevealY>
            <FadeIn inView={sec1.inView} delay={0.48}>
              <p
                style={{
                  fontFamily: "'Noto Serif', Georgia, serif",
                  fontSize: "clamp(11px, 2.8vw, 13px)",
                  fontWeight: 500,
                  color: colors.primaryDark,
                  opacity: 0.75,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {couple.groomParents}
              </p>
            </FadeIn>
          </div>
        </div>

        <ScrollIndicator color={colors.primary} />
      </div>

      {/* ================= SECTION 2: SINGLE EVENT DETAILS ================= */}
      <div
        ref={secEvent.ref}
        style={{
          position: "relative",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          backgroundColor: colors.nightBackground,
          padding: "clamp(48px,10vw,80px) 16px",
        }}
      >
        <img
          src={media.heroBackground}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
            pointerEvents: "none",
          }}
        />
        <FallingPetals />

        <div
          style={{
            maxWidth: 580,
            width: "100%",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 3,
          }}
        >
          <FadeIn inView={secEvent.inView} delay={0.05}>
            <div
              style={{
                ...cardStyle,
                padding: "clamp(32px, 7vw, 48px) clamp(20px, 6vw, 36px)",
                textAlign: "center",
              }}
              className="cr-card-hover"
            >
              <FloralDivider
                inView={secEvent.inView}
                style={{ maxWidth: 220, margin: "0 auto 18px" }}
              />

              {/* Event Title */}
              <p
                style={{
                  fontFamily: "'Cinzel', sans-serif",
                  fontSize: "clamp(11px, 3vw, 13px)",
                  letterSpacing: ".28em",
                  textTransform: "uppercase",
                  color: colors.primary,
                  margin: "0 0 14px",
                  fontWeight: 700,
                }}
              >
                {event.title}
              </p>

              {/* Shimmering Date */}
              <RevealY inView={secEvent.inView} delay={0.12}>
                <p
                  style={{
                    fontFamily: "'Lora', 'Georgia', serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "clamp(18px, 5.2vw, 28px)",
                    lineHeight: 1.3,
                    margin: "0 0 10px",
                    color: "transparent",
                    backgroundImage: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.primaryAccent} 28%, ${colors.gold} 50%, ${colors.primaryAccent} 72%, ${colors.primary} 100%)`,
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    animation: secEvent.inView
                      ? "cr-shimmer 4.5s linear infinite"
                      : "none",
                  }}
                >
                  {event.date}
                </p>
              </RevealY>

              {/* Time */}
              <FadeIn inView={secEvent.inView} delay={0.18}>
                <p
                  style={{
                    fontFamily: "'Cinzel', sans-serif",
                    fontSize: "clamp(13px, 3.6vw, 17px)",
                    fontWeight: 600,
                    letterSpacing: ".18em",
                    color: colors.primaryDark,
                    lineHeight: 1,
                    margin: "0 0 20px",
                  }}
                >
                  {event.time}
                </p>
              </FadeIn>

              <div
                style={{
                  width: 44,
                  height: 1,
                  background: `${colors.gold}80`,
                  margin: "0 auto 20px",
                }}
              />

              {/* Venue Name & Address */}
              <FadeIn inView={secEvent.inView} delay={0.24}>
                <p
                  style={{
                    fontFamily:
                      "'Cormorant Garamond', 'Noto Serif', Georgia, serif",
                    fontStyle: "italic",
                    fontWeight: 600,
                    fontSize: "clamp(20px, 5.4vw, 28px)",
                    color: colors.textDark,
                    margin: "0 0 8px",
                    lineHeight: 1.25,
                  }}
                >
                  {event.venueName}
                </p>
                <p
                  style={{
                    fontFamily: "'Cinzel', sans-serif",
                    fontSize: "clamp(9.5px, 2.7vw, 12px)",
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    color: colors.primaryDark,
                    opacity: 0.85,
                    margin: "0 auto 28px",
                    maxWidth: 420,
                    lineHeight: 1.8,
                    fontWeight: 700,
                    whiteSpace: "pre-line",
                  }}
                >
                  {event.address}
                </p>
              </FadeIn>

              {/* Action Buttons: Get Directions & Save to Calendar */}
              <FadeIn inView={secEvent.inView} delay={0.3}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                    flexWrap: "wrap",
                    marginTop: 8,
                  }}
                >
                  {/* Get Directions Button */}
                  {features.enableGetDirections && event.googleMapsUrl && (
                    <a
                      href={event.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-105 active:scale-95 transition-all"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "11px 22px",
                        borderRadius: 999,
                        background: `linear-gradient(135deg, ${colors.primaryDark}, ${colors.primary})`,
                        color: "#fff",
                        fontFamily: "'Cinzel', sans-serif",
                        fontSize: 9.5,
                        fontWeight: 700,
                        letterSpacing: ".16em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        boxShadow: `0 4px 18px ${colors.primary}50`,
                      }}
                    >
                      <svg
                        width="14"
                        height="16"
                        viewBox="0 0 14 18"
                        fill="none"
                        style={{ flexShrink: 0 }}
                      >
                        <path
                          d="M7 0C3.69 0 1 2.69 1 6c0 4.5 6 12 6 12s6-7.5 6-12C13 2.69 10.31 0 7 0z"
                          fill="#ffffff"
                          opacity={0.9}
                        />
                        <circle cx="7" cy="6" r="2.2" fill={colors.primary} />
                      </svg>
                      {event.mapButtonLabel || "Get Directions"}
                    </a>
                  )}

                  {/* Save to Calendar Button */}
                  {features.enableSaveToCalendar && (
                    <div style={{ position: "relative" }}>
                      <button
                        onClick={() => setCalendarMenuOpen(!calendarMenuOpen)}
                        className="hover:scale-105 active:scale-95 transition-all"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "11px 20px",
                          borderRadius: 999,
                          background: "rgba(255, 252, 248, 0.95)",
                          border: `1.2px solid ${colors.gold}`,
                          color: colors.primaryDark,
                          fontFamily: "'Cinzel', sans-serif",
                          fontSize: 9.5,
                          fontWeight: 700,
                          letterSpacing: ".16em",
                          textTransform: "uppercase",
                          cursor: "pointer",
                          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={colors.primary}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ flexShrink: 0 }}
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        Save to Calendar
                        <svg
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          stroke={colors.primary}
                          strokeWidth="1.8"
                          style={{
                            transform: calendarMenuOpen ? "rotate(180deg)" : "none",
                            transition: "transform 0.2s ease",
                          }}
                        >
                          <path d="M1 1L5 5L9 1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>

                      {/* Dropdown Options */}
                      {calendarMenuOpen && (
                        <div
                          style={{
                            position: "absolute",
                            bottom: "calc(100% + 8px)",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "#fffdf9",
                            border: `1px solid ${colors.gold}`,
                            borderRadius: 14,
                            padding: 6,
                            boxShadow: "0 10px 30px rgba(61,10,16,0.22)",
                            zIndex: 50,
                            minWidth: 200,
                            display: "flex",
                            flexDirection: "column",
                            gap: 4,
                          }}
                        >
                          <a
                            href={getGoogleCalendarUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setCalendarMenuOpen(false)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              padding: "9px 14px",
                              borderRadius: 8,
                              color: colors.textDark,
                              fontFamily: "'Cinzel', sans-serif",
                              fontSize: 9,
                              fontWeight: 700,
                              letterSpacing: ".1em",
                              textTransform: "uppercase",
                              textDecoration: "none",
                              backgroundColor: "rgba(201, 160, 96, 0.08)",
                              transition: "background 0.2s ease",
                            }}
                            className="hover:bg-amber-100/60"
                          >
                            <span>📅 Google Calendar</span>
                          </a>
                          <button
                            onClick={handleDownloadIcs}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              padding: "9px 14px",
                              borderRadius: 8,
                              color: colors.textDark,
                              fontFamily: "'Cinzel', sans-serif",
                              fontSize: 9,
                              fontWeight: 700,
                              letterSpacing: ".1em",
                              textTransform: "uppercase",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              textAlign: "left",
                              transition: "background 0.2s ease",
                            }}
                            className="hover:bg-amber-100/60"
                          >
                            <span>🍏 Apple / Outlook (.ics)</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </FadeIn>
            </div>
          </FadeIn>
        </div>

        <ScrollIndicator color={`${colors.primary}99`} />
      </div>

      {/* ================= SECTION 3: COUNTDOWN TIMER & CLEAN FOOTER ================= */}
      <div
        style={{
          position: "relative",
          backgroundColor: colors.nightBackground,
          minHeight: "80svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingBottom: 40,
        }}
      >
        {/* Sticky background image */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url('${media.cardsBackground}')`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `${colors.textDark}55`,
            }}
          />
        </div>

        {/* Falling petals */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <FallingPetals />
        </div>

        {/* Cards wrapper */}
        <div
          className="cr-wrap"
          style={{
            maxWidth: 620,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 28,
            position: "relative",
            zIndex: 2,
            padding: "48px 16px 20px",
            width: "100%",
          }}
        >
          {/* Card: Live Countdown Timer */}
          {features.enableCountdownTimer && (
            <div ref={secCountdown.ref}>
              <FadeIn
                inView={secCountdown.inView}
                style={{
                  ...cardStyle,
                  padding: "clamp(28px, 6vw, 44px) clamp(16px, 5vw, 32px)",
                  textAlign: "center",
                }}
                className="cr-card-hover"
              >
                <FloralDivider
                  inView={secCountdown.inView}
                  style={{ maxWidth: 220, margin: "0 auto 20px" }}
                />
                <span
                  style={{
                    fontFamily: "'Cinzel', sans-serif",
                    fontSize: "clamp(10px, 2.8vw, 12px)",
                    fontWeight: 700,
                    letterSpacing: ".22em",
                    textTransform: "uppercase",
                    color: colors.primary,
                    display: "block",
                    textAlign: "center",
                    marginBottom: 20,
                  }}
                >
                  Counting Down to the Wedding
                </span>
                <div style={{ marginTop: 24, marginBottom: 8 }}>
                  <CountdownTimer
                    targetDate={dates.primaryEventDateISO}
                    inView={secCountdown.inView}
                  />
                </div>
                <p
                  style={{
                    fontFamily: "'Cinzel', sans-serif",
                    fontSize: "clamp(8px, 2.2vw, 9.5px)",
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    color: colors.primaryDark,
                    opacity: 0.65,
                    margin: "20px 0 0",
                    textAlign: "center",
                    fontWeight: 700,
                  }}
                >
                  {dates.countdownSubtitle}
                </p>
              </FadeIn>
            </div>
          )}

          {/* Clean Elegant Footer */}
          <div style={{ textAlign: "center", padding: "32px 20px 24px" }}>
            <FloralDivider
              inView={true}
              style={{ maxWidth: 220, margin: "0 auto 24px" }}
              color={colors.primary}
              accentColor={colors.gold}
            />
            <p
              style={{
                fontFamily:
                  "'Cormorant Garamond', 'Noto Serif', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: "clamp(24px, 6vw, 36px)",
                color: colors.textDark,
                margin: "0 0 10px",
                lineHeight: 1.25,
              }}
            >
              {footer.coupleText}
            </p>
            <p
              style={{
                fontFamily: "'Noto Serif', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: "clamp(13px, 3.4vw, 16px)",
                color: colors.textDark,
                margin: 0,
                letterSpacing: ".04em",
                lineHeight: 1.6,
              }}
            >
              {footer.blessingText}
            </p>

            {/* Subtle Elegant Creator Credit */}
            {footer.creditHandle && (
              <p
                style={{
                  fontFamily: "'Cinzel', sans-serif",
                  fontSize: "clamp(9px, 2.5vw, 11px)",
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  color: colors.textDark,
                  margin: "24px 0 0",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                <span>Created with </span>
                <span
                  style={{
                    color: colors.primary,
                    display: "inline-block",
                    margin: "0 3px",
                    fontSize: "1.15em",
                    verticalAlign: "baseline",
                  }}
                >
                  ♥
                </span>
                <span> by </span>
                {footer.creditUrl ? (
                  <a
                    href={footer.creditUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-75 transition-opacity"
                    style={{
                      color: colors.textDark,
                      textDecoration: "underline",
                      textDecorationColor: colors.textDark,
                      textUnderlineOffset: "3px",
                      fontWeight: 700,
                      letterSpacing: ".12em",
                    }}
                  >
                    {footer.creditHandle}
                  </a>
                ) : (
                  <span
                    style={{
                      color: colors.textDark,
                      fontWeight: 700,
                      letterSpacing: ".12em",
                      textDecoration: "underline",
                      textDecorationColor: colors.textDark,
                      textUnderlineOffset: "3px",
                    }}
                  >
                    {footer.creditHandle}
                  </span>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}