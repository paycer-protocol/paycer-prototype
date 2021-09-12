import React from 'react'
import styled from 'styled-components'
import PageHeader from '@components/molecules/page-header'
import SwapForm from '@components/organisms/swap/swap-form'
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

export default function Swap () {
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
            <PageHeader.Subtitle>Swap</PageHeader.Subtitle>
            <PageHeader.Title>Swap transaction</PageHeader.Title>
          </div>
        </div>
      </PageHeader>
      {isConnected && (
        <div className="card blur-background">
          <div className="card-body">
            <div className="d-flex flex-column flex-md-row">
              <div className="w-100">
                <SwapForm />
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
