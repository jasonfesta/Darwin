import { AbsoluteFill, Audio, Sequence, Video, staticFile, useCurrentFrame, interpolate } from "remotion";

const FPS = 60;

// Scene durations in frames (at 60fps)
const SCENE_1_DURATION = Math.round(3.584 * FPS); // s1-intro-human-vibe-coders
const SCENE_2_DURATION = Math.round(3.477333 * FPS); // s2-called-bonsai
const SCENE_3_DURATION = Math.round(2.069333 * FPS); // s3-shock
const SCENE_4_DURATION = Math.round(1.28 * FPS); // s4-nowwhat
const SCENE_5_DURATION = Math.round(2.069333 * FPS); // s5-crickets
const SCENE_6_DURATION = Math.round(6.464 * FPS); // s6-trying
const SCENE_7_DURATION = Math.round(3.072 * FPS); // s7-so-we-loaded
const SCENE_8_DURATION = Math.round(2.6 * FPS); // s8-darwin-uses-ai
const SCENE_9_DURATION = Math.round(1.5 * FPS); // s9-your-app
const SCENE_10_DURATION = Math.round(5.077333 * FPS); // s10-on-ig-snap-more
const SCENE_11_DURATION = Math.round(1.7 * FPS); // s11-before-after
const SCENE_12_DURATION = Math.round(2.766667 * FPS); // s12-before-after
const SCENE_13_DURATION = Math.round(2.0 * FPS); // s13-before-after
const SCENE_14_DURATION = Math.round(2.516667 * FPS); // s14-before-after
const SCENE_15_DURATION = Math.round(2.0 * FPS); // s15-before-after
const SCENE_16_DURATION = Math.round(2.0 * FPS); // s16-before-after
const SCENE_17_DURATION = Math.round(1.7 * FPS); // s17-before-after
const SCENE_17A_DURATION = Math.round(1 * FPS); // 1 second black pause with yayyy sfx
const SCENE_18_DURATION = Math.round(2.346667 * FPS); // s18-bro-how-did-you
const SCENE_19_DURATION = Math.round(2.816 * FPS); // s19-putting-our-hard-work
const SCENE_20_DURATION = Math.round(2.069333 * FPS); // s20-thousands-of-hands
const SCENE_23_DURATION = Math.round(1.5 * FPS); // s23-domain
const SCENE_24_DURATION = Math.round(1.0 * FPS); // s24-ribbon (2x speed)

// Calculate start frames for each scene
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
const SCENE_11_START = SCENE_10_START + SCENE_10_DURATION;
const SCENE_12_START = SCENE_11_START + SCENE_11_DURATION;
const SCENE_13_START = SCENE_12_START + SCENE_12_DURATION;
const SCENE_14_START = SCENE_13_START + SCENE_13_DURATION;
const SCENE_15_START = SCENE_14_START + SCENE_14_DURATION;
const SCENE_16_START = SCENE_15_START + SCENE_15_DURATION;
const SCENE_17_START = SCENE_16_START + SCENE_16_DURATION;
const SCENE_17A_START = SCENE_17_START + SCENE_17_DURATION;
const SCENE_18_START = SCENE_17A_START + SCENE_17A_DURATION;
const SCENE_19_START = SCENE_18_START + SCENE_18_DURATION;
const SCENE_20_START = SCENE_19_START + SCENE_19_DURATION;
const SCENE_23_START = SCENE_20_START + SCENE_20_DURATION;
const SCENE_24_START = SCENE_23_START + SCENE_23_DURATION;

// Total duration based on all scenes
export const TOTAL_DURATION = SCENE_24_START + SCENE_24_DURATION;

// Audio timing - aligned to scenes

const MUSIC_FADE_START = Math.round(56.28 * FPS); // Music starts fading at 00:56.28
const FADE_DURATION = 10; // Fade out over 10 frames

