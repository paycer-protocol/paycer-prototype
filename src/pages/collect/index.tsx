import React, { useState } from 'react'
import { Trans } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import HeroSection from '@components/organisms/collect/hero-section'
import NftArtworkList from '@components/organisms/collect/nft-artwork/list'
import LegendSection from '@components/organisms/collect/legend-section'

export default function Collect() {
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
        <HeroSection />
        <NftArtworkList />
        <LegendSection />
      </div>
    </>
  )
}

