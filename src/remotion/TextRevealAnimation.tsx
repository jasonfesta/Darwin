import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["600"],
  subsets: ["latin"],
});

const TEXT = "Monetize Unused Ad Inventory";
const WORDS = TEXT.split(" ");

const Word: React.FC<{
  word: string;
  wordIndex: number;
  totalWords: number;
}> = ({ word, wordIndex, totalWords }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Stagger each word's entrance
  const wordDelay = (wordIndex / totalWords) * durationInFrames * 0.6;
  const wordDuration = durationInFrames * 0.4;

  // Word slides up from bottom
  const translateY = interpolate(
    frame - wordDelay,
    [0, wordDuration * 0.5],
    [40, 0],
    {
      easing: Easing.out(Easing.quad),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Word fades in
  const wordOpacity = interpolate(
    frame - wordDelay,
    [0, wordDuration * 0.3],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <span
      style={{
        display: "inline-block",
        transform: `translateY(${translateY}px)`,
        opacity: wordOpacity,
        marginRight: 20,
      }}
    >
      {word.split("").map((letter, letterIndex) => {
        // Stagger each letter within the word
        const letterDelay = wordDelay + (letterIndex / word.length) * (wordDuration * 0.3);
        
        const letterOpacity = interpolate(
          frame - letterDelay,
          [0, 3],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }
        );

        return (
          <span
            key={letterIndex}
            style={{
              opacity: letterOpacity,
            }}
          >
            {letter}
          </span>
        );
      })}
    </span>
  );
};

export const TextRevealAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Overall scale from 90% to 110%
  const scale = interpolate(frame, [0, durationInFrames], [0.9, 1.1], {
    easing: Easing.inOut(Easing.quad),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontFamily,
          fontSize: 72,
          fontWeight: 600,
          color: "white",
          textAlign: "center",
          transform: `scale(${scale})`,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "0 60px",
        }}
      >
        {WORDS.map((word, index) => (
          <Word
            key={index}
            word={word}
            wordIndex={index}
            totalWords={WORDS.length}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
