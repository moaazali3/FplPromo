import React from "react";
import { Composition } from "remotion";
import { FplScoutAd } from "./Video";
import "./style.css";

export const Root: React.FC = () => (
  <>
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
  </>
);
