import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, Video, OffthreadVideo, interpolate, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily: interFont } = loadFont();

// =============================================================================
// SCENE CONFIGURATION - Edit clips and durations here
// =============================================================================

// Part 1: Intro
const scene1 = { name: "Intro", clip: "2-11-update-intro-9x16-new.mp4", duration: 180 };
const scene2 = { name: "Main Title", clip: "main-title-9x16-new.mp4", duration: 120 };
const scene3 = { name: "Update Title", clip: "update-title-9x16.mp4", duration: 120 };

// Part 2: Brand Section
const scene4 = { name: "Brand Title 1", clip: "main-title-9x16-8.mp4", duration: 120 };
const scene5 = { name: "Brand Title 2", clip: "small-title-9x16-new.mp4", duration: 120 };
const scene6 = { name: "Brand Step 1", clip: "step-1-brands-001.mov", duration: 420 };
const scene7 = { name: "Brand Title 3", clip: "small-title-9x16-2-new.mp4", duration: 120 };
const scene8 = { name: "Brand Step 2", clip: "step-1-brands-002-new2.mov", duration: 420 };
const scene9 = { name: "Brand Title 4", clip: "small-title-9x16-3-new.mp4", duration: 120 };
const scene10 = { name: "Brand Step 3", clip: "step-1-brands-003.mov", duration: 300 };
const scene11 = { name: "Brand Title 5", clip: "main-title-9x16-7.mp4", duration: 120 };

// Part 3: Creator Section
const scene12 = { name: "Creator Title 1", clip: "step-title-9x16.mp4", duration: 120 };
const scene13 = { name: "Creator Step 1", clip: "step-1-creators-001-new.mov", duration: 360 };
const scene14 = { name: "Creator Title 2", clip: "step-title-9x16-1.mp4", duration: 120 };
const scene15 = { name: "Creator Step 2", clip: "step-1-creators-002.mov", duration: 300 };
const scene16 = { name: "Creator Title 3", clip: "step-title-9x16-2.mp4", duration: 120 };
const scene17 = { name: "Creator Step 3", clip: "step-1-creators-003-new.mov", duration: 165 };
const scene18 = { name: "Creator Title 4", clip: "main-title-9x16-6.mp4", duration: 120 };
const scene19 = { name: "Creator Title 5", clip: "example-title-9x16-2.mp4", duration: 120 };

// Part 4: Brand Demos
const scene20 = { name: "Brand Demo 1", clip: "main-title-16x9-38.mp4", duration: 120 };
const scene21 = { name: "Brand Demo 2", clip: "main-title-16x9-39.mp4", duration: 120 };
const scene22 = { name: "Brand Demo 3", clip: "main-title-16x9-45.mp4", duration: 120 };

// Part 5: Creator Demos
const scene23 = { name: "Creator Demo Title", clip: "example-title-9x16-3.mp4", duration: 120 };
const scene24 = { name: "Creator Demo 1", clip: "main-title-16x9-41.mp4", duration: 120 };
const scene25 = { name: "Creator Demo 2", clip: "main-title-16x9-42.mp4", duration: 120 };
const scene26 = { name: "Creator Demo 3", clip: "main-title-16x9-43.mp4", duration: 120 };

// Part 6: Outro
const scene27 = { name: "Domain", clip: "domain-9x16-new.mp4", duration: 120 };
const scene28 = { name: "Outro", clip: "outro-9x16-new.mp4", duration: 90 };

// =============================================================================
// AUDIO
// =============================================================================
const music = "soft-machine-aurora.mp3";

// =============================================================================
// AUTO-CALCULATED TIMINGS (do not edit)
// =============================================================================
const scenes = [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8, scene9, scene10, scene11, scene12, scene13, scene14, scene15, scene16, scene17, scene18, scene19, scene20, scene21, scene22, scene23, scene24, scene25, scene26, scene27, scene28];

const getStartTime = (sceneIndex: number) => {
  return scenes.slice(0, sceneIndex).reduce((acc, s) => acc + s.duration, 0);
};

const TOTAL_DURATION = scenes.reduce((acc, s) => acc + s.duration, 0);

// =============================================================================
// STACKED SCENE COMPONENTS (9x16 - top and bottom)
// =============================================================================
// Before/After label for stacked videos (top and bottom in 9x16)
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

