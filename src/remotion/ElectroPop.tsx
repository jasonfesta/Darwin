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

// Scene 3: Stacking Video Clips on White Background - Apple Motion Style
const STACKING_CLIPS = [
  { src: "clip-1.mp4", objectPosition: "center center" },
  { src: "clip-2.mp4", objectPosition: "center center" },
  { src: "clip-3.mp4", objectPosition: "center center" },
  { src: "prime-drink.mp4", objectPosition: "100% center" }, // Right aligned
];

// Different entry directions and rotations for each card
const CARD_ANIMATIONS = [
  { startX: -600, startY: -400, startRotate: -15, startRotateY: 25 },   // From top-left with tilt
  { startX: 600, startY: -300, startRotate: 12, startRotateY: -20 },    // From top-right
  { startX: -500, startY: 500, startRotate: 8, startRotateY: 15 },      // From bottom-left
  { startX: 400, startY: 400, startRotate: -10, startRotateY: -25 },    // From bottom-right
];

const StackingClip: React.FC<{
  src: string;
  clipIndex: number;
  fps: number;
  totalClips: number;
  objectPosition?: string;
}> = ({ src, clipIndex, fps, totalClips, objectPosition = "center center" }) => {
  const frame = useCurrentFrame();
  const anim = CARD_ANIMATIONS[clipIndex % CARD_ANIMATIONS.length];

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

const StackingClipsScene: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  // Scene duration for stacking clips (3.5 seconds)
  const sceneDuration = fps * 3.5;
  
  // Fast zoom at the end - starts 0.2s before cut
  const zoomStartFrame = sceneDuration - (fps * 0.2);
  const zoomDuration = fps * 0.2; // Very fast 0.2s zoom
  
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
      {STACKING_CLIPS.map((clip, index) => (
        <StackingClip
          key={index}
          src={clip.src}
          clipIndex={index}
          fps={fps}
          totalClips={STACKING_CLIPS.length}
          objectPosition={clip.objectPosition}
        />
      ))}
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

// Electro Pop Animation
export const ElectroPop: React.FC = () => {
  const { fps } = useVideoConfig();

  // Durations
  const clipDuration = fps * 0.5; // 0.5 seconds per video clip
  const textSceneDuration = fps * 1.7; // 1.7 seconds (0.8s anim + 0.5s hold + 0.4s fade)
  const verticalSceneDuration = fps * 3.5; // 3.5 seconds for stacking clips
  const extendedClipDuration = fps * 3.1; // 3.1 seconds each for 15s total
  const extendedClip3Duration = fps * 1.55; // 1.55 seconds (half of normal) for scene 8
  // Ending scene durations
  const FINAL_TEXT_1_DURATION = 75; // 2.5 seconds
  const FINAL_TEXT_2_DURATION = 60; // 2 seconds
  const LOGO_OUTRO_DURATION = 90; // 3 seconds
  const URL_SCENE_DURATION = 30; // 1 second

  // Calculate start frames
  const clip1Start = 0;
  const clip2Start = clipDuration;
  const clip3Start = clipDuration * 2;
  const scene2Start = clipDuration * 3; // After all 3 clips
  const scene3Start = scene2Start + textSceneDuration;
  const extendedClip1Start = scene3Start + verticalSceneDuration;
  const extendedClip2Start = extendedClip1Start + extendedClipDuration;
  const extendedClip3Start = extendedClip2Start + extendedClipDuration;
  const extendedClip4Start = extendedClip3Start + extendedClip3Duration; // Uses shorter duration
  
  // Ending scenes start (removed extendedClip5 and extendedClip6 to shorten by ~6 seconds)
  const finalText1Start = extendedClip4Start + extendedClipDuration;
  const finalText2Start = finalText1Start + FINAL_TEXT_1_DURATION;
  const logoStart = finalText2Start + FINAL_TEXT_2_DURATION;
  const urlStart = logoStart + LOGO_OUTRO_DURATION;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Background Music - consistent volume throughout */}
      <Audio 
        src={staticFile("half-open-door.mp3")} 
        volume={1}
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

      {/* Scene 3: Stacking Video Clips */}
      <Sequence from={scene3Start} durationInFrames={verticalSceneDuration}>
        <StackingClipsScene fps={fps} />
      </Sequence>

      {/* Extended Video Clip 1 - Static Placement */}
      <Sequence from={extendedClip1Start} durationInFrames={extendedClipDuration}>
        <VideoClipScene src="clip-1.mp4" title="Static Placement" subtitle="(poster)" />
      </Sequence>

      {/* Extended Video Clip 2 - Surface Placement */}
      <Sequence from={extendedClip2Start} durationInFrames={extendedClipDuration}>
        <VideoClipScene src="clip-2.mp4" title="Surface Placement" subtitle="(supplement)" />
      </Sequence>

      {/* Extended Video Clip 3 - Body Placement (half duration) */}
      <Sequence from={extendedClip3Start} durationInFrames={extendedClip3Duration}>
        <VideoClipScene src="clip-3.mp4" title="Body Placement" subtitle="(coat)" />
      </Sequence>

      {/* Extended Video Clip 4 - Held Placement */}
      <Sequence from={extendedClip4Start} durationInFrames={extendedClipDuration}>
        <VideoClipScene src="clip-4.mp4" title="Held Placement" subtitle="(serum)" />
      </Sequence>

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
