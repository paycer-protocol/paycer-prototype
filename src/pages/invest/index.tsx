import React, { useState } from 'react'
import { t } from '@lingui/macro'
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
                {t`Overview`}
              </PageHeader.Subtitle>
              <PageHeader.Title>
                {t`Invest`}
              </PageHeader.Title>
              <span className="badge bg-danger-soft mt-3 text-white py-2 px-3">This page is a demo</span>
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
