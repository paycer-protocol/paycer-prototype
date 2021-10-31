import React, {useState} from 'react'
import styled from 'styled-components'
import {t, Trans} from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import KycProcessInfo from '@components/organisms/token-sale/info'
import KycProcessTimeline from '@components/organisms/token-sale/timeline'
import Transactions from '@components/organisms/token-sale/transactions'
import { TokenSaleProvider } from '@context/token-sale-context'

const VerticalLine = styled.div`
    border-right: 1px solid #244166;
    margin: 0 30px;
`

const LeftCol = styled.div`
    width: 40%;

    @media only screen and (max-width : 978px) {
      width: 100%;
      padding: 25px;
    }
`

const RightCol = styled.div`
    width: 60%;

    @media only screen and (max-width : 978px) {
        width: 100%;
        padding: 25px;
    }
`

export default function TokenSale() {
  const [transactionTabActive, setTransactionTabActive] = useState(false)
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
                <Trans>Investor Dashboard</Trans>
              </PageHeader.Title>
            </div>
          </div>
        </PageHeader>

        <div className="d-flex">
          <div className={transactionTabActive ? 'PCR-Tab' : 'PCR-Tab PCR-Tab--isActive' } onClick={() => setTransactionTabActive(false)}>{t`Overview`}</div>
          <div className={transactionTabActive ? 'PCR-Tab PCR-Tab--isActive' : 'PCR-Tab' } onClick={() => setTransactionTabActive(true)}>{t`Transactions`}</div>
        </div>

        <div className="card blur-background">
          <div className="card-body">
            <div className="d-lg-flex">

              {(transactionTabActive
                ?
                    <Transactions />
                :
                    <>
                      <LeftCol>
                        <KycProcessInfo />
                      </LeftCol>
                      <VerticalLine />
                      <RightCol>
                        <KycProcessTimeline />
                      </RightCol>
                    </>
              )}


            </div>
          </div>
        </div>
      </div>
    </TokenSaleProvider>
  )
}
