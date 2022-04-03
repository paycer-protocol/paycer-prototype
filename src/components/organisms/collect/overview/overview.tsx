import React, { useRef } from 'react'
import Stage from '@components/organisms/collect/overview/stage'
import TierList from '@components/organisms/collect/overview/tier/tier-list'
import CreditCardTeaser from '@components/organisms/collect/overview/credit-card-teaser'
import QualityLegend from '@components/organisms/collect/overview/quality/quality-legend'
import MarketingHero from '@components/organisms/collect/overview/marketing-hero'
import Explanatory from '@components/organisms/collect/overview/explanatory'
import NftList from '@components/organisms/collect/overview/owned/nft-list'

export default function Overview() {

    const tierListRef = useRef<HTMLDivElement>();
    const explanationSectionRef = useRef<HTMLDivElement>();

    return (
        <>
            <Stage
                onMintClicked={() => tierListRef.current.scrollIntoView({ behavior: 'smooth' })}
                onMoreInfoClicked={() => explanationSectionRef.current.scrollIntoView({ behavior: 'smooth' })}
            />
            <div className="mt-6">
                <QualityLegend />
            </div>
            <div className="mt-6" ref={tierListRef}>
                <TierList />
            </div>
            <div className="mt-6">
                <CreditCardTeaser />
            </div>

            <NftList />

            <div className="mt-6">
                <MarketingHero />
            </div>
            <div className="mt-6" ref={explanationSectionRef}>
                <Explanatory />
            </div>
        </>
    )
}

