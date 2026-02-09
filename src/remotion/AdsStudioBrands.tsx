import { AbsoluteFill, Sequence, staticFile, Audio, useCurrentFrame, interpolate, Easing } from "remotion";
import { Video } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily: interFont } = loadFont();

// Scene durations in frames (30fps)
const INTRO_DURATION = 137; // 4.57 seconds
const TAGLINE_DURATION = 120; // 4 seconds - tagline before scene 2
const TITLE1_DURATION = 150; // 5 seconds (Scene 2: Title 1)
const TITLE_DURATION = 90; // 3 seconds (each title)
const STACKED_DURATION = 140; // 4.67 seconds (matches bottom clip)
const STACKED2_DURATION = 135; // 4.5 seconds (matches bottom clip)
const STACKED3_DURATION = 120; // 4 seconds - matches clip, no hold on last frame
const STACKED4_DURATION = 140; // 4.67 seconds
const PRE_OUTRO_DURATION = 120; // 4 seconds - before second-to-last (Outro 1)
const ROTATO_DURATION = 150; // 5 seconds - rotato brand scene
const OUTRO1_DURATION = 90; // 3 seconds
const OUTRO2_DURATION = 90; // 3 seconds

// Total duration for fade out calculation (intro + tagline + 5 title + 4 stacked + pre-outro + rotato + 2 outros)
const TOTAL_DURATION = INTRO_DURATION + TAGLINE_DURATION + TITLE1_DURATION + (TITLE_DURATION * 4) + STACKED_DURATION + STACKED2_DURATION + STACKED3_DURATION + STACKED4_DURATION + PRE_OUTRO_DURATION + ROTATO_DURATION + OUTRO1_DURATION + OUTRO2_DURATION;

