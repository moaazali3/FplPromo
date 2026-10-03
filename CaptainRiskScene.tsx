import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { Background } from "./Background";
import { PhoneMockup } from "./PhoneMockup";
import { CaptainRiskScreen } from "./CaptainRiskScreen";

export const CaptainRiskScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3D Camera tilt and entrance
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const rotateY = interpolate(frame, [0, 150], [14, 5], { extrapolateRight: "clamp" });
  const rotateX = interpolate(frame, [0, 150], [12, 6], { extrapolateRight: "clamp" });
  const floatY = Math.sin(frame * 0.05 + 1) * 8;

  // Header Title timing
  const titleOpacity = interpolate(frame, [10, 25], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [10, 25], [20, 0], { extrapolateRight: "clamp" });

  // Callouts timing
  const badge1Scale = spring({ frame: frame - 30, fps, config: { damping: 12 } });
  const badge2Scale = spring({ frame: frame - 45, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill className="overflow-hidden">
      <Background accentColor="#7928CA" secondaryColor="#FFB800" />

      {/* Top Banner & Eyebrow Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
        className="absolute top-12 inset-x-0 z-30 flex flex-col items-center text-center px-6 select-none"
      >
        <div className="px-4 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 font-cairo text-sm font-bold tracking-wider mb-2 flex items-center gap-2 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
          <span>الميزة الثانية · رادار مخاطرة الكابتن</span>
        </div>
        <h2 className="font-outfit font-black text-4xl md:text-5xl text-white tracking-tight">
          Captain Risk & Differential Radar
        </h2>
      </div>

      {/* Center 3D Floating Phone Mockup */}
      <div className="absolute inset-0 flex items-center justify-center pt-24">
        <PhoneMockup
          scale={0.92 * entrance}
          rotateX={rotateX}
          rotateY={rotateY}
          rotateZ={2}
          translateY={floatY}
          glowColor="rgba(121, 40, 202, 0.45)"
        >
          <CaptainRiskScreen />
        </PhoneMockup>
      </div>

      {/* Left Callout Card */}
      <div
        style={{
          transform: `scale(${badge1Scale})`,
          opacity: badge1Scale,
        }}
        className="absolute top-[32%] left-6 z-40 glass p-3.5 rounded-2xl max-w-[270px] border border-purple-500/50 shadow-[0_10px_30px_rgba(121,40,202,0.25)] select-none"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">🎯</span>
          <span className="font-cairo font-bold text-white text-sm">مؤشر الخطر النيوني</span>
        </div>
        <p className="font-cairo text-xs text-gray-300 leading-snug">
          احتساب نسبة المخاطرة بدقة بناءً على الـ Effective Ownership وصعوبة المواجهة وفارق الفورمة.
        </p>
      </div>

      {/* Right Callout Card */}
      <div
        style={{
          transform: `scale(${badge2Scale})`,
          opacity: badge2Scale,
        }}
        className="absolute bottom-[36%] right-6 z-40 glass p-3.5 rounded-2xl max-w-[270px] border border-[#FFB800]/50 shadow-[0_10px_30px_rgba(255,184,0,0.25)] select-none"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">⚔️</span>
          <span className="font-cairo font-bold text-[#FFB800] text-sm">مواجهة الرأس بالرأس</span>
        </div>
        <p className="font-cairo text-xs text-gray-300 leading-snug">
          مقارنة فورية بين الكابتن المضمون وخيارات الدفرنشيل ذات السقف التهديفي المرتفع.
        </p>
      </div>

      {/* Bottom Bar Sub-badge */}
      <div className="absolute bottom-10 inset-x-0 z-30 flex justify-center px-8">
        <div className="glass px-6 py-2.5 rounded-2xl border border-white/20 text-gray-200 font-cairo text-sm font-semibold flex items-center gap-3 shadow-xl">
          <span className="text-purple-300 font-bold">🔍 فحص أدق تفاصيل المنافسين</span>
          <span className="text-gray-500">|</span>
          <span className="text-amber-400">كن دائماً خطوة للأمام في جولات الحسم</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
