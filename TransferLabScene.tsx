import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Img, staticFile } from "remotion";
import { C, cardStyle, easeOut, BgGrid } from "./tokens";
import { TransferSwapIcon, LightningIcon, WarningIcon, ShieldCheckIcon } from "./Icons";

const fi = (f: number, a: number, b: number, ea = 0, eb = 1) =>
  interpolate(f, [a, b], [ea, eb], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

export const TransferLabScene: React.FC = () => {
  const f = useCurrentFrame();

  const hdrOp   = fi(f, 4, 24);
  const titleOp = fi(f, 15, 35);
  const titleY  = fi(f, 15, 35, 20, 0);

  // Transfer cards entrance
  const outOp   = fi(f, 18, 38);
  const outX    = fi(f, 18, 38, -50, 0);

  const swapOp  = fi(f, 26, 44);
  const swapScale = fi(f, 26, 44, 0.7, 1);

  const inOp    = fi(f, 34, 52);
  const inX     = fi(f, 34, 52, 50, 0);

  // Wildcard masterplan section
  const wcOp    = fi(f, 48, 68);
  const wcY     = fi(f, 48, 68, 25, 0);

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

      {/* Ambient stadium glows */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          right: "20%",
          width: 750,
          height: 750,
          borderRadius: "50%",
          background: C.neonGreen,
          opacity: 0.07,
          filter: "blur(160px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "15%",
          width: 750,
          height: 750,
          borderRadius: "50%",
          background: C.primaryPurple,
          opacity: 0.08,
          filter: "blur(160px)",
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
          maxWidth: 1640,
          padding: "0 50px",
          zIndex: 10,
        }}
      >
        {/* Header Ribbon */}
        <div
          style={{
            opacity: hdrOp,
            width: "100%",
            ...cardStyle({
              padding: "10px 26px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }),
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <TransferSwapIcon size={18} color={C.neonGreen} />
            <span
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 800,
                fontSize: 13,
                color: C.neonGreen,
                letterSpacing: 2,
              }}
            >
              TRANSFER LAB & WILDCARD TIMING ENGINE · مختبر الانتقالات
            </span>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <span
              style={{
                background: "rgba(0,255,135,0.12)",
                border: `1px solid ${C.borderGreen}`,
                borderRadius: 6,
                padding: "3px 12px",
                fontFamily: "Outfit, sans-serif",
                fontSize: 11,
                fontWeight: 800,
                color: C.neonGreen,
              }}
            >
              OPTIMAL SWAP RADAR
            </span>
            <span
              style={{
                background: "rgba(124,92,255,0.15)",
                border: `1px solid ${C.borderViolet}`,
                borderRadius: 6,
                padding: "3px 12px",
                fontFamily: "Cairo, sans-serif",
                fontSize: 11,
                fontWeight: 800,
                color: C.primaryPurple,
                direction: "rtl",
              }}
            >
              تحليل خوارزميات xP والجدول القادم
            </span>
          </div>
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
              fontSize: 40,
              color: "#FFFFFF",
              direction: "rtl",
            }}
          >
            تخطيط ذكي لتبديلاتك وتوقيت استراتيجي لتفعيل <span style={{ color: C.neonGreen }}>الـ Wildcard</span>
          </div>
        </div>

        {/* ── Main Arena: Transfer Swap Out (Bruno Fernandes) vs In (Cole Palmer) ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, width: "100%", justifyContent: "center" }}>
          {/* Card OUT: Bruno Fernandes */}
          <div
            style={{
              flex: 1,
              opacity: outOp,
              transform: `translateX(${outX}px)`,
              ...cardStyle({
                padding: "18px 22px",
                borderColor: "rgba(255, 75, 75, 0.45)",
                background: "linear-gradient(180deg, rgba(255,75,75,0.08) 0%, rgba(20,23,29,0.96) 100%)",
              }),
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <span
                style={{
                  background: "rgba(255,75,75,0.18)",
                  border: "1px solid rgba(255,75,75,0.45)",
                  borderRadius: 6,
                  padding: "3px 10px",
                  fontFamily: "Cairo, sans-serif",
                  fontSize: 11.5,
                  fontWeight: 800,
                  color: C.errorRed,
                }}
              >
                بيع مقترح (Transfer OUT)
              </span>
              <span style={{ fontFamily: "Outfit, sans-serif", fontSize: 12, color: C.textGrey, fontWeight: 800 }}>
                MUN · MID · £8.2M
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 14,
                  background: "linear-gradient(135deg, #2b1317, #0b0f14)",
                  border: "1.5px solid rgba(255,75,75,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <Img
                  src={staticFile("bruno.png")}
                  style={{ width: 54, height: 54, objectFit: "contain", objectPosition: "bottom center" }}
                />
              </div>
              <div>
                <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 21, color: "#FFFFFF" }}>
                  Bruno Fernandes
                </div>
                <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: C.errorRed, direction: "rtl", marginTop: 2 }}>
                  جدول مواجهات قمة ناري (FDR 4 & 5) · ضعف إنتاجية xGI
                </div>
              </div>
            </div>

            {/* Upcoming Tough Fixtures Ticker */}
            <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
              {[
                { fix: "vs ARS (A)", fdr: 5 },
                { fix: "vs CHE (H)", fdr: 4 },
                { fix: "vs MCI (A)", fdr: 5 },
              ].map((m, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    background: "rgba(255,75,75,0.15)",
                    border: "1px solid rgba(255,75,75,0.3)",
                    borderRadius: 6,
                    padding: "4px 6px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 10, color: "#FFFFFF", fontWeight: 800 }}>{m.fix}</div>
                  <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 9, color: C.errorRed, fontWeight: 900 }}>FDR {m.fdr}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              <div style={{ background: "rgba(0,0,0,0.35)", borderRadius: 8, padding: "6px 8px", textAlign: "center" }}>
                <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 9.5, color: C.textGrey }}>الفورمة</div>
                <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 15, color: C.errorRed }}>3.4</div>
              </div>
              <div style={{ background: "rgba(0,0,0,0.35)", borderRadius: 8, padding: "6px 8px", textAlign: "center" }}>
                <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 9.5, color: C.textGrey }}>نقاط متوقعة 3 GWs</div>
                <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 15, color: C.textGrey }}>10.2 pts</div>
              </div>
              <div style={{ background: "rgba(0,0,0,0.35)", borderRadius: 8, padding: "6px 8px", textAlign: "center" }}>
                <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 9.5, color: C.textGrey }}>معدل التهديف</div>
                <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 15, color: C.errorRed }}>0.18 xG/90</div>
              </div>
            </div>
          </div>

          {/* Swap Indicator Center */}
          <div
            style={{
              opacity: swapOp,
              transform: `scale(${swapScale})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              padding: "0 10px",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1C2330, #0B0F0D)",
                border: `2px solid ${C.neonGreen}`,
                boxShadow: "0 0 30px rgba(0,255,135,0.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TransferSwapIcon size={30} color={C.neonGreen} />
            </div>

            <div
              style={{
                background: "rgba(0,255,135,0.18)",
                border: `1.5px solid ${C.borderGreen}`,
                borderRadius: 8,
                padding: "6px 14px",
                textAlign: "center",
                whiteSpace: "nowrap",
                boxShadow: "0 0 15px rgba(0,255,135,0.2)",
              }}
            >
              <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 14, color: C.neonGreen }}>
                +18.4 pts SWING
              </span>
              <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 10.5, color: C.cyanAccent, fontWeight: 800 }}>
                High Rank ROI
              </div>
            </div>
          </div>

          {/* Card IN: Cole Palmer */}
          <div
            style={{
              flex: 1,
              opacity: inOp,
              transform: `translateX(${inX}px)`,
              ...cardStyle({
                padding: "18px 22px",
                borderColor: C.borderGreen,
                background: "linear-gradient(180deg, rgba(0,255,135,0.08) 0%, rgba(20,23,29,0.96) 100%)",
              }),
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <span
                style={{
                  background: "rgba(0,255,135,0.18)",
                  border: `1px solid ${C.borderGreen}`,
                  borderRadius: 6,
                  padding: "3px 10px",
                  fontFamily: "Cairo, sans-serif",
                  fontSize: 11.5,
                  fontWeight: 800,
                  color: C.neonGreen,
                }}
              >
                شراء موصى به (Transfer IN)
              </span>
              <span style={{ fontFamily: "Outfit, sans-serif", fontSize: 12, color: C.textGrey, fontWeight: 800 }}>
                CHE · MID · £10.8M
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 14,
                  background: "linear-gradient(135deg, #102a1c, #0b0f14)",
                  border: `1.5px solid ${C.borderGreen}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <Img
                  src={staticFile("palmer.png")}
                  style={{ width: 54, height: 54, objectFit: "contain", objectPosition: "bottom center" }}
                />
              </div>
              <div>
                <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 21, color: "#FFFFFF" }}>
                  Cole Palmer
                </div>
                <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: C.neonGreen, direction: "rtl", marginTop: 2 }}>
                  مواجهات سهلة متتالية (FDR 2) · مسدد ركلات الجزاء الأول
                </div>
              </div>
            </div>

            {/* Upcoming Easy Fixtures Ticker */}
            <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
              {[
                { fix: "vs CRY (H)", fdr: 2 },
                { fix: "vs BOU (A)", fdr: 2 },
                { fix: "vs SOU (H)", fdr: 2 },
              ].map((m, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    background: "rgba(0,255,135,0.12)",
                    border: `1px solid ${C.borderGreen}`,
                    borderRadius: 6,
                    padding: "4px 6px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 10, color: "#FFFFFF", fontWeight: 800 }}>{m.fix}</div>
                  <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 9, color: C.neonGreen, fontWeight: 900 }}>FDR {m.fdr}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              <div style={{ background: "rgba(0,0,0,0.35)", borderRadius: 8, padding: "6px 8px", textAlign: "center" }}>
                <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 9.5, color: C.textGrey }}>الفورمة</div>
                <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 15, color: C.neonGreen }}>9.4</div>
              </div>
              <div style={{ background: "rgba(0,0,0,0.35)", borderRadius: 8, padding: "6px 8px", textAlign: "center" }}>
                <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 9.5, color: C.textGrey }}>نقاط متوقعة 3 GWs</div>
                <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 15, color: C.futGoldLight }}>28.6 pts</div>
              </div>
              <div style={{ background: "rgba(0,0,0,0.35)", borderRadius: 8, padding: "6px 8px", textAlign: "center" }}>
                <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 9.5, color: C.textGrey }}>معدل التهديف</div>
                <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 15, color: C.neonGreen }}>0.82 xG/90</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Comprehensive Wildcard Strategy & Chips Roadmap Hub (Full Width) ── */}
        <div
          style={{
            opacity: wcOp,
            transform: `translateY(${wcY}px)`,
            width: "100%",
            ...cardStyle({
              padding: "18px 24px",
              borderColor: C.borderViolet,
              background: "linear-gradient(180deg, rgba(124,92,255,0.09) 0%, rgba(15,18,24,0.98) 100%)",
            }),
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {/* Roadmap Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "rgba(124,92,255,0.18)",
                  border: `1px solid ${C.borderViolet}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LightningIcon size={18} color={C.primaryPurple} />
              </div>
              <div>
                <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 15, color: C.primaryPurple }}>
                  WILDCARD TIMING ENGINE & FIXTURE SWING MATRIX
                </span>
                <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "#FFFFFF", marginRight: 8, direction: "rtl", fontWeight: 800 }}>
                  · خارطة توقيت تفعيل كروت الفانتزي (Chips Strategy)
                </span>
              </div>
            </div>

            <div
              style={{
                background: "rgba(0,255,135,0.12)",
                border: `1px solid ${C.borderGreen}`,
                borderRadius: 6,
                padding: "3px 12px",
                fontFamily: "Outfit, sans-serif",
                fontSize: 11,
                fontWeight: 900,
                color: C.neonGreen,
              }}
            >
              OPTIMAL WINDOW: GAMEWEEK 12
            </div>
          </div>

          {/* 3 Gameweek Roadmap Phases */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.25fr 1fr", gap: 12 }}>
            {/* Phase 1: GW 9-11 */}
            <div
              style={{
                background: "rgba(0,0,0,0.35)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10,
                padding: "10px 14px",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 13, color: C.cyanAccent }}>
                  GW 9 — GW 11
                </span>
                <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 10, color: C.textGrey, fontWeight: 700 }}>
                  مرحلة تجميع التبديلات
                </span>
              </div>
              <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: C.greyLight, direction: "rtl", lineHeight: 1.3 }}>
                وفّر تبديلاتك المجانية (Bank 2 Free Transfers) واستمر مع فورمة هالاند وبالمر بدون خصم نقاط سالب.
              </div>
            </div>

            {/* Phase 2: GW 12 (Golden Wildcard Window) */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(124,92,255,0.2) 0%, rgba(0,255,135,0.08) 100%)",
                border: `1.5px solid ${C.neonGreen}`,
                borderRadius: 10,
                padding: "10px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                boxShadow: "0 0 20px rgba(124,92,255,0.2)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 14, color: C.neonGreen }}>
                  ⚡ GW 12 · تفعيل الـ WILDCARD
                </span>
                <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 10.5, color: C.neonGreen, fontWeight: 900 }}>
                  أعلى عائد نقاط xP
                </span>
              </div>
              <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 12.5, color: "#FFFFFF", direction: "rtl", lineHeight: 1.35, fontWeight: 700 }}>
                انقلاب جدول الدوري: مباريات السيتي وتشيلسي تصبح خضراء سهلة بالكامل، واقتناص الفارق قبل ارتفاع الأسعار (+38.6 نقطة متوقعة).
              </div>
            </div>

            {/* Phase 3: GW 13+ */}
            <div
              style={{
                background: "rgba(0,0,0,0.35)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10,
                padding: "10px 14px",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 13, color: C.futGoldLight }}>
                  GW 13+ · ما بعد الوايلد
                </span>
                <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 10, color: C.textGrey, fontWeight: 700 }}>
                  تجهيز كروت الدبل
                </span>
              </div>
              <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: C.greyLight, direction: "rtl", lineHeight: 1.3 }}>
                تشكيلة متوازنة بمقاعد بدلاء قوية استعداداً لجولات الـ Double Gameweek وكروت الـ Bench Boost.
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
