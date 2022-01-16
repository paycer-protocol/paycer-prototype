import React from 'react'
import styled from 'styled-components'
import PageHeader from '@components/molecules/page-header'
import PortalBlockNumber from '@components/organisms/portal-block-number'
import StakingForm from '@components/organisms/staking-rewards/staking-form'
import ClaimForm from '@components/organisms/staking-rewards/claim-form'
import useNetwork from '@hooks/use-network'
import {t} from "@lingui/macro";

export const LeftCol = styled.div`
    width: 50%;
    padding: 40px 20px 40px 40px;
    align-items: stretch;
    @media only screen and (max-width : 978px) {
      width: 100%; padding: 20px;    
    }
`

export const RightCol = styled.div`
    width: 50%;
    padding: 40px 40px 40px 20px;

    @media only screen and (max-width : 978px) {
      width: 100%;
      padding: 20px;
    }
`


export default function Staking () {
  const { supportedStakingChain } = useNetwork()

  if (!supportedStakingChain) {
    location.href = '/'

    return
  }

  return (
    <>
      <div className="container mt-3">
        <PageHeader>
          <div className="row align-items-center">
            <div className="col">
              <PageHeader.Subtitle>Overview</PageHeader.Subtitle>
              <PageHeader.Title>Staking Rewards</PageHeader.Title>
            </div>
          </div>
        </PageHeader>

        <div className="card blur-background">
          <div className="card-body p-0">
            <div className="d-lg-flex">
              <LeftCol>
                <StakingForm />
              </LeftCol>
              <RightCol>

                <ClaimForm />
              </RightCol>
            </div>
          </div>
        </div>
      </div>
      <PortalBlockNumber />
    </>
  )
}
