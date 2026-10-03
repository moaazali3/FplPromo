import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { C, cardStyle, easeOut, BgGrid } from "./tokens";

const fi = (f: number, a: number, b: number, ea = 0, eb = 1) =>
  interpolate(f, [a, b], [ea, eb], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

export const CredibilityScene: React.FC = () => {
  const f = useCurrentFrame();

  const hdrOp   = fi(f, 4, 24);
  const titleOp = fi(f, 16, 38);
  const titleY  = fi(f, 16, 38, 22, 0);

  // Cards on the left
  const p1Op = fi(f, 32, 54);
  const p1X  = fi(f, 32, 54, -40, 0);

  const p2Op = fi(f, 48, 70);
  const p2X  = fi(f, 48, 70, -40, 0);

  const p3Op = fi(f, 64, 86);
  const p3X  = fi(f, 64, 86, -40, 0);

  // Stats on the right
  const sGridOp = fi(f, 50, 75);
  const sGridX  = fi(f, 50, 75, 40, 0);

  const bottomOp = fi(f, 95, 115);

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
          bottom: "-15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: C.neonGreen,
          opacity: 0.06,
          filter: "blur(150px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
          width: "100%",
          maxWidth: 1480,
          padding: "0 64px",
          zIndex: 10,
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            opacity: hdrOp,
            width: "100%",
            ...cardStyle({
              padding: "12px 28px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }),
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              background: C.neonGreen,
              boxShadow: `0 0 10px ${C.neonGreen}`,
            }}
          />
          <span
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              fontSize: 13,
              color: C.neonGreen,
              letterSpacing: 2.5,
            }}
          >
            ENTERPRISE ARCHITECTURE & RELIABILITY · بنية برمجية فائقة
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            opacity: titleOp,
            transform: `translateY(${titleY}px)`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Cairo, sans-serif",
              fontWeight: 900,
              fontSize: 48,
              color: "#FFFFFF",
              direction: "rtl",
            }}
          >
            مبني على أحدث <span style={{ color: C.neonGreen }}>التقنيات الاحترافية</span> لضمان تفوقك
          </div>
        </div>

        {/* 2-Column Showcase */}
        <div style={{ display: "flex", gap: 32, width: "100%" }}>
          {/* Left Column: 3 Architectural Pillars */}
          <div style={{ flex: 1.1, display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              {
                op: p1Op,
                x: p1X,
                icon: "⚡",
                title: "Clean Architecture & Flutter BLoC",
                desc: "أداء فائق واستجابة 60 إطار بالثانية بدون أي بطء أو استنزاف للبطارية.",
                color: C.primaryPurple,
                border: C.borderViolet,
              },
              {
                op: p2Op,
                x: p2X,
                icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
                title: "Premier League Official Real-Time Sync",
                desc: "تزامن فوري ومباشر مع خوادم البريميرليج لتحديث النقاط والأسعار والإصابات لحظة بلحظة.",
                color: C.neonGreen,
                border: C.borderGreen,
              },
              {
                op: p3Op,
                x: p3X,
                icon: "🧠",
                title: "Machine Learning Predictive Models",
                desc: "خوارزميات تعلم آلي مدربة لحساب الـ xG و xA ومغناطيسية نقاط البونص (BPS).",
                color: C.warningYellow,
                border: C.borderAmber,
              },
            ].map(({ op, x, icon, title, desc, color, border }, i) => (
              <div
                key={i}
                style={{
                  opacity: op,
                  transform: `translateX(${x}px)`,
                  ...cardStyle({
                    padding: "18px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: 18,
                  }),
                  borderColor: border,
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    background: `${color}18`,
                    border: `1.5px solid ${border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>
                <div style={{ flex: 1 }}>
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
                      fontSize: 13,
                      color: C.greyLight,
                      direction: "rtl",
                      marginTop: 3,
                    }}
                  >
                    {desc}
                  </div>
                </div>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 999,
                    background: `${color}18`,
                    border: `1.5px solid ${border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color,
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                  ✓
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: 4 Live Metric Tiles (2x2 Grid) */}
          <div
            style={{
              flex: 0.9,
              opacity: sGridOp,
              transform: `translateX(${sGridX}px)`,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            {[
              {
                val: "99.9%",
                title: "استقرار الخوادم",
                sub: "خوادم سحابية تعمل 24/7 دون انقطاع حتى وقت ضغط الديدلاين",
                color: C.neonGreen,
              },
              {
                val: "10,000+",
                title: "مدرب فانتزي",
                sub: "مجتمع متنامي من عشاق الفانتزي يعتمدون على تحليلات الكشاف",
                color: C.primaryPurple,
              },
              {
                val: "0.2s",
                title: "زمن المعالجة",
                sub: "حساب فوري لتشكيلات الأسبوع ومخاطر الكابتن في أجزاء من الثانية",
                color: C.cyanAccent,
              },
              {
                val: "AR & EN",
                title: "دعم لغوي كامل",
                sub: "واجهة مصممة خصيصاً للمدرب العربي مع خيار اللغة الإنجليزية",
                color: C.warningYellow,
              },
            ].map(({ val, title, sub, color }, i) => (
              <div
                key={i}
                style={{
                  ...cardStyle({
                    padding: "20px 22px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }),
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      fontWeight: 900,
                      fontSize: 34,
                      color,
                      lineHeight: 1,
                    }}
                  >
                    {val}
                  </div>
                  <div
                    style={{
                      fontFamily: "Cairo, sans-serif",
                      fontWeight: 800,
                      fontSize: 16,
                      color: "#FFFFFF",
                      marginTop: 8,
                      direction: "rtl",
                    }}
                  >
                    {title}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "Cairo, sans-serif",
                    fontSize: 12,
                    color: C.textGrey,
                    direction: "rtl",
                    marginTop: 8,
                    lineHeight: 1.3,
                  }}
                >
                  {sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Note */}
        <div
          style={{
            opacity: bottomOp,
            width: "100%",
            ...cardStyle({
              padding: "14px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }),
          }}
        >
          <span
            style={{
              fontFamily: "Cairo, sans-serif",
              fontWeight: 700,
              fontSize: 17,
              color: C.greyLight,
              direction: "rtl",
            }}
          >
            Flutter · Clean Architecture · BLoC — صُنع بشغف كرة القدم للمدربين العرب ⚽
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