// Fade wrapper for title scenes
const FadeWrapper: React.FC<{ children: React.ReactNode; duration: number }> = ({ children, duration }) => {
  const frame = useCurrentFrame();
  const fadeFrames = 15; // 0.5 second fade
  
  const opacity = interpolate(
    frame,
    [0, fadeFrames, duration - fadeFrames, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  
  return (
    <AbsoluteFill style={{ opacity }}>
      {children}
    </AbsoluteFill>
  );
};

// Step title with fade in/out animation
const StepTitle: React.FC<{ text: string; duration: number; bottom?: number }> = ({ text, duration, bottom }) => {
  const frame = useCurrentFrame();
  const fadeFrames = 15; // 0.5 second fade
  
  const opacity = interpolate(
    frame,
    [0, fadeFrames, duration - fadeFrames, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: bottom !== undefined ? "flex-end" : "center",
        paddingBottom: bottom,
        opacity,
      }}
    >
      <span
        style={{
          fontFamily: interFont,
          fontSize: 40,
          fontWeight: 600,
          color: "white",
          textShadow: "0px 2px 8px #0a0a0a",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        {text}
      </span>
    </div>
  );
};

// Step caption - lower left, Inter semi-bold, 38px with bottom gradient
const StepCaption: React.FC<{ text: string }> = ({ text }) => {
  return (
    <>
      {/* Bottom gradient */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background: "linear-gradient(to top, #0a0a0a 0%, rgba(10, 10, 10, 0) 100%)",
        }}
      />
      {/* Caption text */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: 50,
        }}
      >
        <span
          style={{
            fontFamily: interFont,
            fontSize: 38,
            fontWeight: 600,
            color: "white",
          }}
        >
          {text}
        </span>
      </div>
    </>
  );
};

// Intro scene with quick audio fade-in
// Uses OffthreadVideo to ensure the first frame is visible immediately (no black frame)
const IntroScene: React.FC<{ clip: string }> = ({ clip }) => {
  const frame = useCurrentFrame();
  const fadeInFrames = 10; // ~0.33 seconds
  
  const volume = interpolate(
    frame,
    [0, fadeInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  
  return <OffthreadVideo src={staticFile(clip)} volume={volume} />;
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
          fontSize: 36,
          fontWeight: 600,
          color: "white",
        }}
      >
        Includes Demo Paid Advertisement
      </span>
    </div>
  );
};

// Centered 16x9 video wrapper - displays 16x9 videos at 1080px width, horizontally centered
const Centered16x9Video: React.FC<{ clip: string; playbackRate?: number; muted?: boolean }> = ({ clip, playbackRate, muted }) => {
  // 1080 width at 16:9 aspect ratio = 607.5 height
  const videoWidth = 1080;
  const videoHeight = Math.round(videoWidth * (9 / 16)); // 608
  
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: videoWidth,
          height: videoHeight,
          overflow: "hidden",
        }}
      >
        <Video
          src={staticFile(clip)}
          playbackRate={playbackRate}
          muted={muted}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

// Stacked videos - top and bottom for 9x16
const StackedScene: React.FC<{ clipTop: string; clipBottom: string; objectPosition?: string; audioFrom?: "top" | "bottom" | "none" }> = ({ clipTop, clipBottom, objectPosition = "center center", audioFrom = "bottom" }) => {
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
          muted={audioFrom !== "top"}
          volume={audioFrom === "top" ? 0.65 : undefined}
          src={staticFile(clipTop)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition,
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
          muted={audioFrom !== "bottom"}
          volume={audioFrom === "bottom" ? 0.65 : undefined}
          src={staticFile(clipBottom)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition,
          }}
        />
      </div>

      {/* Before/After labels */}
      <VideoLabel label="Before" position="top" />
      <VideoLabel label="After" position="bottom" />
      
      {/* Includes Demo Paid Advertisement */}
      <DemoPlacementText />
    </AbsoluteFill>
  );
};

