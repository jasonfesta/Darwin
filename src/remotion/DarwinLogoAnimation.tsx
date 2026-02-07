import React from "react";
import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

export const DarwinLogoAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing: 0.5s grow in, 0.5s hold, 0.5s grow out = 1.5s total
  const growInEnd = fps * 0.5; // frame 15
  const holdEnd = fps * 1.0; // frame 30
  const growOutEnd = fps * 1.5; // frame 45

  // Scale: 75% → 100% (grow in), hold at 100%, then 100% → 125% (grow out)
  const scale = interpolate(
    frame,
    [0, growInEnd, holdEnd, growOutEnd],
    [0.75, 1.0, 1.0, 1.25],
    {
      easing: Easing.inOut(Easing.quad),
      extrapolateRight: "clamp",
    }
  );

  // Soft fade in during grow in, soft fade out during grow out
  const opacity = interpolate(
    frame,
    [0, growInEnd, holdEnd, growOutEnd],
    [0, 1, 1, 0],
    {
      easing: Easing.inOut(Easing.quad),
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Img
        src="https://studio.darwin.so/assets/darwin_studio_logo_white.svg"
        style={{
          width: "80%",
          transform: `scale(${scale})`,
          opacity,
        }}
      />
    </AbsoluteFill>
  );
};
