import React from "react";
import { Composition } from "remotion";
import { FplScoutAd } from "./Video";
import { FplScoutAdV2 } from "./VideoV2";
import "./style.css";

export const Root: React.FC = () => (
  <>
    {/* ── Version 1 (Preserved) ── */}
    <Composition
      id="FplScoutAd"
      component={FplScoutAd}
      durationInFrames={980}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="FplScoutAdVertical"
      component={FplScoutAd}
      durationInFrames={980}
      fps={30}
      width={1080}
      height={1920}
    />

    {/* ── Version 2: High-Octane Commercial Overhaul ── */}
    <Composition
      id="FplScoutAdV2"
      component={FplScoutAdV2}
      durationInFrames={980}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="FplScoutAdV2Vertical"
      component={FplScoutAdV2}
      durationInFrames={980}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);

