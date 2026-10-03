import React from "react";

// Exact replica of Flutter AppTheme (d:/projects/FPL_Scout_front/lib/core/theme/app_theme.dart)
export const C = {
  // Brand Backgrounds
  midnight:     "#0B0F0D", // Updated Brand Dark
  darkBg:       "#0D1117",
  surface:      "#16181D", // Unified Dark Gray Slate
  elevated:     "#1C1F26", // Unified Elevated Slate
  glassBorder:  "rgba(255, 255, 255, 0.1)", // 10% white lighting border
  cardBorder:   "rgba(39, 39, 42, 0.4)",

  // Neon & Brand Accents
  neonGreen:    "#00FF87", // Updated Brand Neon
  primaryPurple:"#7C5CFF",
  cyanAccent:   "#00E5FF",
  errorRed:     "#FF4B4B",
  warningYellow:"#FFB703",
  textWhite:    "#FFFFFF",
  textGrey:     "#8B949E",
  textMuted:    "#6B7280",

  // EA Sports FC / FUT Card Colors
  futGoldLight: "#FFF2A1",
  futGold:      "#FFD700",
  futGoldDark:  "#996515",
  futBronze:    "#CD7F32",
  futSilver:    "#C0C0C0",
  futSpecialPink:"#FF007A",

  // Pitch Colors
  pitchDark:    "#09140E",
  pitchLight:   "#0F1E16",
  pitchLine:    "rgba(255, 255, 255, 0.16)",

  // Aliases for compatibility
  bg:           "#0B0F0D",
  pitch:        "#00FF87",
  violet:       "#7C5CFF",
  amber:        "#FFB703",
  grey:         "#8B949E",
  greyLight:    "#CBD5E1",
  border:       "rgba(255, 255, 255, 0.1)",
  borderGreen:  "rgba(0, 255, 135, 0.35)",
  borderViolet: "rgba(124, 92, 255, 0.4)",
  borderAmber:  "rgba(255, 183, 3, 0.35)",
};

// Exact Flutter glassDecoration helper (AppTheme.glassDecoration)
export const glassCardStyle = (
  extra: React.CSSProperties = {},
  borderColor = C.glassBorder
): React.CSSProperties => ({
  background: "linear-gradient(180deg, #1F242C 0%, #14171D 100%)",
  borderRadius: 18,
  border: `1px solid ${borderColor}`,
  boxShadow: "0 10px 28px rgba(0, 0, 0, 0.45)",
  ...extra,
});

export const cardStyle = glassCardStyle;

export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

import { spring } from "remotion";

export const sp = (
  frame: number,
  fps = 30,
  delay = 0,
  config = { damping: 12, mass: 0.8, stiffness: 170 }
) =>
  spring({
    frame: frame - delay,
    fps,
    config,
  });

export const cameraDrift = (frame: number, duration: number, from = 1.0, to = 1.035) => {
  const p = Math.min(Math.max(frame / duration, 0), 1);
  return from + (to - from) * p;
};

export const AmbientCyberParticles: React.FC<{ accentColor?: string; count?: number }> = ({
  accentColor = C.neonGreen,
  count = 18,
}) => {
  const particles = React.useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: (i * 37) % 96 + 2,
        y: (i * 61) % 96 + 2,
        size: (i % 3) * 1.5 + 2,
        speed: 0.2 + ((i * 13) % 5) * 0.08,
        color: i % 2 === 0 ? accentColor : C.primaryPurple,
        baseOp: 0.25 + ((i * 19) % 5) * 0.1,
      })),
    [accentColor, count]
  );

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: p.color,
            boxShadow: `0 0 12px ${p.color}`,
            opacity: p.baseOp,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
};

export const BgGrid: React.FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage:
        "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
      backgroundSize: "32px 32px",
      pointerEvents: "none",
    }}
  >
    <AmbientCyberParticles />
  </div>
);
