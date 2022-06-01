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
import SwiperSection from "@components/organisms/nft/landing-page/swiper-section"
import { t } from "@lingui/macro"
import SectionHoc from './section-hoc'
import React, { useEffect, useRef, useState } from "react"
import { useMediaQuery } from "react-responsive"
import Icon from "@components/atoms/icon";
import { ArrowUpward } from "@styled-icons/material"
import styled from "styled-components"

const ToTopButton = styled.div`
  position: fixed;
  background: linear-gradient(86deg, rgba(133, 12, 167, 1) 0%, rgba(66, 1, 220, 1) 100%);
  color: #FFF;
  border-radius: 99999px;
  width: 43px;
  justify-content: center;
  display: flex;
  align-items: center;
  height: 43px;
  margin-bottom: 3rem;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;    
  bottom: -10px;
  left: 40px;
  z-index: 33;
  &:hover {
    background-color: white;
    color: black;
  }
`

const presaleStart = new Date(Date.parse('30 Oct 2022 00:00:00 GMT'));
const publicSaleStart = new Date(Date.parse('30 Nov 2022 00:00:00 GMT'));

export default function NftLandingPage() {
  const [ showScrollTopButton, setShowScrollTopButton ] = useState(false)
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

  function scrollHandler() {

    if (window.pageYOffset === 0) {
      setShowScrollTopButton(false)
    }

    if (window.pageYOffset > 500) {
      setShowScrollTopButton(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler)

    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [])

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
        <div className="position-relative mb-7" style={{zIndex: 1}}>
          <MintSection
            onNeedHelpClicked={() => faqSection.current.scrollIntoView({ behavior: 'smooth' })}
            presaleStart={presaleStart}
            publicSaleStart={publicSaleStart}
          />
        </div>
      </SectionHoc>
      <SectionHoc anchorRef={uspSection} anchorId={3}>
        <div className="position-relative mb-7" style={{zIndex: 2}}>
          <UspSection />
        </div>
      </SectionHoc>
      <div className="mb-7">
        <SwiperSection />
      </div>
      <SectionHoc anchorRef={achievementSection} anchorId={4}>
        <div className="mb-7">
          <AchievementsSection />
        </div>
      </SectionHoc>
      <SectionHoc anchorRef={roadmapSection} anchorId={5}>
        <div className="mb-8 pb-md-5">
          {isTabletOrMobile ? <RoadmapSectionMobile /> : <RoadmapSection />}
        </div>
      </SectionHoc>
      <SectionHoc anchorRef={teamSection} anchorId={6}>
        <div className="mb-7">
          <TeamSection />
        </div>
      </SectionHoc>
      <SectionHoc anchorRef={faqSection} anchorId={7}>
        <div className="mb-7">
          <FaqSection />
        </div>
      </SectionHoc>
      <div className="mt-6">
        <DiscordSection />
      </div>

      {showScrollTopButton &&
          <ToTopButton>
            <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Icon size={16} component={ArrowUpward} />
            </div>
          </ToTopButton>
      }

    </NftLandingPageLayout>
  )
}


