import React, {useState} from 'react'
import styled from 'styled-components'
import {t, Trans} from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import PortalBlockNumber from '@components/organisms/portal-block-number'
import KycProcessInfo from '@components/organisms/token-sale/info'
import KycProcessTimeline from '@components/organisms/token-sale/timeline'
import Transactions from '@components/organisms/token-sale/transactions'
import { TokenSaleProvider } from '@context/token-sale-context'

const VerticalLine = styled.div`
    border-right: 1px solid #244166;
    margin: 0 30px;
`

const HorizontalLine = styled.div`
    border-top: 1px solid #244166;
    margin: 30px 0;
    position: relative;
`

export const LeftCol = styled.div`
    width: 50%;
    padding: 30px 0 30px 30px;

    @media only screen and (max-width : 978px) {
      width: 100%;
      padding: 25px;
    }

`

export const RightCol = styled.div`
    width: 50%;
    padding: 30px 30px 30px 0;

    @media only screen and (max-width : 978px) {
        width: 100%;
        padding: 25px;
    }
`

export default function TokenSale() {
  return (
    <>
      <TokenSaleProvider>
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
          <div className="card blur-background">
            <div className="card-body p-0">
              <div className="d-lg-flex">
                <>
                  <LeftCol>
                    <KycProcessInfo />
                  </LeftCol>
                  <VerticalLine />
                  <HorizontalLine className="d-md-none" />
                  <RightCol>
                    <KycProcessTimeline />
                  </RightCol>
                </>
              </div>
            </div>
          </div>
        </div>
      </TokenSaleProvider>
      <PortalBlockNumber />
    </>
  )
}
