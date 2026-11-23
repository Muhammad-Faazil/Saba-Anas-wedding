"use client";

import React, { useEffect, useRef, useState } from "react";
import { invitationConfig } from "@/config/invitation";

interface AudioPlayerProps {
  src?: string;
  autoPlayOnReady?: boolean;
}

export default function AudioPlayer({
  src = invitationConfig.theme.media.backgroundMusicUrl,
  autoPlayOnReady = invitationConfig.theme.media.autoPlayOnOpen,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleReady = () => {
      if (autoPlayOnReady && audioRef.current) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn("Audio autoplay blocked by browser policy:", err);
          });
      }
    };

    document.addEventListener("invytor:ready", handleReady);
    return () => document.removeEventListener("invytor:ready", handleReady);
  }, [autoPlayOnReady]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }
  };

  const primaryColor = invitationConfig.theme.colors.primary;

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 90,
        }}
      >
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Mute music" : "Play music"}
          title={isPlaying ? "Pause music" : "Play music"}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "rgba(253, 245, 234, 0.92)",
            border: `1px solid ${primaryColor}4D`,
            boxShadow: "0 4px 18px rgba(61, 10, 16, 0.25)",
            backdropFilter: "blur(8px)",
            cursor: "pointer",
            color: primaryColor,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          className="hover:scale-105 active:scale-95"
        >
          {isPlaying ? (
            <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 16 }}>
              <span
                style={{
                  width: 3,
                  height: "100%",
                  background: primaryColor,
                  borderRadius: 1,
                  animation: "cr-pulse2 0.8s ease-in-out infinite alternate",
                }}
              />
              <span
                style={{
                  width: 3,
                  height: "60%",
                  background: primaryColor,
                  borderRadius: 1,
                  animation: "cr-pulse2 0.6s ease-in-out 0.2s infinite alternate",
                }}
              />
              <span
                style={{
                  width: 3,
                  height: "85%",
                  background: primaryColor,
                  borderRadius: 1,
                  animation: "cr-pulse2 0.9s ease-in-out 0.4s infinite alternate",
                }}
              />
            </div>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
