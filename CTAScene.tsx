import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Img, staticFile } from "remotion";
import { C, cardStyle, easeOut, BgGrid, sp } from "./tokens";
import { FutCard } from "./FutCard";
import { GooglePlayIcon, ApkIcon, StarRating, ShieldCheckIcon, LightningIcon } from "./Icons";

const fi = (f: number, a: number, b: number, ea = 0, eb = 1) =>
  interpolate(f, [a, b], [ea, eb], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

export const CTAScene: React.FC = () => {
  const f = useCurrentFrame();

  const logoSpring = sp(f, 30, 0, { damping: 11, mass: 0.75, stiffness: 180 });
  const logoScale  = 0.5 + 0.5 * Math.min(logoSpring, 1.05);
  const logoOp     = fi(f, 0, 20);

  const titleOp   = fi(f, 15, 38);
  const titleY    = fi(f, 15, 38, 20, 0);

  const bannerOp  = fi(f, 32, 55);
  const bannerY   = fi(f, 32, 55, 25, 0);
  const breath    = f > 55 ? 1 + Math.sin((f - 55) * 0.15) * 0.02 : 1;

  const storesOp  = fi(f, 48, 70);
  const trustOp   = fi(f, 60, 80);

  // Side floating cards
  const leftCardOp = fi(f, 20, 45);
  const leftCardX  = fi(f, 20, 45, -80, 0);

  const rightCardOp = fi(f, 25, 50);
  const rightCardX  = fi(f, 25, 50, 80, 0);

  const glow = 0.6 + Math.sin(f * 0.15) * 0.3;
  const camZoom = 1.0 + (f / 120) * 0.03;

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

      {/* Ambient center glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 850,
          height: 850,
          borderRadius: "50%",
          background: C.neonGreen,
          opacity: 0.08 * glow,
          filter: "blur(160px)",
          pointerEvents: "none",
        }}
      />

      {/* Left Floating Angled Card: Palmer Gold */}
      <div
        style={{
          position: "absolute",
          left: 70,
          top: "50%",
          transform: `translateY(-50%) translateX(${leftCardX}px) rotate(-8deg)`,
          opacity: leftCardOp,
          filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.7))",
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
          ftt={72}
          roi={94}
          width={220}
          height={320}
        />
      </div>

      {/* Right Floating Angled Card: Saka Silver */}
      <div
        style={{
          position: "absolute",
          right: 70,
          top: "50%",
          transform: `translateY(-50%) translateX(${rightCardX}px) rotate(8deg)`,
          opacity: rightCardOp,
          filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.7))",
        }}
      >
        <FutCard
          photo="saka"
          name="Saka"
          rating={88}
          position="MID"
          team="ARS"
          tier="silver"
          bgt={75}
          ftt={82}
          roi={87}
          width={220}
          height={320}
        />
      </div>

      {/* Main Center Broadcast Motion Slate */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          maxWidth: 960,
          zIndex: 10,
        }}
      >
        {/* Real App Icon with Glow Rings */}
        <div
          style={{
            opacity: logoOp,
            transform: `scale(${logoScale})`,
            position: "relative",
          }}
        >
          {/* Animated Glow Ring */}
          <div
            style={{
              position: "absolute",
              inset: -12,
              borderRadius: 36,
              background: `radial-gradient(circle, rgba(0,255,135,${glow * 0.6}) 0%, transparent 70%)`,
              filter: "blur(14px)",
            }}
          />

          <div
            style={{
              width: 110,
              height: 110,
              borderRadius: 26,
              background: "linear-gradient(135deg, #1C2330 0%, #0B0F0D 100%)",
              border: `2px solid ${C.neonGreen}`,
              boxShadow: `0 0 ${40 * glow}px rgba(0, 255, 135, ${glow * 0.6})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 8,
              position: "relative",
              zIndex: 2,
            }}
          >
            <Img
              src={staticFile("app_icon.png")}
              style={{ width: "100%", height: "100%", borderRadius: 18 }}
            />
          </div>
        </div>

        {/* Brand & Subtitle */}
        <div
          style={{
            opacity: titleOp,
            transform: `translateY(${titleY}px)`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 900,
              fontSize: 66,
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
              fontWeight: 800,
              fontSize: 25,
              color: C.greyLight,
              marginTop: 6,
              direction: "rtl",
            }}
          >
            كشافك التكتيكي الذكي في الفانتزي — متوفر الآن مجاناً
          </div>
        </div>

        {/* Broadcast Motion Slate Banner (Not a flat website button!) */}
        <div
          style={{
            opacity: bannerOp,
            transform: `translateY(${bannerY}px) scale(${breath})`,
          }}
        >
          <div
            style={{
              background: `linear-gradient(90deg, ${C.neonGreen} 0%, #00D4FF 100%)`,
              borderRadius: 18,
              padding: "16px 52px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              boxShadow: `0 0 ${45 * glow}px rgba(0, 255, 135, ${glow * 0.6}), 0 10px 25px rgba(0,0,0,0.5)`,
            }}
          >
            <LightningIcon size={24} color={C.midnight} />
            <span
              style={{
                fontFamily: "Cairo, sans-serif",
                fontWeight: 900,
                fontSize: 26,
                color: C.midnight,
                direction: "rtl",
                letterSpacing: 0.5,
              }}
            >
              جاهز لكل الجولات القادمة — مجاناً بالكامل
            </span>
          </div>
        </div>

        {/* Official Store Badges with Real Vector SVGs (Google Play + Direct APK) */}
        <div style={{ opacity: storesOp, display: "flex", gap: 18 }}>
          <div
            style={{
              ...cardStyle({
                padding: "12px 26px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }),
            }}
          >
            <GooglePlayIcon size={24} />
            <div>
              <div
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontSize: 10,
                  fontWeight: 800,
                  color: C.textGrey,
                  letterSpacing: 1.2,
                }}
              >
                AVAILABLE ON
              </div>
              <div
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 900,
                  fontSize: 16,
                  color: "#FFFFFF",
                }}
              >
                Google Play
              </div>
            </div>
          </div>

          <div
            style={{
              ...cardStyle({
                padding: "12px 26px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }),
            }}
          >
            <ApkIcon size={24} color={C.neonGreen} />
            <div>
              <div
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontSize: 10,
                  fontWeight: 800,
                  color: C.textGrey,
                  letterSpacing: 1.2,
                }}
              >
                FAST & SECURE
              </div>
              <div
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 900,
                  fontSize: 16,
                  color: C.neonGreen,
                }}
              >
                Direct APK Download
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges with Vector Stars & Shield */}
        <div
          style={{
            opacity: trustOp,
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginTop: 2,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <StarRating rating={5} size={15} color={C.warningYellow} />
            <span
              style={{
                fontFamily: "Cairo, sans-serif",
                fontWeight: 700,
                fontSize: 13,
                color: "#FFFFFF",
                direction: "rtl",
              }}
            >
              4.9 تقييم المدربين
            </span>
          </div>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <ShieldCheckIcon size={16} color={C.neonGreen} />
            <span
              style={{
                fontFamily: "Cairo, sans-serif",
                fontWeight: 700,
                fontSize: 13,
                color: C.greyLight,
                direction: "rtl",
              }}
            >
              بدون إعلانات مزعجة · تحديثات لحظية
            </span>
          </div>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>
          <span
            style={{
              fontFamily: "Cairo, sans-serif",
              fontWeight: 700,
              fontSize: 13,
              color: C.neonGreen,
              direction: "rtl",
            }}
          >
            عربي & English
          </span>
        </div>
      </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
