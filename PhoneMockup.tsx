import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { C } from "./tokens";

interface PhoneMockupProps {
  children: React.ReactNode;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  scale?: number;
  translateX?: number;
  translateY?: number;
  glowColor?: string;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  children,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  scale = 1,
  translateX = 0,
  translateY = 0,
  glowColor = C.neonGreen,
}) => {
  const frame = useCurrentFrame();

  const shineOffset = interpolate((frame * 1.5) % 240, [0, 80], [-100, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        perspective: 1400,
        transform: `
          perspective(1400px)
          translateX(${translateX}px)
          translateY(${translateY}px)
          scale(${scale})
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          rotateZ(${rotateZ}deg)
        `,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Outer ambient glow behind the device */}
      <div
        style={{
          position: "absolute",
          inset: -20,
          borderRadius: 64,
          background: glowColor,
          opacity: 0.35,
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Titanium Frame Border */}
      <div
        style={{
          position: "relative",
          width: 440,
          height: 890,
          borderRadius: 54,
          padding: 10,
          background: "linear-gradient(180deg, #2D3748 0%, #1A202C 50%, #0D1117 100%)",
          boxShadow: "0 25px 70px rgba(0,0,0,0.85), 0 0 20px rgba(255,255,255,0.08)",
          border: "1px solid rgba(74, 85, 104, 0.4)",
          overflow: "hidden",
        }}
      >
        {/* Device Screen Body */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            background: C.midnight,
            borderRadius: 44,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* Status Bar */}
          <div
            style={{
              height: 40,
              padding: "8px 24px 0 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 50,
              userSelect: "none",
              color: "#FFFFFF",
              fontSize: 12,
              fontWeight: 700,
              fontFamily: "Outfit, sans-serif",
            }}
          >
            <span>20:45</span>
            {/* Dynamic Island */}
            <div
              style={{
                width: 108,
                height: 24,
                background: "#000000",
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                padding: "0 10px",
                gap: 6,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: 4, background: "#1A202C", border: "1px solid rgba(255,255,255,0.2)" }} />
              <div style={{ width: 8, height: 8, borderRadius: 4, background: C.neonGreen }} />
            </div>
            {/* Battery / 5G */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, opacity: 0.9 }}>
              <span>5G</span>
              <div style={{ width: 20, height: 10, border: "1px solid #FFFFFF", borderRadius: 3, padding: 1 }}>
                <div style={{ width: "100%", height: "100%", background: C.neonGreen, borderRadius: 1 }} />
              </div>
            </div>
          </div>

          {/* Screen Content Container (Full Bleed to Bottom) */}
          <div
            style={{
              position: "relative",
              flex: 1,
              width: "100%",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {children}
          </div>

          {/* Glass Specular Light Sweep */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 40,
              overflow: "hidden",
              borderRadius: 44,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                width: "200%",
                height: "100%",
                opacity: 0.12,
                transform: `translateX(${shineOffset}%) rotate(-25deg)`,
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