export const AdsStudioBrands: React.FC = () => {
  // Scene start times
  const scene1Start = 0;
  const taglineStart = INTRO_DURATION;
  const scene2Start = taglineStart + TAGLINE_DURATION;
  const scene2bStart = scene2Start + TITLE1_DURATION;     // New Title 1b
  const scene4Start = scene2bStart + TITLE_DURATION;
  const scene5Start = scene4Start + STACKED_DURATION;
  const scene6Start = scene5Start + TITLE_DURATION;
  const scene7Start = scene6Start + STACKED2_DURATION;
  const scene8Start = scene7Start + TITLE_DURATION;
  const scene9Start = scene8Start + STACKED3_DURATION;   // Title 5 (after Glider Wings)
  const scene10Start = scene9Start + TITLE_DURATION;    // Stacked 4
  const preOutroStart = scene10Start + STACKED4_DURATION; // Pre-outro (before Outro 1)
  const rotatoStart = preOutroStart + PRE_OUTRO_DURATION; // Rotato brand scene
  const scene11Start = rotatoStart + ROTATO_DURATION; // Outro 1
  const scene12Start = scene11Start + OUTRO1_DURATION;   // Outro 2

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Background music with fade out */}
      <BackgroundMusic />

      {/* Scene 1: Intro */}
      <Sequence from={scene1Start} durationInFrames={INTRO_DURATION}>
        <AbsoluteFill>
          <Video
            volume={0.65}
            src={staticFile("ads-studio-brands-intro-9x16.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <DemoPlacementText />
        </AbsoluteFill>
      </Sequence>

      {/* Tagline: before Scene 2 (title-podcast-9x16) */}
      <Sequence from={taglineStart} durationInFrames={TAGLINE_DURATION}>
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

      {/* Scene 2: Title 1 - Before Supplement */}
      <Sequence from={scene2Start} durationInFrames={TITLE1_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("title-podcast-9x16-scene2.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2b: Title 1b - New title after Title 1 */}
      <Sequence from={scene2bStart} durationInFrames={TITLE_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("ads-studio-brands-title1b.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: Stacked Videos 1 - Supplement */}
      <Sequence from={scene4Start} durationInFrames={STACKED_DURATION}>
        <StackedVideoScene />
        <DemoPlacementText />
      </Sequence>

      {/* Scene 5: Title 3 - title podcast */}
      <Sequence from={scene5Start} durationInFrames={TITLE_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("02-title-podcast-9x16-scene5.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 6: Stacked Videos 2 - Beverage */}
      <Sequence from={scene6Start} durationInFrames={STACKED2_DURATION}>
        <StackedVideoScene2 />
        <DemoPlacementText />
      </Sequence>

      {/* Scene 7: Title 4 - Before Outro */}
      <Sequence from={scene7Start} durationInFrames={TITLE_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("03-title-podcast-9x16-scene7.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 8: Stacked Videos 3 - Glider Wings */}
      <Sequence from={scene8Start} durationInFrames={STACKED3_DURATION}>
        <StackedVideoScene3 />
        <DemoPlacementText />
      </Sequence>

      {/* Scene 9: Title 5 */}
      <Sequence from={scene9Start} durationInFrames={TITLE_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("03-title-podcast-9x16.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 10: Stacked 4 (after Title 5) */}
      <Sequence from={scene10Start} durationInFrames={STACKED4_DURATION}>
        <StackedVideoScene4 />
        <DemoPlacementText />
      </Sequence>

      {/* Pre-outro: before second-to-last (title-podcast-9x16 15) */}
      <Sequence from={preOutroStart} durationInFrames={PRE_OUTRO_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("ads-studio-brands-preoutro-9x16-new.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Rotato: brand scene */}
      <Sequence from={rotatoStart} durationInFrames={ROTATO_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("rotato-brand-9x16.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 11: Outro 1 */}
      <Sequence from={scene11Start} durationInFrames={OUTRO1_DURATION}>
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

      {/* Scene 12: Outro 2 */}
      <Sequence from={scene12Start} durationInFrames={OUTRO2_DURATION}>
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

// Background music - fade out over last 5 seconds, duck during creator audio (Scene 4, 6, 8, and 10)
const FADE_OUT_DURATION_FRAMES = 30 * 5; // 5 seconds
const SCENE4_START = INTRO_DURATION + TAGLINE_DURATION + TITLE1_DURATION + TITLE_DURATION; // After intro + tagline + 2 titles
const SCENE4_END = SCENE4_START + STACKED_DURATION;
const SCENE6_START = SCENE4_END + TITLE_DURATION; // After scene 5 (title)
const SCENE6_END = SCENE6_START + STACKED2_DURATION;
const SCENE8_START = SCENE6_END + TITLE_DURATION; // After scene 7 (title)
const SCENE8_END = SCENE8_START + STACKED3_DURATION;
const SCENE10_START = SCENE8_END + TITLE_DURATION; // After scene 9 (title)
const SCENE10_END = SCENE10_START + STACKED4_DURATION;
const DUCK_TRANSITION_FRAMES = 10; // Smooth transition frames

const BackgroundMusic: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeOutStart = TOTAL_DURATION - FADE_OUT_DURATION_FRAMES;
  
  // Base volume with fade out at end
  const baseVolume = interpolate(
    frame,
    [0, fadeOutStart, TOTAL_DURATION],
    [0.35, 0.35, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );
  
  // Duck volume during Scene 4 (creator audio playing)
  const duck4 = interpolate(
    frame,
    [
      SCENE4_START - DUCK_TRANSITION_FRAMES,
      SCENE4_START,
      SCENE4_END,
      SCENE4_END + DUCK_TRANSITION_FRAMES,
    ],
    [1, 0.3, 0.3, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  
  // Duck volume during Scene 6 (creator audio playing - stacked2-top)
  const duck6 = interpolate(
    frame,
    [
      SCENE6_START - DUCK_TRANSITION_FRAMES,
      SCENE6_START,
      SCENE6_END,
      SCENE6_END + DUCK_TRANSITION_FRAMES,
    ],
    [1, 0.3, 0.3, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  
  // Duck volume during Scene 8 (creator audio playing - stacked3-new-top)
  const duck8 = interpolate(
    frame,
    [
      SCENE8_START - DUCK_TRANSITION_FRAMES,
      SCENE8_START,
      SCENE8_END,
      SCENE8_END + DUCK_TRANSITION_FRAMES,
    ],
    [1, 0.3, 0.3, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  
  // Duck volume during Scene 10 (creator audio playing - sam-21-scene11-top) - lower more for loud creator audio
  const duck10 = interpolate(
    frame,
    [
      SCENE10_START - DUCK_TRANSITION_FRAMES,
      SCENE10_START,
      SCENE10_END,
      SCENE10_END + DUCK_TRANSITION_FRAMES,
    ],
    [1, 0.1, 0.1, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  
  const volume = baseVolume * Math.min(duck4, duck6, duck8, duck10);

  return (
    <Audio
      src={staticFile("m83-outro.mp3")}
      volume={volume}
    />
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
          src={staticFile("ads-studio-brands-scene5.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
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
          src={staticFile("ads-studio-brands-stacked1-top.mp4")}
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

// Stacked videos 2 - top and bottom (centered) - Movie Poster
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
          src={staticFile("sam_2442361729530099.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
      </div>

      {/* Bottom video */}
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
          src={staticFile("ads-studio-brands-stacked2-top.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
      </div>

      {/* Before/After labels */}
      <VideoLabel label="Before" position="top" />
      <VideoLabel label="After" position="bottom" />
    </AbsoluteFill>
  );
};

// Stacked videos 3 - top and bottom (centered) - Glider Wings
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
          volume={0.65}
          src={staticFile("ads-studio-brands-stacked3-new-top.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Bottom video */}
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
          src={staticFile("ads-studio-brands-stacked3-top.mp4")}
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

// Stacked videos 4 - top and bottom (centered), after Title 5
const StackedVideoScene4: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
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
          volume={2}
          src={staticFile("sam-21-scene11-top.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
      </div>
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
          src={staticFile("ads-studio-brands-stacked4-bottom.mp4")}
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
