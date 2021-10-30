import React, { useState } from 'react'
import { Trans } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import WalletProvider from '@components/organisms/web3/wallet-provider'
import { connectors } from '@providers/connectors'
import InvestList from '@components/organisms/invest/invest-list'
import { investmentStrategies } from '@config/investment/strategies'

export default function Invest() {
    const [showWalletProviderModal, setShowWalletProviderModal] = useState(false)

    return (
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
                    </div>
                </div>
            </PageHeader>
            <div className="position-relative blur-background">
                <InvestList strategies={investmentStrategies} />
            </div>
          <WalletProvider
              providers={connectors}
              onHide={() => setShowWalletProviderModal(false)}
              show={showWalletProviderModal}
          />
        </div>
    )
}
