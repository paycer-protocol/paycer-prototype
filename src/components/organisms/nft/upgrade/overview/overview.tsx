import React, {useRef} from 'react'
import Stage from '@components/organisms/nft/upgrade/overview/stage'
import HowItWorks from '@components/organisms/nft/upgrade/overview/how-it-works'
import TierList from '@components/organisms/nft/upgrade/overview/tier/tier-list'
import Usps from '@components/organisms/nft/upgrade/overview/usps'
import CreditCardTeaser from '@components/organisms/nft/upgrade/overview/credit-card-teaser'
import QualityLegend from '@components/organisms/nft/upgrade/overview/quality/quality-legend'
import MarketingHero from '@components/organisms/nft/upgrade/overview/marketing-hero'
import Explanatory from '@components/organisms/nft/upgrade/overview/explanatory'
import NftList from '@components/organisms/nft/upgrade/overview/owned/nft-list'

export default function Overview() {

  const tierListRef = useRef<HTMLDivElement>();
  const explanationSectionRef = useRef<HTMLDivElement>();

  return (
    <>
      <div className="mb-7">
        <Stage/>
      </div>

      <div className="container">

        <div className="mb-7">
          <HowItWorks/>
        </div>

        <div className="mb-7">
          <QualityLegend/>
        </div>

        <div className="mt-7">
          <Usps/>
        </div>

        <div className="mt-7" ref={tierListRef}>
          <TierList/>
        </div>
        <div className="mt-7">
          <CreditCardTeaser/>
        </div>

        <NftList/>

        <div className="mt-7">
          <MarketingHero/>
        </div>

        <div className="mt-6" ref={explanationSectionRef}>
          <Explanatory/>
        </div>
      </div>

    </>
  )
}

