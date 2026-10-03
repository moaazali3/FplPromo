import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from "remotion";

const swatches = [
  { name: "Pitch Green", hex: "#00FF85" },
  { name: "AI Violet", hex: "#7928CA" },
  { name: "Warning Amber", hex: "#FFB800" },
  { name: "Danger Crimson", hex: "#FF0055" },
];

export const DesignSystem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill className="bg-navy flex flex-col items-center justify-center gap-8">
      <div className="font-outfit text-3xl text-white mb-2">Modern Dark Cyber-Tactical</div>
      <div className="grid grid-cols-2 gap-6">
        {swatches.map((s, i) => {
          const delay = i * 10;
          const scale = spring({ frame: frame - delay, fps, config: { damping: 12 } });
          return (
            <div
              key={s.hex}
              style={{ transform: `scale(${scale})`, opacity: scale }}
              className="glass rounded-2xl p-6 w-48 flex flex-col items-center gap-3"
            >
              <div
                style={{ background: s.hex, boxShadow: `0 0 30px ${s.hex}66` }}
                className="w-16 h-16 rounded-full"
              />
              <div className="font-inter text-sm text-white text-center">{s.name}</div>
              <div className="font-inter text-xs text-gray-500">{s.hex}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
