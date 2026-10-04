import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { C, cardStyle, easeOut, BgGrid, sp } from "../tokens";
import { FutCard } from "../FutCard";
import { TransferSwapIcon, LightningIcon, WarningIcon, ShieldCheckIcon } from "../Icons";
import { CircularMetricGauge, PulseRadarOrb, StatCube, CommercialTicker } from "./V2Components";

const fi = (f: number, a: number, b: number, ea = 0, eb = 1) =>
  interpolate(f, [a, b], [ea, eb], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

export const TransferLabSceneV2: React.FC = () => {
  const f = useCurrentFrame();

  const titleOp = fi(f, 4, 18);
  const titleY  = fi(f, 4, 18, 20, 0);

  // OPPOSING SLIDES:
  // Outgoing Player (SELL) slams in from LEFT (-180px)
  const sellSpring = sp(f, 30, 8, { damping: 12, mass: 0.85, stiffness: 160 });
  const sellX = interpolate(Math.min(sellSpring, 1), [0, 1], [-180, 0]);
  const sellOp = fi(f, 8, 20);

  // Incoming Player (BUY) slams in from RIGHT (+180px)
  const buySpring = sp(f, 30, 14, { damping: 12, mass: 0.85, stiffness: 160 });
  const buyX = interpolate(Math.min(buySpring, 1), [0, 1], [180, 0]);
  const buyOp = fi(f, 14, 26);

  // Center Swap Hub & Net Gain Badge
  const swapSpring = sp(f, 30, 20, { damping: 11, mass: 0.75, stiffness: 200 });
  const swapScale = interpolate(Math.min(swapSpring, 1), [0, 1], [0.3, 1]);
  const swapOp = fi(f, 20, 28);
  const swapRot = interpolate(f, [20, 80], [0, 360], { extrapolateRight: "clamp" });

  // Wildcard Banner at bottom
  const wcSpring = sp(f, 30, 32, { damping: 12, mass: 0.8, stiffness: 150 });
  const wcY = interpolate(Math.min(wcSpring, 1), [0, 1], [40, 0]);
  const wcOp = fi(f, 32, 42);

  const gainProgress = fi(f, 24, 60);
  const camZoom = 1.0 + (f / 135) * 0.032;

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

      {/* Ambient glows */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "20%",
          width: 750,
          height: 750,
          borderRadius: "50%",
          background: "#FF4B4B",
          opacity: 0.08,
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
          background: "#00FF87",
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
              background: "rgba(0, 255, 135, 0.16)",
              border: "1.5px solid #00FF87",
              color: "#00FF87",
              fontFamily: "Cairo, sans-serif",
              fontSize: 13,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 0 25px rgba(0,255,135,0.35)",
            }}
          >
            <TransferSwapIcon size={16} color="#00FF87" />
            <span>الميزة الثالثة · مختبر الانتقالات ومحرك توقيت الوايلد كارد</span>
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
              textShadow: "0 10px 30px rgba(0,0,0,0.9), 0 0 40px rgba(0,255,135,0.35)",
            }}
          >
            SMART TRANSFER LAB — التبديل الرابح بدون حرق نقاط
          </h2>
        </div>

        {/* ── Main Transfer Market Trade Floor ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "70px 50px 70px 50px",
            gap: 36,
            zIndex: 20,
          }}
        >
          {/* ── OUTGOING PLAYER (SELL: Red Alert) ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              opacity: sellOp,
              transform: `translateX(${sellX}px)`,
            }}
          >
            <div style={{ filter: "drop-shadow(0 20px 40px rgba(255,75,75,0.4))" }}>
              <FutCard
                name="Watkins"
                team="AVL"
                position="FWD"
                photo="silhouette"
                tier="gold"
                rating={85}
                bgt={78}
                ftt={80}
                roi={74}
              />
            </div>

            <div
              style={{
                width: 250,
                ...cardStyle({
                  padding: "16px 20px",
                  borderColor: "rgba(255, 75, 75, 0.5)",
                  background: "rgba(255, 75, 75, 0.08)",
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
                    background: "#FF4B4B",
                    color: "#FFFFFF",
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 900,
                    fontSize: 12,
                    padding: "3px 10px",
                    borderRadius: 6,
                  }}
                >
                  SELL OUT
                </span>
                <span style={{ fontFamily: "Cairo, sans-serif", fontWeight: 800, fontSize: 14, color: "#FF6B6B" }}>
                  هبوط حاد في النقاط
                </span>
              </div>

              {/* FDR Danger Squares */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 11, color: "#94A3B8" }}>
                  صعوبة جدول المباريات (FDR):
                </span>
                <div style={{ display: "flex", gap: 6 }}>
                  {[5, 4, 5].map((diff, i) => (
                    <div
                      key={i}
                      style={{
                        width: 32,
                        height: 28,
                        borderRadius: 6,
                        background: "#FF4B4B",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 900,
                        color: "#FFFFFF",
                        fontSize: 14,
                        boxShadow: "0 0 10px rgba(255,75,75,0.5)",
                      }}
                    >
                      {diff}
                    </div>
                  ))}
                </div>
              </div>

              <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: "#CBD5E1", lineHeight: 1.3 }}>
                نزول في السعر (-0.2M) مع مخاطرة عالية قبل الديدلاين.
              </span>
            </div>
          </div>

          {/* ── CENTER: 360° Rotating Swap Hub & Net Gain Circle ── */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              opacity: swapOp,
              transform: `scale(${swapScale})`,
              zIndex: 35,
            }}
          >
            {/* Spinning Swap Ring */}
            <div
              style={{
                width: 90,
                height: 90,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #16181D 0%, #0B0F0D 100%)",
                border: "2.5px solid #00FF87",
                boxShadow: "0 0 35px rgba(0,255,135,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `rotate(${swapRot}deg)`,
              }}
            >
              <TransferSwapIcon size={42} color="#00FF87" />
            </div>

            {/* Circular Metric Gain */}
            <div style={{ marginTop: 14 }}>
              <CircularMetricGauge
                value={14}
                progress={gainProgress}
                color="#00FF87"
                unit="+"
                label="NET PTS GAIN"
                size={95}
                strokeWidth={7}
              />
            </div>
          </div>

          {/* ── INCOMING PLAYER (BUY: Green Neon) ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              opacity: buyOp,
              transform: `translateX(${buyX}px)`,
            }}
          >
            <div
              style={{
                width: 250,
                ...cardStyle({
                  padding: "16px 20px",
                  borderColor: "rgba(0, 255, 135, 0.5)",
                  background: "rgba(0, 255, 135, 0.08)",
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
                  BUY NOW
                </span>
                <span style={{ fontFamily: "Cairo, sans-serif", fontWeight: 800, fontSize: 14, color: "#00FF87" }}>
                  فورمة هجومية كاسحة
                </span>
              </div>

              {/* FDR Easy Squares */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 11, color: "#94A3B8" }}>
                  جدول مباريات سالك وخفيف:
                </span>
                <div style={{ display: "flex", gap: 6 }}>
                  {[2, 2, 3].map((diff, i) => (
                    <div
                      key={i}
                      style={{
                        width: 32,
                        height: 28,
                        borderRadius: 6,
                        background: "#00FF87",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 900,
                        color: "#05070A",
                        fontSize: 14,
                        boxShadow: "0 0 10px rgba(0,255,135,0.6)",
                      }}
                    >
                      {diff}
                    </div>
                  ))}
                </div>
              </div>

              <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: "#CBD5E1", lineHeight: 1.3 }}>
                ارتفاع متوقع في السعر (+0.3M) وفرص تسجيل عالية.
              </span>
            </div>

            <div style={{ filter: "drop-shadow(0 20px 40px rgba(0,255,135,0.4))" }}>
              <FutCard
                name="Isak"
                team="NEW"
                position="FWD"
                photo="silhouette"
                tier="gold"
                rating={88}
                bgt={87}
                ftt={92}
                roi={94}
              />
            </div>
          </div>
        </div>

        {/* ── Bottom Floating Wildcard Timing Badge ── */}
        <div
          style={{
            position: "absolute",
            bottom: 50,
            opacity: wcOp,
            transform: `translateY(${wcY}px)`,
            zIndex: 30,
            ...cardStyle({
              padding: "10px 24px",
              borderColor: "rgba(255, 215, 0, 0.5)",
              background: "linear-gradient(90deg, rgba(255,215,0,0.15) 0%, rgba(20,23,29,0.95) 100%)",
            }),
            display: "flex",
            alignItems: "center",
            gap: 16,
            boxShadow: "0 10px 30px rgba(0,0,0,0.7), 0 0 25px rgba(255,215,0,0.25)",
            direction: "rtl",
          }}
        >
          <div
            style={{
              padding: "4px 12px",
              borderRadius: 6,
              background: "#FFD700",
              color: "#05070A",
              fontFamily: "Outfit, sans-serif",
              fontWeight: 900,
              fontSize: 12,
            }}
          >
            WILDCARD ENGINE
          </div>
          <span style={{ fontFamily: "Cairo, sans-serif", fontWeight: 800, fontSize: 14, color: "#FFFFFF" }}>
            التوقيت الأمثل لتفعيل الوايلد كارد: <span style={{ color: "#FFD700" }}>الجولة 30 (DGW READY)</span>
          </span>
        </div>

        {/* Live Commercial Ticker */}
        <CommercialTicker
          items={[
            "⚡ OPTIMAL TRANSFER RADAR LOADED",
            "🔴 SELL TRIGGER: WATKINS (-2.4 xP DROP)",
            "🟢 BUY TARGET: ISAK (+14.2 PROJECTED NET)",
            "🛡️ NO HITS REQUIRED: PRESERVE YOUR -4 PENALTY",
          ]}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
