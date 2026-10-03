import React from "react";
import { useCurrentFrame, interpolate, Img, staticFile } from "remotion";
import { easeOut } from "./tokens";

export const PhoneAppDisplay: React.FC = () => {
  const f = useCurrentFrame();

  // Screen switches cleanly at frame 82 (midpoint of the 3D phone spin)
  const isScreen2 = f >= 82;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#0B0E17",
        overflow: "hidden",
      }}
    >
      <Img
        src={staticFile(isScreen2 ? "screenshots/player_explorer.jpg" : "screenshots/home_squad.jpg")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top center",
        }}
      />
    </div>
  );
};
