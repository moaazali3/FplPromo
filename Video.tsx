import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Sequence } from "remotion";
import { HookScene } from "./HookScene";
import { RevealScene } from "./RevealScene";
import { PitchViewScene } from "./PitchViewScene";
import { KpiRadarScene } from "./KpiRadarScene";
import { TransferLabScene } from "./TransferLabScene";
import { FeatureScene } from "./FeatureScene";
import { LeagueSpyScene } from "./LeagueSpyScene";
import { CTAScene } from "./CTAScene";
import { C } from "./tokens";

// ── Complete Master Showcase Timeline (980 frames @ 30fps = ~32.6s) ──
// 1. Hook & Deadline Stress:       0 → 130  (4.3s)
// 2. Real App Ecosystem Reveal:  130 → 260  (4.3s)
// 3. Smart Scout Lineup Pitch:   260 → 380  (4.0s)
// 4. KPI Radar Player Scouting:  380 → 515  (4.5s)
// 5. Transfer Lab & Wildcard:    515 → 650  (4.5s)
// 6. Captain Risk Matrix AI:     650 → 770  (4.0s)
// 7. League Spy & Rival Chips:   770 → 880  (3.6s)
// 8. Broadcast Outro & Stores:   880 → 980  (3.3s)

const SCENES = [
  { id: "hook", start: 0, dur: 130, Component: HookScene },
  { id: "reveal", start: 130, dur: 130, Component: RevealScene },
  { id: "pitch", start: 260, dur: 120, Component: PitchViewScene },
  { id: "kpi", start: 380, dur: 135, Component: KpiRadarScene },
  { id: "transfer", start: 515, dur: 135, Component: TransferLabScene },
  { id: "captain", start: 650, dur: 120, Component: FeatureScene },
  { id: "leaguespy", start: 770, dur: 110, Component: LeagueSpyScene },
  { id: "cta", start: 880, dur: 100, Component: CTAScene },
];

const SEAMS = [130, 260, 380, 515, 650, 770, 880];
const TRANSITION_HALF_SPAN = 9;

// Cinematic Neon Laser Shutter & Light Flare that bridges scenes smoothly
const TransitionWipeOverlay: React.FC = () => {
  const f = useCurrentFrame();

  const activeSeam = SEAMS.find(
    (seam) => Math.abs(f - seam) <= TRANSITION_HALF_SPAN
  );

  if (activeSeam === undefined) return null;

  const progress = interpolate(
    f,
    [activeSeam - TRANSITION_HALF_SPAN, activeSeam + TRANSITION_HALF_SPAN],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const wipeX = interpolate(progress, [0, 1], [-50, 150]);

  const flashOpacity = interpolate(
    f,
    [
      activeSeam - TRANSITION_HALF_SPAN,
      activeSeam,
      activeSeam + TRANSITION_HALF_SPAN,
    ],
    [0, 0.45, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 100 }}>
      {/* Dynamic Exposure Flash */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(0,255,135,0.4) 0%, rgba(124,92,255,0.3) 50%, transparent 80%)",
          opacity: flashOpacity,
          mixBlendMode: "screen",
        }}
      />

      {/* High-speed diagonal neon laser streak */}
      <div
        style={{
          position: "absolute",
          top: -200,
          bottom: -200,
          left: `${wipeX}%`,
          width: 320,
          transform: "rotate(18deg) translateX(-50%)",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,255,135,0.2) 30%, rgba(0,255,135,0.9) 48%, rgba(255,255,255,1) 50%, rgba(124,92,255,0.9) 52%, rgba(124,92,255,0.2) 70%, transparent 100%)",
          filter: "blur(6px)",
          opacity: 0.9,
          boxShadow: "0 0 60px rgba(0,255,135,0.8)",
        }}
      />
    </AbsoluteFill>
  );
};

export const FplScoutAd: React.FC = () => {
  const f = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: C.midnight, overflow: "hidden" }}>
      {SCENES.map(({ id, start, dur, Component }) => {
        const local = f - start;
        let opacity = 1;
        let scale = 1;
        let blur = 0;

        if (start > 0 && local < TRANSITION_HALF_SPAN) {
          opacity = interpolate(
            local,
            [0, TRANSITION_HALF_SPAN],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          scale = interpolate(
            local,
            [0, TRANSITION_HALF_SPAN],
            [0.96, 1.0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          blur = interpolate(
            local,
            [0, TRANSITION_HALF_SPAN],
            [6, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
        } else if (local > dur - TRANSITION_HALF_SPAN) {
          opacity = interpolate(
            local,
            [dur - TRANSITION_HALF_SPAN, dur],
            [1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          scale = interpolate(
            local,
            [dur - TRANSITION_HALF_SPAN, dur],
            [1.0, 1.04],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          blur = interpolate(
            local,
            [dur - TRANSITION_HALF_SPAN, dur],
            [0, 6],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
        }

        return (
          <Sequence key={id} from={start} durationInFrames={dur}>
            <AbsoluteFill
              style={{
                opacity,
                transform: `scale(${scale})`,
                filter: blur > 0.5 ? `blur(${blur}px)` : "none",
                willChange: "transform, opacity, filter",
              }}
            >
              <Component />
            </AbsoluteFill>
          </Sequence>
        );
      })}

      {/* Dynamic Laser Wipe & Flash Overlay bridging all seams */}
      <TransitionWipeOverlay />
    </AbsoluteFill>
  );
};
