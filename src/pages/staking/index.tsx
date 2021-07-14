import React from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import StakingForm from '@components/organisms/staking-rewards/staking-form'
import ClaimForm from '@components/organisms/staking-rewards/claim-form'

const VerticalLine = styled.div`
    border-right: 1px solid #244166;
    margin: 20px 30px 20px 50px;
`

export default () => {
  return (
    <div className="container">
      <PageHeader>
        <div className="row align-items-center">
          <div className="col">
            <PageHeader.Subtitle><Trans>Overview</Trans></PageHeader.Subtitle>
            <PageHeader.Title><Trans>Staking Rewards</Trans></PageHeader.Title>
          </div>
        </div>
      </PageHeader>
      <div className="card">
        <div className="card-body">
          <div className="d-flex flex-column flex-md-row">
            <div className="w-100">
              <StakingForm />
            </div>
            <VerticalLine className="d-none d-md-block" />
            <div className="w-100">
              <ClaimForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
