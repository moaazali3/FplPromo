import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { Background } from "./Background";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for logo badge
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 10, mass: 0.7 },
  });

  // Kinetic typography timings
  const hookOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: "clamp" });
  const hookY = interpolate(frame, [15, 30], [30, 0], { extrapolateRight: "clamp" });

  const titleScale = spring({
    frame: frame - 32,
    fps,
    config: { damping: 12, mass: 0.6 },
  });

  const subOpacity = interpolate(frame, [45, 65], [0, 1], { extrapolateRight: "clamp" });
  const badgeSlide = interpolate(frame, [55, 75], [20, 0], { extrapolateRight: "clamp" });

  // Holographic rotating ring pulse
  const ringRotation = frame * 1.5;
  const ringPulse = 1 + Math.sin(frame * 0.1) * 0.05;

  return (
    <AbsoluteFill className="overflow-hidden">
      <Background accentColor="#00FF85" secondaryColor="#7928CA" />

      {/* Center Cinematic Container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-8 text-center select-none">
        {/* Holographic Glowing Emblem */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Outer Cyber Pulse Rings */}
          <div
            className="absolute w-56 h-56 rounded-full border border-[#00FF85]/20 border-dashed"
            style={{
              transform: `rotate(${ringRotation}deg) scale(${ringPulse})`,
            }}
          />
          <div
            className="absolute w-72 h-72 rounded-full border border-purple-500/15"
            style={{
              transform: `rotate(-${ringRotation * 0.7}deg)`,
            }}
          />

          {/* Central Logo Container */}
          <div
            style={{
              transform: `scale(${logoScale})`,
              boxShadow: "0 0 60px rgba(0, 255, 133, 0.4), inset 0 0 20px rgba(0, 255, 133, 0.2)",
            }}
            className="w-36 h-36 rounded-3xl bg-gradient-to-tr from-[#0B0E17] via-[#141926] to-[#0A2E1A] p-2 border-2 border-[#00FF85] flex items-center justify-center relative overflow-hidden"
          >
            {/* Real SVG Logo Icon */}
            <svg viewBox="0 0 320 320" className="w-24 h-24">
              <circle cx="160" cy="160" r="130" fill="#00FF85" opacity="0.15" />
              <circle cx="160" cy="160" r="108" fill="none" stroke="#00FF85" strokeWidth="8" />
              <line x1="160" y1="52" x2="160" y2="268" stroke="#00FF85" strokeWidth="4" opacity="0.6" />
              <circle cx="160" cy="160" r="42" fill="none" stroke="#00FF85" strokeWidth="4" opacity="0.6" />
              <g>
                <circle cx="160" cy="160" r="68" fill="#eafff3" />
                <polygon points="160,132 186,152 176,184 144,184 134,152" fill="#0B0E17" />
              </g>
            </svg>
          </div>
        </div>

        {/* Hook Teaser in Arabic */}
        <div
          style={{ opacity: hookOpacity, transform: `translateY(${hookY}px)` }}
          className="font-cairo font-bold text-xl md:text-2xl text-gray-300 mb-3"
        >
          الفانتزي مش مجرد حظ... <span className="text-[#00FF85]">الفانتزي أرقام وتكتيك</span>
        </div>

        {/* Grand Title Brand */}
        <div
          style={{
            transform: `scale(${Math.max(0, titleScale)})`,
            opacity: titleScale,
          }}
          className="font-outfit font-black text-7xl md:text-8xl tracking-tight text-white mb-2"
        >
          FPL <span className="text-[#00FF85] text-glow-pitch">Scout</span>
        </div>

        {/* Dynamic Subtitle */}
        <div
          style={{ opacity: subOpacity }}
          className="font-cairo font-extrabold text-2xl text-purple-300 max-w-lg mb-8"
        >
          محرك الذكاء الاصطناعي والتحليلات التكتيكية المتطورة
        </div>

        {/* Pill Badges */}
        <div
          style={{
            opacity: subOpacity,
            transform: `translateY(${badgeSlide}px)`,
          }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <div className="glass px-4 py-2 rounded-full border border-[#00FF85]/40 text-[#00FF85] font-inter text-xs font-bold tracking-wider flex items-center gap-1.5 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#00FF85] animate-ping" />
            <span>AI TACTICAL ENGINE</span>
          </div>
          <div className="glass px-4 py-2 rounded-full border border-purple-500/40 text-purple-300 font-cairo text-xs font-bold shadow-lg">
            <span>مدعوم ببيانات الـ Premier League</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
