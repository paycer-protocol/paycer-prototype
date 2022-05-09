import AboutSection from "@components/organisms/nft/landing-page/about-section";
import FaqSection from "@components/organisms/nft/landing-page/faq-section";
import UspSection from "@components/organisms/nft/landing-page/usp-section";
import NftLandingPageLayout from "@components/organisms/nft/landing-page/layout";
import MintSection from "@components/organisms/nft/landing-page/mint-section";
import RoadmapSection from "@components/organisms/nft/landing-page/roadmap-section";
import TeamSection from "@components/organisms/nft/landing-page/team-section";
import TitleSection from "@components/organisms/nft/landing-page/title-section";
import DiscordSection from "@components/organisms/nft/landing-page/discord-section";
import { t } from "@lingui/macro";
import { useRef } from "react";

const presaleStart = new Date(Date.parse('30 Oct 2022 00:00:00 GMT'));
const publicSaleStart = new Date(Date.parse('30 Nov 2022 00:00:00 GMT'));

export default function NftLandingPage() {
  const presaleStartsIn = presaleStart.getTime() - Date.now()
  const presaleStarted = presaleStartsIn <= 0

  const aboutSection = useRef<HTMLDivElement>();
  const mintSection = useRef<HTMLDivElement>();
  const uspSection = useRef<HTMLDivElement>();
  const roadmapSection = useRef<HTMLDivElement>();
  const teamSection = useRef<HTMLDivElement>();
  const faqSection = useRef<HTMLDivElement>();

  return (
    <NftLandingPageLayout
      sections={[
        { label: t`About`, ref: aboutSection },
        { label: t`Mint`, ref: mintSection },
        { label: t`USPs`, ref: uspSection },
        { label: t`Roadmap`, ref: roadmapSection },
        { label: t`Team`, ref: teamSection },
        { label: t`FAQ`, ref: faqSection },
      ]}
    >
      <TitleSection
        onMintNowClicked={() => mintSection.current.scrollIntoView({ behavior: 'smooth' })}
        presaleStarted={presaleStarted}
      />
      <div ref={aboutSection}>
        <AboutSection />
      </div>
      <div ref={mintSection}>
        <MintSection
          onNeedHelpClicked={() => faqSection.current.scrollIntoView({ behavior: 'smooth' })}
          presaleStart={presaleStart}
          publicSaleStart={publicSaleStart}
        />
      </div>
      <div ref={uspSection}>
        <UspSection />
      </div>
      <div ref={roadmapSection}>
        <RoadmapSection />
      </div>
      <div ref={teamSection}>
        <TeamSection />
      </div>
      <div ref={faqSection}>
        <FaqSection />
      </div>
      <div className="mt-6">
        <DiscordSection />
      </div>
    </NftLandingPageLayout>
  )
}


