import React from "react";
import { useCurrentFrame, spring, useVideoConfig } from "remotion";

export const Logo: React.FC<{ size?: number }> = ({ size = 160 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, config: { damping: 12, mass: 0.6 } });

  return (
    <div
      style={{
        width: size,
        height: size,
        transform: `scale(${scale})`,
        borderRadius: size * 0.18,
        background: "#0B0E17",
      }}
      className="flex items-center justify-center glow-pitch"
    >
      <svg viewBox="0 0 320 320" width={size * 0.82} height={size * 0.82}>
        <circle cx="160" cy="160" r="130" fill="#00FF85" opacity="0.12" />
        <circle cx="160" cy="160" r="108" fill="none" stroke="#00FF85" strokeWidth="7" />
        <line x1="160" y1="52" x2="160" y2="268" stroke="#00FF85" strokeWidth="3.5" opacity="0.55" />
        <circle cx="160" cy="160" r="42" fill="none" stroke="#00FF85" strokeWidth="3.5" opacity="0.55" />
        <g>
          <circle cx="160" cy="160" r="78" fill="#eafff3" />
          <polygon points="160,128 190,150 178,188 142,188 130,150" fill="#0B0E17" />
        </g>
      </svg>
    </div>
  );
};
