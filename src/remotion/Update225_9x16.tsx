import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, Video, OffthreadVideo, interpolate, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily: interFont } = loadFont();

// =============================================================================
// SCENE CONFIGURATION - Edit clips and durations here
// =============================================================================

// Part 1: Intro
const scene1 = { name: "Intro", clip: "intro-9x16-2.mp4", duration: 180 };
const scene2 = { name: "Main Title", clip: "main-title-9x16-9.mp4", duration: 120 };
const scene3 = { name: "Update Title", clip: "update-title-9x16-2.mp4", duration: 120 };
const scene4 = { name: "Main Title 2", clip: "main-title-9x16-12.mp4", duration: 120 };
const scene5 = { name: "Step Title", clip: "step-title-9x16-12.mp4", duration: 120 };
const scene6 = { name: "Home", clip: "home-ads.mp4", duration: 602 };
const scene7 = { name: "Step Title 2", clip: "step-title-9x16-4.mp4", duration: 120 };
const scene8 = { name: "Tasks", clip: "tasks-ads.mp4", duration: 599 };
const scene9 = { name: "Step Title 3", clip: "step-title-9x16-5.mp4", duration: 120 };
const scene10 = { name: "Assets", clip: "assets-ads.mp4", duration: 415 };
const scene11 = { name: "Step Title 4", clip: "step-title-9x16-15.mp4", duration: 120 };
const scene12 = { name: "Campaigns", clip: "campaigns-ads.mp4", duration: 1087 };
const scene13 = { name: "Step Title 5", clip: "step-title-9x16-6.mp4", duration: 120 };
const scene14 = { name: "Analytics", clip: "analytics-ads.mp4", duration: 260 };
const scene15 = { name: "Step Title 6", clip: "step-title-9x16-7.mp4", duration: 120 };
const scene16 = { name: "Main Title 3", clip: "main-title-9x16-13.mp4", duration: 120 };
const scene18 = { name: "Home", clip: "Home-Studio.mp4", duration: 452 };
const scene19 = { name: "Step Title 7", clip: "step-title-9x16-8.mp4", duration: 120 };
const scene20 = { name: "Tasks", clip: "tasks-studio.mp4", duration: 419 };
const scene21 = { name: "Step Title 8", clip: "step-title-9x16-9.mp4", duration: 120 };
const scene22 = { name: "Videos", clip: "Videos-Studio.mp4", duration: 598 };
const scene23 = { name: "Step Title 9", clip: "step-title-9x16-10.mp4", duration: 120 };
const scene24 = { name: "Adslots", clip: "adslots-ads.mp4", duration: 376 };
const scene25 = { name: "Step Title 10", clip: "step-title-9x16-11.mp4", duration: 120 };
const scene26 = { name: "Payouts", clip: "payouts-ads.mp4", duration: 301 };
const scene27 = { name: "Domain", clip: "domain-9x16-3.mp4", duration: 120 };
const scene28 = { name: "Outro", clip: "outro-9x16-7.mp4", duration: 90 };

// =============================================================================
// AUDIO
// =============================================================================
const music = "soft-machine-aurora.mp3";

// =============================================================================
// AUTO-CALCULATED TIMINGS (do not edit)
// =============================================================================
const scenes = [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8, scene9, scene10, scene11, scene12, scene13, scene14, scene16, scene15, scene18, scene19, scene20, scene21, scene22, scene23, scene24, scene25, scene26, scene27, scene28];

const getStartTime = (sceneIndex: number) => {
  return scenes.slice(0, sceneIndex).reduce((acc, s) => acc + s.duration, 0);
};

export const TOTAL_DURATION = scenes.reduce((acc, s) => acc + s.duration, 0);

// =============================================================================
// STACKED SCENE COMPONENTS (9x16 - top and bottom)
// =============================================================================
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