const BackgroundMusicPart3: React.FC = () => {
  const frame = useCurrentFrame();
  const absoluteFrame = frame + SCENE_18_START;
  
  const volume = interpolate(
    absoluteFrame,
    [MUSIC_FADE_START, MUSIC_FADE_START + FADE_DURATION],
    [0.12, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <Audio
      src={staticFile("Whiplash Brass Burst.mp3")}
      volume={volume}
      startFrom={SCENE_5_START + SCENE_6_DURATION + SCENE_7_DURATION + (SCENE_17_START + SCENE_17_DURATION - SCENE_8_START)}
    />
  );
};

export const AdHero_16x9: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Scene 1 */}
      <Sequence name="Scene 1" from={SCENE_1_START} durationInFrames={SCENE_1_DURATION}>
        <Video src={staticFile("s1-intro-human-vibe-coders.mp4")} />
      </Sequence>

      {/* Scene 2 */}
      <Sequence name="Scene 2" from={SCENE_2_START} durationInFrames={SCENE_2_DURATION}>
        <Video src={staticFile("s2-called-bonsai.mp4")} />
      </Sequence>

      {/* Scene 3 */}
      <Sequence name="Scene 3" from={SCENE_3_START} durationInFrames={SCENE_3_DURATION}>
        <Video src={staticFile("s3-shock.mp4")} />
      </Sequence>

      {/* Scene 4 */}
      <Sequence name="Scene 4" from={SCENE_4_START} durationInFrames={SCENE_4_DURATION}>
        <Video src={staticFile("s4-nowwhat.mp4")} />
      </Sequence>

      {/* Scene 5 */}
      <Sequence name="Scene 5" from={SCENE_5_START} durationInFrames={SCENE_5_DURATION}>
        <Video src={staticFile("s5-crickets.mp4")} />
      </Sequence>

      {/* Scene 6 */}
      <Sequence name="Scene 6" from={SCENE_6_START} durationInFrames={SCENE_6_DURATION}>
        <Video src={staticFile("s6-trying.mp4")} />
      </Sequence>

      {/* Scene 7 */}
      <Sequence name="Scene 7" from={SCENE_7_START} durationInFrames={SCENE_7_DURATION}>
        <Video src={staticFile("s7-so-we-loaded.mp4")} />
      </Sequence>

      {/* Scene 8 */}
      <Sequence name="Scene 8" from={SCENE_8_START} durationInFrames={SCENE_8_DURATION}>
        <Video src={staticFile("s8-darwin-uses-ai.mp4")} />
      </Sequence>

      {/* Scene 9 */}
      <Sequence name="Scene 9" from={SCENE_9_START} durationInFrames={SCENE_9_DURATION}>
        <Video src={staticFile("s9-your-app.mp4")} />
      </Sequence>

      {/* Scene 10 */}
      <Sequence name="Scene 10" from={SCENE_10_START} durationInFrames={SCENE_10_DURATION}>
        <Video src={staticFile("s10-on-ig-snap-more.mp4")} />
      </Sequence>

      {/* Scene 11 */}
      <Sequence name="Scene 11" from={SCENE_11_START} durationInFrames={SCENE_11_DURATION}>
        <Video src={staticFile("s11-before-after.mp4")} />
      </Sequence>

      {/* Scene 12 */}
      <Sequence name="Scene 12" from={SCENE_12_START} durationInFrames={SCENE_12_DURATION}>
        <Video src={staticFile("s12-before-after.mp4")} />
      </Sequence>

      {/* Scene 13 */}
      <Sequence name="Scene 13" from={SCENE_13_START} durationInFrames={SCENE_13_DURATION}>
        <Video src={staticFile("s13-before-after.mp4")} />
      </Sequence>

      {/* Scene 14 */}
      <Sequence name="Scene 14" from={SCENE_14_START} durationInFrames={SCENE_14_DURATION}>
        <Video src={staticFile("s14-before-after.mp4")} />
      </Sequence>

      {/* Scene 15 */}
      <Sequence name="Scene 15" from={SCENE_15_START} durationInFrames={SCENE_15_DURATION}>
        <Video src={staticFile("s15-before-after.mp4")} />
      </Sequence>

      {/* Scene 16 */}
      <Sequence name="Scene 16" from={SCENE_16_START} durationInFrames={SCENE_16_DURATION}>
        <Video src={staticFile("s16-before-after.mp4")} />
      </Sequence>

      {/* Scene 17 */}
      <Sequence name="Scene 17" from={SCENE_17_START} durationInFrames={SCENE_17_DURATION}>
        <Video src={staticFile("s17-before-after.mp4")} />
      </Sequence>

      {/* Scene 17a - 1 second black with Yayyy Sound Effect (2 seconds total, hard stop) */}
      <Sequence name="Scene 17a - Black + Yayyy SFX" from={SCENE_17A_START} durationInFrames={SCENE_17A_DURATION}>
        <AbsoluteFill style={{ backgroundColor: "#000000" }} />
        <Audio src={staticFile("yayyy-sound-fx.mp3")} volume={0.5} />
      </Sequence>

      {/* Scene 18 */}
      <Sequence name="Scene 18" from={SCENE_18_START} durationInFrames={SCENE_18_DURATION}>
        <Video src={staticFile("s18-bro-how-did-you.mp4")} />
      </Sequence>

      {/* Scene 19 */}
      <Sequence name="Scene 19" from={SCENE_19_START} durationInFrames={SCENE_19_DURATION}>
        <Video src={staticFile("s19-putting-our-hard-work.mp4")} />
      </Sequence>

      {/* Scene 20 */}
      <Sequence name="Scene 20" from={SCENE_20_START} durationInFrames={SCENE_20_DURATION}>
        <Video src={staticFile("s20-thousands-of-hands.mp4")} />
      </Sequence>

      {/* Scene 23 */}
      <Sequence name="Scene 23" from={SCENE_23_START} durationInFrames={SCENE_23_DURATION}>
        <Video src={staticFile("s23-domain.mp4")} />
      </Sequence>

      {/* Scene 24 */}
      <Sequence name="Scene 24" from={SCENE_24_START} durationInFrames={SCENE_24_DURATION}>
        <Video src={staticFile("s24-ribbon.mp4")} playbackRate={2} />
      </Sequence>

      {/* Background Music - Part 1 (Scene 1 through Scene 4, ends at 00:10.08) */}
      <Sequence name="Background Music - Part 1" from={0} durationInFrames={Math.round(10.08 * FPS)}>
        <Audio src={staticFile("Whiplash Brass Burst.mp3")} volume={0.25} />
      </Sequence>

      {/* Background Music - Part 1b (Scene 6, resumes where Part 1 left off) */}
      <Sequence name="Background Music - Part 1b" from={SCENE_6_START} durationInFrames={SCENE_6_DURATION}>
        <Audio
          src={staticFile("Whiplash Brass Burst.mp3")}
          volume={0.12}
          startFrom={SCENE_5_START}
        />
      </Sequence>

      {/* Background Music - Part 2a (Scene 7 only, continuous from Part 1b) */}
      <Sequence name="Background Music - Part 2a" from={SCENE_7_START} durationInFrames={SCENE_7_DURATION}>
        <Audio
          src={staticFile("Whiplash Brass Burst.mp3")}
          volume={0.12}
          startFrom={SCENE_5_START + SCENE_6_DURATION}
        />
      </Sequence>

      {/* Background Music - Part 2b (Scene 8 through Scene 17a, continuous from Part 2a) */}
      <Sequence name="Background Music - Part 2b" from={SCENE_8_START} durationInFrames={SCENE_17A_START + SCENE_17A_DURATION - SCENE_8_START}>
        <Audio
          src={staticFile("Whiplash Brass Burst.mp3")}
          volume={0.12}
          startFrom={SCENE_5_START + SCENE_6_DURATION + SCENE_7_DURATION}
        />
      </Sequence>

      {/* Background Music - Part 3 (Resumes at Scene 18, fades out after 00:56) */}
      <Sequence name="Background Music - Part 3" from={SCENE_18_START} durationInFrames={MUSIC_FADE_START + FADE_DURATION - SCENE_18_START}>
        <BackgroundMusicPart3 />
      </Sequence>

      {/* Hero Audio 1 - Part 1a (plays from start until scene 5 begins) */}
      <Sequence name="Hero Audio 1 - Part 1a" from={0} durationInFrames={SCENE_5_START}>
        <Audio src={staticFile("heroAudio3.mp3")} volume={1} />
      </Sequence>

      {/* Hero Audio 1 - Part 1b (resumes at scene 6, continues through scene 17a) */}
      <Sequence name="Hero Audio 1 - Part 1b" from={SCENE_6_START} durationInFrames={SCENE_17A_START + SCENE_17A_DURATION - SCENE_6_START}>
        <Audio src={staticFile("heroAudio3.mp3")} volume={1} startFrom={SCENE_5_START + FPS} />
      </Sequence>

      {/* Hero Audio 1 - Part 2 (resumes at scene 18, clips 3.2 sec from its starting point) */}
      <Sequence name="Hero Audio 1 - Part 2" from={SCENE_18_START} durationInFrames={TOTAL_DURATION - SCENE_18_START}>
        <Audio src={staticFile("heroAudio3.mp3")} volume={1} startFrom={SCENE_5_START + FPS + (SCENE_17A_START + SCENE_17A_DURATION - SCENE_6_START) + Math.round(3.2 * FPS)} />
      </Sequence>
    </AbsoluteFill>
  );
};
