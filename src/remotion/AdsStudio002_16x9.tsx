import { AbsoluteFill, Video, Audio, staticFile, Sequence, useCurrentFrame, interpolate, Easing } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

// Scene durations in frames (30fps)
const SCENE1_DURATION = 45; // 1.5 seconds
const SCENE2A_DURATION = 38; // 1.25 seconds
const SCENE2B_DURATION = 38; // 1.25 seconds
const SCENE3_DURATION = 75; // 2.5 seconds (AGI product - pause, pan, hold)
const SCENE_TEXT_DURATION = 105; // 3.5 seconds (motion text + hold)
const SCENE4_DURATION = 112; // 3.75 seconds (stacked videos)
const SCENE5_DURATION = 45; // 1.5 seconds (full screen video)
const FINAL_TEXT_1_DURATION = 75; // 2.5 seconds (first text - in and out)
const FINAL_TEXT_2_DURATION = 60; // 2 seconds (second text)
const LOGO_OUTRO_DURATION = 90; // 3 seconds (logo outro)
const URL_SCENE_DURATION = 30; // 1 second (URL slide in)

const { fontFamily: interFont } = loadFont();

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

// Total duration for background music fade out calculation
const TOTAL_DURATION = SCENE1_DURATION + SCENE2A_DURATION + SCENE2B_DURATION + SCENE3_DURATION + SCENE_TEXT_DURATION + SCENE4_DURATION + SCENE5_DURATION + FINAL_TEXT_1_DURATION + FINAL_TEXT_2_DURATION + LOGO_OUTRO_DURATION + URL_SCENE_DURATION;

