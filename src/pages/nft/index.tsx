import AboutSection from "@components/organisms/nft/landing-page/about-section"
import FaqSection from "@components/organisms/nft/landing-page/faq-section"
import UspSection from "@components/organisms/nft/landing-page/usp-section"
import NftLandingPageLayout from "@components/organisms/nft/landing-page/layout"
import MintSection from "@components/organisms/nft/landing-page/mint-section"
import RoadmapSection from "@components/organisms/nft/landing-page/roadmap-section"
import RoadmapSectionMobile from "@components/organisms/nft/landing-page/roadmap-section-mobile"
import TeamSection from "@components/organisms/nft/landing-page/team-section"
import TitleSection from "@components/organisms/nft/landing-page/title-section"
import DiscordSection from "@components/organisms/nft/landing-page/discord-section"
import AchievementsSection from "@components/organisms/nft/landing-page/achievements-section"
import { t } from "@lingui/macro"
import SectionHoc from './section-hoc'
import { useRef } from "react"
import { useMediaQuery } from "react-responsive"

const presaleStart = new Date(Date.parse('30 Oct 2022 00:00:00 GMT'));
const publicSaleStart = new Date(Date.parse('30 Nov 2022 00:00:00 GMT'));

export default function NftLandingPage() {
  const presaleStartsIn = presaleStart.getTime() - Date.now()
  const presaleStarted = presaleStartsIn <= 0

  const aboutSection = useRef<HTMLDivElement>()
  const mintSection = useRef<HTMLDivElement>()
  const uspSection = useRef<HTMLDivElement>()
  const achievementSection = useRef<HTMLDivElement>()
  const roadmapSection = useRef<HTMLDivElement>()
  const teamSection = useRef<HTMLDivElement>()
  const faqSection = useRef<HTMLDivElement>()

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991.98px)' })

  const sections = [
    { label: t`About`, ref: aboutSection },
    { label: t`Mint`, ref: mintSection },
    { label: t`USPs`, ref: uspSection },
    { label: t`Achievements`, ref: achievementSection },
    { label: t`Roadmap`, ref: roadmapSection },
    { label: t`Team`, ref: teamSection },
    { label: t`FAQ`, ref: faqSection },
  ]

  return (
    <NftLandingPageLayout
      sections={sections}
    >
      <TitleSection
        onMintNowClicked={() => mintSection.current.scrollIntoView({ behavior: 'smooth' })}
        presaleStarted={presaleStarted}
      />
      <SectionHoc anchorRef={aboutSection} anchorId={1}>
        <AboutSection />
      </SectionHoc>

      <SectionHoc anchorRef={mintSection} anchorId={2}>
        <div className="position-relative" style={{zIndex: 1}}>
          <MintSection
            onNeedHelpClicked={() => faqSection.current.scrollIntoView({ behavior: 'smooth' })}
            presaleStart={presaleStart}
            publicSaleStart={publicSaleStart}
          />
        </div>
      </SectionHoc>
      <SectionHoc anchorRef={uspSection} anchorId={3}>
        <div className="position-relative" style={{zIndex: 2}}>
          <UspSection />
        </div>
      </SectionHoc>
      <SectionHoc anchorRef={achievementSection} anchorId={4}>
          <AchievementsSection />
      </SectionHoc>
      <SectionHoc anchorRef={roadmapSection} anchorId={5}>
        {isTabletOrMobile ? <RoadmapSectionMobile /> : <RoadmapSection />}
      </SectionHoc>
      <SectionHoc anchorRef={teamSection} anchorId={6}>
        <TeamSection />
      </SectionHoc>
      <SectionHoc anchorRef={faqSection} anchorId={7}>
        <FaqSection />
      </SectionHoc>
      <div className="mt-6">
        <DiscordSection />
      </div>
    </NftLandingPageLayout>
  )
}


