import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { Background } from "../Background";
import { PhoneMockup } from "../PhoneMockup";
import { PitchViewScreen } from "../PitchViewScreen";
import { C, cardStyle, sp } from "../tokens";
import { LightningIcon, TrophyIcon, TargetRadarIcon, ShieldCheckIcon } from "../Icons";
import { CircularMetricGauge, PulseRadarOrb, StatCube, CommercialTicker } from "./V2Components";

export const PitchViewSceneV2: React.FC = () => {
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
  const camZoom = 1.0;

  // Header Title timing
  const titleOpacity = interpolate(frame, [6, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [6, 20], [25, 0], { extrapolateRight: "clamp" });

  // Opposing Slides:
  // Left Wing: slides in from left (-120px)
  const leftSpring = sp(frame, fps, 12, { damping: 12, mass: 0.8, stiffness: 150 });
  const leftX = interpolate(Math.min(leftSpring, 1), [0, 1], [-120, 0]);
  const leftOp = interpolate(frame, [12, 22], [0, 1], { extrapolateRight: "clamp" });

  // Right Wing: slides in from right (+120px)
  const rightSpring = sp(frame, fps, 18, { damping: 12, mass: 0.8, stiffness: 150 });
  const rightX = interpolate(Math.min(rightSpring, 1), [0, 1], [120, 0]);
  const rightOp = interpolate(frame, [18, 28], [0, 1], { extrapolateRight: "clamp" });

  const xpProgress = interpolate(frame, [20, 60], [0, 1], { extrapolateRight: "clamp" });

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
        {/* Top Eyebrow & Title */}
        <div
          style={{
            position: "absolute",
            top: 36,
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
              padding: "4px 18px",
              borderRadius: 999,
              background: "rgba(0, 255, 133, 0.16)",
              border: "1.5px solid #00FF85",
              color: "#00FF85",
              fontFamily: "Cairo, sans-serif",
              fontSize: 13,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 0 20px rgba(0,255,133,0.3)",
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
            <span>الميزة الأولى · تشكيلة الكشاف الأسبوعية الذكية</span>
          </div>

          <h2
            style={{
              fontFamily: "Outfit, Cairo, sans-serif",
              fontWeight: 900,
              fontSize: 50,
              color: "#FFFFFF",
              letterSpacing: -0.5,
              marginTop: 6,
              lineHeight: 1.1,
              textShadow: "0 10px 30px rgba(0,0,0,0.85), 0 0 35px rgba(0,255,133,0.3)",
            }}
          >
            SMART SCOUT PICKS — تشكيلة الجولة التكتيكية
          </h2>
        </div>

        {/* ── Left Wing: Opposing Slide-In from Left ── */}
        <div
          style={{
            position: "absolute",
            left: 80,
            top: "22%",
            width: 380,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            zIndex: 25,
            opacity: leftOp,
            transform: `translateX(${leftX}px)`,
          }}
        >
          {/* Circular Projected Points Gauge */}
          <div
            style={{
              ...cardStyle({
                padding: "16px 20px",
                borderColor: "rgba(0, 255, 133, 0.4)",
              }),
              display: "flex",
              alignItems: "center",
              gap: 16,
              boxShadow: "0 15px 35px rgba(0,0,0,0.6), 0 0 25px rgba(0,255,133,0.2)",
            }}
          >
            <CircularMetricGauge
              value={85}
              progress={xpProgress}
              color="#00FF85"
              unit="xP"
              label="PROJECTED"
              size={95}
              strokeWidth={7}
            />
            <div style={{ display: "flex", flexDirection: "column", direction: "rtl", flex: 1 }}>
              <span style={{ fontFamily: "Cairo, sans-serif", fontWeight: 900, fontSize: 17, color: "#FFFFFF" }}>
                أعلى سقف نقاط متوقع
              </span>
              <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: "#94A3B8", marginTop: 2 }}>
                بناء التشكيلة بالذكاء الاصطناعي مع مراعاة الميزانية.
              </span>
            </div>
          </div>

          {/* Formation Stat Cube */}
          <StatCube
            title="الهيكل التكتيكي الموصى به"
            value="3 - 4 - 3"
            subtitle="أقصى هجوم واستغلال لمباريات القمة"
            color="#00FF85"
            icon={<TargetRadarIcon size={24} color="#00FF85" />}
          />

          {/* Differential Alert Chip */}
          <div
            style={{
              ...cardStyle({
                padding: "12px 18px",
                borderColor: "rgba(0, 229, 255, 0.4)",
                background: "rgba(0, 229, 255, 0.08)",
              }),
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <PulseRadarOrb size={48} color="#00E5FF" tag="DIFF" />
            <div style={{ display: "flex", flexDirection: "column", direction: "rtl" }}>
              <span style={{ fontFamily: "Cairo, sans-serif", fontWeight: 800, fontSize: 14, color: "#FFFFFF" }}>
                3 خيارات دفرينشال مضمونة
              </span>
              <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: "#00E5FF" }}>
                رفع الترتيب العام والهروب من المنافسين
              </span>
            </div>
          </div>
        </div>

        {/* ── Center 3D Floating Phone Mockup ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 85,
            zIndex: 20,
          }}
        >
          {/* Tactical radar rings around phone */}
          <div
            style={{
              position: "absolute",
              width: 580,
              height: 580,
              borderRadius: "50%",
              border: "1.5px dashed rgba(0, 255, 133, 0.25)",
              transform: `rotate(${frame * 0.4}deg)`,
              pointerEvents: "none",
            }}
          />

          <PhoneMockup
            scale={0.92 * entrance}
            rotateX={rotateX}
            rotateY={rotateY}
            rotateZ={-2}
            translateY={floatY}
            glowColor="rgba(0, 255, 133, 0.45)"
          >
            <PitchViewScreen />
          </PhoneMockup>
        </div>

        {/* ── Right Wing: Opposing Slide-In from Right ── */}
        <div
          style={{
            position: "absolute",
            right: 80,
            top: "22%",
            width: 380,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            zIndex: 25,
            opacity: rightOp,
            transform: `translateX(${rightX}px)`,
          }}
        >
          {/* Captain Locked Roundel Card */}
          <div
            style={{
              ...cardStyle({
                padding: "16px 20px",
                borderColor: "rgba(255, 215, 0, 0.45)",
              }),
              display: "flex",
              alignItems: "center",
              gap: 16,
              boxShadow: "0 15px 35px rgba(0,0,0,0.6), 0 0 25px rgba(255,215,0,0.2)",
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FFD700 0%, #B8860B 100%)",
                boxShadow: "0 0 20px rgba(255,215,0,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                fontWeight: 900,
                color: "#05070A",
                flexShrink: 0,
              }}
            >
              C
            </div>
            <div style={{ display: "flex", flexDirection: "column", direction: "rtl", flex: 1 }}>
              <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 18, color: "#FFD700" }}>
                HAALAND (C) LOCKED
              </span>
              <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "#FFFFFF", fontWeight: 800 }}>
                تثبيت الكابتن الذكي +24 نقطة
              </span>
            </div>
          </div>

          {/* Vice Captain Chip */}
          <StatCube
            title="الكابتن البديل (Vice Captain)"
            value="PALMER (VC)"
            subtitle="أمان كامل في حال غياب أو مداورة الكابتن"
            color="#00E5FF"
            icon={<LightningIcon size={24} color="#00E5FF" />}
          />

          {/* Bench Strength Card */}
          <div
            style={{
              ...cardStyle({
                padding: "12px 18px",
                borderColor: "rgba(124, 92, 255, 0.4)",
                background: "rgba(124, 92, 255, 0.08)",
              }),
              display: "flex",
              alignItems: "center",
              gap: 14,
              direction: "rtl",
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#7C5CFF",
                boxShadow: "0 0 15px #7C5CFF",
              }}
            />
            <span
              style={{
                fontFamily: "Cairo, sans-serif",
                fontWeight: 800,
                fontSize: 14,
                color: "#FFFFFF",
              }}
            >
              دكة بدلاء قوية وتدوير تلقائي في حالات الغياب
            </span>
          </div>
        </div>

        {/* Live Commercial Ticker */}
        <CommercialTicker
          items={[
            "⚡ SMART SCOUT PICKS GW28 ACTIVE",
            "👑 HAALAND CAPTAIN CONFIRMED (xP 12.8)",
            "🎯 3-4-3 OPTIMAL BALANCED FORMATION",
            "💎 DIFFERENTIAL OF THE WEEK: ISAK",
          ]}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
