import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { C } from "./tokens";

// Exactly matches Flutter's FutPlayerCard (d:/projects/FPL_Scout_front/lib/shared/widgets/fut_player_card.dart)
const TIER = {
  gold: {
    border: ["#FFD700", "#FFF7C2", "#B8860B", "#FFD700"],
    bg: ["#2E220D", "#191309", "#0B0E14"],
    glow: "#FFD700",
    label: "GOLD",
    scoreColor: "#FFF2A1",
  },
  silver: {
    border: ["#E2E8F0", "#94A3B8", "#F8FAFC", "#E2E8F0"],
    bg: ["#1E293B", "#0F172A", "#0B0E14"],
    glow: "#C0C0C0",
    label: "SILVER",
    scoreColor: "#E2E8F0",
  },
  epic: {
    border: ["#FF007F", "#FFD700", "#00E5FF", "#FF007F"],
    bg: ["#26102D", "#130B1C", "#0B0E14"],
    glow: "#FF007F",
    label: "EPIC",
    scoreColor: "#FFD700",
  },
};

// Exact Flutter AppTheme position colors
const POS_COLOR: Record<string, string> = {
  GKP: "#EBFF00",
  DEF: "#00D4FF",
  MID: "#00FF87",
  FWD: "#FF0055",
};

interface FutCardProps {
  photo: "palmer" | "saka" | "haaland" | "bruno" | "silhouette" | string;
  name: string;
  rating: number;
  position: "FWD" | "MID" | "DEF" | "GKP";
  team: string;
  tier: "gold" | "silver" | "epic";
  bgt: number;
  ftt: number;
  roi: number;
  width?: number;
  height?: number;
  opacity?: number;
  scale?: number;
  badgeText?: string;
}

export const FutCard: React.FC<FutCardProps> = ({
  photo,
  name,
  rating,
  position,
  team,
  tier,
  bgt,
  ftt,
  roi,
  width = 220,
  height = 320,
  opacity = 1,
  scale = 1,
  badgeText = "AI",
}) => {
  const f = useCurrentFrame();
  const shimmer = (f * 2.5) % 360;
  const t = TIER[tier];
  const posColor = POS_COLOR[position] || "#00FF87";

  // Animated sweeping border gradient (simulating Flutter SweepGradient)
  const borderGrad = `conic-gradient(from ${shimmer}deg, ${t.border.join(", ")})`;

  // Holographic Foil Shimmer diagonal light sweep across the card
  const holoPos = ((f * 3.5) % 320) - 110;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        width,
        height,
        padding: 3,
        borderRadius: 22,
        background: borderGrad,
        boxShadow: `0 8px 30px ${t.glow}55, 0 0 15px ${t.glow}33`,
        flexShrink: 0,
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 19,
          background: `linear-gradient(180deg, ${t.bg[0]} 0%, ${t.bg[1]} 60%, ${t.bg[2]} 100%)`,
          padding: "12px 14px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Subtle inner top-lighting sheen */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Dynamic Holographic Foil Shimmer Streak */}
        <div
          style={{
            position: "absolute",
            top: -120,
            bottom: -120,
            left: `${holoPos}%`,
            width: "55%",
            transform: "rotate(25deg)",
            background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.22) 50%, rgba(${
              tier === "gold" ? "255,215,0" : tier === "epic" ? "255,0,127" : "0,255,135"
            },0.28) 58%, transparent 100%)`,
            pointerEvents: "none",
            zIndex: 15,
            mixBlendMode: "screen",
          }}
        />

        {/* Top Header Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            zIndex: 10,
          }}
        >
          {/* Top Left Compact Corner Badge Stack */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 65 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
              <span
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 900,
                  fontSize: 18,
                  color: t.scoreColor,
                  lineHeight: 1,
                }}
              >
                {rating}
              </span>
              <span
                style={{
                  background: `${t.glow}25`,
                  border: `0.8px solid ${t.glow}`,
                  borderRadius: 3,
                  padding: "1px 3px",
                  fontFamily: "Outfit, sans-serif",
                  fontSize: 7,
                  fontWeight: 900,
                  color: t.glow,
                  letterSpacing: 0.5,
                }}
              >
                {t.label}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 2, marginTop: 1 }}>
              <span
                style={{
                  background: `${posColor}25`,
                  border: `0.8px solid ${posColor}`,
                  borderRadius: 3,
                  padding: "1px 4px",
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 800,
                  fontSize: 8,
                  color: "#FFFFFF",
                }}
              >
                {position}
              </span>
              {badgeText && (
                <span
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "0.8px solid rgba(255,255,255,0.18)",
                    borderRadius: 3,
                    padding: "1px 3px",
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 800,
                    fontSize: 7,
                    color: t.glow,
                  }}
                >
                  {badgeText}
                </span>
              )}
            </div>
          </div>

          {/* Top Right Team Crest Tag */}
          <div
            style={{
              padding: "2px 6px",
              borderRadius: 5,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              fontSize: 9,
              color: "#CBD5E1",
            }}
          >
            {team}
          </div>
        </div>

        {/* Center Player Cutout (Unclipped, Unobstructed Full Head & Hair) */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            position: "relative",
            zIndex: 2,
            marginTop: 2,
            marginBottom: 2,
          }}
        >
          <Img
            src={staticFile(`${photo}.png`)}
            style={{
              width: "auto",
              maxWidth: "82%",
              maxHeight: height * 0.54,
              objectFit: "contain",
              objectPosition: "bottom center",
              filter: `drop-shadow(0 8px 16px ${t.glow}44)`,
            }}
          />
        </div>

        {/* Player Name */}
        <div style={{ zIndex: 2 }}>
          <div
            style={{
              height: 1,
              background: `linear-gradient(90deg, transparent, ${t.glow}88, transparent)`,
              marginBottom: 4,
            }}
          />
          <div
            style={{
              textAlign: "center",
              fontFamily: "Outfit, sans-serif",
              fontWeight: 900,
              fontSize: 13,
              color: "#FFFFFF",
              letterSpacing: 1.2,
            }}
          >
            {name.toUpperCase()}
          </div>
          <div
            style={{
              height: 1,
              background: `linear-gradient(90deg, transparent, ${t.glow}44, transparent)`,
              marginTop: 4,
              marginBottom: 6,
            }}
          />

          {/* Bottom Stats Row: BGT / FTT / ROI */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              background: "rgba(0,0,0,0.35)",
              borderRadius: 8,
              padding: "4px 2px",
            }}
          >
            {[
              ["BGT", bgt, C.futSpecialPink],
              ["FTT", ftt, C.futGold],
              ["ROI", roi, C.neonGreen],
            ].map(([lbl, val, col]) => (
              <div key={String(lbl)} style={{ textAlign: "center", flex: 1 }}>
                <div
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 900,
                    fontSize: 12,
                    color: String(col),
                    lineHeight: 1,
                  }}
                >
                  {String(val)}
                </div>
                <div
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontSize: 8,
                    color: "rgba(255,255,255,0.5)",
                    fontWeight: 700,
                    marginTop: 2,
                  }}
                >
                  {String(lbl)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
