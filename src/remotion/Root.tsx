import React from "react";
import { Composition } from "remotion";

// Ads Studio - Desks
import { AdsStudio007 } from "./AdsStudio007";
import { AdsStudio007_16x9 } from "./AdsStudio007_16x9";

// Ads Studio - Mobile Phones
import { MobilePhones_9x16 } from "./MobilePhones";
import { MobilePhones_16x9 } from "./MobilePhones_16x9";

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

// Wayve Action
import { WayveAction_9x16 } from "./WayveAction_9x16";
import { WayveAction_16x9 } from "./WayveAction_16x9";

// 2-11 Update
import { Update211_16x9 } from "./Update211_16x9";
import { Update211_9x16 } from "./Update211_9x16";

// 2-25 Update
import { Update225_16x9, TOTAL_DURATION as UPDATE225_16x9_DURATION } from "./Update225_16x9";
import { Update225_9x16, TOTAL_DURATION as UPDATE225_9x16_DURATION } from "./Update225_9x16";

// Ad Hero
import { AdHero_16x9, TOTAL_DURATION as AD_HERO_DURATION } from "./AdHero_16x9";

// Stitch
import { Stitch_16x9, TOTAL_DURATION as STITCH_DURATION } from "./Stitch_16x9";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Ads Studio - Brands */}
      <Composition
        id="brands-9x16"
        component={AdsStudioBrands}
        durationInFrames={1752}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="brands-16x9"
        component={AdsStudioBrands_16x9}
        durationInFrames={1752}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Ads Studio - Desks */}
      <Composition
        id="desks-9x16"
        component={AdsStudio007}
        durationInFrames={1450}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="desks-16x9"
        component={AdsStudio007_16x9}
        durationInFrames={1360}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Ads Studio - Mobile Phones */}
      <Composition
        id="mobile-phones-9x16"
        component={MobilePhones_9x16}
        durationInFrames={1168}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="mobile-phones-16x9"
        component={MobilePhones_16x9}
        durationInFrames={1325}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Ads Studio - Fashion */}
      <Composition
        id="fashion-9x16"
        component={AdsStudio008}
        durationInFrames={1262}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="fashion-16x9"
        component={AdsStudio008_16x9}
        durationInFrames={1262}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Ads Studio - Accessories */}
      <Composition
        id="accessories-9x16"
        component={AdsStudio009}
        durationInFrames={1239}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="accessories-16x9"
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
        durationInFrames={2076}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="wayve-nature-16x9"
        component={WayveNature_16x9}
        durationInFrames={2076}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Wayve Action */}
      <Composition
        id="wayve-action-9x16"
        component={WayveAction_9x16}
        durationInFrames={2076}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="wayve-action-16x9"
        component={WayveAction_16x9}
        durationInFrames={2076}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 2-11 Update */}
      <Composition
        id="2-11-update-9x16"
        component={Update211_9x16}
        durationInFrames={4635}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="2-11-update-16x9"
        component={Update211_16x9}
        durationInFrames={4635}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 2-25 Update */}
      <Composition
        id="2-25-update-9x16"
        component={Update225_9x16}
        durationInFrames={UPDATE225_9x16_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="2-25-update-16x9"
        component={Update225_16x9}
        durationInFrames={UPDATE225_16x9_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Ad Hero */}
      <Composition
        id="ad-hero-16x9"
        component={AdHero_16x9}
        durationInFrames={AD_HERO_DURATION}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* Stitch */}
      <Composition
        id="stitch-16x9"
        component={Stitch_16x9}
        durationInFrames={STITCH_DURATION}
        fps={60}
        width={1920}
        height={1080}
      />

    </>
  );
};
