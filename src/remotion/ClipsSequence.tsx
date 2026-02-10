import { AbsoluteFill, Sequence, staticFile, Video } from "remotion";

// Each scene is 2 seconds at 30fps = 60 frames
const SCENE_DURATION = 60;

// 8 clips total
const TOTAL_DURATION = SCENE_DURATION * 8; // 480 frames = 16 seconds

export const Main_16x9: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Clip 1 - 0 to 2 seconds */}
      <Sequence from={0} durationInFrames={SCENE_DURATION}>
        <Video
          src={staticFile("clip-1.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Sequence>

      {/* Clip 2 - 2 to 4 seconds */}
      <Sequence from={SCENE_DURATION} durationInFrames={SCENE_DURATION}>
        <Video
          src={staticFile("clip-2.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Sequence>

      {/* Clip 3 - 4 to 6 seconds */}
      <Sequence from={SCENE_DURATION * 2} durationInFrames={SCENE_DURATION}>
        <Video
          src={staticFile("clip-3.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Sequence>

      {/* Clip 4 - 6 to 8 seconds */}
      <Sequence from={SCENE_DURATION * 3} durationInFrames={SCENE_DURATION}>
        <Video
          src={staticFile("clip-4.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Sequence>

      {/* Clip 5 - 8 to 10 seconds */}
      <Sequence from={SCENE_DURATION * 4} durationInFrames={SCENE_DURATION}>
        <Video
          src={staticFile("clip-5.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Sequence>

      {/* Clip 6 - 10 to 12 seconds */}
      <Sequence from={SCENE_DURATION * 5} durationInFrames={SCENE_DURATION}>
        <Video
          src={staticFile("clip-6.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Sequence>

      {/* Clip 7 - 12 to 14 seconds */}
      <Sequence from={SCENE_DURATION * 6} durationInFrames={SCENE_DURATION}>
        <Video
          src={staticFile("clip-7.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Sequence>

      {/* Clip 8 - 14 to 16 seconds */}
      <Sequence from={SCENE_DURATION * 7} durationInFrames={SCENE_DURATION}>
        <Video
          src={staticFile("clip-8.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

export const Main_9x16: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Clip 1 - 0 to 2 seconds */}
      <Sequence from={0} durationInFrames={SCENE_DURATION}>
        <Video
          src={staticFile("clip-1.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Sequence>

      {/* Clip 2 - 2 to 4 seconds */}
      <Sequence from={SCENE_DURATION} durationInFrames={SCENE_DURATION}>
        <Video
          src={staticFile("clip-2.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Sequence>

      {/* Clip 3 - 4 to 6 seconds */}
      <Sequence from={SCENE_DURATION * 2} durationInFrames={SCENE_DURATION}>
        <Video
          src={staticFile("clip-3.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Sequence>

      {/* Clip 4 - 6 to 8 seconds */}
      <Sequence from={SCENE_DURATION * 3} durationInFrames={SCENE_DURATION}>
        <Video
          src={staticFile("clip-4.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Sequence>

      {/* Clip 5 - 8 to 10 seconds */}
      <Sequence from={SCENE_DURATION * 4} durationInFrames={SCENE_DURATION}>
        <Video
          src={staticFile("clip-5.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Sequence>

      {/* Clip 6 - 10 to 12 seconds */}
      <Sequence from={SCENE_DURATION * 5} durationInFrames={SCENE_DURATION}>
        <Video
          src={staticFile("clip-6.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Sequence>

      {/* Clip 7 - 12 to 14 seconds */}
      <Sequence from={SCENE_DURATION * 6} durationInFrames={SCENE_DURATION}>
        <Video
          src={staticFile("clip-7.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Sequence>

      {/* Clip 8 - 14 to 16 seconds */}
      <Sequence from={SCENE_DURATION * 7} durationInFrames={SCENE_DURATION}>
        <Video
          src={staticFile("clip-8.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
