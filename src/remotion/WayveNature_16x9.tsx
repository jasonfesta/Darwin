import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame, Video } from "remotion";

// Scene durations in frames (30fps)
const INTRO_DURATION = 120;           // 4 seconds - mask reveal
const TITLE_DURATION = 150;           // 5 seconds - show title
const EPISODE_TITLE_DURATION = 90;    // 3 seconds - episode title

const CLIP_1_DURATION = 452;          // ~15 seconds - content clip 1
const CLIP_1_TITLE_DURATION = 90;     // 3 seconds - clip 1 title
const CLIP_2_DURATION = 452;          // ~15 seconds - content clip 2
const CLIP_2_TITLE_DURATION = 90;     // 3 seconds - clip 2 title
const CLIP_3_DURATION = 452;          // ~15 seconds - content clip 3

const CTA_TITLE_DURATION = 90;        // 3 seconds - title-podcast-16x9 (7)

const NEW_SCENE_2_DURATION = 90;      // 3 seconds - outro-16x9-5

// Scene start times
const INTRO_START = 0;
const TITLE_START = INTRO_START + INTRO_DURATION;
const EPISODE_TITLE_START = TITLE_START + TITLE_DURATION;

const CLIP_1_START = EPISODE_TITLE_START + EPISODE_TITLE_DURATION;
const CLIP_1_TITLE_START = CLIP_1_START + CLIP_1_DURATION;
const CLIP_2_START = CLIP_1_TITLE_START + CLIP_1_TITLE_DURATION;
const CLIP_2_TITLE_START = CLIP_2_START + CLIP_2_DURATION;
const CLIP_3_START = CLIP_2_TITLE_START + CLIP_2_TITLE_DURATION;

const CTA_TITLE_START = CLIP_3_START + CLIP_3_DURATION;

const NEW_SCENE_2_START = CTA_TITLE_START + CTA_TITLE_DURATION;

// Total duration
const TOTAL_DURATION = INTRO_DURATION + TITLE_DURATION + EPISODE_TITLE_DURATION + 
  CLIP_1_DURATION + CLIP_1_TITLE_DURATION + 
  CLIP_2_DURATION + CLIP_2_TITLE_DURATION + 
  CLIP_3_DURATION + 
  CTA_TITLE_DURATION +
  NEW_SCENE_2_DURATION;

// Music settings
const FADE_DURATION = 60; // 2 seconds fade
const END_FADE_DURATION = 120; // 4 seconds fade for smoother ending

// First music segment (intro scenes - fades out before content clips)
const MUSIC1_DURATION = INTRO_DURATION + TITLE_DURATION + EPISODE_TITLE_DURATION;
const MUSIC1_FADE_OUT_START = MUSIC1_DURATION - FADE_DURATION;

// Second music segment (CTA and outro scenes)
const MUSIC2_START = CTA_TITLE_START;
const MUSIC2_DURATION = CTA_TITLE_DURATION + NEW_SCENE_2_DURATION;

// Fade out at 1:08 (68 seconds = 2040 frames absolute) - using longer fade for smooth ending
const MUSIC2_FADE_OUT_ABSOLUTE = 68 * 30; // 2040 frames
const MUSIC2_FADE_OUT_RELATIVE = MUSIC2_FADE_OUT_ABSOLUTE - MUSIC2_START; // relative to sequence start

// Scene 5 music (Clip 1 Title) - fade in and out within scene
const SCENE5_MUSIC_FADE = 30; // 1 second fade

// Scene 7 music (Clip 2 Title) - fade in and out within scene
const SCENE7_MUSIC_FADE = 30; // 1 second fade

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

// Music for Scene 5 (Clip 1 Title)
const MusicScene5: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Fade in at start
  const fadeInVolume = interpolate(
    frame,
    [0, SCENE5_MUSIC_FADE],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  
  // Fade out before end
  const fadeOutVolume = interpolate(
    frame,
    [CLIP_1_TITLE_DURATION - SCENE5_MUSIC_FADE, CLIP_1_TITLE_DURATION],
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

// Music for Scene 7 (Clip 2 Title)
const MusicScene7: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Fade in at start
  const fadeInVolume = interpolate(
    frame,
    [0, SCENE7_MUSIC_FADE],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  
  // Fade out before end
  const fadeOutVolume = interpolate(
    frame,
    [CLIP_2_TITLE_DURATION - SCENE7_MUSIC_FADE, CLIP_2_TITLE_DURATION],
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

export const WayveNature_16x9: React.FC = () => {
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
      <Sequence from={CLIP_1_TITLE_START} durationInFrames={CLIP_1_TITLE_DURATION}>
        <MusicScene5 />
      </Sequence>

      {/* Background Music for Scene 7 */}
      <Sequence from={CLIP_2_TITLE_START} durationInFrames={CLIP_2_TITLE_DURATION}>
        <MusicScene7 />
      </Sequence>

      {/* Scene 1 */}
      <Sequence name="Scene 1" from={INTRO_START} durationInFrames={INTRO_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("intro-16-9-18.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2 */}
      <Sequence name="Scene 2" from={TITLE_START} durationInFrames={TITLE_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("wayve-nature-16x9-scene2.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3 */}
      <Sequence name="Scene 3" from={EPISODE_TITLE_START} durationInFrames={EPISODE_TITLE_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("wayve-nature-16x9-scene2b.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4 */}
      <Sequence name="Scene 4" from={CLIP_1_START} durationInFrames={CLIP_1_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("intro-16-9-12.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 5 */}
      <Sequence name="Scene 5" from={CLIP_1_TITLE_START} durationInFrames={CLIP_1_TITLE_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("01-title-podcast-16x9-10.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 6 */}
      <Sequence name="Scene 6" from={CLIP_2_START} durationInFrames={CLIP_2_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("intro-16-9-13.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 7 */}
      <Sequence name="Scene 7" from={CLIP_2_TITLE_START} durationInFrames={CLIP_2_TITLE_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("01-title-podcast-16x9-11.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 8 */}
      <Sequence name="Scene 8" from={CLIP_3_START} durationInFrames={CLIP_3_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("intro-16-9-14.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 9 */}
      <Sequence name="Scene 9" from={CTA_TITLE_START} durationInFrames={CTA_TITLE_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("Outro-1.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 10 */}
      <Sequence name="Scene 10" from={NEW_SCENE_2_START} durationInFrames={NEW_SCENE_2_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("outro-16x9-new.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
