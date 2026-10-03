import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { C } from "./tokens";

export const LeagueSpyScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animated live points counter
  const pointsCounter = Math.round(
    interpolate(frame, [15, 45], [522, 594], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const rankShift = spring({
    frame: frame - 25,
    fps,
    config: { damping: 12 },
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
        padding: "16px 14px",
      }}
    >
      {/* Top Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          paddingBottom: 10,
          marginBottom: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "rgba(255, 184, 0, 0.2)",
              border: "1px solid #FFB800",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            🕵️‍♂️
          </div>
          <div>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: 13, color: "#FFFFFF" }}>
              LEAGUE SPY & CHIPS
            </div>
            <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 10, color: "#FBBF24" }}>
              جاسوس الدوريات وتتبع الشرائح
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "3px 8px",
            borderRadius: 999,
            background: "rgba(0, 255, 133, 0.15)",
            border: "1px solid rgba(0, 255, 133, 0.4)",
            color: "#00FF85",
            fontSize: 10,
            fontWeight: 800,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#00FF85",
              boxShadow: "0 0 6px #00FF85",
            }}
          />
          <span>LIVE GW8</span>
        </div>
      </div>

      {/* Mini-League Selector Card */}
      <div
        style={{
          borderRadius: 12,
          padding: "10px 14px",
          background: "linear-gradient(135deg, #1E2538 0%, #141926 100%)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ fontSize: 10, color: "#94A3B8", fontFamily: "Cairo, sans-serif" }}>الدوري المصغر النشط:</div>
          <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: 13, color: "#FFFFFF" }}>
            Premier Elites League
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 10, color: "#94A3B8", fontFamily: "Cairo, sans-serif" }}>عدد المدربين</div>
          <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, fontWeight: 800, color: "#FFB800" }}>
            38 مدرب
          </div>
        </div>
      </div>

      {/* Live Standings Leaderboard */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, overflow: "hidden" }}>
        <div
          style={{
            fontSize: 11,
            fontFamily: "Cairo, sans-serif",
            color: "#94A3B8",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 4px",
          }}
        >
          <span>الترتيب الحي المباشر</span>
          <span style={{ color: "#00FF85", fontSize: 10, fontWeight: 700 }}>تحديث لحظي</span>
        </div>

        {/* 1st Place (Your Team climbing!) */}
        <div
          style={{
            transform: `scale(${1 + rankShift * 0.02})`,
            borderRadius: 12,
            padding: "10px 12px",
            background: "linear-gradient(90deg, #0E3520 0%, #142A1D 50%, #121A2A 100%)",
            border: "1.5px solid #00FF85",
            boxShadow: "0 0 20px rgba(0,255,133,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: "#00FF85",
                color: "#000000",
                fontWeight: 900,
                fontSize: 13,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,255,133,0.5)",
              }}
            >
              1
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontWeight: 800, fontSize: 12, color: "#FFFFFF" }}>فريقك الذكي (YOU)</span>
                <span
                  style={{
                    padding: "1px 5px",
                    borderRadius: 4,
                    background: "rgba(0, 255, 133, 0.2)",
                    color: "#00FF85",
                    fontSize: 9,
                    fontWeight: 800,
                  }}
                >
                  +72 pts
                </span>
              </div>
              <div style={{ fontSize: 10, color: "#CBD5E1", fontFamily: "Cairo, sans-serif", marginTop: 2 }}>
                الكابتن: Palmer (C) 🔥
              </div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 18, color: "#00FF85", lineHeight: 1 }}>
              {pointsCounter}
            </div>
            <div style={{ fontSize: 10, color: "#34D399", fontWeight: 800, fontFamily: "Cairo, sans-serif", marginTop: 3 }}>
              ▲ +3 مراكز
            </div>
          </div>
        </div>

        {/* 2nd Place Rival (Used Triple Captain!) */}
        <div
          style={{
            borderRadius: 12,
            padding: "9px 12px",
            background: "#161B28",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "#2D3748",
                color: "#CBD5E1",
                fontWeight: 800,
                fontSize: 11,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              2
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 12, color: "#E2E8F0" }}>Ahmed Master FPL</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                <span
                  style={{
                    padding: "1px 6px",
                    borderRadius: 4,
                    background: "rgba(124, 92, 255, 0.2)",
                    border: "1px solid rgba(124, 92, 255, 0.4)",
                    color: "#C084FC",
                    fontSize: 8.5,
                    fontWeight: 800,
                  }}
                >
                  ⚡ TRIPLE CAPTAIN
                </span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: 14, color: "#FFFFFF" }}>578</div>
            <div style={{ fontSize: 9.5, color: "#94A3B8", fontFamily: "Cairo, sans-serif" }}>فارق -16 نقطة</div>
          </div>
        </div>

        {/* 3rd Place Rival (Played Wildcard!) */}
        <div
          style={{
            borderRadius: 12,
            padding: "9px 12px",
            background: "#161B28",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "#2D3748",
                color: "#CBD5E1",
                fontWeight: 800,
                fontSize: 11,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              3
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 12, color: "#E2E8F0" }}>Tactical Red FC</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                <span
                  style={{
                    padding: "1px 6px",
                    borderRadius: 4,
                    background: "rgba(255, 184, 0, 0.2)",
                    border: "1px solid rgba(255, 184, 0, 0.4)",
                    color: "#FBBF24",
                    fontSize: 8.5,
                    fontWeight: 800,
                  }}
                >
                  🃏 WILDCARD
                </span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: 14, color: "#FFFFFF" }}>562</div>
            <div style={{ fontSize: 9.5, color: "#94A3B8", fontFamily: "Cairo, sans-serif" }}>فارق -32 نقطة</div>
          </div>
        </div>

        {/* Live Spy Alert Toast */}
        <div
          style={{
            marginTop: "auto",
            padding: "8px 12px",
            borderRadius: 10,
            background: "rgba(88, 28, 135, 0.35)",
            border: "1px solid rgba(168, 85, 247, 0.4)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
          }}
        >
          <span style={{ fontSize: 16 }}>🔔</span>
          <div style={{ fontSize: 10, color: "#E2E8F0", fontFamily: "Cairo, sans-serif", direction: "rtl", lineHeight: 1.4 }}>
            <span style={{ color: "#D8B4FE", fontWeight: 800 }}>تنبيه الجاسوس:</span> 8 من منافسيك كبتنوا هالاند بينما كابتن دفرنشيلك سجل هاتريك!
          </div>
        </div>
      </div>
    </div>
  );
};
