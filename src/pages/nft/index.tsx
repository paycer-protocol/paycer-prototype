import AboutSection from "@components/organisms/nft/landing-page/about-section";
import FaqSection from "@components/organisms/nft/landing-page/faq-section";
import IconSection from "@components/organisms/nft/landing-page/icon-section";
import MintSection from "@components/organisms/nft/landing-page/mint-section";
import RoadmapSection from "@components/organisms/nft/landing-page/roadmap-section";
import TeamSection from "@components/organisms/nft/landing-page/team-section";
import TitleSection from "@components/organisms/nft/landing-page/title-section";
import { useRef } from "react";

export default function NftLandingPage() {
  const ref = useRef<HTMLDivElement>();

  return (
    <div>
      <TitleSection onMintNowClicked={() => ref.current.scrollIntoView({ behavior: 'smooth' })} />
      <AboutSection />
      <div ref={ref}>
        <MintSection />
      </div>
      <IconSection />
      <RoadmapSection />
      <TeamSection />
      <FaqSection />
    </div>
  )
}


