import { AbsoluteFill, Sequence, staticFile, Video } from "remotion";

const FPS = 30;
const SCENE_DURATION = 15; // 0.5 seconds at 30fps
const PLAYBACK_RATE = 3; // 3x speed

// Scene definitions with durations in frames (at 30fps)
const scenes = [
  { file: "stitch-s1.mp4" },
  { file: "stitch-s2.mp4" },
  { file: "stitch-s3.mp4" },
  { file: "stitch-s4.mp4" },
  { file: "stitch-s5.mp4" },
  { file: "stitch-s6.mp4" },
  { file: "stitch-s7.mp4" },
  { file: "stitch-s8.mp4" },
  { file: "stitch-s9.mp4" },
  { file: "stitch-s10.mp4" },
  { file: "stitch-s11.mp4" },
  { file: "stitch-s12.mp4" },
  { file: "stitch-s14.mp4" },
  { file: "stitch-s16.mp4" },
  { file: "stitch-s17.mp4" },
  { file: "stitch-s18.mp4" },
  { file: "stitch-s19.mp4" },
  { file: "stitch-s20.mp4" },
  { file: "stitch-s22.mp4" },
  { file: "stitch-s23.mp4" },
  { file: "stitch-s24.mp4" },
  { file: "stitch-s25.mp4" },
  { file: "stitch-s26.mp4" },
];

// Calculate total duration
export const TOTAL_DURATION = scenes.length * SCENE_DURATION;

export const Stitch_16x9: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {scenes.map((scene, index) => (
        <Sequence
          key={scene.file}
          name={`Scene ${index + 1}: ${scene.file.replace(".mp4", "")}`}
          from={index * SCENE_DURATION}
          durationInFrames={SCENE_DURATION}
        >
          <AbsoluteFill>
            <Video
              src={staticFile(scene.file)}
              playbackRate={PLAYBACK_RATE}
              muted
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </AbsoluteFill>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
