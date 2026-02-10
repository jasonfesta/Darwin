import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, Video, interpolate, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily: interFont } = loadFont();

// =============================================================================
// SCENE CONFIGURATION - Edit clips and durations here
// =============================================================================

// Part 1: Intro
const scene1 = { name: "Intro", clip: "2-11-update-intro-9x16-new.mp4", duration: 180 };
const scene2 = { name: "Main Title", clip: "2-11-update-main-title-9x16.mp4", duration: 120 };

// Part 2: Brand Section
const scene3 = { name: "Brand Title 1", clip: "2-11-update-large-title-9x16.mp4", duration: 120 };
const scene4 = { name: "Brand Title 2", clip: "small-title-9x16-new.mp4", duration: 120 };
const scene5 = { name: "Brand Step 1", clip: "rotato-brand-9x16.mp4", duration: 150 };
const scene6 = { name: "Brand Title 3", clip: "small-title-9x16-2-new.mp4", duration: 120 };
const scene7 = { name: "Brand Step 2", clip: "rotato-brand-step2-9x16.mp4", duration: 150 };
const scene8 = { name: "Brand Title 4", clip: "small-title-9x16-3-new.mp4", duration: 120 };
const scene9 = { name: "Brand Step 3", clip: "rotato-brand-step3-9x16.mp4", duration: 150 };
const scene10 = { name: "Brand Title 5", clip: "large-title-9x16-2.mp4", duration: 120 };

// Part 3: Creator Section
const scene11 = { name: "Creator Title 1", clip: "small-title-9x16-scene11.mp4", duration: 120 };
const scene12 = { name: "Creator Step 1", clip: "rotato-brand-9x16.mp4", duration: 150 };
const scene13 = { name: "Creator Title 2", clip: "small-title-9x16-scene13.mp4", duration: 120 };
const scene14 = { name: "Creator Step 2", clip: "rotato-brand-step2-9x16.mp4", duration: 150 };
const scene15 = { name: "Creator Title 3", clip: "small-title-9x16-scene15.mp4", duration: 120 };
const scene16 = { name: "Creator Step 3", clip: "rotato-brand-step3-9x16.mp4", duration: 150 };
const scene17 = { name: "Creator Title 4", clip: "large-title-9x16-3.mp4", duration: 120 };
const scene18 = { name: "Creator Title 5", clip: "small-title-9x16-4.mp4", duration: 120 };

// Part 4: Brand Demos
const scene20 = { name: "Brand Demo 1", clipTop: "ads-studio-brands-scene5.mp4", clipBottom: "ads-studio-brands-stacked1-top.mp4", duration: 140, isStacked: true };
const scene21 = { name: "Brand Demo 2", clipTop: "scene20-after.mov", clipBottom: "scene20-before.mov", duration: 125, isStacked: true };
const scene22 = { name: "Brand Demo 3", clipTop: "scene21-after.mp4", clipBottom: "scene21-before.mov", duration: 125, isStacked: true };

// Part 5: Creator Demos
const scene23 = { name: "Creator Demo Title", clip: "small-title-9x16-5.mp4", duration: 120 };
const scene24 = { name: "Creator Demo 1", clipTop: "scene24-before.mov", clipBottom: "scene24-after.mp4", duration: 140, isStacked: true };
const scene25 = { name: "Creator Demo 2", clipTop: "scene25-before.mov", clipBottom: "scene25-after.mp4", duration: 80, isStacked: true };
const scene26 = { name: "Creator Demo 3", clipTop: "scene26-before.mov", clipBottom: "scene26-after.mp4", duration: 125, isStacked: true };

// Part 6: Outro
const scene27 = { name: "Domain", clip: "domain-9x16.mp4", duration: 120 };
const scene28 = { name: "Outro", clip: "outro-9x16-2.mp4", duration: 90 };

// =============================================================================
// AUDIO
// =============================================================================
const music = "2-11-update-music.mp3";

