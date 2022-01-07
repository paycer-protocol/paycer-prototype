import React, { useState} from 'react'
import styled from 'styled-components'
import { t, Trans } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import PortalBlockNumber from '@components/organisms/portal-block-number'
import KycProcessInfo from '@components/organisms/token-sale/info'
import Vesting from '@components/organisms/token-sale/vesting'
import GradientButton from '@components/atoms/button/gradient-button'
import KycProcessTimeline from '@components/organisms/token-sale/timeline'
import Transactions from '@components/organisms/token-sale/transactions'
import { TokenSaleProvider, useTokenSale } from '@context/token-sale-context'
import WalletProvider from '@components/organisms/web3/wallet-provider'
import {connectors} from '@providers/connectors'
import useWallet from '@hooks/use-wallet'

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

interface TokenSaleContentProps {
  transactionTabActive: boolean,
  setTransactionTabActive: any,
}

const TokenSaleContent = ({ transactionTabActive, setTransactionTabActive }: TokenSaleContentProps) => {
    const { tokenSaleData } = useTokenSale()
    const transactions = tokenSaleData?.transactions
    const [showWalletProviderModal, setShowWalletProviderModal] = useState(false)

    if (!tokenSaleData) {
      return (
        <div className="card blur-background">
          <div className="card-body">
            <div className="d-lg-flex">
             <p className="mb-0">
                 {t`No transactions found, please connect with a wallet address that has token sale transactions.`}
             </p>
            </div>
            <div className="w-25 mt-4">
              <GradientButton
                  type="submit"
                  title={t`Claim`}
                  className="px-5"
                  onClick={() => setShowWalletProviderModal(true)}
              >
                  <Trans>Connect to a Wallet</Trans>
              </GradientButton>
              <WalletProvider
                  providers={connectors}
                  onHide={() => setShowWalletProviderModal(false)}
                  show={showWalletProviderModal}
              />
            </div>
          </div>
        </div>
        )
    }

    return (
      <>
        <div className="d-flex">
          <div className={transactionTabActive ? 'PCR-Tab' : 'PCR-Tab PCR-Tab--isActive' } onClick={() => setTransactionTabActive(false)}>
            {t`Status`}
          </div>
          {(transactions?.length > 0  &&
              <div className={transactionTabActive ? 'PCR-Tab PCR-Tab--isActive' : 'PCR-Tab' } onClick={() => setTransactionTabActive(true)}>
                {t`Transactions`}
              </div>
          )}
        </div>
        <div className="card blur-background">
          <div className="card-body p-0">
            <div className="d-lg-flex">
              {(transactionTabActive
                ?
                <Transactions />
                :
                <>
                  <LeftCol>
                    <Vesting />
                    <KycProcessInfo />
                  </LeftCol>
                  <div className="vertical-line" />
                  <div className="horizontal-line d-md-none" />
                  <RightCol>
                    <KycProcessTimeline />
                  </RightCol>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    )
}

export default function TokenSale() {
  const [transactionTabActive, setTransactionTabActive] = useState(false)
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
          <TokenSaleContent transactionTabActive={transactionTabActive} setTransactionTabActive={setTransactionTabActive} />
        </div>
      </TokenSaleProvider>
      <PortalBlockNumber />
    </>
  )
}

