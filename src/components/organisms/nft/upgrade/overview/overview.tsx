import React, { useRef } from 'react'
import Stage from '@components/organisms/nft/upgrade/overview/stage'
import TierList from '@components/organisms/nft/upgrade/overview/tier/tier-list'
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

