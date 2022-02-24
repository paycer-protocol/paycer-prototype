import React, { useState } from 'react'
import { Trans } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import InfoDashboard from '@components/organisms/info-dashboard'
import PortalBlockNumber from '@components/organisms/portal-block-number'
import InfoDashboardContextProvider from '@context/info-dashboard-context'

export default function Info() {

   return (
       <>
          <div className="container mt-3">
             <PageHeader>
                <div className="row align-items-center">
                   <div className="col">
                      <PageHeader.Subtitle>
                         <Trans>Info</Trans>
                      </PageHeader.Subtitle>
                      <PageHeader.Title>
                         <Trans>Paycer Overview</Trans>
                      </PageHeader.Title>
                      <span className="badge bg-danger-soft mt-3 text-white py-2 px-3">This page is a demo</span>
                   </div>
                </div>
             </PageHeader>
             <div className="position-relative">
                <InfoDashboardContextProvider>
                  <InfoDashboard />
                </InfoDashboardContextProvider>
             </div>
          </div>
          <PortalBlockNumber />
       </>
   )
}
