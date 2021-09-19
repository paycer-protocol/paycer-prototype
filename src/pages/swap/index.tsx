import React, { useState } from 'react'
import styled from 'styled-components'
import PageHeader from '@components/molecules/page-header'
import SwapForm from '@components/organisms/swap/swap-form'
import SupplyForm from '@components/organisms/swap/supply-form'
import WalletConnect from '@components/organisms/web3/wallet-connect'
import useWallet from '@hooks/use-wallet'
import useNetwork from '@hooks/use-network'


const Tab = styled.div`
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  background: white;
  height: 40px;
`

export default function Swap () {
  const { isConnected } = useWallet()
  const { supportedStakingChain } = useNetwork()
  const [supplyTabActive, setSupplyTabActive] = useState(false)

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

        <div>

          <div className="d-flex">
            <Tab onClick={() => setSupplyTabActive(false)}>Bla</Tab>
            <Tab onClick={() => setSupplyTabActive(true)}>Bla</Tab>
          </div>


          <div className="card blur-background">
            <div className="card-body">
              <div className="d-flex flex-column flex-md-row">
                <div className="w-100">
                  {
                    !supplyTabActive
                        ? (
                            <SwapForm />
                        )
                        : (
                            <SupplyForm />
                        )
                  }
                </div>
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
