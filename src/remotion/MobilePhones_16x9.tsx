import { AbsoluteFill, Sequence, staticFile, Audio, useCurrentFrame, interpolate, Easing } from "remotion";
import { Video } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily: interFont } = loadFont();

// Scene durations in frames (30fps)
const INTRO_DURATION = 135; // 4.5 seconds
const TITLE_DURATION = 90; // 3 seconds (each title)
const ADSLOT1_DURATION = 96; // 3.18 seconds
const ADSLOT2_DURATION = 98; // 3.25 seconds
const ADSLOT3_DURATION = 96; // 3.18 seconds
const TAGLINE_DURATION = 150; // 5 seconds
const PRE_OUTRO_DURATION = 120; // 4 seconds
const OUTRO1_DURATION = 150; // 5 seconds
const OUTRO2_DURATION = 120; // 4 seconds

// Total duration for fade out calculation
const TOTAL_DURATION = INTRO_DURATION + TAGLINE_DURATION + (TITLE_DURATION * 4) + ADSLOT1_DURATION + ADSLOT2_DURATION + ADSLOT3_DURATION + PRE_OUTRO_DURATION + OUTRO1_DURATION + OUTRO2_DURATION;

export const MobilePhones_16x9: React.FC = () => {
  // Calculate scene start times
  const scene1Start = 0; // Intro
  const taglineStart = INTRO_DURATION; // Tagline
  const scene3Start = taglineStart + TAGLINE_DURATION; // Title Podcast
  const scene4Start = scene3Start + TITLE_DURATION; // Title 1
  const scene5Start = scene4Start + TITLE_DURATION; // Ad Slot 1
  const scene6Start = scene5Start + ADSLOT1_DURATION; // Title 2
  const scene7Start = scene6Start + TITLE_DURATION; // Ad Slot 2
  const scene8Start = scene7Start + ADSLOT2_DURATION; // Title 3
  const scene9Start = scene8Start + TITLE_DURATION; // Ad Slot 3
  const preOutroStart = scene9Start + ADSLOT3_DURATION; // Pre-outro
  const outroLogoStart = preOutroStart + PRE_OUTRO_DURATION; // Outro Logo
  const outroUrlStart = outroLogoStart + OUTRO1_DURATION; // Outro URL

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Background music with fade out */}
      <BackgroundMusic />

      {/* Scene 1: Intro */}
      <Sequence name="Scene 1: Intro" from={scene1Start} durationInFrames={INTRO_DURATION}>
        <AbsoluteFill>
          <Video
            volume={0.65}
            src={staticFile("mobile-phones-intro-16x9.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: Tagline */}
      <Sequence name="Scene 2: Tagline" from={taglineStart} durationInFrames={TAGLINE_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("mobile-phones-tagline-16x9.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: Title - Podcast Intro */}
      <Sequence name="Scene 3: Title - Podcast Intro" from={scene3Start} durationInFrames={TITLE_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("mobile-phones-title-podcast-16x9.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: Title 1 */}
      <Sequence name="Scene 4: Title 1" from={scene4Start} durationInFrames={TITLE_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("mobile-phones-title1-16x9.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 5: Ad Slot 1 */}
      <Sequence name="Scene 5: Ad Slot 1" from={scene5Start} durationInFrames={ADSLOT1_DURATION}>
        <AbsoluteFill>
          <Video
            volume={0.65}
            src={staticFile("mobile-phones-adslot1-16x9.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 6: Title 2 */}
      <Sequence name="Scene 6: Title 2" from={scene6Start} durationInFrames={TITLE_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("mobile-phones-title2-16x9.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 7: Ad Slot 2 */}
      <Sequence name="Scene 7: Ad Slot 2" from={scene7Start} durationInFrames={ADSLOT2_DURATION}>
        <AbsoluteFill>
          <Video
            volume={0.65}
            src={staticFile("mobile-phones-adslot2-16x9.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 8: Title 3 */}
      <Sequence name="Scene 8: Title 3" from={scene8Start} durationInFrames={TITLE_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("mobile-phones-title3-16x9.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 9: Ad Slot 3 */}
      <Sequence name="Scene 9: Ad Slot 3" from={scene9Start} durationInFrames={ADSLOT3_DURATION}>
        <AbsoluteFill>
          <Video
            volume={0.65}
            src={staticFile("mobile-phones-adslot3-16x9.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 10: Pre-Outro */}
      <Sequence name="Scene 10: Pre-Outro" from={preOutroStart} durationInFrames={PRE_OUTRO_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("ads-studio-brands-preoutro-16x9.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 11: Outro Logo */}
      <Sequence name="Scene 11: Outro Logo" from={outroLogoStart} durationInFrames={OUTRO1_DURATION}>
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

      {/* Scene 12: Outro URL */}
      <Sequence name="Scene 12: Outro URL" from={outroUrlStart} durationInFrames={OUTRO2_DURATION}>
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

// Demo placement text overlay - video spot 2 (right side), centered horizontally + 50px offset
const DemoPlacementText: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 50,
        left: "50%",
        width: "50%",
        display: "flex",
        justifyContent: "center",
        opacity: 0.75,
      }}
    >
      <span
        style={{
          fontFamily: interFont,
          fontSize: 28,
          fontWeight: 600,
          color: "white",
          marginLeft: 50, // 50px offset from center
        }}
      >
        Demo Paid Advertisement
      </span>
    </div>
  );
};

// Before/After label for stacked videos (side by side in 16x9)
const VideoLabel: React.FC<{ label: string; position: "left" | "right" }> = ({ label, position }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 50,
        left: position === "left" ? 50 : "calc(50% + 50px)",
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

// Stacked videos 1 - side by side for 16x9
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
      <VideoLabel label="Before" position="left" />
      <VideoLabel label="After" position="right" />
    </AbsoluteFill>
  );
};

// Stacked videos 2 - side by side for 16x9
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

      {/* Before/After labels */}
      <VideoLabel label="Before" position="left" />
      <VideoLabel label="After" position="right" />
    </AbsoluteFill>
  );
};

// Stacked videos 3 - side by side for 16x9 - Food
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
          src={staticFile("ads-studio-007-stacked3-top.mp4")}
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
          src={staticFile("ads-studio-007-stacked3-bottom.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
      </div>

      {/* Before/After labels */}
      <VideoLabel label="Before" position="left" />
      <VideoLabel label="After" position="right" />
    </AbsoluteFill>
  );
};
