import React, { useState } from 'react'
import { t } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import SwapForm from '@components/organisms/swap/swap-form'
import SupplyForm from '@components/organisms/swap/supply-form'
import PortalBlockNumber from '@components/organisms/portal-block-number'

export default function Trade () {
  const [supplyTabActive, setSupplyTabActive] = useState(false)

  return (
    <>
      <div className="container mt-3">
        <PageHeader>
          <div className="row align-items-center">
            <div className="col">
              <PageHeader.Subtitle>Overview</PageHeader.Subtitle>
              <PageHeader.Title>Swap</PageHeader.Title>
              <span className="badge bg-danger-soft mt-3 text-white py-2 px-3">This page is a demo</span>
            </div>
          </div>
        </PageHeader>
        <div>
          <div className="d-flex">
            <div className={supplyTabActive ? 'PCR-Tab' : 'PCR-Tab PCR-Tab--isActive' } onClick={() => setSupplyTabActive(false)}>{t`Swap`}</div>
            <div className={supplyTabActive ? 'PCR-Tab PCR-Tab--isActive' : 'PCR-Tab' } onClick={() => setSupplyTabActive(true)}>{t`Supply Liquidity`}</div>
          </div>
          <div className="card blur-background">
            <div className="card-body p-0">
              <div className="d-flex flex-column flex-md-row">
                <div className="w-100">
                  {supplyTabActive ? <SupplyForm /> : <SwapForm />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PortalBlockNumber />
    </>
  )
}
