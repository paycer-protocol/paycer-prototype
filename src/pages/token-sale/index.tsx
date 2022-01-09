import React from 'react'
import { Trans } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import PortalBlockNumber from '@components/organisms/portal-block-number'
import TokenSaleWrapper from '@components/organisms/token-sale'

export default function TokenSale() {
  return (
    <>
      <div className="container mt-3 mb-8">
        <PageHeader>
          <div className="row align-items-center">
            <div className="col">
              <PageHeader.Subtitle>
                <Trans>Token Sale</Trans>
              </PageHeader.Subtitle>
              <PageHeader.Title>
                <Trans>Investor Dashboard</Trans>
              </PageHeader.Title>
            </div>
          </div>
        </PageHeader>
        <TokenSaleWrapper />
      </div>
      <PortalBlockNumber />
    </>
  )
}

