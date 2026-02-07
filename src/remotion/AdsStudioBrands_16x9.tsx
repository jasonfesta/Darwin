import { AbsoluteFill, Sequence, staticFile, Audio, useCurrentFrame, interpolate, Easing } from "remotion";
import { Video } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily: interFont } = loadFont();

// Bump when you replace videos in public/ to force Remotion to load new files (bypass cache)
const ASSET_CACHE_BUST = "3";

// Scene durations in frames (30fps)
const INTRO_DURATION = 137; // 4.57 seconds
const TAGLINE_DURATION = 120; // 4 seconds - tagline before scene 2
const TITLE_DURATION = 90; // 3 seconds (each title)
const STACKED_DURATION = 140; // 4.67 seconds (matches bottom clip)
const STACKED2_DURATION = 135; // 4.5 seconds (matches bottom clip)
const STACKED3_DURATION = 120; // 4 seconds - matches clip, no hold on last frame
const STACKED4_DURATION = 140; // 4.67 seconds
const PRE_OUTRO_DURATION = 120; // 4 seconds - before second-to-last (Outro 1)
const OUTRO1_DURATION = 90; // 3 seconds
const OUTRO2_DURATION = 90; // 3 seconds

// Total duration for fade out calculation (intro + tagline + 5 title + 4 stacked + pre-outro + 2 outros)
const TOTAL_DURATION = INTRO_DURATION + TAGLINE_DURATION + (TITLE_DURATION * 5) + STACKED_DURATION + STACKED2_DURATION + STACKED3_DURATION + STACKED4_DURATION + PRE_OUTRO_DURATION + OUTRO1_DURATION + OUTRO2_DURATION;

