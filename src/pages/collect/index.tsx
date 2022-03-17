import React, { useRef, useState } from 'react'
import { Trans } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import HeroSection from '@components/organisms/collect/hero-section'
import TierList from '@components/organisms/collect/tier/tier-list'
import LegendSection from '@components/organisms/collect/legend-section'
import MarketingHero from '@components/organisms/collect/marketing-hero'
import ExplanationSection from '@components/organisms/collect/explanatory-section'

export default function Collect() {

  const tierListRef = useRef<HTMLDivElement>();
  const explanationSectionRef = useRef<HTMLDivElement>();

  return (
    <>
      <div className="container mt-3">
        <PageHeader>
          <div className="row align-items-center">
            <div className="col">
              <PageHeader.Subtitle>
                <Trans>Collect</Trans>
              </PageHeader.Subtitle>
              <PageHeader.Title>
                <Trans>Paycer Utility NFT</Trans>
              </PageHeader.Title>
            </div>
          </div>
        </PageHeader>
        <div>
          <HeroSection
            onMintClicked={() => tierListRef.current.scrollIntoView({ behavior: 'smooth' })}
            onMoreInfoClicked={() => explanationSectionRef.current.scrollIntoView({ behavior: 'smooth' })}
          />
        </div>
        <div className="pt-6" ref={tierListRef}><TierList /></div>
        <div className="pt-6"><LegendSection /></div>
        <div className="pt-6"><MarketingHero /></div>
        <div className="pt-6" ref={explanationSectionRef}><ExplanationSection /></div>
      </div>
    </>
  )
}

