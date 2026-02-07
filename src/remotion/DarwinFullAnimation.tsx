import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  staticFile,
} from "remotion";
import { Video } from "@remotion/media";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["600"],
  subsets: ["latin"],
});

// Scene 1: Logo Animation (1 second)
const LogoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const growInEnd = fps * 0.3;
  const holdEnd = fps * 0.6;
  const growOutEnd = fps * 1.0;

  const scale = interpolate(
    frame,
    [0, growInEnd, holdEnd, growOutEnd],
    [0.6, 1.0, 1.0, 1.4],
    {
      easing: Easing.inOut(Easing.quad),
      extrapolateRight: "clamp",
    }
  );

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

// Scene 2: Text Reveal Animation
const TEXT = "Monetize Unused Ad Inventory";
const WORDS = TEXT.split(" ");

const Word: React.FC<{
  word: string;
  wordIndex: number;
  totalWords: number;
  animInDuration: number;
}> = ({ word, wordIndex, totalWords, animInDuration }) => {
  const frame = useCurrentFrame();

  // Stagger each word
  const wordDelay = (wordIndex / totalWords) * animInDuration * 0.7;
  const wordAnimDuration = animInDuration * 0.5;

  // Word slides up into position
  const translateY = interpolate(
    frame - wordDelay,
    [0, wordAnimDuration],
    [30, 0],
    {
      easing: Easing.out(Easing.quad),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const wordOpacity = interpolate(
    frame - wordDelay,
    [0, wordAnimDuration * 0.3],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <span
      style={{
        display: "inline-block",
        transform: `translateY(${translateY}px)`,
        opacity: wordOpacity,
        marginRight: 20,
      }}
    >
      {word.split("").map((letter, letterIndex) => {
        const letterDelay = wordDelay + (letterIndex / word.length) * (wordAnimDuration * 0.5);
        
        const letterOpacity = interpolate(
          frame - letterDelay,
          [0, 3],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }
        );

        return (
          <span key={letterIndex} style={{ opacity: letterOpacity }}>
            {letter}
          </span>
        );
      })}
    </span>
  );
};

const TextScene: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  const animInDuration = fps * 0.8; // Time for text to animate in
  const holdDuration = fps * 0.5; // Rest for 0.5 seconds
  const fadeOutDuration = fps * 0.4; // Fade out duration
  const fadeOutStart = animInDuration + holdDuration;

  // Fade out after text has settled and rested
  const opacity = interpolate(
    frame,
    [fadeOutStart, fadeOutStart + fadeOutDuration],
    [1, 0],
    {
      easing: Easing.inOut(Easing.quad),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div
        style={{
          fontFamily,
          fontSize: 72,
          fontWeight: 600,
          color: "white",
          textAlign: "center",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "0 60px",
        }}
      >
        {WORDS.map((word, index) => (
          <Word
            key={index}
            word={word}
            wordIndex={index}
            totalWords={WORDS.length}
            animInDuration={animInDuration}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Vertical Text Animation - Full Screen
const VERTICAL_LINES = ["BRANDS", "BID ON", "AD SPACE", "IN YOUR", "CONTENT"];

const VerticalLine: React.FC<{
  line: string;
  lineIndex: number;
  fps: number;
}> = ({ line, lineIndex, fps }) => {
  const frame = useCurrentFrame();

  // Each line slams down - 0.2s per line
  const lineDelay = lineIndex * (fps * 0.2);
  const animDuration = fps * 0.06; // Very quick slam

  // Instant appear
  const opacity = interpolate(
    frame - lineDelay,
    [0, 1],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Slam down from above - starts high, crashes down
  const translateY = interpolate(
    frame - lineDelay,
    [0, animDuration],
    [-80, 0],
    {
      easing: Easing.out(Easing.exp),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Big scale punch on slam
  const scale = interpolate(
    frame - lineDelay,
    [0, animDuration, animDuration + 3],
    [1.2, 1.05, 1],
    {
      easing: Easing.out(Easing.exp),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        fontWeight: 950,
        fontSize: 200,
        lineHeight: 0.92,
        color: "#000000",
        letterSpacing: -10,
        textShadow: "0 4px 0 rgba(0,0,0,0.1)",
      }}
    >
      {line}
    </div>
  );
};

const VerticalTextScene: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // All text finishes at: 5 lines * 0.2s = 1.0s, then emoji appears
  const emojiDelay = fps * 1.1; // Appear shortly after text slams
  const emojiAnimDuration = fps * 0.15;

  const emojiOpacity = interpolate(
    frame - emojiDelay,
    [0, 2],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const emojiScale = interpolate(
    frame - emojiDelay,
    [0, emojiAnimDuration, emojiAnimDuration + 3],
    [1.5, 1.1, 1],
    {
      easing: Easing.out(Easing.quad),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#ffffff",
      }}
    >
      {/* Text in upper 2/3 */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 0,
          right: 0,
          fontFamily,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 0,
        }}
      >
        {VERTICAL_LINES.map((line, index) => (
          <VerticalLine
            key={index}
            line={line}
            lineIndex={index}
            fps={fps}
          />
        ))}
      </div>

      {/* Emoji in bottom lower third */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: emojiOpacity,
          transform: `scale(${emojiScale})`,
          fontSize: 250,
        }}
      >
        🤯
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Video Clip 1
const VideoScene1: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Video
        src={staticFile("subject-video.mp4")}
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </AbsoluteFill>
  );
};

// Scene 5: Video Clip 2
const VideoScene2: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Video
        src={staticFile("video-2.mp4")}
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </AbsoluteFill>
  );
};

// Scene 6: Video Clip 3
const VideoScene3: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Video
        src={staticFile("video-3.mp4")}
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </AbsoluteFill>
  );
};

// Combined Animation
export const DarwinFullAnimation: React.FC = () => {
  const { fps } = useVideoConfig();

  const logoSceneDuration = fps * 1.0; // 1 second
  const textSceneDuration = fps * 1.7; // 1.7 seconds (0.8s anim + 0.5s hold + 0.4s fade)
  const verticalSceneDuration = fps * 1.5; // 1.5 seconds (5 lines + emoji)
  const video1Duration = fps * 1.0; // 1 second
  const video2Duration = fps * 1.0; // 1 second
  const video3Duration = fps * 1.0; // 1 second

  const scene3End = logoSceneDuration + textSceneDuration + verticalSceneDuration;
  const scene4End = scene3End + video1Duration;
  const scene5End = scene4End + video2Duration;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Scene 1: Logo Animation */}
      <Sequence from={0} durationInFrames={logoSceneDuration}>
        <LogoScene />
      </Sequence>

      {/* Scene 2: Text Reveal Animation */}
      <Sequence from={logoSceneDuration} durationInFrames={textSceneDuration}>
        <TextScene fps={fps} />
      </Sequence>

      {/* Scene 3: Vertical Text Animation */}
      <Sequence from={logoSceneDuration + textSceneDuration} durationInFrames={verticalSceneDuration}>
        <VerticalTextScene fps={fps} />
      </Sequence>

      {/* Scene 4: Video Clip 1 */}
      <Sequence from={scene3End} durationInFrames={video1Duration}>
        <VideoScene1 />
      </Sequence>

      {/* Scene 5: Video Clip 2 */}
      <Sequence from={scene4End} durationInFrames={video2Duration}>
        <VideoScene2 />
      </Sequence>

      {/* Scene 6: Video Clip 3 */}
      <Sequence from={scene5End} durationInFrames={video3Duration}>
        <VideoScene3 />
      </Sequence>
    </AbsoluteFill>
  );
};