// =============================================================================
// COMPONENT
// =============================================================================
export const Update211_9x16: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Fade out timing (last 10 seconds = 300 frames for very gradual fade out)
  const fadeOutStart = TOTAL_DURATION - 300;
  
  // Smooth fade in at music start (30 frames = 1 second)
  const fadeInFrames = 30;
  const fadeInVolume = interpolate(
    frame,
    [0, fadeInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: (t) => t * t * (3 - 2 * t) }
  );
  
  // Slow fade out at the end (5 seconds)
  const fadeOutVolume = interpolate(
    frame,
    [fadeOutStart, TOTAL_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: (t) => t * t * (3 - 2 * t) }
  );
  
  const musicVolume = fadeInVolume * fadeOutVolume;
  
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Background Music - starts at 0:00, extends to end */}
      <Sequence from={0} durationInFrames={TOTAL_DURATION}>
        <Audio src={staticFile(music)} volume={musicVolume} />
      </Sequence>

      {/* Scene 1 */}
      <Sequence name={`Scene 1: ${scene1.name}`} from={getStartTime(0)} durationInFrames={scene1.duration}>
        <IntroScene clip={scene1.clip} />
        <DemoPlacementText />
      </Sequence>

      {/* Scene 2 */}
      <Sequence name={`Scene 2: ${scene2.name}`} from={getStartTime(1)} durationInFrames={scene2.duration}>
        <Video src={staticFile(scene2.clip)} />
      </Sequence>

      {/* Scene 3 */}
      <Sequence name={`Scene 3: ${scene3.name}`} from={getStartTime(2)} durationInFrames={scene3.duration}>
        <Video src={staticFile(scene3.clip)} />
      </Sequence>

      {/* Scene 4 */}
      <Sequence name={`Scene 4: ${scene4.name}`} from={getStartTime(3)} durationInFrames={scene4.duration}>
        <Video src={staticFile(scene4.clip)} />
      </Sequence>

      {/* Scene 5 */}
      <Sequence name={`Scene 5: ${scene5.name}`} from={getStartTime(4)} durationInFrames={scene5.duration}>
        <FadeWrapper duration={scene5.duration}>
          <Video src={staticFile(scene5.clip)} />
        </FadeWrapper>
      </Sequence>

      {/* Scene 6 */}
      <Sequence name={`Scene 6: ${scene6.name}`} from={getStartTime(5)} durationInFrames={scene6.duration}>
        <Centered16x9Video clip={scene6.clip} />
        <StepCaption text="Step One: Info Lookup & Asset Upload" />
      </Sequence>

      {/* Scene 7 */}
      <Sequence name={`Scene 7: ${scene7.name}`} from={getStartTime(6)} durationInFrames={scene7.duration}>
        <FadeWrapper duration={scene7.duration}>
          <Video src={staticFile(scene7.clip)} />
        </FadeWrapper>
      </Sequence>

      {/* Scene 8 */}
      <Sequence name={`Scene 8: ${scene8.name}`} from={getStartTime(7)} durationInFrames={scene8.duration}>
        <Centered16x9Video clip={scene8.clip} />
        <StepCaption text="Step Two: Placement Previews & Brand Preferences" />
      </Sequence>

      {/* Scene 9 */}
      <Sequence name={`Scene 9: ${scene9.name}`} from={getStartTime(8)} durationInFrames={scene9.duration}>
        <FadeWrapper duration={scene9.duration}>
          <Video src={staticFile(scene9.clip)} />
        </FadeWrapper>
      </Sequence>

      {/* Scene 10 */}
      <Sequence name={`Scene 10: ${scene10.name}`} from={getStartTime(9)} durationInFrames={scene10.duration}>
        <Centered16x9Video clip={scene10.clip} playbackRate={2.5} />
        <StepCaption text="Step Three: Campaign Creation" />
      </Sequence>

      {/* Scene 11 */}
      <Sequence name={`Scene 11: ${scene11.name}`} from={getStartTime(10)} durationInFrames={scene11.duration}>
        <FadeWrapper duration={scene11.duration}>
          <Video src={staticFile(scene11.clip)} />
        </FadeWrapper>
      </Sequence>

      {/* Scene 12 */}
      <Sequence name={`Scene 12: ${scene12.name}`} from={getStartTime(11)} durationInFrames={scene12.duration}>
        <FadeWrapper duration={scene12.duration}>
          <Video src={staticFile(scene12.clip)} />
        </FadeWrapper>
      </Sequence>

      {/* Scene 13 */}
      <Sequence name={`Scene 13: ${scene13.name}`} from={getStartTime(12)} durationInFrames={scene13.duration}>
        <Centered16x9Video clip={scene13.clip} playbackRate={1.5} />
        <StepCaption text="Step One: Account Verification" />
      </Sequence>

      {/* Scene 14 */}
      <Sequence name={`Scene 14: ${scene14.name}`} from={getStartTime(13)} durationInFrames={scene14.duration}>
        <FadeWrapper duration={scene14.duration}>
          <Video src={staticFile(scene14.clip)} />
        </FadeWrapper>
      </Sequence>

      {/* Scene 15 */}
      <Sequence name={`Scene 15: ${scene15.name}`} from={getStartTime(14)} durationInFrames={scene15.duration}>
        <Centered16x9Video clip={scene15.clip} playbackRate={2} />
        <StepCaption text="Step Two: Creator Preferences" />
      </Sequence>

      {/* Scene 16 */}
      <Sequence name={`Scene 16: ${scene16.name}`} from={getStartTime(15)} durationInFrames={scene16.duration}>
        <FadeWrapper duration={scene16.duration}>
          <Video src={staticFile(scene16.clip)} />
        </FadeWrapper>
      </Sequence>

      {/* Scene 17 */}
      <Sequence name={`Scene 17: ${scene17.name}`} from={getStartTime(16)} durationInFrames={scene17.duration}>
        <Centered16x9Video clip={scene17.clip} playbackRate={2} />
        <StepCaption text="Step Three: Upload Video & Monetize" />
      </Sequence>

      {/* Scene 18 */}
      <Sequence name={`Scene 18: ${scene18.name}`} from={getStartTime(17)} durationInFrames={scene18.duration}>
        <FadeWrapper duration={scene18.duration}>
          <Video src={staticFile(scene18.clip)} />
        </FadeWrapper>
      </Sequence>

      {/* Scene 19 */}
      <Sequence name={`Scene 19: ${scene19.name}`} from={getStartTime(18)} durationInFrames={scene19.duration}>
        <FadeWrapper duration={scene19.duration}>
          <Video src={staticFile(scene19.clip)} />
        </FadeWrapper>
      </Sequence>

      {/* Scene 20 */}
      <Sequence name={`Scene 20: ${scene20.name}`} from={getStartTime(19)} durationInFrames={scene20.duration}>
        <Centered16x9Video clip={scene20.clip} />
      </Sequence>

      {/* Scene 21 */}
      <Sequence name={`Scene 21: ${scene21.name}`} from={getStartTime(20)} durationInFrames={scene21.duration}>
        <Centered16x9Video clip={scene21.clip} muted />
      </Sequence>

      {/* Scene 22 */}
      <Sequence name={`Scene 22: ${scene22.name}`} from={getStartTime(21)} durationInFrames={scene22.duration}>
        <Centered16x9Video clip={scene22.clip} muted />
      </Sequence>

      {/* Scene 23 */}
      <Sequence name={`Scene 23: ${scene23.name}`} from={getStartTime(22)} durationInFrames={scene23.duration}>
        <FadeWrapper duration={scene23.duration}>
          <Video src={staticFile(scene23.clip)} />
        </FadeWrapper>
      </Sequence>

      {/* Scene 24 */}
      <Sequence name={`Scene 24: ${scene24.name}`} from={getStartTime(23)} durationInFrames={scene24.duration}>
        <Centered16x9Video clip={scene24.clip} />
      </Sequence>

      {/* Scene 25 */}
      <Sequence name={`Scene 25: ${scene25.name}`} from={getStartTime(24)} durationInFrames={scene25.duration}>
        <Centered16x9Video clip={scene25.clip} />
      </Sequence>

      {/* Scene 26 */}
      <Sequence name={`Scene 26: ${scene26.name}`} from={getStartTime(25)} durationInFrames={scene26.duration}>
        <Centered16x9Video clip={scene26.clip} />
      </Sequence>

      {/* Scene 27 */}
      <Sequence name={`Scene 27: ${scene27.name}`} from={getStartTime(26)} durationInFrames={scene27.duration}>
        <Video src={staticFile(scene27.clip)} />
      </Sequence>

      {/* Scene 28 */}
      <Sequence name={`Scene 28: ${scene28.name}`} from={getStartTime(27)} durationInFrames={scene28.duration}>
        <Video src={staticFile(scene28.clip)} />
      </Sequence>
    </AbsoluteFill>
  );
};
