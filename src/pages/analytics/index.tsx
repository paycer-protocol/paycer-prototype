import React from 'react'
import { Trans } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import AnalyticsDashboard from '@components/organisms/analytics-dashboard'
import PortalBlockNumber from '@components/organisms/portal-block-number'

export default function Analytics () {

   return (
       <>
          <div className="container mt-3">
             <PageHeader>
                <div className="row align-items-center">
                   <div className="col">
                      <PageHeader.Subtitle>
                         <Trans>Analytics</Trans>
                      </PageHeader.Subtitle>
                      <PageHeader.Title>
                         <Trans>Paycer Financial Stats</Trans>
                      </PageHeader.Title>
                   </div>
                </div>
             </PageHeader>
             <div className="position-relative">
                 <AnalyticsDashboard />
             </div>
          </div>
          <PortalBlockNumber />
       </>
   )
}
