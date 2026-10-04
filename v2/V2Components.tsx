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
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const currentVal = Math.round(value * progress);
  const strokeDashoffset = circumference - (circumference * (value * progress)) / 100;
  const pulseScale = pulse ? 1 + Math.sin(f * 0.12) * 0.02 : 1;

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${pulseScale})`,
          flexShrink: 0,
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

        {/* Center Number & Unit Only - Exact Dead Center */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            lineHeight: 1,
          }}
        >
          <span
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 900,
              fontSize: Math.round(size * 0.32),
              color: "#FFFFFF",
              letterSpacing: -1,
              textShadow: `0 0 15px ${color}`,
            }}
          >
            {currentVal}
          </span>
          {unit && (
            <span
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 800,
                fontSize: Math.round(size * 0.18),
                color,
                marginLeft: 2,
              }}
            >
              {unit}
            </span>
          )}
        </div>
      </div>

      {label && (
        <div
          style={{
            fontFamily: "Outfit, Cairo, sans-serif",
            fontWeight: 800,
            fontSize: Math.max(10, Math.round(size * 0.11)),
            color: "#94A3B8",
            marginTop: 5,
            letterSpacing: 0.6,
            lineHeight: 1.1,
            whiteSpace: "nowrap",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
      )}
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

// ── 4. Commercial Ticker Bar (Removed per user directive to eliminate bottom clutter and distortion) ──
export const CommercialTicker: React.FC<{ items?: string[] }> = () => null;
