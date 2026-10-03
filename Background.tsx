import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

interface BackgroundProps {
  accentColor?: string;
  secondaryColor?: string;
  showParticles?: boolean;
}

export const Background: React.FC<BackgroundProps> = ({
  accentColor = "#00FF85",
  secondaryColor = "#7928CA",
  showParticles = true,
}) => {
  const frame = useCurrentFrame();

  // Dynamic subtle grid translation
  const gridOffsetY = (frame * 0.8) % 50;

  // Pulse intensity for ambient glows
  const glowPulse = 0.85 + Math.sin(frame * 0.05) * 0.15;
  const secondaryPulse = 0.85 + Math.cos(frame * 0.04) * 0.15;

  // Fixed deterministic particles array
  const particles = React.useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: (i * 47) % 100,
      y: (i * 83) % 100,
      size: (i % 3) + 2,
      speed: 0.2 + ((i * 17) % 5) * 0.1,
      color: i % 2 === 0 ? accentColor : secondaryColor,
      opacity: 0.2 + ((i * 23) % 5) * 0.1,
    }));
  }, [accentColor, secondaryColor]);

  return (
    <AbsoluteFill className="bg-[#0B0E17] overflow-hidden pointer-events-none select-none">
      {/* 3D Floor Perspective Grid */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          perspective: 600,
          perspectiveOrigin: "50% 30%",
        }}
      >
        <div
          className="absolute inset-x-[-50%] bottom-[-50%] h-[150%] cyber-grid"
          style={{
            transform: `rotateX(65deg) translateY(${gridOffsetY}px)`,
            transformOrigin: "50% 100%",
            maskImage: "linear-gradient(to top, rgba(0,0,0,1) 10%, transparent 80%)",
            WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 10%, transparent 80%)",
          }}
        />
      </div>

      {/* Primary Radial Glow */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full blur-[140px] pointer-events-none transition-all"
        style={{
          top: "-15%",
          left: "50%",
          transform: "translateX(-50%)",
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
          opacity: 0.18 * glowPulse,
        }}
      />

      {/* Secondary Accent Glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
        style={{
          bottom: "-10%",
          right: "-10%",
          background: `radial-gradient(circle, ${secondaryColor} 0%, transparent 70%)`,
          opacity: 0.15 * secondaryPulse,
        }}
      />

      {/* Animated Dust / Floating Cyber Particles */}
      {showParticles && (
        <div className="absolute inset-0">
          {particles.map((p) => {
            const currentY = (p.y - frame * p.speed + 100) % 100;
            const flicker = 0.5 + Math.sin(frame * 0.1 + p.id) * 0.5;
            return (
              <div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  left: `${p.x}%`,
                  top: `${currentY}%`,
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  boxShadow: `0 0 10px ${p.color}`,
                  opacity: p.opacity * flicker,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Subtle Vignette border */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: "inset 0 0 120px rgba(0, 0, 0, 0.85)",
        }}
      />
    </AbsoluteFill>
  );
};
