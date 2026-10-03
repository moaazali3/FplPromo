import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { C, cardStyle, easeOut, BgGrid, sp } from "./tokens";
import { FutCard } from "./FutCard";
import { TargetRadarIcon, WarningIcon, ShieldCheckIcon, LightningIcon } from "./Icons";

const fi = (f: number, a: number, b: number, ea = 0, eb = 1) =>
  interpolate(f, [a, b], [ea, eb], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

const slideX = (f: number, start: number) => fi(f, start, start + 28, 60, 0);
const fadeIn = (f: number, start: number, dur = 22) => fi(f, start, start + dur);

export const FeatureScene: React.FC = () => {
  const f = useCurrentFrame();

  const hdrOp = fadeIn(f, 4, 16);

  const titOp = fadeIn(f, 12, 18);
  const titY  = fi(f, 12, 30, 20, 0);

  // Stats row
  const s1Op = fadeIn(f, 20, 14);
  const s2Op = fadeIn(f, 25, 14);
  const s3Op = fadeIn(f, 30, 14);
  const s4Op = fadeIn(f, 35, 14);

  // Cards & Gauge (Spring bounce)
  const cardSpring = sp(f, 30, 30, { damping: 13, mass: 0.85, stiffness: 160 });
  const cardScale = 0.82 + 0.18 * Math.min(cardSpring, 1.05);
  const c1Op  = fadeIn(f, 34, 18);
  const c1X   = fi(f, 34, 52, -40, 0);
  const c2Op  = fadeIn(f, 46, 18);
  const c2X   = fi(f, 46, 64, 40, 0);

  // Circular Gauge (animates from 0% → 76%)
  const gaugeOp  = fadeIn(f, 38, 18);
  const gaugeVal = fi(f, 42, 75, 0, 76);
  const circ     = 2 * Math.PI * 62;
  const dashOff  = circ - (gaugeVal / 100) * circ;

  const compOp = fadeIn(f, 60, 18);

  const recOp = fadeIn(f, 70, 20);
  const recX  = fi(f, 70, 90, 30, 0);

  const copyOp = fadeIn(f, 80, 20);
  const camZoom = 1.0 + (f / 150) * 0.03;

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

      {/* Ambient glows */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          right: "-10%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: C.primaryPurple,
          opacity: 0.08,
          filter: "blur(140px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "-10%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: C.neonGreen,
          opacity: 0.07,
          filter: "blur(140px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          width: "100%",
          maxWidth: 1540,
          padding: "0 64px",
          zIndex: 10,
        }}
      >
        {/* App-style Header Bar */}
        <div
          style={{
            opacity: hdrOp,
            width: "100%",
            ...cardStyle({
              padding: "10px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }),
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <TargetRadarIcon size={18} color={C.primaryPurple} />
            <span
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 900,
                fontSize: 14,
                color: C.primaryPurple,
                letterSpacing: 2,
              }}
            >
              CAPTAIN RISK RADAR · رادار قرار الكابتن
            </span>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <span
              style={{
                background: "rgba(255, 183, 3, 0.15)",
                border: "1px solid rgba(255, 183, 3, 0.4)",
                borderRadius: 6,
                padding: "3px 14px",
                fontFamily: "Outfit, sans-serif",
                fontSize: 12,
                fontWeight: 800,
                color: C.warningYellow,
              }}
            >
              GAMEWEEK 8
            </span>
            <div
              style={{
                background: "rgba(255, 75, 75, 0.15)",
                border: "1px solid rgba(255, 75, 75, 0.4)",
                borderRadius: 6,
                padding: "3px 14px",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <WarningIcon size={14} color={C.errorRed} />
              <span
                style={{
                  fontFamily: "Cairo, sans-serif",
                  fontSize: 12,
                  fontWeight: 800,
                  color: C.errorRed,
                  direction: "rtl",
                }}
              >
                تقلب عالٍ (High Volatility)
              </span>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div
          style={{
            opacity: titOp,
            transform: `translateY(${titY}px)`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Cairo, sans-serif",
              fontWeight: 900,
              fontSize: 46,
              color: "#FFFFFF",
              direction: "rtl",
              lineHeight: 1.15,
            }}
          >
            اعرف نسبة مخاطرة <span style={{ color: C.primaryPurple }}>كابتنك</span> قبل ما تقفل التشكيلة!
          </div>
        </div>

        {/* Mini Stats Row (4 Analytical Cards) */}
        <div style={{ display: "flex", gap: 14, width: "100%" }}>
          {[
            { op: s1Op, label: "الملكية الفعالة EO", value: "74.8%", color: C.neonGreen },
            { op: s2Op, label: "متوسط النقاط — آخر 5", value: "8.6 pts", color: "#FFFFFF" },
            { op: s3Op, label: "صعوبة المواجهة FDR", value: "2 / 5 (سهل)", color: C.warningYellow },
            { op: s4Op, label: "معدل الأهداف المتوقعة xG", value: "1.24 / 90m", color: C.cyanAccent },
          ].map(({ op, label, value, color }, i) => (
            <div
              key={i}
              style={{
                opacity: op,
                flex: 1,
                ...cardStyle({ padding: "12px 18px" }),
              }}
            >
              <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: C.textGrey, direction: "rtl" }}>
                {label}
              </div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 22, color, marginTop: 4 }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Main Arena: Palmer (Gold) vs Saka (Silver) + Central Radar Gauge */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, width: "100%" }}>
          {/* Left: Palmer FUT Card */}
          <div style={{ opacity: c1Op, transform: `translateX(${c1X}px) scale(${cardScale})` }}>
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
              width={210}
              height={300}
            />
          </div>

          {/* Center: Analytical Risk Engine Card */}
          <div
            style={{
              opacity: gaugeOp,
              flex: 1,
              ...cardStyle({
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }),
              borderColor: C.borderViolet,
            }}
          >
            {/* Top Indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <TargetRadarIcon size={16} color={C.primaryPurple} />
              <span
                style={{
                  fontFamily: "Cairo, sans-serif",
                  fontSize: 12,
                  fontWeight: 800,
                  color: C.greyLight,
                  direction: "rtl",
                }}
              >
                مؤشر احتمالية المخاطرة (Risk Volatility Index)
              </span>
            </div>

            {/* Circular Gauge */}
            <div style={{ position: "relative", width: 140, height: 140 }}>
              <svg width={140} height={140} viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="70" cy="70" r="62" fill="none" stroke="#161B26" strokeWidth="12" />
                <circle
                  cx="70"
                  cy="70"
                  r="62"
                  fill="none"
                  stroke="url(#riskGrad)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={circ}
                  strokeDashoffset={dashOff}
                />
                <defs>
                  <linearGradient id="riskGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={C.neonGreen} />
                    <stop offset="60%" stopColor={C.warningYellow} />
                    <stop offset="100%" stopColor={C.errorRed} />
                  </linearGradient>
                </defs>
              </svg>

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 900,
                    fontSize: 38,
                    color: "#FFFFFF",
                    lineHeight: 1,
                  }}
                >
                  {Math.round(gaugeVal)}%
                </span>
                <span
                  style={{
                    fontFamily: "Cairo, sans-serif",
                    fontSize: 11,
                    fontWeight: 800,
                    color: C.warningYellow,
                    marginTop: 3,
                  }}
                >
                  مجازفة فارق
                </span>
              </div>
            </div>

            {/* AI Diagnosis Reason matching Flutter */}
            <div
              style={{
                opacity: compOp,
                width: "100%",
                background: "rgba(0,0,0,0.35)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: "8px 14px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "Cairo, sans-serif",
                  fontSize: 12,
                  color: C.greyLight,
                  direction: "rtl",
                  lineHeight: 1.4,
                }}
              >
                <span style={{ color: C.neonGreen, fontWeight: 700 }}>تحليل النموذج:</span> نسبة امتلاك بالمر (52%) تجعل اختياره كابتن فرصة ذهبية للقفز في الترتيب العام مع مخاطرة محسوبة ضد إجماع هالاند.
              </div>
            </div>

            {/* Comparison Mini Tags */}
            <div style={{ display: "flex", gap: 10 }}>
              <span
                style={{
                  background: "rgba(0,255,135,0.12)",
                  border: `1px solid ${C.borderGreen}`,
                  borderRadius: 999,
                  padding: "4px 14px",
                  fontFamily: "Outfit, sans-serif",
                  fontSize: 11,
                  fontWeight: 800,
                  color: C.neonGreen,
                }}
              >
                Palmer (CHE) · سقف نقاط أعلى
              </span>
              <span
                style={{
                  background: "rgba(124,92,255,0.12)",
                  border: `1px solid ${C.borderViolet}`,
                  borderRadius: 999,
                  padding: "4px 14px",
                  fontFamily: "Outfit, sans-serif",
                  fontSize: 11,
                  fontWeight: 800,
                  color: C.primaryPurple,
                }}
              >
                Saka (ARS) · استقرار وثبات
              </span>
            </div>
          </div>

          {/* Right: Saka FUT Card */}
          <div style={{ opacity: c2Op, transform: `translateX(${c2X}px) scale(${cardScale})` }}>
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
              width={210}
              height={300}
            />
          </div>
        </div>

        {/* AI Recommendation Banner */}
        <div
          style={{
            opacity: recOp,
            transform: `translateX(${recX}px)`,
            width: "100%",
            ...cardStyle({
              padding: "14px 26px",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }),
            borderColor: C.borderGreen,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: "rgba(0,255,135,0.15)",
              border: `1px solid ${C.borderGreen}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <LightningIcon size={22} color={C.neonGreen} />
          </div>
          <div>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: 16, color: C.neonGreen }}>
              AI Recommendation — C. Palmer (CHE)
            </div>
            <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: C.greyLight, direction: "rtl", marginTop: 2 }}>
              ملعبه ضد ساوثهامبتون · FDR 2 · مسدد ضربات الجزاء الأول · فرصة قفز الترتيب العام: ممتازة
            </div>
          </div>
          <div
            style={{
              marginLeft: "auto",
              background: "rgba(0,255,135,0.15)",
              border: `1px solid ${C.borderGreen}`,
              borderRadius: 10,
              padding: "6px 18px",
              display: "flex",
              alignItems: "center",
              gap: 6,
              flexShrink: 0,
            }}
          >
            <ShieldCheckIcon size={16} color={C.neonGreen} />
            <span style={{ fontFamily: "Cairo, sans-serif", fontWeight: 800, fontSize: 14, color: C.neonGreen }}>
              خيار الفارق الذهبي
            </span>
          </div>
        </div>

        {/* Bottom copy */}
        <div style={{ opacity: copyOp, textAlign: "center" }}>
          <span style={{ fontFamily: "Cairo, sans-serif", fontWeight: 700, fontSize: 17, color: C.textGrey, direction: "rtl" }}>
            الذكاء الاصطناعي يحلل كل الاحتمالات عشان تاخد القرار وأنت واثق
          </span>
        </div>
      </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
