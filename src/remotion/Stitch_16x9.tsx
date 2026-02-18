import { AbsoluteFill, Sequence, staticFile, Video } from "remotion";

const FPS = 30;

// Scene definitions with durations in frames (at 30fps)
const scenes = [
  { file: "s1-intro-human-vibe-coders.mp4", duration: Math.round(3.5 * FPS) },      // 105 frames
  { file: "s2-called-bonsai.mp4", duration: Math.round(3.416667 * FPS) },           // 103 frames
  { file: "s3-shock.mp4", duration: Math.round(2.0 * FPS) },                         // 60 frames
  { file: "s4-nowwhat.mp4", duration: Math.round(1.2 * FPS) },                       // 36 frames
  { file: "s5-crickets.mp4", duration: Math.round(2.0 * FPS) },                      // 60 frames
  { file: "s6-trying.mp4", duration: Math.round(6.4 * FPS) },                        // 192 frames
  { file: "s7-so-we-loaded.mp4", duration: Math.round(3.0 * FPS) },                  // 90 frames
  { file: "s8-darwin-uses-ai.mp4", duration: Math.round(2.6 * FPS) },                // 78 frames
  { file: "s9-your-app.mp4", duration: Math.round(1.5 * FPS) },                      // 45 frames
  { file: "s10-on-ig-snap-more.mp4", duration: Math.round(5.666667 * FPS) },         // 170 frames
  { file: "s11-before-after.mp4", duration: Math.round(1.7 * FPS) },                 // 51 frames
  { file: "s12-before-after.mp4", duration: Math.round(2.766667 * FPS) },            // 83 frames
  { file: "s13-before-after.mp4", duration: Math.round(2.0 * FPS) },                 // 60 frames
  { file: "s14-before-after.mp4", duration: Math.round(2.516667 * FPS) },            // 76 frames
  { file: "s15-before-after.mp4", duration: Math.round(2.0 * FPS) },                 // 60 frames
  { file: "s16-before-after.mp4", duration: Math.round(1.7 * FPS) },                 // 51 frames
  { file: "s17-before-after.mp4", duration: Math.round(1.5 * FPS) },                 // 45 frames
  { file: "s18-bro-how-did-you.mp4", duration: Math.round(2.266667 * FPS) },         // 68 frames
  { file: "s19-putting-our-hard-work.mp4", duration: Math.round(2.75 * FPS) },       // 83 frames
  { file: "s20-thousands-of-hands.mp4", duration: Math.round(2.0 * FPS) },           // 60 frames
  { file: "s23-domain.mp4", duration: Math.round(1.5 * FPS) },                       // 45 frames
  { file: "s24-ribbon.mp4", duration: Math.round(2.0 * FPS) },                       // 60 frames
];

// Calculate total duration by summing all scene durations
export const TOTAL_DURATION = scenes.reduce((acc, scene) => acc + scene.duration, 0);

// Calculate start frames for each scene
const getStartFrame = (index: number): number => {
  return scenes.slice(0, index).reduce((acc, scene) => acc + scene.duration, 0);
};

export const Stitch_16x9: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {scenes.map((scene, index) => (
        <Sequence
          key={scene.file}
          name={`Scene ${index + 1}: ${scene.file.replace(".mp4", "")}`}
          from={getStartFrame(index)}
          durationInFrames={scene.duration}
        >
          <AbsoluteFill>
            <Video
              src={staticFile(scene.file)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </AbsoluteFill>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
