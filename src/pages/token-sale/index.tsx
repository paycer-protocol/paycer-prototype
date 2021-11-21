import React from 'react'

import {t, Trans} from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import InvestForm from '@components/organisms/token-sale/invest-form'
import { TokenSaleProvider } from '@context/token-sale-context'

export default function TokenSale() {

  return (
      <TokenSaleProvider>
        <div className="container mt-3 mb-8">
          <PageHeader>
            <div className="row align-items-center">
              <div className="col">
                <PageHeader.Subtitle>
                  <Trans>Token Sale</Trans>
                </PageHeader.Subtitle>
                <PageHeader.Title>
                  <Trans>Pre Sale</Trans>
                </PageHeader.Title>
              </div>
            </div>
          </PageHeader>

          <div className="card blur-background">
            <div className="card-body p-0">
                <InvestForm />
            </div>
          </div>
          <small className="text-muted">
            <Trans>¹ Use a referral code provided by a friend and you and your friend will get a 5% Bonus based on your invest.</Trans>
          </small>
        </div>
      </TokenSaleProvider>
  )
}

