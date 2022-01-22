import React from 'react'
import styled from 'styled-components'
import PageHeader from '@components/molecules/page-header'
import PortalBlockNumber from '@components/organisms/portal-block-number'
import StakingForm from '@components/organisms/staking-rewards/staking-form'
import ClaimForm from '@components/organisms/staking-rewards/claim-form'
import useNetwork from '@hooks/use-network'
import { t } from '@lingui/macro'
import useLoyaltyTier from '@hooks/use-loyalty-tier'
import InfoTooltip from "@components/atoms/info-tooltip";

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
  const { tierLevel } = useLoyaltyTier()

  if (!supportedStakingChain) {
    location.href = '/portfolio'

    return
  }

  return (
    <>
      <div className="container mt-3">
        <PageHeader>
          <div className="row align-items-center">
            <div className="col">
              <PageHeader.Subtitle>Staking</PageHeader.Subtitle>
              <PageHeader.Title>Earn rewards</PageHeader.Title>
            </div>
          </div>
          <div className="d-flex mt-2" style={{fontSize: "13px"}}>
            <span className="text-muted pe-2">{t`Loyalty Tier:`}</span><span>{tierLevel.label}</span>
            <InfoTooltip>
              <>
                <strong>{t`Associate`}</strong> - Stake min 5.000 PCR<br />
                <strong>{t`Senior`}</strong> - Stake min 15.000 PCR<br />
                <strong>{t`Manager`}</strong> - Stake min 35.000 PCR<br />
                <strong>{t`Partner`}</strong> - Stake min 100.000 PCR
              </>
            </InfoTooltip>
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
