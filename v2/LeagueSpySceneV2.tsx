import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { Background } from "../Background";
import { PhoneMockup } from "../PhoneMockup";
import { LeagueSpyScreen } from "../LeagueSpyScreen";
import { C, cardStyle, sp } from "../tokens";
import { TrophyIcon, WarningIcon, LightningIcon, TargetRadarIcon } from "../Icons";
import { CircularMetricGauge, PulseRadarOrb, StatCube, CommercialTicker } from "./V2Components";

export const LeagueSpySceneV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3D Camera tilt and entrance
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const rotateY = interpolate(frame, [0, 110], [-10, 8], { extrapolateRight: "clamp" });
  const rotateX = interpolate(frame, [0, 110], [10, 12], { extrapolateRight: "clamp" });
  const floatY = Math.sin(frame * 0.05 + 2) * 8;
  const camZoom = 1.0 + (frame / 110) * 0.035;

  // Header Title timing
  const titleOpacity = interpolate(frame, [6, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [6, 20], [25, 0], { extrapolateRight: "clamp" });

  // Opposing Slides:
  // Left: Rank Surge slides from Left (-130px)
  const leftSpring = sp(frame, fps, 10, { damping: 12, mass: 0.8, stiffness: 150 });
  const leftX = interpolate(Math.min(leftSpring, 1), [0, 1], [-130, 0]);
  const leftOp = interpolate(frame, [10, 22], [0, 1], { extrapolateRight: "clamp" });

  // Right: Rival Alert slides from Right (+130px)
  const rightSpring = sp(frame, fps, 16, { damping: 12, mass: 0.8, stiffness: 150 });
  const rightX = interpolate(Math.min(rightSpring, 1), [0, 1], [130, 0]);
  const rightOp = interpolate(frame, [16, 28], [0, 1], { extrapolateRight: "clamp" });

  const winProg = interpolate(frame, [22, 60], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: C.midnight, overflow: "hidden" }}>
      <Background accentColor="#FFB800" secondaryColor="#00FF85" />

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
              background: "rgba(255, 184, 0, 0.18)",
              border: "1.5px solid #FFB800",
              color: "#FBBF24",
              fontFamily: "Cairo, sans-serif",
              fontSize: 13,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 0 25px rgba(255,184,0,0.35)",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#FFB800",
                boxShadow: "0 0 10px #FFB800",
              }}
            />
            <span>الميزة الخامسة · كاشف الدوريات وتتبع خوازيق المنافسين</span>
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
              textShadow: "0 10px 30px rgba(0,0,0,0.9), 0 0 35px rgba(255,184,0,0.35)",
            }}
          >
            LEAGUE SPY & CHIPS TRACKER — عينك على المنافسين
          </h2>
        </div>

        {/* ── Left Wing: Rank Surge (Slides from Left) ── */}
        <div
          style={{
            position: "absolute",
            left: 70,
            top: "22%",
            width: 360,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            zIndex: 25,
            opacity: leftOp,
            transform: `translateX(${leftX}px)`,
          }}
        >
          {/* Rank Jump Card */}
          <div
            style={{
              ...cardStyle({
                padding: "16px 20px",
                borderColor: "rgba(0, 255, 133, 0.45)",
              }),
              display: "flex",
              alignItems: "center",
              gap: 16,
              boxShadow: "0 15px 35px rgba(0,0,0,0.6), 0 0 25px rgba(0,255,133,0.2)",
            }}
          >
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: 14,
                background: "rgba(0, 255, 133, 0.18)",
                border: "2px solid #00FF85",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                color: "#00FF85",
                boxShadow: "0 0 15px rgba(0,255,133,0.4)",
              }}
            >
              ▲
            </div>
            <div style={{ display: "flex", flexDirection: "column", direction: "rtl" }}>
              <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 24, color: "#00FF85" }}>
                +45,000 RANK
              </span>
              <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "#FFFFFF", fontWeight: 800 }}>
                قفزة صاروخية في الترتيب العام
              </span>
            </div>
          </div>

          {/* Stat Cube: Mini League #1 */}
          <StatCube
            title="صدارة دوري الأصدقاء والعمل"
            value="1# MINI-LEAGUE"
            subtitle="توسيع الفارق النقطي أمام أقرب منافس"
            color="#FFD700"
            icon={<TrophyIcon size={24} color="#FFD700" />}
          />

          {/* Sonar Radar Orb */}
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
            <PulseRadarOrb size={48} color="#00E5FF" tag="SPY" />
            <div style={{ display: "flex", flexDirection: "column", direction: "rtl" }}>
              <span style={{ fontFamily: "Cairo, sans-serif", fontWeight: 800, fontSize: 14, color: "#FFFFFF" }}>
                كشف فوري لتشكيلات المنافسين
              </span>
              <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: "#00E5FF" }}>
                مع أول ثانية بعد إغلاق الديدلاين
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
          {/* Target Reticle Orbit */}
          <div
            style={{
              position: "absolute",
              width: 580,
              height: 580,
              borderRadius: "50%",
              border: "1.5px dashed rgba(255, 184, 0, 0.35)",
              transform: `rotate(${frame * 0.5}deg)`,
              pointerEvents: "none",
            }}
          />

          <PhoneMockup
            scale={0.92 * entrance}
            rotateX={rotateX}
            rotateY={rotateY}
            rotateZ={-2}
            translateY={floatY}
            glowColor="rgba(255, 184, 0, 0.45)"
          >
            <LeagueSpyScreen />
          </PhoneMockup>
        </div>

        {/* ── Right Wing: Rival Alerts (Slides from Right) ── */}
        <div
          style={{
            position: "absolute",
            right: 70,
            top: "22%",
            width: 360,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            zIndex: 25,
            opacity: rightOp,
            transform: `translateX(${rightX}px)`,
          }}
        >
          {/* Rival Chip Alert Card */}
          <div
            style={{
              ...cardStyle({
                padding: "16px 20px",
                borderColor: "rgba(255, 75, 75, 0.5)",
                background: "rgba(255, 75, 75, 0.08)",
              }),
              display: "flex",
              alignItems: "center",
              gap: 16,
              boxShadow: "0 15px 35px rgba(0,0,0,0.6), 0 0 25px rgba(255,75,75,0.25)",
            }}
          >
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: 14,
                background: "rgba(255, 75, 75, 0.2)",
                border: "2px solid #FF4B4B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 15px rgba(255,75,75,0.4)",
              }}
            >
              <WarningIcon size={28} color="#FF4B4B" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", direction: "rtl" }}>
              <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 18, color: "#FF4B4B" }}>
                BENCH BOOST ACTIVE!
              </span>
              <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "#FFFFFF", fontWeight: 800 }}>
                المنافس استخدم خواص الجولة
              </span>
            </div>
          </div>

          {/* Win Probability Circular Gauge */}
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
            <CircularMetricGauge
              value={92}
              progress={winProg}
              color="#FFD700"
              unit="%"
              label="WIN PROBABILITY"
              size={95}
              strokeWidth={7}
            />
            <div style={{ display: "flex", flexDirection: "column", direction: "rtl" }}>
              <span style={{ fontFamily: "Cairo, sans-serif", fontWeight: 900, fontSize: 16, color: "#FFFFFF" }}>
                احتمالية حسم الصدارة
              </span>
              <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: "#FFD700" }}>
                تفوق تكتيكي في المباريات المتبقية
              </span>
            </div>
          </div>

          {/* Defensive Shield */}
          <div
            style={{
              ...cardStyle({
                padding: "12px 18px",
                borderColor: "rgba(0, 255, 133, 0.4)",
                background: "rgba(0, 255, 133, 0.08)",
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
                background: "#00FF85",
                boxShadow: "0 0 15px #00FF85",
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
              حساب الخسائر وتأثير كابتن المنافسين عليك
            </span>
          </div>
        </div>

        {/* Live Commercial Ticker */}
        <CommercialTicker
          items={[
            "⚡ LEAGUE SPY LIVE MONITORING ACTIVE",
            "⚠️ RIVAL #2 CHIP DETECTED: BENCH BOOST",
            "👑 YOU ARE LEADING BY +32 POINTS",
            "🎯 SECURE YOUR TOP 10K FINISH",
          ]}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
