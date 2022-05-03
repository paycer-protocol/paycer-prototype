import React from 'react'
import { Trans } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import { TokenOverviewListItems } from '@config/token-overview'
import TokenOverviewList from '@components/organisms/token-overview/token-overview-list'
import Layout from '@components/organisms/layout'

export default function TokenOverview() {

  return (
    <Layout>
      <div className="container mt-3 mb-8">
        <PageHeader>
          <div className="row align-items-center">
            <div className="col">
              <PageHeader.Subtitle>
                  <Trans>PCR Token</Trans>
              </PageHeader.Subtitle>
              <PageHeader.Title>
                  <Trans>Overview</Trans>
              </PageHeader.Title>
            </div>
          </div>
        </PageHeader>
        <div>
            <div className="row position-relatives blur-background">
              <div className="col-12">
                <TokenOverviewList
                  items={TokenOverviewListItems}
                />
              </div>
            </div>
        </div>
      </div>
    </Layout>
  )
}

