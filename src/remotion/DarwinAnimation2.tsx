import React from "react";
import {
  AbsoluteFill,
  Audio,
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

// Video Clip Scene - reusable for all clips
const VideoClipScene: React.FC<{ src: string; title?: string; subtitle?: string }> = ({ src, title, subtitle }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Video
        src={staticFile(src)}
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
      {title && (
        <div
          style={{
            position: "absolute",
            bottom: 320,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: 64,
              fontWeight: 600,
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              padding: "20px 48px",
              borderRadius: 12,
              textAlign: "center",
            }}
          >
            {title}
            {subtitle && (
              <div style={{ fontSize: 48, fontWeight: 400, marginTop: 8 }}>
                {subtitle}
              </div>
            )}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// Scene 2: Text Reveal Animation
const TEXT = "Monetize Unused Ad Inventory.";
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

// Logo Outro Animation
const LogoOutroScene: React.FC = () => {
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

// Combined Animation with new clips
export const DarwinAnimation2: React.FC = () => {
  const { fps } = useVideoConfig();

  // Durations
  const clipDuration = fps * 0.5; // 0.5 seconds per video clip
  const textSceneDuration = fps * 1.7; // 1.7 seconds (0.8s anim + 0.5s hold + 0.4s fade)
  const verticalSceneDuration = fps * 1.75; // 1.75 seconds (5 lines + emoji)
  const extendedClipDuration = fps * 3.1; // 3.1 seconds each for 15s total
  const logoOutroDuration = fps * 1.0; // 1 second

  // Calculate start frames
  const clip1Start = 0;
  const clip2Start = clipDuration;
  const clip3Start = clipDuration * 2;
  const scene2Start = clipDuration * 3; // After all 3 clips
  const scene3Start = scene2Start + textSceneDuration;
  const extendedClip1Start = scene3Start + verticalSceneDuration;
  const extendedClip2Start = extendedClip1Start + extendedClipDuration;
  const extendedClip3Start = extendedClip2Start + extendedClipDuration;
  const extendedClip4Start = extendedClip3Start + extendedClipDuration;
  const extendedClip5Start = extendedClip4Start + extendedClipDuration;
  const extendedClip6Start = extendedClip5Start + extendedClipDuration;
  const logoOutroStart = extendedClip6Start + extendedClipDuration;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Background Music with soft fade out */}
      <Audio 
        src={staticFile("midnight-runaway.mp3")} 
        volume={(f) => interpolate(
          f,
          [0, 647, 737], // Fade out over last 3 seconds (frames 647-737)
          [1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        )}
        pauseWhenBuffering
      />

      {/* Video Clip 1 - 0.5s */}
      <Sequence from={clip1Start} durationInFrames={clipDuration}>
        <VideoClipScene src="clip-1.mp4" />
      </Sequence>

      {/* Video Clip 2 - 0.5s */}
      <Sequence from={clip2Start} durationInFrames={clipDuration}>
        <VideoClipScene src="clip-2.mp4" />
      </Sequence>

      {/* Video Clip 3 - 0.5s */}
      <Sequence from={clip3Start} durationInFrames={clipDuration}>
        <VideoClipScene src="clip-3.mp4" />
      </Sequence>

      {/* Scene 2: Text Reveal Animation */}
      <Sequence from={scene2Start} durationInFrames={textSceneDuration}>
        <TextScene fps={fps} />
      </Sequence>

      {/* Scene 3: Vertical Text Animation */}
      <Sequence from={scene3Start} durationInFrames={verticalSceneDuration}>
        <VerticalTextScene fps={fps} />
      </Sequence>

      {/* Extended Video Clip 1 - Static Placement */}
      <Sequence from={extendedClip1Start} durationInFrames={extendedClipDuration}>
        <VideoClipScene src="clip-1.mp4" title="Static Placement" subtitle="(poster)" />
      </Sequence>

      {/* Extended Video Clip 2 - Surface Placement */}
      <Sequence from={extendedClip2Start} durationInFrames={extendedClipDuration}>
        <VideoClipScene src="clip-2.mp4" title="Surface Placement" subtitle="(supplement)" />
      </Sequence>

      {/* Extended Video Clip 3 - Body Placement */}
      <Sequence from={extendedClip3Start} durationInFrames={extendedClipDuration}>
        <VideoClipScene src="clip-3.mp4" title="Body Placement" subtitle="(coat)" />
      </Sequence>

      {/* Extended Video Clip 4 - Held Placement */}
      <Sequence from={extendedClip4Start} durationInFrames={extendedClipDuration}>
        <VideoClipScene src="clip-4.mp4" title="Held Placement" subtitle="(serum)" />
      </Sequence>

      {/* Extended Video Clip 5 - Accessory Placement */}
      <Sequence from={extendedClip5Start} durationInFrames={extendedClipDuration}>
        <VideoClipScene src="clip-5.mp4" title="Accessory Placement" subtitle="(hat)" />
      </Sequence>

      {/* Extended Video Clip 6 - Static Placement */}
      <Sequence from={extendedClip6Start} durationInFrames={extendedClipDuration}>
        <VideoClipScene src="clip-6.mp4" title="Static Placement" subtitle="(poster)" />
      </Sequence>

      {/* Logo Outro */}
      <Sequence from={logoOutroStart} durationInFrames={logoOutroDuration}>
        <LogoOutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
