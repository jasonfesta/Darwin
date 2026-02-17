import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame, Video } from "remotion";

// Scene durations in frames (30fps)
const SCENE_1_DURATION = 120;   // 4s - Intro
const SCENE_2_DURATION = 150;   // 5s - Main Title
const SCENE_3_DURATION = 90;    // 3s - Episode Title
const SCENE_4_DURATION = 452;   // 15s - Clip 1
const SCENE_5_DURATION = 90;    // 3s - Clip 1 Title
const SCENE_6_DURATION = 452;   // 15s - Clip 2
const SCENE_7_DURATION = 90;    // 3s - Clip 2 Title
const SCENE_8_DURATION = 452;   // 15s - Clip 3
const SCENE_9_DURATION = 90;    // 3s - CTA Title
const SCENE_10_DURATION = 90;   // 3s - CTA Outro

// Scene start times
const SCENE_1_START = 0;
const SCENE_2_START = SCENE_1_START + SCENE_1_DURATION;
const SCENE_3_START = SCENE_2_START + SCENE_2_DURATION;
const SCENE_4_START = SCENE_3_START + SCENE_3_DURATION;
const SCENE_5_START = SCENE_4_START + SCENE_4_DURATION;
const SCENE_6_START = SCENE_5_START + SCENE_5_DURATION;
const SCENE_7_START = SCENE_6_START + SCENE_6_DURATION;
const SCENE_8_START = SCENE_7_START + SCENE_7_DURATION;
const SCENE_9_START = SCENE_8_START + SCENE_8_DURATION;
const SCENE_10_START = SCENE_9_START + SCENE_9_DURATION;

// Total duration
const TOTAL_DURATION = SCENE_1_DURATION + SCENE_2_DURATION + SCENE_3_DURATION +
  SCENE_4_DURATION + SCENE_5_DURATION + SCENE_6_DURATION + SCENE_7_DURATION +
  SCENE_8_DURATION + SCENE_9_DURATION + SCENE_10_DURATION;

// Music settings
const FADE_DURATION = 60; // 2 seconds fade
const END_FADE_DURATION = 120; // 4 seconds fade for smoother ending

// First music segment (Scenes 1-3 - fades out before content clips)
const MUSIC1_DURATION = SCENE_1_DURATION + SCENE_2_DURATION + SCENE_3_DURATION;
const MUSIC1_FADE_OUT_START = MUSIC1_DURATION - FADE_DURATION;

// Second music segment (Scenes 9-10)
const MUSIC2_START = SCENE_9_START;
const MUSIC2_DURATION = SCENE_9_DURATION + SCENE_10_DURATION;

// Fade out at 1:08 (68 seconds = 2040 frames absolute) - using longer fade for smooth ending
const MUSIC2_FADE_OUT_ABSOLUTE = 68 * 30; // 2040 frames
const MUSIC2_FADE_OUT_RELATIVE = MUSIC2_FADE_OUT_ABSOLUTE - MUSIC2_START; // relative to sequence start

// Scene 5 music - fade in and out within scene
const SCENE_5_MUSIC_FADE = 30; // 1 second fade

// Scene 7 music - fade in and out within scene
const SCENE_7_MUSIC_FADE = 30; // 1 second fade

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
      src={staticFile("wayve-nature-m83-outro.mp3")}
      volume={volume}
    />
  );
};

const MusicPart2: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Fade in at start
  const fadeInVolume = interpolate(
    frame,
    [0, FADE_DURATION],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  
  // Fade out at 1:08 (68 seconds absolute) - longer fade for smoother ending
  const fadeOutVolume = interpolate(
    frame,
    [MUSIC2_FADE_OUT_RELATIVE - END_FADE_DURATION, MUSIC2_FADE_OUT_RELATIVE],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <Audio
      src={staticFile("wayve-nature-m83-outro.mp3")}
      volume={Math.min(fadeInVolume, fadeOutVolume)}
      startFrom={MUSIC1_DURATION}
    />
  );
};

// Music for Scene 5
const MusicScene5: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Fade in at start
  const fadeInVolume = interpolate(
    frame,
    [0, SCENE_5_MUSIC_FADE],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  
  // Fade out before end
  const fadeOutVolume = interpolate(
    frame,
    [SCENE_5_DURATION - SCENE_5_MUSIC_FADE, SCENE_5_DURATION],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <Audio
      src={staticFile("wayve-nature-m83-outro.mp3")}
      volume={Math.min(fadeInVolume, fadeOutVolume)}
    />
  );
};

// Music for Scene 7
const MusicScene7: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Fade in at start
  const fadeInVolume = interpolate(
    frame,
    [0, SCENE_7_MUSIC_FADE],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  
  // Fade out before end
  const fadeOutVolume = interpolate(
    frame,
    [SCENE_7_DURATION - SCENE_7_MUSIC_FADE, SCENE_7_DURATION],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <Audio
      src={staticFile("wayve-nature-m83-outro.mp3")}
      volume={Math.min(fadeInVolume, fadeOutVolume)}
    />
  );
};

export const WayveAction_9x16: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Background Music Part 1 */}
      <Sequence from={0} durationInFrames={MUSIC1_DURATION}>
        <MusicPart1 />
      </Sequence>

      {/* Background Music Part 2 */}
      <Sequence from={MUSIC2_START} durationInFrames={MUSIC2_DURATION}>
        <MusicPart2 />
      </Sequence>

      {/* Background Music for Scene 5 */}
      <Sequence from={SCENE_5_START} durationInFrames={SCENE_5_DURATION}>
        <MusicScene5 />
      </Sequence>

      {/* Background Music for Scene 7 */}
      <Sequence from={SCENE_7_START} durationInFrames={SCENE_7_DURATION}>
        <MusicScene7 />
      </Sequence>

      {/* Scene 1 */}
      <Sequence name="Scene 1" from={SCENE_1_START} durationInFrames={SCENE_1_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("mask-9-16-3.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2 */}
      <Sequence name="Scene 2" from={SCENE_2_START} durationInFrames={SCENE_2_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("title-podcast-9x16-10.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3 */}
      <Sequence name="Scene 3" from={SCENE_3_START} durationInFrames={SCENE_3_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("01-title-podcast-9x16-12.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4 */}
      <Sequence name="Scene 4" from={SCENE_4_START} durationInFrames={SCENE_4_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("single-9x16-16.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 5 */}
      <Sequence name="Scene 5" from={SCENE_5_START} durationInFrames={SCENE_5_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("01-title-podcast-9x16-13.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 6 */}
      <Sequence name="Scene 6" from={SCENE_6_START} durationInFrames={SCENE_6_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("single-9x16-17.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 7 */}
      <Sequence name="Scene 7" from={SCENE_7_START} durationInFrames={SCENE_7_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("01-title-podcast-9x16-14.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 8 */}
      <Sequence name="Scene 8" from={SCENE_8_START} durationInFrames={SCENE_8_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("single-9x16-18.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 9 */}
      <Sequence name="Scene 9" from={SCENE_9_START} durationInFrames={SCENE_9_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("title-podcast-9x16-9.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 10 */}
      <Sequence name="Scene 10" from={SCENE_10_START} durationInFrames={SCENE_10_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("outro-9x16-5.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
