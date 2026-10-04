import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Img, staticFile } from "remotion";
import { C, cardStyle, easeOut, BgGrid, sp } from "../tokens";
import { FutCard } from "../FutCard";
import { GooglePlayIcon, ApkIcon, StarRating, ShieldCheckIcon, LightningIcon, TrophyIcon } from "../Icons";
import { CircularMetricGauge, PulseRadarOrb, StatCube, CommercialTicker } from "./V2Components";

const fi = (f: number, a: number, b: number, ea = 0, eb = 1) =>
  interpolate(f, [a, b], [ea, eb], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

export const CTASceneV2: React.FC = () => {
  const f = useCurrentFrame();

  const logoSpring = sp(f, 30, 0, { damping: 11, mass: 0.75, stiffness: 180 });
  const logoScale  = 0.5 + 0.5 * Math.min(logoSpring, 1.05);
  const logoOp     = fi(f, 0, 18);

  const titleOp   = fi(f, 12, 30);
  const titleY    = fi(f, 12, 30, 20, 0);

  // Opposing Slides:
  // Left: Palmer Card + 4.9 Star Rating (from -120px)
  const leftSpring = sp(f, 30, 14, { damping: 12, mass: 0.8, stiffness: 150 });
  const leftX = interpolate(Math.min(leftSpring, 1), [0, 1], [-120, 0]);
  const leftOp = fi(f, 14, 26);

  // Right: Haaland Card + 50k Users Orb (from +120px)
  const rightSpring = sp(f, 30, 18, { damping: 12, mass: 0.8, stiffness: 150 });
  const rightX = interpolate(Math.min(rightSpring, 1), [0, 1], [120, 0]);
  const rightOp = fi(f, 18, 30);

  // Center Callout & Download button
  const ctaSpring = sp(f, 30, 26, { damping: 12, mass: 0.8, stiffness: 160 });
  const ctaScale = interpolate(Math.min(ctaSpring, 1), [0, 1], [0.8, 1]);
  const ctaOp = fi(f, 26, 36);

  // Pulsing rings around button
  const pulseRing1 = 1 + ((f * 0.08) % 1) * 0.4;
  const pulseOp1 = 1 - ((f * 0.08) % 1);

  const glow = 0.7 + Math.sin(f * 0.15) * 0.3;
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

      {/* Central Radiating Glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: C.neonGreen,
          opacity: 0.09 * glow,
          filter: "blur(180px)",
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          transform: `scale(${camZoom})`,
          transformOrigin: "center center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          willChange: "transform",
        }}
      >
        {/* ── LEFT FLANK: Palmer Card + 4.9 Rating Orb ── */}
        <div
          style={{
            position: "absolute",
            left: 80,
            top: "50%",
            transform: `translateY(-50%) translateX(${leftX}px)`,
            opacity: leftOp,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            zIndex: 25,
          }}
        >
          <div
            style={{
              transform: "rotate(-6deg)",
              filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.8))",
            }}
          >
            <FutCard
              photo="palmer"
              name="Palmer"
              rating={91}
              position="MID"
              team="CHE"
              tier="gold"
              bgt={88}
              ftt={84}
              roi={96}
            />
          </div>

          {/* Rating Circle */}
          <div
            style={{
              ...cardStyle({
                padding: "10px 18px",
                borderColor: "rgba(255, 215, 0, 0.5)",
                background: "rgba(255, 215, 0, 0.1)",
              }),
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "0 0 20px rgba(255,215,0,0.3)",
            }}
          >
            <span style={{ fontSize: 18 }}>⭐</span>
            <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 18, color: "#FFD700" }}>
              4.9 / 5.0
            </span>
            <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: "#FFFFFF", fontWeight: 700 }}>
              تقييم المستخدمين
            </span>
          </div>
        </div>

        {/* ── CENTER HERO: Explosive Brand Drop & Conversion Hub ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: 820,
            zIndex: 30,
          }}
        >
          {/* Real App Icon with Rotating Ring */}
          <div
            style={{
              opacity: logoOp,
              transform: `scale(${logoScale})`,
              position: "relative",
              width: 110,
              height: 110,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: -8,
                borderRadius: 30,
                border: "2px dashed #00FF87",
                transform: `rotate(${f * 0.8}deg)`,
                boxShadow: "0 0 30px rgba(0,255,135,0.4)",
              }}
            />

            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: 24,
                background: "linear-gradient(135deg, #16181D 0%, #0B0F0D 100%)",
                border: "2px solid #00FF87",
                padding: 6,
                boxShadow: "0 0 40px rgba(0,255,135,0.6)",
              }}
            >
              <Img
                src={staticFile("app_icon.png")}
                style={{ width: "100%", height: "100%", borderRadius: 18 }}
              />
            </div>
          </div>

          {/* Punch Title */}
          <div
            style={{
              opacity: titleOp,
              transform: `translateY(${titleY}px)`,
              marginTop: 18,
            }}
          >
            <h1
              style={{
                fontFamily: "Outfit, Cairo, sans-serif",
                fontWeight: 900,
                fontSize: 62,
                color: "#FFFFFF",
                letterSpacing: -1,
                lineHeight: 1.05,
                textShadow: "0 10px 40px rgba(0,0,0,0.9), 0 0 50px rgba(0,255,135,0.4)",
              }}
            >
              جاهز تتصدر <span style={{ color: C.neonGreen }}>الدوري</span>؟
            </h1>
            <p
              style={{
                fontFamily: "Cairo, sans-serif",
                fontWeight: 800,
                fontSize: 22,
                color: "#CBD5E1",
                marginTop: 8,
                direction: "rtl",
              }}
            >
              لا تضيّع الديدلاين القادم — حمّل التطبيق وابدأ باكتساح الفانتزي الآن
            </p>
          </div>

          {/* Central Pulsing Download Button */}
          <div
            style={{
              position: "relative",
              marginTop: 26,
              opacity: ctaOp,
              transform: `scale(${ctaScale})`,
            }}
          >
            {/* Shockwave Rings */}
            <div
              style={{
                position: "absolute",
                inset: -12,
                borderRadius: 24,
                border: "2px solid #00FF87",
                transform: `scale(${pulseRing1})`,
                opacity: pulseOp1,
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                background: "linear-gradient(135deg, #00FF87 0%, #00E5FF 100%)",
                color: "#05070A",
                padding: "18px 46px",
                borderRadius: 18,
                fontFamily: "Cairo, sans-serif",
                fontWeight: 900,
                fontSize: 24,
                boxShadow: "0 15px 40px rgba(0,255,135,0.6), 0 0 60px rgba(0,229,255,0.4)",
                display: "flex",
                alignItems: "center",
                gap: 14,
                cursor: "pointer",
                letterSpacing: 0.5,
              }}
            >
              <LightningIcon size={26} color="#05070A" />
              <span>تحميل مجاني الآن — متوفر للأندرويد</span>
            </div>
          </div>

          {/* Stores Badges */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 22,
              opacity: ctaOp,
            }}
          >
            <div
              style={{
                ...cardStyle({
                  padding: "8px 20px",
                  borderColor: "rgba(0, 229, 255, 0.4)",
                }),
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <GooglePlayIcon size={20} />
              <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: 14, color: "#FFFFFF" }}>
                Google Play Store
              </span>
            </div>

            <div
              style={{
                ...cardStyle({
                  padding: "8px 20px",
                  borderColor: "rgba(0, 255, 135, 0.4)",
                }),
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <ApkIcon size={20} color="#00FF87" />
              <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: 14, color: "#FFFFFF" }}>
                Direct APK Download
              </span>
            </div>
          </div>
        </div>

        {/* ── RIGHT FLANK: Haaland Card + 50k Users Orb ── */}
        <div
          style={{
            position: "absolute",
            right: 80,
            top: "50%",
            transform: `translateY(-50%) translateX(${rightX}px)`,
            opacity: rightOp,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            zIndex: 25,
          }}
        >
          <div
            style={{
              transform: "rotate(6deg)",
              filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.8))",
            }}
          >
            <FutCard
              photo="haaland"
              name="Haaland"
              rating={95}
              position="FWD"
              team="MCI"
              tier="epic"
              bgt={95}
              ftt={94}
              roi={89}
            />
          </div>

          {/* 50k Managers Orb */}
          <div
            style={{
              ...cardStyle({
                padding: "10px 18px",
                borderColor: "rgba(0, 255, 135, 0.5)",
                background: "rgba(0, 255, 135, 0.1)",
              }),
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "0 0 20px rgba(0,255,135,0.3)",
            }}
          >
            <TrophyIcon size={18} color="#00FF87" />
            <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 18, color: "#00FF87" }}>
              +50,000
            </span>
            <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: "#FFFFFF", fontWeight: 700 }}>
              مدرب فانتزي نشط
            </span>
          </div>
        </div>

        {/* Live Commercial Ticker */}
        <CommercialTicker
          items={[
            "🏆 JOIN +50,000 FPL MANAGERS WORLDWIDE",
            "⚡ DOWNLOAD FPL SCOUT TODAY ON GOOGLE PLAY",
            "🎯 GET READY FOR THE NEXT DEADLINE",
            "👑 SECURE YOUR LEAGUE TITLE NOW",
          ]}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
