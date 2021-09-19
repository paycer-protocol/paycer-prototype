import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import PageHeader from '@components/molecules/page-header'
import SwapForm from '@components/organisms/swap/swap-form'
import SupplyForm from '@components/organisms/swap/supply-form'
import WalletConnect from '@components/organisms/web3/wallet-connect'
import useWallet from '@hooks/use-wallet'
import useNetwork from '@hooks/use-network'
import {t} from "@lingui/macro";

const Tab = styled.div`
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  height: 40px;
  padding: 8px 20px;
  cursor: pointer;
  bacground: #0B1120;
  border: 1px solid #213752;
  border-bottom: none;
  margin-right: 1px;
  position: relative;
  z-index: 2;
  top: 3px;
  
  ${props => props.isActive && css`
    background: #192434;
  `} 
  
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
            <Tab isActive={!supplyTabActive} onClick={() => setSupplyTabActive(false)}>{t`Swap`}</Tab>
            <Tab isActive={supplyTabActive} onClick={() => setSupplyTabActive(true)}>{t`Supply Liquidity`}</Tab>
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
