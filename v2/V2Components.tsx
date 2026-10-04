import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C, cardStyle, easeOut } from "../tokens";

// ── 1. Circular Percentage / Metric Gauge ──
export const CircularMetricGauge: React.FC<{
  value: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  unit?: string;
  progress: number; // 0 to 1
  pulse?: boolean;
}> = ({
  value,
  size = 110,
  strokeWidth = 8,
  color = C.neonGreen,
  label = "",
  unit = "%",
  progress = 1,
  pulse = true,
}) => {
  const f = useCurrentFrame();
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const currentVal = Math.round(value * progress);
  const strokeDashoffset = circumference - (circumference * (value * progress)) / 100;
  const pulseScale = pulse ? 1 + Math.sin(f * 0.12) * 0.025 : 1;

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${pulseScale})`,
      }}
    >
      <svg
        width={size}
        height={size}
        style={{ transform: "rotate(-90deg)", position: "absolute", inset: 0 }}
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          style={{
            filter: `drop-shadow(0 0 12px ${color})`,
          }}
        />
      </svg>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: "Outfit, sans-serif",
            fontWeight: 900,
            fontSize: size * 0.28,
            color: "#FFFFFF",
            lineHeight: 1,
            textShadow: `0 0 15px ${color}`,
          }}
        >
          {currentVal}
          <span style={{ fontSize: size * 0.18, color }}>{unit}</span>
        </span>
        {label && (
          <span
            style={{
              fontFamily: "Cairo, sans-serif",
              fontWeight: 800,
              fontSize: size * 0.12,
              color: "#94A3B8",
              marginTop: 2,
              letterSpacing: 0.5,
            }}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
};

// ── 2. Pulsing Radar / Sonar Orb ──
export const PulseRadarOrb: React.FC<{
  size?: number;
  color?: string;
  icon?: React.ReactNode;
  tag?: string;
}> = ({ size = 80, color = C.neonGreen, icon, tag }) => {
  const f = useCurrentFrame();
  const ring1Scale = 1 + ((f * 0.06) % 1) * 0.9;
  const ring1Op = 0.8 * (1 - ((f * 0.06) % 1));
  const ring2Scale = 1 + (((f * 0.06) + 0.5) % 1) * 0.9;
  const ring2Op = 0.8 * (1 - (((f * 0.06) + 0.5) % 1));

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Radar waves */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: `2px solid ${color}`,
          transform: `scale(${ring1Scale})`,
          opacity: ring1Op,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: `1.5px solid ${color}`,
          transform: `scale(${ring2Scale})`,
          opacity: ring2Op,
          pointerEvents: "none",
        }}
      />

      {/* Core orb */}
      <div
        style={{
          width: size * 0.75,
          height: size * 0.75,
          borderRadius: "50%",
          background: `radial-gradient(circle at 35% 35%, ${color} 0%, rgba(10,14,18,0.95) 75%)`,
          border: `2px solid ${color}`,
          boxShadow: `0 0 25px ${color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFFFFF",
          flexDirection: "column",
        }}
      >
        {icon}
        {tag && (
          <span
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 900,
              fontSize: 10,
              color: "#FFFFFF",
              letterSpacing: 0.5,
            }}
          >
            {tag}
          </span>
        )}
      </div>
    </div>
  );
};

// ── 3. Cyber Stat Cube / Badge (Square with angled cuts & neon accents) ──
export const StatCube: React.FC<{
  title: string;
  value: string;
  subtitle?: string;
  color?: string;
  icon?: React.ReactNode;
  align?: "left" | "right";
}> = ({ title, value, subtitle, color = C.neonGreen, icon, align = "right" }) => {
  return (
    <div
      style={{
        ...cardStyle({
          padding: "12px 18px",
          borderColor: `${color}66`,
          background: "rgba(13, 17, 23, 0.88)",
        }),
        display: "flex",
        alignItems: "center",
        gap: 14,
        boxShadow: `0 10px 25px rgba(0,0,0,0.6), 0 0 20px ${color}25`,
        direction: align === "right" ? "rtl" : "ltr",
        userSelect: "none",
      }}
    >
      {icon && (
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: `${color}18`,
            border: `1.5px solid ${color}88`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: `0 0 15px ${color}40`,
          }}
        >
          {icon}
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontFamily: "Cairo, sans-serif",
            fontSize: 12,
            fontWeight: 800,
            color: "#94A3B8",
            letterSpacing: 0.5,
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: 22,
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 1.1,
            textShadow: `0 0 10px ${color}80`,
          }}
        >
          {value}
        </span>
        {subtitle && (
          <span
            style={{
              fontFamily: "Cairo, sans-serif",
              fontSize: 10,
              fontWeight: 700,
              color,
              marginTop: 2,
            }}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

// ── 4. High-Octane Commercial Ticker Bar ──
export const CommercialTicker: React.FC<{
  items?: string[];
}> = ({
  items = [
    "🔥 GW28 DEADLINE INCOMING",
    "⚡ 11.4M MANAGERS LOCKING PICKS",
    "🎯 AI SCOUT PICKS: +42.6 PROJECTED PTS",
    "👑 CAPTAIN LOCKED: HAALAND (xP: 11.8)",
    "💎 DIFFERENTIAL PICK: PALMER (9.2% TSB)",
    "🛡️ WILDCARD TIMING ENGINE ACTIVE",
  ],
}) => {
  const f = useCurrentFrame();
  const offset = (f * 3.5) % 1800;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 38,
        background: "rgba(5, 7, 10, 0.94)",
        borderTop: "1.5px solid rgba(0, 255, 135, 0.35)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        zIndex: 50,
      }}
    >
      <div
        style={{
          background: C.neonGreen,
          color: "#05070A",
          fontFamily: "Outfit, sans-serif",
          fontWeight: 900,
          fontSize: 12,
          padding: "0 18px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 6,
          flexShrink: 0,
          letterSpacing: 1.5,
          boxShadow: "0 0 20px #00FF87",
        }}
      >
        <span>LIVE SCOUT RADAR</span>
      </div>

      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          transform: `translateX(-${offset}px)`,
          gap: 48,
          alignItems: "center",
          fontFamily: "Outfit, Cairo, sans-serif",
          fontSize: 13,
          fontWeight: 800,
          color: "#CBD5E1",
          letterSpacing: 1,
        }}
      >
        {[...items, ...items, ...items].map((text, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span>{text}</span>
            <span style={{ color: C.neonGreen }}>✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
