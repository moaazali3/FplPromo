import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Sequence, Audio, staticFile } from "remotion";
import { HookScene } from "./HookScene";
import { RevealSceneV2 } from "./v2/RevealSceneV2";
import { PitchViewSceneV2 } from "./v2/PitchViewSceneV2";
import { KpiRadarSceneV2 } from "./v2/KpiRadarSceneV2";
import { TransferLabSceneV2 } from "./v2/TransferLabSceneV2";
import { FeatureSceneV2 } from "./v2/FeatureSceneV2";
import { LeagueSpySceneV2 } from "./v2/LeagueSpySceneV2";
import { CTASceneV2 } from "./v2/CTASceneV2";
import { C } from "./tokens";

// ── Complete Master Showcase V2 Timeline (980 frames @ 30fps = ~32.6s) ──
// 1. Hook & Deadline Stress:       0 → 130  (4.3s)
// 2. Real App Ecosystem Reveal:  130 → 260  (4.3s)
// 3. Smart Scout Lineup Pitch:   260 → 380  (4.0s)
// 4. KPI Duel & Player Scouting: 380 → 515  (4.5s)
// 5. Transfer Lab Trade Floor:   515 → 650  (4.5s)
// 6. Captain Risk Matrix AI:     650 → 770  (4.0s)
// 7. League Spy & Rival Chips:   770 → 880  (3.6s)
// 8. Explosive Conversion Outro: 880 → 980  (3.3s)

const SCENES_V2 = [
  { id: "hook", start: 0, dur: 130, Component: HookScene },
  { id: "reveal", start: 130, dur: 130, Component: RevealSceneV2 },
  { id: "pitch", start: 260, dur: 120, Component: PitchViewSceneV2 },
  { id: "kpi", start: 380, dur: 135, Component: KpiRadarSceneV2 },
  { id: "transfer", start: 515, dur: 135, Component: TransferLabSceneV2 },
  { id: "captain", start: 650, dur: 120, Component: FeatureSceneV2 },
  { id: "leaguespy", start: 770, dur: 110, Component: LeagueSpySceneV2 },
  { id: "cta", start: 880, dur: 100, Component: CTASceneV2 },
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
      {/* Laser Light Shutter */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${wipeX}%`,
          width: 8,
          background: "#00FF87",
          boxShadow: "0 0 40px #00FF87, 0 0 80px #00E5FF",
          transform: "skewX(-15deg)",
        }}
      />
      {/* Light flash */}
      <AbsoluteFill
        style={{
          background: "radial-gradient(circle at center, rgba(0,255,135,0.4) 0%, transparent 70%)",
          opacity: flashOpacity,
          mixBlendMode: "screen",
        }}
      />
    </AbsoluteFill>
  );
};

export const FplScoutAdV2: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: C.midnight }}>
      {/* ── 1. Dynamic Master BGM Track (Siege Cinematic) ── */}
      <Audio
        src={staticFile("audio/bgm_siege.mp3")}
        volume={(f) =>
          interpolate(f, [0, 20, 940, 980], [0, 0.45, 0.45, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />

      {/* ── 2. Impact Sound Effect: Soccer Ball Smash at Frame 18 ── */}
      <Sequence from={18} durationInFrames={60}>
        <Audio src={staticFile("audio/sfx_impact.wav")} volume={0.85} />
      </Sequence>

      {/* ── 3. Electric Orbital Rings Activation at Frame 20 ── */}
      <Sequence from={20} durationInFrames={45}>
        <Audio src={staticFile("audio/sfx_electric.wav")} volume={0.5} />
      </Sequence>

      {/* ── 4. Scene Transition Laser Whooshes ── */}
      {SEAMS.map((seam) => (
        <Sequence key={seam} from={seam - 6} durationInFrames={35}>
          <Audio src={staticFile("audio/sfx_whoosh.wav")} volume={0.4} />
        </Sequence>
      ))}

      {/* ── 5. Victory Celebration Fanfare in CTA Scene (Frame 880) ── */}
      <Sequence from={880} durationInFrames={100}>
        <Audio src={staticFile("audio/sfx_victory.mp3")} volume={0.7} />
      </Sequence>

      {/* Visual Scenes */}
      {SCENES_V2.map(({ id, start, dur, Component }) => (
        <Sequence key={id} from={start} durationInFrames={dur}>
          <Component />
        </Sequence>
      ))}

      <TransitionWipeOverlay />
    </AbsoluteFill>
  );
};