export const AdsStudioBrands_16x9: React.FC = () => {
  // Scene start times
  const scene1Start = 0;
  const taglineStart = INTRO_DURATION;
  const scene2Start = taglineStart + TAGLINE_DURATION;
  const scene3Start = scene2Start + TITLE_DURATION;
  const scene4Start = scene3Start + TITLE_DURATION;
  const scene5Start = scene4Start + STACKED_DURATION;
  const scene6Start = scene5Start + TITLE_DURATION;
  const scene7Start = scene6Start + STACKED2_DURATION;
  const scene8Start = scene7Start + TITLE_DURATION;
  const scene9Start = scene8Start + STACKED3_DURATION;   // Title 5 (after Glider Wings)
  const scene10Start = scene9Start + TITLE_DURATION;    // Stacked 4
  const preOutroStart = scene10Start + STACKED4_DURATION; // Pre-outro (before Outro 1)
  const scene11Start = preOutroStart + PRE_OUTRO_DURATION; // Outro 1
  const scene12Start = scene11Start + OUTRO1_DURATION;   // Outro 2

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Background music with fade out */}
      <BackgroundMusic />

      {/* Scene 1: Intro - swapped 16x9 clip */}
      <Sequence from={scene1Start} durationInFrames={INTRO_DURATION}>
        <AbsoluteFill>
          <Video
            volume={0.65}
            src={staticFile("ads-studio-brands-16x9-intro.mp4") + "?v=" + ASSET_CACHE_BUST}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <DemoPlacementText />
        </AbsoluteFill>
      </Sequence>

      {/* Tagline: before Scene 2 (Large-Tagline 16x9) */}
      <Sequence from={taglineStart} durationInFrames={TAGLINE_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("ads-studio-brands-tagline-16x9.mp4") + "?v=" + ASSET_CACHE_BUST}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: Title 1 - swapped 16x9 clip */}
      <Sequence from={scene2Start} durationInFrames={TITLE_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("ads-studio-brands-16x9-title1.mp4") + "?v=" + ASSET_CACHE_BUST}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: Title 2 - swapped 16x9 clip */}
      <Sequence from={scene3Start} durationInFrames={TITLE_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("ads-studio-brands-16x9-title2.mp4") + "?v=" + ASSET_CACHE_BUST}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: Stacked Videos 1 - Hat (side by side for 16x9) */}
      <Sequence from={scene4Start} durationInFrames={STACKED_DURATION}>
        <StackedVideoScene />
        <DemoPlacementText />
      </Sequence>

      {/* Scene 5: Title 3 - swapped 16x9 clip */}
      <Sequence from={scene5Start} durationInFrames={TITLE_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("02-title-podcast-16x9-5.mp4") + "?v=" + ASSET_CACHE_BUST}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 6: Stacked Videos 2 - Movie Poster (side by side for 16x9) */}
      <Sequence from={scene6Start} durationInFrames={STACKED2_DURATION}>
        <StackedVideoScene2 />
        <DemoPlacementText />
      </Sequence>

      {/* Scene 7: Title 4 - swapped 16x9 clip */}
      <Sequence from={scene7Start} durationInFrames={TITLE_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("ads-studio-brands-16x9-title4.mp4") + "?v=" + ASSET_CACHE_BUST}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 8: Stacked Videos 3 - Glider Wings (side by side for 16x9) */}
      <Sequence from={scene8Start} durationInFrames={STACKED3_DURATION}>
        <StackedVideoScene3 />
        <DemoPlacementText />
      </Sequence>

      {/* Scene 9: Title 5 - swapped 16x9 clip */}
      <Sequence from={scene9Start} durationInFrames={TITLE_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("ads-studio-brands-16x9-title5.mp4") + "?v=" + ASSET_CACHE_BUST}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 10: Stacked 4 (after Title 5) - side by side for 16x9 */}
      <Sequence from={scene10Start} durationInFrames={STACKED4_DURATION}>
        <StackedVideoScene4 />
        <DemoPlacementText />
      </Sequence>

      {/* Pre-outro: before second-to-last (Large-Tagline 1 16x9) */}
      <Sequence from={preOutroStart} durationInFrames={PRE_OUTRO_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("ads-studio-brands-preoutro-16x9.mp4") + "?v=" + ASSET_CACHE_BUST}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 11: Outro 1 - 16x9 version */}
      <Sequence from={scene11Start} durationInFrames={OUTRO1_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("ads-studio-007-16x9-outro1.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 12: Outro 2 - 16x9 version */}
      <Sequence from={scene12Start} durationInFrames={OUTRO2_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("ads-studio-007-16x9-outro2.mp4")}
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

// Background music - fade out over last 5 seconds only
const FADE_OUT_DURATION_FRAMES = 30 * 5; // 5 seconds
const BackgroundMusic: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeOutStart = TOTAL_DURATION - FADE_OUT_DURATION_FRAMES;
  const volume = interpolate(
    frame,
    [0, fadeOutStart, TOTAL_DURATION],
    [0.35, 0.35, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  return (
    <Audio
      src={staticFile("ads-studio-007-music.mp3")}
      volume={volume}
    />
  );
};

// Demo placement text overlay - bottom centered
const DemoPlacementText: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontFamily: interFont,
          fontSize: 28,
          fontWeight: 600,
          color: "white",
          textAlign: "center",
        }}
      >
        Demo Placement Only.
      </span>
    </div>
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

// Stacked videos 1 - side by side for 16x9 (Hat)
const StackedVideoScene: React.FC = () => {
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
          src={staticFile("sam_25952424207687204.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
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
          volume={0.65}
          src={staticFile("ads-studio-brands-stacked1-top.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
      </div>

      <CenteredTitleOverlay title="Hat" />
    </AbsoluteFill>
  );
};

// Stacked videos 2 - side by side for 16x9 (Movie Poster)
const StackedVideoScene2: React.FC = () => {
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
          src={staticFile("sam_2442361729530099.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
      </div>

      {/* Right video */}
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
          muted
          src={staticFile("ads-studio-brands-stacked2-top.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
      </div>

      <CenteredTitleOverlay title="Movie Poster" />
    </AbsoluteFill>
  );
};

// Stacked videos 3 - side by side for 16x9 (Glider Wings)
const StackedVideoScene3: React.FC = () => {
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
          src={staticFile("sam_910936404740965.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Right video */}
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
          muted
          src={staticFile("ads-studio-brands-stacked3-top.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      <CenteredTitleOverlay title="Paraglider Canopy" />
    </AbsoluteFill>
  );
};

// Stacked videos 4 - side by side for 16x9 (Minion T-shirt)
const StackedVideoScene4: React.FC = () => {
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
          src={staticFile("sam_2119745172119369.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
      </div>

      {/* Right video */}
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
          muted
          src={staticFile("ads-studio-brands-stacked4-bottom.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
      </div>

      <CenteredTitleOverlay title="Minion T-shirt" />
    </AbsoluteFill>
  );
};
