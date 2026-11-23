"use client";

import React, { useState } from "react";
import CrimsonCover from "@/components/CrimsonCover";
import InvitationMain from "@/components/InvitationMain";
import AudioPlayer from "@/components/AudioPlayer";

export default function Page() {
  const [unlocked, setUnlocked] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleCoverDone = () => {
    setUnlocked(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setVisible(true);
      });
    });
  };

  return (
    <>
      <AudioPlayer />
      {!unlocked && <CrimsonCover onDone={handleCoverDone} />}
      {unlocked && (
        <div
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease",
          }}
        >
          <InvitationMain />
        </div>
      )}
    </>
  );
}
