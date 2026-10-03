import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from "remotion";

const badges = ["Flutter · Dart", "Clean Architecture", "BLoC / Cubit", "عربي ⇄ English"];

export const TechStack: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill className="bg-navy flex flex-col items-center justify-center gap-5">
      <div className="font-outfit text-3xl text-white mb-4">مبني على تقنيات احترافية</div>
      {badges.map((label, i) => {
        const delay = i * 8;
        const s = spring({ frame: frame - delay, fps, config: { damping: 14 } });
        return (
          <div
            key={label}
            style={{ transform: `scale(${s})`, opacity: s }}
            className="glass px-8 py-3 rounded-full font-inter text-lg text-pitch"
          >
            {label}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