// =============================================================================
// AUTO-CALCULATED TIMINGS (do not edit)
// =============================================================================
const scenes = [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8, scene9, scene10, scene11, scene12, scene13, scene14, scene15, scene16, scene17, scene18, scene20, scene21, scene22, scene23, scene24, scene25, scene26, scene27, scene28];

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
const StepTitle: React.FC<{ text: string; duration: number }> = ({ text, duration }) => {
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
        alignItems: "center",
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

// Intro scene with quick audio fade-in
const IntroScene: React.FC<{ clip: string }> = ({ clip }) => {
  const frame = useCurrentFrame();
  const fadeInFrames = 10; // ~0.33 seconds
  
  const volume = interpolate(
    frame,
    [0, fadeInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  
  return <Video src={staticFile(clip)} volume={volume} />;
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
        Demo Paid Advertisement
      </span>
    </div>
  );
};

// Stacked videos - top and bottom for 9x16
const StackedScene: React.FC<{ clipTop: string; clipBottom: string; objectPosition?: string; audioFrom?: "top" | "bottom" }> = ({ clipTop, clipBottom, objectPosition = "center center", audioFrom = "bottom" }) => {
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
      
      {/* Demo Paid Advertisement */}
      <DemoPlacementText />
    </AbsoluteFill>
  );
};

// =============================================================================
// COMPONENT
// =============================================================================
export const Update211_9x16: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Scene timing
  const scene2Start = getStartTime(1);
  const fadeFrames = 15; // 0.5 second fade
  
  // Stacked scenes timing for audio ducking (scenes 20-22 and 24-26)
  const scene20Start = getStartTime(18);
  const scene22End = getStartTime(20) + scene22.duration;
  const scene24Start = getStartTime(22);
  const scene26End = getStartTime(24) + scene26.duration;
  
  // Fade out timing (last 2 seconds = 60 frames)
  const fadeOutStart = TOTAL_DURATION - 60;
  
  // Quick fade in at start (10 frames = ~0.33 seconds)
  const fadeInFrames = 10;
  const fadeInVolume = interpolate(
    frame,
    [0, fadeInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  
  // Duck during intro (scene 1) - fade up to full volume at scene 2
  const introVolume = interpolate(
    frame,
    [0, scene2Start - fadeFrames, scene2Start],
    [0.15, 0.15, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  
  // Calculate background music volume - duck during stacked scenes 20-25, fade out at end
  // Duck for brand demos (scenes 20-22)
  const duckVolume1 = interpolate(
    frame,
    [
      scene20Start - fadeFrames,
      scene20Start,
      scene22End,
      scene22End + fadeFrames,
    ],
    [1, 0.15, 0.15, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  
  // Duck for creator demos (scenes 24-26)
  const duckVolume2 = interpolate(
    frame,
    [
      scene24Start - fadeFrames,
      scene24Start,
      scene26End,
      scene26End + fadeFrames,
    ],
    [1, 0.15, 0.15, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  
  const duckVolume = Math.min(duckVolume1, duckVolume2);
  
  // Fade out at the end
  const fadeOutVolume = interpolate(
    frame,
    [fadeOutStart, TOTAL_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  
  const musicVolume = fadeInVolume * introVolume * duckVolume * fadeOutVolume;
  
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Background Music - ducks during stacked scene */}
      <Audio src={staticFile(music)} volume={musicVolume} />

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
        <FadeWrapper duration={scene3.duration}>
          <Video src={staticFile(scene3.clip)} />
        </FadeWrapper>
      </Sequence>

      {/* Scene 4 */}
      <Sequence name={`Scene 4: ${scene4.name}`} from={getStartTime(3)} durationInFrames={scene4.duration}>
        <FadeWrapper duration={scene4.duration}>
          <Video src={staticFile(scene4.clip)} />
        </FadeWrapper>
      </Sequence>

      {/* Scene 5 */}
      <Sequence name={`Scene 5: ${scene5.name}`} from={getStartTime(4)} durationInFrames={scene5.duration}>
        <Video src={staticFile(scene5.clip)} />
        <StepTitle text="Step One: Info Lookup & Asset Upload" duration={scene5.duration} />
      </Sequence>

      {/* Scene 6 */}
      <Sequence name={`Scene 6: ${scene6.name}`} from={getStartTime(5)} durationInFrames={scene6.duration}>
        <FadeWrapper duration={scene6.duration}>
          <Video src={staticFile(scene6.clip)} />
        </FadeWrapper>
      </Sequence>

      {/* Scene 7 */}
      <Sequence name={`Scene 7: ${scene7.name}`} from={getStartTime(6)} durationInFrames={scene7.duration}>
        <Video src={staticFile(scene7.clip)} />
        <StepTitle text="Step Two: Placement Previews & Brand Preferences" duration={scene7.duration} />
      </Sequence>

      {/* Scene 8 */}
      <Sequence name={`Scene 8: ${scene8.name}`} from={getStartTime(7)} durationInFrames={scene8.duration}>
        <FadeWrapper duration={scene8.duration}>
          <Video src={staticFile(scene8.clip)} />
        </FadeWrapper>
      </Sequence>

      {/* Scene 9 */}
      <Sequence name={`Scene 9: ${scene9.name}`} from={getStartTime(8)} durationInFrames={scene9.duration}>
        <Video src={staticFile(scene9.clip)} />
        <StepTitle text="Step Three: Campaign Creation" duration={scene9.duration} />
      </Sequence>

      {/* Scene 10 */}
      <Sequence name={`Scene 10: ${scene10.name}`} from={getStartTime(9)} durationInFrames={scene10.duration}>
        <FadeWrapper duration={scene10.duration}>
          <Video src={staticFile(scene10.clip)} />
        </FadeWrapper>
      </Sequence>

      {/* Scene 11 */}
      <Sequence name={`Scene 11: ${scene11.name}`} from={getStartTime(10)} durationInFrames={scene11.duration}>
        <FadeWrapper duration={scene11.duration}>
          <Video src={staticFile(scene11.clip)} />
        </FadeWrapper>
      </Sequence>

      {/* Scene 12 */}
      <Sequence name={`Scene 12: ${scene12.name}`} from={getStartTime(11)} durationInFrames={scene12.duration}>
        <Video src={staticFile(scene12.clip)} />
        <StepTitle text="Step One: Profile Lookup & Account Syncing" duration={scene12.duration} />
      </Sequence>

      {/* Scene 13 */}
      <Sequence name={`Scene 13: ${scene13.name}`} from={getStartTime(12)} durationInFrames={scene13.duration}>
        <FadeWrapper duration={scene13.duration}>
          <Video src={staticFile(scene13.clip)} />
        </FadeWrapper>
      </Sequence>

      {/* Scene 14 */}
      <Sequence name={`Scene 14: ${scene14.name}`} from={getStartTime(13)} durationInFrames={scene14.duration}>
        <Video src={staticFile(scene14.clip)} />
        <StepTitle text="Step Two: Ad Slot Previews & Creator Preferences" duration={scene14.duration} />
      </Sequence>

      {/* Scene 15 */}
      <Sequence name={`Scene 15: ${scene15.name}`} from={getStartTime(14)} durationInFrames={scene15.duration}>
        <FadeWrapper duration={scene15.duration}>
          <Video src={staticFile(scene15.clip)} />
        </FadeWrapper>
      </Sequence>

      {/* Scene 16 */}
      <Sequence name={`Scene 16: ${scene16.name}`} from={getStartTime(15)} durationInFrames={scene16.duration}>
        <Video src={staticFile(scene16.clip)} />
        <StepTitle text="Step Three: Ad Slot Creation" duration={scene16.duration} />
      </Sequence>

      {/* Scene 17 */}
      <Sequence name={`Scene 17: ${scene17.name}`} from={getStartTime(16)} durationInFrames={scene17.duration}>
        <FadeWrapper duration={scene17.duration}>
          <Video src={staticFile(scene17.clip)} />
        </FadeWrapper>
      </Sequence>

      {/* Scene 18 */}
      <Sequence name={`Scene 18: ${scene18.name}`} from={getStartTime(17)} durationInFrames={scene18.duration}>
        <FadeWrapper duration={scene18.duration}>
          <Video src={staticFile(scene18.clip)} />
        </FadeWrapper>
      </Sequence>

      {/* Scene 20 */}
      <Sequence name={`Scene 20: ${scene20.name}`} from={getStartTime(18)} durationInFrames={scene20.duration}>
        <StackedScene clipTop={scene20.clipTop} clipBottom={scene20.clipBottom} />
      </Sequence>

      {/* Scene 21 */}
      <Sequence name={`Scene 21: ${scene21.name}`} from={getStartTime(19)} durationInFrames={scene21.duration}>
        <StackedScene clipTop={scene21.clipTop} clipBottom={scene21.clipBottom} objectPosition="center top" />
      </Sequence>

      {/* Scene 22 */}
      <Sequence name={`Scene 22: ${scene22.name}`} from={getStartTime(20)} durationInFrames={scene22.duration}>
        <StackedScene clipTop={scene22.clipTop} clipBottom={scene22.clipBottom} objectPosition="center top" />
      </Sequence>

      {/* Scene 23 - Creator Title */}
      <Sequence name={`Scene 23: ${scene23.name}`} from={getStartTime(21)} durationInFrames={scene23.duration}>
        <FadeWrapper duration={scene23.duration}>
          <Video src={staticFile(scene23.clip)} />
        </FadeWrapper>
      </Sequence>

      {/* Scene 24 */}
      <Sequence name={`Scene 24: ${scene24.name}`} from={getStartTime(22)} durationInFrames={scene24.duration}>
        <StackedScene clipTop={scene24.clipTop} clipBottom={scene24.clipBottom} />
      </Sequence>

      {/* Scene 25 */}
      <Sequence name={`Scene 25: ${scene25.name}`} from={getStartTime(23)} durationInFrames={scene25.duration}>
        <StackedScene clipTop={scene25.clipTop} clipBottom={scene25.clipBottom} objectPosition="center top" />
      </Sequence>

      {/* Scene 26 */}
      <Sequence name={`Scene 26: ${scene26.name}`} from={getStartTime(24)} durationInFrames={scene26.duration}>
        <StackedScene clipTop={scene26.clipTop} clipBottom={scene26.clipBottom} objectPosition="center top" />
      </Sequence>

      {/* Scene 27 - Domain */}
      <Sequence name={`Scene 27: ${scene27.name}`} from={getStartTime(25)} durationInFrames={scene27.duration}>
        <Video src={staticFile(scene27.clip)} />
      </Sequence>

      {/* Scene 28 - Outro */}
      <Sequence name={`Scene 28: ${scene28.name}`} from={getStartTime(26)} durationInFrames={scene28.duration}>
        <Video src={staticFile(scene28.clip)} />
      </Sequence>
    </AbsoluteFill>
  );
};
