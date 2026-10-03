import React from "react";
import { useCurrentFrame, spring, useVideoConfig } from "remotion";
import { C } from "./tokens";

export const PitchViewScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Floating KPI Modal entrance spring
  const modalSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.midnight,
        color: "#FFFFFF",
        overflow: "hidden",
        userSelect: "none",
        fontFamily: "Outfit, sans-serif",
      }}
    >
      {/* Top Header */}
      <div
        style={{
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(22, 24, 29, 0.95)",
          zIndex: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              background: C.neonGreen,
              boxShadow: `0 0 8px ${C.neonGreen}`,
            }}
          />
          <span style={{ fontWeight: 800, fontSize: 13, color: "#FFFFFF", letterSpacing: 0.5 }}>
            GW 8 SCOUT PICKS
          </span>
        </div>
        <div
          style={{
            padding: "3px 10px",
            borderRadius: 999,
            background: "rgba(0, 255, 135, 0.15)",
            border: `1px solid ${C.borderGreen}`,
            color: C.neonGreen,
            fontSize: 11,
            fontWeight: 800,
          }}
        >
          £103.2M
        </div>
      </div>

      {/* Formation Subheader */}
      <div
        style={{
          padding: "6px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 10,
          color: C.textGrey,
          background: "#0D1117",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          zIndex: 20,
        }}
      >
        <span style={{ fontFamily: "Cairo, sans-serif", fontWeight: 700 }}>التشكيلة المثالية: 3-4-3</span>
        <span style={{ color: C.neonGreen, fontWeight: 800 }}>النقاط المتوقعة: 78.4 pts</span>
      </div>

      {/* The Tactical Football Pitch */}
      <div
        style={{
          position: "relative",
          flex: 1,
          width: "100%",
          background: "linear-gradient(180deg, #09140E 0%, #0F1E16 50%, #06110A 100%)",
          padding: "10px 12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        {/* Pitch Lines Pattern */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.25, pointerEvents: "none" }}>
          {/* Halfway line */}
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 2, background: C.neonGreen }} />
          {/* Center Circle */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 110,
              height: 110,
              borderRadius: "50%",
              border: `2px solid ${C.neonGreen}`,
            }}
          />
          {/* Penalty Boxes */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 170,
              height: 70,
              borderBottom: `2px solid ${C.neonGreen}`,
              borderLeft: `2px solid ${C.neonGreen}`,
              borderRight: `2px solid ${C.neonGreen}`,
              borderRadius: "0 0 10px 10px",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 170,
              height: 70,
              borderTop: `2px solid ${C.neonGreen}`,
              borderLeft: `2px solid ${C.neonGreen}`,
              borderRight: `2px solid ${C.neonGreen}`,
              borderRadius: "10px 10px 0 0",
            }}
          />
        </div>

        {/* Goalkeeper (GK) */}
        <div style={{ position: "relative", display: "flex", justifyContent: "center", zIndex: 10, paddingTop: 4 }}>
          <PitchPlayer name="Raya" club="ARS" pts="6.2" color="#EF0107" />
        </div>

        {/* Defenders (DEF: 3) */}
        <div style={{ position: "relative", display: "flex", justifyContent: "space-around", alignItems: "center", zIndex: 10 }}>
          <PitchPlayer name="Gabriel" club="ARS" pts="6.8" color="#EF0107" />
          <PitchPlayer name="Trent A.A." club="LIV" pts="7.4" color="#C8102E" />
          <PitchPlayer name="Gvardiol" club="MCI" pts="6.1" color="#6CABDD" />
        </div>

        {/* Midfielders (MID: 4) */}
        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 10, padding: "0 6px" }}>
          <PitchPlayer name="Salah" club="LIV" pts="9.4" isVice color="#C8102E" />
          <PitchPlayer name="Palmer" club="CHE" pts="8.8" color="#034694" />
          <PitchPlayer name="Saka" club="ARS" pts="8.5" color="#EF0107" />
          <PitchPlayer name="Mbeumo" club="BRE" pts="7.2" color="#E30613" />
        </div>

        {/* Forwards (FWD: 3) */}
        <div style={{ position: "relative", display: "flex", justifyContent: "space-around", alignItems: "center", zIndex: 10, paddingBottom: 4 }}>
          <PitchPlayer name="Watkins" club="AVL" pts="7.9" color="#670E36" />
          <PitchPlayer name="Haaland" club="MCI" pts="11.8" isCaptain color="#6CABDD" isTarget />
          <PitchPlayer name="Wood" club="NFO" pts="6.9" color="#DD0000" />
        </div>

        {/* Bench Bar at Bottom */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            padding: "6px 12px",
            borderRadius: 12,
            background: "rgba(20, 23, 29, 0.95)",
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: C.textGrey }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: C.warningYellow }} />
            <span style={{ fontFamily: "Cairo, sans-serif" }}>دكة البدلاء الذكية:</span>
          </div>
          <span style={{ color: C.textGrey, fontFamily: "Outfit, sans-serif", fontSize: 9 }}>
            Flekken · Rogers · Robinson · Faes
          </span>
        </div>
      </div>

      {/* Floating 3D Player KPI Modal for Haaland */}
      {frame >= 20 && (
        <div
          style={{
            position: "absolute",
            left: 14,
            right: 14,
            top: 100,
            zIndex: 40,
            borderRadius: 18,
            padding: 14,
            background: "rgba(22, 24, 29, 0.96)",
            border: `2px solid ${C.neonGreen}`,
            boxShadow: `0 15px 45px rgba(0,0,0,0.85), 0 0 25px rgba(0,255,135,0.35)`,
            backdropFilter: "blur(14px)",
            transform: `scale(${modalSpring}) translateY(${(1 - modalSpring) * 25}px)`,
            opacity: modalSpring,
          }}
        >
          {/* Modal Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              paddingBottom: 8,
              marginBottom: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "rgba(108, 171, 221, 0.2)",
                  border: "1px solid #6CABDD",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: 11,
                  color: "#FFFFFF",
                }}
              >
                MCI
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 13, color: "#FFFFFF", display: "flex", alignItems: "center", gap: 6 }}>
                  <span>E. Haaland</span>
                  <span style={{ padding: "1px 6px", borderRadius: 4, background: C.neonGreen, color: "#000000", fontSize: 9, fontWeight: 900 }}>
                    C
                  </span>
                </div>
                <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 10, color: C.neonGreen }}>
                  تحليل الذكاء الاصطناعي (AI Scout)
                </div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 9, color: C.textGrey }}>السعر</div>
              <div style={{ fontWeight: 800, fontSize: 12, color: "#FFFFFF" }}>£15.3M</div>
            </div>
          </div>

          {/* KPI Metrics Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
            <div style={{ padding: 8, borderRadius: 10, background: "rgba(0,0,0,0.4)", border: `1px solid ${C.borderViolet}` }}>
              <div style={{ fontSize: 9, color: C.textGrey, fontFamily: "Cairo, sans-serif" }}>Scout Score</div>
              <div style={{ fontSize: 15, fontWeight: 900, color: C.primaryPurple }}>98.4 / 100</div>
            </div>
            <div style={{ padding: 8, borderRadius: 10, background: "rgba(0,0,0,0.4)", border: `1px solid ${C.borderGreen}` }}>
              <div style={{ fontSize: 9, color: C.textGrey, fontFamily: "Cairo, sans-serif" }}>Big Game Threat</div>
              <div style={{ fontSize: 15, fontWeight: 900, color: C.neonGreen }}>94.2%</div>
            </div>
          </div>

          {/* Captain Recommendation Banner */}
          <div
            style={{
              padding: "6px 12px",
              borderRadius: 8,
              background: "rgba(0,255,135,0.12)",
              border: `1px solid ${C.borderGreen}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 10,
            }}
          >
            <span style={{ fontFamily: "Cairo, sans-serif", color: C.neonGreen, fontWeight: 800 }}>
              ⚡ خيار كابتن مضمون للجولة 8
            </span>
            <span style={{ fontWeight: 800, color: "#FFFFFF" }}>100% Fit</span>
          </div>
        </div>
      )}
    </div>
  );
};

interface PitchPlayerProps {
  name: string;
  club: string;
  pts: string;
  color: string;
  isCaptain?: boolean;
  isVice?: boolean;
  isTarget?: boolean;
}

const PitchPlayer: React.FC<PitchPlayerProps> = ({
  name,
  pts,
  color,
  isCaptain,
  isVice,
  isTarget,
}) => {
  const frame = useCurrentFrame();
  const targetPulse = isTarget ? 1 + Math.sin(frame * 0.2) * 0.08 : 1;

  return (
    <div
      style={{
        transform: `scale(${targetPulse})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Captain Badge */}
      {isCaptain && (
        <div
          style={{
            position: "absolute",
            top: -5,
            right: -5,
            zIndex: 20,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: C.neonGreen,
            color: "#000000",
            fontWeight: 900,
            fontSize: 9,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 6px rgba(0,0,0,0.6)",
          }}
        >
          C
        </div>
      )}
      {isVice && (
        <div
          style={{
            position: "absolute",
            top: -5,
            right: -5,
            zIndex: 20,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "#FFFFFF",
            color: "#000000",
            fontWeight: 900,
            fontSize: 9,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 6px rgba(0,0,0,0.6)",
          }}
        >
          V
        </div>
      )}

      {/* Jersey Icon Container */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: `linear-gradient(135deg, ${color} 0%, #1A202C 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(255,255,255,0.25)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
        }}
      >
        <span style={{ fontSize: 12 }}>⚽</span>
      </div>

      {/* Name Tag */}
      <div
        style={{
          marginTop: 2,
          padding: "1px 6px",
          borderRadius: 4,
          background: "rgba(0,0,0,0.8)",
          border: "1px solid rgba(255,255,255,0.12)",
          maxWidth: 62,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ fontWeight: 800, fontSize: 8.5, color: "#FFFFFF" }}>{name}</span>
      </div>

      {/* Projected Points Tag */}
      <div
        style={{
          marginTop: 1,
          padding: "0 5px",
          borderRadius: 4,
          background: "rgba(0,255,135,0.2)",
          border: `1px solid ${C.borderGreen}`,
          color: C.neonGreen,
          fontSize: 8,
          fontWeight: 900,
        }}
      >
        {pts}
      </div>
    </div>
  );
};
