import React from "react";
import { Composition } from "remotion";
import { DynamicComp } from "./DynamicComp";
import { DarwinLogoAnimation } from "./DarwinLogoAnimation";
import { TextRevealAnimation } from "./TextRevealAnimation";
import { DarwinFullAnimation } from "./DarwinFullAnimation";
import { DarwinReorderedAnimation } from "./DarwinReorderedAnimation";
import { DarwinAnimation2 } from "./DarwinAnimation2";
import { ElectroPop } from "./ElectroPop";
import { ElectroPop_16x9 } from "./ElectroPop_16x9";
import { NewAnimation } from "./NewAnimation";
import { NewAnimation02 } from "./NewAnimation02";
import { NewAnimation02_16x9 } from "./NewAnimation02_16x9";
import { AdsStudio001 } from "./AdsStudio001";
import { AdsStudio001_16x9 } from "./AdsStudio001_16x9";
import { AdsStudio002 } from "./AdsStudio002";
import { AdsStudio002_16x9 } from "./AdsStudio002_16x9";
import { AdsStudio005 } from "./AdsStudio005";
import { AdsStudio005_16x9 } from "./AdsStudio005_16x9";
import { AdsStudio006 } from "./AdsStudio006";
import { AdsStudio006_16x9 } from "./AdsStudio006_16x9";
import { AdsStudio007 } from "./AdsStudio007";
import { AdsStudio007_16x9 } from "./AdsStudio007_16x9";
import { AdsStudioBrands } from "./AdsStudioBrands";
import { AdsStudioBrands_16x9 } from "./AdsStudioBrands_16x9";
import { AdsStudio008 } from "./AdsStudio008";
import { AdsStudio008_16x9 } from "./AdsStudio008_16x9";
import { AdsStudio009 } from "./AdsStudio009";
import { AdsStudio009_16x9 } from "./AdsStudio009_16x9";
import { AdsStudio010 } from "./AdsStudio010";
import { AdsStudio010_16x9 } from "./AdsStudio010_16x9";
import { WayveNature_9x16 } from "./WayveNature_9x16";
import { WayveNature_16x9 } from "./WayveNature_16x9";

const defaultCode = `import { AbsoluteFill } from "remotion";
export const MyAnimation = () => <AbsoluteFill style={{ backgroundColor: "#000" }} />;`;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ads-studio-desks-9x16"
        component={AdsStudio007}
        durationInFrames={1450}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ads-studio-brands-9x16"
        component={AdsStudioBrands}
        durationInFrames={1602}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ads-studio-brands-16x9"
        component={AdsStudioBrands_16x9}
        durationInFrames={1602}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ads-studio-desks-16x9"
        component={AdsStudio007_16x9}
        durationInFrames={1360}
        fps={30}
        width={1920}
        height={1080}
      />
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
      <Composition
        id="wayve-nature-9x16"
        component={WayveNature_9x16}
        durationInFrames={1620}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="wayve-nature-16x9"
        component={WayveNature_16x9}
        durationInFrames={1620}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
