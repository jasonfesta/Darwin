import { AbsoluteFill, Sequence, staticFile, Audio, useCurrentFrame, interpolate, Easing } from "remotion";
import { Video } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily: interFont } = loadFont();

// Scene durations in frames (30fps)
const INTRO_DURATION = 137; // 4.57 seconds
const TITLE_DURATION = 90; // 3 seconds (each title)
const STACKED_DURATION = 140; // 4.67 seconds (matches bottom clip)
const STACKED2_DURATION = 135; // 4.5 seconds (matches bottom clip)
const STACKED3_DURATION = 168; // 5.6 seconds (matches bottom clip)
const TAGLINE_DURATION = 120; // 4 seconds - tagline before titles
const PRE_OUTRO_DURATION = 120; // 4 seconds - before outro
const OUTRO1_DURATION = 90; // 3 seconds
const OUTRO2_DURATION = 90; // 3 seconds

// Total duration for fade out calculation
const TOTAL_DURATION = INTRO_DURATION + TAGLINE_DURATION + (TITLE_DURATION * 5) + STACKED_DURATION + STACKED2_DURATION + STACKED3_DURATION + PRE_OUTRO_DURATION + OUTRO1_DURATION + OUTRO2_DURATION;

export const AdsStudio007: React.FC = () => {
  // Calculate scene start times
  const scene1Start = 0; // Intro
  const taglineStart = INTRO_DURATION; // Tagline
  const scene3Start = taglineStart + TAGLINE_DURATION; // Title 1
  const scene4Start = scene3Start + TITLE_DURATION; // Title 2
  const scene5Start = scene4Start + TITLE_DURATION; // Stacked 1
  const scene6Start = scene5Start + STACKED_DURATION; // Title 3
  const scene7Start = scene6Start + TITLE_DURATION; // Stacked 2
  const scene8Start = scene7Start + STACKED2_DURATION; // Title 4
  const scene9Start = scene8Start + TITLE_DURATION; // Stacked 3
  const preOutroStart = scene9Start + STACKED3_DURATION; // Pre-outro
  const scene10Start = preOutroStart + PRE_OUTRO_DURATION; // Outro 1
  const scene11Start = scene10Start + OUTRO1_DURATION; // Outro 2

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Background music with fade out */}
      <BackgroundMusic />

      {/* Scene 1: Intro */}
      <Sequence name="Scene 1: Intro" from={scene1Start} durationInFrames={INTRO_DURATION}>
        <AbsoluteFill>
          <Video
            volume={0.65}
            src={staticFile("intro-9x16.mp4")}
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

      {/* Scene 3: Title - Supplement Intro */}
      <Sequence name="Scene 3: Title - Supplement Intro" from={scene3Start} durationInFrames={TITLE_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("ads-studio-desks-scene3.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: Title - Beverage Intro */}
      <Sequence name="Scene 4: Title - Beverage Intro" from={scene4Start} durationInFrames={TITLE_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("ads-studio-007-title2.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 5: Stacked - Supplement Before/After */}
      <Sequence name="Scene 5: Stacked - Supplement Before/After" from={scene5Start} durationInFrames={STACKED_DURATION}>
        <StackedVideoScene />
        <DemoPlacementText />
      </Sequence>

      {/* Scene 6: Title - Food Intro */}
      <Sequence name="Scene 6: Title - Food Intro" from={scene6Start} durationInFrames={TITLE_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("ads-studio-007-title3.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 7: Stacked - Beverage Before/After */}
      <Sequence name="Scene 7: Stacked - Beverage Before/After" from={scene7Start} durationInFrames={STACKED2_DURATION}>
        <StackedVideoScene2 />
        <DemoPlacementText />
      </Sequence>

      {/* Scene 8: Title - Pre-Food */}
      <Sequence name="Scene 8: Title - Pre-Food" from={scene8Start} durationInFrames={TITLE_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("ads-studio-007-title4.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 9: Stacked - Food Before/After */}
      <Sequence name="Scene 9: Stacked - Food Before/After" from={scene9Start} durationInFrames={STACKED3_DURATION}>
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
      <Sequence name="Scene 11: Outro Logo" from={scene10Start} durationInFrames={OUTRO1_DURATION}>
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
      <Sequence name="Scene 12: Outro URL" from={scene11Start} durationInFrames={OUTRO2_DURATION}>
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

// Centered title overlay - vertically centered with fade in and slide up
const CenteredTitleOverlay: React.FC<{ title: string }> = ({ title }) => {
  const frame = useCurrentFrame();
  
  // Title fade in and slide up
  const titleOpacity = interpolate(
    frame,
    [0, 12],
    [0, 1],
    {
      extrapolateRight: "clamp",
    }
  );
  
  const titleY = interpolate(
    frame,
    [0, 12],
    [30, 0],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontFamily: interFont,
          fontSize: 72,
          fontWeight: 600,
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "20px 50px",
          borderRadius: 16,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        {title}
      </div>
    </AbsoluteFill>
  );
};

// Stacked videos 1 - top and bottom (right aligned)
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
          src={staticFile("ads-studio-006-stacked-top.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "right center",
          }}
        />
      </div>

      {/* Bottom video - with audio */}
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
          volume={0.65}
          src={staticFile("ads-studio-006-stacked-bottom.mp4")}
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
          src={staticFile("ads-studio-006-stacked2-top.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "right center",
          }}
        />
      </div>

      {/* Bottom video - with audio */}
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
          volume={0.65}
          src={staticFile("ads-studio-006-stacked2-bottom.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "right center",
          }}
        />
      </div>

      {/* Centered title overlay */}
      <CenteredTitleOverlay title="Beverage" />

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
          src={staticFile("ads-studio-007-stacked3-top.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Bottom video - with audio */}
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
          volume={0.65}
          src={staticFile("ads-studio-007-stacked3-bottom.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Centered title overlay */}
      <CenteredTitleOverlay title="Food" />

      {/* Before/After labels */}
      <VideoLabel label="Before" position="top" />
      <VideoLabel label="After" position="bottom" />
    </AbsoluteFill>
  );
};
