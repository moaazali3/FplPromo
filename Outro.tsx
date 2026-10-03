import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { Background } from "./Background";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animations
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 10, mass: 0.8 },
  });

  const textOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp" });
  const textY = interpolate(frame, [15, 35], [25, 0], { extrapolateRight: "clamp" });

  const ctaScale = spring({
    frame: frame - 35,
    fps,
    config: { damping: 12 },
  });

  const badgesOpacity = interpolate(frame, [45, 65], [0, 1], { extrapolateRight: "clamp" });

  // Light pulse on the logo
  const pulse = 1 + Math.sin(frame * 0.08) * 0.04;

  return (
    <AbsoluteFill className="overflow-hidden">
      <Background accentColor="#00FF85" secondaryColor="#7928CA" />

      {/* Main Container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-8 text-center select-none">
        {/* Glowing Logo Icon */}
        <div
          style={{
            transform: `scale(${logoScale * pulse})`,
          }}
          className="relative mb-6"
        >
          <div className="absolute -inset-4 rounded-full bg-[#00FF85] opacity-35 blur-2xl animate-pulse" />
          <div className="relative w-32 h-32 rounded-3xl bg-gradient-to-tr from-[#0B0E17] via-[#141926] to-[#0A2E1A] p-2 border-2 border-[#00FF85] flex items-center justify-center shadow-[0_0_50px_rgba(0,255,133,0.5)]">
            <svg viewBox="0 0 320 320" className="w-20 h-20">
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

        {/* Brand Name */}
        <div
          style={{ opacity: textOpacity, transform: `translateY(${textY}px)` }}
          className="font-outfit font-black text-6xl md:text-7xl text-white mb-2"
        >
          FPL <span className="text-[#00FF85] text-glow-pitch">Scout</span>
        </div>

        <div
          style={{ opacity: textOpacity }}
          className="font-cairo font-bold text-2xl text-purple-300 mb-8 max-w-md"
        >
          كشافك التكتيكي الذكي لصدارة الفانتزي
        </div>

        {/* Big CTA Glowing Button */}
        <div
          style={{
            transform: `scale(${ctaScale})`,
            opacity: ctaScale,
          }}
          className="mb-8"
        >
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#00FF85] to-[#7928CA] opacity-75 blur-lg transition duration-500" />
            <div className="relative px-8 py-4 rounded-2xl bg-[#0B0E17] border-2 border-[#00FF85] flex items-center gap-3">
              <span className="text-xl">🚀</span>
              <span className="font-cairo font-extrabold text-xl text-white tracking-wide">
                حمل التطبيق الآن وتصدر دورياتك
              </span>
            </div>
          </div>
        </div>

        {/* Store Badges & Compatibility */}
        <div
          style={{ opacity: badgesOpacity }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="glass px-5 py-2.5 rounded-xl border border-white/20 flex items-center gap-2.5 shadow-lg">
              <span className="text-xl">🤖</span>
              <div className="text-left font-inter">
                <div className="text-[9px] text-gray-400 leading-none">AVAILABLE ON</div>
                <div className="text-xs font-bold text-white leading-tight">Google Play</div>
              </div>
            </div>

            <div className="glass px-5 py-2.5 rounded-xl border border-white/20 flex items-center gap-2.5 shadow-lg">
              <span className="text-xl">⚡</span>
              <div className="text-left font-inter">
                <div className="text-[9px] text-gray-400 leading-none">DIRECT DOWNLOAD</div>
                <div className="text-xs font-bold text-[#00FF85] leading-tight">APKPure · APK</div>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-400 font-cairo flex items-center gap-2">
            <span>متاح بنسخة كاملة مجانية</span>
            <span>•</span>
            <span className="text-[#00FF85]">عربي وإنجليزي بالكامل</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
