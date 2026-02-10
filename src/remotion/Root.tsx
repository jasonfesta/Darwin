import React from "react";
import { Composition } from "remotion";

// Ads Studio - Desks
import { AdsStudio007 } from "./AdsStudio007";
import { AdsStudio007_16x9 } from "./AdsStudio007_16x9";

// Ads Studio - Brands
import { AdsStudioBrands } from "./AdsStudioBrands";
import { AdsStudioBrands_16x9 } from "./AdsStudioBrands_16x9";

// Ads Studio - Fashion
import { AdsStudio008 } from "./AdsStudio008";
import { AdsStudio008_16x9 } from "./AdsStudio008_16x9";

// Ads Studio - Accessories
import { AdsStudio009 } from "./AdsStudio009";
import { AdsStudio009_16x9 } from "./AdsStudio009_16x9";

// Wayve Nature
import { WayveNature_9x16 } from "./WayveNature_9x16";
import { WayveNature_16x9 } from "./WayveNature_16x9";

// 2-11 Update
import { Update211_16x9 } from "./Update211_16x9";
import { Update211_9x16 } from "./Update211_9x16";

// Clips Sequence
import { Main_16x9, Main_9x16 } from "./ClipsSequence";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Ads Studio - Brands */}
      <Composition
        id="ads-studio-brands-9x16"
        component={AdsStudioBrands}
        durationInFrames={1752}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ads-studio-brands-16x9"
        component={AdsStudioBrands_16x9}
        durationInFrames={1752}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Ads Studio - Desks */}
      <Composition
        id="ads-studio-desks-9x16"
        component={AdsStudio007}
        durationInFrames={1450}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ads-studio-desks-16x9"
        component={AdsStudio007_16x9}
        durationInFrames={1360}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Ads Studio - Fashion */}
      <Composition
        id="ads-studio-fashion-9x16"
        component={AdsStudio008}
        durationInFrames={1262}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ads-studio-fashion-16x9"
        component={AdsStudio008_16x9}
        durationInFrames={1262}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Ads Studio - Accessories */}
      <Composition
        id="ads-studio-accessories-9x16"
        component={AdsStudio009}
        durationInFrames={1239}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ads-studio-accessories-16x9"
        component={AdsStudio009_16x9}
        durationInFrames={1241}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Wayve Nature */}
      <Composition
        id="wayve-nature-9x16"
        component={WayveNature_9x16}
        durationInFrames={1710}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="wayve-nature-16x9"
        component={WayveNature_16x9}
        durationInFrames={1710}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 2-11 Update */}
      <Composition
        id="2-11-update-9x16"
        component={Update211_9x16}
        durationInFrames={5535}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="2-11-update-16x9"
        component={Update211_16x9}
        durationInFrames={5535}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Clips Sequence */}
      <Composition
        id="main-16x9"
        component={Main_16x9}
        durationInFrames={480}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="main-9x16"
        component={Main_9x16}
        durationInFrames={480}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
