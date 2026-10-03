import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { C, easeOut } from "./tokens";

export interface PlayerKpis {
  bpsMagnet: number;    // Top
  bigGameThreat: number; // Top Right
  nailedOn: number;     // Bottom Right
  flatTrack: number;    // Bottom Left
  valueRoi: number;     // Top Left
}

interface RadarKpiChartProps {
  kpis: PlayerKpis;
  width?: number;
  height?: number;
  size?: number;
  delay?: number;
  color?: string;
  fillColor?: string;
  showLabels?: boolean;
}

export const RadarKpiChart: React.FC<RadarKpiChartProps> = ({
  kpis,
  size,
  width = 240,
  height = 190,
  delay = 0,
  color = C.neonGreen,
  fillColor = "rgba(0, 255, 135, 0.25)",
  showLabels = true,
}) => {
  const chartWidth = size ? size * 1.25 : width;
  const chartHeight = size ? size : height;
  const frame = useCurrentFrame();

  // Loading animation: expands from center (0%) to full values (100%)
  const loadProgress = interpolate(frame - delay, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  // Base coordinates within 280 x 210 viewBox
  const vbWidth = 280;
  const vbHeight = 210;
  const center = { x: vbWidth / 2, y: vbHeight / 2 };
  const radius = 58;

  // 5 angles in radians (Top, Top-Right, Bottom-Right, Bottom-Left, Top-Left)
  const angles = [
    -Math.PI / 2,                      // BPS Magnet (Top)
    -Math.PI / 2 + (2 * Math.PI) / 5,  // Big Game Threat (Top Right)
    -Math.PI / 2 + (4 * Math.PI) / 5,  // Nailed On (Bottom Right)
    -Math.PI / 2 + (6 * Math.PI) / 5,  // Flat Track (Bottom Left)
    -Math.PI / 2 + (8 * Math.PI) / 5,  // Value ROI (Top Left)
  ];

  // Helper to calculate vertex point
  const getPoint = (angle: number, factor: number) => {
    const r = radius * factor;
    return {
      x: center.x + r * Math.cos(angle),
      y: center.y + r * Math.sin(angle),
    };
  };

  // Concentric pentagon grids (0.35, 0.7, 1.0)
  const gridLevels = [0.35, 0.7, 1.0];

  // Current animated data points
  const rawValues = [
    kpis.bpsMagnet,
    kpis.bigGameThreat,
    kpis.nailedOn,
    kpis.flatTrack,
    kpis.valueRoi,
  ];

  const dataPoints = rawValues.map((val, idx) => {
    const factor = (val / 100) * loadProgress;
    return getPoint(angles[idx], factor);
  });

  const polygonPath = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  const LABELS = [
    { label: "BPS Magnet", val: kpis.bpsMagnet, align: "middle", dy: -10, dx: 0 },
    { label: "Big Game", val: kpis.bigGameThreat, align: "start", dy: 2, dx: 8 },
    { label: "Nailed-On", val: kpis.nailedOn, align: "start", dy: 16, dx: 6 },
    { label: "Flat Track", val: kpis.flatTrack, align: "end", dy: 16, dx: -6 },
    { label: "Value ROI", val: kpis.valueRoi, align: "end", dy: 2, dx: -8 },
  ];

  return (
    <div style={{ position: "relative", width: chartWidth, height: chartHeight }}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${vbWidth} ${vbHeight}`}
        style={{ overflow: "visible" }}
      >
        {/* Background Grid Pentagons */}
        {gridLevels.map((lvl, i) => {
          const pts = angles.map((a) => getPoint(a, lvl));
          const path = pts.map((p) => `${p.x},${p.y}`).join(" ");
          return (
            <polygon
              key={i}
              points={path}
              fill={i === 2 ? "rgba(0,0,0,0.45)" : "none"}
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="1"
            />
          );
        })}

        {/* 5 Axis Radial Spoke Lines */}
        {angles.map((a, i) => {
          const pt = getPoint(a, 1.0);
          return (
            <line
              key={i}
              x1={center.x}
              y1={center.y}
              x2={pt.x}
              y2={pt.y}
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          );
        })}

        {/* Dynamic Animated Radar Area */}
        <polygon
          points={polygonPath}
          fill={fillColor}
          stroke={color}
          strokeWidth="2.5"
          filter={`drop-shadow(0 0 8px ${color})`}
        />

        {/* Corner Indicator Dots */}
        {dataPoints.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={loadProgress > 0.1 ? 3.5 : 0}
            fill="#FFFFFF"
            stroke={color}
            strokeWidth="2"
          />
        ))}

        {/* Surrounding Labels & Scores */}
        {showLabels &&
          LABELS.map((item, i) => {
            const pt = getPoint(angles[i], 1.06);
            return (
              <text
                key={i}
                x={pt.x + item.dx}
                y={pt.y + item.dy}
                textAnchor={item.align as any}
                fill={loadProgress > 0.8 ? color : C.textGrey}
                fontSize={10.5}
                fontFamily="Outfit, sans-serif"
                fontWeight={800}
                style={{ transition: "fill 0.3s ease" }}
              >
                {item.label} ({Math.round(item.val * loadProgress)}%)
              </text>
            );
          })}
      </svg>
    </div>
  );
};
