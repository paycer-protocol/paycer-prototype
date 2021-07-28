import React from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import StakingForm from '@components/organisms/staking-rewards/staking-form'
import ClaimForm from '@components/organisms/staking-rewards/claim-form'
import WalletConnect from '@components/organisms/web3/wallet-connect'
import Button from '@components/atoms/button'
import useWallet from '@hooks/use-wallet'
import LoyaltyTiers from '@components/organisms/loyalty-tiers'

const VerticalLine = styled.div`
    border-right: 1px solid #244166;
    margin: 20px 30px 20px 50px;
`

const HorizontalLine = styled.div`
    border-top: 1px solid #244166;
    margin: 50px 30px 0;
`

export default function Staking () {
  const { isConnected } = useWallet()

  return (
    <div className="container mt-3">
      <PageHeader>
        <div className="row align-items-center">
          <div className="col">
            <PageHeader.Subtitle>Overview</PageHeader.Subtitle>
            <PageHeader.Title>Staking Rewards</PageHeader.Title>
          </div>
          <div className="col-auto">
            <Button variant="outline-primary">
              <Trans>Buy PCR Token</Trans>
            </Button>
          </div>
        </div>
      </PageHeader>
      {isConnected && (
        <div className="blur-background-dist">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-column flex-md-row">
                <div className="w-100">
                  <StakingForm />
                </div>
                <VerticalLine className="d-none d-md-block" />
                <HorizontalLine className="d-block d-md-none" />
                <div className="w-100">
                  <ClaimForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <LoyaltyTiers />

      {!isConnected && (
        <div className="d-flex justify-content-center">
          <WalletConnect />
        </div>
      )}
    </div>
  )
}
