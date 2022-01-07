import React, { useState} from 'react'
import styled from 'styled-components'
import { t, Trans } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import PortalBlockNumber from '@components/organisms/portal-block-number'
import KycProcessInfo from '@components/organisms/token-sale/info'
import Vesting from '@components/organisms/token-sale/vesting'
import GradientButton from '@components/atoms/button/gradient-button'
import KycProcessTimeline from '@components/organisms/token-sale/timeline'
import Dashboard from '@components/organisms/token-sale/dashboard'
import Transactions from '@components/organisms/token-sale/transactions'
import { TokenSaleProvider, useTokenSale } from '@context/token-sale-context'
import WalletProvider from '@components/organisms/web3/wallet-provider'
import {connectors} from '@providers/connectors'
import useWallet from '@hooks/use-wallet'
import Spinner from '@components/atoms/spinner'

export const LeftCol = styled.div`
    width: 40%;
    padding: 30px 0 30px 30px;

    @media only screen and (max-width : 978px) {
      width: 100%;
      padding: 25px;
    }
`

export const RightCol = styled.div`
    width: 60%;
    padding: 30px 30px 30px 0;

    @media only screen and (max-width : 978px) {
        width: 100%;
        padding: 25px;
    }
`



export default function TokenSale() {
  return (
    <>
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
          <Dashboard />
        </div>
      </TokenSaleProvider>
      <PortalBlockNumber />
    </>
  )
}