const FadeWrapper: React.FC<{ children: React.ReactNode; duration: number }> = ({ children, duration }) => {
  const frame = useCurrentFrame();
  const fadeFrames = 15;
  
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

const StepTitle: React.FC<{ text: string; duration: number; bottom?: number }> = ({ text, duration, bottom }) => {
  const frame = useCurrentFrame();
  const fadeFrames = 15;
  
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

const StepCaption: React.FC<{ text: string }> = ({ text }) => {
  return (
    <>
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

const IntroScene: React.FC<{ clip: string }> = ({ clip }) => {
  const frame = useCurrentFrame();
  const fadeInFrames = 10;
  
  const volume = interpolate(
    frame,
    [0, fadeInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  
  return <OffthreadVideo src={staticFile(clip)} volume={volume} />;
};

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

const Centered16x9Video: React.FC<{ clip: string; playbackRate?: number; muted?: boolean }> = ({ clip, playbackRate, muted }) => {
  const videoWidth = 1080;
  const videoHeight = Math.round(videoWidth * (9 / 16));
  
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
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

const StackedScene: React.FC<{ clipTop: string; clipBottom: string; objectPosition?: string; audioFrom?: "top" | "bottom" | "none" }> = ({ clipTop, clipBottom, objectPosition = "center center", audioFrom = "bottom" }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
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

      <VideoLabel label="Before" position="top" />
      <VideoLabel label="After" position="bottom" />
      
      <DemoPlacementText />
    </AbsoluteFill>
  );
};

// =============================================================================
// COMPONENT
// =============================================================================
export const Update225_9x16: React.FC = () => {
  const frame = useCurrentFrame();
  
  const fadeOutStart = TOTAL_DURATION - 90;
  
  const fadeInFrames = 30;
  const fadeInVolume = interpolate(
    frame,
    [0, fadeInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: (t) => t * t * (3 - 2 * t) }
  );
  
  const fadeOutVolume = interpolate(
    frame,
    [fadeOutStart, TOTAL_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: (t) => t * t * (3 - 2 * t) }
  );
  
  const musicVolume = fadeInVolume * fadeOutVolume;
  
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Background Music */}
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
        <Video src={staticFile(scene5.clip)} />
      </Sequence>

      {/* Scene 6 */}
      <Sequence name={`Scene 6: ${scene6.name}`} from={getStartTime(5)} durationInFrames={scene6.duration}>
        <Centered16x9Video clip={scene6.clip} />
      </Sequence>

      {/* Scene 7 */}
      <Sequence name={`Scene 7: ${scene7.name}`} from={getStartTime(6)} durationInFrames={scene7.duration}>
        <Video src={staticFile(scene7.clip)} />
      </Sequence>

      {/* Scene 8 */}
      <Sequence name={`Scene 8: ${scene8.name}`} from={getStartTime(7)} durationInFrames={scene8.duration}>
        <Centered16x9Video clip={scene8.clip} />
      </Sequence>

      {/* Scene 9 */}
      <Sequence name={`Scene 9: ${scene9.name}`} from={getStartTime(8)} durationInFrames={scene9.duration}>
        <Video src={staticFile(scene9.clip)} />
      </Sequence>

      {/* Scene 10 */}
      <Sequence name={`Scene 10: ${scene10.name}`} from={getStartTime(9)} durationInFrames={scene10.duration}>
        <Centered16x9Video clip={scene10.clip} />
      </Sequence>

      {/* Scene 11 */}
      <Sequence name={`Scene 11: ${scene11.name}`} from={getStartTime(10)} durationInFrames={scene11.duration}>
        <Video src={staticFile(scene11.clip)} />
      </Sequence>

      {/* Scene 12 */}
      <Sequence name={`Scene 12: ${scene12.name}`} from={getStartTime(11)} durationInFrames={scene12.duration}>
        <Centered16x9Video clip={scene12.clip} />
      </Sequence>

      {/* Scene 13 */}
      <Sequence name={`Scene 13: ${scene13.name}`} from={getStartTime(12)} durationInFrames={scene13.duration}>
        <Video src={staticFile(scene13.clip)} />
      </Sequence>

      {/* Scene 14 */}
      <Sequence name={`Scene 14: ${scene14.name}`} from={getStartTime(13)} durationInFrames={scene14.duration}>
        <Centered16x9Video clip={scene14.clip} />
      </Sequence>

      {/* Scene 15 */}
      <Sequence name={`Scene 15: ${scene16.name}`} from={getStartTime(14)} durationInFrames={scene16.duration}>
        <Video src={staticFile(scene16.clip)} />
      </Sequence>

      {/* Scene 16 */}
      <Sequence name={`Scene 16: ${scene15.name}`} from={getStartTime(15)} durationInFrames={scene15.duration}>
        <Video src={staticFile(scene15.clip)} />
      </Sequence>

      {/* Scene 17 */}
      <Sequence name={`Scene 17: ${scene18.name}`} from={getStartTime(16)} durationInFrames={scene18.duration}>
        <Centered16x9Video clip={scene18.clip} />
      </Sequence>

      {/* Scene 18 */}
      <Sequence name={`Scene 18: ${scene19.name}`} from={getStartTime(17)} durationInFrames={scene19.duration}>
        <Video src={staticFile(scene19.clip)} />
      </Sequence>

      {/* Scene 19 */}
      <Sequence name={`Scene 19: ${scene20.name}`} from={getStartTime(18)} durationInFrames={scene20.duration}>
        <Centered16x9Video clip={scene20.clip} />
      </Sequence>

      {/* Scene 20 */}
      <Sequence name={`Scene 20: ${scene21.name}`} from={getStartTime(19)} durationInFrames={scene21.duration}>
        <Video src={staticFile(scene21.clip)} />
      </Sequence>

      {/* Scene 21 */}
      <Sequence name={`Scene 21: ${scene22.name}`} from={getStartTime(20)} durationInFrames={scene22.duration}>
        <Centered16x9Video clip={scene22.clip} />
      </Sequence>

      {/* Scene 22 */}
      <Sequence name={`Scene 22: ${scene23.name}`} from={getStartTime(21)} durationInFrames={scene23.duration}>
        <Video src={staticFile(scene23.clip)} />
      </Sequence>

      {/* Scene 23 */}
      <Sequence name={`Scene 23: ${scene24.name}`} from={getStartTime(22)} durationInFrames={scene24.duration}>
        <Centered16x9Video clip={scene24.clip} />
      </Sequence>

      {/* Scene 24 */}
      <Sequence name={`Scene 24: ${scene25.name}`} from={getStartTime(23)} durationInFrames={scene25.duration}>
        <Video src={staticFile(scene25.clip)} />
      </Sequence>

      {/* Scene 25 */}
      <Sequence name={`Scene 25: ${scene26.name}`} from={getStartTime(24)} durationInFrames={scene26.duration}>
        <Centered16x9Video clip={scene26.clip} />
      </Sequence>

      {/* Scene 26 */}
      <Sequence name={`Scene 26: ${scene27.name}`} from={getStartTime(25)} durationInFrames={scene27.duration}>
        <Video src={staticFile(scene27.clip)} />
      </Sequence>

      {/* Scene 27 */}
      <Sequence name={`Scene 27: ${scene28.name}`} from={getStartTime(26)} durationInFrames={scene28.duration}>
        <Video src={staticFile(scene28.clip)} />
      </Sequence>
    </AbsoluteFill>
  );
};
