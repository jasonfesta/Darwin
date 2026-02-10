import { AbsoluteFill, Sequence, staticFile, Audio, useCurrentFrame, interpolate, Easing } from "remotion";
import { Video } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily: interFont } = loadFont();

// Scene durations in frames (30fps)
const INTRO_DURATION = 137; // 4.57 seconds
const TITLE_DURATION = 90; // 3 seconds (each title)
const STACKED_DURATION = 105; // 3.5 seconds (matches bottom clip)
const STACKED2_DURATION = 80; // 2.67 seconds (matches bottom clip)
const STACKED3_DURATION = 160; // 5.33 seconds (matches bottom clip)
const TAGLINE_DURATION = 120; // 4 seconds - tagline before titles
const PRE_OUTRO_DURATION = 120; // 4 seconds - before outro
const OUTRO1_DURATION = 90; // 3 seconds
const OUTRO2_DURATION = 90; // 3 seconds

// Total duration for fade out calculation
const TOTAL_DURATION = INTRO_DURATION + TAGLINE_DURATION + (TITLE_DURATION * 4) + STACKED_DURATION + STACKED2_DURATION + STACKED3_DURATION + PRE_OUTRO_DURATION + OUTRO1_DURATION + OUTRO2_DURATION;

export const AdsStudio008: React.FC = () => {
  // Calculate scene start times
  const scene1Start = 0; // Intro
  const taglineStart = INTRO_DURATION; // Tagline
  const scene2Start = taglineStart + TAGLINE_DURATION; // Title 1
  const scene3Start = scene2Start + TITLE_DURATION; // Title 2
  const scene4Start = scene3Start + TITLE_DURATION; // Stacked 1
  const scene5Start = scene4Start + STACKED_DURATION; // Title 3
  const scene6Start = scene5Start + TITLE_DURATION; // Stacked 2
  const scene7Start = scene6Start + STACKED2_DURATION; // Title 4
  const scene8Start = scene7Start + TITLE_DURATION; // Stacked 3
  const preOutroStart = scene8Start + STACKED3_DURATION; // Pre-outro
  const scene9Start = preOutroStart + PRE_OUTRO_DURATION; // Outro 1
  const scene10Start = scene9Start + OUTRO1_DURATION; // Outro 2

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Background music with fade out */}
      <BackgroundMusic />

      {/* Scene 1: Intro */}
      <Sequence name="Scene 1: Intro" from={scene1Start} durationInFrames={INTRO_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("ads-studio-008-intro.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <DemoPlacementText />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: Tagline */}
      <Sequence name="Scene 2: Tagline" from={taglineStart} durationInFrames={TAGLINE_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("ads-studio-brands-tagline-9x16.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: Title - Fashion Podcast Intro */}
      <Sequence name="Scene 3: Title - Fashion Podcast Intro" from={scene2Start} durationInFrames={TITLE_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("title-podcast-fashion-9x16.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: Title - Demo 1 Intro */}
      <Sequence name="Scene 4: Title - Demo 1 Intro" from={scene3Start} durationInFrames={TITLE_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("ads-studio-008-title2.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 5: Stacked - Fashion Demo 1 Before/After */}
      <Sequence name="Scene 5: Stacked - Fashion Demo 1 Before/After" from={scene4Start} durationInFrames={STACKED_DURATION}>
        <StackedVideoScene />
        <DemoPlacementText />
      </Sequence>

      {/* Scene 6: Title - Demo 2 Intro */}
      <Sequence name="Scene 6: Title - Demo 2 Intro" from={scene5Start} durationInFrames={TITLE_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("ads-studio-008-title3.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 7: Stacked - Fashion Demo 2 Before/After */}
      <Sequence name="Scene 7: Stacked - Fashion Demo 2 Before/After" from={scene6Start} durationInFrames={STACKED2_DURATION}>
        <StackedVideoScene2 />
        <DemoPlacementText />
      </Sequence>

      {/* Scene 8: Title - Demo 3 Intro */}
      <Sequence name="Scene 8: Title - Demo 3 Intro" from={scene7Start} durationInFrames={TITLE_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("ads-studio-008-title4.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 9: Stacked - Fashion Demo 3 Before/After */}
      <Sequence name="Scene 9: Stacked - Fashion Demo 3 Before/After" from={scene8Start} durationInFrames={STACKED3_DURATION}>
        <StackedVideoScene3 />
        <DemoPlacementText />
      </Sequence>

      {/* Scene 10: Pre-Outro */}
      <Sequence name="Scene 10: Pre-Outro" from={preOutroStart} durationInFrames={PRE_OUTRO_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("ads-studio-brands-preoutro-9x16.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 11: Outro Logo */}
      <Sequence name="Scene 11: Outro Logo" from={scene9Start} durationInFrames={OUTRO1_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("outro-9x16.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 12: Outro URL */}
      <Sequence name="Scene 12: Outro URL" from={scene10Start} durationInFrames={OUTRO2_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("outro-9-16.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

// Demo placement text overlay - bottom left
const DemoPlacementText: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 50,
        left: 50,
        opacity: 0.75,
      }}
    >
      <span
        style={{
          fontFamily: interFont,
          fontSize: 28,
          fontWeight: 600,
          color: "white",
        }}
      >
        Demo Paid Advertisement
      </span>
    </div>
  );
};

// Before/After label for stacked videos
const VideoLabel: React.FC<{ label: string; position: "top" | "bottom" }> = ({ label, position }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: position === "top" ? 50 : "calc(50% + 50px)",
        left: 50,
      }}
    >
      <span
        style={{
          fontFamily: interFont,
          fontSize: 38,
          fontWeight: 600,
          color: "white",
          textShadow: "0px 2px 8px #0a0a0a",
        }}
      >
        {label}
      </span>
    </div>
  );
};

// Background music with fade out at end
const BackgroundMusic: React.FC = () => {
  const frame = useCurrentFrame();
  
  const FADE_OUT_START = 30 * 34; // Start fade at 34 seconds
  
  const volume = interpolate(
    frame,
    [0, FADE_OUT_START, TOTAL_DURATION],
    [0.35, 0.35, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <Audio
      src={staticFile("ads-studio-007-music.mp3")}
      volume={volume}
    />
  );
};

// Stacked videos 1 - top and bottom (centered)
const StackedVideoScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Top video */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "50%",
          overflow: "hidden",
        }}
      >
        <Video
          muted
          src={staticFile("ads-studio-008-stacked-top.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
      </div>

      {/* Bottom video - muted */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "50%",
          overflow: "hidden",
        }}
      >
        <Video
          muted
          src={staticFile("ads-studio-008-stacked-bottom.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
      </div>

      {/* Before/After labels */}
      <VideoLabel label="Before" position="top" />
      <VideoLabel label="After" position="bottom" />
    </AbsoluteFill>
  );
};

// Stacked videos 2 - top and bottom (right aligned)
const StackedVideoScene2: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Top video */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "50%",
          overflow: "hidden",
        }}
      >
        <Video
          muted
          src={staticFile("ads-studio-008-stacked2-top.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "right center",
          }}
        />
      </div>

      {/* Bottom video - muted */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "50%",
          overflow: "hidden",
        }}
      >
        <Video
          muted
          src={staticFile("ads-studio-008-stacked2-bottom.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "right center",
          }}
        />
      </div>

      {/* Before/After labels */}
      <VideoLabel label="Before" position="top" />
      <VideoLabel label="After" position="bottom" />
    </AbsoluteFill>
  );
};

// Stacked videos 3 - top and bottom (centered) - Food
const StackedVideoScene3: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Top video */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "50%",
          overflow: "hidden",
        }}
      >
        <Video
          muted
          src={staticFile("ads-studio-008-stacked3-top.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Bottom video - muted */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "50%",
          overflow: "hidden",
        }}
      >
        <Video
          muted
          src={staticFile("ads-studio-008-stacked3-bottom.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Before/After labels */}
      <VideoLabel label="Before" position="top" />
      <VideoLabel label="After" position="bottom" />
    </AbsoluteFill>
  );
};
