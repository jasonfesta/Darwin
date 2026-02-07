import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame, Video } from "remotion";

// Scene durations in frames (30fps)
const SCENE1_DURATION = 120;  // 4 seconds - mask-9-16.mp4
const SCENE2_DURATION = 90;   // 3 seconds - title-podcast-9x16 (16).mp4
const SCENE3_DURATION = 1230; // 41 seconds - single-9x16 (1).mp4
const SCENE4_DURATION = 90;   // 3 seconds - title-podcast-9x16 (18).mp4
const SCENE5_DURATION = 90;   // 3 seconds - title-podcast-9x16 (17).mp4

// Scene start times
const SCENE1_START = 0;
const SCENE2_START = SCENE1_START + SCENE1_DURATION;
const SCENE3_START = SCENE2_START + SCENE2_DURATION;
const SCENE4_START = SCENE3_START + SCENE3_DURATION;
const SCENE5_START = SCENE4_START + SCENE4_DURATION;

// Total duration
const TOTAL_DURATION = SCENE1_DURATION + SCENE2_DURATION + SCENE3_DURATION + SCENE4_DURATION + SCENE5_DURATION;

// Music settings
const FADE_DURATION = 60; // 2 seconds fade

// First music segment (scenes 1 and 2, fade out starts in scene 2)
const MUSIC1_DURATION = SCENE1_DURATION + SCENE2_DURATION;
const MUSIC1_FADE_OUT_START = MUSIC1_DURATION - FADE_DURATION; // Start fading near end of scene 2

// Second music segment (scenes 4 and 5, fade in at start, fade out before end)
const MUSIC2_START = SCENE4_START;
const MUSIC2_DURATION = SCENE4_DURATION + SCENE5_DURATION;

const MusicPart1: React.FC = () => {
  const frame = useCurrentFrame();
  
  const volume = interpolate(
    frame,
    [MUSIC1_FADE_OUT_START, MUSIC1_FADE_OUT_START + FADE_DURATION],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <Audio
      src={staticFile("wayve-nature-music.mp3")}
      volume={volume}
    />
  );
};

const MusicPart2: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Fade in at start, fade out before end
  const fadeInVolume = interpolate(
    frame,
    [0, FADE_DURATION],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  
  const fadeOutVolume = interpolate(
    frame,
    [MUSIC2_DURATION - FADE_DURATION, MUSIC2_DURATION],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <Audio
      src={staticFile("wayve-nature-music.mp3")}
      volume={Math.min(fadeInVolume, fadeOutVolume)}
      startFrom={MUSIC1_DURATION}
    />
  );
};

export const WayveNature_9x16: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Background Music Part 1 - plays during scenes 1 and 2, fades out during scene 2 */}
      <Sequence from={0} durationInFrames={MUSIC1_DURATION}>
        <MusicPart1 />
      </Sequence>

      {/* Background Music Part 2 - fades in at scene 4, fades out before end */}
      <Sequence from={MUSIC2_START} durationInFrames={MUSIC2_DURATION}>
        <MusicPart2 />
      </Sequence>

      {/* Scene 1: mask-9-16.mp4 */}
      <Sequence from={SCENE1_START} durationInFrames={SCENE1_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("wayve-nature-scene1.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: title-podcast-9x16 (16).mp4 */}
      <Sequence from={SCENE2_START} durationInFrames={SCENE2_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("wayve-nature-scene2.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: single-9x16.mp4 */}
      <Sequence from={SCENE3_START} durationInFrames={SCENE3_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("wayve-nature-scene3.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: title-podcast-9x16 (17).mp4 */}
      <Sequence from={SCENE4_START} durationInFrames={SCENE4_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("wayve-nature-scene5.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 5: title-podcast-9x16 (18).mp4 */}
      <Sequence from={SCENE5_START} durationInFrames={SCENE5_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("wayve-nature-scene4.mp4")}
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
