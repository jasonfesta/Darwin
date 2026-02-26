import { AbsoluteFill, Sequence, staticFile, Audio, useCurrentFrame, interpolate } from "remotion";
import { Video } from "remotion";

// Scene durations in frames (30fps, source videos are 60fps)
const SCENE1_DURATION = 135; // 4.5 seconds
const SCENE2_DURATION = 150; // 5 seconds
const SCENE3_DURATION = 90; // 3 seconds
const SCENE4_DURATION = 90; // 3 seconds
const SCENE5_DURATION = 95; // 3.17 seconds (Scene9 video)
const SCENE6_DURATION = 90; // 3 seconds
const SCENE7_DURATION = 150; // 5 seconds
const SCENE8_DURATION = 90; // 3 seconds
const SCENE9_DURATION = 128; // 4.25 seconds
const SCENE10_DURATION = 90; // 3 seconds (outro 1)
const SCENE11_DURATION = 90; // 3 seconds (outro 2)

// Total duration for fade out calculation
const TOTAL_DURATION = SCENE1_DURATION + SCENE2_DURATION + SCENE3_DURATION + SCENE4_DURATION + SCENE5_DURATION + SCENE6_DURATION + SCENE7_DURATION + SCENE8_DURATION + SCENE9_DURATION + SCENE10_DURATION + SCENE11_DURATION;

export const MobilePhones_9x16: React.FC = () => {
  // Calculate scene start times
  const scene1Start = 0;
  const scene2Start = scene1Start + SCENE1_DURATION;
  const scene3Start = scene2Start + SCENE2_DURATION;
  const scene4Start = scene3Start + SCENE3_DURATION;
  const scene5Start = scene4Start + SCENE4_DURATION;
  const scene6Start = scene5Start + SCENE5_DURATION;
  const scene7Start = scene6Start + SCENE6_DURATION;
  const scene8Start = scene7Start + SCENE7_DURATION;
  const scene9Start = scene8Start + SCENE8_DURATION;
  const scene10Start = scene9Start + SCENE9_DURATION;
  const scene11Start = scene10Start + SCENE10_DURATION;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Background music with fade out */}
      <BackgroundMusic />

      {/* Scene 1 */}
      <Sequence name="Scene 1" from={scene1Start} durationInFrames={SCENE1_DURATION}>
        <AbsoluteFill>
          <Video
            volume={0.65}
            src={staticFile("intro-9-16.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2 */}
      <Sequence name="Scene 2" from={scene2Start} durationInFrames={SCENE2_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("mobile-phones-scene2-9x16.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3 */}
      <Sequence name="Scene 3" from={scene3Start} durationInFrames={SCENE3_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("mobile-phones-scene3-9x16.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4 */}
      <Sequence name="Scene 4" from={scene4Start} durationInFrames={SCENE4_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("mobile-phones-scene4-9x16.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 5 */}
      <Sequence name="Scene 5" from={scene5Start} durationInFrames={SCENE5_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("mobile-phones-scene5-new-9x16.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 6 */}
      <Sequence name="Scene 6" from={scene6Start} durationInFrames={SCENE6_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("mobile-phones-scene6-9x16.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 7 */}
      <Sequence name="Scene 7" from={scene7Start} durationInFrames={SCENE7_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("mobile-phones-scene7-9x16.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 8 */}
      <Sequence name="Scene 8" from={scene8Start} durationInFrames={SCENE8_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("mobile-phones-scene8-9x16.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 9 */}
      <Sequence name="Scene 9" from={scene9Start} durationInFrames={SCENE9_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("mobile-phones-scene5-9x16.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 10: Outro 1 */}
      <Sequence name="Scene 10: Outro 1" from={scene10Start} durationInFrames={SCENE10_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("mobile-phones-outro1-9x16.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 11: Outro 2 */}
      <Sequence name="Scene 11: Outro 2" from={scene11Start} durationInFrames={SCENE11_DURATION}>
        <AbsoluteFill>
          <Video
            muted
            src={staticFile("mobile-phones-outro2-9x16.mp4")}
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

// Background music with fade out at end
const BackgroundMusic: React.FC = () => {
  const frame = useCurrentFrame();
  
  const FADE_OUT_START = TOTAL_DURATION - 90; // Start fade 3 seconds before end
  
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
