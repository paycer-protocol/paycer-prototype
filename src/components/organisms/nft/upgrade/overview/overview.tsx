import React, {useRef} from 'react'
import Stage from '@components/organisms/nft/upgrade/overview/stage'
import HowItWorks from '@components/organisms/nft/upgrade/overview/how-it-works'
import Usps from '@components/organisms/nft/upgrade/overview/usps'
import QualityLegend from '@components/organisms/nft/upgrade/overview/quality/quality-legend'
import Explanatory from '@components/organisms/nft/upgrade/overview/explanatory'
import UpgradeSection from '@components/organisms/nft/upgrade/overview/upgrade-section'

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
      </div>

      <div className="mt-7">
        <UpgradeSection />
      </div>
      <div className="container">
        <div className="mt-6">
          <Explanatory/>
        </div>
      </div>

    </>
  )
}

