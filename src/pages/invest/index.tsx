import React, { useState } from 'react'
import { Trans } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import PortalBlockNumber from '@components/organisms/portal-block-number'
import WalletProvider from '@components/organisms/web3/wallet-provider'
import { connectors } from '@providers/connectors'
import InvestList from '@components/organisms/invest/invest-list'
import InvestListContextProvider from "@context/invest-list-context";

export default function Invest() {
  const [showWalletProviderModal, setShowWalletProviderModal] = useState(false)

  return (
    <>
      <div className="container mt-3">
        <PageHeader>
          <div className="row align-items-center">
            <div className="col">
              <PageHeader.Subtitle>
                <Trans>Overview</Trans>
              </PageHeader.Subtitle>
              <PageHeader.Title>
                <Trans>Invest</Trans>
              </PageHeader.Title>
              <span className="badge bg-danger-soft mt-3 text-white py-2 px-3">This page is a demo</span>
            </div>
          </div>
        </PageHeader>
        <div className="position-relative blur-background">
          <InvestListContextProvider>
            <InvestList />
          </InvestListContextProvider>
        </div>
        {(showWalletProviderModal &&
            <WalletProvider
                providers={connectors}
                onHide={() => setShowWalletProviderModal(false)}
            />
        )}
      </div>
      <PortalBlockNumber />
    </>
  )
}
