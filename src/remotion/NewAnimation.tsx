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

// New Animation - BEAT SYNCED VERSION
export const NewAnimation: React.FC = () => {
  const { fps } = useVideoConfig();

  // === MUSIC TIMING CONFIG ===
  // Synced to half-open-door.mp3
  const BPM = 45; // Track BPM
  const BEAT_OFFSET = 0; // Frames to offset if beat doesn't start at 0
  
  // Calculate frames per beat
  const framesPerBeat = (60 / BPM) * fps;
  const beat = (n: number) => Math.round(BEAT_OFFSET + n * framesPerBeat);
  
  // Helper: get frame at specific beat number
  // beat(0) = first beat, beat(1) = second beat, etc.

  // === FAST BEAT-SYNCED CUTS ===
  // Using HALF-BEATS for punchy cuts, QUARTER-BEATS for finale
  const quarterBeat = Math.round(framesPerBeat / 4);
  const halfBeat = Math.round(framesPerBeat / 2);
  const oneBeat = Math.round(framesPerBeat);
  const twoBeat = Math.round(framesPerBeat * 2);

  // Helper for half-beat positions
  const hbeat = (n: number) => Math.round(BEAT_OFFSET + n * halfBeat);

  // === INTRO - Cut on every HALF-BEAT (0-5 half-beats) ===
  const i1 = hbeat(0);
  const ib1 = hbeat(1);
  const i2 = hbeat(2);
  const ib2 = hbeat(3);
  const i3 = hbeat(4);
  const ib3 = hbeat(5);

  // === TEXT SCENES - 4 half-beats each (2 beats) ===
  const textStart = hbeat(6);
  const verticalStart = hbeat(10);

  // === CREATOR SHOWCASE - Cut on every HALF-BEAT ===
  const c1a = hbeat(14); const b1 = hbeat(15); const c1b = hbeat(16); const b2 = hbeat(17);
  const c2a = hbeat(18); const b3 = hbeat(19); const c2b = hbeat(20); const b4 = hbeat(21);
  const c3a = hbeat(22); const b5 = hbeat(23); const c3b = hbeat(24); const b6 = hbeat(25);
  const c4a = hbeat(26); const b7 = hbeat(27); const c4b = hbeat(28); const b8 = hbeat(29);
  const c5a = hbeat(30); const b9 = hbeat(31); const c5b = hbeat(32); const b10 = hbeat(33);
  const c6a = hbeat(34); const b11 = hbeat(35); const c6b = hbeat(36); const b12 = hbeat(37);

  // === FINALE - QUARTER-BEAT cuts (super fast!) ===
  const f1 = hbeat(38);
  const f2 = hbeat(38) + quarterBeat;
  const f3 = hbeat(39);
  const f4 = hbeat(39) + quarterBeat;
  const f5 = hbeat(40);
  const f6 = hbeat(40) + quarterBeat;
  const f7 = hbeat(41);
  const f8 = hbeat(41) + quarterBeat;
  const f9 = hbeat(42);
  const f10 = hbeat(42) + quarterBeat;
  const f11 = hbeat(43);
  const f12 = hbeat(43) + quarterBeat;

  const logoStart = hbeat(44);
  const totalDuration = hbeat(52);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Background Music - Answering The Call */}
      <Audio 
        src={staticFile("answering-the-call.mp3")} 
        volume={(f) => interpolate(f, [0, totalDuration - fps * 3, totalDuration], [1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        pauseWhenBuffering
      />

      {/* === INTRO - CUT ON EVERY HALF-BEAT === */}
      <Sequence from={i1} durationInFrames={halfBeat}><VideoClipScene src="clip-1.mp4" /></Sequence>
      <Sequence from={ib1} durationInFrames={halfBeat}><VideoClipScene src="break-1.mp4" /></Sequence>
      <Sequence from={i2} durationInFrames={halfBeat}><VideoClipScene src="clip-2.mp4" /></Sequence>
      <Sequence from={ib2} durationInFrames={halfBeat}><VideoClipScene src="break-2.mp4" /></Sequence>
      <Sequence from={i3} durationInFrames={halfBeat}><VideoClipScene src="clip-3.mp4" /></Sequence>
      <Sequence from={ib3} durationInFrames={halfBeat}><VideoClipScene src="break-3.mp4" /></Sequence>

      {/* === TEXT SCENES - 4 HALF-BEATS EACH === */}
      <Sequence from={textStart} durationInFrames={twoBeat}><TextScene fps={fps} /></Sequence>
      <Sequence from={verticalStart} durationInFrames={twoBeat}><VerticalTextScene fps={fps} /></Sequence>

      {/* === CREATOR 1 - Static Placement (cut on half-beat) === */}
      <Sequence from={c1a} durationInFrames={halfBeat}><VideoClipScene src="clip-1.mp4" title="Static Placement" subtitle="(poster)" /></Sequence>
      <Sequence from={b1} durationInFrames={halfBeat}><VideoClipScene src="break-1.mp4" /></Sequence>
      <Sequence from={c1b} durationInFrames={halfBeat}><VideoClipScene src="clip-1.mp4" /></Sequence>
      <Sequence from={b2} durationInFrames={halfBeat}><VideoClipScene src="break-2.mp4" /></Sequence>

      {/* === CREATOR 2 - Surface Placement === */}
      <Sequence from={c2a} durationInFrames={halfBeat}><VideoClipScene src="clip-2.mp4" title="Surface Placement" subtitle="(supplement)" /></Sequence>
      <Sequence from={b3} durationInFrames={halfBeat}><VideoClipScene src="break-3.mp4" /></Sequence>
      <Sequence from={c2b} durationInFrames={halfBeat}><VideoClipScene src="clip-2.mp4" /></Sequence>
      <Sequence from={b4} durationInFrames={halfBeat}><VideoClipScene src="break-1.mp4" /></Sequence>

      {/* === CREATOR 3 - Body Placement === */}
      <Sequence from={c3a} durationInFrames={halfBeat}><VideoClipScene src="clip-3.mp4" title="Body Placement" subtitle="(coat)" /></Sequence>
      <Sequence from={b5} durationInFrames={halfBeat}><VideoClipScene src="break-2.mp4" /></Sequence>
      <Sequence from={c3b} durationInFrames={halfBeat}><VideoClipScene src="clip-3.mp4" /></Sequence>
      <Sequence from={b6} durationInFrames={halfBeat}><VideoClipScene src="break-3.mp4" /></Sequence>

      {/* === CREATOR 4 - Held Placement === */}
      <Sequence from={c4a} durationInFrames={halfBeat}><VideoClipScene src="clip-4.mp4" title="Held Placement" subtitle="(serum)" /></Sequence>
      <Sequence from={b7} durationInFrames={halfBeat}><VideoClipScene src="break-1.mp4" /></Sequence>
      <Sequence from={c4b} durationInFrames={halfBeat}><VideoClipScene src="clip-4.mp4" /></Sequence>
      <Sequence from={b8} durationInFrames={halfBeat}><VideoClipScene src="break-2.mp4" /></Sequence>

      {/* === CREATOR 5 - Accessory Placement === */}
      <Sequence from={c5a} durationInFrames={halfBeat}><VideoClipScene src="clip-5.mp4" title="Accessory Placement" subtitle="(hat)" /></Sequence>
      <Sequence from={b9} durationInFrames={halfBeat}><VideoClipScene src="break-3.mp4" /></Sequence>
      <Sequence from={c5b} durationInFrames={halfBeat}><VideoClipScene src="clip-5.mp4" /></Sequence>
      <Sequence from={b10} durationInFrames={halfBeat}><VideoClipScene src="break-1.mp4" /></Sequence>

      {/* === CREATOR 6 - Static Placement === */}
      <Sequence from={c6a} durationInFrames={halfBeat}><VideoClipScene src="clip-6.mp4" title="Static Placement" subtitle="(poster)" /></Sequence>
      <Sequence from={b11} durationInFrames={halfBeat}><VideoClipScene src="break-2.mp4" /></Sequence>
      <Sequence from={c6b} durationInFrames={halfBeat}><VideoClipScene src="clip-6.mp4" /></Sequence>
      <Sequence from={b12} durationInFrames={halfBeat}><VideoClipScene src="break-3.mp4" /></Sequence>

      {/* === FINALE - QUARTER-BEAT CUTS (super fast!) === */}
      <Sequence from={f1} durationInFrames={quarterBeat}><VideoClipScene src="clip-1.mp4" /></Sequence>
      <Sequence from={f2} durationInFrames={quarterBeat}><VideoClipScene src="break-1.mp4" /></Sequence>
      <Sequence from={f3} durationInFrames={quarterBeat}><VideoClipScene src="clip-2.mp4" /></Sequence>
      <Sequence from={f4} durationInFrames={quarterBeat}><VideoClipScene src="break-2.mp4" /></Sequence>
      <Sequence from={f5} durationInFrames={quarterBeat}><VideoClipScene src="clip-3.mp4" /></Sequence>
      <Sequence from={f6} durationInFrames={quarterBeat}><VideoClipScene src="break-3.mp4" /></Sequence>
      <Sequence from={f7} durationInFrames={quarterBeat}><VideoClipScene src="clip-4.mp4" /></Sequence>
      <Sequence from={f8} durationInFrames={quarterBeat}><VideoClipScene src="break-1.mp4" /></Sequence>
      <Sequence from={f9} durationInFrames={quarterBeat}><VideoClipScene src="clip-5.mp4" /></Sequence>
      <Sequence from={f10} durationInFrames={quarterBeat}><VideoClipScene src="break-2.mp4" /></Sequence>
      <Sequence from={f11} durationInFrames={quarterBeat}><VideoClipScene src="clip-6.mp4" /></Sequence>
      <Sequence from={f12} durationInFrames={quarterBeat}><VideoClipScene src="break-3.mp4" /></Sequence>

      {/* === LOGO OUTRO - 2 BEATS === */}
      <Sequence from={logoStart} durationInFrames={twoBeat}><LogoOutroScene /></Sequence>
    </AbsoluteFill>
  );
};
