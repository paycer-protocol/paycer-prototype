import React from 'react'
import { Trans } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import AnalyticsDashboard from '@components/organisms/analytics-dashboard'
import PortalBlockNumber from '@components/organisms/portal-block-number'
import Layout from '@components/organisms/layout'

export default function Analytics () {

   return (
       <Layout>
          <div className="container mt-3">
             <PageHeader>
                <div className="row align-items-center">
                   <div className="col">
                      <PageHeader.Subtitle>
                         <Trans>Analytics</Trans>
                      </PageHeader.Subtitle>
                      <PageHeader.Title>
                         <Trans>Financial Stats</Trans>
                      </PageHeader.Title>
                   </div>
                </div>
             </PageHeader>
             <div className="position-relative blur-background">
                 <AnalyticsDashboard />
             </div>
          </div>
          <PortalBlockNumber />
       </Layout>
   )
}
