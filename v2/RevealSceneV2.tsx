import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Img, staticFile } from "remotion";
import { C, cardStyle, easeOut, BgGrid, sp } from "../tokens";
import { PhoneMockup } from "../PhoneMockup";
import { PhoneAppDisplay } from "../PhoneAppDisplay";
import { LightningIcon, TrophyIcon, TargetRadarIcon, ShieldCheckIcon } from "../Icons";
import { CircularMetricGauge, PulseRadarOrb, StatCube, CommercialTicker } from "./V2Components";

const fi = (f: number, a: number, b: number, ea = 0, eb = 1) =>
  interpolate(f, [a, b], [ea, eb], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

export const RevealSceneV2: React.FC = () => {
  const f = useCurrentFrame();

  // Entrance spring animations
  const brandOp   = fi(f, 0, 18);
  const brandScale = fi(f, 0, 20, 0.85, 1);

  // Phone swoops in from center
  const phoneSpring = sp(f, 30, 6, { damping: 13, mass: 0.85, stiffness: 140 });
  const phoneScale  = 0.72 + 0.16 * Math.min(phoneSpring, 1.05);
  const phoneRotY   = interpolate(f, [0, 130], [-10, 8], { extrapolateRight: "clamp" });
  const phoneFloat  = Math.sin(f * 0.08) * 8;

  // Laser scan line over the phone screen
  const scanY = ((f * 14) % 650) - 50;

  // OPPOSING SLIDES:
  // Left Column (Snaps in from left: -140px → 0)
  const leftSpring = sp(f, 30, 16, { damping: 12, mass: 0.8, stiffness: 160 });
  const leftX = interpolate(Math.min(leftSpring, 1), [0, 1], [-140, 0]);
  const leftOp = fi(f, 16, 26);

  // Right Column (Snaps in from right: +140px → 0)
  const rightSpring = sp(f, 30, 22, { damping: 12, mass: 0.8, stiffness: 160 });
  const rightX = interpolate(Math.min(rightSpring, 1), [0, 1], [140, 0]);
  const rightOp = fi(f, 22, 32);

  // Floating circles timing
  const circleProgress1 = fi(f, 24, 65);
  const circleProgress2 = fi(f, 32, 70);

  // Stable camera (no zoom distortion)
  const camZoom = 1.0;

  return (
    <AbsoluteFill style={{ background: C.midnight, overflow: "hidden" }}>
      <BgGrid />

      {/* Ambient Neon Atmosphere Glows */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "20%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: C.neonGreen,
          opacity: 0.08 + Math.sin(f * 0.1) * 0.03,
          filter: "blur(160px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "20%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: C.primaryPurple,
          opacity: 0.09 + Math.cos(f * 0.1) * 0.03,
          filter: "blur(160px)",
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          transform: `scale(${camZoom})`,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        {/* Top Punchy Header */}
        <div
          style={{
            position: "absolute",
            top: 36,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: brandOp,
            transform: `scale(${brandScale})`,
            zIndex: 30,
            userSelect: "none",
          }}
        >
          <div
            style={{
              padding: "4px 18px",
              borderRadius: 999,
              background: "rgba(0, 255, 135, 0.14)",
              border: "1.5px solid #00FF87",
              color: "#00FF87",
              fontFamily: "Cairo, sans-serif",
              fontSize: 13,
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 0 25px rgba(0,255,135,0.35)",
            }}
          >
            <LightningIcon size={16} color="#00FF87" />
            <span>كشافك التكتيكي الذكي وصل</span>
          </div>

          <h1
            style={{
              fontFamily: "Outfit, Cairo, sans-serif",
              fontWeight: 900,
              fontSize: 52,
              color: "#FFFFFF",
              letterSpacing: -1,
              marginTop: 6,
              lineHeight: 1.1,
              textShadow: "0 10px 30px rgba(0,0,0,0.9), 0 0 40px rgba(0,255,135,0.3)",
            }}
          >
            FPL <span style={{ color: C.neonGreen }}>SCOUT</span> — الذكاء الاصطناعي للفوز بالدوري
          </h1>
        </div>

        {/* ── Dynamic 3-Column Kinetic Showcase ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "80px 90px 40px 90px",
            zIndex: 20,
          }}
        >
          {/* ── LEFT OPPOSING WING: Dynamic Sliding Elements (From Left) ── */}
          <div
            style={{
              width: 410,
              display: "flex",
              flexDirection: "column",
              gap: 18,
              opacity: leftOp,
              transform: `translateX(${leftX}px)`,
            }}
          >
            {/* Circular Gauge 1: xP Boost */}
            <div
              style={{
                ...cardStyle({
                  padding: "16px 20px",
                  borderColor: "rgba(0, 255, 135, 0.45)",
                }),
                display: "flex",
                alignItems: "center",
                gap: 16,
                boxShadow: "0 15px 35px rgba(0,0,0,0.6), 0 0 30px rgba(0,255,135,0.2)",
              }}
            >
              <CircularMetricGauge
                value={38}
                progress={circleProgress1}
                color={C.neonGreen}
                unit="+"
                label="xP BOOST"
                size={95}
                strokeWidth={7}
              />
              <div style={{ display: "flex", flexDirection: "column", direction: "rtl", flex: 1 }}>
                <span style={{ fontFamily: "Cairo, sans-serif", fontWeight: 900, fontSize: 17, color: "#FFFFFF" }}>
                  فارق نقاط الجولة
                </span>
                <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "#94A3B8", marginTop: 4 }}>
                  حساب دقيق لخوارزمية النقاط المتوقعة قبل كل ديدلاين.
                </span>
              </div>
            </div>

            {/* Stat Cube 1: AI Accuracy */}
            <StatCube
              title="دقة خوارزميات الذكاء الاصطناعي"
              value="99.4%"
              subtitle="تحليل لحظي لمباريات الـ Premier League"
              color={C.neonGreen}
              icon={<TargetRadarIcon size={24} color={C.neonGreen} />}
            />

            {/* Pulsing Sonar Badge */}
            <div
              style={{
                ...cardStyle({
                  padding: "12px 20px",
                  borderColor: "rgba(0, 229, 255, 0.4)",
                  background: "rgba(0, 229, 255, 0.08)",
                }),
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <PulseRadarOrb size={54} color={C.cyanAccent} tag="AI" />
              <div style={{ display: "flex", flexDirection: "column", direction: "rtl" }}>
                <span style={{ fontFamily: "Cairo, sans-serif", fontWeight: 800, fontSize: 15, color: "#FFFFFF" }}>
                  كشف الثغرات والخيارات التفاضلية
                </span>
                <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: C.cyanAccent }}>
                  Differentials بأقل من 5% ملكية!
                </span>
              </div>
            </div>
          </div>

          {/* ── CENTER HERO: 3D Floating Phone with Laser Scanner ── */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `translateY(${phoneFloat}px)`,
            }}
          >
            {/* Cyber Halo Rings behind the phone */}
            <div
              style={{
                position: "absolute",
                width: 520,
                height: 520,
                borderRadius: "50%",
                border: "2px dashed rgba(0, 255, 135, 0.35)",
                transform: `rotate(${f * 0.6}deg)`,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 440,
                height: 440,
                borderRadius: "50%",
                border: "1.5px solid rgba(124, 92, 255, 0.3)",
                transform: `rotate(-${f * 0.4}deg)`,
                pointerEvents: "none",
              }}
            />

            {/* Phone Mockup with 3D Tilt */}
            <PhoneMockup
              scale={phoneScale}
              rotateY={phoneRotY}
              rotateX={12}
              rotateZ={-2}
              glowColor="rgba(0, 255, 135, 0.5)"
            >
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <PhoneAppDisplay />

                {/* Laser Scan Line Sweep */}
                <div
                  style={{
                    position: "absolute",
                    top: scanY,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: "linear-gradient(90deg, transparent, #00FF87, #00E5FF, transparent)",
                    boxShadow: "0 0 15px #00FF87, 0 0 30px #00E5FF",
                    pointerEvents: "none",
                    zIndex: 30,
                  }}
                />
              </div>
            </PhoneMockup>
          </div>

          {/* ── RIGHT OPPOSING WING: Dynamic Sliding Elements (From Right) ── */}
          <div
            style={{
              width: 410,
              display: "flex",
              flexDirection: "column",
              gap: 18,
              opacity: rightOp,
              transform: `translateX(${rightX}px)`,
            }}
          >
            {/* Circular Gauge 2: ROI Efficiency */}
            <div
              style={{
                ...cardStyle({
                  padding: "16px 20px",
                  borderColor: "rgba(255, 184, 0, 0.45)",
                }),
                display: "flex",
                alignItems: "center",
                gap: 16,
                boxShadow: "0 15px 35px rgba(0,0,0,0.6), 0 0 30px rgba(255,184,0,0.2)",
              }}
            >
              <CircularMetricGauge
                value={96}
                progress={circleProgress2}
                color={C.futGoldLight}
                unit="%"
                label="ROI VALUE"
                size={95}
                strokeWidth={7}
              />
              <div style={{ display: "flex", flexDirection: "column", direction: "rtl", flex: 1 }}>
                <span style={{ fontFamily: "Cairo, sans-serif", fontWeight: 900, fontSize: 17, color: "#FFFFFF" }}>
                  كفاءة الصفقات والميزانية
                </span>
                <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "#94A3B8", marginTop: 4 }}>
                  أعلى عائد نقاط مقابل كل مليون جنيه استرليني.
                </span>
              </div>
            </div>

            {/* Stat Cube 2: Top Rank Shield */}
            <StatCube
              title="تصدر الدوريات والمجموعات"
              value="TOP 10K"
              subtitle="استراتيجية متكاملة للوصول لقمة الترتيب"
              color={C.primaryPurple}
              icon={<TrophyIcon size={24} color={C.primaryPurple} />}
            />

            {/* Live Instant Updates Chip */}
            <div
              style={{
                ...cardStyle({
                  padding: "14px 20px",
                  borderColor: "rgba(0, 255, 135, 0.4)",
                  background: "rgba(0, 255, 135, 0.08)",
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
                  background: "#00FF87",
                  boxShadow: "0 0 15px #00FF87",
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
                تحديث لحظي لأسعار اللاعبين والإصابات والديدلاين
              </span>
            </div>
          </div>
        </div>

        {/* Live Commercial Ticker Bar */}
        <CommercialTicker />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
