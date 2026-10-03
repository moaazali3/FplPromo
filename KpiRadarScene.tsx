import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { C, cardStyle, easeOut, BgGrid } from "./tokens";
import { FutCard } from "./FutCard";
import { RadarKpiChart, PlayerKpis } from "./RadarKpiChart";
import { TargetRadarIcon, LightningIcon, TrophyIcon, ShieldCheckIcon } from "./Icons";

const fi = (f: number, a: number, b: number, ea = 0, eb = 1) =>
  interpolate(f, [a, b], [ea, eb], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

interface ScoutedPlayer {
  id: string;
  name: string;
  team: string;
  pos: "FWD" | "MID" | "DEF";
  photo: "haaland" | "palmer" | "saka" | "silhouette" | string;
  tier: "gold" | "silver" | "epic";
  rating: number;
  kpis: PlayerKpis;
  radarColor: string;
  badge: string;
}

const PLAYERS: ScoutedPlayer[] = [
  {
    id: "haaland",
    name: "Haaland",
    team: "MCI",
    pos: "FWD",
    photo: "haaland",
    tier: "epic",
    rating: 95,
    kpis: {
      bpsMagnet: 98,
      bigGameThreat: 95,
      nailedOn: 98,
      flatTrack: 94,
      valueRoi: 89,
    },
    radarColor: C.primaryPurple,
    badge: "1# النخبة — مغناطيس نقاط البونص (BPS)",
  },
  {
    id: "palmer",
    name: "Palmer",
    team: "CHE",
    pos: "MID",
    photo: "palmer",
    tier: "gold",
    rating: 91,
    kpis: {
      bpsMagnet: 92,
      bigGameThreat: 88,
      nailedOn: 95,
      flatTrack: 84,
      valueRoi: 96,
    },
    radarColor: C.futGold,
    badge: "2# الذهبي — أعلى عائد استثماري (Value ROI)",
  },
  {
    id: "saka",
    name: "Saka",
    team: "ARS",
    pos: "MID",
    photo: "saka",
    tier: "silver",
    rating: 88,
    kpis: {
      bpsMagnet: 88,
      bigGameThreat: 85,
      nailedOn: 96,
      flatTrack: 88,
      valueRoi: 87,
    },
    radarColor: C.cyanAccent,
    badge: "3# الفضي — الأكثر استقراراً وثباتاً",
  },
];

export const KpiRadarScene: React.FC = () => {
  const f = useCurrentFrame();

  const hdrOp   = fi(f, 4, 24);
  const titleOp = fi(f, 15, 35);
  const titleY  = fi(f, 15, 35, 20, 0);

  const summaryOp = fi(f, 25, 45);

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
          top: "-15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: C.primaryPurple,
          opacity: 0.08,
          filter: "blur(150px)",
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
          padding: "0 60px",
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
            <TargetRadarIcon size={18} color={C.neonGreen} />
            <span
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 800,
                fontSize: 13,
                color: C.neonGreen,
                letterSpacing: 2,
              }}
            >
              PLAYER SCOUTING & KPI RADAR · مقياس أداء اللاعبين
            </span>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <span
              style={{
                background: "rgba(124,92,255,0.15)",
                border: `1px solid ${C.borderViolet}`,
                borderRadius: 6,
                padding: "3px 12px",
                fontFamily: "Outfit, sans-serif",
                fontSize: 11,
                fontWeight: 800,
                color: C.primaryPurple,
              }}
            >
              5-AXIS SPIDER RADAR
            </span>
            <span
              style={{
                background: "rgba(0,255,135,0.12)",
                border: `1px solid ${C.borderGreen}`,
                borderRadius: 6,
                padding: "3px 12px",
                fontFamily: "Cairo, sans-serif",
                fontSize: 11,
                fontWeight: 800,
                color: C.neonGreen,
                direction: "rtl",
              }}
            >
              تحميل لحظي لبيانات كل لاعب
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
              fontSize: 44,
              color: "#FFFFFF",
              direction: "rtl",
            }}
          >
            رادار الـ <span style={{ color: C.neonGreen }}>KPI</span> يكشف لك قوة وجاهزية كل لاعب قبل الشراء
          </div>
        </div>

        {/* 3 Players Side-by-Side: FUT Card + Animated Expanding Radar Chart */}
        <div style={{ display: "flex", gap: 24, width: "100%", justifyContent: "center" }}>
          {PLAYERS.map((p, idx) => {
            const cardDelay = 25 + idx * 15;
            const radarDelay = 35 + idx * 15;

            const cardOp = fi(f, cardDelay, cardDelay + 22);
            const cardY  = fi(f, cardDelay, cardDelay + 22, 40, 0);

            return (
              <div
                key={p.id}
                style={{
                  opacity: cardOp,
                  transform: `translateY(${cardY}px)`,
                  flex: 1,
                  ...cardStyle({
                    padding: "16px 18px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                    borderColor: `${p.radarColor}55`,
                  }),
                }}
              >
                {/* Player Tag */}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    paddingBottom: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      fontWeight: 900,
                      fontSize: 16,
                      color: "#FFFFFF",
                    }}
                  >
                    #{idx + 1} {p.name} ({p.team})
                  </span>
                  <span
                    style={{
                      fontFamily: "Cairo, sans-serif",
                      fontSize: 10.5,
                      fontWeight: 800,
                      color: p.radarColor,
                      background: `${p.radarColor}18`,
                      border: `1px solid ${p.radarColor}44`,
                      borderRadius: 6,
                      padding: "2px 8px",
                      direction: "rtl",
                    }}
                  >
                    {p.badge}
                  </span>
                </div>

                {/* Main Content: Mini FUT Card + Expanding Radar Chart */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, width: "100%", justifyContent: "center" }}>
                  <FutCard
                    photo={p.photo}
                    name={p.name}
                    rating={p.rating}
                    position={p.pos}
                    team={p.team}
                    tier={p.tier}
                    bgt={p.kpis.bigGameThreat}
                    ftt={p.kpis.flatTrack}
                    roi={p.kpis.valueRoi}
                    width={158}
                    height={230}
                  />

                  {/* The Dynamic Animated 5-Axis Spider Radar */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontSize: 10,
                        fontWeight: 800,
                        color: C.textGrey,
                        letterSpacing: 1,
                        marginBottom: 4,
                      }}
                    >
                      AI RADAR PROFILE
                    </div>
                    <RadarKpiChart
                      kpis={p.kpis}
                      width={250}
                      height={190}
                      delay={radarDelay}
                      color={p.radarColor}
                      fillColor={`${p.radarColor}28`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom AI Ranking Banner */}
        <div
          style={{
            opacity: summaryOp,
            width: "100%",
            ...cardStyle({
              padding: "12px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }),
            borderColor: C.borderGreen,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <LightningIcon size={18} color={C.neonGreen} />
            <span
              style={{
                fontFamily: "Cairo, sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: "#FFFFFF",
                direction: "rtl",
              }}
            >
              النموذج يحلل مؤشرات الخطورة والعائد على الاستثمار لكل لاعب لترتيب أولويات تبديلاتك بدقة
            </span>
          </div>

          <div style={{ display: "flex", gap: 14 }}>
            <span style={{ fontFamily: "Outfit, sans-serif", fontSize: 12, fontWeight: 800, color: C.neonGreen }}>
              Palmer: 96% ROI
            </span>
            <span style={{ fontFamily: "Outfit, sans-serif", fontSize: 12, fontWeight: 800, color: C.cyanAccent }}>
              Saka: 96% Nailed
            </span>
            <span style={{ fontFamily: "Outfit, sans-serif", fontSize: 12, fontWeight: 800, color: C.primaryPurple }}>
              Haaland: 98% BPS
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
