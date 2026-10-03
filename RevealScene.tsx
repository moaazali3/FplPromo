import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Img, staticFile } from "remotion";
import { C, cardStyle, easeOut, BgGrid, sp } from "./tokens";
import { PhoneMockup } from "./PhoneMockup";
import { PhoneAppDisplay } from "./PhoneAppDisplay";
import { LightningIcon, TrophyIcon, TargetRadarIcon, SoccerBallIcon, BrainChipIcon } from "./Icons";

const fi = (f: number, a: number, b: number, ea = 0, eb = 1) =>
  interpolate(f, [a, b], [ea, eb], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

export const RevealScene: React.FC = () => {
  const f = useCurrentFrame();

  // Entrance animations
  const brandOp   = fi(f, 0, 24);
  const brandX    = fi(f, 0, 24, -60, 0);

  const phoneOp   = fi(f, 10, 36);
  const phoneX    = fi(f, 10, 36, 80, 0);
  const phoneSpring = sp(f, 30, 8, { damping: 13, mass: 0.85, stiffness: 150 });
  const phoneScale  = 0.74 + 0.12 * Math.min(phoneSpring, 1.05);

  const card1Op   = fi(f, 32, 52);
  const card1X    = fi(f, 32, 52, -40, 0);

  const card2Op   = fi(f, 48, 68);
  const card2X    = fi(f, 48, 68, -40, 0);

  const card3Op   = fi(f, 64, 84);
  const card3X    = fi(f, 64, 84, -40, 0);

  const pillsOp   = fi(f, 82, 102);

  const badge1Op  = fi(f, 55, 75);
  const badge2Op  = fi(f, 75, 95);

  const glowPulse = 0.85 + Math.sin(f * 0.1) * 0.15;
  const floatY    = Math.sin(f * 0.08) * 8;
  const camZoom   = 1.0 + (f / 150) * 0.032;

  return (
    <AbsoluteFill style={{ background: C.midnight, overflow: "hidden" }}>
      <BgGrid />

      <AbsoluteFill
        style={{
          transform: `scale(${camZoom})`,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >

      {/* Ambient Radial Glows */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "25%",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: C.neonGreen,
          opacity: 0.06 * glowPulse,
          filter: "blur(160px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          right: "20%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: C.primaryPurple,
          opacity: 0.07 * glowPulse,
          filter: "blur(150px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 84px",
          zIndex: 10,
        }}
      >
        {/* ── Left Column: Brand & Value Proposition ── */}
        <div
          style={{
            flex: 1.15,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            maxWidth: 840,
          }}
        >
          {/* Brand Header */}
          <div
            style={{
              opacity: brandOp,
              transform: `translateX(${brandX}px)`,
              display: "flex",
              alignItems: "center",
              gap: 22,
            }}
          >
            {/* Real App Icon */}
            <div
              style={{
                width: 90,
                height: 90,
                borderRadius: 22,
                background: "linear-gradient(135deg, #16181D 0%, #0B0F0D 100%)",
                border: `2px solid ${C.neonGreen}`,
                boxShadow: `0 0 35px rgba(0, 255, 135, 0.45)`,
                padding: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Img
                src={staticFile("app_icon.png")}
                style={{ width: "100%", height: "100%", borderRadius: 16 }}
              />
            </div>

            <div>
              <div
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 900,
                  fontSize: 68,
                  letterSpacing: "-2px",
                  color: "#FFFFFF",
                  lineHeight: 1,
                }}
              >
                FPL <span style={{ color: C.neonGreen }}>Scout</span>
              </div>
              <div
                style={{
                  fontFamily: "Cairo, sans-serif",
                  fontWeight: 700,
                  fontSize: 24,
                  color: C.greyLight,
                  marginTop: 6,
                  direction: "rtl",
                }}
              >
                كشافك التكتيكي الذكي في الفانتزي
              </div>
            </div>
          </div>

          {/* 3 Core Capability Cards matching real Flutter screens */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 4 }}>
            {[
              {
                op: card1Op,
                x: card1X,
                iconNode: <LightningIcon size={24} color={C.neonGreen} />,
                title: "تشكيلة الكشاف الذكية (AI Scout Picks)",
                desc: "تشكيلة أسبوعية مثالية محسوبة بخوارزميات xP وتحديث لحظي لديدلاين الجولات.",
                color: C.neonGreen,
                border: C.borderGreen,
              },
              {
                op: card2Op,
                x: card2X,
                iconNode: <TrophyIcon size={24} color={C.futGoldLight} />,
                title: "بطاقات اللاعبين التفاعلية (FUT Player Cards)",
                desc: "بطاقات 100 EPIC و GOLD بتصنيف تقييمي ذكي و3 مؤشرات قوة: BGT, FTT, ROI.",
                color: C.futGoldLight,
                border: "rgba(255, 215, 0, 0.4)",
              },
              {
                op: card3Op,
                x: card3X,
                iconNode: <TargetRadarIcon size={24} color={C.primaryPurple} />,
                title: "رادار مخاطرة الكابتن وخيارات الفارق (Differentials)",
                desc: "حساب نسبة المجازفة ومقارنة الكابتن المضمون مع اللاعبين القادرين على رفع ترتيبك.",
                color: C.primaryPurple,
                border: C.borderViolet,
              },
            ].map(({ op, x, iconNode, title, desc, color, border }, idx) => (
              <div
                key={idx}
                style={{
                  opacity: op,
                  transform: `translateX(${x}px)`,
                  ...cardStyle({
                    padding: "16px 22px",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }),
                  borderColor: border,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: `${color}18`,
                    border: `1.5px solid ${border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {iconNode}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      fontWeight: 800,
                      fontSize: 18,
                      color,
                    }}
                  >
                    {title}
                  </div>
                  <div
                    style={{
                      fontFamily: "Cairo, sans-serif",
                      fontSize: 14,
                      color: C.greyLight,
                      direction: "rtl",
                      marginTop: 3,
                    }}
                  >
                    {desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Trust Pills */}
          <div
            style={{
              opacity: pillsOp,
              display: "flex",
              gap: 12,
              marginTop: 4,
            }}
          >
            {[
              { label: "الذكاء الاصطناعي xG & xP", color: C.neonGreen },
              { label: "الدوري الإنجليزي الممتاز", color: "#FFFFFF" },
              { label: "عربي & English", color: C.futGoldLight },
              { label: "مجاني بالكامل", color: C.cyanAccent },
            ].map(({ label, color }, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 999,
                  padding: "6px 16px",
                }}
              >
                <span
                  style={{
                    fontFamily: "Cairo, sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    color,
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Column: Authentic Phone Mockup showing Real In-App Screenshots ── */}
        <div
          style={{
            flex: 0.85,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            opacity: phoneOp,
            transform: `translateX(${phoneX}px) translateY(${floatY}px)`,
          }}
        >
          {/* The Phone Container with 3D Axial Spin Transition between Screens */}
          <div style={{ transform: `scale(${phoneScale + (f >= 62 && f <= 98 ? Math.sin(((f - 62) / 36) * Math.PI) * 0.08 : 0)})` }}>
            <PhoneMockup
              rotateY={fi(f, 62, 98, -4, 356)}
              rotateX={f >= 62 && f <= 98 ? 3 + Math.sin(((f - 62) / 36) * Math.PI) * 7 : 3}
            >
              <PhoneAppDisplay />
            </PhoneMockup>
          </div>
        </div>
      </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
