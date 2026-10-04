import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { C, cardStyle, easeOut, BgGrid, sp } from "../tokens";
import { FutCard } from "../FutCard";
import { RadarKpiChart, PlayerKpis } from "../RadarKpiChart";
import { TargetRadarIcon, LightningIcon, TrophyIcon, ShieldCheckIcon } from "../Icons";
import { CircularMetricGauge, PulseRadarOrb, StatCube, CommercialTicker } from "./V2Components";

const fi = (f: number, a: number, b: number, ea = 0, eb = 1) =>
  interpolate(f, [a, b], [ea, eb], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

export const KpiRadarSceneV2: React.FC = () => {
  const f = useCurrentFrame();

  const titleOp = fi(f, 4, 18);
  const titleY  = fi(f, 4, 18, 20, 0);

  // OPPOSING SLIDES FOR DUEL:
  // Left: Haaland slams from left (-180px)
  const leftSpring = sp(f, 30, 8, { damping: 12, mass: 0.85, stiffness: 160 });
  const leftX = interpolate(Math.min(leftSpring, 1), [0, 1], [-180, 0]);
  const leftOp = fi(f, 8, 20);

  // Right: Palmer slams from right (+180px)
  const rightSpring = sp(f, 30, 14, { damping: 12, mass: 0.85, stiffness: 160 });
  const rightX = interpolate(Math.min(rightSpring, 1), [0, 1], [180, 0]);
  const rightOp = fi(f, 14, 26);

  // Center VS Badge Slam
  const vsSpring = sp(f, 30, 20, { damping: 10, mass: 0.7, stiffness: 220 });
  const vsScale = interpolate(Math.min(vsSpring, 1), [0, 1], [0.2, 1]);
  const vsOp = fi(f, 20, 28);

  // Radar chart and gauge animations
  const gaugeProg1 = fi(f, 22, 60);
  const gaugeProg2 = fi(f, 28, 65);

  const camZoom = 1.0 + (f / 135) * 0.032;

  const haalandKpis: PlayerKpis = {
    bpsMagnet: 98,
    bigGameThreat: 95,
    nailedOn: 98,
    flatTrack: 94,
    valueRoi: 89,
  };

  const palmerKpis: PlayerKpis = {
    bpsMagnet: 92,
    bigGameThreat: 88,
    nailedOn: 95,
    flatTrack: 84,
    valueRoi: 96,
  };

  return (
    <AbsoluteFill
      style={{
        background: C.midnight,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BgGrid />

      {/* Ambient Radial Lights */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "20%",
          width: 750,
          height: 750,
          borderRadius: "50%",
          background: C.primaryPurple,
          opacity: 0.12,
          filter: "blur(180px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "20%",
          width: 750,
          height: 750,
          borderRadius: "50%",
          background: C.futGold,
          opacity: 0.10,
          filter: "blur(180px)",
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
        {/* Top Eyebrow & Title */}
        <div
          style={{
            position: "absolute",
            top: 34,
            left: 0,
            right: 0,
            zIndex: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            opacity: titleOp,
            transform: `translateY(${titleY}px)`,
            userSelect: "none",
          }}
        >
          <div
            style={{
              padding: "4px 18px",
              borderRadius: 999,
              background: "rgba(124, 92, 255, 0.18)",
              border: "1.5px solid #7C5CFF",
              color: "#A78BFA",
              fontFamily: "Cairo, sans-serif",
              fontSize: 13,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 0 25px rgba(124,92,255,0.4)",
            }}
          >
            <TargetRadarIcon size={16} color="#A78BFA" />
            <span>الميزة الثانية · رادار تقييم الـ KPI والمقارنة المباشرة</span>
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
              textShadow: "0 10px 30px rgba(0,0,0,0.9), 0 0 40px rgba(124,92,255,0.35)",
            }}
          >
            HEAD-TO-HEAD KPI RADAR — صراع الأرقام والنجوم
          </h2>
        </div>

        {/* ── Main Dynamic Duel Arena ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 60px 40px 60px",
            gap: 40,
            zIndex: 20,
          }}
        >
          {/* ── PLAYER 1: HAALAND (Slams from Left) ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              opacity: leftOp,
              transform: `translateX(${leftX}px)`,
            }}
          >
            {/* FUT Card */}
            <div style={{ filter: "drop-shadow(0 20px 40px rgba(124,92,255,0.4))" }}>
              <FutCard
                name="Haaland"
                team="MCI"
                position="FWD"
                photo="haaland"
                tier="epic"
                rating={95}
                bgt={95}
                ftt={94}
                roi={89}
              />
            </div>

            {/* Radar & Circular Gauges Column */}
            <div
              style={{
                ...cardStyle({
                  padding: "18px 22px",
                  borderColor: "rgba(124, 92, 255, 0.45)",
                }),
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
                boxShadow: "0 15px 35px rgba(0,0,0,0.6), 0 0 30px rgba(124,92,255,0.2)",
              }}
            >
              <RadarKpiChart kpis={haalandKpis} color="#7C5CFF" size={170} delay={12} />
              
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <CircularMetricGauge
                  value={98}
                  progress={gaugeProg1}
                  color="#7C5CFF"
                  unit="%"
                  label="BPS MAGNET"
                  size={85}
                  strokeWidth={6}
                />
                <div style={{ display: "flex", flexDirection: "column", direction: "rtl" }}>
                  <span style={{ fontFamily: "Cairo, sans-serif", fontWeight: 900, fontSize: 16, color: "#FFFFFF" }}>
                    مغناطيس بونص
                  </span>
                  <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: "#A78BFA" }}>
                    خيار كابتن مضمون الجولة
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── CENTER: Exploding "VS" Badge with Shockwave Rings ── */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              opacity: vsOp,
              transform: `scale(${vsScale})`,
              zIndex: 35,
            }}
          >
            {/* Pulsing ring */}
            <div
              style={{
                position: "absolute",
                width: 120,
                height: 120,
                borderRadius: "50%",
                border: "2px dashed rgba(255, 215, 0, 0.6)",
                transform: `rotate(${f * 1.5}deg)`,
                boxShadow: "0 0 30px rgba(255,215,0,0.4)",
              }}
            />

            <div
              style={{
                width: 76,
                height: 76,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FF4B4B 0%, #B8860B 100%)",
                border: "3px solid #FFFFFF",
                boxShadow: "0 0 35px rgba(255,75,75,0.8), 0 0 60px rgba(255,215,0,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Outfit, sans-serif",
                fontWeight: 900,
                fontSize: 26,
                color: "#FFFFFF",
                letterSpacing: 1,
              }}
            >
              VS
            </div>

            <div
              style={{
                marginTop: 14,
                padding: "3px 12px",
                borderRadius: 6,
                background: "rgba(0, 255, 135, 0.15)",
                border: "1px solid #00FF87",
                fontFamily: "Outfit, sans-serif",
                fontSize: 11,
                fontWeight: 900,
                color: "#00FF87",
                letterSpacing: 1,
              }}
            >
              AI COMPARISON
            </div>
          </div>

          {/* ── PLAYER 2: PALMER (Slams from Right) ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              opacity: rightOp,
              transform: `translateX(${rightX}px)`,
            }}
          >
            {/* Radar & Circular Gauges Column */}
            <div
              style={{
                ...cardStyle({
                  padding: "18px 22px",
                  borderColor: "rgba(255, 215, 0, 0.45)",
                }),
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
                boxShadow: "0 15px 35px rgba(0,0,0,0.6), 0 0 30px rgba(255,215,0,0.2)",
              }}
            >
              <RadarKpiChart kpis={palmerKpis} color="#FFD700" size={170} delay={16} />
              
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <CircularMetricGauge
                  value={96}
                  progress={gaugeProg2}
                  color="#FFD700"
                  unit="%"
                  label="ROI VALUE"
                  size={85}
                  strokeWidth={6}
                />
                <div style={{ display: "flex", flexDirection: "column", direction: "rtl" }}>
                  <span style={{ fontFamily: "Cairo, sans-serif", fontWeight: 900, fontSize: 16, color: "#FFFFFF" }}>
                    عائد استثماري خيالي
                  </span>
                  <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: "#FFD700" }}>
                    أفضل صفقة سعر مقابل نقاط
                  </span>
                </div>
              </div>
            </div>

            {/* FUT Card */}
            <div style={{ filter: "drop-shadow(0 20px 40px rgba(255,215,0,0.4))" }}>
              <FutCard
                name="Palmer"
                team="CHE"
                position="MID"
                photo="palmer"
                tier="gold"
                rating={91}
                bgt={88}
                ftt={84}
                roi={96}
              />
            </div>
          </div>
        </div>

        {/* Live Commercial Ticker */}
        <CommercialTicker
          items={[
            "⚡ 5-AXIS SPIDER RADAR METRICS ACTIVE",
            "👑 HAALAND: 98% BPS MAGNET RATING",
            "💎 PALMER: 96% ROI VALUE KING",
            "🎯 REAL-TIME DATA POWERED BY FPL SCOUT AI",
          ]}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
