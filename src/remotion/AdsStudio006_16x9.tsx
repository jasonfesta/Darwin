import { AbsoluteFill, Sequence, staticFile, Audio, useCurrentFrame, interpolate, Easing } from "remotion";
import { Video } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily: interFont } = loadFont();

// Scene durations in frames (30fps)
const INTRO_DURATION = 137; // 4.57 seconds
const TITLE_DURATION = 90; // 3 seconds
const CAROUSEL_DURATION = 120; // 4 seconds
const STACKED_DURATION = 140; // 4.67 seconds (matches bottom clip)
const STACKED2_DURATION = 135; // 4.5 seconds (matches bottom clip)
const STACKED3_DURATION = 130; // 4.33 seconds (matches bottom clip)
const OUTRO1_DURATION = 90; // 3 seconds
const OUTRO2_DURATION = 90; // 3 seconds

// Total duration for fade out calculation
const TOTAL_DURATION = INTRO_DURATION + TITLE_DURATION + CAROUSEL_DURATION + STACKED_DURATION + STACKED2_DURATION + STACKED3_DURATION + OUTRO1_DURATION + OUTRO2_DURATION;

export const AdsStudio006_16x9: React.FC = () => {
  // Calculate scene start times
  const scene1Start = 0;
  const scene2Start = INTRO_DURATION;
  const scene3Start = scene2Start + TITLE_DURATION;
  const scene4Start = scene3Start + CAROUSEL_DURATION; // Stacked videos 1
  const scene5Start = scene4Start + STACKED_DURATION; // Stacked videos 2
  const scene6Start = scene5Start + STACKED2_DURATION; // Stacked videos 3
  const scene7Start = scene6Start + STACKED3_DURATION; // Outro 1
  const scene8Start = scene7Start + OUTRO1_DURATION; // Outro 2

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Background music with fade out */}
      <BackgroundMusic />

      {/* Scene 1: Intro */}
      <Sequence from={scene1Start} durationInFrames={INTRO_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("ads-studio-006-intro-16x9.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: Title Podcast */}
      <Sequence from={scene2Start} durationInFrames={TITLE_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("ads-studio-006-title-16x9.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: Carousel */}
      <Sequence from={scene3Start} durationInFrames={CAROUSEL_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("ads-studio-006-carousel-16x9.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: Side by side Videos 1 (Left and Right) */}
      <Sequence from={scene4Start} durationInFrames={STACKED_DURATION}>
        <SideBySideVideoScene />
      </Sequence>

      {/* Scene 5: Side by side Videos 2 (Left and Right) */}
      <Sequence from={scene5Start} durationInFrames={STACKED2_DURATION}>
        <SideBySideVideoScene2 />
      </Sequence>

      {/* Scene 6: Side by side Videos 3 (Left and Right) */}
      <Sequence from={scene6Start} durationInFrames={STACKED3_DURATION}>
        <SideBySideVideoScene3 />
      </Sequence>

      {/* Scene 7: Outro 1 */}
      <Sequence from={scene7Start} durationInFrames={OUTRO1_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("outro-logo-16x9.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 8: Outro 2 */}
      <Sequence from={scene8Start} durationInFrames={OUTRO2_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("domain-16x9.mp4")}
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

// Background music with fade out at end
const BackgroundMusic: React.FC = () => {
  const frame = useCurrentFrame();
  
  const FADE_OUT_START = TOTAL_DURATION - 90; // Start fade 3 seconds before end
  
  const volume = interpolate(
    frame,
    [0, FADE_OUT_START, TOTAL_DURATION],
    [0.15, 0.15, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <Audio
      src={staticFile("ads-studio-006-music.mp3")}
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
          fontSize: 56,
          fontWeight: 600,
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "16px 40px",
          borderRadius: 12,
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

// Side by side videos 1 - left and right (for 16:9)
const SideBySideVideoScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Left video */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
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

      {/* Right video - with audio */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Video
          src={staticFile("ads-studio-006-stacked-bottom.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "right center",
          }}
        />
      </div>

    </AbsoluteFill>
  );
};

// Side by side videos 2 - left and right (for 16:9)
const SideBySideVideoScene2: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Left video */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
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

      {/* Right video - with audio */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Video
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
    </AbsoluteFill>
  );
};

// Side by side videos 3 - left and right (for 16:9)
const SideBySideVideoScene3: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Left video */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Video
          muted
          src={staticFile("ads-studio-006-stacked3-top.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Right video - with audio */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Video
          src={staticFile("ads-studio-006-stacked3-bottom.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Centered title overlay */}
      <CenteredTitleOverlay title="Wearables" />
    </AbsoluteFill>
  );
};
