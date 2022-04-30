import AboutSection from "@components/organisms/nft/landing-page/about-section";
import FaqSection from "@components/organisms/nft/landing-page/faq-section";
import MintSection from "@components/organisms/nft/landing-page/mint-section";
import RoadmapSection from "@components/organisms/nft/landing-page/roadmap-section";
import TeamSection from "@components/organisms/nft/landing-page/team-section";
import TitleSection from "@components/organisms/nft/landing-page/title-section";

export default function NftLandingPage() {
  return (
    <>
      <TitleSection />
      <AboutSection />
      <MintSection />
      <RoadmapSection />
      <TeamSection />
      <FaqSection />
    </>
  )
}