export const AdsStudio002_16x9: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Background music with fade out */}
      <BackgroundMusic />

      {/* Scene 1: Two videos side by side (0 - 1.5s) */}
      <Sequence from={0} durationInFrames={SCENE1_DURATION}>
        <AbsoluteFill>
          {/* Left video - muted */}
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
              src={staticFile("ads-studio-002-scene1-top.mp4")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center center",
              }}
            />
          </div>

          {/* Right video - audio plays from this one */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              width: "50%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Video
              src={staticFile("ads-studio-002-scene1-bottom.mp4")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center center",
              }}
            />
          </div>
          <DemoPlacementText />
          {/* Before/After labels */}
          <VideoLabel label="Before" position="left" />
          <VideoLabel label="After" position="right" />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2 */}
      <Sequence from={SCENE1_DURATION} durationInFrames={SCENE2A_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("ads-studio-002-scene2.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <DemoPlacementText />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3 */}
      <Sequence from={SCENE1_DURATION + SCENE2A_DURATION} durationInFrames={SCENE2B_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("ads-studio-002-scene3.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <DemoPlacementText />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: AGI Product - zoom out with easing - video muted, audio extended separately */}
      <Sequence from={SCENE1_DURATION + SCENE2A_DURATION + SCENE2B_DURATION} durationInFrames={SCENE3_DURATION}>
        <AGIProductZoom />
        <DemoPlacementText />
      </Sequence>

      {/* Scene 4 audio extended through motion text with fade out */}
      <Sequence from={SCENE1_DURATION + SCENE2A_DURATION + SCENE2B_DURATION} durationInFrames={SCENE3_DURATION + SCENE_TEXT_DURATION}>
        <Scene4ExtendedAudio />
      </Sequence>

      {/* Scene 4.5: Motion Text - "Monetize Unused Ad Inventory" */}
      <Sequence from={SCENE1_DURATION + SCENE2A_DURATION + SCENE2B_DURATION + SCENE3_DURATION} durationInFrames={SCENE_TEXT_DURATION}>
        <MotionText />
      </Sequence>

      {/* Scene 5: Side by side videos - right aligned */}
      <Sequence from={SCENE1_DURATION + SCENE2A_DURATION + SCENE2B_DURATION + SCENE3_DURATION + SCENE_TEXT_DURATION} durationInFrames={SCENE4_DURATION}>
        <AbsoluteFill>
          {/* Left video - muted */}
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
              src={staticFile("ads-studio-002-scene5-top.mp4")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "100% center",
              }}
            />
          </div>

          {/* Right video - audio plays from this one */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              width: "50%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Video
              src={staticFile("ads-studio-002-scene5-bottom.mp4")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "100% center",
              }}
            />
          </div>
          <DemoPlacementText />
          {/* Before/After labels */}
          <VideoLabel label="Before" position="left" />
          <VideoLabel label="After" position="right" />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 6: Full screen video */}
      <Sequence from={SCENE1_DURATION + SCENE2A_DURATION + SCENE2B_DURATION + SCENE3_DURATION + SCENE_TEXT_DURATION + SCENE4_DURATION} durationInFrames={SCENE5_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("ads-studio-002-scene7.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <DemoPlacementText />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 7: First final text - in and out */}
      <Sequence from={SCENE1_DURATION + SCENE2A_DURATION + SCENE2B_DURATION + SCENE3_DURATION + SCENE_TEXT_DURATION + SCENE4_DURATION + SCENE5_DURATION} durationInFrames={FINAL_TEXT_1_DURATION}>
        <FinalMotionText1 />
      </Sequence>

      {/* Scene 7b: Second final text */}
      <Sequence from={SCENE1_DURATION + SCENE2A_DURATION + SCENE2B_DURATION + SCENE3_DURATION + SCENE_TEXT_DURATION + SCENE4_DURATION + SCENE5_DURATION + FINAL_TEXT_1_DURATION} durationInFrames={FINAL_TEXT_2_DURATION}>
        <FinalMotionText2 />
      </Sequence>

      {/* Scene 8: Outro 1 */}
      <Sequence from={SCENE1_DURATION + SCENE2A_DURATION + SCENE2B_DURATION + SCENE3_DURATION + SCENE_TEXT_DURATION + SCENE4_DURATION + SCENE5_DURATION + FINAL_TEXT_1_DURATION + FINAL_TEXT_2_DURATION} durationInFrames={LOGO_OUTRO_DURATION}>
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

      {/* Scene 9: Outro 2 */}
      <Sequence from={SCENE1_DURATION + SCENE2A_DURATION + SCENE2B_DURATION + SCENE3_DURATION + SCENE_TEXT_DURATION + SCENE4_DURATION + SCENE5_DURATION + FINAL_TEXT_1_DURATION + FINAL_TEXT_2_DURATION + LOGO_OUTRO_DURATION} durationInFrames={URL_SCENE_DURATION}>
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

// AGI Product scene - pause on product, pan to subject, hold
const AGIProductZoom: React.FC = () => {
  const frame = useCurrentFrame();
  
  const PAUSE_DURATION = 15; // 0.5 seconds pause on product
  const PAN_END = 45; // Pan completes at 1.5 seconds, then hold
  
  // Pan from right (100%) to center (50%) after pause
  const positionX = interpolate(
    frame,
    [PAUSE_DURATION, PAN_END],
    [100, 50],
    {
      easing: Easing.inOut(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill>
      <Video
        muted
        src={staticFile("ads-studio-001-product-agi.mp4")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: `${positionX}% center`,
        }}
      />
    </AbsoluteFill>
  );
};

// Scene 4 audio extended through motion text with fade out
const Scene4ExtendedAudio: React.FC = () => {
  const frame = useCurrentFrame();
  const AUDIO_DURATION = SCENE3_DURATION + SCENE_TEXT_DURATION; // 180 frames
  const FADE_START = AUDIO_DURATION - 45; // Start fade 1.5 seconds before end
  
  const volume = interpolate(
    frame,
    [0, FADE_START, AUDIO_DURATION],
    [1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <Audio
      src={staticFile("ads-studio-001-product-agi.mp4")}
      volume={volume}
    />
  );
};

// Motion text animation - letter by letter with word slide up, then hold with scale
const MotionText: React.FC = () => {
  const frame = useCurrentFrame();
  const text = "Monetize Unused Ad Inventory";
  const words = text.split(" ");
  
  const ANIMATION_DURATION = 45; // 1.5s for letter animation
  
  // Continuous scale from 100% to 120% throughout entire scene
  const scale = interpolate(
    frame,
    [0, SCENE_TEXT_DURATION],
    [1.0, 1.2],
    {
      easing: Easing.inOut(Easing.cubic),
      extrapolateRight: "clamp",
    }
  );

  // Calculate total letters for timing (only during animation phase)
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
          gap: "24px",
          padding: "40px",
          maxWidth: "1600px",
        }}
      >
        {words.map((word, wordIndex) => {
          const wordStartFrame = letterIndex * framesPerLetter;
          
          // Word slide up animation
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
                      fontSize: "84px",
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

// First final text - animates in then fades out
const FinalMotionText1: React.FC = () => {
  const frame = useCurrentFrame();
  const text = "Brands bid on ad space in your content";
  const words = text.split(" ");
  
  const ANIMATION_DURATION = 30; // 1s for letter animation
  const FADE_OUT_START = 55; // Start fade out
  
  // Continuous scale from 100% to 110%
  const scale = interpolate(
    frame,
    [0, FINAL_TEXT_1_DURATION],
    [1.0, 1.1],
    {
      easing: Easing.inOut(Easing.cubic),
      extrapolateRight: "clamp",
    }
  );
  
  // Fade out at end
  const sceneOpacity = interpolate(
    frame,
    [FADE_OUT_START, FINAL_TEXT_1_DURATION],
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
          gap: "24px",
          padding: "40px",
          maxWidth: "1600px",
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
                      fontSize: "84px",
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
const FinalMotionText2: React.FC = () => {
  const frame = useCurrentFrame();
  const text = "AI handles the placement";
  const words = text.split(" ");
  
  const ANIMATION_DURATION = 30; // 1s for letter animation (same as first scene)
  
  // Continuous scale from 100% to 110% (same as first scene)
  const scale = interpolate(
    frame,
    [0, FINAL_TEXT_2_DURATION],
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
          gap: "24px",
          padding: "40px",
          maxWidth: "1600px",
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
                      fontSize: "84px",
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
const LogoOutro: React.FC = () => {
  const frame = useCurrentFrame();
  
  const SCALE_DURATION = 20; // Quick 0.66s scale animation
  const FADE_OUT_START = 60; // Start fade out at 2 seconds
  
  // Scale from 200% to 120% quickly then hold
  const scale = interpolate(
    frame,
    [0, SCALE_DURATION],
    [2.0, 1.2],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateRight: "clamp",
    }
  );
  
  // Quick fade in, hold, then fade out
  const opacity = interpolate(
    frame,
    [0, 8, FADE_OUT_START, LOGO_OUTRO_DURATION],
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
          width: "60%",
          maxWidth: "800px",
          transform: `scale(${scale})`,
          opacity,
        }}
      />
    </AbsoluteFill>
  );
};

// URL slide in from bottom - quick .2s slide then hold
const UrlSlideIn: React.FC = () => {
  const frame = useCurrentFrame();
  
  const SLIDE_DURATION = 6; // 0.2 seconds at 30fps
  
  // Slide up from bottom quickly then hold
  const translateY = interpolate(
    frame,
    [0, SLIDE_DURATION],
    [100, 0],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateRight: "clamp",
    }
  );
  
  // Quick fade in
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
          fontFamily: interFont,
          fontWeight: 600,
          fontSize: "56px",
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

// Background music with fade out at end
const BackgroundMusic: React.FC = () => {
  const frame = useCurrentFrame();
  
  const FADE_OUT_START = TOTAL_DURATION - 60; // Start fade 2 seconds before end
  
  const volume = interpolate(
    frame,
    [0, FADE_OUT_START, TOTAL_DURATION],
    [0.5, 0.5, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <Audio
      src={staticFile("launch-glow.mp3")}
      volume={volume}
    />
  );
};
