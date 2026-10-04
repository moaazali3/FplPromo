import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { C, cardStyle, easeOut, BgGrid, sp } from "../tokens";
import { FutCard } from "../FutCard";
import { TargetRadarIcon, WarningIcon, ShieldCheckIcon, LightningIcon } from "../Icons";
import { CircularMetricGauge, PulseRadarOrb, StatCube, CommercialTicker } from "./V2Components";

const fi = (f: number, a: number, b: number, ea = 0, eb = 1) =>
  interpolate(f, [a, b], [ea, eb], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

export const FeatureSceneV2: React.FC = () => {
  const f = useCurrentFrame();

  const titleOp = fi(f, 4, 18);
  const titleY  = fi(f, 4, 18, 20, 0);

  // Central Risk Gauge
  const gaugeProg = fi(f, 15, 65);

  // Opposing Slides:
  // Safe Captain (Haaland) slams from LEFT (-160px)
  const leftSpring = sp(f, 30, 8, { damping: 12, mass: 0.85, stiffness: 160 });
  const leftX = interpolate(Math.min(leftSpring, 1), [0, 1], [-160, 0]);
  const leftOp = fi(f, 8, 20);

  // Differential Captain (Palmer) slams from RIGHT (+160px)
  const rightSpring = sp(f, 30, 14, { damping: 12, mass: 0.85, stiffness: 160 });
  const rightX = interpolate(Math.min(rightSpring, 1), [0, 1], [180, 0]);
  const rightOp = fi(f, 14, 26);

  // Differential Alert Stamp Slam
  const stampSpring = sp(f, 30, 24, { damping: 10, mass: 0.7, stiffness: 220 });
  const stampScale = interpolate(Math.min(stampSpring, 1), [0, 1], [0.2, 1]);
  const stampOp = fi(f, 24, 30);

  const camZoom = 1.0;

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

      {/* Ambient Red & Green Risk Glows */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "25%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "#00FF87",
          opacity: 0.08,
          filter: "blur(180px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "25%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "#FF4B4B",
          opacity: 0.09,
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
              background: "rgba(124, 92, 255, 0.16)",
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
            <span>الميزة الرابعة · مصفوفة مخاطرة الكابتن وخوارزمية الفارق</span>
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
            CAPTAIN RISK MATRIX — الاختيار الآمن أم مغامرة الفارق؟
          </h2>
        </div>

        {/* ── Main Arena: Safe vs Differential Duel ── */}
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
          {/* ── LEFT: SAFE BET CAPTAIN (Haaland) ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              opacity: leftOp,
              transform: `translateX(${leftX}px)`,
            }}
          >
            <div style={{ filter: "drop-shadow(0 20px 40px rgba(0,255,135,0.4))" }}>
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

            <div
              style={{
                width: 240,
                ...cardStyle({
                  padding: "16px 20px",
                  borderColor: "rgba(0, 255, 135, 0.45)",
                }),
                display: "flex",
                flexDirection: "column",
                gap: 12,
                direction: "rtl",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    background: "#00FF87",
                    color: "#05070A",
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 900,
                    fontSize: 12,
                    padding: "3px 10px",
                    borderRadius: 6,
                  }}
                >
                  SAFE PICK
                </span>
                <span style={{ fontFamily: "Cairo, sans-serif", fontWeight: 800, fontSize: 14, color: "#FFFFFF" }}>
                  كابتن الأمان التام
                </span>
              </div>

              <StatCube
                title="نسبة الملكية الفعالة (EO)"
                value="148%"
                subtitle="حماية صلبة لترتيبك الحالي"
                color="#00FF87"
                icon={<ShieldCheckIcon size={20} color="#00FF87" />}
              />

              <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: "#94A3B8" }}>
                سقف نقاط متوقع: <span style={{ color: "#00FF87", fontWeight: 900 }}>12.4 xP</span>
              </span>
            </div>
          </div>

          {/* ── CENTER: GIANT CIRCULAR RISK GAUGE & DIFFERENTIAL STAMP ── */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 35,
            }}
          >
            {/* Pulsing Risk Rings */}
            <div
              style={{
                position: "absolute",
                top: 0,
                width: 170,
                height: 170,
                borderRadius: "50%",
                border: "2px dashed rgba(255, 75, 75, 0.45)",
                transform: `rotate(${f * 1.2}deg)`,
                boxShadow: "0 0 30px rgba(255,75,75,0.25)",
                pointerEvents: "none",
              }}
            />

            <CircularMetricGauge
              value={78}
              progress={gaugeProg}
              color="#FF4B4B"
              unit="%"
              label="DIFFERENTIAL RISK"
              size={140}
              strokeWidth={10}
            />

            {/* Differential Slam Stamp */}
            <div
              style={{
                marginTop: 14,
                opacity: stampOp,
                transform: `scale(${stampScale}) rotate(-4deg)`,
                padding: "6px 16px",
                borderRadius: 8,
                background: "linear-gradient(135deg, #FF4B4B 0%, #B8860B 100%)",
                border: "2px solid #FFFFFF",
                boxShadow: "0 0 25px rgba(255,75,75,0.8)",
                fontFamily: "Outfit, sans-serif",
                fontWeight: 900,
                fontSize: 13,
                color: "#FFFFFF",
                letterSpacing: 1.5,
              }}
            >
              HIGH UPSIDE REWARD
            </div>
          </div>

          {/* ── RIGHT: DIFFERENTIAL CAPTAIN (Palmer) ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              opacity: rightOp,
              transform: `translateX(${rightX}px)`,
            }}
          >
            <div
              style={{
                width: 240,
                ...cardStyle({
                  padding: "16px 20px",
                  borderColor: "rgba(255, 184, 0, 0.45)",
                }),
                display: "flex",
                flexDirection: "column",
                gap: 12,
                direction: "rtl",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    background: "#FFD700",
                    color: "#05070A",
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 900,
                    fontSize: 12,
                    padding: "3px 10px",
                    borderRadius: 6,
                  }}
                >
                  DIFFERENTIAL
                </span>
                <span style={{ fontFamily: "Cairo, sans-serif", fontWeight: 800, fontSize: 14, color: "#FFFFFF" }}>
                  قفزة الترتيب الصاروخية
                </span>
              </div>

              <StatCube
                title="نسبة كابتنة المنافسين (EO)"
                value="16.4%"
                subtitle="فارق مرعب يضاعف نقاطك لوحدك"
                color="#FFD700"
                icon={<LightningIcon size={20} color="#FFD700" />}
              />

              <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: "#94A3B8" }}>
                أعلى سقف جولة متوقع: <span style={{ color: "#FFD700", fontWeight: 900 }}>21+ PTS</span>
              </span>
            </div>

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
            "⚡ CAPTAIN RISK MATRIX CALCULATING GW28 RATIOS",
            "🛡️ HAALAND: 82% CERTAINTY SCORE",
            "🔥 PALMER: 78% DIFFERENTIAL UPSIDE GAIN",
            "👑 MAKE INFORMED DEADLINE DECISIONS",
          ]}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
