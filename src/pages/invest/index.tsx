import React, { useState } from 'react'
import { Trans } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import InvestList from '@components/organisms/invest/invest-list'
import InvestListContextProvider from '@context/invest-list-context'

export default function Invest() {
  return (
    <>
      <div className="container mt-3">
        <PageHeader>
          <div className="row align-items-center">
            <div className="col">
              <PageHeader.Subtitle>
                <Trans>Overview</Trans>
              </PageHeader.Subtitle>
              <PageHeader.Title>
                <Trans>Invest</Trans>
              </PageHeader.Title>
            </div>
          </div>
        </PageHeader>
        <div className="position-relative blur-background">
          <InvestListContextProvider>
            <InvestList />
          </InvestListContextProvider>
        </div>
      </div>
    </>
  )
}
