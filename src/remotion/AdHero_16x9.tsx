import { AbsoluteFill, Audio, Sequence, Video, staticFile } from "remotion";

const FPS = 60;

// Scene durations in frames (at 60fps)
const SCENE_1_DURATION = Math.round(3.584 * FPS); // s1-intro-human-vibe-coders
const SCENE_2_DURATION = Math.round(3.477333 * FPS); // s2-called-bonsai
const SCENE_3_DURATION = Math.round(1.770667 * FPS); // s3-shock
const SCENE_4_DURATION = Math.round(1.216 * FPS); // s4-nowwhat
const SCENE_5_DURATION = Math.round(1.0 * FPS); // s5-crickets
const SCENE_6_DURATION = Math.round(5.077333 * FPS); // s6-trying
const SCENE_7_DURATION = Math.round(2.197333 * FPS); // s7-so-we-loaded (NEW)
const SCENE_8_DURATION = Math.round(2.666667 * FPS); // s8-darwin-uses-ai (NEW)
const SCENE_9_DURATION = Math.round(2.154667 * FPS); // s9-your-app (NEW)
const SCENE_10_DURATION = Math.round(4.330667 * FPS); // s10-on-ig-snap-more (NEW)
const SCENE_11_DURATION = Math.round(1.770667 * FPS); // s11-before-after
const SCENE_12_DURATION = Math.round(2.837333 * FPS); // s12-before-after
const SCENE_13_DURATION = Math.round(2.069333 * FPS); // s13-before-after
const SCENE_14_DURATION = Math.round(2.581333 * FPS); // s14-before-after
const SCENE_15_DURATION = Math.round(2.069333 * FPS); // s15-before-after
const SCENE_16_DURATION = Math.round(1.770667 * FPS); // s16-before-after
const SCENE_17_DURATION = Math.round(1.834667 * FPS); // s17-before-after
const SCENE_18_DURATION = Math.round(2.346667 * FPS); // s18-bro-how-did-you
const SCENE_19_DURATION = Math.round(2.304 * FPS); // s19-darwin-ai-matches
const SCENE_20_DURATION = Math.round(2.069333 * FPS); // s20-your-app-with-creators
const SCENE_21_DURATION = Math.round(1.877333 * FPS); // s21-putting-our-hard-work
const SCENE_22_DURATION = Math.round(2.581333 * FPS); // s22-thousands-of-hands
const SCENE_23_DURATION = Math.round(3.136 * FPS); // s23-domain
const SCENE_24_DURATION = Math.round(2.0 * FPS); // s24-ribbon

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
const SCENE_18_START = SCENE_17_START + SCENE_17_DURATION;
const SCENE_19_START = SCENE_18_START + SCENE_18_DURATION;
const SCENE_20_START = SCENE_19_START + SCENE_19_DURATION;
const SCENE_21_START = SCENE_20_START + SCENE_20_DURATION;
const SCENE_22_START = SCENE_21_START + SCENE_21_DURATION;
const SCENE_23_START = SCENE_22_START + SCENE_22_DURATION;
const SCENE_24_START = SCENE_23_START + SCENE_23_DURATION;

// Total duration based on all scenes
export const TOTAL_DURATION = SCENE_24_START + SCENE_24_DURATION;

// Audio timing - aligned to scenes
const CRICKETS_AUDIO_DURATION = SCENE_5_DURATION; // Crickets during Scene 5

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

      {/* Scene 18 */}
      <Sequence name="Scene 18" from={SCENE_18_START} durationInFrames={SCENE_18_DURATION}>
        <Video src={staticFile("s18-bro-how-did-you.mp4")} />
      </Sequence>

      {/* Scene 19 */}
      <Sequence name="Scene 19" from={SCENE_19_START} durationInFrames={SCENE_19_DURATION}>
        <Video src={staticFile("s19-darwin-ai-matches.mp4")} />
      </Sequence>

      {/* Scene 20 */}
      <Sequence name="Scene 20" from={SCENE_20_START} durationInFrames={SCENE_20_DURATION}>
        <Video src={staticFile("s20-your-app-with-creators.mp4")} />
      </Sequence>

      {/* Scene 21 */}
      <Sequence name="Scene 21" from={SCENE_21_START} durationInFrames={SCENE_21_DURATION}>
        <Video src={staticFile("s21-putting-our-hard-work.mp4")} />
      </Sequence>

      {/* Scene 22 */}
      <Sequence name="Scene 22" from={SCENE_22_START} durationInFrames={SCENE_22_DURATION}>
        <Video src={staticFile("s22-thousands-of-hands.mp4")} />
      </Sequence>

      {/* Scene 23 */}
      <Sequence name="Scene 23" from={SCENE_23_START} durationInFrames={SCENE_23_DURATION}>
        <Video src={staticFile("s23-domain.mp4")} />
      </Sequence>

      {/* Scene 24 */}
      <Sequence name="Scene 24" from={SCENE_24_START} durationInFrames={SCENE_24_DURATION}>
        <Video src={staticFile("s24-ribbon.mp4")} />
      </Sequence>

      {/* Background Music - Part 1 (Scene 1 through Scene 4) */}
      <Sequence name="Background Music - Part 1" from={0} durationInFrames={SCENE_5_START}>
        <Audio src={staticFile("Whiplash Brass Burst.mp3")} volume={0.25} />
      </Sequence>

      {/* Crickets Audio (during Scene 5) */}
      <Sequence name="Crickets Audio" from={SCENE_5_START} durationInFrames={CRICKETS_AUDIO_DURATION}>
        <Audio src={staticFile("Loud Crickets At Night.mp3")} volume={0.3} />
      </Sequence>

      {/* Background Music - Part 2 (starts at Scene 6) */}
      <Sequence name="Background Music - Part 2" from={SCENE_6_START}>
        <Audio
          src={staticFile("Whiplash Brass Burst.mp3")}
          volume={0.25}
          startFrom={SCENE_5_START + Math.round(0.2 * FPS)}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
