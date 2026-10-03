import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { Background } from "./Background";
import { PhoneMockup } from "./PhoneMockup";
import { PitchViewScreen } from "./PitchViewScreen";
import { C, cardStyle } from "./tokens";

export const PitchViewScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3D Camera tilt and entrance
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const rotateY = interpolate(frame, [0, 120], [-12, -4], { extrapolateRight: "clamp" });
  const rotateX = interpolate(frame, [0, 120], [14, 8], { extrapolateRight: "clamp" });
  const floatY = Math.sin(frame * 0.05) * 8;
  const camZoom = 1.0 + (frame / 120) * 0.032;

  // Header Title timing
  const titleOpacity = interpolate(frame, [8, 24], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [8, 24], [25, 0], { extrapolateRight: "clamp" });

  // Callout badges timing
  const badge1Scale = spring({ frame: frame - 25, fps, config: { damping: 12 } });
  const badge2Scale = spring({ frame: frame - 38, fps, config: { damping: 12 } });
  const badge3Scale = spring({ frame: frame - 52, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ background: C.midnight, overflow: "hidden" }}>
      <Background accentColor="#00FF85" secondaryColor="#034694" />

      <AbsoluteFill
        style={{
          transform: `scale(${camZoom})`,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        {/* Top Banner & Eyebrow Title */}
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 0,
            right: 0,
            zIndex: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            userSelect: "none",
          }}
        >
          <div
            style={{
              padding: "4px 16px",
              borderRadius: 9999,
              background: "rgba(0, 255, 133, 0.15)",
              border: "1px solid rgba(0, 255, 133, 0.4)",
              color: "#00FF85",
              fontFamily: "Cairo, sans-serif",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 0.5,
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 4px 15px rgba(0,255,133,0.2)",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#00FF85",
                boxShadow: "0 0 10px #00FF85",
              }}
            />
            <span>الميزة الأولى · تشكيلة الكشاف الذكي</span>
          </div>
          <h2
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 900,
              fontSize: 52,
              color: "#FFFFFF",
              letterSpacing: -0.5,
              lineHeight: 1.1,
            }}
          >
            Smart Scout Picks — Pitch View
          </h2>
        </div>

        {/* Center 3D Floating Phone Mockup */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 80,
            zIndex: 20,
          }}
        >
          <PhoneMockup
            scale={0.92 * entrance}
            rotateX={rotateX}
            rotateY={rotateY}
            rotateZ={-2}
            translateY={floatY}
            glowColor="rgba(0, 255, 133, 0.4)"
          >
            <PitchViewScreen />
          </PhoneMockup>
        </div>

        {/* Floating 3D Callout Cards on sides */}
        {/* Top-Right Callout */}
        <div
          style={{
            position: "absolute",
            top: "34%",
            right: 80,
            zIndex: 40,
            transform: `scale(${Math.max(0, badge1Scale)})`,
            opacity: Math.max(0, badge1Scale),
            maxWidth: 320,
            ...cardStyle({
              padding: "16px 20px",
              borderColor: "rgba(0, 255, 133, 0.5)",
              boxShadow: "0 10px 30px rgba(0,255,133,0.25)",
            }),
            userSelect: "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 20 }}>⚡</span>
            <span style={{ fontFamily: "Cairo, sans-serif", fontWeight: 800, color: "#FFFFFF", fontSize: 16 }}>
              شارات القيادة الذكية
            </span>
          </div>
          <p style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "#CBD5E1", lineHeight: 1.5, direction: "rtl" }}>
            تفسير لحظي لمعادلة السقف التهديفي وفارق الفورمة لاختيار الكابتن (C) والنائب (V).
          </p>
        </div>

        {/* Left Callout */}
        <div
          style={{
            position: "absolute",
            bottom: "34%",
            left: 80,
            zIndex: 40,
            transform: `scale(${Math.max(0, badge2Scale)})`,
            opacity: Math.max(0, badge2Scale),
            maxWidth: 320,
            ...cardStyle({
              padding: "16px 20px",
              borderColor: "rgba(124, 92, 255, 0.5)",
              boxShadow: "0 10px 30px rgba(121,40,202,0.25)",
            }),
            userSelect: "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 20 }}>📊</span>
            <span style={{ fontFamily: "Cairo, sans-serif", fontWeight: 800, color: "#C084FC", fontSize: 16 }}>
              مؤشرات الـ KPI الفائقة
            </span>
          </div>
          <p style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "#CBD5E1", lineHeight: 1.5, direction: "rtl" }}>
            Superpower Score · Big Game Threat · Luck Index ومعدل البونص المتوقع.
          </p>
        </div>

        {/* Bottom Bar Sub-badge */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            left: 0,
            right: 0,
            zIndex: 30,
            display: "flex",
            justifyContent: "center",
            transform: `scale(${Math.max(0, badge3Scale)})`,
            opacity: Math.max(0, badge3Scale),
          }}
        >
          <div
            style={{
              ...cardStyle({
                padding: "10px 28px",
                borderColor: "rgba(255, 255, 255, 0.2)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
              }),
              display: "flex",
              alignItems: "center",
              gap: 16,
              color: "#E2E8F0",
              fontFamily: "Cairo, sans-serif",
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            <span style={{ color: "#00FF85", fontWeight: 800 }}>⚽ تشكيلات تفاعلية ديناميكية</span>
            <span style={{ color: "#64748B" }}>|</span>
            <span style={{ direction: "rtl" }}>دكة بدلاء تحلل سبب استبعاد كل لاعب</span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
