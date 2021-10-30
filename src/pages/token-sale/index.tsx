import React from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import KycProcessInfo from '@components/organisms/kyc-process/info/index'
import KycProcessTimeline from '@components/organisms/kyc-process/timeline/index'
import { TokenSaleProvider } from '@context/token-sale-context'

const GradientCard = styled.div`
    @media only screen and (min-width : 979px) {
        background: rgb(25,36,52);
        background: linear-gradient(90deg, rgba(25,36,52,1) 0%, rgba(15,21,38,1) 15%, rgba(25,36,52,1) 40%);
    }
`

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
        <GradientCard className="card">
          <div className="card-body">
            <div className="d-lg-flex">
              <LeftCol>
                <KycProcessInfo />
              </LeftCol>
              <VerticalLine />
              <RightCol>
                <KycProcessTimeline />
              </RightCol>
            </div>
          </div>
        </GradientCard>
      </div>
    </TokenSaleProvider>
  )
}
