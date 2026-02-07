import React from "react";
import {
  AbsoluteFill,
  Audio,
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
const VideoClipScene: React.FC<{ src: string; title?: string; subtitle?: string; fullScreen?: boolean; objectPosition?: string }> = ({ src, title, subtitle, fullScreen = false, objectPosition = "center center" }) => {
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
          objectFit: fullScreen ? "cover" : "contain",
          objectPosition,
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
  const { durationInFrames } = useVideoConfig();

  const animInDuration = fps * 0.8; // Time for text to animate in
  const fadeOutDuration = fps * 0.2; // Quick fade out
  const fadeOutStart = durationInFrames - fadeOutDuration; // Start fade near end of scene

  // Fade out at the very end of the scene
  const opacity = interpolate(
    frame,
    [fadeOutStart, durationInFrames],
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

// Scene 3: Stacking Video Clips on White Background - Apple Motion Style
const STACKING_CLIPS_004 = [
  { src: "clip-1.mp4", objectPosition: "center center" },
  { src: "clip-2.mp4", objectPosition: "center center" },
  { src: "clip-3.mp4", objectPosition: "center center" },
  { src: "prime-drink.mp4", objectPosition: "100% center" }, // Right aligned
];

// Different entry directions and rotations for each card
const CARD_ANIMATIONS_004 = [
  { startX: -600, startY: -400, startRotate: -15, startRotateY: 25 },   // From top-left with tilt
  { startX: 600, startY: -300, startRotate: 12, startRotateY: -20 },    // From top-right
  { startX: -500, startY: 500, startRotate: 8, startRotateY: 15 },      // From bottom-left
  { startX: 400, startY: 400, startRotate: -10, startRotateY: -25 },    // From bottom-right
];

const StackingClip004: React.FC<{
  src: string;
  clipIndex: number;
  fps: number;
  totalClips: number;
  objectPosition?: string;
}> = ({ src, clipIndex, fps, totalClips, objectPosition = "center center" }) => {
  const frame = useCurrentFrame();
  const anim = CARD_ANIMATIONS_004[clipIndex % CARD_ANIMATIONS_004.length];

  // Each clip appears with a delay - 0.55s per clip
  const clipDelay = clipIndex * (fps * 0.55);
  const animDuration = fps * 0.6; // Smooth, cinematic timing

  // Fade in with smooth ease
  const opacity = interpolate(
    frame - clipDelay,
    [0, animDuration * 0.25],
    [0, 1],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // X position - smooth spring-like motion
  const translateX = interpolate(
    frame - clipDelay,
    [0, animDuration * 0.7, animDuration],
    [anim.startX, 5, 0],
    {
      easing: Easing.out(Easing.exp),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Y position - smooth spring-like motion
  const translateY = interpolate(
    frame - clipDelay,
    [0, animDuration * 0.7, animDuration],
    [anim.startY, -5, 0],
    {
      easing: Easing.out(Easing.exp),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Z rotation (2D tilt) - settles smoothly
  const rotate = interpolate(
    frame - clipDelay,
    [0, animDuration * 0.6, animDuration],
    [anim.startRotate, 1, 0],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 3D Y rotation for perspective effect
  const rotateY = interpolate(
    frame - clipDelay,
    [0, animDuration * 0.5, animDuration],
    [anim.startRotateY, 2, 0],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Scale with subtle overshoot
  const scale = interpolate(
    frame - clipDelay,
    [0, animDuration * 0.5, animDuration * 0.8, animDuration],
    [0.7, 1.04, 1.01, 1],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Dynamic shadow based on position
  const shadowBlur = interpolate(
    frame - clipDelay,
    [0, animDuration],
    [60, 24],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const shadowOpacity = interpolate(
    frame - clipDelay,
    [0, animDuration],
    [0.15, 0.2],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Z-index so later clips appear on top
  const zIndex = clipIndex;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity,
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotate}deg) perspective(1000px) rotateY(${rotateY}deg)`,
        zIndex,
      }}
    >
      <div
        style={{
          width: "50%",
          height: "50%",
          borderRadius: 48,
          overflow: "hidden",
          boxShadow: `0 ${shadowBlur}px ${shadowBlur * 2}px rgba(0,0,0,${shadowOpacity})`,
        }}
      >
        <Video
          src={staticFile(src)}
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition,
          }}
        />
      </div>
    </div>
  );
};

const StackingClipsScene: React.FC<{ fps: number; sceneDuration: number }> = ({ fps, sceneDuration }) => {
  const frame = useCurrentFrame();
  
  // Fast zoom at the end - starts 0.2s before cut
  const zoomStartFrame = sceneDuration - (fps * 0.2);
  
  const endZoom = interpolate(
    frame,
    [zoomStartFrame, sceneDuration],
    [1, 2.5],
    {
      easing: Easing.in(Easing.exp),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#ffffff",
        perspective: "1200px",
        transform: `scale(${endZoom})`,
      }}
    >
      {STACKING_CLIPS_004.map((clip, index) => (
        <StackingClip004
          key={index}
          src={clip.src}
          clipIndex={index}
          fps={fps}
          totalClips={STACKING_CLIPS_004.length}
          objectPosition={clip.objectPosition}
        />
      ))}
    </AbsoluteFill>
  );
};

// Three Ways Text Animation - Letter by letter, word by word
const THREE_WAYS_TEXT = "Three Ways to Passively Earn";
const THREE_WAYS_WORDS = THREE_WAYS_TEXT.split(" ");

const AnimatedLetter: React.FC<{
  letter: string;
  letterIndex: number;
  wordDelay: number;
  wordAnimDuration: number;
}> = ({ letter, letterIndex, wordDelay, wordAnimDuration }) => {
  const frame = useCurrentFrame();
  
  // Each letter fades in with slight delay
  const letterDelay = wordDelay + letterIndex * 2;
  
  const letterOpacity = interpolate(
    frame - letterDelay,
    [0, 4],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Letter slides up slightly
  const letterY = interpolate(
    frame - letterDelay,
    [0, 6],
    [15, 0],
    {
      easing: Easing.out(Easing.quad),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <span
      style={{
        display: "inline-block",
        opacity: letterOpacity,
        transform: `translateY(${letterY}px)`,
      }}
    >
      {letter}
    </span>
  );
};

const AnimatedWord: React.FC<{
  word: string;
  wordIndex: number;
  totalWords: number;
  animInDuration: number;
}> = ({ word, wordIndex, totalWords, animInDuration }) => {
  const frame = useCurrentFrame();

  // Stagger each word with clear separation
  const wordDelay = wordIndex * (animInDuration / totalWords);
  const wordAnimDuration = animInDuration * 0.4;

  // Word container slides up
  const translateY = interpolate(
    frame - wordDelay,
    [0, wordAnimDuration],
    [40, 0],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Word container fades in
  const wordOpacity = interpolate(
    frame - wordDelay,
    [0, wordAnimDuration * 0.2],
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
        marginRight: 24,
      }}
    >
      {word.split("").map((letter, letterIndex) => (
        <AnimatedLetter
          key={letterIndex}
          letter={letter}
          letterIndex={letterIndex}
          wordDelay={wordDelay}
          wordAnimDuration={wordAnimDuration}
        />
      ))}
    </span>
  );
};

const ThreeWaysTextScene: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const animInDuration = fps * 1.2; // Time for text to animate in
  const fadeOutDuration = fps * 0.3;
  const fadeOutStart = durationInFrames - fadeOutDuration;

  // Overall scale grows slightly
  const scale = interpolate(
    frame,
    [0, durationInFrames],
    [0.95, 1.05],
    {
      easing: Easing.inOut(Easing.quad),
    }
  );

  // Fade out at the end
  const opacity = interpolate(
    frame,
    [fadeOutStart, durationInFrames],
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
        backgroundColor: "#0a0a0a",
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div
        style={{
          fontFamily,
          fontSize: 80,
          fontWeight: 600,
          color: "white",
          textAlign: "center",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "0 80px",
          transform: `scale(${scale})`,
        }}
      >
        {THREE_WAYS_WORDS.map((word, index) => (
          <AnimatedWord
            key={index}
            word={word}
            wordIndex={index}
            totalWords={THREE_WAYS_WORDS.length}
            animInDuration={animInDuration}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// New Animation - BEAT SYNCED VERSION
export const NewAnimation02: React.FC = () => {
  const { fps } = useVideoConfig();

  // === MUSIC TIMING CONFIG ===
  // Synced to half-open-door.mp3
  const BPM = 45; // Track BPM
  const BEAT_OFFSET = 0; // Frames to offset if beat doesn't start at 0
  
  // Calculate frames per beat
  const framesPerBeat = (60 / BPM) * fps;

  // === BEAT-SYNCED CUTS ===
  // Using HALF-BEATS for consistent punchy cuts
  const halfBeat = Math.round(framesPerBeat / 2);
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

  // === TEXT SCENES ===
  const textStart = hbeat(6);
  const stackingSceneStart = hbeat(10);
  const stackingSceneDuration = Math.round(fps * 3.5); // 3.5 seconds for card stack

  // === CREATOR SHOWCASE - Cut on every HALF-BEAT (starts after stacking scene) ===
  const creatorStart = stackingSceneStart + stackingSceneDuration;
  const c1a = creatorStart; const b1 = creatorStart + halfBeat;
  const c2a = creatorStart + halfBeat * 2; const b2 = creatorStart + halfBeat * 3;
  const c3a = creatorStart + halfBeat * 4; const b3 = creatorStart + halfBeat * 5;
  const c4a = creatorStart + halfBeat * 6; const b4 = creatorStart + halfBeat * 7;
  const c5a = creatorStart + halfBeat * 8; const b5 = creatorStart + halfBeat * 9;
  const c6a = creatorStart + halfBeat * 10; const b6 = creatorStart + halfBeat * 11;

  // === ENDING SCENES - from ads-studio-002 ===
  const FINAL_TEXT_1_DURATION = 75; // 2.5 seconds
  const FINAL_TEXT_2_DURATION = 60; // 2 seconds
  const LOGO_OUTRO_DURATION = 90; // 3 seconds
  const URL_SCENE_DURATION = 30; // 1 second
  
  const endingStart = b6 + halfBeat; // Start after last creator clip
  const finalText1Start = endingStart;
  const finalText2Start = finalText1Start + FINAL_TEXT_1_DURATION;
  const logoStart = finalText2Start + FINAL_TEXT_2_DURATION;
  const urlStart = logoStart + LOGO_OUTRO_DURATION;
  
  // Total duration includes ending scenes
  const totalDuration = urlStart + URL_SCENE_DURATION;

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
      <Sequence from={ib1} durationInFrames={halfBeat}><VideoClipScene src="break-1.mp4" fullScreen /></Sequence>
      <Sequence from={i2} durationInFrames={halfBeat}><VideoClipScene src="clip-2.mp4" /></Sequence>
      <Sequence from={ib2} durationInFrames={halfBeat}><VideoClipScene src="break-2.mp4" fullScreen /></Sequence>
      <Sequence from={i3} durationInFrames={halfBeat}><VideoClipScene src="clip-3.mp4" /></Sequence>
      <Sequence from={ib3} durationInFrames={halfBeat}><VideoClipScene src="break-3.mp4" fullScreen /></Sequence>

      {/* === TEXT SCENES === */}
      <Sequence from={textStart} durationInFrames={twoBeat}><TextScene fps={fps} /></Sequence>
      <Sequence from={stackingSceneStart} durationInFrames={stackingSceneDuration}><StackingClipsScene fps={fps} sceneDuration={stackingSceneDuration} /></Sequence>

      {/* === CREATOR 1 - Static Placement === */}
      <Sequence from={c1a} durationInFrames={halfBeat}><VideoClipScene src="clip-1.mp4" title="Static Placement" subtitle="(poster)" /></Sequence>
      <Sequence from={b1} durationInFrames={halfBeat}><VideoClipScene src="break-4.mp4" fullScreen objectPosition="35% center" /></Sequence>

      {/* === CREATOR 2 - Surface Placement === */}
      <Sequence from={c2a} durationInFrames={halfBeat}><VideoClipScene src="clip-2.mp4" title="Surface Placement" subtitle="(supplement)" /></Sequence>
      <Sequence from={b2} durationInFrames={halfBeat}><VideoClipScene src="break-5.mp4" fullScreen /></Sequence>

      {/* === CREATOR 3 - Body Placement === */}
      <Sequence from={c3a} durationInFrames={halfBeat}><VideoClipScene src="clip-3.mp4" title="Body Placement" subtitle="(coat)" /></Sequence>
      <Sequence from={b3} durationInFrames={halfBeat}><VideoClipScene src="break-6.mp4" fullScreen /></Sequence>

      {/* === CREATOR 4 - Held Placement === */}
      <Sequence from={c4a} durationInFrames={halfBeat}><VideoClipScene src="clip-4.mp4" title="Held Placement" subtitle="(serum)" /></Sequence>
      <Sequence from={b4} durationInFrames={halfBeat}><VideoClipScene src="break-7.mp4" fullScreen /></Sequence>

      {/* === CREATOR 5 - Accessory Placement === */}
      <Sequence from={c5a} durationInFrames={halfBeat}><VideoClipScene src="clip-5.mp4" title="Accessory Placement" subtitle="(hat)" /></Sequence>
      <Sequence from={b5} durationInFrames={halfBeat}><VideoClipScene src="break-8.mp4" fullScreen objectPosition="100% center" /></Sequence>

      {/* === CREATOR 6 - Background Placement === */}
      <Sequence from={c6a} durationInFrames={halfBeat}><VideoClipScene src="clip-6.mp4" title="Static Placement" subtitle="(poster)" /></Sequence>
      <Sequence from={b6} durationInFrames={halfBeat}><VideoClipScene src="break-1.mp4" fullScreen /></Sequence>

      {/* === ENDING SCENES === */}
      <Sequence from={finalText1Start} durationInFrames={FINAL_TEXT_1_DURATION}>
        <FinalMotionText1 duration={FINAL_TEXT_1_DURATION} />
      </Sequence>
      <Sequence from={finalText2Start} durationInFrames={FINAL_TEXT_2_DURATION}>
        <FinalMotionText2 duration={FINAL_TEXT_2_DURATION} />
      </Sequence>
      <Sequence from={logoStart} durationInFrames={LOGO_OUTRO_DURATION}>
        <LogoOutro duration={LOGO_OUTRO_DURATION} />
      </Sequence>
      <Sequence from={urlStart} durationInFrames={URL_SCENE_DURATION}>
        <UrlSlideIn />
      </Sequence>

    </AbsoluteFill>
  );
};

// First final text - animates in then fades out
const FinalMotionText1: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const text = "Brands bid on ad space in your content";
  const words = text.split(" ");
  
  const ANIMATION_DURATION = 30;
  const FADE_OUT_START = 55;
  
  const scale = interpolate(
    frame,
    [0, duration],
    [1.0, 1.1],
    {
      easing: Easing.inOut(Easing.cubic),
      extrapolateRight: "clamp",
    }
  );
  
  const sceneOpacity = interpolate(
    frame,
    [FADE_OUT_START, duration],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const totalLetters = text.replace(/ /g, "").length;
  const framesPerLetter = ANIMATION_DURATION / totalLetters;
  
  let letterIndex = 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale})`,
        opacity: sceneOpacity,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
          padding: "40px",
          maxWidth: "900px",
        }}
      >
        {words.map((word, wordIndex) => {
          const wordStartFrame = letterIndex * framesPerLetter;
          
          const wordProgress = interpolate(
            frame,
            [wordStartFrame, wordStartFrame + 10],
            [0, 1],
            {
              easing: Easing.out(Easing.cubic),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );
          
          const translateY = interpolate(wordProgress, [0, 1], [40, 0]);
          const wordOpacity = interpolate(wordProgress, [0, 1], [0, 1]);

          const wordElement = (
            <span
              key={wordIndex}
              style={{
                display: "inline-flex",
                transform: `translateY(${translateY}px)`,
                opacity: wordOpacity,
              }}
            >
              {word.split("").map((letter, idx) => {
                const currentLetterIndex = letterIndex + idx;
                const letterStartFrame = currentLetterIndex * framesPerLetter;
                
                const letterOpacity = interpolate(
                  frame,
                  [letterStartFrame, letterStartFrame + 5],
                  [0, 1],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }
                );

                return (
                  <span
                    key={idx}
                    style={{
                      color: "#ffffff",
                      fontSize: "72px",
                      fontWeight: "bold",
                      fontFamily: "system-ui, sans-serif",
                      opacity: letterOpacity,
                    }}
                  >
                    {letter}
                  </span>
                );
              })}
            </span>
          );

          letterIndex += word.length;
          return wordElement;
        })}
      </div>
    </AbsoluteFill>
  );
};

// Second final text - animates in
const FinalMotionText2: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const text = "AI handles the placement";
  const words = text.split(" ");
  
  const ANIMATION_DURATION = 30;
  
  const scale = interpolate(
    frame,
    [0, duration],
    [1.0, 1.1],
    {
      easing: Easing.inOut(Easing.cubic),
      extrapolateRight: "clamp",
    }
  );

  const totalLetters = text.replace(/ /g, "").length;
  const framesPerLetter = ANIMATION_DURATION / totalLetters;
  
  let letterIndex = 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
          padding: "40px",
          maxWidth: "900px",
        }}
      >
        {words.map((word, wordIndex) => {
          const wordStartFrame = letterIndex * framesPerLetter;
          
          const wordProgress = interpolate(
            frame,
            [wordStartFrame, wordStartFrame + 10],
            [0, 1],
            {
              easing: Easing.out(Easing.cubic),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );
          
          const translateY = interpolate(wordProgress, [0, 1], [40, 0]);
          const wordOpacity = interpolate(wordProgress, [0, 1], [0, 1]);

          const wordElement = (
            <span
              key={wordIndex}
              style={{
                display: "inline-flex",
                transform: `translateY(${translateY}px)`,
                opacity: wordOpacity,
              }}
            >
              {word.split("").map((letter, idx) => {
                const currentLetterIndex = letterIndex + idx;
                const letterStartFrame = currentLetterIndex * framesPerLetter;
                
                const letterOpacity = interpolate(
                  frame,
                  [letterStartFrame, letterStartFrame + 5],
                  [0, 1],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }
                );

                return (
                  <span
                    key={idx}
                    style={{
                      color: "#ffffff",
                      fontSize: "72px",
                      fontWeight: "bold",
                      fontFamily: "system-ui, sans-serif",
                      opacity: letterOpacity,
                    }}
                  >
                    {letter}
                  </span>
                );
              })}
            </span>
          );

          letterIndex += word.length;
          return wordElement;
        })}
      </div>
    </AbsoluteFill>
  );
};

// Logo outro - fast scale in, then fade out
const LogoOutro: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  
  const SCALE_DURATION = 20;
  const FADE_OUT_START = 60;
  
  const scale = interpolate(
    frame,
    [0, SCALE_DURATION],
    [2.0, 1.2],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateRight: "clamp",
    }
  );
  
  const opacity = interpolate(
    frame,
    [0, 8, FADE_OUT_START, duration],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={staticFile("darwin-studio-logo-white.svg")}
        alt="Darwin Studio"
        style={{
          width: "80%",
          maxWidth: "600px",
          transform: `scale(${scale})`,
          opacity,
        }}
      />
    </AbsoluteFill>
  );
};

// URL slide in from bottom
const UrlSlideIn: React.FC = () => {
  const frame = useCurrentFrame();
  
  const SLIDE_DURATION = 6;
  
  const translateY = interpolate(
    frame,
    [0, SLIDE_DURATION],
    [100, 0],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateRight: "clamp",
    }
  );
  
  const opacity = interpolate(
    frame,
    [0, SLIDE_DURATION],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontFamily,
          fontWeight: 600,
          fontSize: "48px",
          color: "#ffffff",
          transform: `translateY(${translateY}px)`,
          opacity,
        }}
      >
        studio.darwin.so
      </span>
    </AbsoluteFill>
  );
};
