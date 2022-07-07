import React from 'react'
import { t } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import AirdropContextProvider from '@context/airdrop-context'
import PortalBlockNumber from '@components/organisms/portal-block-number'
import AirdropClaim from '@components/organisms/airdrop'
import Layout from '@components/organisms/layout'

export default function Airdrop() {
  return (
    <Layout>
      <div className="container mt-3 mb-8">
        <PageHeader>
          <div className="row align-items-center">
            <div className="col">
              <PageHeader.Subtitle>
                {t`Airdrop`}
              </PageHeader.Subtitle>
              <PageHeader.Title>
                {t`Claim distribution`}
              </PageHeader.Title>
            </div>
          </div>
        </PageHeader>
        <AirdropContextProvider>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <AirdropClaim />
            </div>
          </div>

        </AirdropContextProvider>
      </div>
      <PortalBlockNumber />
    </Layout>
  )
}

