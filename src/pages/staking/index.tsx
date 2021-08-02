import React from 'react'
import styled from 'styled-components'
import router from 'next/router'
import PageHeader from '@components/molecules/page-header'
import StakingForm from '@components/organisms/staking-rewards/staking-form'
import ClaimForm from '@components/organisms/staking-rewards/claim-form'
import WalletConnect from '@components/organisms/web3/wallet-connect'
import useWallet from '@hooks/use-wallet'
import useNetwork from '@hooks/use-network'

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
  const { supportedStakingChain } = useNetwork()

  if (!supportedStakingChain) {
    location.href = '/'

    return
  }

  return (
    <div className="container mt-3">
      <PageHeader>
        <div className="row align-items-center">
          <div className="col">
            <PageHeader.Subtitle>Overview</PageHeader.Subtitle>
            <PageHeader.Title>Staking Rewards</PageHeader.Title>
          </div>
        </div>
      </PageHeader>
      {isConnected && (
        <div className="card blur-background">
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
      )}
      {!isConnected && (
        <div className="d-flex justify-content-center">
          <WalletConnect />
        </div>
      )}
    </div>
  )
}
