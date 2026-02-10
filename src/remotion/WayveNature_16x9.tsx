import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame, Video } from "remotion";

// Scene durations in frames (30fps)
const SCENE1_DURATION = 120;  // 4 seconds - mask-16x9.mp4
const SCENE2_DURATION = 150;  // 5 seconds - title-podcast-16x9.mp4
const SCENE2B_DURATION = 90;  // 3 seconds - title-podcast-16x9 (new)
const SCENE3_DURATION = 1230; // 41 seconds - single-16x9.mp4
const SCENE4_DURATION = 90;   // 3 seconds - title-podcast-16x9.mp4
const SCENE5_DURATION = 90;   // 3 seconds - title-podcast-16x9.mp4
const SCENE6_DURATION = 90;   // 3 seconds - outro
const SCENE7_DURATION = 90;   // 3 seconds - outro video

// Scene start times
const SCENE1_START = 0;
const SCENE2_START = SCENE1_START + SCENE1_DURATION;
const SCENE2B_START = SCENE2_START + SCENE2_DURATION;
const SCENE3_START = SCENE2B_START + SCENE2B_DURATION;
const SCENE4_START = SCENE3_START + SCENE3_DURATION;
const SCENE5_START = SCENE4_START + SCENE4_DURATION;
const SCENE6_START = SCENE5_START + SCENE5_DURATION;
const SCENE7_START = SCENE6_START + SCENE6_DURATION;

// Total duration
const TOTAL_DURATION = SCENE1_DURATION + SCENE2_DURATION + SCENE2B_DURATION + SCENE3_DURATION + SCENE4_DURATION + SCENE5_DURATION + SCENE6_DURATION + SCENE7_DURATION;

// Music settings
const FADE_DURATION = 60; // 2 seconds fade

// First music segment (scenes 1, 2, and 2b, fade out starts in scene 2b)
const MUSIC1_DURATION = SCENE1_DURATION + SCENE2_DURATION + SCENE2B_DURATION;
const MUSIC1_FADE_OUT_START = MUSIC1_DURATION - FADE_DURATION; // Start fading near end of scene 2

// Second music segment (scenes 4, 5, 6, and 7, fade in at start, fade out before end)
const MUSIC2_START = SCENE4_START;
const MUSIC2_DURATION = SCENE4_DURATION + SCENE5_DURATION + SCENE6_DURATION + SCENE7_DURATION;

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
    [MUSIC2_DURATION - (FADE_DURATION * 2), MUSIC2_DURATION],
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

export const WayveNature_16x9: React.FC = () => {
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

      {/* Scene 1: Intro Mask Reveal */}
      <Sequence name="Scene 1: Intro Mask Reveal" from={SCENE1_START} durationInFrames={SCENE1_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("wayve-nature-16x9-scene1.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: Title - Nature Podcast */}
      <Sequence name="Scene 2: Title - Nature Podcast" from={SCENE2_START} durationInFrames={SCENE2_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("wayve-nature-16x9-scene2.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2b: Episode Title */}
      <Sequence name="Scene 2b: Episode Title" from={SCENE2B_START} durationInFrames={SCENE2B_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("wayve-nature-16x9-scene2b.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: Main Content - Full Episode */}
      <Sequence name="Scene 3: Main Content - Full Episode" from={SCENE3_START} durationInFrames={SCENE3_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("wayve-nature-16x9-scene3.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: Subscribe CTA */}
      <Sequence name="Scene 4: Subscribe CTA" from={SCENE4_START} durationInFrames={SCENE4_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("wayve-nature-16x9-scene4.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 5: Social Links */}
      <Sequence name="Scene 5: Social Links" from={SCENE5_START} durationInFrames={SCENE5_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("wayve-nature-16x9-scene5.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 6: Closing Animation */}
      <Sequence name="Scene 6: Closing Animation" from={SCENE6_START} durationInFrames={SCENE6_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("wayve-nature-16x9-scene6.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 7: End Card */}
      <Sequence name="Scene 7: End Card" from={SCENE7_START} durationInFrames={SCENE7_DURATION}>
        <AbsoluteFill>
          <Video
            src={staticFile("wayve-nature-16x9-scene7.mp4")}
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
